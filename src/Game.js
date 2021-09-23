import Board from './Board';
import React from 'react';


class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
            descending: true
        }
    }

    handleClick(i) {
        const coordinates = [
          [1, 1],
          [2, 1],
          [3, 1],
          [1, 2],
          [2, 2],
          [3, 2],
          [1, 3],
          [2, 3],
          [3, 3]
        ];
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
                coordinate: coordinates[i]
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    // here I am defining a handler called sortHistory
    sortHistory() {
      this.setState({
        descending: !this.state.descending
      });
    }

    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
        const desc = move ?
            'Go to move #' + move + " at column: " + history[move].coordinate[0] + ", row: " + history[move].coordinate[1] :
            'Go to game start';
        return (
            <li key={move}>
                <button onClick={() => this.jumpTo(move)}>
                    {move === this.state.stepNumber ? <b>{desc}</b> : desc}
                </button>
            </li>
        );
    });

      let status;
      if (winner) {
          status = 'Winner: ' + winner;
      } else {
          status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }

      return (
        <div className="game">
          <div className="game-board">
            <Board
                winningSquares = {winner ? winner.line : []} 
                squares = {current.squares}
                onClick = {(i) => {
                    this.handleClick(i);
                }}            
            />
          </div>
          <div className="game-info">
            <div>{ status }</div>
            {/* below is where moves is being actually rendered */}
            <ol>{ this.state.descending ? moves : moves.reverse() }</ol>
            <button onClick={() => this.sortHistory() }>
                Sort by: { this.state.descending ? "Descending" : "Ascending" }
            </button>
          </div>
        </div>
      );
    }
}

function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        // return squares[a];
        return {player: squares[a], line: [a, b, c]};
      }
    }
    return null;
}
  
export default Game;