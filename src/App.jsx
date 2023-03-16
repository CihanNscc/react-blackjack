import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const cardValues = [
    "Ace",
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    "Jack",
    "Queen",
    "King",
  ];

  const cardSuits = ["Diamond", "Club", "Heart", "Spade"];

  const getRandomCard = function () {
    let randomValue = cardValues[Math.floor(Math.random() * 13)];
    let randomSuit = cardSuits[Math.floor(Math.random() * 4)];
    let newCard = [randomValue, randomSuit];
    return newCard;
  };

  const [playerCards, setPlayerCards] = useState([]);

  const [playerTotalNum, setPlayerTotalNum] = useState(0);

  const calculateTotal = () => {
    let tempNum = 0;
    let totalNum = 0;

    playerCards.forEach((item) => {
      switch (item[0]) {
        case "Ace":
          tempNum = 11;
          break;
        case "Jack":
          tempNum = 11;
          break;
        case "Queen":
          tempNum = 12;
          break;
        case "King":
          tempNum = 13;
          break;
        default:
          tempNum = item[0];
      }
      totalNum += tempNum;
    });

    if (totalNum > 21) {
      tempNum = 0;
      totalNum = 0;
      playerCards.forEach((item) => {
        switch (item[0]) {
          case "Ace":
            tempNum = 1;
            break;
          case "Jack":
            tempNum = 11;
            break;
          case "Queen":
            tempNum = 12;
            break;
          case "King":
            tempNum = 13;
            break;
          default:
            tempNum = item[0];
        }
        totalNum += tempNum;
      });
    }

    if (totalNum > 21) {
      setPlayerCards([]);
      totalNum = 0;
    }

    return totalNum;
  };

  const onClickPlayerDraw = () => {
    setPlayerCards([...playerCards, getRandomCard()]);
  };

  useEffect(() => {
    setPlayerTotalNum(calculateTotal());
    console.log(playerCards);
  }, [playerCards]);

  return (
    <div className="App">
      <div>
        <button onClick={onClickPlayerDraw}>Draw Card</button>
        {playerCards}
      </div>
      <span>{playerTotalNum}</span>
    </div>
  );
}

export default App;
