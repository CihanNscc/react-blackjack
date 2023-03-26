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

  const minBet = 10;
  const smBet = 10;
  const mdBet = 20;
  const lgBet = 50;
  const starterMoney = 200;
  const targetMoney = 2000;

  const [gameIsOn, setGameIsOn] = useState(false);

  const [gameMessage, setgameMessage] = useState("");

  const [winLoseMessage, setWinLoseMessage] = useState("");

  const [playerMoney, setPlayerMoney] = useState(starterMoney);

  const [pot, setPot] = useState(0);

  const [playerCards, setPlayerCards] = useState([]);

  const [houseCards, setHouseCards] = useState([]);

  const [playerTotalNum, setPlayerTotalNum] = useState(0);

  const [houseTotalNum, setHouseTotalNum] = useState(0);

  const [roundEnd, setRoundEnd] = useState(true);

  const [revealCard, setRevealCard] = useState(false);

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

  const makeBet = (amount) => {
    let tempPot = pot;
    let tempPlayerMoney = playerMoney;
    setPot(tempPot + amount);
    setPlayerMoney(tempPlayerMoney - amount);
  };

  const roundWin = (message) => {
    let tempPot = pot;
    let tempPlayerMoney = playerMoney;
    setRoundEnd(true);
    setWinLoseMessage(message);
    setPlayerMoney((tempPlayerMoney += tempPot * 2));
    setPot(0);
    if (playerMoney > targetMoney) {
      setgameMessage("Congratulations! You won.");
      setGameIsOn(false);
    }
  };

  const roundLose = (message) => {
    setRoundEnd(true);
    setWinLoseMessage(message);
    setPot(0);
    if (playerMoney < minBet) {
      setgameMessage("Sorry! You lost.");
      setGameIsOn(false);
    }
  };

  const roundDraw = (message) => {
    let tempPot = pot;
    let tempPlayerMoney = playerMoney;
    setRoundEnd(true);
    setWinLoseMessage(message);
    setPlayerMoney((tempPlayerMoney += tempPot));
    setPot(0);
  };

  const onDraw = () => {
    let tempPlayerNum = playerTotalNum;
    let tempPlayerArray = [...playerCards];
    tempPlayerArray = [...tempPlayerArray, getRandomCard()];
    setPlayerCards([...tempPlayerArray]);
    tempPlayerNum = calculateTotal(tempPlayerArray);
    setPlayerTotalNum(tempPlayerNum);

    if (tempPlayerNum === 21) {
      roundWin("Player blackjack!");
    } else if (tempPlayerNum > 21) {
      roundLose("Player busted!");
    }
  };

  const onStand = () => {
    let tempHouseNum = houseTotalNum;
    let tempPlayerNum = playerTotalNum;
    setPlayerTotalNum(tempPlayerNum);
    let tempHouseArray = [...houseCards];
    tempHouseNum = calculateTotal(tempHouseArray);

    setRoundEnd(true);
    setRevealCard(true);

    if (tempPlayerNum > 21) {
      roundLose("Player busted!");
    } else if (tempHouseNum === 21) {
      roundLose("House blackjack!");
    } else {
      while (tempHouseNum < 17) {
        tempHouseArray = [...tempHouseArray, getRandomCard()];
        setHouseCards([...tempHouseArray]);
        tempHouseNum = calculateTotal(tempHouseArray);
      }

      if (tempHouseNum > 21) {
        roundWin("House busted!");
      } else if (tempPlayerNum < tempHouseNum) {
        roundLose("House wins!");
      } else if (tempPlayerNum === tempHouseNum) {
        roundDraw("Push!");
      } else if (tempPlayerNum > tempHouseNum) {
        roundWin("Player wins!");
      }
    }
  };

  const onDouble = () => {
    let tempPot = pot;
    let tempPlayerMoney = playerMoney;
    let tempPlayerArray = [...playerCards];
    let tempHouseArray = [...houseCards];
    let tempHouseNum = houseTotalNum;
    let tempPlayerNum = playerTotalNum;

    tempPlayerArray = [...tempPlayerArray, getRandomCard()];
    setPlayerCards([...tempPlayerArray]);
    tempPlayerNum = calculateTotal(tempPlayerArray);

    tempPlayerMoney -= tempPot;
    tempPot += tempPot;
    setPot(tempPot);
    setPlayerMoney(tempPlayerMoney);

    setPlayerTotalNum(tempPlayerNum);
    tempHouseNum = calculateTotal(tempHouseArray);

    //If the dealer has a hand total of 17 or higher,
    //they will automatically stand.
    //If the dealer has a hand total of 16 or lower,
    //they will take additional hit-cards.
    setRoundEnd(true);
    setRevealCard(true);

    if (tempPlayerNum > 21) {
      roundLose("Player busted!");
    } else {
      while (tempHouseNum < 17) {
        tempHouseArray = [...tempHouseArray, getRandomCard()];
        setHouseCards([...tempHouseArray]);
        tempHouseNum = calculateTotal(tempHouseArray);
      }

      if (tempHouseNum > 21) {
        roundWin("House busted!");
      } else if (tempPlayerNum < tempHouseNum) {
        roundLose("House wins!");
      } else if (tempPlayerNum === tempHouseNum) {
        roundDraw("Push!");
      } else if (tempPlayerNum > tempHouseNum) {
        roundWin("Player wins!");
      }
    }
  };

  const setTable = () => {
    setPlayerCards([]);
    setHouseCards([]);
    let tempPlayerArray = [];
    let tempHouseArray = [];
    let tempHouseNum = houseTotalNum;
    let tempPlayerNum = playerTotalNum;
    setRoundEnd(false);
    setRevealCard(false);
    setPlayerTotalNum(0);
    setHouseTotalNum(0);
    tempHouseArray = [getRandomCard(), getRandomCard()];
    setHouseCards([...tempHouseArray]);
    tempHouseNum = calculateTotal(tempHouseArray);
    tempPlayerArray = [getRandomCard(), getRandomCard()];
    setPlayerCards([...tempPlayerArray]);
    tempPlayerNum = calculateTotal(tempPlayerArray);

    if (tempPlayerNum === 21 && tempHouseNum != 21) {
      roundWin("Player blackjack!");
    } else if (tempPlayerNum === 21 && tempHouseNum === 21) {
      roundDraw("Push!");
    }
  };

  const restartGame = () => {
    setPlayerTotalNum(0);
    setHouseTotalNum(0);
    setPlayerCards([]);
    setHouseCards([]);
    setPot(0);
    setPlayerMoney(starterMoney);
    setWinLoseMessage("");
    setRoundEnd(true);
    setRevealCard(false);
    setGameIsOn(true);
  };

  const cardsDisplay = (sourceArray, displayArray, holderName) => {
    for (let i = 0; i < sourceArray.length; i++) {
      if (i === 0 && holderName === "House") {
        displayArray.push(
          <Card
            className={"cardBack"}
            key={i}
            value={sourceArray[i][0]}
            suit={sourceArray[i][1]}
          />,
          <>
            {!revealCard && (
              <div className="  bg-white border-2 border-inherit border-white bg-[url('/src/assets/card-back.png')] bg-cover w-[100px] ml-[-68px] mr-[-30px] rounded-[10px] z-0"></div>
            )}
          </>
        );
      } else {
        displayArray.push(
          <Card key={i} value={sourceArray[i][0]} suit={sourceArray[i][1]} />
        );
      }
    }

    return (
      <span className="flex justify-left min-h-[180px] max-w-[500px] overflow-auto pl-4 pb-6 pr-[60px] mb-4 mx-auto">
        {displayArray}
      </span>
    );
  };

  useEffect(() => {
    setPlayerTotalNum(calculateTotal(playerCards));
    setHouseTotalNum(calculateTotal(houseCards));
  }, [playerCards, houseCards]);

  return (
    <div className="relative h-full min-h-screen flex flex-col justify-between">
      <div className="pt-8">
        {cardsDisplay(houseCards, houseDisplayArray, "House")}
      </div>

      <div className="flex flex-col sm:flex-row sm:w-full justify-between max-w-[600px] w-auto mx-auto">
        <div>
          {!roundEnd && (
            <div className="flex flex-col">
              <button
                onClick={onDraw}
                className="bg-gray-400 m-2 font-semibold text-2xl w-[80px] text-center rounded-xl"
              >
                Hit
              </button>
              <button
                onClick={onStand}
                className="bg-gray-400 m-2 font-semibold text-2xl w-[80px] text-center rounded-xl"
              >
                Stand
              </button>
            </div>
          )}

          {roundEnd && gameIsOn && pot >= minBet && (
            <div className="flex flex-col">
              <button
                onClick={setTable}
                className="bg-gray-400 m-2 font-semibold text-2xl w-[80px] text-center rounded-xl"
              >
                Deal
              </button>
            </div>
          )}
          {roundEnd && gameIsOn && pot < minBet && (
            <div className=" text-2xl font-semibold">{winLoseMessage}</div>
          )}
          {!gameIsOn && (
            <div>
              <p>{gameMessage}</p>
              <p>Your target is to hit {targetMoney}$. Good Luck!</p>
              <button
                onClick={restartGame}
                className="bg-white my-4 mx-auto font-semibold text-2xl w-[120px] text-center rounded-xl"
              >
                START
              </button>
            </div>
          )}
        </div>
        {gameIsOn && (
          <div className="flex flex-col justify-center text-2xl text-center font-semibold">
            {pot}
          </div>
        )}

        <div>
          {roundEnd && gameIsOn && (
            <div className="flex flex-row">
              <div className="flex flex-col">
                {playerMoney >= smBet && (
                  <div
                    onClick={() => makeBet(smBet)}
                    className="w-[80px] h-[80px] rounded-full bg-[url('/src/assets/chip.png')] bg-red-800 drop-shadow-4xl text-3xl text-white font-RobotoSlab pt-5 pl-6"
                  >
                    {smBet}
                  </div>
                )}
                {playerMoney >= mdBet && (
                  <div
                    onClick={() => makeBet(mdBet)}
                    className="bg-red-900 w-[84px] h-[84px] m-2 rounded-full drop-shadow-3xl"
                  >
                    <div className="bg-[url('/src/assets/chiptexture.png')] w-[80px] h-[80px] mb-1 border-dashed border-white border-8 rounded-full">
                      <div className="w-[56px] h-[56px] rounded-full m-1 border-dashed border-white border-2 font-bold text-2xl text-center text-white pt-[6px]">
                        {mdBet}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex flex-col">
                {playerMoney >= lgBet && (
                  <div
                    onClick={() => makeBet(lgBet)}
                    className="bg-red-900 w-[84px] h-[84px] m-2 rounded-full drop-shadow-3xl"
                  >
                    <div className="bg-red-700 w-[80px] h-[80px] mb-1 border-dashed border-white border-8 rounded-full">
                      <div className="w-[56px] h-[56px] rounded-full m-1 border-dashed border-white border-2 font-bold text-2xl text-center text-white pt-[6px]">
                        {lgBet}
                      </div>
                    </div>
                  </div>
                )}
                {playerMoney >= smBet && (
                  <div
                    onClick={() => makeBet(playerMoney)}
                    className="bg-red-900 w-[84px] h-[84px] m-2 rounded-full drop-shadow-3xl"
                  >
                    <div className="bg-red-700 w-[80px] h-[80px] mb-1 border-dashed border-white border-8 rounded-full">
                      <div className="w-[56px] h-[56px] rounded-full m-1 border-dashed border-white border-2 font-bold text-lg text-center text-white pt-[10px]">
                        All In
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          {!roundEnd && playerMoney >= pot && (
            <button
              onClick={onDouble}
              className="bg-gray-400 m-4 font-semibold text-2xl w-[80px] text-center rounded-xl"
            >
              x2
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-row justify-between max-w-[600px] mx-auto w-full px-4">
        <div className="bg-white font-semibold text-2xl w-[180px] h-[60px] text-center pt-3 rounded-xl">
          $: {playerMoney}
        </div>
        <div className="bg-white font-semibold text-2xl w-[60px] h-[60px] text-center pt-3 rounded-full">
          {playerTotalNum}
        </div>
      </div>
      <div>{cardsDisplay(playerCards, playerDisplayArray, "Player")}</div>
    </div>
  );
}

export default App;
