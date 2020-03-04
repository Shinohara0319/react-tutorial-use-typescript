import * as React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { NowDateStore } from "./NowDateStore";
import { observer } from "mobx-react";

type Squares = (string | null)[];
type History = { squares: Squares }[];

interface SquareProps {
  value: string | null;
  onClick: () => void;
}

const Square: React.FC<SquareProps> = ({ value, onClick }) => {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
};

interface BoardProps {
  value: { squares: Squares };
  onClick: (squares: Squares) => void;
}

const Board: React.FC<BoardProps> = ({ value, onClick }) => {
  const xIsNext = !(value.squares.filter(square => square !== null).length % 2);

  const renderSquare = (i: number) => (
    <Square value={value.squares[i]} onClick={() => handleClick(i)} />
  );

  const handleClick = (i: number) => {
    if (calculateWinner(value.squares) || value.squares[i]) {
      return;
    }
    const nextSquares = value.squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    onClick(nextSquares);
  };

  const calculateWinner = (squares: Squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };
  const winner = calculateWinner(value.squares);
  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${xIsNext ? "X" : "O"}`;

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
// const props = {
//   a: "a",
//   b: "b"
// };
// const {a, b} = props;

// const props2 = {
//   timer: new NowDateStore()
// };
// const {timer} = props2;
// yyyy/mm/dd hh/mm/ss

// const his = ["a", "b"];
// // const a = his[0]
// // const b = his[1]
// const [a2, b2] = his;
//'a', 'b'

const Game: React.FC<{ timer: NowDateStore }> = ({ timer }) => {
  const [history, setHistory] = React.useState<History>([
    { squares: Array(9).fill(null) }
  ]);
  const handleClick = (squares: Squares) => {
    setHistory(history.concat([{ squares }]));
  };

  const buttons = history.map(
    (_: any, index: number): React.ReactElement => {
      const label = index ? "Go to move #" + index : "Go to game start";
      return (
        <li key={index}>
          <button onClick={() => setHistory(history.slice(0, index + 1))}>
            {label}
          </button>
        </li>
      );
    }
  );

  return (
    <div className="game">
      <div className="game-board">
        <Board value={history[history.length - 1]} onClick={handleClick} />
      </div>
      <div className="game-info">
        <ol>{buttons}</ol>
      </div>
      <div>{timer.nowDate.toString()}</div>
    </div>
  );
};

const dateStore = new NowDateStore();

class Pet {
  name: string;
  // hoge: () => void;
  constructor(name: string) {
    this.name = name;
    // this.hoge = () => console.log("hoge");
  }
  hoge() {
    console.log(this.name);
  }
}

// const named = new Pet("いぬ");
// named.hoge();
// const obj = { hoge: named.hoge, name: "aaa" };
// obj.hoge();

class Food {
  name: string;
  pay: number;
  constructor(name: string, pay: number) {
    console.log(this);
    this.name = name;
    this.pay = pay;
  }
  eat() {
    console.log("料理名:" + this.name + ", 値段:" + this.pay);
  }
}

const foodName = new Food("ピザ", 1000);
const obj = { eat: foodName, name: "test" };
console.log(obj.eat.name);
// obj.eat();

ReactDOM.render(<Game timer={dateStore} />, document.getElementById("root"));
