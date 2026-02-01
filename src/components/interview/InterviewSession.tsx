import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Send, Mic, MicOff, Clock, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Domain } from "./DomainSelector";
import { Progress } from "@/components/ui/progress";

interface Message {
  id: string;
  role: "interviewer" | "candidate";
  content: string;
  timestamp: Date;
}

interface InterviewSessionProps {
  domain: Domain;
  onComplete: (messages: Message[]) => void;
  onBack: () => void;
}

const generateQuestion = (domain: Domain, questionIndex: number, previousAnswer?: string): string => {
  const questions: Record<string, string[]> = {
    software: [
      "Tell me about yourself and your experience in software engineering.",
      "Can you explain the difference between REST and GraphQL APIs? When would you choose one over the other?",
      "Walk me through how you would design a URL shortening service like bit.ly.",
      "Describe a challenging bug you've encountered. How did you debug and resolve it?",
      "How do you ensure code quality in your projects? What practices do you follow?",
    ],
    "data-science": [
      "What drew you to data science, and what's your experience in the field?",
      "Explain the bias-variance tradeoff and how it affects model performance.",
      "How would you handle missing data in a dataset? Walk me through your approach.",
      "Describe a machine learning project you've worked on from start to finish.",
      "What metrics would you use to evaluate a classification model with imbalanced classes?",
    ],
    cloud: [
      "Tell me about your experience with cloud platforms and infrastructure.",
      "Explain the differences between containers and virtual machines. When would you use each?",
      "How would you design a highly available and scalable web application on AWS?",
      "Describe your experience with CI/CD pipelines. What tools have you used?",
      "How do you approach cloud cost optimization?",
    ],
    hr: [
      "Tell me about yourself and what motivates you professionally.",
      "Describe a time when you had to resolve a conflict with a team member.",
      "How do you prioritize tasks when you have multiple deadlines?",
      "Tell me about a time you failed. What did you learn from it?",
      "Where do you see yourself in five years?",
    ],
    product: [
      "What interests you about product management?",
      "How would you prioritize features for a new product launch?",
      "Describe how you would measure the success of a product feature.",
      "Walk me through how you would handle disagreements with engineering on scope.",
      "How do you gather and incorporate user feedback into your product decisions?",
    ],
    analytics: [
      "Tell me about your experience with data analysis and business intelligence.",
      "How would you approach analyzing a sudden drop in user engagement?",
      "Explain how you would build a dashboard to track key business metrics.",
      "Describe a time when your analysis influenced a business decision.",
      "What's your approach to presenting complex data to non-technical stakeholders?",
    ],
    security: [
      "What drew you to cybersecurity, and what's your background?",
      "Explain the OWASP Top 10 and which vulnerabilities you consider most critical.",
      "How would you respond to a suspected data breach?",
      "Describe your experience with penetration testing methodologies.",
      "How do you stay current with the evolving threat landscape?",
    ],
    design: [
      "Tell me about your design background and what inspires you.",
      "Walk me through your design process from research to final deliverable.",
      "How do you handle feedback that conflicts with your design vision?",
      "Describe a time when user research changed your design direction.",
      "How do you balance user needs with business requirements?",
    ],
  };

  const domainQuestions = questions[domain.id] || questions.hr;
  return domainQuestions[Math.min(questionIndex, domainQuestions.length - 1)];
};

export const InterviewSession = ({ domain, onComplete, onBack }: InterviewSessionProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "interviewer",
      content: generateQuestion(domain, 0),
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const totalQuestions = 5;

  const handleSendMessage = useCallback(() => {
    if (!input.trim()) return;

    const candidateMessage: Message = {
      id: Date.now().toString(),
      role: "candidate",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, candidateMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI thinking and generating next question
    setTimeout(() => {
      const nextIndex = questionIndex + 1;
      
      if (nextIndex >= totalQuestions) {
        // Interview complete
        setIsTyping(false);
        onComplete([...messages, candidateMessage]);
        return;
      }

      const interviewerMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "interviewer",
        content: generateQuestion(domain, nextIndex, candidateMessage.content),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, interviewerMessage]);
      setQuestionIndex(nextIndex);
      setIsTyping(false);
    }, 1500);
  }, [input, questionIndex, domain, messages, onComplete]);

  const progress = ((questionIndex + 1) / totalQuestions) * 100;

  return (
    <section className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={onBack}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Exit Interview
            </Button>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>Question {questionIndex + 1}/{totalQuestions}</span>
              </div>
              <div className="flex items-center gap-2">
                <domain.icon className="w-5 h-5 text-primary" />
                <span className="font-medium">{domain.name}</span>
              </div>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="mt-4">
            <Progress value={progress} className="h-1" />
          </div>
        </div>
      </header>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto py-8">
        <div className="container px-4 max-w-3xl mx-auto">
          <AnimatePresence mode="popLayout">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`mb-6 flex ${message.role === "candidate" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-5 py-4 ${
                    message.role === "candidate"
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "glass-card rounded-bl-sm"
                  }`}
                >
                  <p className="text-[15px] leading-relaxed">{message.content}</p>
                </div>
              </motion.div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start mb-6"
              >
                <div className="glass-card rounded-2xl rounded-bl-sm px-5 py-4">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-primary typing-dot" />
                    <div className="w-2 h-2 rounded-full bg-primary typing-dot" />
                    <div className="w-2 h-2 rounded-full bg-primary typing-dot" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Input area */}
      <div className="sticky bottom-0 bg-background/80 backdrop-blur-xl border-t border-border">
        <div className="container px-4 py-4 max-w-3xl mx-auto">
          <div className="flex items-end gap-3">
            <Button
              variant="glass"
              size="icon"
              onClick={() => setIsRecording(!isRecording)}
              className={`shrink-0 ${isRecording ? "bg-destructive/20 text-destructive pulse-glow" : ""}`}
            >
              {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </Button>

            <div className="flex-1 relative">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Type your answer..."
                className="min-h-[52px] max-h-32 resize-none pr-12 bg-card border-border focus:border-primary/50"
                rows={1}
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 bottom-2 text-muted-foreground hover:text-primary"
              >
                <HelpCircle className="w-4 h-4" />
              </Button>
            </div>

            <Button
              onClick={handleSendMessage}
              disabled={!input.trim() || isTyping}
              className="shrink-0"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Press Enter to send • Shift+Enter for new line
          </p>
        </div>
      </div>
    </section>
  );
};
