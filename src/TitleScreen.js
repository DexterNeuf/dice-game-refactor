import React from 'react';

const TitleScreen = ({ onStartGame }) => {
  return (
    <div className="titleScreen">
      <h1>Your Game Title</h1>
      <button onClick={onStartGame}>Start Game</button>
    </div>
  );
};

export default TitleScreen;
