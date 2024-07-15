import './styles.css';
import calculateScore from './RowCalc';
import checkForDuplicates from './checkDups';
import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import DiceAnimation from './DiceAnimation';

export default function App() {
  const [playerArray, setPlayerArray] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);
  const [opponentArray, setOpponentArray] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);

  const [playerScore, setPlayerScore] = useState([0, 0, 0]);
  const [opponentScore, setOpponentScore] = useState([0, 0, 0]);
  const [turnInterval, changeTurn] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [moveCompleted, setMoveCompleted] = useState(false);
  const [lastClicked, setLastClicked] = useState(0);
  const [randomNumber, setRandomNumber] = useState(
    Math.floor(Math.random() * 6) + 1
  );
  const [playerDuplicates, setPlayerDuplicates] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);
  const [opponentDuplicates, setOpponentDuplicates] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);

  useEffect(() => {
    if (moveCompleted) {
      duplicateWrapper();
      setMoveCompleted(false); // Reset for the next move
    }
  }, [moveCompleted, playerArray, opponentArray]);

  const duplicateWrapper = () => {
    const playerCopy = [...playerArray];
    const opponenetCopy = [...opponentArray];
    let playerDuplicatesRow = checkForDuplicates(playerCopy, lastClicked);
    let opponenetDuplicatesRow = checkForDuplicates(opponenetCopy, lastClicked);
    setPlayerDuplicates((prePlayerDuplicates) => {
      const newArr = [
        ...prePlayerDuplicates.slice(0, lastClicked),
        playerDuplicatesRow,
        ...prePlayerDuplicates.slice(lastClicked + 1),
      ];
      console.log(newArr);
      return newArr;
    });
  };

  useEffect(() => {
    checkArrFull('player');
  }, [playerArray]);

  useEffect(() => {
    checkArrFull('opponent');
  }, [opponentArray]);

  const checkRowFull = (rowNum, subject) => {
    let subjectArray = [];
    if (subject === 'player') {
      subjectArray = playerArray;
    } else {
      subjectArray = opponentArray;
    }
    if (subjectArray[rowNum].every((item) => item !== 0)) {
      return false;
    }
    return true;
  };
  const checkArrFull = (subject) => {
    let subjectArray = [];
    if (subject === 'player') {
      subjectArray = playerArray;
    } else {
      subjectArray = opponentArray;
    }
    for (let i = 0; i < subjectArray.length; i++) {
      for (let j = 0; j < subjectArray[i].length; j++) {
        if (subjectArray[i][j] === 0) {
          return false;
        }
      }
    }
    setGameOver(true);
  };

  const renderDice = (index, subject) => {
    let rowItems = [];
    if (subject === 'player') {
      rowItems = [...playerArray[index]];
    } else {
      rowItems = [...opponentArray[index]];
    }
    return rowItems.map((item, i) => (
      <div className={`dice dice${item}`} key={i}>
        {' '}
      </div>
    ));
  };

  const addDice = (rowNum, subject) => {
    let subjectArray = [];
    if (subject === 'player') {
      subjectArray = playerArray;
    } else {
      subjectArray = opponentArray;
    }
    const newNumber = randomNumber;
    setRandomNumber(Math.floor(Math.random() * 6) + 1);
    let reversedArray = [...subjectArray[rowNum]].reverse();
    const emptySpace = reversedArray.indexOf(0);
    reversedArray[emptySpace] = newNumber;
    reversedArray = reversedArray.reverse();
    if (subject === 'player') {
      setPlayerArray((prevPlayerArray) => {
        const updatedArray = [
          ...prevPlayerArray.slice(0, rowNum),
          reversedArray,
          ...prevPlayerArray.slice(rowNum + 1),
        ];
        const calculatedScore = calculateScore(updatedArray[rowNum], rowNum);
        setPlayerScore((prevPlayerScore) => {
          const newPlayerScore = [
            ...prevPlayerScore.slice(0, rowNum),
            calculatedScore,
            ...prevPlayerScore.slice(rowNum + 1),
          ];
          return newPlayerScore;
        });
        changeTurn(!turnInterval);
        return updatedArray;
      });
      removeFromArray(opponentArray, rowNum, newNumber, true);
    } else {
      setOpponentArray((prevOpponentArray) => {
        const updatedArray = [
          ...prevOpponentArray.slice(0, rowNum),
          reversedArray,
          ...prevOpponentArray.slice(rowNum + 1),
        ];
        const calculatedScore = calculateScore(updatedArray[rowNum], rowNum);
        setOpponentScore((prevOpponentScore) => {
          const newOpponentScore = [
            ...prevOpponentScore.slice(0, rowNum),
            calculatedScore,
            ...prevOpponentScore.slice(rowNum + 1),
          ];
          return newOpponentScore;
        });
        changeTurn(!turnInterval);
        return updatedArray;
      });
      removeFromArray(playerArray, rowNum, newNumber, false);
    }
    setMoveCompleted(true);
  };

  const determineGameOutcome = () => {
    const playerTotalScore = playerScore.reduce((acc, score) => acc + score, 0);
    const opponentTotalScore = opponentScore.reduce(
      (acc, score) => acc + score,
      0
    );

    return playerTotalScore > opponentTotalScore ? 'player won' : 'player lost';
  };

  const resetGame = () => {
    setPlayerArray([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);
    setOpponentArray([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);
    setPlayerScore([0, 0, 0]);
    setOpponentScore([0, 0, 0]);
    changeTurn(true); // Reset turn to player's turn
    setGameOver(false); // Ensure game over state is reset
  };
  const removeFromArray = (subject, rowIndex, value, ifPlayer) => {
    let updatedArray = [...subject]; // Create a copy of the array
    let row = [...updatedArray[rowIndex]]; // Create a copy of the row

    // Remove all instances of the value from the row
    row = row.filter((element) => element !== value);

    // Move remaining elements to the left
    for (let i = 0; i < row.length; i++) {
      if (row[i] === 0) {
        row.splice(i, 1);
        i--; // Adjust index after removing an element
      }
    }

    // Fill the row with zeros to match the original length
    while (row.length < subject[rowIndex].length) {
      row.push(0);
    }
    row.reverse();
    updatedArray.splice(rowIndex, 1, row); // Replace the old row with the modified row
    if (ifPlayer) {
      setOpponentArray(updatedArray);
    } else {
      setPlayerArray(updatedArray);
    }
  };

  return (
    <div className={`App ${gameOver ? 'gameOverMode' : ''}`}>
      <DiceAnimation passedNumber={randomNumber} turnInterval={turnInterval} />
      <div
        className={`diceGrid ${turnInterval ? 'activeGrid' : 'inactiveGrid'}`}
      >
        <div
          className="diceRow"
          onClick={() => {
            setLastClicked(0);
            if (turnInterval && checkRowFull(0, 'player')) {
              addDice(0, 'player');
            }
          }}
        >
          {renderDice(0, 'player')}
        </div>
        <div
          className="diceRow"
          onClick={() => {
            setLastClicked(1);
            if (turnInterval && checkRowFull(1, 'player')) {
              addDice(1, 'player');
            }
          }}
        >
          {renderDice(1, 'player')}
        </div>
        <div
          className="diceRow"
          onClick={() => {
            setLastClicked(2);
            if (turnInterval && checkRowFull(2, 'player')) {
              addDice(2, 'player');
            }
          }}
        >
          {renderDice(2, 'player')}
        </div>
      </div>
      <div className="diceGrid">
        <div className={` dice dice${randomNumber}`}></div>
      </div>
      <div
        className={`diceGrid ${!turnInterval ? 'activeGrid' : 'inactiveGrid'}`}
      >
        <div
          className="diceRow"
          onClick={() => {
            setLastClicked(0);
            if (!turnInterval && checkRowFull(0, 'opponent')) {
              addDice(0, 'opponent');
            }
          }}
        >
          {renderDice(0, 'opponent')}
        </div>
        <div
          className="diceRow"
          onClick={() => {
            setLastClicked(1);
            if (!turnInterval && checkRowFull(1, 'opponent')) {
              addDice(1, 'opponent');
            }
          }}
        >
          {renderDice(1, 'opponent')}
        </div>
        <div
          className="diceRow"
          onClick={() => {
            setLastClicked(2);
            if (!turnInterval && checkRowFull(2, 'opponent')) {
              addDice(2, 'opponent');
            }
          }}
        >
          {renderDice(2, 'opponent')}
        </div>
      </div>
      <div className="App">
        {/* Render game elements */}

        {/* Conditional rendering for game over box and reset button */}
        {gameOver && (
          <div className="gameOverContainer">
            <div className="gameOverBox">
              <h2>Game Over</h2>
              <p>{determineGameOutcome()}</p>
              <button onClick={resetGame}>Reset Game</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
