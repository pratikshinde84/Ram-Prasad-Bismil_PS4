import { useState } from "react";
import { HeroSection } from "@/components/landing/HeroSection";
import { DomainSelector, Domain } from "@/components/interview/DomainSelector";
import { InterviewSession } from "@/components/interview/InterviewSession";
import { InterviewReport } from "@/components/interview/InterviewReport";

type AppState = "landing" | "domain-select" | "interview" | "report";

const Index = () => {
  const [appState, setAppState] = useState<AppState>("landing");
  const [selectedDomain, setSelectedDomain] = useState<Domain | null>(null);

  const handleStartInterview = () => {
    setAppState("domain-select");
  };

  const handleSelectDomain = (domain: Domain) => {
    setSelectedDomain(domain);
    setAppState("interview");
  };

  const handleCompleteInterview = () => {
    setAppState("report");
  };

  const handleBackToLanding = () => {
    setAppState("landing");
    setSelectedDomain(null);
  };

  const handleBackToDomainSelect = () => {
    setAppState("domain-select");
  };

  const handleStartNew = () => {
    setAppState("domain-select");
  };

  return (
    <main className="min-h-screen">
      {appState === "landing" && (
        <HeroSection onStartInterview={handleStartInterview} />
      )}

      {appState === "domain-select" && (
        <DomainSelector
          onSelectDomain={handleSelectDomain}
          onBack={handleBackToLanding}
        />
      )}

      {appState === "interview" && selectedDomain && (
        <InterviewSession
          domain={selectedDomain}
          onComplete={handleCompleteInterview}
          onBack={handleBackToDomainSelect}
        />
      )}

      {appState === "report" && selectedDomain && (
        <InterviewReport
          domain={selectedDomain}
          onBack={handleBackToLanding}
          onStartNew={handleStartNew}
        />
      )}
    </main>
  );
};

export default Index;
