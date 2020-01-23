const promise1 = new Promise<string>(function(resolve, reject) {
  setTimeout(() => {
    resolve("foo");
    // reject(new Error());
  }, 300);
});
function promise2(str: string): Promise<string> {
  return new Promise(function(resolve) {
    setTimeout(() => {
      resolve(str + "aaa");
    }, 100);
  });
}

async function promise3() {
  try {
    const pro = await promise1;
    const pro2 = await promise2(pro);
    return pro2;
  } catch (err) {
    console.log(err);
  }
  return "aaa";
}

console.log(promise3());
promise3().then(a => {
  console.log(a);
});

export default promise1;
