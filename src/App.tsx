import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Maximize2, Minimize2, Play, Presentation, Sparkles } from "lucide-react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import IceBreaker from "./components/IceBreaker";
import PromptDefinition from "./components/PromptDefinition";
import Comparison from "./components/Comparison";
import FiveElements from "./components/FiveElements";
import AdvancedTechniques from "./components/AdvancedTechniques";
import CaseStudies from "./components/CaseStudies";
import InteractiveQuiz from "./components/InteractiveQuiz";
import FinalChallenge from "./components/FinalChallenge";
import LivePromptBattle from "./components/LivePromptBattle";
import Conclusion from "./components/Conclusion";

const SECTIONS = [
  "hero",
  "icebreaker",
  "definition",
  "comparison",
  "five-elements",
  "advanced",
  "case-studies",
  "quiz",
  "challenge",
  "conclusion",
  "prompt-battle",
];

const SECTION_LABELS: Record<string, string> = {
  hero: "Page de Garde",
  icebreaker: "Ice Breaker",
  definition: "C'est quoi un Prompt ?",
  comparison: "Duel de Prompts",
  "five-elements": "Les 5 Éléments Clés",
  advanced: "Techniques de Prototypage",
  "case-studies": "Cas d'usage Réels",
  quiz: "Quiz Interactif",
  challenge: "Défi Final",
  conclusion: "Les 5 Règles d'Or",
  "prompt-battle": "Battle de Prompts !",
};

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      let current = "hero";
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of SECTIONS) {
        const element = document.getElementById(section);
        if (element) {
          const topOffset = element.offsetTop;
          if (scrollPosition >= topOffset) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    // Reset scroll behavior on mount to render first slide perfectly
    window.scrollTo({ top: 0 });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleStartExperience = () => {
    const icebreakerSection = document.getElementById("icebreaker");
    if (icebreakerSection) {
      icebreakerSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleNextSlide = () => {
    const currentIndex = SECTIONS.indexOf(activeSection);
    if (currentIndex < SECTIONS.length - 1) {
      const nextElem = document.getElementById(SECTIONS[currentIndex + 1]);
      nextElem?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handlePrevSlide = () => {
    const currentIndex = SECTIONS.indexOf(activeSection);
    if (currentIndex > 0) {
      const prevElem = document.getElementById(SECTIONS[currentIndex - 1]);
      prevElem?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Keyboard navigation for presentation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable
      ) {
        return; // Avoid intercepting inputs
      }

      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") {
        e.preventDefault();
        handleNextSlide();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        handlePrevSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeSection]);

  // Fullscreen toggle API
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch((err) => {
        console.error("Error attempting to enable fullscreen:", err);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      });
    }
  };

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  const currentIdx = SECTIONS.indexOf(activeSection);

  return (
    <div className="bg-[#030712] text-slate-100 min-h-screen selection:bg-emerald-500/20 selection:text-emerald-300 font-sans antialiased">
      {/* Persistant Navigation Header with scroll progress indicator */}
      <Navbar activeSection={activeSection} />

      {/* Main Slides Body */}
      <main className="relative">
        {/* 1. Hero / Cover Page */}
        <Hero onStart={handleStartExperience} />

        {/* 2. Ice Breaker Live Voting Polling Widget */}
        <IceBreaker />

        {/* 3. What is a Prompt? Core definitions & animated execution flow */}
        <PromptDefinition />

        {/* 4. Prompt Importance Showdown: Bad vs Good Terminal Prompt comparison */}
        <Comparison />

        {/* 5. The 5 Core Elements Blueprint interactive highlighters */}
        <FiveElements />

        {/* 6. Supercharged Prompt Tactics (Few-shot, One-shot, Chain of Thought Reasoning) */}
        <AdvancedTechniques />

        {/* 7. Domain and Student Case Studies slider cards */}
        <CaseStudies />

        {/* 8. Multi-question Interactive Student Knowledge Game Quiz */}
        <InteractiveQuiz />

        {/* 9. Final submission workbench and auto evaluator */}
        <FinalChallenge />

        {/* 10. Memento Summary Rules and takeaway list (Les 5 Règles d'Or) */}
        <Conclusion />

        {/* 11. Live Student Prompt Evaluation Tournament */}
        <LivePromptBattle />
      </main>
    </div>
  );
}
