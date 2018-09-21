export interface ISynonymData {
  word: string;
  score: number;
}

export interface Test {
  [key: string]: ISynonymData;
}
