//console.log(this);

function thistest() {
  console.log(this);
  console.log(this == global);
  console.log(this == hoge);
}

const hoge = {
  test: thistest
};

hoge.test(); //hogeがレシーバー

const a = hoge.test;
a(); //変数に入れるとレシーバーがない。
