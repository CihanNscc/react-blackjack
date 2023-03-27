import {
  BsFillSuitDiamondFill,
  BsFillSuitClubFill,
  BsFillSuitHeartFill,
  BsFillSuitSpadeFill,
} from "react-icons/bs";

const Card = (props) => {
  let cardValue;
  switch (props.value) {
    case "Ace":
      cardValue = "A";
      break;
    case "Jack":
      cardValue = "J";
      break;
    case "Queen":
      cardValue = "Q";
      break;
    case "King":
      cardValue = "K";
      break;
    default:
      cardValue = props.value;
  }

  let cardSuit;
  let cardColor;
  switch (props.suit) {
    case "Diamond":
      cardSuit = <BsFillSuitDiamondFill size={50} />;
      cardColor = "text-red-700";
      break;
    case "Club":
      cardSuit = <BsFillSuitClubFill size={50} />;
      cardColor = "text-black";
      break;
    case "Heart":
      cardSuit = <BsFillSuitHeartFill size={50} />;
      cardColor = "text-red-700";
      break;
    case "Spade":
      cardSuit = <BsFillSuitSpadeFill size={50} />;
      cardColor = "text-black";
  }

  return (
    <div className="bg-gradient-to-r from-gray-100 to-white px-2 py-1 max-w-[110px] mr-[-30px]  rounded-[10px] drop-shadow-4xl font-LibreBaskerville text-2xl">
      <p className={`${cardColor}`}>{cardValue}</p>
      <p className={`m-4 ${cardColor}`}>{cardSuit}</p>
      <p className={` text-right ${cardColor}`}>{cardValue}</p>
    </div>
  );
};

export default Card;
