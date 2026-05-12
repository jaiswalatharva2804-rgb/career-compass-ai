import type { SyllabusAnalysis } from "@/types/syllabus";

/**
 * Mock analyzer for demo mode - returns realistic sample data
 * Perfect for testing UI without API key
 */
export function generateMockAnalysis(fileName: string): SyllabusAnalysis {
  const syllabusTitle = fileName.replace(/\.[^/.]+$/, "");

  return {
    syllabusTitle,
    analysisDate: new Date().toISOString(),
    fileFormat: "text",
    modules: [
      {
        name: "Data Structures",
        description: "Fundamental data structures and their implementations",
        topics: [
          "Arrays and Linked Lists",
          "Stacks and Queues",
          "Trees and Graphs",
          "Hash Tables",
        ],
        weightage: 25,
      },
      {
        name: "Algorithms",
        description: "Algorithm design and complexity analysis",
        topics: [
          "Sorting Algorithms",
          "Search Algorithms",
          "Dynamic Programming",
          "Greedy Algorithms",
        ],
        weightage: 20,
      },
      {
        name: "System Design",
        description: "Large-scale system architecture",
        topics: [
          "Scalability Principles",
          "Load Balancing",
          "Caching Strategies",
          "Database Design",
        ],
        weightage: 22,
      },
      {
        name: "Object-Oriented Programming",
        description: "Core OOP principles and design patterns",
        topics: [
          "Classes and Inheritance",
          "Polymorphism",
          "Design Patterns",
          "SOLID Principles",
        ],
        weightage: 18,
      },
      {
        name: "Web Development",
        description: "Full-stack web technologies",
        topics: [
          "Frontend Frameworks (React/Vue)",
          "Backend APIs",
          "Database Integration",
          "Security Best Practices",
        ],
        weightage: 15,
      },
    ],
    skillsExtracted: [
      {
        skillName: "Algorithm Design",
        proficiencyLevel: "advanced",
        relevantModules: ["Data Structures", "Algorithms"],
        industryRelevance: 95,
      },
      {
        skillName: "Python Programming",
        proficiencyLevel: "advanced",
        relevantModules: ["Data Structures", "Algorithms", "System Design"],
        industryRelevance: 92,
      },
      {
        skillName: "System Architecture",
        proficiencyLevel: "intermediate",
        relevantModules: ["System Design", "Web Development"],
        industryRelevance: 88,
      },
      {
        skillName: "Full Stack Development",
        proficiencyLevel: "intermediate",
        relevantModules: ["Web Development", "Object-Oriented Programming"],
        industryRelevance: 85,
      },
      {
        skillName: "Database Design",
        proficiencyLevel: "intermediate",
        relevantModules: ["System Design", "Web Development"],
        industryRelevance: 82,
      },
      {
        skillName: "Cloud Architecture (AWS)",
        proficiencyLevel: "beginner",
        relevantModules: ["System Design"],
        industryRelevance: 88,
      },
      {
        skillName: "DevOps & CI/CD",
        proficiencyLevel: "beginner",
        relevantModules: ["System Design"],
        industryRelevance: 80,
      },
      {
        skillName: "Machine Learning Basics",
        proficiencyLevel: "beginner",
        relevantModules: ["Algorithms"],
        industryRelevance: 75,
      },
    ],
    careerRoles: [
      {
        jobTitle: "Backend Engineer",
        description:
          "Design and build scalable server-side systems and APIs",
        matchScore: 87,
        estimatedSalaryUSD: { min: 95000, max: 140000 },
        demandLevel: "high",
        requiredSkills: [
          "Algorithm Design",
          "System Architecture",
          "Database Design",
          "Python/Java Programming",
        ],
        skillGaps: [
          { skill: "Microservices Architecture", priority: "important" },
          { skill: "Message Queuing (Kafka/RabbitMQ)", priority: "important" },
        ],
        growthTrend: "growing",
      },
      {
        jobTitle: "Full Stack Developer",
        description: "Build complete web applications from frontend to backend",
        matchScore: 82,
        estimatedSalaryUSD: { min: 85000, max: 130000 },
        demandLevel: "high",
        requiredSkills: [
          "Full Stack Development",
          "React/Vue",
          "Node.js",
          "Database Design",
        ],
        skillGaps: [
          { skill: "TypeScript", priority: "important" },
          { skill: "Testing Frameworks", priority: "nice-to-have" },
        ],
        growthTrend: "growing",
      },
      {
        jobTitle: "Software Architect",
        description: "Design large-scale software systems and technical strategy",
        matchScore: 76,
        estimatedSalaryUSD: { min: 120000, max: 180000 },
        demandLevel: "medium",
        requiredSkills: [
          "System Architecture",
          "Design Patterns",
          "Cloud Architecture",
          "Team Leadership",
        ],
        skillGaps: [
          { skill: "DevOps & Infrastructure", priority: "important" },
          { skill: "Business Acumen", priority: "important" },
        ],
        growthTrend: "stable",
      },
      {
        jobTitle: "DevOps Engineer",
        description:
          "Manage infrastructure, deployment, and system reliability",
        matchScore: 70,
        estimatedSalaryUSD: { min: 100000, max: 150000 },
        demandLevel: "high",
        requiredSkills: [
          "Cloud Platform (AWS/GCP)",
          "Kubernetes",
          "CI/CD",
          "Linux",
        ],
        skillGaps: [
          { skill: "Kubernetes & Container Orchestration", priority: "critical" },
          { skill: "Infrastructure as Code (Terraform)", priority: "important" },
          { skill: "Monitoring & Logging (ELK/Prometheus)", priority: "important" },
        ],
        growthTrend: "growing",
      },
      {
        jobTitle: "Machine Learning Engineer",
        description: "Develop AI/ML models and deploy them to production",
        matchScore: 65,
        estimatedSalaryUSD: { min: 110000, max: 160000 },
        demandLevel: "high",
        requiredSkills: [
          "Python",
          "Machine Learning Frameworks",
          "Statistics",
          "System Design",
        ],
        skillGaps: [
          { skill: "Deep Learning (PyTorch/TensorFlow)", priority: "critical" },
          { skill: "Statistics & Linear Algebra", priority: "critical" },
          { skill: "MLOps", priority: "important" },
        ],
        growthTrend: "growing",
      },
    ],
    careerPaths: [
      {
        entryRole: {
          jobTitle: "Backend Engineer",
          description: "Design and build scalable server-side systems",
          matchScore: 87,
          estimatedSalaryUSD: { min: 95000, max: 140000 },
          demandLevel: "high",
          requiredSkills: ["Algorithms", "System Design", "Backend Framework"],
          skillGaps: [],
          growthTrend: "growing",
        },
        progressionRoles: [
          {
            jobTitle: "Senior Backend Engineer",
            description: "Lead backend infrastructure and architecture decisions",
            matchScore: 82,
            estimatedSalaryUSD: { min: 130000, max: 180000 },
            demandLevel: "high",
            requiredSkills: [
              "System Design",
              "Team Leadership",
              "DevOps",
            ],
            skillGaps: [],
            growthTrend: "stable",
          },
          {
            jobTitle: "Software Architect",
            description: "Design enterprise-scale systems",
            matchScore: 76,
            estimatedSalaryUSD: { min: 150000, max: 220000 },
            demandLevel: "medium",
            requiredSkills: [
              "Architecture",
              "Strategy",
              "Leadership",
            ],
            skillGaps: [],
            growthTrend: "stable",
          },
        ],
        estimatedTimeInRole: {
          years: 2,
          notes: "Typical career progression from entry to mid-level",
        },
      },
    ],
    skillGapAnalysis: {
      topGaps: [
        {
          skill: "Cloud Architecture (AWS/GCP/Azure)",
          priority: "critical",
          recommendedResources: [
            {
              type: "certification",
              title: "AWS Solutions Architect Associate",
              estimatedHours: 40,
            },
            {
              type: "course",
              title: "Complete AWS Developer Course",
              estimatedHours: 35,
            },
          ],
        },
        {
          skill: "Containerization (Docker & Kubernetes)",
          priority: "important",
          recommendedResources: [
            {
              type: "course",
              title: "Docker for DevOps",
              estimatedHours: 25,
            },
            {
              type: "project",
              title: "Deploy application to Kubernetes cluster",
              estimatedHours: 40,
            },
          ],
        },
        {
          skill: "System Design at Scale",
          priority: "important",
          recommendedResources: [
            {
              type: "course",
              title: "Designing Data-Intensive Applications",
              estimatedHours: 60,
            },
            {
              type: "project",
              title: "Design a Twitter-like system",
              estimatedHours: 20,
            },
          ],
        },
        {
          skill: "Advanced OOP & Design Patterns",
          priority: "nice-to-have",
          recommendedResources: [
            {
              type: "course",
              title: "Design Patterns: Elements of Reusable OOP",
              estimatedHours: 30,
            },
          ],
        },
        {
          skill: "Machine Learning Fundamentals",
          priority: "nice-to-have",
          recommendedResources: [
            {
              type: "course",
              title: "Fast.ai - Practical Deep Learning",
              estimatedHours: 50,
            },
          ],
        },
      ],
      marketDemandSkills: [
        "Microservices Architecture",
        "Message Queuing (Kafka, RabbitMQ)",
        "GraphQL",
        "Rust Programming",
        "AI/LLM Integration",
      ],
    },
    overallCareerReadiness: {
      score: 78,
      assessmentText:
        "Your curriculum provides strong preparation for backend and full-stack roles. Key strengths: solid algorithm foundation, system design thinking. Focus on cloud platforms and DevOps tooling to reach 85+ readiness.",
    },
    topThreeRoles: [
      {
        jobTitle: "Backend Engineer",
        description:
          "Design and build scalable server-side systems and APIs",
        matchScore: 87,
        estimatedSalaryUSD: { min: 95000, max: 140000 },
        demandLevel: "high",
        requiredSkills: [
          "Algorithm Design",
          "System Architecture",
          "Database Design",
        ],
        skillGaps: [],
        growthTrend: "growing",
      },
      {
        jobTitle: "Full Stack Developer",
        description: "Build complete web applications",
        matchScore: 82,
        estimatedSalaryUSD: { min: 85000, max: 130000 },
        demandLevel: "high",
        requiredSkills: ["Full Stack Development", "React", "Node.js"],
        skillGaps: [],
        growthTrend: "growing",
      },
      {
        jobTitle: "Software Architect",
        description: "Design large-scale software systems",
        matchScore: 76,
        estimatedSalaryUSD: { min: 120000, max: 180000 },
        demandLevel: "medium",
        requiredSkills: ["System Architecture", "Leadership"],
        skillGaps: [],
        growthTrend: "stable",
      },
    ],
    recommendedLearningPath: [
      {
        skillToLearn: "Cloud Architecture (AWS)",
        estimatedDurationWeeks: 4,
        priority: "immediate",
        resources: [
          "AWS Solutions Architect Certification",
          "A Cloud Guru - AWS Course",
        ],
      },
      {
        skillToLearn: "Docker & Kubernetes",
        estimatedDurationWeeks: 6,
        priority: "immediate",
        resources: ["Complete Docker for DevOps", "Kubernetes the Hard Way"],
      },
      {
        skillToLearn: "System Design at Scale",
        estimatedDurationWeeks: 8,
        priority: "short-term",
        resources: [
          "Designing Data-Intensive Applications",
          "ByteByteGo System Design",
        ],
      },
      {
        skillToLearn: "Advanced Microservices",
        estimatedDurationWeeks: 6,
        priority: "short-term",
        resources: ["Microservices Architecture", "Message Queuing Systems"],
      },
      {
        skillToLearn: "Machine Learning Fundamentals",
        estimatedDurationWeeks: 10,
        priority: "long-term",
        resources: ["Fast.ai Practical Deep Learning", "Andrew Ng ML Course"],
      },
    ],
    industryInsights: {
      dominantIndustries: [
        "Technology & Software",
        "Financial Services",
        "E-commerce",
        "Cloud Computing",
        "FinTech",
      ],
      skillTrends: [
        {
          skill: "Cloud Architecture",
          trendDirection: "increasing",
          yearOverYearChange: 35,
        },
        {
          skill: "AI/Machine Learning",
          trendDirection: "increasing",
          yearOverYearChange: 48,
        },
        {
          skill: "DevOps & Infrastructure",
          trendDirection: "increasing",
          yearOverYearChange: 28,
        },
        {
          skill: "System Design",
          trendDirection: "stable",
          yearOverYearChange: 12,
        },
        {
          skill: "Legacy Languages (COBOL)",
          trendDirection: "decreasing",
          yearOverYearChange: -22,
        },
      ],
    },
  };
}
