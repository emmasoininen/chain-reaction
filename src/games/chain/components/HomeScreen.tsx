
import type { DailyPuzzle } from "../types/gameTypes";

interface HomeScreenProps {
  puzzle: DailyPuzzle;
  onPlay: () => void;
}

function HomeScreen({ puzzle, onPlay }: HomeScreenProps) {
  return (
    <main className="home-screen">
      <header className="game-header">
        <div className="logo">CHAIN REACTION</div>
        <div className="header-subtitle">
          A daily word connection game
        </div>
      </header>

      <section className="home-content">
        <p className="puzzle-number">
          DAILY CHALLENGE #{puzzle.id}
        </p>

        <h1>Make the connection.</h1>

        <p className="home-description">
          Two words. A chain of connections.
          Can you find your way from start to finish?
        </p>

        <div className="word-preview">
          <div className="word-card">
            <span>START</span>
            <h2>{puzzle.startWord}</h2>
          </div>

          <div className="connection-arrow">→</div>

          <div className="word-card">
            <span>FINISH</span>
            <h2>{puzzle.endWord}</h2>
          </div>
        </div>

        <div className="puzzle-details">
        <span>{puzzle.difficulty} difficulty</span>
          <span className="detail-divider">·</span>
          <span>{puzzle.difficulty}</span>
        </div>

        <button className="play-button" onClick={onPlay}>
          Play today's puzzle →
        </button>
      </section>

      <footer className="home-footer">
        A new chain every day.
      </footer>
    </main>
  );
}

export default HomeScreen;

