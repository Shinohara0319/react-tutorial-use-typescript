import * as React from "react";
import ReactDOM from "react-dom";
import "./index.css";

/*
・boardとsquareを作る。
・現在のプレイヤー名を表示する。
・squareをクリックした時に○を付ける。
・boardコンポーネントに各squareの状態を持たせる。
・偶数の手番の時は、×を付ける。
・プレイヤーを切り替える（NextPlayer -> ○ or ×みたいな）
・値が入ってるsquareはクリックできないようにする。
・勝利判定を作る。
・ゲーム終了時に勝ったプレイヤー名を表示させる。
・ゲーム終了したら、squareをクリックできないようにする。
*/

interface SquareProps {
  status: string | null;
  onClick: () => void;
}

const Square: React.FC<SquareProps> = ({ status, onClick }) => (
  <div className="square" onClick={onClick}>
    {status}
  </div>
);

const Board: React.FC = () => {
  const [state, setState] = React.useState<(string | null)[]>(
    Array(9).fill(null)
  );
  const nextPlayer = state.filter((d) => !d).length % 2 ? "O" : "X";
  return (
    <>
      <div>NextPlayer: {nextPlayer}</div>
      <table>
        <tbody>
          {[...Array(3)].map((_, i) => (
            <tr>
              {[...Array(3)].map((_, j) => (
                <td>
                  <Square
                    status={state[i * 3 + j]}
                    onClick={() => {
                      if (judgeWinner(state) || state[i * 3 + j]) {
                        return;
                      }
                      setState(
                        state.map((e, n) => (n === i * 3 + j ? nextPlayer : e))
                      );
                    }}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div>勝者: {judgeWinner(state)}</div>
    </>
  );
};

const winnerJudgement = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const judgeWinner = (state: (string | null)[]) => {
  for (var i = 0; i < winnerJudgement.length; i++) {
    const arr = winnerJudgement[i].map((e) => state[e]);
    if (arr[0] && arr[0] === arr[1] && arr[0] === arr[2]) {
      return arr[0];
    }
  }
};

ReactDOM.render(<Board />, document.getElementById("root"));
