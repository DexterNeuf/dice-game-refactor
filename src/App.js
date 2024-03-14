import "./styles.css";
import calculateScore from "./RowCalc";
import React, { useEffect, useState } from "react";
import { render } from "react-dom";

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

  const [playerScore, setPlayerScore] = useState([0,0,0]);
  const [opponentScore, setOpponentScore] = useState([0,0,0]);

  useEffect (() =>{
    checkArrFull('player')
  },[playerArray])

  useEffect (() =>{
    checkArrFull('opponent')
  },[opponentArray])

 const checkArrFull = (subject) =>{
  let subjectArray = [];
    if (subject === "player") {
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
  console.log('done');
 }

  const renderDice = (index, subject) => {
    let rowItems;
    if (subject === "player") {
      rowItems = playerArray[index];
    } else {
      rowItems = opponentArray[index];
    }
    return rowItems.map((item, i) => (
      <div className="dice" key={i}>
        {item}
      </div>
    ));
  };

  const addDice = (rowNum, subject) => {
    let subjectArray = [];
    if (subject === "player") {
      subjectArray = playerArray;
    } else {
      subjectArray = opponentArray;
    }
    const newNumber = Math.floor(Math.random() * 6) + 1;
    let reversedArray = [...subjectArray[rowNum]].reverse();
    const emptySpace = reversedArray.indexOf(0);
    reversedArray[emptySpace] = newNumber;
    reversedArray = reversedArray.reverse();
    if (subject === "player") {
      setPlayerArray((prevPlayerArray) => {
        const updatedArray = [
          ...prevPlayerArray.slice(0, rowNum),
          reversedArray,
          ...prevPlayerArray.slice(rowNum + 1),
        ];
        const calculatedScore = calculateScore(updatedArray[rowNum],rowNum)
        setPlayerScore((prevPlayerScore) => {
          const newPlayerScore = [
            ...prevPlayerScore.slice(0,rowNum),
            calculatedScore,
            ...prevPlayerScore.slice(rowNum + 1),
          ];
          return newPlayerScore
        })
        return updatedArray;
      });
    } else {
      setOpponentArray((prevOpponentArray) => {
        const updatedArray = [
          ...prevOpponentArray.slice(0, rowNum),
          reversedArray,
          ...prevOpponentArray.slice(rowNum + 1),
        ];
        const calculatedScore = calculateScore(updatedArray[rowNum],rowNum)
        setOpponentScore((prevOpponentScore) => {
          const newOpponentScore = [
            ...prevOpponentScore.slice(0,rowNum),
            calculatedScore,
            ...prevOpponentScore.slice(rowNum + 1),
          ];
          return newOpponentScore
        })
        checkArrFull('opponent')
        return updatedArray;
      });
    }
  };

  return (
    <div className="App">
      <h1>Array Items:</h1>
      <h2>{playerScore[0]}, {playerScore[1]}, {playerScore[2]}</h2>
      <div className="diceGrid">
        <div className="diceRow" onClick={() => addDice(0, "player")}>
          {renderDice(0, "player")}
      
        </div>
        <div className="diceRow" onClick={() => addDice(1, "player")}>
          {renderDice(1, "player")}
          
        </div>
        <div className="diceRow" onClick={() => addDice(2, "player")}>
          {renderDice(2, "player")}
        </div>
      </div>
      <h2>{opponentScore[0]}, {opponentScore[1]}, {opponentScore[2]}</h2>
      <div className="diceGrid">
        <div className="diceRow" onClick={() => addDice(0, "opponent")}>
          {renderDice(0, "opponent")}
        </div>
        <div className="diceRow" onClick={() => addDice(1, "opponent")}>
          {renderDice(1, "opponent")}
        </div>
        <div className="diceRow" onClick={() => addDice(2, "opponent")}>
          {renderDice(2, "opponent")}
        </div>
      </div>
    </div>
  );
}

render(<App />, document.getElementById("root"));
