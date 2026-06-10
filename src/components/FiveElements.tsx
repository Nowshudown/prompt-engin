import { useState } from "react";
import { Sparkles, ShieldCheck, Check, Lightbulb } from "lucide-react";

export default function FiveElements() {
  const [selectedElement, setSelectedElement] = useState<string>("role");

  const elementsList = [
    {
      id: "role",
      title: "1. Rôle (Qui IA ?)",
      color: "border-emerald-500/40 text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/15",
      highlightClass: "bg-emerald-500/20 text-emerald-300 border-b-2 border-emerald-500 px-1 py-0.5 rounded font-bold transition-all",
      pillBg: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
      desc: "Assignez une expertise, une profession ou un trait psychologique précis à l'IA.",
      tip: "Au lieu de 'Rédige une fiche produit', écrivez 'Tu es copywriter spécialisé dans la vente d’accessoires tech haut de gamme...'. Cela réduit dramatiquement le ton générique de l'IA et filtre les formulations banales.",
    },
    {
      id: "context",
      title: "2. Contexte (Pourquoi ?)",
      color: "border-teal-500/40 text-teal-300 bg-teal-500/10 hover:bg-teal-500/15",
      highlightClass: "bg-teal-500/20 text-teal-300 border-b-2 border-teal-500 px-1 py-0.5 rounded font-bold transition-all",
      pillBg: "bg-teal-500/15 text-teal-300 border-teal-500/30",
      desc: "Donnez les informations d'arrière-plan nécessaires, l'audience cible et le background.",
      tip: "Précisez l'audience ('pour des étudiants de licence 1', 'pour un client pressé') et l'enjeu ('suite à une baisse de trafic de 15%'). Plus l'IA a d'arrière-plan, plus ses arguments cibleront juste.",
    },
    {
      id: "goal",
      title: "3. Objectif (Quoi faire ?)",
      color: "border-cyan-500/40 text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/15",
      highlightClass: "bg-cyan-500/20 text-cyan-300 border-b-2 border-cyan-500 px-1 py-0.5 rounded font-bold transition-all",
      pillBg: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
      desc: "La tâche précise que l'IA doit accomplir, exprimée avec des verbes d'action puissants.",
      tip: "Utilisez un verbe fort : 'Analyse', 'Synthétise', 'Traduis', 'Réfute' au lieu de 'Fais quelque chose avec...'. Soyez direct et explicite sur le but final.",
    },
    {
      id: "constraints",
      title: "4. Contraintes (Les limites)",
      color: "border-rose-500/40 text-rose-300 bg-rose-500/10 hover:bg-rose-500/15",
      highlightClass: "bg-rose-500/20 text-rose-305 border-b-2 border-rose-500 px-1 py-0.5 rounded font-bold transition-all",
      pillBg: "bg-rose-500/15 text-rose-300 border-rose-500/30",
      desc: "Ce que l'IA a strictement interdiction de faire, ou les balises limites imposées.",
      tip: "Posez des barrières infranchissables : 'Ne dépasse pas 150 mots', 'N'utilise aucun anglicisme', 'Ne divulgue pas les prix'. C'est le meilleur filtre anti-bavardage.",
    },
    {
      id: "format",
      title: "5. Format de sortie (Comment ?)",
      color: "border-amber-500/40 text-amber-300 bg-amber-500/10 hover:bg-amber-500/15",
      highlightClass: "bg-amber-500/20 text-amber-305 border-b-2 border-amber-500 px-1 py-0.5 rounded font-bold transition-all",
      pillBg: "bg-amber-500/15 text-amber-300 border-amber-500/30",
      desc: "La mise en forme visuelle désirée pour exploiter directement la réponse.",
      tip: "Spécifiez la structure : un tableau Markdown de 3 colonnes, un extrait de code JSON valide, des puces hiérarchisées, ou une structure d'email prête pour le copier-coller.",
    },
  ];

  return (
    <section 
      id="five-elements" 
      className="min-h-screen py-24 px-4 flex flex-col justify-center relative overflow-hidden bg-[#030712] border-t border-emerald-500/5 snap-start"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col justify-center">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[10px] font-mono tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>L'anatomie d'un prompt parfait</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            Les 5 Éléments d’un Prompt d’Élite
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto font-light">
            Pour obtenir d'excellents résultats, combinez ces 5 ingrédients clés comme un ingénieur chevronné.
          </p>
        </div>

        {/* Blueprint Viewer Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left panel: Prompt Highlighter Code block */}
          <div className="lg:col-span-7 bg-[#0b1224] border border-emerald-500/10 rounded-3xl p-6 sm:p-8 shadow-xl shadow-black/45 relative">
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-[9px] text-slate-405 font-mono tracking-widest uppercase font-bold">Inspecteur anatomique</span>
            </div>

            <h3 className="text-[10px] font-bold text-slate-405 font-mono uppercase tracking-widest mb-6">
              Prompt Composite Exemple
            </h3>

            {/* Simulated compiler prompt text */}
            <div className="bg-[#070c18] p-6 rounded-2xl border border-slate-850 font-mono text-xs sm:text-sm leading-relaxed text-slate-300 select-none">
              <span 
                className={selectedElement === "role" ? elementsList[0].highlightClass : "hover:text-emerald-300 cursor-pointer transition-all border-b border-transparent"} 
                onClick={() => setSelectedElement("role")}
              >
                "Tu es un relecteur et réviseur de textes académiques senior, reconnu pour ta rigueur scientifique.
              </span>{" "}
              <span 
                className={selectedElement === "goal" ? elementsList[2].highlightClass : "hover:text-cyan-300 cursor-pointer transition-all border-b border-transparent"} 
                onClick={() => setSelectedElement("goal")}
              >
                Corrige et améliore ce manuscrit de recherche
              </span>{" "}
              <span 
                className={selectedElement === "context" ? elementsList[1].highlightClass : "hover:text-teal-300 cursor-pointer transition-all border-b border-transparent"} 
                onClick={() => setSelectedElement("context")}
              >
                qui est destiné à être publié dans une revue de premier plan en économie pour des chercheurs experts.
              </span>{" "}
              <span 
                className={selectedElement === "constraints" ? elementsList[3].highlightClass : "hover:text-rose-300 cursor-pointer transition-all border-b border-transparent"} 
                onClick={() => setSelectedElement("constraints")}
              >
                Sépare les phrases excessivement longues, supprime le vocabulaire inutilement complexe et ne touche sous aucun prétexte aux formules mathématiques ni aux citations scientifiques.
              </span>{" "}
              <span 
                className={selectedElement === "format" ? elementsList[4].highlightClass : "hover:text-amber-300 cursor-pointer transition-all border-b border-transparent"} 
                onClick={() => setSelectedElement("format")}
              >
                Renvoie-moi le texte révisé final en un seul bloc, suivi d'un tableau récapitulatif Markdown de 3 colonnes : Mot initial, Correction appliquée, et Brève justification de la modification."
              </span>
            </div>

            {/* Micro instruction */}
            <div className="mt-4.5 flex items-center gap-2 text-[11px] text-slate-405 font-sans italic">
              <Lightbulb className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Astuce : Cliquez sur les phrases du prompt ci-dessus pour zoomer sur chaque ingrédient.</span>
            </div>
          </div>

          {/* Right panel: Controls and detail box */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick action buttons selection */}
            <div className="flex flex-col gap-2">
              {elementsList.map((item) => (
                <button
                  key={item.id}
                  id={`btn-element-${item.id}`}
                  onClick={() => setSelectedElement(item.id)}
                  className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm font-bold tracking-wider uppercase font-mono transition-all cursor-pointer ${
                    selectedElement === item.id
                      ? `${item.color} shadow-lg scale-[1.01]`
                      : "bg-[#070c18] border-slate-850 text-slate-400 hover:text-slate-200 hover:bg-[#121c35]/40"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{item.title}</span>
                    {selectedElement === item.id && <Check className="w-4 h-4" />}
                  </div>
                </button>
              ))}
            </div>

            {/* Element Detail dynamic card */}
            {selectedElement && (
              <div id="element-detail-card" className="bg-[#0b1224] border border-emerald-500/10 rounded-2xl p-6 shadow-xl shadow-black/40 animate-fade-in">
                {elementsList.map((item) => {
                  if (item.id !== selectedElement) return null;
                  return (
                    <div key={item.id} className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className={`px-2.5 py-1 text-[9px] font-bold font-mono tracking-wider uppercase rounded-md border ${item.pillBg}`}>
                          Zoom composant
                        </span>
                        <ShieldCheck className="w-5 h-5 text-emerald-400" />
                      </div>
                      
                      <h4 className="text-base sm:text-xl font-bold text-slate-100 font-display">
                        {item.title.substring(3)}
                      </h4>

                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                        {item.desc}
                      </p>

                      <div className="bg-[#070c18] p-4 rounded-xl border border-slate-850 shadow-inner">
                        <span className="text-[10px] text-emerald-400 font-mono block uppercase mb-1.5 font-bold tracking-wider">Conseil d’ingénieur :</span>
                        <p className="text-xs text-slate-400 leading-relaxed font-mono">
                          {item.tip}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
