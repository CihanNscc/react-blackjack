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

  let houseDraw = true;

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

  const onDraw = () => {
    setPlayerCards([...playerCards, getRandomCard()]);
  };

  const houseDrawAction = () => {
    setHouseCards([...houseCards, getRandomCard()]);
  };

  const onStand = () => {
    if (houseDraw) {
      houseDrawAction();
      onStand();
    } else {
      checkTheWinner();
    }
  };

  const setTable = () => {
    setPlayerTotalNum(0);
    setHouseTotalNum(0);
    setPlayerCards([getRandomCard(), getRandomCard()]);
    setHouseCards([getRandomCard(), getRandomCard()]);
  };

  const checkTheWinner = () => {
    if (playerTotalNum > houseTotalNum) {
      console.log("Player wins!");
      setTimeout(() => {
        setTable();
      }, 2000);
    } else if (playerTotalNum < houseTotalNum) {
      console.log("House wins!");
      setTimeout(() => {
        setTable();
      }, 2000);
    } else if (playerTotalNum === houseTotalNum) {
      console.log("House wins!");
      setTimeout(() => {
        setTable();
      }, 2000);
    }
  };

  useEffect(() => {
    setHouseTotalNum(calculateTotal(houseCards));
    setPlayerTotalNum(calculateTotal(playerCards));
  }, [houseCards, playerCards]);

  useEffect(() => {
    if (playerTotalNum <= 21 && playerTotalNum > houseTotalNum) {
      houseDraw = true;
    } else {
      houseDraw = false;
    }

    if (houseTotalNum > 21 && playerTotalNum <= 21) {
      console.log("House bust!");
      houseDraw = false;
      setTimeout(() => {
        setTable();
      }, 2000);
    }

    if (playerTotalNum > 21) {
      console.log("Player bust!");
      setTimeout(() => {
        setTable();
      }, 2000);
    }

    if (houseTotalNum === 21) {
      console.log("House blackjack!");
      houseDraw = false;
      setTimeout(() => {
        setTable();
      }, 2000);
    }

    if (playerTotalNum === 21) {
      console.log("Player blackjack!");
      setTimeout(() => {
        setTable();
      }, 2000);
    }
  }, [houseTotalNum, playerTotalNum]);

  const cardsDisplay = (sourceArray, displayArray) => {
    for (let i = 0; i < sourceArray.length; i++) {
      displayArray.push(
        <Card key={i} value={sourceArray[i][0]} suit={sourceArray[i][1]} />
      );
    }

    return (
      <span className="flex justify-left min-h-[180px] max-w-[500px] overflow-auto pl-4 pb-6 pr-[60px] m-4">
        {displayArray}
      </span>
    );
  };

  return (
    <div className="App">
      <div className="bg-white m-4 font-semibold text-2xl w-[80px] text-center rounded-xl">
        h: {houseTotalNum}
      </div>
      <div className="bg-white m-4 font-semibold text-2xl w-[80px] text-center rounded-xl">
        p: {playerTotalNum}
      </div>
      <div>{cardsDisplay(houseCards, houseDisplayArray)}</div>
      <div className="max-w-[800px] mx-auto flex flex-wrap justify-between">
        <button
          onClick={onDraw}
          className="bg-gray-400 m-4 font-semibold text-2xl w-[80px] text-center rounded-xl"
        >
          Hit
        </button>
        <button
          onClick={onStand}
          className="bg-gray-400 m-4 font-semibold text-2xl w-[80px] text-center rounded-xl"
        >
          Stand
        </button>
        <button className="bg-gray-400 m-4 font-semibold text-2xl w-[80px] text-center rounded-xl">
          x2
        </button>
        <div>POT</div>
        <button
          onClick={setTable}
          className="bg-gray-400 m-4 font-semibold text-2xl w-[80px] text-center rounded-xl"
        >
          Clean
        </button>
      </div>
      <div>{cardsDisplay(playerCards, playerDisplayArray)}</div>
    </div>
  );
}

export default App;
