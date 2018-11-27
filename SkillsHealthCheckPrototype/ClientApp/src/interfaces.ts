export interface Questions {
  id: string;
  text: string;
  questiontraits: QuestionTraits;
  isvisible: number;
  order: number;
}

export interface QuestionTraits {
  traitid: number;
  trait: string;
}

export interface Customer {
  id: string;
  name: string;
  questionanswers: QuestionAnswer[];
}

export interface QuestionAnswer {
  questionid: string;
  text: string;
  traitid: number;
  trait: string;
  traitscore: number;
}

export interface Outcome {
  traitid: number;
  trait: string;
  score: number;
}
