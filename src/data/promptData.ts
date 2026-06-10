import { QuizQuestion, CaseStudy, AdvancedTechnique } from "../types";

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Lequel de ces prompts offre le meilleur rôle et contexte pour rédiger un email ?",
    options: [
      "Écris-moi un email d'excuse pour un retard de livraison.",
      "Tu es responsable de la relation client dans l'e-commerce. Rédige un email professionnel et empathique pour informer un client fidèle que sa commande aura 3 jours de retard suite à un problème logistique.",
      "Rédige un email de retard. Sois poli.",
      "Fais une lettre d'excuse rapide pour un colis en retard."
    ],
    correctIndex: 1,
    explanation: "Le deuxième prompt définit clairement un rôle ('responsable de la relation client'), un contexte ('client fidèle, retard de 3 jours') et une tonalité attendue ('professionnel et empathique')."
  },
  {
    id: 2,
    question: "Pour tester une idée ou obtenir une réponse directe sans donner d'exemples, quelle technique utilise-t-on ?",
    options: [
      "Le Few-Shot Prompting",
      "Le Chain of Thought (CoT)",
      "Le Zero-Shot Prompting",
      "Le One-Shot Prompting"
    ],
    correctIndex: 2,
    explanation: "Le Zero-Shot consiste à demander une tâche à l'IA directement sans lui fournir d'exemple préalable."
  },
  {
    id: 3,
    question: "Quel élément manque cruellement dans ce prompt : 'Résume ce texte de 5 pages sous forme de puces.'",
    options: [
      "L'objectif",
      "La directive de format",
      "Le contexte ou le domaine d'application du résumé",
      "Le verbe d'action"
    ],
    correctIndex: 2,
    explanation: "Bien que l'objectif (résumer) et le format (puces) soient indiqués, il manque le contexte pour savoir quels points clés privilégier (ex: pour un examen, pour un décideur pressé, etc.)."
  },
  {
    id: 4,
    question: "Pourquoi la technique du 'Chain of Thought' est-elle révolutionnaire pour les calculs ou le raisonnement logique ?",
    options: [
      "Elle oblige l'IA à répondre plus rapidement.",
      "Elle force l'IA à décomposer son raisonnement étape par étape, réduisant drastiquement les erreurs d'inattention ou de logique.",
      "Elle formate la réponse sous forme de tableau excel.",
      "Elle permet de traduire le texte en 10 langues."
    ],
    correctIndex: 1,
    explanation: "Le 'Chain of Thought' (Chaîne de pensée) incite l'IA à verbaliser ses étapes logiques intermédiaires, ce qui améliore spectaculairement la précision de ses conclusions complexes."
  }
];

export const advancedTechniques: AdvancedTechnique[] = [
  {
    id: "zero-shot",
    title: "Zero-Shot",
    shortDesc: "Sans aucun exemple intermédiaire",
    concept: "Idéal pour les tâches simples, courantes ou créatives où l'IA possède déjà toute la base de connaissances nécessaire.",
    example: {
      input: "Classifie ce commentaire en 'Positif' ou 'Négatif' : 'Le service était parfait mais l'attente un peu longue.'",
      output: "Classification : Mixte (tendance Positive pour le service, Négative pour l'attente)."
    }
  },
  {
    id: "one-shot",
    title: "One-Shot",
    shortDesc: "Guidé par un exemple",
    concept: "Donner précisément un exemple de ce qui est attendu pour fixer la structure de la réponse et la tonalité souhaitée.",
    example: {
      input: "Traduis en langage familier inspiré du web :\nExemple : 'Je ne comprends pas' -> 'J'ai dead ça j'y capte R'.\n\nNouveau : 'Je suis très fatigué'",
      output: "Traduction : 'Chuis au bout de ma vie frérot'."
    }
  },
  {
    id: "few-shot",
    title: "Few-Shot",
    shortDesc: "Guidé par plusieurs exemples",
    concept: "Recommandé pour configurer une tâche complexe, structurer des formats rigides, ou apprendre des classifications très spécifiques à l'IA.",
    example: {
      input: "Analyse le sentiment d'un produit :\nCom. : 'Excellent produit' -> sentiment: POSITIF (5/5)\nCom. : 'Bof, cher pour ce que c'est' -> sentiment: NEGATIF (2/5)\nCom. : 'Correct mais finitions moyennes' -> sentiment: NEUTRE (3/5)\nCom. : 'Superbe emballage, mais l'appareil ne s'allume pas' ->",
      output: "sentiment: NEGATIF (1/5) - Panne matérielle au déballage."
    }
  },
  {
    id: "chain-of-thought",
    title: "Chain of Thought",
    shortDesc: "Raisonner étape par étape",
    concept: "On demande explicitement à l'IA d'expliquer sa logique pas à pas avant de donner la réponse finale. Crucial pour les maths, le code et l'analyse critique.",
    example: {
      input: "Si 3 pommes coûtent 2€, et que j'achète 12 pommes mais j'ai un bon de réduction de 1,50€. Combien vais-je payer ? Pense étape par étape.",
      output: "1. Calcul du prix d'une pomme : 2€ / 3 = ~0.67€\n2. Calcul pour 12 pommes : 12 * (2€ / 3) = 8€\n3. Application du bon de réduction : 8€ - 1,50€ = 6,50€.\nRéponse finale : Vous allez payer 6,50€."
    }
  }
];

export const caseStudies: CaseStudy[] = [
  {
    id: "dev",
    category: "Développement",
    iconName: "Code",
    title: "Génération de code robuste",
    prompt: "Tu es un ingénieur principal expert en React et TypeScript. Rédige un custom hook personnalisé appelé 'useLocalStorage' qui synchronise un état de façon sécurisée avec localStorage. Inclus la gestion des erreurs de sérialisation et le typage générique complexe.",
    response: "Le modèle génère un code TypeScript extrêmement robuste de 30 lignes, équipé de blocs try/catch pour le server-side rendering, d'un typage TypeScript générique <T> et de guards pour empêcher les fuites mémoire."
  },
  {
    id: "datascience",
    category: "Data Science",
    iconName: "Database",
    title: "Nettoyage et explication",
    prompt: "Tu es Data Scientist senior. Reçois ce schéma de base de données d'utilisateurs contenant des valeurs manquantes 'Nan'. Explique les 3 meilleures stratégies statistiques pour imputer ces valeurs manquantes en Python avec pandas, et écris le code pour la méthode K-NN.",
    response: "L'IA fournit une explication méthodologique rigoureuse : 1) Suppression sélective, 2) Imputation par la médiane conditionnelle, 3) K-NN (K-Nearest Neighbors). Elle fournit le code `sklearn.impute.KNNImputer` prêt à l'emploi."
  },
  {
    id: "marketing",
    category: "Marketing",
    iconName: "Megaphone",
    title: "Copie publicitaire ciblée",
    prompt: "Tu es un concepteur-rédacteur publicitaire spécialisé dans le B2B SaaS. Rédige un fil Twitter de 4 publications pour le lancement d'un outil de productivité IA destiné aux chefs de projet débordés. Utilise la formule AIDA (Attention, Intérêt, Désir, Action) et un ton accrocheur mais professionnel.",
    response: "Le fil est généré avec une structure impeccable : Hook intrigant sur le temps perdu en réunions (Attention), statistiques clés sur la surcharge mentale (Intérêt), proposition de valeur claire (Désir), invitation à s'inscrire en bêta privée (Action)."
  },
  {
    id: "etudes",
    category: "Études / Recherche",
    iconName: "BookOpen",
    title: "Synthèse & Fiches de révision",
    prompt: "Tu es un enseignant universitaire en sociologie de la communication. Synthétise la théorie de la 'Spirale du silence' d'Elisabeth Noelle-Neumann en une fiche de révision structurée pour des étudiants de licence. Sépare le contenu en : Concepts clés, Exemples historiques, et Limites de la théorie.",
    response: "L'IA livre une fiche académique limpide avec des définitions solides, l'effet de l'isolement social, l'exemple de l'impact des médias de masse, et les critiques contemporaines liées à l'avènement des réseaux sociaux."
  }
];

export const goldenRules = [
  {
    number: "01",
    title: "Assigner une Identité",
    desc: "Donnez toujours un rôle d'expert à l'IA ('Tu es un expert en audit SEO...'). Cela cadre ses connaissances et améliore drastiquement le vocabulaire et le ton."
  },
  {
    number: "02",
    title: "Fournir du Contexte",
    desc: "Expliquez le contexte de la demande : qui lira le document ? Quel est le but sous-jacent ? Quel niveau de complexité est souhaité ? Plus il y a de détails constructifs, plus la réponse est précise."
  },
  {
    number: "03",
    title: "Donner des Contraintes Lourdes",
    desc: "Soyez explicite sur ce que l'IA ne doit PAS faire ('N'utilise pas de jargon technique', 'Ne dépasse pas 300 mots', 'Évite les introductions pompeuses')."
  },
  {
    number: "04",
    title: "Guider le Format de Sortie",
    desc: "Demandez explicitement des tableaux Markdown, des listes à puces, du code JSON bien formé ou des puces hiérarchisées pour économiser du temps d'édition."
  },
  {
    number: "05",
    title: "Itérer de Manière Interactive",
    desc: "Voyez l'IA comme un collègue intelligent. Si la première réponse n'est pas parfaite, posez des questions de suivi, demandez-lui d'approfondir un point spécifique ou de reformuler."
  }
];
