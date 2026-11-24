
import { useState } from "react";

import ChainReactionGame from "../games/chain/ChainReactionGame";

type GameId = "home" | "chain-reaction" | "word-ladder";

function App() {
  const [selectedGame, setSelectedGame] =
    useState<GameId>("home");

  return (
    <div className="app">
      {selectedGame === "home" && (
        <main>
          <h1>STRINGED</h1>
          <p>Daily word games.</p>

          <button
            onClick={() => setSelectedGame("chain-reaction")}
          >
            Chain Reaction
          </button>

          <button
            onClick={() => setSelectedGame("word-ladder")}
          >
            Word Ladder
          </button>
        </main>
      )}

      {selectedGame === "chain-reaction" && (
        <ChainReactionGame
          onBack={() => setSelectedGame("home")}
        />
      )}

      {selectedGame === "word-ladder" && (
        <p>Word Ladder coming soon!</p>
      )}
    </div>
  );
}

export default App;
