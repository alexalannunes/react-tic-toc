import React, { useState } from "react";
import "./App.css";
import Row from "./components/Row";
import Square from "./components/Square";
import calculateWinner from "./utils/CalculateWinner";

function TicToc() {
  const [xIsNext, setXIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);
  const [playHistory, setHistory] = useState([
    {
      squares: Array(9).fill(null),
    },
  ]);

  const _history = playHistory.slice(0, stepNumber + 1);
  const current = _history[_history.length - 1];
  const squares = current.squares.slice();

  const handleClickSquare = (value) => {
    if (calculateWinner(squares) || squares[value]) {
      return;
    }
    squares[value] = xIsNext ? "X" : "O";
    setHistory((prev) => [...prev, { squares: squares }]);

    setXIsNext((prev) => !prev);
    setStepNumber(_history.length);
  };

  const handleJumpTo = (step) => {
    setXIsNext(step % 2 === 0);
    setStepNumber(step);
  };

  const moves = playHistory.map((step, move) => {
    const desc = move ? "Go to move #" + move : "Go to game start";

    return (
      <li key={move}>
        <button onClick={() => handleJumpTo(move)}>{desc}</button>
      </li>
    );
  });

  const winner = calculateWinner(squares);

  let status;

  if (winner) {
    status = "Winner " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <div className="game">
      <div className="board">
        <Row>
          <Square value={squares[0]} handleClick={() => handleClickSquare(0)} />
          <Square value={squares[1]} handleClick={() => handleClickSquare(1)} />
          <Square value={squares[2]} handleClick={() => handleClickSquare(2)} />
        </Row>
        <Row>
          <Square value={squares[3]} handleClick={() => handleClickSquare(3)} />
          <Square value={squares[4]} handleClick={() => handleClickSquare(4)} />
          <Square value={squares[5]} handleClick={() => handleClickSquare(5)} />
        </Row>
        <Row>
          <Square value={squares[6]} handleClick={() => handleClickSquare(6)} />
          <Square value={squares[7]} handleClick={() => handleClickSquare(7)} />
          <Square value={squares[8]} handleClick={() => handleClickSquare(8)} />
        </Row>
      </div>
      {status}
      <ol>{moves}</ol>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <main className="main">
        <h1>Tic Toc</h1>
        <TicToc />
      </main>
    </div>
  );
}

export default App;
