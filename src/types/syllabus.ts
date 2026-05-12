// Core type definitions for the Semantic Syllabus & Career Mapper system

export interface Module {
  name: string;
  description: string;
  topics: string[];
  weightage: number; // 0-100
}

export interface SkillExtraction {
  skillName: string;
  proficiencyLevel: "beginner" | "intermediate" | "advanced";
  relevantModules: string[]; // Module names that teach this skill
  industryRelevance: number; // 0-100 relevance score
}

export interface CareerRole {
  jobTitle: string;
  description: string;
  matchScore: number; // 0-100, how well syllabus prepares for this role
  estimatedSalaryUSD: {
    min: number;
    max: number;
  };
  demandLevel: "high" | "medium" | "low"; // Based on market data
  requiredSkills: string[]; // Skills needed for this role
  skillGaps: {
    skill: string;
    priority: "critical" | "important" | "nice-to-have";
  }[];
  growthTrend: "growing" | "stable" | "declining"; // Market trend
}

export interface CareerPath {
  entryRole: CareerRole;
  progressionRoles: CareerRole[]; // 1, 3, 5 year progression
  estimatedTimeInRole: {
    years: number;
    notes: string;
  };
}

export interface SkillGapAnalysis {
  topGaps: {
    skill: string;
    priority: "critical" | "important" | "nice-to-have";
    recommendedResources: {
      type: "course" | "certification" | "project";
      title: string;
      estimatedHours: number;
    }[];
  }[];
  marketDemandSkills: string[]; // Skills in high demand not in curriculum
}

export interface SyllabusAnalysis {
  // Metadata
  syllabusTitle: string;
  analysisDate: string;
  fileFormat: "pdf" | "text";
  totalPages?: number;
  
  // Core components
  modules: Module[];
  skillsExtracted: SkillExtraction[];
  careerRoles: CareerRole[];
  careerPaths: CareerPath[];
  skillGapAnalysis: SkillGapAnalysis;
  
  // Summary metrics
  overallCareerReadiness: {
    score: number; // 0-100
    assessmentText: string;
  };
  topThreeRoles: CareerRole[];
  recommendedLearningPath: {
    skillToLearn: string;
    estimatedDurationWeeks: number;
    priority: "immediate" | "short-term" | "long-term";
    resources: string[];
  }[];
  
  // Industry context
  industryInsights: {
    dominantIndustries: string[];
    skillTrends: {
      skill: string;
      trendDirection: "increasing" | "decreasing" | "stable";
      yearOverYearChange: number; // percentage
    }[];
  };
}

export interface AnalyzeRequest {
  content: string; // Raw text from PDF or pasted content
  fileName: string;
  fileFormat: "pdf" | "text";
}

export interface AnalyzeResponse {
  success: boolean;
  analysis?: SyllabusAnalysis;
  error?: string;
  processingTimeMs?: number;
}
