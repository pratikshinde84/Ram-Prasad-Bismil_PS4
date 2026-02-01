import { motion } from "framer-motion";
import { 
  Code, 
  Database, 
  Users, 
  Cloud, 
  Briefcase, 
  LineChart,
  Shield,
  Palette,
  ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";

export interface Domain {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
  questionCount: number;
  color: string;
}

export const domains: Domain[] = [
  { 
    id: "software", 
    name: "Software Engineering", 
    icon: Code, 
    description: "DSA, System Design, OOP, APIs",
    questionCount: 50,
    color: "from-cyan-500 to-blue-500"
  },
  { 
    id: "data-science", 
    name: "Data Science", 
    icon: Database, 
    description: "ML, Statistics, Python, SQL",
    questionCount: 45,
    color: "from-purple-500 to-pink-500"
  },
  { 
    id: "cloud", 
    name: "Cloud & DevOps", 
    icon: Cloud, 
    description: "AWS, Azure, CI/CD, Kubernetes",
    questionCount: 40,
    color: "from-orange-500 to-red-500"
  },
  { 
    id: "hr", 
    name: "HR & Behavioral", 
    icon: Users, 
    description: "Leadership, Teamwork, Conflict Resolution",
    questionCount: 35,
    color: "from-green-500 to-emerald-500"
  },
  { 
    id: "product", 
    name: "Product Management", 
    icon: Briefcase, 
    description: "Strategy, Metrics, User Research",
    questionCount: 38,
    color: "from-indigo-500 to-violet-500"
  },
  { 
    id: "analytics", 
    name: "Business Analytics", 
    icon: LineChart, 
    description: "Excel, Tableau, Business Cases",
    questionCount: 32,
    color: "from-teal-500 to-cyan-500"
  },
  { 
    id: "security", 
    name: "Cybersecurity", 
    icon: Shield, 
    description: "Network Security, Pentesting, Compliance",
    questionCount: 30,
    color: "from-red-500 to-orange-500"
  },
  { 
    id: "design", 
    name: "UX/UI Design", 
    icon: Palette, 
    description: "User Research, Prototyping, Design Systems",
    questionCount: 28,
    color: "from-pink-500 to-rose-500"
  },
];

interface DomainSelectorProps {
  onSelectDomain: (domain: Domain) => void;
  onBack: () => void;
}

export const DomainSelector = ({ onSelectDomain, onBack }: DomainSelectorProps) => {
  return (
    <section className="min-h-screen py-20">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          {/* Back button */}
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-8 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Choose Your Domain</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Select the interview domain that matches your career goals. Each comes with specialized questions and evaluation criteria.
            </p>
          </div>

          {/* Domain grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {domains.map((domain, index) => (
              <motion.button
                key={domain.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                onClick={() => onSelectDomain(domain)}
                className="glass-card p-6 text-left group hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${domain.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <domain.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                  {domain.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {domain.description}
                </p>
                <div className="text-xs text-primary font-medium">
                  {domain.questionCount}+ questions
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
