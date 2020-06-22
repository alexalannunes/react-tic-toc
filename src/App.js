import React from "react";
import "./App.css";
import Board from "./components/Board";
import calculateWinner from "./utils/CalculateWinner";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 1,
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      xIsNext: true,
      stepNumber: 0,
    };
  }

  handleClickSquare = (i) => {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
    });
  };

  handleJumpTo = (step) => {
    console.log(this.state.history[step]);
    this.setState({
      stepNumber: step,
      isNext: step % 2 === 0,
    });
  };

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const moves = history.map((step, move) => {
      const desc = move ? "Go to move #" + move : "Go to game start";

      return (
        <li key={move}>
          <button onClick={() => this.handleJumpTo(move)}>{desc}</button>
        </li>
      );
    });
    let status;

    if (winner) {
      status = "Winner " + winner;
    } else {
      status = "Next player: " + (this.state.isNext ? "X" : "O");
    }
    return (
      <div className="App">
        <Board squares={current.squares} handleClickSquare={this.handleClickSquare} />
        {status}
        <ol>{moves}</ol>
      </div>
    );
  }
}

export default App;
