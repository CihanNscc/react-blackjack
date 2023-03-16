const Card = (props) => {
  return (
    <div className="bg-white">
      {props.suit}
      {props.number}
    </div>
  );
};

export default Card;
