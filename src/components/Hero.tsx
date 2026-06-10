import { ArrowRight, User, Shield, Sparkles } from "lucide-react";
import GalsenLogo from "./GalsenLogo";

interface HeroProps {
  onStart: () => void;
}

export default function Hero({ onStart }: HeroProps) {
  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#030712] snap-start select-none"
    >
      {/* Soft aesthetic background details */}
      <div className="absolute top-[10%] left-[10%] w-[40rem] h-[40rem] rounded-full bg-emerald-500/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[50rem] h-[50rem] rounded-full bg-teal-500/10 blur-[150px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6 py-16 w-full flex flex-col justify-between min-h-screen">
        
        {/* TOP: Logo GALSEN AI & Brand */}
        <div className="flex justify-center items-center pt-8 animate-fade-in">
          <div className="flex flex-col items-center gap-2">
            {/* Authentic Galsen AI Logo component */}
            <GalsenLogo showText={true} textSize="md" variant="light" />
            <span className="text-[10px] text-slate-400 font-mono tracking-widest uppercase mt-3 text-center">
              L'excellence de l'IA au Sénégal et en Afrique
            </span>
          </div>
        </div>

        {/* MIDDLE: Majestic Presentation Title & Subtitle */}
        <div className="text-center my-auto px-4 py-8 flex flex-col justify-center items-center gap-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono tracking-widest uppercase transition-all">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Masterclass Technologique</span>
          </div>

          {/* Main Title */}
          <h1 className="font-display font-extrabold text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-none text-white max-w-4xl">
            PROMPT <br className="sm:hidden" />
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              ENGINEERING
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-slate-350 text-xs sm:text-lg tracking-[0.16em] font-light max-w-3xl leading-relaxed uppercase border-t border-b border-emerald-500/10 py-4 w-full">
            L'Art de communiquer avec l'Intelligence Artificielle
          </p>

          <p className="text-slate-400 text-xs sm:text-sm max-w-md font-sans italic leading-relaxed">
            "Le nouveau langage de programmation le plus puissant au monde n'est pas le Python ou le C++, c'est tout simplement notre langage naturel."
          </p>
        </div>

        {/* BOTTOM: Presenter info & Commencement button */}
        <div className="flex flex-col items-center gap-8 pb-12">
          
          {/* Elegant Presenter Badge */}
          <div className="flex flex-col items-center text-center gap-1.5 bg-[#0b1224] border border-emerald-500/10 rounded-2xl px-6 py-4 shadow-xl shadow-black/40">
            <span className="text-[9px] text-slate-500 font-mono tracking-widest uppercase mb-1">Conférencier Principal</span>
            
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                <User className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <span className="font-display text-slate-100 font-bold text-base tracking-wide">
                El Hadji Tanor DIENG
              </span>
            </div>
            
            <span className="text-xs text-emerald-450 font-mono tracking-wider flex items-center gap-1.5 mt-0.5 justify-center">
              <Shield className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              Ambassadeur GALSEN AI
            </span>
          </div>

          {/* CTA Trigger */}
          <div className="flex flex-col items-center gap-3">
            <button
              id="hero-btn-start"
              onClick={onStart}
              className="group relative flex items-center justify-center gap-3 px-10 py-5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 font-bold text-white tracking-widest uppercase text-xs shadow-xl shadow-emerald-500/20 transition-all duration-300 scale-100 hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
            >
              <span>Commencer la présentation</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" />
            </button>
            
            <span className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">Défilement vers le bas pour continuer</span>
          </div>

        </div>

      </div>
    </section>
  );
}
