import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Briefcase,
  TrendingUp,
  Target,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  Zap,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { SyllabusAnalysis } from "@/types/syllabus";

interface ResultsDashboardProps {
  analysis: SyllabusAnalysis;
  isLoading?: boolean;
}

export function ResultsDashboard({ analysis, isLoading = false }: ResultsDashboardProps) {
  if (isLoading) {
    return (
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-primary/20 rounded w-64 mx-auto" />
            <div className="h-4 bg-muted rounded w-96 mx-auto" />
          </div>
        </div>
      </section>
    );
  }

  const careerReadinessPercentage = Math.round(analysis.overallCareerReadiness.score);
  const colors = ["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981"];

  const skillsByLevel = {
    beginner: analysis.skillsExtracted.filter((s) => s.proficiencyLevel === "beginner"),
    intermediate: analysis.skillsExtracted.filter((s) => s.proficiencyLevel === "intermediate"),
    advanced: analysis.skillsExtracted.filter((s) => s.proficiencyLevel === "advanced"),
  };

  const salaryData = analysis.topThreeRoles.map((role) => ({
    role: role.jobTitle,
    min: role.estimatedSalaryUSD.min,
    max: role.estimatedSalaryUSD.max,
    match: role.matchScore,
  }));

  const demandData = [
    {
      name: "High Demand",
      value: analysis.careerRoles.filter((r) => r.demandLevel === "high").length,
    },
    {
      name: "Medium Demand",
      value: analysis.careerRoles.filter((r) => r.demandLevel === "medium").length,
    },
    {
      name: "Low Demand",
      value: analysis.careerRoles.filter((r) => r.demandLevel === "low").length,
    },
  ];

  return (
    <section className="py-16 px-6 space-y-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Your Career Intelligence Report
          </h1>
          <p className="text-lg text-muted-foreground">
            {analysis.syllabusTitle} • Analysis generated {new Date(analysis.analysisDate).toLocaleDateString()}
          </p>
        </motion.div>

        {/* Career Readiness Score */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Career Readiness Score</h2>
                <p className="text-muted-foreground">{analysis.overallCareerReadiness.assessmentText}</p>
              </div>
              <div className="text-right">
                <div className="text-5xl font-bold text-primary">{careerReadinessPercentage}</div>
                <p className="text-sm text-muted-foreground">/100</p>
              </div>
            </div>
            <Progress value={careerReadinessPercentage} className="h-3" />
          </Card>
        </motion.div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="roles" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-muted/50">
            <TabsTrigger value="roles" className="flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              <span className="hidden sm:inline">Career Roles</span>
            </TabsTrigger>
            <TabsTrigger value="skills" className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              <span className="hidden sm:inline">Skills</span>
            </TabsTrigger>
            <TabsTrigger value="gaps" className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Gaps</span>
            </TabsTrigger>
            <TabsTrigger value="path" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              <span className="hidden sm:inline">Path</span>
            </TabsTrigger>
          </TabsList>

          {/* Career Roles Tab */}
          <TabsContent value="roles" className="space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid lg:grid-cols-2 gap-8"
            >
              {/* Top Roles */}
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <TrendingUp className="text-primary" />
                  Top Matching Roles
                </h3>
                <div className="space-y-4">
                  {analysis.topThreeRoles.map((role, idx) => (
                    <motion.div
                      key={role.jobTitle}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <Card className="p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-semibold text-lg">{role.jobTitle}</h4>
                            <p className="text-sm text-muted-foreground">{role.description}</p>
                          </div>
                          <Badge
                            variant={
                              role.matchScore >= 80 ? "default" : role.matchScore >= 60 ? "secondary" : "outline"
                            }
                          >
                            {role.matchScore}% match
                          </Badge>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Salary Range:</span>
                            <span className="font-semibold">
                              ${role.estimatedSalaryUSD.min.toLocaleString()} - ${role.estimatedSalaryUSD.max.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Market Demand:</span>
                            <Badge className="capitalize" variant="outline">
                              {role.demandLevel}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Trend:</span>
                            <span className="font-semibold capitalize text-green-600">{role.growthTrend}</span>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Salary Chart */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Salary Expectations</h3>
                <Card className="p-4">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={salaryData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="role" angle={-45} textAnchor="end" height={80} />
                      <YAxis />
                      <Tooltip formatter={(value) => `$${(value as number).toLocaleString()}`} />
                      <Bar dataKey="min" fill="#3b82f6" name="Min Salary" />
                      <Bar dataKey="max" fill="#8b5cf6" name="Max Salary" />
                    </BarChart>
                  </ResponsiveContainer>
                </Card>
              </div>
            </motion.div>

            {/* All Roles List */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              <h3 className="text-lg font-semibold mb-4">All Explored Roles</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {analysis.careerRoles.map((role) => (
                  <Card key={role.jobTitle} className="p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">{role.jobTitle}</span>
                      <Badge variant="outline" className="text-xs">
                        {role.matchScore}%
                      </Badge>
                    </div>
                    <Progress value={role.matchScore} className="h-2" />
                  </Card>
                ))}
              </div>
            </motion.div>
          </TabsContent>

          {/* Skills Tab */}
          <TabsContent value="skills" className="space-y-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              {Object.entries(skillsByLevel).map(([level, skills]) => (
                <div key={level}>
                  <h3 className="text-lg font-semibold mb-4 capitalize">{level} Skills</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {skills.map((skill) => (
                      <Card key={skill.skillName} className="p-4">
                        <h4 className="font-semibold mb-3">{skill.skillName}</h4>
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="text-muted-foreground">Industry Relevance:</span>
                            <Progress value={skill.industryRelevance} className="h-2 mt-1" />
                          </div>
                          <div className="pt-2">
                            <span className="text-xs text-muted-foreground">
                              Taught in {skill.relevantModules.length} module{skill.relevantModules.length !== 1 ? "s" : ""}
                            </span>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </TabsContent>

          {/* Skill Gaps Tab */}
          <TabsContent value="gaps" className="space-y-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <AlertCircle className="text-amber-500" />
                  Critical Skill Gaps
                </h3>
                <div className="space-y-4">
                  {analysis.skillGapAnalysis.topGaps.map((gap, idx) => (
                    <Card key={gap.skill} className="p-4 border-l-4 border-amber-500">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold">{gap.skill}</h4>
                          <Badge className="capitalize mt-1" variant="outline">
                            {gap.priority}
                          </Badge>
                        </div>
                      </div>
                      {gap.recommendedResources && gap.recommendedResources.length > 0 && (
                        <div className="space-y-2 text-sm pt-3">
                          <p className="font-medium text-muted-foreground">Recommended Resources:</p>
                          <ul className="space-y-1 ml-4">
                            {gap.recommendedResources.map((resource) => (
                              <li key={resource.title} className="flex items-center gap-2">
                                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                                  {resource.type}
                                </span>
                                <span>{resource.title}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </Card>
                  ))}
                </div>
              </div>

              {analysis.skillGapAnalysis.marketDemandSkills.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">High-Demand Skills Not in Curriculum</h3>
                  <div className="flex flex-wrap gap-2">
                    {analysis.skillGapAnalysis.marketDemandSkills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </TabsContent>

          {/* Learning Path Tab */}
          <TabsContent value="path" className="space-y-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <BookOpen className="text-primary" />
                Recommended Learning Path
              </h3>
              <div className="space-y-4">
                {analysis.recommendedLearningPath.map((item, idx) => (
                  <Card
                    key={item.skillToLearn}
                    className={`p-5 border-l-4 ${
                      item.priority === "immediate"
                        ? "border-red-500 bg-red-50 dark:bg-red-950/20"
                        : item.priority === "short-term"
                          ? "border-amber-500 bg-amber-50 dark:bg-amber-950/20"
                          : "border-blue-500 bg-blue-50 dark:bg-blue-950/20"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg">{item.skillToLearn}</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Estimated duration: {item.estimatedDurationWeeks} weeks
                        </p>
                      </div>
                      <Badge className="capitalize">
                        {item.priority === "immediate"
                          ? "Start Now"
                          : item.priority === "short-term"
                            ? "Next 3 Months"
                            : "Long Term"}
                      </Badge>
                    </div>
                    {item.resources.length > 0 && (
                      <div className="pt-3 border-t">
                        <p className="text-xs font-medium text-muted-foreground mb-2">Suggested Courses:</p>
                        <ul className="space-y-1 text-sm">
                          {item.resources.slice(0, 3).map((resource) => (
                            <li key={resource} className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
                              <CheckCircle2 className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
                              <span>{resource}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>

        {/* Industry Insights Footer */}
        {analysis.industryInsights.dominantIndustries.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-16"
          >
            <Card className="p-6 bg-muted/30">
              <h3 className="text-lg font-semibold mb-4">Industry Insights</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Dominant Industries:</p>
                  <div className="flex flex-wrap gap-2">
                    {analysis.industryInsights.dominantIndustries.map((industry) => (
                      <Badge key={industry} variant="secondary">
                        {industry}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </section>
  );
}
