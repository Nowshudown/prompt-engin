import { goldenRules } from "../data/promptData";
import { Sparkles, CheckCircle2, ChevronUp } from "lucide-react";

export default function Conclusion() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer 
      id="conclusion" 
      className="min-h-screen py-24 px-4 relative overflow-hidden bg-[#030712] border-t border-emerald-500/5 snap-start flex flex-col justify-center"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col justify-center">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[10px] font-mono tracking-widest uppercase">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Mémento de fin</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            Les 5 Règles d'Or du Prompting
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto font-light">
            Gardez ces 5 principes d'ingénierie cognitive ancrés à l'esprit pour exceller à chaque interaction avec n'importe quelle IA générative.
          </p>
        </div>

        {/* 5 Rules Bento Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
          {goldenRules.map((rule) => (
            <div
              key={rule.number}
              className="bg-[#0b1224] border border-slate-850 p-6 rounded-2xl flex flex-col justify-between transition-all duration-300 hover:border-emerald-500/40 hover:-translate-y-1 relative group shadow-lg"
            >
              <div className="relative z-10">
                {/* Number */}
                <div className="text-3xl font-display font-black text-emerald-400 mb-4 select-none">
                  {rule.number}
                </div>

                <h3 className="text-sm font-bold text-white tracking-wide mb-2 uppercase font-display">
                  {rule.title}
                </h3>
                
                <p className="text-xs text-slate-400 leading-relaxed font-light">
                  {rule.desc}
                </p>
              </div>

              <div className="relative z-10 mt-6 flex items-center gap-1.5 text-[9px] text-emerald-400 font-mono font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Règle active</span>
              </div>
            </div>
          ))}
        </div>

        {/* Presentation Summary and Back to top */}
        <div className="mt-12 pt-8 border-t border-slate-850 flex flex-col sm:flex-row items-center justify-between gap-6">
          
          {/* Copyright/Reference credits */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <span className="text-xs text-slate-500 font-mono tracking-widest uppercase">
              © {new Date().getFullYear()} • Masterclass Prompt Engineering
            </span>
            <span className="text-[10px] text-slate-400 font-mono mt-1 uppercase tracking-wider">
              Présenté par El Hadji Tanor DIENG • Ambassadeur GALSEN AI
            </span>
          </div>

          {/* Back to top dynamic button */}
          <button
            id="btn-scroll-top"
            onClick={handleScrollToTop}
            className="group inline-flex items-center gap-1.5 px-4.5 py-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/20 text-xs font-bold tracking-widest uppercase font-mono transition-all cursor-pointer shadow-lg active:scale-95"
          >
            <span>Retour en haut</span>
            <ChevronUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </footer>
  );
}
