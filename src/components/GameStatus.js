import React from 'react';
import './GameStatus.css';

const GameStatus = ({ progress, totalPairs, attempts }) => {
  return (
    <div className="game-status-container">
      <div className="status-box pairs-box">
        Pairs: {progress}/{totalPairs}
      </div>
      <div className="status-box attempts-box">
        Attempts: {attempts}
      </div>
    </div>
  );
};

export default GameStatus; 