import * as pdfParse from "pdf-parse";

/**
 * Extract text content from a PDF buffer
 * @param pdfBuffer The raw PDF file buffer
 * @returns Extracted text content
 */
export async function extractTextFromPDF(pdfBuffer: Buffer): Promise<string> {
  try {
    const data = await (pdfParse as any)(pdfBuffer);

    // Extract text from all pages
    let fullText = "";
    if (data.text) {
      fullText = data.text;
    }

    // If page-by-page extraction is needed
    if (fullText.trim().length === 0 && data.version) {
      // Fallback: pdf-parse sometimes extracts per page
      fullText = data.text;
    }

    return fullText || "";
  } catch (error) {
    console.error("Error parsing PDF:", error);
    throw new Error("Failed to parse PDF file. Please ensure it's a valid PDF.");
  }
}

/**
 * Clean and normalize extracted PDF text
 * @param text Raw extracted text from PDF
 * @returns Cleaned text
 */
export function cleanPDFText(text: string): string {
  // Remove excessive whitespace
  let cleaned = text.replace(/\s+/g, " ").trim();

  // Remove common PDF artifacts
  cleaned = cleaned.replace(/\f/g, "\n"); // Form feeds to newlines
  cleaned = cleaned.replace(/\n{3,}/g, "\n\n"); // Reduce excessive newlines

  // Try to reconstruct sentences broken by line breaks
  cleaned = cleaned.replace(/([a-z])\n([a-z])/gi, "$1 $2");

  return cleaned;
}

/**
 * Chunk text into manageable sections for analysis
 * Preserves natural breaks (sections, chapters)
 * @param text Full text content
 * @param maxChunkSize Maximum characters per chunk
 * @returns Array of text chunks
 */
export function chunkTextBySections(
  text: string,
  maxChunkSize: number = 4000
): string[] {
  const lines = text.split("\n");
  const chunks: string[] = [];
  let currentChunk = "";

  for (const line of lines) {
    // If line is likely a section header (all caps, short), start new chunk
    const isHeader =
      line.trim().length > 0 &&
      line.trim().length < 100 &&
      /^[A-Z\s\d\-:\.]+$/.test(line.trim());

    if (currentChunk.length + line.length > maxChunkSize && isHeader) {
      if (currentChunk.trim()) {
        chunks.push(currentChunk.trim());
      }
      currentChunk = line;
    } else {
      currentChunk += (currentChunk ? "\n" : "") + line;
    }
  }

  if (currentChunk.trim()) {
    chunks.push(currentChunk.trim());
  }

  return chunks.filter((chunk) => chunk.length > 100); // Filter tiny chunks
}

/**
 * Extract structured information about file
 * @param text File content
 * @returns Metadata about the document
 */
export function extractDocumentMetadata(text: string): {
  estimatedPages: number;
  wordCount: number;
  keyTopics: string[];
} {
  const wordCount = text.split(/\s+/).length;

  // Rough estimate: ~300 words per page in a syllabus
  const estimatedPages = Math.ceil(wordCount / 300);

  // Extract potential topics (lines that look like headers)
  const lines = text.split("\n");
  const keyTopics = lines
    .filter(
      (line) =>
        line.trim().length > 5 &&
        line.trim().length < 80 &&
        /^[A-Z]/.test(line.trim())
    )
    .slice(0, 15)
    .map((line) => line.trim());

  return {
    estimatedPages,
    wordCount,
    keyTopics,
  };
}
