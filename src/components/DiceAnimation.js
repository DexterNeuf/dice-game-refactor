import React, { useState, useEffect, useRef } from 'react';

function DiceRolling(props) {
  const [dice, diceRoll] = useState(1);

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  };

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const diceAnimation = async () => {
    for (let i = 0; i < 10; i++) {
      let randomNumber = getRandomInt(6) + 1;
      if (i === 9) {
        randomNumber = props.passedNumber;
      }
      diceRoll(randomNumber); // Update the state with the current or passed number
      await sleep(90);
    }
  };
  //run on first render
  useEffect(() => {
    diceAnimation();
  }, []);

  return (
    <div className="dice-containter">
      <div className="dice-rolling-container">
        <div className={`dice${dice} dice-roll-box`}></div>
      </div>
    </div>
  );
}

export default DiceRolling;
