import React, { useState, useEffect, useCallback } from 'react';

const DiceAnimation = ({ passedNumber, turnInterval }) => {
  const [currentNumber, setCurrentNumber] = useState(1);
  const [margin, setMargin] = useState(17.5);
  const [isRolling, setIsRolling] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const getRandomNumber = (prevNumber) => {
    let newNumber;
    do {
      newNumber = Math.floor(Math.random() * 6) + 1;
    } while (newNumber === prevNumber);
    return newNumber;
  };

  const rollDice = useCallback(
    (duration) => {
      const start = Date.now();
      const end = start + duration;

      const roll = () => {
        const now = Date.now();
        if (now < end) {
          const progress = (now - start) / duration;
          const interval = 50 + Math.floor(250 * progress);

          setCurrentNumber((prevNumber) => {
            const newNumber = getRandomNumber(prevNumber);
            return newNumber;
          });

          setTimeout(() => {
            roll();
            setMargin((prevMargin) => {
              const newMargin = prevMargin + 3;
              return newMargin;
            });
          }, interval);
        } else {
          setCurrentNumber(passedNumber);
          setTimeout(() => {
            setIsVisible(false);
            setTimeout(() => setIsRolling(false), 300);
          }, 300);
        }
      };

      roll();
    },
    [passedNumber]
  );

  useEffect(() => {
    setMargin(17.5);
    setIsRolling(true);
    setIsVisible(true);

    const duration = 600; // Total duration of the roll in milliseconds

    rollDice(duration);

    return () => {
      // Cleanup if needed
    };
  }, [turnInterval, rollDice]);

  if (!isRolling) return null;

  return (
    <div className={`dice-animation-overlay ${isVisible ? 'visible' : ''}`}>
      <div className={`dice-animation ${isVisible ? 'visible' : ''}`}>
        <div
          className={`dice dice${currentNumber}`}
          style={{ marginLeft: `${margin}px ` }}
        ></div>
      </div>
    </div>
  );
};

export default DiceAnimation;
