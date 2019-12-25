import * as React from 'react';
import ReactDOM, { render } from 'react-dom';
import './index.css';

interface SquareProps {
  value: string | null;
  onClick: () => void;
}

const Square: React.FC<SquareProps> = ({onClick, value}) => {
  return <button className="square" onClick={onClick}>{value}</button>
};

interface BoardProps {
  value: { squares: (string | null)[]};
  onClick: (squares:(string | null)[]) => void;
}

//var test:(a: number, b: number) => number = (a: number, b:number):number => a + b;

const Board: React.FC<BoardProps> = ({value, onClick}) => {
//const Board: React.FC = () => {
  //const [squares, setSquares] = React.useState<(string | null)[]>(Array(9).fill(null));

  const [xIsNext, setXIsNext] = React.useState(true);

  const renderSquare = (i: number) => <Square
    value={value.squares[i]}
    onClick={() => handleClick(i)}
  />;

  const handleClick = (i:number) => {
    if (calculateWinner(value.squares) || value.squares[i]) {
      return;
    }

    const nextSquares = value.squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onClick(nextSquares);
    setXIsNext(prev => !prev);
  }
  const calculateWinner = (squares: (string | null)[]) => {
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
        return squares[a];
      }
    }
    return null;
  }
  const winner = calculateWinner(value.squares);
  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${xIsNext ? 'X' : 'O'}`;

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

const Game: React.FC = () => {
  const [history, setHistory] = React.useState< { squares: (string | null)[]}[] >([{squares : Array(9).fill(null)}]);
  //<squaresの中身はstring or nullの配列です。配列を配列の中に入れます。>初期値は配列の中にオブジェクトのsquaresを入れています。
  const handleClick = (squares:(string | null)[]) => {
    setHistory(history.concat([{squares}]))
  }

  const buttons = history.map((unk: any, index: number):React.ReactElement => {
    const label = index ? 'Go to move #' + index : 'Go to game start';
    return <li key={index}>
      <button onClick={() => {
        setHistory(history.slice(0, index + 1))
      }}>{label}</button>
    </li>
  });


  return (
    <div className="game">
      <div className="game-board">
        <Board value={history[history.length - 1]} onClick={handleClick} />
      </div>
      <div className="game-info">
        <div>{/* status */}</div>
        <ol>
          {buttons}
        </ol>
      </div>
    </div>
  )
};

// ========================================

ReactDOM.render(<Game />, document.getElementById('root'));
