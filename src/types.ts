export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface CaseStudy {
  id: string;
  category: string;
  iconName: string;
  title: string;
  prompt: string;
  response: string;
}

export interface AdvancedTechnique {
  id: string;
  title: string;
  shortDesc: string;
  concept: string;
  example: {
    input: string;
    output: string;
  };
}
