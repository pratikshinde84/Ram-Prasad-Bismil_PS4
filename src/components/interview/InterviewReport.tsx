import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Download, 
  Share2, 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp,
  Target,
  MessageSquare,
  Lightbulb,
  BookOpen,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Domain } from "./DomainSelector";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from "recharts";

interface Score {
  category: string;
  score: number;
  fullMark: 100;
}

interface ReportProps {
  domain: Domain;
  onBack: () => void;
  onStartNew: () => void;
}

const generateScores = (): Score[] => [
  { category: "Correctness", score: Math.floor(Math.random() * 25) + 70, fullMark: 100 },
  { category: "Clarity", score: Math.floor(Math.random() * 30) + 65, fullMark: 100 },
  { category: "Structure", score: Math.floor(Math.random() * 25) + 70, fullMark: 100 },
  { category: "Relevance", score: Math.floor(Math.random() * 20) + 75, fullMark: 100 },
  { category: "Confidence", score: Math.floor(Math.random() * 30) + 60, fullMark: 100 },
];

const strengths = [
  "Strong technical foundation with clear explanations",
  "Good use of real-world examples to illustrate points",
  "Demonstrates structured problem-solving approach",
];

const improvements = [
  "Could provide more specific metrics and outcomes",
  "Consider diving deeper into edge cases",
  "Practice articulating trade-offs more clearly",
];

const roadmap = [
  { week: "Week 1-2", task: "Review fundamental concepts and practice explaining them concisely", icon: BookOpen },
  { week: "Week 3-4", task: "Work through 10+ practice problems with time constraints", icon: Target },
  { week: "Week 5-6", task: "Record yourself and review for confidence and clarity", icon: MessageSquare },
  { week: "Week 7-8", task: "Mock interviews with peers focusing on feedback areas", icon: Lightbulb },
];

export const InterviewReport = ({ domain, onBack, onStartNew }: ReportProps) => {
  const scores = generateScores();
  const overallScore = Math.round(scores.reduce((acc, s) => acc + s.score, 0) / scores.length);

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return "Excellent";
    if (score >= 80) return "Very Good";
    if (score >= 70) return "Good";
    if (score >= 60) return "Fair";
    return "Needs Work";
  };

  return (
    <section className="min-h-screen py-10">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Button
              variant="ghost"
              onClick={onBack}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="flex gap-3">
              <Button variant="glass">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="glass">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <domain.icon className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">{domain.name}</span>
            </div>
            <h1 className="text-4xl font-bold mb-3">Interview Report</h1>
            <p className="text-muted-foreground">Completed on {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>

          {/* Overall Score */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="glass-card p-8 mb-8"
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Score circle */}
              <div className="relative w-48 h-48 shrink-0">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="hsl(var(--muted))"
                    strokeWidth="12"
                    fill="none"
                  />
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="hsl(var(--primary))"
                    strokeWidth="12"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${(overallScore / 100) * 553} 553`}
                    className="score-ring"
                    style={{ strokeDashoffset: 0 }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={`text-5xl font-bold ${getScoreColor(overallScore)}`}>
                    {overallScore}
                  </span>
                  <span className="text-muted-foreground text-sm mt-1">out of 100</span>
                </div>
              </div>

              {/* Radar chart */}
              <div className="flex-1 w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={scores} cx="50%" cy="50%" outerRadius="80%">
                    <PolarGrid stroke="hsl(var(--border))" />
                    <PolarAngleAxis 
                      dataKey="category" 
                      tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    />
                    <Radar
                      name="Score"
                      dataKey="score"
                      stroke="hsl(var(--primary))"
                      fill="hsl(var(--primary))"
                      fillOpacity={0.2}
                      strokeWidth={2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <div className="grid grid-cols-5 gap-4">
                {scores.map((score, i) => (
                  <motion.div
                    key={score.category}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="text-center"
                  >
                    <div className={`text-2xl font-bold ${getScoreColor(score.score)}`}>
                      {score.score}
                    </div>
                    <div className="text-sm text-muted-foreground">{score.category}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Strengths & Improvements */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="glass-card p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-success/20 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-success" />
                </div>
                <h3 className="text-lg font-semibold">Strengths</h3>
              </div>
              <ul className="space-y-3">
                {strengths.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-success mt-2 shrink-0" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="glass-card p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-warning/20 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-warning" />
                </div>
                <h3 className="text-lg font-semibold">Areas for Improvement</h3>
              </div>
              <ul className="space-y-3">
                {improvements.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-warning mt-2 shrink-0" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Improvement Roadmap */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="glass-card p-6 mb-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Your 8-Week Improvement Roadmap</h3>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {roadmap.map((item, i) => (
                <motion.div
                  key={item.week}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="relative p-4 rounded-xl bg-muted/50 border border-border/50"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <item.icon className="w-4 h-4 text-primary" />
                    <span className="text-sm font-semibold text-primary">{item.week}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.task}</p>
                  {i < roadmap.length - 1 && (
                    <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                      <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="text-center"
          >
            <Button variant="hero" size="xl" onClick={onStartNew}>
              Start Another Interview
              <ArrowRight className="w-5 h-5" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
