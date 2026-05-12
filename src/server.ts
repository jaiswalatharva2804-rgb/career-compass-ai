import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
import { analyzeSyllabusContent, validateAndEnhanceAnalysis } from "./lib/claude-analyzer";
import { generateMockAnalysis } from "./lib/mock-analyzer";
import { extractTextFromPDF, cleanPDFText } from "./lib/pdf-parser";
import type { AnalyzeRequest, AnalyzeResponse, SyllabusAnalysis } from "./types/syllabus";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => ((m as { default?: ServerEntry }).default ?? (m as unknown as ServerEntry)),
    );
  }
  return serverEntryPromise;
}

async function handleAnalyzeRequest(request: Request): Promise<Response> {
  const startTime = Date.now();

  try {
    let requestBody: AnalyzeRequest;
    try {
      requestBody = (await request.json()) as AnalyzeRequest;
    } catch {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid request body" }),
        { status: 400, headers: { "content-type": "application/json" } }
      );
    }

    const { content, fileName, fileFormat } = requestBody;

    if (!content || !fileName || !fileFormat) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing required fields" }),
        { status: 400, headers: { "content-type": "application/json" } }
      );
    }

    if (!["pdf", "text"].includes(fileFormat)) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid fileFormat" }),
        { status: 400, headers: { "content-type": "application/json" } }
      );
    }

    let syllabusText: string;

    if (fileFormat === "pdf") {
      try {
        const buffer = Buffer.from(content, "base64");
        syllabusText = await extractTextFromPDF(buffer);
        syllabusText = cleanPDFText(syllabusText);
      } catch (error) {
        console.error("PDF extraction error:", error);
        return new Response(
          JSON.stringify({ success: false, error: "Failed to extract text from PDF" }),
          { status: 400, headers: { "content-type": "application/json" } }
        );
      }
    } else {
      syllabusText = decodeURIComponent(content);
    }

    if (!syllabusText || syllabusText.trim().length < 100) {
      return new Response(
        JSON.stringify({ success: false, error: "Syllabus content too short" }),
        { status: 400, headers: { "content-type": "application/json" } }
      );
    }

    const maxContentLength = 50000;
    if (syllabusText.length > maxContentLength) {
      syllabusText = syllabusText.substring(0, maxContentLength);
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    let completeAnalysis: SyllabusAnalysis;

    if (!apiKey || apiKey === "your_anthropic_api_key_here") {
      console.log("⚠️  Using demo mode - no API key");
      const analysisData = generateMockAnalysis(fileName);
      completeAnalysis = await validateAndEnhanceAnalysis(analysisData);
    } else {
      const analysisData = await analyzeSyllabusContent(syllabusText, fileName);
      completeAnalysis = await validateAndEnhanceAnalysis(analysisData);
    }

    completeAnalysis.fileFormat = fileFormat;

    const response: AnalyzeResponse = {
      success: true,
      analysis: completeAnalysis,
      processingTimeMs: Date.now() - startTime,
    };

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    console.error("API error in /analyze:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";

    const response: AnalyzeResponse = {
      success: false,
      error: `Analysis failed: ${errorMessage}`,
    };

    return new Response(JSON.stringify(response), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
}

function brandedErrorResponse(): Response {
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isCatastrophicSsrErrorBody(body: string, responseStatus: number): boolean {
  let payload: unknown;
  try {
    payload = JSON.parse(body);
  } catch {
    return false;
  }

  if (!payload || Array.isArray(payload) || typeof payload !== "object") {
    return false;
  }

  const fields = payload as Record<string, unknown>;
  const expectedKeys = new Set(["message", "status", "unhandled"]);
  if (!Object.keys(fields).every((key) => expectedKeys.has(key))) {
    return false;
  }

  return (
    fields.unhandled === true &&
    fields.message === "HTTPError" &&
    (fields.status === undefined || fields.status === responseStatus)
  );
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isCatastrophicSsrErrorBody(body, response.status)) {
    return response;
  }

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return brandedErrorResponse();
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      // Handle API requests
      const url = new URL(request.url);
      if (url.pathname === "/api/analyze" && request.method === "POST") {
        return await handleAnalyzeRequest(request);
      }

      // Otherwise delegate to normal SSR handler
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return brandedErrorResponse();
    }
  },
};
