import { useState } from "react";
import { Sparkles, CheckCircle2, XCircle, Sliders, Play } from "lucide-react";

export default function Comparison() {
  const [activeTab, setActiveTab] = useState<"bad" | "good" | "none" | "both">("none");

  const badPrompt = "Parle-moi de Python";
  const badResponse = `Python est un langage de programmation interprété, multi-paradigme et multiplateforme. Il favorise la programmation impérative structurée, fonctionnelle et orientée objet. Il a été créé en 1991 par Guido van Rossum. Ses bibliothèques incluent NumPy, Pandas et d'autres outils d'ingénierie avancés couramment utilisés dans les applications d'intelligence artificielle ou de développement d'applications système de haut niveau.`;

  const goodPrompt = "Tu es ingénieur principal et formateur d'élite. Explique les 5 concepts piliers de la programmation Python à un débutant ambitieux. Utilise une analogie moderne et épurée comme le pilotage d'un drone d'exploration intelligent, avec des explications claires et techniques.";
  const goodResponse = `Bonjour ! Bienvenue dans votre premier briefing aéronautique Python. 🐍

Pour comprendre Python, imaginez que vous programmez l'ordinateur de bord d'un **drone autonome d'exploration**. Voici comment se structurent ses 5 composants système indispensables :

1. 📦 **Les Variables (Le tableau de télémétrie)** : Écrire \`altitude = 150\` ou \`statut = "En vol"\` revient à réserver de petites zones de mémoire vive sur le drone pour enregistrer des données cruciales à réutiliser à tout moment.
2. 🎛️ **Les Types de données (La nature des signaux)** : On distingue rigoureusement les coordonnées numériques précises (les Décimaux ou "Floats" comme \`4.75\`) et les commandes de texte (les Chaînes ou "Strings" comme \`"AUTO"\`). Python protège votre vol en refusant d'additionner des données incompatibles.
3. 🔀 **Les Conditions (Les protocoles d'évitement)** : Des blocs décisionnels logiques qui sauvent le drone. Par exemple : \`if batterie < 15: declencher_atterrissage()\`. L'appareil analyse l'état réel et prend des décisions autonomes de sécurité.
4. 🔄 **Les Boucles (La boucle d'acquisition de données)** : Pour scanner une zone quadrillée sans réécrire mille fois le même code de détection, on utilise une boucle répétitive qui parcourt automatiquement chaque secteur un par un (\`for secteur in cartographie: scanner(secteur)\`).
5. 🧁 **Les Fonctions (Les modules de vol réutilisables)** : Un pack d'instructions packagées et nommées (ex: \`decoller_et_stabiliser()\`). On l'implémente une fois pour toutes, et on l'appelle à la demande pour exécuter instantanément une suite de manœuvres complexes de vol.`;

  return (
    <section 
      id="comparison" 
      className="min-h-screen py-24 px-4 flex flex-col justify-center relative overflow-hidden bg-[#030712] border-t border-emerald-500/5 snap-start"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col justify-center">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[10px] font-mono tracking-widest uppercase">
            <Sliders className="w-3.5 h-3.5 text-emerald-400" />
            <span>Comparaison interactive</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            Pourquoi le Prompting est-il Crucial ?
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto font-light">
            La règle d'or universelle de la tech : <em className="text-emerald-400 font-medium not-italic font-semibold">"Garbage In, Garbage Out."</em> La qualité des entrées conditionne impérativement la valeur de vos sorties.
          </p>
        </div>

        {/* The Duel Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8 items-stretch">
          
          {/* Mauvais Prompt Side */}
          <div className="flex flex-col rounded-3xl bg-[#0b1224] border border-slate-800 overflow-hidden shadow-xl shadow-black/40 transition-all duration-300 hover:border-red-500/30">
            {/* Stage Bar */}
            <div className="px-5 py-4 bg-[#080d1a]/55 border-b border-slate-900/60 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <span className="text-[10px] font-mono font-extrabold text-red-400 uppercase tracking-widest">Le Mauvais Prompt</span>
              </div>
              <span className="text-[10px] text-red-400 font-mono tracking-wider font-semibold">⚠️ Flou & Passif</span>
            </div>

            <div className="p-6 flex-grow flex flex-col justify-between space-y-6">
              {/* Input section */}
              <div className="bg-[#070c18] p-4.5 rounded-2xl border border-slate-850">
                <p className="text-[9px] text-slate-500 font-mono mb-2 uppercase tracking-widest font-bold">PROMPT SOUMIS :</p>
                <div className="text-xs sm:text-sm font-mono text-slate-400 italic">
                  "{badPrompt}"
                </div>
              </div>

              {/* Run Action */}
              {activeTab !== "bad" && activeTab !== "both" && activeTab !== "good" && (
                <div className="text-center py-6">
                  <button
                    id="btn-trigger-bad"
                    onClick={() => setActiveTab("bad")}
                    className="px-5 py-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-300 text-xs font-bold uppercase tracking-wider flex items-center gap-2 mx-auto cursor-pointer transition-colors active:scale-95"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>Lancer le prompt vague</span>
                  </button>
                </div>
              )}

              {/* Response Output */}
              {(activeTab === "bad" || activeTab === "both" || activeTab === "good") && (
                <div className="space-y-4 animate-fade-in">
                  <div className="bg-[#070c18] p-4.5 rounded-2xl border border-slate-855 space-y-3">
                    <span className="text-[10px] font-mono text-slate-550 block font-bold uppercase tracking-widest">RÉPONSE DU MODÈLE :</span>
                    <p className="text-xs text-slate-300 leading-relaxed font-light">
                      {badResponse}
                    </p>
                  </div>

                  {/* Performance Indicators */}
                  <div className="space-y-2 pt-2 border-t border-slate-900">
                    <span className="text-[9px] text-slate-500 font-mono block uppercase tracking-widest font-bold">Analyse critique :</span>
                    
                    <div className="flex items-start gap-2 text-xs text-red-300/95 font-light font-sans">
                      <XCircle className="w-4 h-4 shrink-0 text-red-500 mt-0.5" />
                      <span>Aucune structure, un simple bloc indigeste de définitions académiques.</span>
                    </div>
                    <div className="flex items-start gap-2 text-xs text-red-300/95 font-light font-sans">
                      <XCircle className="w-4 h-4 shrink-0 text-red-500 mt-0.5" />
                      <span>N'adapte pas le ton au niveau du public (jargon brut).</span>
                    </div>

                    <div className="pt-2">
                      <div className="flex justify-between text-[10px] font-mono text-slate-450 mb-1 font-bold">
                        <span>Intérêt pédagogique</span>
                        <span className="text-red-400 font-bold">25%</span>
                      </div>
                      <div className="h-1 bg-slate-900 rounded-full overflow-hidden">
                        <div className="h-full bg-red-500 w-1/4 rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bon Prompt Side */}
          <div className="flex flex-col rounded-3xl bg-[#0b1224] border border-slate-850 overflow-hidden shadow-xl shadow-black/40 transition-all duration-300 hover:border-emerald-500/30">
            {/* Stage Bar */}
            <div className="px-5 py-4 bg-[#080d1a]/55 border-b border-slate-900/60 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-mono font-extrabold text-emerald-400 uppercase tracking-widest">Le Bon Prompt</span>
              </div>
              <span className="text-[10px] text-emerald-450 font-mono flex items-center gap-1.5 tracking-wider font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Structuré & Précis
              </span>
            </div>

            <div className="p-6 flex-grow flex flex-col justify-between space-y-6">
              {/* Input section */}
              <div className="bg-emerald-500/5 p-4.5 rounded-2xl border border-emerald-500/10">
                <p className="text-[9px] text-emerald-400 font-mono mb-2 uppercase tracking-widest font-bold">PROMPT SOUMIS :</p>
                <div className="text-xs sm:text-sm font-mono text-slate-200 leading-relaxed">
                  "{goodPrompt}"
                </div>
              </div>

              {/* Run Action */}
              {activeTab !== "good" && activeTab !== "both" && (
                <div className="text-center py-6">
                  <button
                    id="btn-trigger-good"
                    onClick={() => setActiveTab("good")}
                    className="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 mx-auto cursor-pointer shadow-md transition-colors active:scale-95"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Lancer le prompt d'expert</span>
                  </button>
                </div>
              )}

              {/* Response Output */}
              {(activeTab === "good" || activeTab === "both") && (
                <div className="space-y-4 animate-fade-in">
                  <div className="bg-[#070c18] p-4.5 rounded-2xl border border-slate-855 space-y-3">
                    <span className="text-[10px] font-mono text-emerald-400 block font-bold uppercase tracking-widest">💎 RÉPONSE DU MODÈLE :</span>
                    <p className="text-[11px] sm:text-xs text-slate-250 leading-relaxed whitespace-pre-line font-light font-sans">
                      {goodResponse}
                    </p>
                  </div>

                  {/* Performance Indicators */}
                  <div className="space-y-2 pt-2 border-t border-slate-900">
                    <span className="text-[9px] text-slate-500 font-mono block uppercase tracking-widest font-bold">Points gagnants :</span>
                    
                    <div className="flex items-start gap-2 text-xs text-emerald-350 font-light font-sans">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
                      <span>Extrêmement lisible, structuré avec paragraphes clairs.</span>
                    </div>
                    <div className="flex items-start gap-2 text-xs text-emerald-350 font-light font-sans">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
                      <span>Analogie technologique captivante (drone autonome) simplifiant l'assimilation.</span>
                    </div>

                    <div className="pt-2">
                      <div className="flex justify-between text-[10px] font-mono text-slate-450 mb-1 font-bold">
                        <span>Intérêt pédagogique</span>
                        <span className="text-emerald-400 font-bold">98%</span>
                      </div>
                      <div className="h-1 bg-slate-900 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 w-[98%] rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Footnote */}
        <div className="p-4.5 bg-emerald-500/5 rounded-2xl border border-emerald-500/10 text-center shadow-lg">
          <p className="text-xs sm:text-sm text-slate-300 font-light font-sans">
            💡 <strong className="text-white">Leçon :</strong> Pourquoi un tel écart ? Parce que dans le second cas, on a configuré un <span className="text-emerald-400 font-semibold font-mono">Rôle</span> (formateur), un <span className="text-teal-400 font-semibold font-mono">Public cible</span> (débutant), une <span className="text-emerald-400 font-semibold font-mono">Contrainte</span> (5 étapes) et une <span className="text-teal-400 font-semibold font-mono">Spécificité</span> (analogie). Analysons ces 5 piliers clés !
          </p>
        </div>

      </div>
    </section>
  );
}
