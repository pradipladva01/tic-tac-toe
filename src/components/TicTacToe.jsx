import React, { useRef, useState } from "react";
import "./style.css";
import circleIcon from "../assets/circle.png";
import crossIcon from "../assets/cross.png";

const TicTacToe = () => {
  const [data, setData] = useState(["", "", "", "", "", "", "", "", ""]);
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const [winningCombo, setWinningCombo] = useState([]);
  const titleRef = useRef(null);

  const handleClick = (index) => {
    if (lock || data[index] !== "") return;

    const newData = [...data];
    newData[index] = count % 2 === 0 ? "X" : "O";
    setData(newData);
    setCount(count + 1);

    checkWin(newData);
  };

  const checkWin = (board) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const combo of winningCombinations) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinningCombo(combo);
        wonGame(board[a]);
        return;
      }
    }
  };

  const wonGame = (winner) => {
    setLock(true);
    titleRef.current.innerHTML = `Congratulations: <img src="${
      winner === "X" ? crossIcon : circleIcon
    }" alt="${winner === "X" ? "cross" : "circle"}" /> Wins`;
  };

  const reset = () => {
    setData(["", "", "", "", "", "", "", "", ""]);
    setCount(0);
    setLock(false);
    setWinningCombo([]);
    titleRef.current.innerHTML = "Tic Tac Toe game in <span>React</span>";
  };

  return (
    <>
      <div className="tic_tac_toe">
        <h1 className="title" ref={titleRef}>
          Tic Tac Toe game in <span>React</span>
        </h1>
        <div className="board">
          {data.map((value, index) => (
            <div
              key={index}
              className={`boxes ${
                winningCombo.includes(index) ? "winning-box" : ""
              }`}
              onClick={() => handleClick(index)}
            >
              {value && (
                <img
                  src={value === "X" ? crossIcon : circleIcon}
                  alt={value === "X" ? "cross" : "circle"}
                />
              )}
            </div>
          ))} 
        </div>
        <button className="reset" onClick={reset}>
          Reset
        </button>
      </div>
    </>
  );
};

export default TicTacToe;
