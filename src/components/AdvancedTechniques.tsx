import React, { useState } from "react";
import { Sparkles, Check, ArrowRight, Terminal } from "lucide-react";

interface TechMethod {
  id: string;
  title: string;
  badge: string;
  subtitle: string;
  description: string;
  keyBenefit: string;
  example: {
    input: string;
    output: string;
  };
}

const TECH_METHODS: TechMethod[] = [
  {
    id: "zero-shot",
    title: "1. Zéro Exemple (Zero-Shot)",
    badge: "Direct",
    subtitle: "Zéro préparation nécessaire",
    description: "Vous posez une question d'informatique directe sans lui donner de modèle à suivre. L'IA s'appuie uniquement sur ses connaissances de base pour répondre.",
    keyBenefit: "Parfait pour les questions de cours rapides, les définitions ou l'identification de langages.",
    example: {
      input: "Dis-moi dans quel langage informatique est écrit ce code :\n`print('Bonjour tout le monde !')`",
      output: "Ce code est écrit en Python."
    }
  },
  {
    id: "one-shot",
    title: "2. Un seul Exemple (One-Shot)",
    badge: "Imitation",
    subtitle: "Idéal pour imiter un style ou un format précis",
    description: "Vous fournissez un unique exemple concret de 'Question -> Réponse'. L'IA comprend immédiatement la façon dont vous voulez formater la sortie.",
    keyBenefit: "Idéal pour transformer, convertir ou normaliser des noms de variables sans écrire de script complexe.",
    example: {
      input: "Convertis les noms de variables au format 'snake_case' (mots séparés par un tiret bas).\n\nExemple : `userId` -> `user_id`\n\nNouveau mot à convertir : `totalAmount`",
      output: "Resultat :\n`total_amount`"
    }
  },
  {
    id: "few-shot",
    title: "3. Plusieurs Exemples (Few-Shot)",
    badge: "Rythme",
    subtitle: "Régularité et mimétisme absolu",
    description: "Vous listez 3 petites paires de données pour installer un rythme visuel évident. L'IA imite instantanément cette cadence pour compléter la suite sans jamais dévier.",
    keyBenefit: "La solution la plus fiable pour automatiser le tri d'extensions de fichiers ou la classification de logs simples.",
    example: {
      input: "Associe chaque nom de fichier à sa catégorie (HTML, CSS ou JavaScript) ou son rôle :\n\n1. `index.html` -> HTML\n2. `styles.css` -> CSS\n3. `app.js` -> JavaScript\n4. `structure.html` ->",
      output: "HTML"
    }
  },
  {
    id: "chain-of-thought",
    title: "4. Pensée Guidée (Chain of Thought)",
    badge: "Raisonnement",
    subtitle: "Pour éviter les erreurs logiques bêtes",
    description: "Vous demandez explicitement à l'IA d'écrire son brouillon et d'exposer son calcul étape par étape avant d'assembler la réponse finale.",
    keyBenefit: "Évite que l'IA ne calcule trop vite et simule parfaitement l'exécution logique d'une variable.",
    example: {
      input: "On commence avec une variable `score = 10`.\nOn ajoute 5, puis on divise le tout par 3.\nQuelle est la valeur finale de `score` ? Calcule étape par étape.",
      output: "Logique pas à pas :\n1. Valeur de départ : `score = 10`\n2. On ajoute 5 : 10 + 5 = 15\n3. On divise par 3 : 15 / 3 = 5\n\nValeur finale : 5"
    }
  }
];

export default function AdvancedTechniques() {
  const [activeId, setActiveId] = useState("zero-shot");
  const currentMethod = TECH_METHODS.find((m) => m.id === activeId) || TECH_METHODS[0];

  return (
    <section 
      id="advanced" 
      className="py-12 sm:py-16 px-4 bg-[#030712] border-t border-slate-900 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto w-full flex flex-col justify-center">
        
        {/* Section Header */}
        <div id="advanced-header-block" className="text-center space-y-2 mb-8 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono uppercase tracking-widest font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ingénierie de Prompt</span>
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
            Les 4 Méthodes Fondamentales
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm font-light leading-relaxed font-sans">
            Parler à une IA, c'est comme concevoir une API ou paramétrer un script. Voici comment diriger la logique des modèles selon 4 modes.
          </p>
        </div>

        {/* Outer container designed to prevent overflow - uses min-w-0 and grid-cols-12 */}
        <div id="advanced-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start min-w-0 w-full mb-10">
          
          {/* Left Rail: Method picker buttons (Compact, 1 col) */}
          <div id="advanced-menu-rail" className="lg:col-span-4 space-y-3 min-w-0 w-full">
            <span className="block text-[9px] text-slate-500 font-mono uppercase tracking-widest font-bold">
              1. Choisissez une technique :
            </span>
            <div className="grid gap-2 min-w-0 w-full">
              {TECH_METHODS.map((method) => {
                const isActive = method.id === activeId;
                return (
                  <button
                    key={method.id}
                    id={`btn-tech-select-${method.id}`}
                    onClick={() => setActiveId(method.id)}
                    className={`w-full text-left p-2.5 rounded-xl border transition-all duration-200 cursor-pointer min-w-0 ${
                      isActive
                        ? "bg-slate-900 border-emerald-500/40 text-white shadow-lg"
                        : "bg-[#0b1224]/40 border-slate-900 text-slate-400 hover:bg-[#0b1224]/80 hover:text-slate-200"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 min-w-0">
                      <div className="min-w-0 truncate">
                        <span className={`text-[8px] font-mono tracking-wider block ${
                          isActive ? "text-emerald-400 font-semibold" : "text-slate-500"
                        }`}>
                          PARADIGME TECHNIQUE
                        </span>
                        <h4 className="text-xs font-bold truncate">
                          {method.title}
                        </h4>
                      </div>
                      <span className={`shrink-0 text-[8px] font-mono px-2 py-0.5 rounded ${
                        isActive ? "bg-emerald-500/15 text-emerald-300 font-bold" : "bg-slate-950 text-slate-500"
                      }`}>
                        {method.badge}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
            
            <div className="p-3 bg-slate-950/70 border border-slate-900 rounded-xl space-y-1 hidden lg:block">
              <span className="text-[9px] font-mono font-bold text-emerald-400 uppercase tracking-widest block">
                La règle de l'ingénieur
              </span>
              <p className="text-[11px] text-slate-400 leading-relaxed font-light font-sans">
                Inutile d'écrire des consignes interminables. Pour un format de code précis, <strong className="text-slate-200 font-medium font-sans">donnez des exemples</strong> directement dans votre invite.
              </p>
            </div>
          </div>

          {/* Right Area: Dynamic Viewer that WILL NEVER OVERFLOW */}
          <div id="advanced-main-viewport" className="lg:col-span-8 bg-[#0b1224] border border-slate-850 rounded-2xl p-4 sm:p-5 shadow-2xl relative space-y-4 min-w-0 w-full overflow-hidden">
            
            {/* Minimal Header */}
            <div className="space-y-1">
              <span className="text-[9px] text-emerald-400 font-mono tracking-widest uppercase block font-bold">
                {currentMethod.subtitle}
              </span>
              <h3 className="font-display font-black text-sm sm:text-base text-white tracking-tight">
                {currentMethod.title.split(". ")[1]}
              </h3>
              <p className="text-slate-350 text-xs leading-relaxed font-light font-sans">
                {currentMethod.description}
              </p>
            </div>

            {/* Prompt Console Sandbox -> Safe from overflows */}
            <div className="space-y-2.5 min-w-0 w-full">
              
              <div className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-slate-500" />
                <span className="text-[9px] text-slate-500 font-mono uppercase tracking-widest font-bold">
                  Cas Informatique Réel :
                </span>
              </div>

              <div id="sandbox-container" className="grid grid-cols-1 gap-2.5 min-w-0 w-full overflow-hidden">
                
                {/* Simulated Input block with safe breaks */}
                <div className="bg-slate-950 border border-slate-900 rounded-xl p-3 min-w-0 w-full overflow-hidden">
                  <div className="flex items-center gap-1 text-[8px] text-teal-400 font-mono uppercase tracking-wider mb-1.5 border-b border-slate-900 pb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                    <span>Invite envoyée au modèle (PROMPT ENTRÉE)</span>
                  </div>
                  <p className="text-[11px] text-slate-300 font-mono leading-relaxed whitespace-pre-wrap break-words selection:bg-teal-500/20 select-text">
                    {currentMethod.example.input}
                  </p>
                </div>

                {/* Simulated Output block with safe breaks */}
                <div className="bg-emerald-950/10 border border-emerald-900/20 rounded-xl p-3 min-w-0 w-full overflow-hidden">
                  <div className="flex items-center gap-1 text-[8px] text-emerald-400 font-mono uppercase tracking-wider mb-1.5 border-b border-slate-900 pb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>Réponse attendue de l'IA</span>
                  </div>
                  <p className="text-[11px] text-emerald-250 font-mono leading-relaxed whitespace-pre-wrap break-words italic selection:bg-emerald-500/20 select-text">
                    {currentMethod.example.output}
                  </p>
                </div>

              </div>

            </div>

            {/* Key Benefit Banner */}
            <div className="pt-2.5 border-t border-slate-900 flex items-center gap-1.5 text-[11px] text-slate-400 min-w-0">
              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <p className="font-light truncate min-w-0 w-full font-sans">
                <strong className="text-white font-medium font-sans">Bénéfice : </strong>
                {currentMethod.keyBenefit}
              </p>
            </div>

          </div>

        </div>

        {/* Carousel indicators for slide control */}
        <div id="advanced-nav-underbar" className="mb-4 flex justify-between items-center bg-slate-950 border border-slate-900 p-2 rounded-xl gap-2 sm:max-w-sm sm:mx-auto">
          <button
            id="nav-btn-prev-tech"
            onClick={() => {
              const currentIndex = TECH_METHODS.findIndex((m) => m.id === activeId);
              const prevIndex = (currentIndex - 1 + TECH_METHODS.length) % TECH_METHODS.length;
              setActiveId(TECH_METHODS[prevIndex].id);
            }}
            className="px-2.5 py-1 bg-slate-900 text-[8px] uppercase font-mono font-bold tracking-widest text-slate-400 hover:text-white border border-slate-850 rounded-md cursor-pointer transition-colors"
          >
            ← Précédent
          </button>
          
          <div className="flex items-center gap-1 text-[10px] text-slate-500 font-mono font-semibold">
            <span>0{TECH_METHODS.findIndex((m) => m.id === activeId) + 1}</span>
            <span>/</span>
            <span>0{TECH_METHODS.length}</span>
          </div>

          <button
            id="nav-btn-next-tech"
            onClick={() => {
              const currentIndex = TECH_METHODS.findIndex((m) => m.id === activeId);
              const nextIndex = (currentIndex + 1) % TECH_METHODS.length;
              setActiveId(TECH_METHODS[nextIndex].id);
            }}
            className="px-2.5 py-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-[8px] uppercase font-mono font-bold tracking-widest text-white rounded-md cursor-pointer transition-all"
          >
            Suivant <ArrowRight className="inline-block w-2.5 h-2.5 ml-0.5" />
          </button>
        </div>

      </div>
    </section>
  );
}
