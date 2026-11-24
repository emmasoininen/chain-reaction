
import { useRef } from "react";
import type { DailyPuzzle } from "../types/gameTypes";

interface GameBoardProps {
  puzzle: DailyPuzzle;
  entries: string[];
  validationMessage: string | null;
  score: number | null;
  onEntryChange: (index: number, value: string) => void;
  onAddWord: () => void;
  onRemoveWord: (index: number) => void;
  onSubmit: () => void;
  onBack: () => void;
}

function GameBoard({
  puzzle,
  entries,
  onEntryChange,
  onAddWord,
  onRemoveWord,
  onSubmit,
  onBack,
  validationMessage,
  score,
}: GameBoardProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const completedEntries = entries.filter(
    (word) => word.trim().length > 0
  );

  const allFilled = entries.length > 0 && entries.every(
    (word) => word.trim().length > 0
  );

  function handleChange(index: number, value: string) {
    onEntryChange(index, value);

    // Move to the next input when pressing Enter
    if (value.trim().length > 0 && index < entries.length - 1) {
      // Focus is handled by the Enter key below
    }
  }

  function handleKeyDown(
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) {
    if (event.key === "Enter") {
      event.preventDefault();

      if (index < entries.length - 1) {
        inputRefs.current[index + 1]?.focus();
      } else {
        onAddWord();

        setTimeout(() => {
          inputRefs.current[index + 1]?.focus();
        }, 0);
      }
    }
  }

  return (
    <main className="game-screen">
      <header className="game-header">
        <button className="back-button" onClick={onBack}>
          ← Back
        </button>

        <div className="logo">CHAIN REACTION</div>

        <div className="puzzle-number">
          #{puzzle.id}
        </div>
      </header>

      <section className="game-content">
        <h1>Build your chain.</h1>

        <p className="game-description">
          Connect the starting word to the ending word
          using as few words as possible.
        </p>

        <div className="chain-container">
          <div className="chain-endpoint">
            {puzzle.startWord}
          </div>

          {entries.map((entry, index) => (
            <div className="chain-input-wrapper" key={index}>
              <div className="chain-connector">↓</div>

              <div className="input-row">
                <input
                  ref={(element) => {
                    inputRefs.current[index] = element;
                  }}
                  type="text"
                  className="chain-input"
                  placeholder={`Word ${index + 1}`}
                  value={entry}
                  onChange={(event) =>
                    handleChange(index, event.target.value)
                  }
                  onKeyDown={(event) =>
                    handleKeyDown(event, index)
                  }
                  aria-label={`Missing word ${index + 1}`}
                  autoComplete="off"
                  spellCheck={false}
                />

                <button
                  type="button"
                  className="remove-word-button"
                  onClick={() => onRemoveWord(index)}
                  aria-label={`Remove word ${index + 1}`}
                >
                  ×
                </button>
              </div>
            </div>
          ))}

          <div className="chain-connector">↓</div>

          <div className="chain-endpoint">
            {puzzle.endWord}
          </div>
        </div>

        <p className="word-count">
          {completedEntries.length} words used
        </p>

        <button
          type="button"
          className="add-word-button"
          onClick={onAddWord}
        >
          + Add another word
        </button>

        <button
          className="submit-button"
          disabled={!allFilled}
          onClick={onSubmit}
        >
          Submit chain →
        </button>
        {validationMessage && (
          <p
            className={
              validationMessage.startsWith("Amazing!")
                ? "validation-message success"
                : "validation-message error"
            }
          >
            {validationMessage}
          </p>
        )}

        {score !== null && (
          <div className="score-display">
            <span>Your score</span>
            <strong>{score}</strong>
            <span> / 100</span>
          </div>
        )}
      </section>
    </main>
  );
}

export default GameBoard;
