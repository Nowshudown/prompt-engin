import React, { useState, useEffect, FormEvent } from "react";
import { 
  Sparkles, CheckCircle, HelpCircle, ChevronRight, 
  Lightbulb, Star, Trophy, ArrowRight, ArrowLeft, RefreshCw, 
  BookOpen, Smile, Sparkle, AlertTriangle, ShieldCheck
} from "lucide-react";

interface Scenario {
  id: string;
  orderNum: number;
  title: string;
  badge: string;
  icon: string;
  contextDesc: string;
  objective: string;
  requiredKeywords: {
    role: string[];
    context: string[];
    goal: string[];
    constraints: string[];
    format: string[];
  };
  expertPrompt: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: "voyage-famille",
    orderNum: 1,
    title: "Question 1 : Escapade en Famille ✈️",
    badge: "Loisirs & Organisation",
    icon: "✈️",
    contextDesc: "Une famille souhaite passer un samedi fantastique en plein air. Ils ont un budget total très serré de 25 €, deux jeunes enfants de 4 et 7 ans qui se fatiguent vite, et ils veulent absolument éviter la foule ainsi que les marches de plus de 10 minutes sous le soleil brûlant.",
    objective: "Obtenir un planning d'activités simples, gratuites et heure par heure pour occuper leur journée en limitant les frais au maximum.",
    requiredKeywords: {
      role: ["expert", "guide", "organisateur", "conseiller", "parent", "tu es", "animateur", "planificateur"],
      context: ["famille", "enfants", "budget", "samedi", "marche", "journée", "frais", "soleil", "fatigue"],
      goal: ["planning", "activités", "programme", "itinéraire", "proposer", "créer", "organiser", "élaborer"],
      constraints: ["sans payer", "gratuit", "10 minutes", "limiter", "éviter", "foule", "marcher", "pas de frais"],
      format: ["tableau", "liste", "puces", "heure", "etapes", "chronologie", "planning"]
    },
    expertPrompt: "Tu es un guide local expert en loisirs familiaux. Conçois un planning de samedi gratuit et heure par heure pour une famille avec deux enfants fatigués de 4 et 7 ans. Contraintes : limites les marches à pied à 10 minutes maximum pour éviter les coups de chaud sous le soleil, ne propose que des parcs ou activités en libre accès sans aucun frais payant. Affiche le récapitulatif sous forme de liste claire heure par heure avec des émoticônes."
  },
  {
    id: "cuisine-anti-gaspi",
    orderNum: 2,
    title: "Question 2 : Le Défi du Frigo Vide 🍳",
    badge: "Vie Quotidienne & Cuisine",
    icon: "🍳",
    contextDesc: "Vous rentrez tard d'une longue journée et n'avez qu'une poêle à gaz, sans four. Dans le frigo, il ne reste que 3 pommes de terre cuites de la veille, 3 œufs, 1 oignon et un fond de sauce tomate. Vous voulez un repas rapide, réconfortant et savoureux.",
    objective: "Rédiger une recette simple et originale expliquée étape par étape avec ces seuls ingrédients en moins de 15 minutes.",
    requiredKeywords: {
      role: ["chef", "cuisinier", "gourmet", "tu es", "expert", "cordon-bleu", "anti-gaspi"],
      context: ["œufs", "pommes de terre", "oignon", "frigo", "dîner", "rapide", "tomate", "restes"],
      goal: ["recette", "cuisiner", "préparer", "étapes", "repas", "plat", "concevoir", "inventer"],
      constraints: ["pas de four", "poêle", "sans", "éviter", "15 minutes", "simple", "rapide", "exclusivement"],
      format: ["numéroté", "liste", "étapes", "consignes", "instructions", "bullet"]
    },
    expertPrompt: "Tu es un chef cuisinier adepte des recettes anti-gaspillage simples. Invente une recette réconfortante et rapide en moins de 15 minutes pour 1 personne avec : 3 œufs, 3 oignons, des pommes de terre cuites et un peu de sauce tomate. Contrainte : le repas doit se cuire exclusivement à la poêle (pas de four du tout). Présente le descriptif à travers des étapes numérotées simples à réaliser."
  },
  {
    id: "alerte-messagerie",
    orderNum: 3,
    title: "Question 3 : Protéger un Proche 🛡️",
    badge: "Sécurité & Entraide",
    icon: "🛡️",
    contextDesc: "Votre voisin de 80 ans, Monsieur Henri, a reçu un SMS suspect lui affirmant qu'une livraison de colis est bloquée pour un impayé de 1,99 €. Pris de panique, il veut payer par carte car il a peur des pénalités, mais il ne maîtrise absolument pas la technologie.",
    objective: "Lui expliquer avec une patience d'or et zéro jargon technique pourquoi ce SMS est un piège et lui donner deux règles de sécurité à appliquer au quotidien.",
    requiredKeywords: {
      role: ["conseiller", "voisin", "aidant", "expert", "tu es", "bienveillant", "protecteur", "petit-fils"],
      context: ["sms", "poste", "arnaque", "colis", "douane", "frais", "carte", "panique", "henri"],
      goal: ["expliquer", "rassurer", "prévenir", "aider", "montrer", "sécuriser", "conseiller"],
      constraints: ["sans jargon", "simple", "doux", "éviter", "pas de mots compliqués", "rassurant", "calmement"],
      format: ["lettre", "message", "texte", "paragraphe", "dialogue", "conseils"]
    },
    expertPrompt: "Tu es un voisin attentionné et patient. Rédige un court message bienveillant destiné à Monsieur Henri, 80 ans, pour lui expliquer sans utiliser aucun mot technique compliqué (pas de phishing, d'adresse IP ou d'URL malveillante) que son SMS de colis postal est une tentative d'arnaque falsifiée. Rassure-le et donne-lui 2 conseils ultra-simples à appliquer pour l'avenir sous forme de petits paragraphes chaleureux."
  },
  {
    id: "maux-nuque",
    orderNum: 4,
    title: "Question 4 : Soulager une Raideur 🧘‍♂️",
    badge: "Forme & Santé",
    icon: "🧘‍♂️",
    contextDesc: "Un collègue souffre d'une vive raideur à la nuque et au niveau des épaules après avoir passé sa journée immobile devant son écran d'ordinateur ou penché sur son smartphone. Il n'a aucun matériel de sport à sa portée et souhaite des exercices doux d'étirements rapides.",
    objective: "Créer un protocole d'étirement de 5 minutes de rééducation simple, à faire directement assis au bureau, sans forcer et sécurisé.",
    requiredKeywords: {
      role: ["kiné", "coach", "professeur", "yoga", "expert", "tu es", "kinésithérapeute", "ergonome"],
      context: ["nuque", "cou", "écran", "douleur", "raideur", "ordinateur", "bureau", "épaules"],
      goal: ["étirements", "exercices", "mouvements", "soulager", "proposer", "routine", "détendre"],
      constraints: ["sans forcer", "doux", "lentement", "sans matériel", "éviter", "sécurisé", "sans matériel"],
      format: ["liste", "puces", "minutes", "étapes", "consignes", "tableau"]
    },
    expertPrompt: "Tu es un kinésithérapeute spécialisé en ergonomie au travail. Conçois une courte routine d'étirement de 5 minutes à faire directement assis sur une chaise de bureau pour détendre la nuque et les épaules. Contraintes : aucun équipement sportif n'est permis, les mouvements doivent être d'une douceur absolue et exécutés très lentement sans jamais forcer d’un coup sec. Présente la routine sous forme d'une liste de consignes claires."
  },
  {
    id: "conte-creatif",
    orderNum: 5,
    title: "Question 5 : Le Petit Ourson Gâteau 🐻",
    badge: "Créativité & Contes",
    icon: "🐻",
    contextDesc: "Pour endormir un enfant de 4 ans qui a parfois du mal à partager ses jouets à l'école maternelle, vous voulez lui faire raconter une histoire imaginaire et apaisante sur un ourson de la forêt qui comprend les joies du partage de manière rigolote.",
    objective: "Écrire un mini-conte imaginaire d'un paragraphe captivant, avec une moralité douce sur le partage, garanti sans monstres, ni frayeurs.",
    requiredKeywords: {
      role: ["conteur", "écrivain", "auteur", "papa", "maman", "tu es", "animateur", "fée"],
      context: ["enfant", "ourson", "partager", "jouets", "écureuil", "forêt", "maternelle", "animaux"],
      goal: ["raconter", "écrire", "inventer", "histoire", "conte", "imaginer", "créer"],
      constraints: ["court", "simple", "sans méchant", "un seul paragraphe", "sans violence", "apaisant", "sans effrayer"],
      format: ["paragraphe", "histoire", "texte", "morale", "conte"]
    },
    expertPrompt: "Tu es un conteur passionné pour jeunes enfants. Écris une histoire magique d'un seul paragraphe pour endormir un enfant de 4 ans. Le récit doit mettre en scène un ourson gourmand qui partage ses jouets en bois avec des petits écureuils et découvre à quel point jouer ensemble est plus drôle. Contrainte : le conte doit être d'une grande douceur pour rassurer l'enfant, sans aucune dispute ni personnage effrayant, et se conclure par une moralité positive."
  }
];

export default function LivePromptBattle() {
  const STORE_KEY_USER_SCORES = "galsen_prompt_expert_scores_v3";

  // Tab State
  const [activeTab, setActiveTab] = useState(1);
  const currentScenario = SCENARIOS.find(s => s.orderNum === activeTab) || SCENARIOS[0];

  // User input
  const [userPrompt, setUserPrompt] = useState("");
  const [showExpert, setShowExpert] = useState(false);

  // Score states
  const [questionScores, setQuestionScores] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem(STORE_KEY_USER_SCORES);
    return saved ? JSON.parse(saved) : {};
  });

  // Individual evaluation report for current active question
  const [evaluation, setEvaluation] = useState<{
    score: number;
    roleOk: boolean;
    contextOk: boolean;
    goalOk: boolean;
    constraintsOk: boolean;
    formatOk: boolean;
    feedback: string;
  } | null>(null);

  // Sync scores with local storage
  useEffect(() => {
    localStorage.setItem(STORE_KEY_USER_SCORES, JSON.stringify(questionScores));
  }, [questionScores]);

  // Handle slide transition reset
  useEffect(() => {
    setUserPrompt("");
    setEvaluation(null);
    setShowExpert(false);
  }, [activeTab]);

  // Evaluator Logic
  const handleScoreExecution = (e: FormEvent) => {
    e.preventDefault();
    if (!userPrompt.trim()) return;

    const lowerText = userPrompt.toLowerCase();
    const { requiredKeywords } = currentScenario;

    // Check keywords matches
    const roleOk = requiredKeywords.role.some(w => lowerText.includes(w));
    const contextOk = requiredKeywords.context.some(w => lowerText.includes(w));
    const goalOk = requiredKeywords.goal.some(w => lowerText.includes(w));
    const constraintsOk = requiredKeywords.constraints.some(w => lowerText.includes(w));
    const formatOk = requiredKeywords.format.some(w => lowerText.includes(w));

    // Calculate score
    let baseScore = 10;
    if (roleOk) baseScore += 20;
    if (contextOk) baseScore += 20;
    if (goalOk) baseScore += 20;
    if (constraintsOk) baseScore += 15;
    if (formatOk) baseScore += 15;

    // Word volume analysis
    const wordCount = userPrompt.trim().split(/\s+/).length;
    if (wordCount < 10) {
      baseScore = Math.max(0, baseScore - 20);
    } else if (wordCount > 30) {
      baseScore = Math.min(100, baseScore + 5);
    }

    // Dynamic Feedback Message
    let feedback = "";
    if (baseScore >= 90) {
      feedback = "🌟 Grandiose ! Vous alignez un prompt rigoureux parfaitement structuré ! Le modèle comprend son profil d'expert, les détails du décor, vos limites de faisabilité et le format attendu. Vous exploitez les 5 Règles d'Or comme un chef informatique !";
    } else if (baseScore >= 70) {
      feedback = "👍 Excellent score ! Le prompt est très solide et donnera de superbes résultats. Pour obtenir 100/100, enfoncez un peu plus le clou sur le Rôle incarné (ex: qui est l'IA ?) ou verrouillez la sortie en insistant sur le format requis.";
    } else if (baseScore >= 45) {
      feedback = "📈 Résultat honorable, mais perfectible. Rappelez-vous les 5 Règles de base. Essayez d'indiquer de façon explicite les contraintes négatives (ce qu'il ne faut PAS faire, ex: sans jargon, sans équipement...) pour un résultat de haut niveau.";
    } else {
      feedback = "⚠️ Ce prompt ressemble trop à une simple recherche Google. Pour guider une IA sans qu'elle invente d'explications superflues, forcez-la à adopter un rôle clair et dictez-lui son cadre en détail !";
    }

    setEvaluation({
      score: baseScore,
      roleOk,
      contextOk,
      goalOk,
      constraintsOk,
      formatOk,
      feedback
    });

    // Update scoreboard
    setQuestionScores(prev => ({
      ...prev,
      [currentScenario.id]: Math.max(prev[currentScenario.id] || 0, baseScore)
    }));
  };

  // Reset progress callback
  const handleResetProgress = () => {
    if (window.confirm("Voulez-vous effacer vos scores et réinitialiser l'atelier ?")) {
      setQuestionScores({});
      setEvaluation(null);
      setUserPrompt("");
      setShowExpert(false);
    }
  };

  // Calculate Cumulative total score out of 500
  const cumulativeScore = SCENARIOS.reduce((sum, s) => sum + (questionScores[s.id] || 0), 0);

  return (
    <section 
      id="prompt-battle" 
      className="py-20 px-4 bg-[#030712] border-t border-slate-900 overflow-hidden flex flex-col justify-center snap-start"
    >
      <div className="max-w-4xl mx-auto w-full flex flex-col justify-center">
        
        {/* Header Title */}
        <div id="battle-header" className="text-center space-y-3 mb-10 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono uppercase tracking-widest font-black">
            <Trophy className="w-3.5 h-3.5" />
            <span>Atelier Pratique Interactif</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
            ⚡ L'Atelier Final : Promptez comme un Pro !
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm font-sans font-light leading-relaxed">
            Testez vos compétences de prompteur sur 5 situations concrètes du quotidien. Pas besoin d'être informaticien : faites face aux défis, exprimez votre créativité et visez la note maximale de 100/100 sur chaque question !
          </p>
        </div>

        {/* Global Progress Dashboard */}
        <div className="grid grid-cols-1 sm:grid-cols-2 bg-slate-950/70 border border-slate-900 rounded-2xl p-4 mb-6 items-center gap-4 text-center sm:text-left">
          <div>
            <span className="text-[9px] text-slate-500 font-mono uppercase tracking-wider block font-semibold">Taux de réussite global</span>
            <div className="flex items-baseline gap-1 justify-center sm:justify-start">
              <span id="rank-badge" className="text-xl font-extrabold text-amber-400 font-display">
                {cumulativeScore} <span className="text-xs text-slate-500">/ 500 points</span>
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                {cumulativeScore >= 450 ? "🏆 Maître de l'IA" : cumulativeScore >= 300 ? "⭐ Prompteur Chevronné" : "🌱 Apprenti"}
              </span>
            </div>
          </div>
          
          <div className="flex justify-center sm:justify-end gap-2.5">
            <button
              onClick={handleResetProgress}
              className="px-3 py-1.5 rounded-lg border border-slate-850 hover:bg-slate-900 text-[10px] uppercase font-mono font-bold tracking-wider text-slate-400 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Réinitialiser les scores</span>
            </button>
          </div>
        </div>

        {/* Horizontal Navigation: Only 1 visible at a time */}
        <div className="grid grid-cols-5 gap-1.5 mb-6">
          {SCENARIOS.map((s) => {
            const isSelected = s.orderNum === activeTab;
            const scoreSaved = questionScores[s.id] || 0;
            return (
              <button
                key={s.id}
                onClick={() => setActiveTab(s.orderNum)}
                className={`flex flex-col items-center justify-center p-2.5 rounded-xl border transition-all cursor-pointer ${
                  isSelected 
                    ? "bg-slate-900 border-emerald-500/40 text-emerald-300 shadow-lg" 
                    : "bg-slate-950/40 border-slate-900 text-slate-400 hover:bg-slate-950"
                }`}
              >
                <span className="text-[10px] font-mono leading-none block mb-1">
                  Q{s.orderNum}
                </span>
                <span className={`text-[9px] font-mono ${scoreSaved > 0 ? "text-amber-400 font-bold" : "text-slate-600"}`}>
                  {scoreSaved > 0 ? `${scoreSaved}/100` : "0%"}
                </span>
              </button>
            );
          })}
        </div>

        {/* Core Layout Area */}
        <div className="bg-[#0b1224] border border-slate-850 rounded-3xl p-5 sm:p-7 relative space-y-6 shadow-xl min-w-0">
          
          {/* Active Question Panel Description */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="text-xl shrink-0">{currentScenario.icon}</span>
                <div>
                  <span className="block text-[8px] text-emerald-400 font-mono uppercase tracking-widest font-black">
                    {currentScenario.badge}
                  </span>
                  <h3 className="font-display font-black text-base sm:text-lg text-white tracking-tight leading-none pt-0.5">
                    {currentScenario.title}
                  </h3>
                </div>
              </div>

              {questionScores[currentScenario.id] ? (
                <div className="text-[10px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-full font-mono font-bold">
                  Meilleur Score : {questionScores[currentScenario.id]} / 100 ⭐
                </div>
              ) : (
                <div className="text-[10px] bg-slate-950 text-slate-500 px-2.5 py-1 rounded-full font-mono">
                  Non résolue
                </div>
              )}
            </div>

            {/* Context and objective box */}
            <div className="bg-slate-950 border border-slate-900 rounded-2xl p-4.5 space-y-3">
              <div className="space-y-1">
                <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block font-extrabold">🚨 LE SCÉNARIO DU QUOTIDIEN :</span>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">{currentScenario.contextDesc}</p>
              </div>
              <div className="text-[11px] text-slate-350 leading-relaxed bg-[#0c1326] p-3 rounded-xl border border-slate-900 flex items-start gap-2">
                <span className="shrink-0 text-emerald-400">⚡</span>
                <p className="font-sans font-light">
                  <strong className="text-white font-medium">Votre Objectif : </strong>
                  {currentScenario.objective}
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Workspace Area */}
          <form onSubmit={handleScoreExecution} className="space-y-3 pt-1">
            <div className="space-y-1">
              <label className="block text-[9px] text-slate-500 font-mono uppercase tracking-widest font-black">
                ✍️ RÉDIGER VOTRE PROMPT D'INGÉNIEUR EN DIRECT :
              </label>
              <textarea
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
                placeholder="Exprimez votre prompt en appliquant la formule magique : 
• Donnez un RÔLE clair à l'IA 
• Précisez le CONTEXTE de départ 
• Indiquez l'OBJECTIF principal 
• Définissez les CONTRAINTES impératives (sans faire d'erreurs, temps court) 
• Exigez le FORMAT de sortie..."
                rows={5}
                className="w-full text-xs sm:text-sm p-4 bg-slate-950 border border-slate-850 rounded-2xl text-slate-105 focus:outline-none focus:border-emerald-500 font-mono leading-relaxed placeholder-slate-650 tracking-wide focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1.5">
              <span className="text-[10px] text-slate-500 font-mono italic">
                L'algorithme de notation scannera les 5 piliers de structure.
              </span>

              <button
                type="submit"
                disabled={!userPrompt.trim()}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-[11px] font-black uppercase font-mono tracking-wider text-white shadow-xl transition-all cursor-pointer disabled:opacity-40 shrink-0"
              >
                <span>🚀 Évaluer & CalculeR mon score !</span>
              </button>
            </div>
          </form>

          {/* Real-time automated feedback cards */}
          {evaluation && (
            <div className="bg-slate-950 border border-slate-900 rounded-3xl p-5 space-y-4 animate-fade-in shadow-inner">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-900 pb-3 gap-2">
                <span className="text-[9px] font-mono text-emerald-400 font-extrabold uppercase tracking-widest flex items-center gap-1">
                  <Sparkle className="w-3.5 h-3.5" /> Analyse structurelle du Prompt
                </span>
                
                <div className="flex items-center gap-2">
                  <span className="text-[9px] text-slate-500 font-bold uppercase font-mono">NOTE CALCULÉE :</span>
                  <span id={`score-viewer-q${currentScenario.orderNum}`} className="text-lg font-bold font-display text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md">
                    {evaluation.score} / 100 ⭐
                  </span>
                </div>
              </div>

              {/* Checks grid */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {[
                  { label: "1. RÔLE D'EXPERT", ok: evaluation.roleOk, desc: "S'identifier dans la peau d'un spécialiste" },
                  { label: "2. CONTEXTE RÉEL", ok: evaluation.contextOk, desc: "Expliquer les conditions limites" },
                  { label: "3. OBJECTIF PRECIS", ok: evaluation.goalOk, desc: "Définir la tâche attendue" },
                  { label: "4. CONTRAINTES NEGATIVES", ok: evaluation.constraintsOk, desc: "Imposer des restrictions claires" },
                  { label: "5. FORMAT DE SORTIE", ok: evaluation.formatOk, desc: "Déterminer la forme du rendu final" },
                ].map((crit, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center font-mono ${
                      crit.ok 
                        ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-300" 
                        : "bg-slate-950/40 border-slate-900 text-slate-550"
                    }`}
                  >
                    <span className="text-[8px] font-bold block leading-none mb-1 text-slate-400">{crit.label.split(" .")} {crit.label}</span>
                    {crit.ok ? (
                      <div className="flex items-center gap-1 text-[9px] font-semibold text-emerald-400">
                        <CheckCircle className="w-3.5 h-3.5" /> Validé
                      </div>
                    ) : (
                      <span className="text-[9px] font-sans text-slate-600">Manquant</span>
                    )}
                  </div>
                ))}
              </div>

              {/* Feedback description text */}
              <div className="bg-[#0b1224]/50 border border-slate-900 p-3.5 rounded-xl space-y-1.5 flex gap-2">
                <span className="text-base shrink-0">💬</span>
                <p className="text-xs text-slate-300 leading-relaxed font-light font-sans">{evaluation.feedback}</p>
              </div>
            </div>
          )}

          {/* Expert prompt reveal accordion */}
          <div className="pt-2 select-none border-t border-slate-900">
            <button
              type="button"
              onClick={() => setShowExpert(!showExpert)}
              className="w-full flex items-center justify-between p-3.5 bg-slate-950 hover:bg-slate-900 border border-slate-900 rounded-xl text-[10px] font-mono uppercase tracking-wider text-slate-300 cursor-pointer"
            >
              <span className="flex items-center gap-1.5 font-display text-slate-350">
                <Lightbulb className="w-3.5 h-3.5 text-emerald-400" />
                <span>💡 Voir le prompt modèle d'un Expert IA</span>
              </span>
              <ChevronRight className={`w-3.5 h-3.5 transition-transform ${showExpert ? "rotate-90" : ""}`} />
            </button>

            {showExpert && (
              <div className="mt-3 p-4.5 bg-slate-1000 border border-slate-900 rounded-xl space-y-2 animate-fade-in font-mono text-xs text-slate-300 leading-relaxed bg-[#040813]">
                <span className="text-emerald-400 font-bold block uppercase tracking-wider text-[8px] border-b border-slate-900 pb-1.5">
                  PROMPT OPTIMAL RECOMMANDÉ :
                </span>
                <p className="whitespace-pre-wrap leading-relaxed select-text font-mono italic font-light pt-1.5 text-slate-300">
                  "{currentScenario.expertPrompt}"
                </p>
              </div>
            )}
          </div>

        </div>

        {/* Dynamic Prev / Next Controls */}
        <div className="mt-6 flex justify-between items-center bg-slate-950 border border-slate-900 p-2 rounded-2xl gap-2 w-full sm:max-w-sm sm:mx-auto">
          <button
            onClick={() => {
              if (activeTab > 1) {
                setActiveTab(activeTab - 1);
              }
            }}
            disabled={activeTab === 1}
            className="px-3 py-1.5 bg-slate-900 disabled:bg-slate-950 text-[9px] uppercase font-mono font-bold tracking-widest text-slate-400 disabled:text-slate-700 hover:text-white border border-slate-850 disabled:border-transparent rounded-xl cursor-pointer disabled:cursor-not-allowed transition-colors"
          >
            ← Précédente
          </button>
          
          <div className="flex items-center gap-1 text-[11px] text-slate-500 font-mono font-semibold">
            <span>0{activeTab}</span>
            <span>/</span>
            <span>05</span>
          </div>

          <button
            onClick={() => {
              if (activeTab < 5) {
                setActiveTab(activeTab + 1);
              }
            }}
            disabled={activeTab === 5}
            className="px-3 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 disabled:from-slate-800 disabled:to-slate-900 hover:from-emerald-500 hover:to-teal-500 text-[9px] uppercase font-mono font-bold tracking-widest text-white disabled:text-slate-650 rounded-xl cursor-pointer disabled:cursor-not-allowed transition-all"
          >
            Suivante →
          </button>
        </div>

      </div>
    </section>
  );
}
