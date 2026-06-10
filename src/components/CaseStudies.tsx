import { useState } from "react";
import { caseStudies } from "../data/promptData";
import { Code, Database, Megaphone, BookOpen, ChevronRight, X, Sparkles } from "lucide-react";

export default function CaseStudies() {
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);

  const getIcon = (name: string) => {
    switch (name) {
      case "Code":
        return <Code className="w-5 h-5 text-emerald-400" />;
      case "Database":
        return <Database className="w-5 h-5 text-teal-400" />;
      case "Megaphone":
        return <Megaphone className="w-5 h-5 text-rose-400" />;
      case "BookOpen":
      default:
        return <BookOpen className="w-5 h-5 text-amber-400" />;
    }
  };

  const getBorderColor = (id: string) => {
    switch (id) {
      case "dev":
        return "hover:border-emerald-555/40 focus:border-emerald-555";
      case "datascience":
        return "hover:border-teal-555/40 focus:border-teal-555";
      case "marketing":
        return "hover:border-rose-555/40 focus:border-rose-555";
      case "etudes":
      default:
        return "hover:border-amber-555/40 focus:border-amber-555";
    }
  };

  const activeCase = caseStudies.find((c) => c.id === selectedCaseId);

  return (
    <section 
      id="case-studies" 
      className="min-h-screen py-24 px-4 flex flex-col justify-center relative overflow-hidden bg-[#030712] border-t border-emerald-500/5 snap-start"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col justify-center">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[10px] font-mono tracking-widest uppercase">
            <BookOpen className="w-4 h-4 text-emerald-400" />
            <span>Cas d'utilisation réels</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            Cas d’Usage de l’Étudiant d’Élite
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto font-light">
            Découvrez comment vos camarades de promotion et les industries modernes exploitent le Prompting concret au quotidien.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {caseStudies.map((item) => (
            <button
              key={item.id}
              id={`case-card-${item.id}`}
              onClick={() => setSelectedCaseId(item.id)}
              className={`text-left p-6 rounded-2xl bg-[#0b1224] border border-slate-850/80 transition-all duration-300 hover:bg-[#121c35]/30 hover:-translate-y-1 hover:shadow-xl shadow-black/35 group cursor-pointer ${getBorderColor(
                item.id
              )}`}
            >
              {/* Header inside card */}
              <div className="flex items-center justify-between mb-6">
                <div className="p-2.5 rounded-xl bg-[#070c18] border border-slate-800 group-hover:border-emerald-500/30 group-hover:bg-emerald-500/10 transition-all">
                  {getIcon(item.iconName)}
                </div>
                <span className="text-[9px] font-mono text-slate-500 tracking-widest uppercase font-bold">Consulter</span>
              </div>

              <span className="text-[9px] text-emerald-400 font-mono tracking-widest font-bold block uppercase mb-1">
                {item.category}
              </span>
              
              <h3 className="text-sm sm:text-base font-bold text-slate-100 group-hover:text-white tracking-tight leading-snug mb-3">
                {item.title}
              </h3>
              
              <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 font-light font-sans">
                {item.prompt}
              </p>

              <div className="mt-6 flex items-center gap-1 text-[10px] font-bold text-emerald-400 font-mono uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                <span>Voir le rendu attendu</span>
                <ChevronRight className="w-3.5 h-3.5 text-emerald-400" />
              </div>
            </button>
          ))}
        </div>

        {/* Expanded walkthrough console (In-page expanded view for smooth performance inside iframe) */}
        {activeCase && (
          <div id="case-study-expanded-view" className="mt-8 p-6 sm:p-8 bg-[#0b1224] border border-emerald-500/20 rounded-3xl shadow-2xl shadow-black/50 relative animate-fade-in">
            <button
              id="btn-close-case"
              onClick={() => setSelectedCaseId(null)}
              className="absolute top-4 right-4 p-2 rounded-lg bg-[#070c18] hover:bg-[#121c35] border border-slate-800 text-slate-405 hover:text-white transition-all cursor-pointer"
              title="Fermer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2.5 mb-6">
              <span className="p-2.5 rounded-xl bg-[#070c18] border border-slate-800 text-emerald-450">
                {getIcon(activeCase.iconName)}
              </span>
              <div>
                <span className="text-[9px] text-emerald-400 font-mono font-bold uppercase tracking-widest font-sans">
                  {activeCase.category}
                </span>
                <h4 className="text-base sm:text-xl font-bold text-slate-100 tracking-tight font-display">
                  {activeCase.title}
                </h4>
              </div>
            </div>

            {/* Side-by-side terminal of the exact prompt vs simulated output */}
            <div className="grid md:grid-cols-12 gap-6 items-stretch">
              {/* Prompt box */}
              <div className="space-y-1.5 md:col-span-6 flex flex-col justify-between">
                <div>
                  <span className="text-[9px] text-slate-400 font-mono block uppercase tracking-widest mb-1.5 font-bold">Prompt d'Expert formulé :</span>
                  <div className="bg-[#070c18] p-4.5 rounded-2xl border border-slate-850 font-mono text-xs text-slate-300 leading-relaxed italic last:mb-0">
                    "{activeCase.prompt}"
                  </div>
                </div>
              </div>

              {/* Response box */}
              <div className="space-y-1.5 md:col-span-6">
                <span className="text-[9px] text-emerald-400 font-mono block uppercase tracking-widest font-bold mb-1.5">Restitution de l'IA attendue :</span>
                <div className="bg-[#070c18] p-4.5 rounded-2xl border border-slate-850 space-y-3 shadow-inner">
                  <div className="flex items-center gap-1 text-xs text-emerald-400 font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Format de sortie final :</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light whitespace-pre-line font-sans">
                    {activeCase.response}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
