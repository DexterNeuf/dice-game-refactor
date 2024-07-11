import React, { useState, useEffect } from "react";

const DiceAnimation = ({ passedNumber, turnInterval }) => {
  const [currentNumber, setCurrentNumber] = useState(1);
  const [isRolling, setIsRolling] = useState(false);

  useEffect(() => {
    console.log(
      "Effect triggered. turnInterval:",
      turnInterval,
      "passedNumber:",
      passedNumber
    );

    setIsRolling(true);

    const rollingInterval = setInterval(() => {
      setCurrentNumber((prev) => {
        const newNumber = Math.floor(Math.random() * 6) + 1;
        console.log("Rolling, current number:", newNumber);
        return newNumber;
      });
    }, 100);

    const stopRollingTimeout = setTimeout(() => {
      clearInterval(rollingInterval);
      setIsRolling(false);
      setCurrentNumber(passedNumber);
      console.log("Rolling stopped. Final number:", passedNumber);
    }, 1000);

    return () => {
      clearInterval(rollingInterval);
      clearTimeout(stopRollingTimeout);
    };
  }, [passedNumber, turnInterval]);

  return (
    <div className="dice-animation">
      <div className={`dice dice${currentNumber}`}></div>
    </div>
  );
};

export default DiceAnimation;
