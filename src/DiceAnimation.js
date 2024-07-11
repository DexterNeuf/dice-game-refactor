import React, { useState, useEffect } from "react";

const DiceAnimation = ({ passedNumber }) => {
  const [currentNumber, setCurrentNumber] = useState(1);
  const [isRolling, setIsRolling] = useState(true);

  useEffect(() => {
    let interval;
    if (isRolling) {
      interval = setInterval(() => {
        setCurrentNumber(Math.floor(Math.random() * 6) + 1);
      }, 100); // Change dice face every 100ms

      // Stop rolling after 1 second and show the passed number
      setTimeout(() => {
        setIsRolling(false);
        setCurrentNumber(passedNumber);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [passedNumber, isRolling]);

  return (
    <div className="dice-animation">
      <div className={`dice dice${currentNumber}`}></div>
    </div>
  );
};

export default DiceAnimation;
