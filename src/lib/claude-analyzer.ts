import Anthropic from "@anthropic-ai/sdk";
import type {
  SyllabusAnalysis,
  CareerRole,
  SkillExtraction,
  Module,
} from "@/types/syllabus";

const client = new Anthropic();

const EXTRACTION_SYSTEM_PROMPT = `You are an expert educational analyst and career counselor specializing in semantic analysis of academic syllabi. Your task is to:

1. Extract core modules and topics from a syllabus
2. Identify transferable skills being taught
3. Map these skills to real-world job roles
4. Analyze market demand for relevant careers
5. Identify skill gaps between curriculum and industry requirements

You must respond with ONLY valid JSON, no additional text. All numeric scores should be between 0-100.`;

const JSON_SCHEMA = {
  type: "object",
  properties: {
    modules: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: { type: "string" },
          description: { type: "string" },
          topics: { type: "array", items: { type: "string" } },
          weightage: { type: "number" },
        },
      },
    },
    skillsExtracted: {
      type: "array",
      items: {
        type: "object",
        properties: {
          skillName: { type: "string" },
          proficiencyLevel: { type: "string" },
          relevantModules: { type: "array", items: { type: "string" } },
          industryRelevance: { type: "number" },
        },
      },
    },
    careerRoles: {
      type: "array",
      items: {
        type: "object",
        properties: {
          jobTitle: { type: "string" },
          description: { type: "string" },
          matchScore: { type: "number" },
          estimatedSalaryUSD: {
            type: "object",
            properties: {
              min: { type: "number" },
              max: { type: "number" },
            },
          },
          demandLevel: { type: "string" },
          requiredSkills: { type: "array", items: { type: "string" } },
          skillGaps: {
            type: "array",
            items: {
              type: "object",
              properties: {
                skill: { type: "string" },
                priority: { type: "string" },
              },
            },
          },
          growthTrend: { type: "string" },
        },
      },
    },
  },
};

export async function analyzeSyllabusContent(
  syllabusText: string,
  fileName: string
): Promise<Partial<SyllabusAnalysis>> {
  const prompt = `Analyze the following syllabus and extract structured career intelligence:

SYLLABUS CONTENT:
---
${syllabusText.substring(0, 8000)} ${syllabusText.length > 8000 ? "... (truncated)" : ""}
---

Extract and analyze:
1. Main modules/topics (with relative importance weights)
2. Skills that will be taught at each proficiency level
3. Top 8-10 matching job roles with current market demand and salary ranges
4. Skill gaps between what's taught and what industry needs
5. Career progression paths (entry level → mid-level → senior)
6. Overall career readiness score

For salary data, reference current 2026 market rates:
- Junior roles: $60k-$85k
- Mid-level roles: $90k-$130k
- Senior roles: $120k-$180k+

Return ONLY a valid JSON object with these fields: modules, skillsExtracted, careerRoles, skillGapAnalysis, overallCareerReadiness, topThreeRoles, industryInsights.`;

  try {
    const response = await client.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 4000,
      system: EXTRACTION_SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const content = response.content[0];
    if (content.type !== "text") {
      throw new Error("Unexpected response type from Claude");
    }

    // Extract JSON from response, handling potential markdown code blocks
    let jsonText = content.text.trim();
    if (jsonText.startsWith("```json")) {
      jsonText = jsonText.replace(/^```json\n?/, "").replace(/\n?```$/, "");
    } else if (jsonText.startsWith("```")) {
      jsonText = jsonText.replace(/^```\n?/, "").replace(/\n?```$/, "");
    }

    const analysisData = JSON.parse(jsonText);

    return {
      syllabusTitle: fileName.replace(/\.[^/.]+$/, ""),
      analysisDate: new Date().toISOString(),
      modules: analysisData.modules || [],
      skillsExtracted: analysisData.skillsExtracted || [],
      careerRoles: analysisData.careerRoles || [],
      overallCareerReadiness: {
        score:
          analysisData.overallCareerReadiness?.score ||
          calculateCareerReadiness(analysisData),
        assessmentText:
          analysisData.overallCareerReadiness?.assessmentText ||
          "Analysis complete",
      },
      topThreeRoles: (analysisData.topThreeRoles || analysisData.careerRoles)
        .slice(0, 3)
        .sort((a: CareerRole, b: CareerRole) => b.matchScore - a.matchScore),
      skillGapAnalysis: analysisData.skillGapAnalysis || {
        topGaps: [],
        marketDemandSkills: [],
      },
      industryInsights: analysisData.industryInsights || {
        dominantIndustries: [],
        skillTrends: [],
      },
      careerPaths: buildCareerPaths(
        analysisData.careerRoles || [],
        analysisData.modules || []
      ),
      recommendedLearningPath: buildLearningPath(
        analysisData.skillGapAnalysis?.topGaps || []
      ),
    };
  } catch (error) {
    console.error("Error analyzing syllabus with Claude:", error);
    throw error;
  }
}

function calculateCareerReadiness(data: any): number {
  if (!data.careerRoles || data.careerRoles.length === 0) return 0;
  const avgScore =
    data.careerRoles.reduce((sum: number, role: CareerRole) => sum + role.matchScore, 0) /
    data.careerRoles.length;
  return Math.round(avgScore);
}

function buildCareerPaths(
  roles: CareerRole[],
  modules: Module[]
): any[] {
  // Sort by match score to create progression
  const sorted = [...roles].sort((a, b) => b.matchScore - a.matchScore);

  return sorted.slice(0, 3).map((entryRole, index) => ({
    entryRole,
    progressionRoles: sorted.slice(index + 1, index + 3),
    estimatedTimeInRole: {
      years: 2 + index,
      notes: `Typical career progression in ${entryRole.jobTitle} role`,
    },
  }));
}

function buildLearningPath(skillGaps: any[]): any[] {
  return skillGaps
    .sort((a, b) => {
      const priorityOrder = { critical: 0, important: 1, "nice-to-have": 2 };
      return (
        (priorityOrder[a.priority as keyof typeof priorityOrder] || 3) -
        (priorityOrder[b.priority as keyof typeof priorityOrder] || 3)
      );
    })
    .slice(0, 5)
    .map((gap, index) => ({
      skillToLearn: gap.skill,
      estimatedDurationWeeks: gap.priority === "critical" ? 4 : gap.priority === "important" ? 8 : 12,
      priority:
        gap.priority === "critical"
          ? "immediate"
          : gap.priority === "important"
            ? "short-term"
            : "long-term",
      resources: gap.recommendedResources?.map((r: any) => r.title) || [],
    }));
}

export async function validateAndEnhanceAnalysis(
  analysis: Partial<SyllabusAnalysis>
): Promise<SyllabusAnalysis> {
  // Ensure all required fields are present with sensible defaults
  return {
    syllabusTitle: analysis.syllabusTitle || "Untitled Syllabus",
    analysisDate: analysis.analysisDate || new Date().toISOString(),
    fileFormat: analysis.fileFormat || "text",
    modules: analysis.modules || [],
    skillsExtracted: analysis.skillsExtracted || [],
    careerRoles: analysis.careerRoles || [],
    careerPaths: analysis.careerPaths || [],
    skillGapAnalysis: analysis.skillGapAnalysis || {
      topGaps: [],
      marketDemandSkills: [],
    },
    overallCareerReadiness: analysis.overallCareerReadiness || {
      score: 0,
      assessmentText: "Unable to complete analysis",
    },
    topThreeRoles: analysis.topThreeRoles || [],
    recommendedLearningPath: analysis.recommendedLearningPath || [],
    industryInsights: analysis.industryInsights || {
      dominantIndustries: [],
      skillTrends: [],
    },
  };
}
