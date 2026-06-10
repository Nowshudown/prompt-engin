import { useState, useEffect } from "react";
import { Target } from "lucide-react";
import GalsenLogo from "./GalsenLogo";

interface NavbarProps {
  activeSection: string;
}

export default function Navbar({ activeSection }: NavbarProps) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.pageYOffset / totalScroll) * 100);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "intro", label: "01. Introduction", subSections: ["hero", "icebreaker"], targetId: "hero" },
    { id: "anatomy", label: "02. Anatomie", subSections: ["definition", "comparison", "five-elements"], targetId: "definition" },
    { id: "methods", label: "03. Méthodes", subSections: ["advanced", "case-studies"], targetId: "advanced" },
    { id: "practice", label: "04. Pratique", subSections: ["quiz", "challenge", "conclusion", "prompt-battle"], targetId: "quiz" },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#060b18]/90 backdrop-blur-md border-b border-emerald-500/10 transition-all duration-300 shadow-xl shadow-black/20">
      {/* Scroll Progress Bar at the very top using Galsen authentic green */}
      <div 
        className="h-[2px] bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-100"
        style={{ width: `${scrollProgress}%` }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Branding - using authentic GalsenLogo component */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection("hero")}>
            <GalsenLogo showText={true} textSize="sm" variant="dark" className="scale-90" />
          </div>

          {/* Desktop Navigation Links - simplified & structured */}
          <div className="hidden lg:flex items-center gap-3">
            {navItems.map((item) => {
              const isActive = item.subSections.includes(activeSection);
              return (
                <button
                  key={item.id}
                  id={`nav-btn-${item.id}`}
                  onClick={() => scrollToSection(item.targetId)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer border ${
                    isActive
                      ? "bg-emerald-500/10 text-emerald-305 border-emerald-500/30 font-bold shadow-md shadow-emerald-900/10"
                      : "text-slate-400 border-transparent hover:text-slate-100 hover:bg-slate-800/40"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Quick Action Button - Trigger Quiz / Sandbox Workshop */}
          <div className="flex items-center">
            <button
              id="cta-presenter"
              onClick={() => scrollToSection("prompt-battle")}
              className="relative group overflow-hidden px-4.5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shrink-0 text-white text-xs font-semibold font-mono uppercase tracking-widest shadow-lg shadow-emerald-950/20 transition-all duration-200 cursor-pointer active:scale-95 animate-pulse"
            >
              <div className="flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-white" />
                <span>Battle Live !</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
