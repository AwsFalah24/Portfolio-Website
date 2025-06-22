import React, { useState, useEffect } from 'react';
import GameStatus from './components/GameStatus';

const MemoryGame = () => {
  const [gameState, setGameState] = useState('selection'); // 'selection', 'playing', 'end'
  const [level, setLevel] = useState('');
  const [theme, setTheme] = useState('');
  const [highContrast, setHighContrast] = useState(false);
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [gameStartTime, setGameStartTime] = useState(null);
  const [gameEndTime, setGameEndTime] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [canFlip, setCanFlip] = useState(true);

  // Game configuration based on level
  const gameConfig = {
    beginner: { pairs: 6, gridSize: 'three-by-four' },
    intermediate: { pairs: 8, gridSize: 'four-by-four' },
    advanced: { pairs: 10, gridSize: 'four-by-five' }
  };

  // Theme data
  const themeData = {
    numbers: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    letters: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
    symbols: ['★', '♦', '♠', '♥', '♣', '☀', '☁', '⭐', '⚡', '❤']
  };

  // Initialize game
  const startGame = () => {
    const config = gameConfig[level];
    const themeItems = themeData[theme].slice(0, config.pairs);
    const gameCards = [...themeItems, ...themeItems]
      .sort(() => Math.random() - 0.5)
      .map((value, index) => ({
        id: index,
        value,
        isFlipped: false,
        isMatched: false
      }));

    setCards(gameCards);
    setFlippedCards([]);
    setMatchedPairs([]);
    setAttempts(0);
    setGameStartTime(Date.now());
    setGameEndTime(null);
    setFeedback('');
    setGameState('playing');
  };

  // Handle card click
  const handleCardClick = (cardId) => {
    if (!canFlip || cards[cardId].isFlipped || cards[cardId].isMatched) return;

    const newCards = [...cards];
    newCards[cardId].isFlipped = true;
    setCards(newCards);

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setCanFlip(false);
      const [firstId, secondId] = newFlippedCards;
      const firstCard = newCards[firstId];
      const secondCard = newCards[secondId];

      if (firstCard.value === secondCard.value) {
        // Match found
        newCards[firstId].isMatched = true;
        newCards[secondId].isMatched = true;
        setCards(newCards);
        setMatchedPairs([...matchedPairs, firstCard.value]);
        setFeedback('Good job!');
        setAttempts(attempts + 1);
      } else {
        // No match
        setFeedback('Try again.');
        setAttempts(attempts + 1);
        setTimeout(() => {
          newCards[firstId].isFlipped = false;
          newCards[secondId].isFlipped = false;
          setCards(newCards);
        }, 1000);
      }

      setTimeout(() => {
        setFlippedCards([]);
        setCanFlip(true);
        setFeedback('');
      }, 1000);
    }
  };

  // Check if game is complete
  useEffect(() => {
    if (gameState === 'playing' && matchedPairs.length === gameConfig[level]?.pairs) {
      setGameEndTime(Date.now());
      setGameState('end');
    }
  }, [matchedPairs, gameState, level]);

  // Selection Screen
  if (gameState === 'selection') {
    return (
      <div className={`memory-game ${highContrast ? 'high-contrast' : ''}`}>
        <div className="container">
          <div className="selection-screen">
            <h1 className="game-title">Memory Game</h1>
            
            <div className="selection-section">
              <h2>Choose Level</h2>
              <div className="button-group">
                {Object.keys(gameConfig).map((lvl) => (
                  <button
                    key={lvl}
                    className={`level-btn ${level === lvl ? 'selected' : ''}`}
                    onClick={() => setLevel(lvl)}
                  >
                    {lvl.charAt(0).toUpperCase() + lvl.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="selection-section">
              <h2>Choose Theme</h2>
              <div className="button-group">
                {Object.keys(themeData).map((thm) => (
                  <button
                    key={thm}
                    className={`theme-btn ${theme === thm ? 'selected' : ''}`}
                    onClick={() => setTheme(thm)}
                  >
                    {thm.charAt(0).toUpperCase() + thm.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="accessibility-section">
              <label className="accessibility-toggle">
                <input
                  type="checkbox"
                  checked={highContrast}
                  onChange={(e) => setHighContrast(e.target.checked)}
                />
                High Contrast Mode
              </label>
            </div>

            <button
              className="start-btn"
              disabled={!level || !theme}
              onClick={startGame}
            >
              Start Game
            </button>

            <a href="/portfolio.html" className="back-btn">
              Back to Portfolio
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Game Play Screen
  if (gameState === 'playing') {
    const config = gameConfig[level];
    const progress = matchedPairs.length;
    const totalPairs = config.pairs;

    return (
      <div className={`memory-game ${highContrast ? 'high-contrast' : ''}`}>
        <div className="container">
          <div className="game-header">
            <h1 style={{ fontFamily: 'Arial, sans-serif' }}>Memory Game</h1>
            <GameStatus progress={progress} totalPairs={totalPairs} attempts={attempts} />
            <div className="feedback-container">
              {feedback && <div className="feedback">{feedback}</div>}
            </div>
          </div>

          <div className={`game-grid ${config.gridSize}`}>
            {cards.map((card) => (
              <div
                key={card.id}
                className={`card ${card.isFlipped ? 'flipped' : ''} ${card.isMatched ? 'matched' : ''}`}
                onClick={() => handleCardClick(card.id)}
              >
                <div className="card-inner">
                  <div className="card-front">?</div>
                  <div className="card-back">{card.value}</div>
                </div>
              </div>
            ))}
          </div>

          <button
            className="restart-btn"
            onClick={() => setGameState('selection')}
          >
            New Game
          </button>
        </div>
      </div>
    );
  }

  // End Screen
  if (gameState === 'end') {
    const totalTime = Math.round((gameEndTime - gameStartTime) / 1000);
    const accuracy = Math.round((gameConfig[level].pairs / attempts) * 100) || 0;

    return (
      <div className={`memory-game ${highContrast ? 'high-contrast' : ''}`}>
        <div className="container">
          <div className="end-screen">
            <h1>Game Complete!</h1>
            
            <div className="results">
              <div className="result-item">
                <span>Total Time:</span>
                <span>{totalTime} seconds</span>
              </div>
              <div className="result-item">
                <span>Accuracy:</span>
                <span>{accuracy}%</span>
              </div>
              <div className="result-item">
                <span>Attempts:</span>
                <span>{attempts}</span>
              </div>
            </div>

            <div className="encouragement">
              Nice work! Keep practicing.
            </div>

            <div className="end-buttons">
              <button
                className="retry-btn"
                onClick={startGame}
              >
                Retry Same Level
              </button>
              <button
                className="next-btn"
                onClick={() => {
                  const levels = Object.keys(gameConfig);
                  const currentIndex = levels.indexOf(level);
                  const nextLevel = levels[(currentIndex + 1) % levels.length];
                  setLevel(nextLevel);
                  startGame();
                }}
              >
                Move to Next Level
              </button>
            </div>

            <a href="/portfolio.html" className="back-btn">
              Back to Portfolio
            </a>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default MemoryGame; 