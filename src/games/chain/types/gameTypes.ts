
export interface DailyPuzzle {
  id: number;
  date: string;
  startWord: string;
  endWord: string;
  difficulty: "easy" | "medium" | "hard" | "expert";
}

export interface GameState {
  puzzle: DailyPuzzle;
  entries: string[];
}

