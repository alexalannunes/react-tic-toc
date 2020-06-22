import React from "react";
import Square from "./Square";
import Row from "./Row";

class Board extends React.Component {
  renderSquare(value) {
    return <Square value={this.props.squares[value]} handleClick={() => this.props.handleClickSquare(value)} />;
  }

  render() {
    return (
      <div className="game">
        <div className="board">
          <Row>
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </Row>
          <Row>
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </Row>
          <Row>
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </Row>
        </div>
      </div>
    );
  }
}

export default Board;
