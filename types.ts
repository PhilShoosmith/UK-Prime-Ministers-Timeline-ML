
export interface PrimeMinister {
  id: number;
  name: string;
  party: string;
  termStart: number;
  termEnd: number | null; // Can be null for the current PM
  context: string;
  contextFr?: string;
  contextJa?: string;
  contextEs?: string;
  contextZh?: string;
  contextAr?: string;
  contextHi?: string;
  imageUrl?: string;
  coatOfArmsUrl?: string;
}

export type GameState = 'start' | 'playing' | 'feedback' | 'end' | 'review' | 'privacy' | 'terms' | 'hallOfFame';

export type GameMode = 'year' | 'pm' | 'fact';

export interface HallOfFameEntry {
  name: string;
  score: number;
  timeLeft: number;
  date: string;
}

export interface Leaderboards {
  year: HallOfFameEntry[];
  pm: HallOfFameEntry[];
  fact: HallOfFameEntry[];
}

export interface LastYearGuess {
  type: 'year';
  isCorrect: boolean;
  guessedYear: number;
  correctYear: number;
  timedOut?: boolean;
}

export interface LastPMGuess {
  type: 'pm';
  isCorrect: boolean;
  guessedPMId: number;
  correctPMId: number;
  timedOut?: boolean;
}

export interface LastFactGuess {
  type: 'fact';
  isCorrect: boolean;
  guessedPMId: number;
  correctPMId: number;
  timedOut?: boolean;
}

export type AnyLastGuess = LastYearGuess | LastPMGuess | LastFactGuess;