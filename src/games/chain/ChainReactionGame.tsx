
import { useState } from "react";

import HomeScreen from "./components/HomeScreen";
import GameBoard from "./components/GameBoard";

import { dailyPuzzles } from "./data/puzzles";
import {
  validateChain,
  findShortestChain,
} from "./engine/connections";

type Props = {
  onBack: () => void;
};

function ChainReactionGame({ onBack }: Props) {
  const [isPlaying, setIsPlaying] = useState(false);

  const puzzle = dailyPuzzles[0];

  const [entries, setEntries] = useState<string[]>([""]);
  const [validationMessage, setValidationMessage] =
    useState<string | null>(null);
  const [score, setScore] = useState<number | null>(null);

  function updateEntry(index: number, value: string) {
    setValidationMessage(null);
    setScore(null);

    setEntries((previous) =>
      previous.map((word, i) =>
        i === index ? value : word
      )
    );
  }

  function addWord() {
    setValidationMessage(null);
    setScore(null);
    setEntries((previous) => [...previous, ""]);
  }

  function removeWord(index: number) {
    setValidationMessage(null);
    setScore(null);

    setEntries((previous) => {
      if (previous.length === 1) return [""];
      return previous.filter((_, i) => i !== index);
    });
  }

  function submitChain() {
    const completedEntries = entries.map((word) => word.trim());

    if (completedEntries.some((word) => word.length === 0)) {
      setValidationMessage("Please fill in all your words.");
      setScore(null);
      return;
    }

    const fullChain = [
      puzzle.startWord,
      ...completedEntries,
      puzzle.endWord,
    ];

    const result = validateChain(fullChain);

    if (!result.valid) {
      setValidationMessage(result.message);
      setScore(null);
      return;
    }

    const shortestChain = findShortestChain(
      puzzle.startWord,
      puzzle.endWord
    );

    if (!shortestChain) {
      setValidationMessage(
        "We couldn't calculate the shortest chain. Please try again."
      );
      setScore(null);
      return;
    }

    const optimalWordCount = shortestChain.length - 2;
    const playerWordCount = completedEntries.length;

    const extraWords = Math.max(
      0,
      playerWordCount - optimalWordCount
    );

    const calculatedScore = Math.max(
      0,
      100 - extraWords * 20
    );

    setScore(calculatedScore);

    if (extraWords === 0) {
      setValidationMessage(
        "Amazing! You found the shortest possible chain!"
      );
    } else {
      setValidationMessage(
        `Valid chain! You used ${playerWordCount} words. The shortest chain uses ${optimalWordCount}.`
      );
    }
  }

  function startGame() {
    setEntries([""]);
    setValidationMessage(null);
    setScore(null);
    setIsPlaying(true);
  }

  return (
    <div className="app">
      {isPlaying ? (
        <GameBoard
          puzzle={puzzle}
          entries={entries}
          onEntryChange={updateEntry}
          onAddWord={addWord}
          onRemoveWord={removeWord}
          onSubmit={submitChain}
          onBack={() => setIsPlaying(false)}
          validationMessage={validationMessage}
          score={score}
        />
      ) : (
        <>
          <button onClick={onBack}>
            Back to games
          </button>

          <HomeScreen
            puzzle={puzzle}
            onPlay={startGame}
          />
        </>
      )}
    </div>
  );
}

export default ChainReactionGame;
