import React, { useState, useEffect } from "react";

const DiceAnimation = ({ onFinish }) => {
  const [currentNumber, setCurrentNumber] = useState(1);
  const [animationSpeed, setAnimationSpeed] = useState(100); // Adjust the speed of animation as needed

  useEffect(() => {
    const interval = setInterval(() => {
      // Generate random numbers from 1 to 6 for animation
      const randomNumber = Math.floor(Math.random() * 6) + 1;
      setCurrentNumber(randomNumber);
    }, animationSpeed);

    // Stop the animation after some time and settle on the final number
    setTimeout(() => {
      clearInterval(interval);
      onFinish(currentNumber);
    }, 2000); // Adjust the duration of animation as needed

    return () => clearInterval(interval);
  }, [animationSpeed, currentNumber, onFinish]);

  return (
    <div className="dice-animation">
      <h2>Rolling Dice</h2>
      <div className="dice">{currentNumber}</div>
    </div>
  );
};

export default DiceAnimation;
