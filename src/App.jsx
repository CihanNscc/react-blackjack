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

  const [roundEnd, setRoundEnd] = useState(true);

  const calculateTotal = (array) => {
    let tempNum = 0;
    let totalNum = 0;
    let aceCounter = 0;

    array.forEach((item) => {
      switch (item[0]) {
        case "Ace":
          tempNum = 11;
          aceCounter++;
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

    while (totalNum > 21 && aceCounter > 0) {
      aceCounter--;
      totalNum -= 10;
    }

    return totalNum;
  };

  const onDraw = () => {
    setPlayerCards([...playerCards, getRandomCard()]);
  };

  const onStand = () => {
    let tempHouseNum = houseTotalNum;
    let tempPlayerNum = playerTotalNum;
    let tempArray = [...houseCards];

    setRoundEnd(true);

    if (tempPlayerNum > tempHouseNum) {
      tempArray = [...tempArray, getRandomCard()];
      setHouseCards([...tempArray]);
      tempHouseNum = calculateTotal(tempArray);
      console.log("player num:", tempPlayerNum);
      console.log("house num:", tempHouseNum);
    }

    if (tempPlayerNum > tempHouseNum) {
      tempArray = [...tempArray, getRandomCard()];
      setHouseCards([...tempArray]);
      tempHouseNum = calculateTotal(tempArray);
      console.log("player num:", tempPlayerNum);
      console.log("house num:", tempHouseNum);
    }

    if (tempPlayerNum < tempHouseNum && tempHouseNum < 21) {
      console.log("House wins!");
    } else if (tempPlayerNum === tempHouseNum) {
      console.log("Draw!");
    } else if (tempPlayerNum > tempHouseNum) {
      console.log("Player wins!");
    }
  };

  const setTable = () => {
    setRoundEnd(false);
    setPlayerTotalNum(0);
    setHouseTotalNum(0);
    setPlayerCards([getRandomCard(), getRandomCard()]);
    setHouseCards([getRandomCard(), getRandomCard()]);
  };

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

  useEffect(() => {
    setPlayerTotalNum(calculateTotal(playerCards));
    setHouseTotalNum(calculateTotal(houseCards));
  }, [playerCards, houseCards]);

  useEffect(() => {
    if (playerTotalNum === 21) {
      console.log("Player blackjack!");
      setRoundEnd(true);
    } else if (playerTotalNum > 21) {
      console.log("Player busted!");
      setRoundEnd(true);
    } else if (houseTotalNum === 21) {
      console.log("House blackjack!");
      setRoundEnd(true);
    } else if (houseTotalNum > 21) {
      console.log("House busted!");
      setRoundEnd(true);
    }
  }, [playerTotalNum, houseTotalNum]);

  return (
    <div className="App">
      <div className="bg-white m-4 font-semibold text-2xl w-[80px] text-center rounded-xl">
        h: {houseTotalNum}
      </div>
      <div className="bg-white m-4 font-semibold text-2xl w-[80px] text-center rounded-xl">
        p: {playerTotalNum}
      </div>
      <div>{cardsDisplay(houseCards, houseDisplayArray)}</div>
      {!roundEnd && (
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
        </div>
      )}

      <div>POT</div>
      {roundEnd && (
        <div>
          <button
            onClick={setTable}
            className="bg-gray-400 m-4 font-semibold text-2xl w-[80px] text-center rounded-xl"
          >
            Deal
          </button>
        </div>
      )}
      <div>{cardsDisplay(playerCards, playerDisplayArray)}</div>
    </div>
  );
}

export default App;
