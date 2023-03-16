const NumberHolder = (props) => {
  const [playerNumber, setPlayerNumber] = useState(0);

  const handlePlayerNumber = (tempNumber) => {
    setPlayerNumber = playerNumber + tempNumber;
  };

  return <div>{playerNumber}</div>;
};

export default NumberHolder;
