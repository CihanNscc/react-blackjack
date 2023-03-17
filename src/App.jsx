import React, { useState, useEffect } from "react";
import "./App.css";
import Card from "./components/Card";

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

  const playerDisplayArray = [];

  const houseDisplayArray = [];

  const getRandomCard = function () {
    let randomValue = cardValues[Math.floor(Math.random() * 13)];
    let randomSuit = cardSuits[Math.floor(Math.random() * 4)];
    let newCard = [randomValue, randomSuit];
    return newCard;
  };

  const [playerCards, setPlayerCards] = useState([]);

  const [houseCards, setHouseCards] = useState([]);

  const [playerTotalNum, setPlayerTotalNum] = useState(0);

  const [houseTotalNum, setHouseTotalNum] = useState(0);

  const calculateTotal = (array) => {
    let tempNum = 0;
    let totalNum = 0;

    array.forEach((item) => {
      switch (item[0]) {
        case "Ace":
          tempNum = 11;
          break;
        case "Jack":
        case "Queen":
        case "King":
          tempNum = 10;
          break;
        default:
          tempNum = item[0];
      }
      totalNum += tempNum;
    });

    if (totalNum > 21) {
      tempNum = 0;
      totalNum = 0;
      array.forEach((item) => {
        switch (item[0]) {
          case "Ace":
            tempNum = 1;
            break;
          case "Jack":
          case "Queen":
          case "King":
            tempNum = 10;
            break;
          default:
            tempNum = item[0];
        }
        totalNum += tempNum;
      });
    }
    return totalNum;
  };

  const onClickPlayerDraw = () => {
    setPlayerCards([...playerCards, getRandomCard()]);
    if (playerTotalNum <= 21) {
      setHouseCards([...houseCards, getRandomCard()]);
    }
  };

  const cleanTable = () => {
    setPlayerCards([]);
    setHouseCards([]);
    setPlayerTotalNum(0);
    setHouseTotalNum(0);
  };

  useEffect(() => {
    setHouseTotalNum(calculateTotal(houseCards));
    setPlayerTotalNum(calculateTotal(playerCards));
  }, [houseCards, playerCards]);

  useEffect(() => {
    if (houseTotalNum > 21 && playerTotalNum <= 21) {
      console.log("House lost!");
    }

    if (playerTotalNum > 21) {
      console.log("Player lost!");
    }
  }, [houseTotalNum, playerTotalNum]);

  const cardsDisplay = (sourceArray, displayArray) => {
    for (let i = 0; i < sourceArray.length; i++) {
      displayArray.push(
        <Card key={i} value={sourceArray[i][0]} suit={sourceArray[i][1]} />
      );
    }

    return <span className="mx-auto max-w-[600px] flex">{displayArray}</span>;
  };

  return (
    <div className="App">
      <div>
        <button
          onClick={onClickPlayerDraw}
          className="bg-gray-400 m-4 font-semibold text-2xl w-[80px] text-center rounded-xl"
        >
          Draw
        </button>
        <button
          onClick={cleanTable}
          className="bg-gray-400 m-4 font-semibold text-2xl w-[80px] text-center rounded-xl"
        >
          Clean
        </button>
      </div>
      <div className="bg-white m-4 font-semibold text-2xl w-[80px] text-center rounded-xl">
        h: {houseTotalNum}
      </div>
      <div className="bg-white m-4 font-semibold text-2xl w-[80px] text-center rounded-xl">
        p: {playerTotalNum}
      </div>
      <div>{cardsDisplay(houseCards, houseDisplayArray)}</div>
      <div>{cardsDisplay(playerCards, playerDisplayArray)}</div>
    </div>
  );
}

export default App;
