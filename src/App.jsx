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
    setRevealCard(true);
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
    setRevealCard(true);
    setWinLoseMessage(message);
    setPot(0);
    if (playerMoney < minBet) {
      setgameMessage("You hit zero. Game is over.");
      setGameIsOn(false);
    }
  };

  const roundDraw = (message) => {
    let tempPot = pot;
    let tempPlayerMoney = playerMoney;
    setRoundEnd(true);
    setRevealCard(true);
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
      <span className="flex justify-left min-h-[160px] max-w-[500px] overflow-auto pl-4 pb-2 pr-[60px] my-6 mx-auto">
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
      <div>{cardsDisplay(houseCards, houseDisplayArray, "House")}</div>

      <div className="flex flex-col sm:flex-row sm:w-full justify-between max-w-[600px] w-auto mx-auto my-4">
        <div className="flex flex-col w-[180px] min-h-[100px]">
          {!roundEnd && playerMoney >= pot && (
            <button
              onClick={onDouble}
              className="bg-gradient-to-tr hover:bg-gradient-to-bl from-[#3D2209] to-[#4F2D0D] w-[80px] my-2 mx-auto py-2 text-2xl text-center text-[#dbd1c8] font-semibold rounded-md border-2 border-[#3D2209] drop-shadow-4xl active:drop-shadow-md"
            >
              x2
            </button>
          )}
          {roundEnd && gameIsOn && pot >= minBet && (
            <button
              onClick={setTable}
              className="bg-gradient-to-tr hover:bg-gradient-to-bl from-[#3D2209] to-[#4F2D0D]  mx-auto my-2 px-6 py-2 text-2xl text-center text-[#dbd1c8] rounded-md border-2 border-[#3D2209] drop-shadow-4xl active:drop-shadow-md"
            >
              Deal
            </button>
          )}
          {roundEnd && gameIsOn && pot < minBet && (
            <>
              {houseTotalNum != 0 && (
                <div className="text-white text-2xl text-center [text-shadow:_2px_2px_2px_rgb(0_0_0_/_60%)]">
                  House has {houseTotalNum}
                </div>
              )}
              <div className="text-white text-2xl text-center font-semibold [text-shadow:_2px_2px_2px_rgb(0_0_0_/_60%)]">
                {winLoseMessage}
              </div>
            </>
          )}
          {!gameIsOn && (
            <div className="p-4 text-white text-2xl text-center [text-shadow:_2px_2px_2px_rgb(0_0_0_/_60%)]">
              <p className="text-2xl font-semibold">{gameMessage}</p>
            </div>
          )}
        </div>

        <div className="flex flex-col w-[180px] h-[100px]">
          {gameIsOn && (
            <>
              <div className="w-[180px] mt-4 bg-gradient-to-tr from-gray-900 to-gray-700 text-white text-2xl text-center font-RobotoSlab border-2 border-gray-800 rounded-md">
                <span className="text-gray-400">$ </span>
                {pot}
              </div>
              <div className=" opacity-50 font-semibold text-center mb-4">
                Minimum Bet $10
              </div>
            </>
          )}
          {!gameIsOn && (
            <button
              onClick={restartGame}
              className="bg-gradient-to-tr hover:bg-gradient-to-bl from-[#3D2209] to-[#4F2D0D] m-2 text-2xl text-center text-[#dbd1c8] rounded-md border-2 border-[#3D2209] drop-shadow-4xl active:drop-shadow-md h-[50px] w-[75px] mx-auto"
            >
              START
            </button>
          )}
        </div>

        <div>
          <div className="flex flex-row h-[180px] w-[180px]">
            {!gameIsOn && (
              <div className="p-4 text-white text-2xl text-center [text-shadow:_2px_2px_2px_rgb(0_0_0_/_60%)]">
                <p className="text-2xl">
                  Your target is to hit ${targetMoney}. Good Luck!
                </p>
              </div>
            )}
            {!roundEnd && (
              <>
                <button
                  onClick={onDraw}
                  className="bg-gradient-to-tr hover:bg-gradient-to-bl from-[#3D2209] to-[#4F2D0D] m-2 text-2xl text-center text-[#dbd1c8] rounded-md border-2 border-[#3D2209] drop-shadow-4xl active:drop-shadow-md h-[50px] w-[75px]"
                >
                  Hit
                </button>
                <button
                  onClick={onStand}
                  className="bg-gradient-to-tr hover:bg-gradient-to-bl from-[#3D2209] to-[#4F2D0D] m-2 text-2xl text-center text-[#dbd1c8] rounded-md border-2 border-[#3D2209] drop-shadow-4xl active:drop-shadow-md h-[50px] w-[75px]"
                >
                  Stand
                </button>
              </>
            )}
            {roundEnd && gameIsOn && (
              <>
                <div className="flex flex-col">
                  {playerMoney >= smBet && (
                    <div
                      onClick={() => makeBet(smBet)}
                      className="w-[80px] h-[80px] m-1 rounded-full bg-[url('/src/assets/chip.png')] bg-blue-900 drop-shadow-4xl text-3xl text-white font-RobotoSlab pt-5 pl-[26px] hover:cursor-pointer"
                    >
                      {smBet}
                    </div>
                  )}
                  {playerMoney >= mdBet && (
                    <div
                      onClick={() => makeBet(mdBet)}
                      className="w-[80px] h-[80px] m-1 rounded-full bg-[url('/src/assets/chip.png')] bg-purple-900 drop-shadow-4xl text-3xl text-white font-RobotoSlab pt-[21px] pl-6 hover:cursor-pointer"
                    >
                      {mdBet}
                    </div>
                  )}
                </div>
                <div className="flex flex-col">
                  {playerMoney >= lgBet && (
                    <div
                      onClick={() => makeBet(lgBet)}
                      className="w-[80px] h-[80px] m-1 rounded-full bg-[url('/src/assets/chip.png')] bg-red-800 drop-shadow-4xl text-3xl text-white font-RobotoSlab pt-[22px] pl-[25px] hover:cursor-pointer"
                    >
                      {lgBet}
                    </div>
                  )}
                  {playerMoney >= smBet && (
                    <div
                      onClick={() => makeBet(playerMoney)}
                      className="w-[80px] h-[80px] m-1 rounded-full bg-[url('/src/assets/chip.png')] bg-gray-800 drop-shadow-4xl text-md text-white font-RobotoSlab pt-[27px] pl-5 hover:cursor-pointer"
                    >
                      All In
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between max-w-[600px] mx-auto w-full px-4">
        <div className="flex flex-row justify-between">
          <div className="min-w-[140px] py-1 bg-gradient-to-tr from-gray-900 to-gray-700 text-white text-2xl text-center font-RobotoSlab border-2 border-gray-800 rounded-md">
            <span className="text-gray-400">$ </span>
            {playerMoney}
          </div>
          <div className="w-[50px] h-[50px] pt-[6px] bg-gradient-to-tr from-gray-900 to-gray-700 text-white text-2xl text-center border-2 border-gray-800 rounded-full">
            {playerTotalNum}
          </div>
        </div>
        <div>{cardsDisplay(playerCards, playerDisplayArray, "Player")}</div>
      </div>
    </div>
  );
}

export default App;
