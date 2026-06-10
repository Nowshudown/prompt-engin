import { useState } from "react";
import { HelpCircle, Play, Cpu, Sparkles, BookOpen, Lightbulb, Sliders, Layers } from "lucide-react";

interface ReasoningStep {
  num: number;
  title: string;
  codename: string;
  simpleIdea: string;
  exampleLabel: string;
  exampleInput: string;
  exampleOutputLabel: string;
  exampleOutput: string;
  conclusion: string;
}

const REASONING_STEPS: ReasoningStep[] = [
  {
    num: 1,
    title: "La Tokenisation (Le Découpage)",
    codename: "Étape 01 : Découpage brut",
    simpleIdea: "Avant de comprendre une phrase, l'IA la découpe en petits morceaux appelés tokens.",
    exampleLabel: "Phrase :",
    exampleInput: "J'aime apprendre l'intelligence artificielle",
    exampleOutputLabel: "Découpage :",
    exampleOutput: '"J\'aime" | "apprendre" | "l\'intelligence" | "artificielle"',
    conclusion: "L'IA ne lit pas la phrase entière d'un seul coup, elle la découpe d'abord pour mieux l'analyser."
  },
  {
    num: 2,
    title: "L'Attention Sélective (Le Focus)",
    codename: "Étape 02 : Focus d'importance",
    simpleIdea: "L'IA identifie les mots les plus importants de la phrase.",
    exampleLabel: "Question :",
    exampleInput: "Quelle est la capitale du Sénégal ?",
    exampleOutputLabel: "L'IA se concentre surtout sur :",
    exampleOutput: "capitale + Sénégal",
    conclusion: "Elle ignore en partie les mots moins importants pour comprendre rapidement la demande."
  },
  {
    num: 3,
    title: "La Cartographie Sémantique (Les Idées)",
    codename: "Étape 03 : Recherche de sens",
    simpleIdea: "L'IA transforme les mots en idées et cherche leurs relations.",
    exampleLabel: "Relations :",
    exampleInput: "La carte des connaissances",
    exampleOutputLabel: "Elle comprend que :",
    exampleOutput: "Dakar ↔ Sénégal\nMédecin ↔ Hôpital\nPython ↔ Programmation",
    conclusion: "Les mots sont reliés dans un immense réseau de connaissances."
  },
  {
    num: 4,
    title: "La Prédiction de Mots (Les Probabilités)",
    codename: "Étape 04 : Le mot par mot",
    simpleIdea: "L'IA ne réfléchit pas comme un humain. Elle calcule simplement quel mot a le plus de chances de venir ensuite.",
    exampleLabel: "Si je commence par :",
    exampleInput: "La capitale du Sénégal est...",
    exampleOutputLabel: "Le mot ayant la plus forte probabilité :",
    exampleOutput: "Dakar",
    conclusion: "L'IA choisit continuellement les mots les plus probables."
  },
  {
    num: 5,
    title: "La Restitution (L'Affichage fluide)",
    codename: "Étape 05 : Rendement final",
    simpleIdea: "Une fois les mots prédits, l'IA les affiche dans un ordre naturel pour produire une réponse compréhensible.",
    exampleLabel: "Au lieu d'afficher :",
    exampleInput: "Dakar Sénégal capitale",
    exampleOutputLabel: "Elle génère :",
    exampleOutput: "La capitale du Sénégal est Dakar.",
    conclusion: "La réponse semble naturelle et fluide pour l'utilisateur."
  }
];

export default function PromptDefinition() {
  const [pipelineStep, setPipelineStep] = useState<"idle" | "input" | "thinking" | "output">("idle");
  const [inputText, setInputText] = useState("Décris la théorie de la relativité d'Einstein pour un enfant de 10 ans.");
  const [thinkingLog, setThinkingLog] = useState<string[]>([]);
  const [outputResult, setOutputResult] = useState("");
  const [sandboxMode, setSandboxMode] = useState<"simulation" | "explorer">("explorer");
  const [activeSlideStep, setActiveSlideStep] = useState<number>(1);

  const runSimulation = () => {
    setPipelineStep("input");
    
    // Normalize input to check intent
    const query = inputText.toLowerCase();
    const tokenCount = Math.max(6, Math.ceil(inputText.trim().split(/\s+/).length * 1.35));
    
    setThinkingLog([
      `[Tokenization] Conversion du texte en ${tokenCount} tokens...`,
      "Formatage du contexte système initial (guidelines d'attention)..."
    ]);
    setOutputResult("");

    const isLimpideOrSimple = 
      query.includes("comprends pas") || 
      query.includes("limpide") || 
      query.includes("simplifie") || 
      query.includes("simple") || 
      query.includes("vulgarise") || 
      query.includes("clair") || 
      query.includes("claire");

    const isRelativity = 
      query.includes("relativité") || 
      query.includes("einstein") || 
      query.includes("gravit");

    setTimeout(() => {
      setPipelineStep("thinking");
      
      if (isLimpideOrSimple) {
        setThinkingLog((prev) => [
          ...prev,
          "[Attention Mechanism] Alerte de reformulation détectée : besoin de simplification et métaphores concrètes.",
          "[Semantic Mapping] Remplacement des termes abstraits ('espace-temps') par un exemple familier : 'toboggan' / 'entonnoir'.",
          "[Generation] Synthèse de la réponse ultra-simplifiée de niveau primaire..."
        ]);
      } else if (isRelativity) {
        setThinkingLog((prev) => [
          ...prev,
          "[Attention Mechanism] Association d'importance élevée : 'relativité' + 'explication didactique'.",
          "[Semantic Mapping] Extraction thématique de métaphores idéales : 'trampoline', 'boule de bowling', 'bille'.",
          "[Generation] Calcul probabiliste de l'analogie gravitationnelle optimale..."
        ]);
      } else {
        setThinkingLog((prev) => [
          ...prev,
          `[Attention Mechanism] Identification des termes porteurs de sens dans : "${inputText.substring(0, 30)}..."`,
          "[Semantic Mapping] Recherche de réponses adaptées dans les modèles de connaissances généraux.",
          "[Generation] Structuration d'une réponse claire et didactique..."
        ]);
      }
    }, 1500);

    setTimeout(() => {
      setPipelineStep("output");
      setThinkingLog((prev) => [...prev, "[Completeness] Réponse générée à 100% avec succès."]);
      
      if (isLimpideOrSimple) {
        setOutputResult(
          "Aucun problème, simplifions à l'extrême ! Imagine que le Soleil est posé au milieu d'un grand entonnoir (comme un toboggan rond). La Terre est une petite bille que l'on lance à toute vitesse sur la paroi. Elle tourne en boucle sur les bords inclinés de l'entonnoir car elle est attirée vers le creux. La gravité, c'est juste cet entonnoir : plus un objet céleste est lourd, plus il creuse la pente, et plus les autres glissent autour !"
        );
      } else if (isRelativity) {
        setOutputResult(
          "Imagine un grand trampoline bien tendu. Si tu y déposes une grosse boule de bowling solide au milieu (le Soleil), le tissu s'enfonce et crée un creux. Si tu lances ensuite une petite bille (La Terre) à côté, elle ne va pas pouvoir rouler tout droit : elle va glisser et tourner autour de ce creux. La gravité, c’est exactement ça : l'espace est courbé par les objets lourds, et les objets plus légers glissent dans leurs creux !"
        );
      } else {
        setOutputResult(
          `Vous avez soumis la consigne : "${inputText}". Un bon prompt d'élite se structure ainsi : proposez un Rôle clé (ex: "Joue le rôle de formateur"), donnez des Contraintes (ex: "Fais-le en 2 phrases") et ciblez un Public d'audience précis.`
        );
      }
    }, 3200);
  };

  const currentStepData = REASONING_STEPS[activeSlideStep - 1];

  return (
    <section 
      id="definition" 
      className="py-16 px-4 flex flex-col justify-center relative overflow-hidden bg-[#030712] border-t border-emerald-500/5 snap-start"
    >
      <div className="max-w-4xl mx-auto w-full relative z-10 flex flex-col justify-center">
        
        {/* Section Header */}
        <div className="text-center space-y-2.5 mb-8 animate-fade-in">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[10px] font-mono tracking-widest uppercase">
            <Cpu className="w-3.5 h-3.5 text-emerald-400" />
            <span>Moteur d'Attention</span>
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-tight">
            Comment l'IA traite vos mots ?
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto font-light leading-relaxed">
            Un prompt n'est pas magique. Suivez le parcours de vos consignes dans les 5 phases clés de traitement d’un réseau de neurones (LLM).
          </p>
        </div>

        {/* Unique High-Tech Console Container */}
        <div className="bg-[#0b1224] border border-emerald-500/15 rounded-2xl p-5 sm:p-6 shadow-xl shadow-black/60 relative overflow-hidden">
          
          {/* Header Bar of the card */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800 pb-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <h4 className="text-[10px] font-bold text-slate-300 font-mono uppercase tracking-widest">
                Moniteur Neuronal Actif
              </h4>
            </div>

            {/* Selector tabs between explanation modes */}
            <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 self-start sm:self-auto">
              <button
                id="tab-mode-explorer"
                onClick={() => setSandboxMode("explorer")}
                className={`px-3 py-1.5 text-[9px] font-mono rounded-lg uppercase tracking-wide transition-all cursor-pointer ${
                  sandboxMode === "explorer"
                    ? "bg-emerald-500/15 text-emerald-300 font-bold"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                1. Les 5 Phases de l'IA
              </button>
              <button
                id="tab-mode-simulation"
                onClick={() => setSandboxMode("simulation")}
                className={`px-3 py-1.5 text-[9px] font-mono rounded-lg uppercase tracking-wide transition-all cursor-pointer ${
                  sandboxMode === "simulation"
                    ? "bg-emerald-500/15 text-emerald-300 font-bold"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                2. Simulateur interactif
              </button>
            </div>
          </div>

          {/* Mode 1: Detailed Steps Explorer */}
          {sandboxMode === "explorer" && (
            <div className="space-y-6 animate-fade-in">
              
              {/* Top Stepper Tracker */}
              <div className="grid grid-cols-5 gap-1.5 sm:gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
                {REASONING_STEPS.map((step) => {
                  const isActive = activeSlideStep === step.num;
                  return (
                    <button
                      key={step.num}
                      onClick={() => setActiveSlideStep(step.num)}
                      className={`flex flex-col items-center justify-center py-2 sm:py-3.5 rounded-lg font-mono transition-all cursor-pointer ${
                        isActive
                          ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-900/10"
                          : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/55"
                      }`}
                    >
                      <span className="text-[10px] sm:text-xs font-bold block leading-none mb-0.5">
                        {`0${step.num}`}
                      </span>
                      <span className="text-[8px] sm:text-[9px] hidden md:block font-medium truncate max-w-full opacity-80 uppercase tracking-wider">
                        {step.title.split(" (")[0].replace("La ", "").replace("L'", "")}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Grid with system metadata and detailed explanations */}
              <div className="grid gap-5 md:grid-cols-2">
                
                {/* Column Left: Information générale & Idée simple */}
                <div className="bg-[#070c18] border border-slate-800/80 p-5 rounded-xl flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-800/60 pb-2.5">
                      <span className="text-[9px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded uppercase tracking-wider">
                        {currentStepData.codename}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">Concept</span>
                    </div>

                    <h4 className="font-display font-extrabold text-base sm:text-lg text-white">
                      {currentStepData.title}
                    </h4>

                    <div className="space-y-2">
                      <span className="text-[9px] font-mono font-bold text-amber-400 block uppercase tracking-widest">
                        💡 Idée simple :
                      </span>
                      <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-light font-sans bg-slate-950/80 p-3 rounded-lg border border-slate-900">
                        {currentStepData.simpleIdea}
                      </p>
                    </div>
                  </div>

                  {/* Horizontal Slider Controls inside Left Box for compact layouts */}
                  <div className="mt-5 pt-4 border-t border-slate-800/40 space-y-1.5">
                    <div className="flex justify-between items-center text-[9px] font-mono text-slate-500">
                      <span>Parcourir :</span>
                      <span className="text-emerald-450 font-bold">Glisser pour changer 👈👉</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      step="1"
                      value={activeSlideStep}
                      onChange={(e) => setActiveSlideStep(Number(e.target.value))}
                      className="w-full h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Column Right: Exemple de traitement & Conclusion */}
                <div className="bg-emerald-500/[0.01] border border-emerald-500/5 p-5 rounded-xl flex flex-col justify-between space-y-4">
                  <div className="space-y-3.5">
                    
                    <div className="space-y-1.5">
                      <span className="text-[9px] font-mono font-semibold text-slate-400 block uppercase tracking-wider">
                        📋 Exemple de traitement :
                      </span>
                      <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-850 space-y-2">
                        <div>
                          <span className="text-[10px] font-mono text-slate-500 block">{currentStepData.exampleLabel}</span>
                          <p className="text-xs font-sans text-slate-300 font-medium italic mt-0.5">
                            {currentStepData.exampleInput}
                          </p>
                        </div>
                        <div className="border-t border-slate-900 pt-1.5">
                          <span className="text-[10px] font-mono text-emerald-450 block">{currentStepData.exampleOutputLabel}</span>
                          <code className="block text-[11px] font-mono text-emerald-300 mt-0.5 break-words whitespace-pre-wrap">
                            {currentStepData.exampleOutput}
                          </code>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-emerald-500/5 border border-emerald-500/10 rounded-lg">
                      <span className="text-[10px] text-slate-200 font-sans leading-relaxed font-light">
                        {currentStepData.conclusion}
                      </span>
                    </div>

                  </div>

                  {/* Previous / Next buttons */}
                  <div className="flex gap-2 font-mono">
                    <button
                      onClick={() => setActiveSlideStep((prev) => Math.max(1, prev - 1))}
                      disabled={activeSlideStep === 1}
                      className="flex-1 py-1.5 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-100 disabled:opacity-30 rounded-lg text-xs font-bold cursor-pointer transition-colors"
                    >
                      ← Précédent
                    </button>
                    <button
                      onClick={() => setActiveSlideStep((prev) => Math.min(5, prev + 1))}
                      disabled={activeSlideStep === 5}
                      className="flex-1 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white disabled:opacity-30 rounded-lg text-xs font-bold cursor-pointer transition-colors"
                    >
                      Suivant →
                    </button>
                  </div>
                </div>

              </div>

              {/* Conclusion Section with high-contrast alert box style */}
              <div className="bg-gradient-to-r from-slate-950 to-emerald-950/30 border border-emerald-500/15 p-5 rounded-2xl flex items-start gap-3.5 animate-fade-in shadow-lg">
                <span className="text-2xl mt-0.5 shrink-0">🤝</span>
                <div className="space-y-1">
                  <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-widest font-black block leading-none">
                    Pour résumer le parcours d'un prompt :
                  </span>
                  <p className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed italic font-light">
                    « Lorsqu'on envoie un prompt à une IA, elle découpe le texte, identifie les informations importantes, relie les idées, prédit les mots les plus probables puis affiche une réponse fluide et compréhensible. »
                  </p>
                </div>
              </div>

            </div>
          )}

          {/* Mode 2: Live Simulator Input */}
          {sandboxMode === "simulation" && (
            <div className="space-y-5 animate-fade-in">
              <div className="space-y-1.5">
                <label className="block text-[10px] text-slate-400 font-mono uppercase tracking-widest font-bold">
                  Saisissez votre consigne pour l'analyse en direct :
                </label>
                <div className="flex gap-2">
                  <input 
                    id="sim-input-text"
                    type="text" 
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    disabled={pipelineStep === "input" || pipelineStep === "thinking"}
                    className="flex-grow text-xs sm:text-sm px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 font-mono disabled:opacity-50"
                  />
                  <button
                    id="btn-run-simulation"
                    onClick={runSimulation}
                    disabled={pipelineStep === "input" || pipelineStep === "thinking"}
                    className="px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 rounded-xl text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer disabled:opacity-50 transition-colors"
                  >
                    <Play className="w-3 h-3 fill-white" />
                    <span>Lancer</span>
                  </button>
                </div>
              </div>

              {/* Graphic Sequencer Steps */}
              <div className="grid grid-cols-3 gap-2 py-3 border-t border-b border-slate-800/60">
                <div className={`p-2.5 rounded-lg border text-center transition-all duration-300 ${
                  pipelineStep === "input"
                    ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-300 shadow-lg"
                    : pipelineStep === "thinking" || pipelineStep === "output"
                    ? "bg-[#070c18]/50 border-slate-900 opacity-40"
                    : "bg-[#070c18]/30 border-slate-800 text-slate-500"
                }`}>
                  <span className="block text-[8px] font-mono text-slate-500 uppercase tracking-widest mb-0.5">Étape 01</span>
                  <span className={`text-[10px] font-bold ${pipelineStep === "input" ? "text-emerald-300" : "text-slate-400"}`}>Capture</span>
                </div>

                <div className={`p-2.5 rounded-lg border text-center transition-all duration-300 ${
                  pipelineStep === "thinking"
                    ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-300 animate-pulse shadow-lg"
                    : pipelineStep === "output"
                    ? "bg-[#070c18]/50 border-slate-900 opacity-40"
                    : "bg-[#070c18]/30 border-slate-800 text-slate-500"
                }`}>
                  <span className="block text-[8px] font-mono text-slate-500 uppercase tracking-widest mb-0.5">Étape 02</span>
                  <span className={`text-[10px] font-bold ${pipelineStep === "thinking" ? "text-emerald-300" : "text-slate-400"}`}>Analyse</span>
                </div>

                <div className={`p-2.5 rounded-lg border text-center transition-all duration-300 ${
                  pipelineStep === "output"
                    ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-300 shadow-lg"
                    : "bg-[#070c18]/30 border-slate-800 text-slate-500"
                }`}>
                  <span className="block text-[8px] font-mono text-slate-500 uppercase tracking-widest mb-0.5">Étape 03</span>
                  <span className={`text-[10px] font-bold ${pipelineStep === "output" ? "text-emerald-300" : "text-slate-400"}`}>Rendu</span>
                </div>
              </div>

              {/* Console logs */}
              {pipelineStep !== "idle" && (
                <div className="bg-slate-950 rounded-xl p-4 font-mono text-[10px] leading-relaxed border border-slate-850 space-y-1 text-slate-300 max-h-[110px] overflow-y-auto">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-bold border-b border-slate-900 pb-1 mb-1 text-[9px] uppercase tracking-wider">
                    <Cpu className="w-3 h-3 text-emerald-400" />
                    <span>Machine Virtuelle de Raisonnement</span>
                  </div>
                  {thinkingLog.map((log, index) => (
                    <p key={index} className={log.startsWith("[Completen") ? "text-emerald-400" : "text-slate-400"}>
                      &gt; {log}
                    </p>
                  ))}
                </div>
              )}

              {/* Output Result */}
              {pipelineStep === "output" && (
                <div className="bg-emerald-500/5 rounded-xl p-4 border border-emerald-500/10 animate-fade-in shadow-xl">
                  <div className="flex items-center gap-1 text-[10px] text-emerald-300 font-bold mb-1.5 uppercase tracking-wide">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Réponse finale générée :</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-light">
                    {outputResult}
                  </p>
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
