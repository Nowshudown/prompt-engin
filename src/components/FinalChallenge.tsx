import { useState, FormEvent } from "react";
import { Terminal, Send, Lightbulb, ThumbsUp, Sparkles, Check, ChevronRight } from "lucide-react";

export default function FinalChallenge() {
  const [userPromptInput, setUserPromptInput] = useState("");
  const [evaluation, setEvaluation] = useState<{
    score: number;
    rolesFound: boolean;
    formatFound: boolean;
    constraintsFound: boolean;
    contextFound: boolean;
    feedbackText: string;
  } | null>(null);

  const [showExpertSolution, setShowExpertSolution] = useState(false);

  const originalLazyPrompt = "Fais-moi un résumé du livre Sapiens de Yuval Noah Harari. C'est pour demain.";

  const handleEvaluate = (e: FormEvent) => {
    e.preventDefault();
    if (!userPromptInput.trim()) return;

    const lower = userPromptInput.toLowerCase();

    // Check for Role patterns
    const rolesPatterns = ["expert", "historien", "professeur", "enseignant", "tu es", "agis", "sociologue", "rédacteur", "tuteur", "écrivain"];
    const rolesFound = rolesPatterns.some((pattern) => lower.includes(pattern));

    // Check for Format patterns
    const formatPatterns = ["tableau", "liste", "puces", "bullet", "chapitre", "markdown", "structure", "synthèse", "résumé"];
    const formatFound = formatPatterns.some((pattern) => lower.includes(pattern));

    // Check for Constraints
    const constraintPatterns = ["ne pas", "évite", "limite", "mot", "maximum", "max", "sans", "ne dépasse pas"];
    const constraintsFound = constraintPatterns.some((pattern) => lower.includes(pattern));

    // Check for Context
    const contextPatterns = ["étudiant", "public", "classe", "explication", "comprendre", "demain", "devoir", "exposé", "économique", "humanité", "historique"];
    const contextFound = contextPatterns.some((pattern) => lower.includes(pattern));

    // Calculate score
    let score = 20; // baseline
    if (rolesFound) score += 25;
    if (contextFound) score += 20;
    if (formatFound) score += 20;
    if (constraintsFound) score += 15;

    // Cap score at 100
    score = Math.min(score, 100);

    // Build unique feedback response
    let feedbackText = "";
    if (score === 100) {
      feedbackText = "Incroyable ! Vous avez rédigé un prompt de niveau ingénieur principal ! Tous les ingrédients y sont : Rôle d'expert, contexte, contraintes exigeantes et format de restitution optimal. Votre IA vous fournira un résultat spectaculaire !";
    } else if (score >= 75) {
      feedbackText = "Excellent travail ! Votre prompt est extrêmement solide. Pour atteindre les 100%, n'hésitez pas à poser une contrainte lourde (comme une limite stricte de mots ou l'exclusion de termes complexes) ou à peaufiner le format requis.";
    } else if (score >= 45) {
      feedbackText = "C'est un bon début ! Pour décupler la pertinence de la réponse, essayez d'incarner l'IA en lui confiant un rôle clé ('Tu es spécialiste en anthropologie humaine') et prescrivez-lui un format strict (ex: 'Ressors les 3 thèses majeures sous forme de puces').";
    } else {
      feedbackText = "Votre prompt est encore un peu trop proche du prompt flou de départ. N'oubliez pas les 5 ingrédients clés ! Commencez par écrire : 'Tu es enseignant en histoire' et expliquez à qui s'adresse ce résumé pour l'aider à s'orienter.";
    }

    setEvaluation({
      score,
      rolesFound,
      formatFound,
      constraintsFound,
      contextFound,
      feedbackText,
    });
  };

  const loadExample1 = () => {
    setUserPromptInput(
      "Tu es chercheur en anthropologie. Synthétise les 3 révolutions majeures (cognitive, agricole, scientifique) détaillées par Yuval Noah Harari dans Sapiens. Rédige un tableau à 3 colonnes pour un public étudiant de licence : Révolution, Changement clé, et Conséquence humaine. Ne dépasse pas 150 mots par ligne."
    );
  };

  return (
    <section 
      id="challenge" 
      className="min-h-screen py-24 px-4 flex flex-col justify-center relative overflow-hidden bg-[#030712] border-t border-emerald-500/5 snap-start"
    >
      <div className="max-w-4xl mx-auto w-full relative z-10 flex flex-col justify-center">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-10 animate-fade-in">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[10px] font-mono tracking-widest uppercase">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span>Atelier pratique</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            Le Défi Final : À vous de jouer !
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto font-light">
            Voici un prompt médiocre couramment envoyé par des étudiants. Utilisez les 5 éléments clés pour en faire une consigne d'élite.
          </p>
        </div>

        {/* Challenge Box Container */}
        <div className="bg-[#0b1224] border border-emerald-500/10 rounded-3xl p-6 sm:p-10 shadow-xl shadow-black/45 space-y-6">
          
          {/* Default Weak Prompt Box */}
          <div className="p-5 rounded-2xl bg-rose-955/10 border border-rose-500/15">
            <span className="text-[10px] text-rose-400 font-mono font-bold block uppercase tracking-wider mb-2">⚡ Le Prompt Vague Initial :</span>
            <p className="text-xs sm:text-sm font-mono text-rose-200/90 italic">
              "{originalLazyPrompt}"
            </p>
          </div>

          {/* Interactive Editor Form */}
          <form onSubmit={handleEvaluate} className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-[10px] text-slate-550 font-mono uppercase tracking-widest font-bold">Formulez votre prompt amélioré ici :</label>
                <button
                  type="button"
                  id="btn-load-draft"
                  onClick={loadExample1}
                  className="text-[11px] text-emerald-400 font-mono hover:text-emerald-300 hover:underline cursor-pointer font-bold tracking-wider uppercase"
                >
                  Charger un brouillon d'exemple
                </button>
              </div>
              
              <textarea
                value={userPromptInput}
                onChange={(e) => setUserPromptInput(e.target.value)}
                placeholder="Exemple : Tu es enseignant en anthropologie. Explique les concepts clés de Sapiens..."
                rows={5}
                className="w-full text-xs sm:text-sm p-4 bg-[#070c18] border border-slate-850 rounded-2xl text-slate-100 focus:outline-none focus:border-emerald-500 font-mono leading-relaxed placeholder-slate-550 focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
              <span className="text-[11px] text-slate-500 font-sans italic font-medium">
                Rappel : Configurez un interlocuteur d'élite et cadrez les limites !
              </span>

              <button
                type="submit"
                id="btn-submit-challenge"
                disabled={!userPromptInput.trim()}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 font-bold uppercase font-mono tracking-wider text-xs text-white shadow-xl transition-all cursor-pointer disabled:opacity-50"
              >
                <div className="flex items-center justify-center gap-1.5">
                  <Send className="w-3.5 h-3.5" />
                  <span>Évaluer mon Prompt !</span>
                </div>
              </button>
            </div>
          </form>

          {/* Evaluation Results Card */}
          {evaluation && (
            <div id="challenge-evaluation-panel" className="bg-[#070c18] border border-slate-850 rounded-2xl p-6 space-y-6 animate-fade-in shadow-inner">
               
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
                <h4 className="text-xs font-bold text-emerald-400 font-mono uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span>Rapport d'évaluation instantané</span>
                </h4>
                
                <div className="flex items-center gap-2 font-mono">
                  <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Score :</span>
                  <span className="text-lg font-bold text-emerald-400">{evaluation.score} / 100</span>
                </div>
              </div>

              {/* Checks list */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {/* Check 1: Role */}
                <div className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center font-mono transition-colors duration-300 ${
                  evaluation.rolesFound ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-300" : "bg-[#0a1224] border-slate-850/80 text-slate-500"
                }`}>
                  <span className="text-[10px] block mb-1 uppercase tracking-wider font-bold">RÔLE EXP.</span>
                  {evaluation.rolesFound ? <Check className="w-4 h-4 text-emerald-400" /> : <span className="text-[10px] font-bold">Manquant</span>}
                </div>

                {/* Check 2: Context */}
                <div className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center font-mono transition-colors duration-300 ${
                  evaluation.contextFound ? "bg-teal-500/15 border-teal-500/30 text-teal-300" : "bg-[#0a1224] border-slate-850/80 text-slate-500"
                }`}>
                  <span className="text-[10px] block mb-1 uppercase tracking-wider font-bold">AUDIENCE</span>
                  {evaluation.contextFound ? <Check className="w-4 h-4 text-teal-400" /> : <span className="text-[10px] font-bold">Manquant</span>}
                </div>

                {/* Check 3: Format */}
                <div className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center font-mono transition-colors duration-300 ${
                  evaluation.formatFound ? "bg-cyan-500/15 border-cyan-500/30 text-cyan-300" : "bg-[#0a1224] border-slate-850/80 text-slate-500"
                }`}>
                  <span className="text-[10px] block mb-1 uppercase tracking-wider font-bold">FORMAT REQ.</span>
                  {evaluation.formatFound ? <Check className="w-4 h-4 text-cyan-400" /> : <span className="text-[10px] font-bold">Manquant</span>}
                </div>

                {/* Check 4: Constraints */}
                <div className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center font-mono transition-colors duration-300 ${
                  evaluation.constraintsFound ? "bg-rose-500/15 border-rose-500/30 text-rose-300" : "bg-[#0a1224] border-slate-855/80 text-slate-500"
                }`}>
                  <span className="text-[10px] block mb-1 uppercase tracking-wider font-bold">LIMITES</span>
                  {evaluation.constraintsFound ? <Check className="w-4 h-4 text-rose-400" /> : <span className="text-[10px] font-bold">Manquant</span>}
                </div>
              </div>

              {/* Review Text */}
              <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/10 text-xs sm:text-sm text-slate-350 leading-relaxed font-light font-sans">
                {evaluation.feedbackText}
              </div>

            </div>
          )}

          {/* Expert solution reveal toggler */}
          <div className="pt-2">
            <button
              id="btn-reveal-solution"
              onClick={() => setShowExpertSolution((prev) => !prev)}
              type="button"
              className="w-full flex items-center justify-between p-4.5 bg-[#070c18] hover:bg-[#121c35]/40 rounded-2xl border border-slate-850 hover:border-emerald-500/20 transition-all font-bold text-xs uppercase tracking-wider text-slate-300 cursor-pointer shadow-lg"
            >
              <span className="flex items-center gap-1.5 font-display text-slate-205">
                <Lightbulb className="w-4 h-4 text-emerald-400" />
                <span>Découvrir la solution idéale d'un ingénieur IA</span>
              </span>
              <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${showExpertSolution ? "rotate-90" : ""}`} />
            </button>

            {showExpertSolution && (
              <div id="solution-blueprint-box" className="mt-4 p-6 rounded-2xl bg-[#070c18] border border-slate-850 animate-fade-in space-y-4 font-mono text-xs sm:text-sm text-slate-305 leading-relaxed shadow-inner">
                <div className="flex items-center gap-1 text-emerald-400 font-bold border-b border-slate-800 pb-2 text-[10px] uppercase tracking-widest">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span>BLUEPRINT EXPERT :</span>
                </div>
                
                <p>
                  "Tu es un **professeur de philosophie et d'histoire globale**. Synthétise le livre 'Sapiens' de Yuval Noah Harari sous forme de fiche d'apprentissage destinée à un **étudiant préparant un examen**."
                </p>
                <p>
                  "Présente les informations sous forme de **chapitres structurés** (un chapitre pour chaque révolution : cognitive, agricole, scientifique). Pour chaque chapitre, inclus : 1) Les 3 arguments fondamentaux, 2) Une objection historique courante.
                </p>
                <p>
                  "**Contraintes** : Ne dépasse pas 300 mots au total pour l'ensemble du devoir. Rédige dans un style direct, sans fioritures littéraires d'introductions."
                </p>
                
                <div className="pt-2 flex items-center gap-2 text-xs text-emerald-400 font-bold font-sans">
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>Cette structure garantit d'isoler uniquement les conclusions factuelles, éliminant tout bavardage inutile de l'IA !</span>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
