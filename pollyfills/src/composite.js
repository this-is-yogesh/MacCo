const addfive = num => {
  return num + 5;
};

const subtwo = num => {
  return num - 2;
};

const mulfour = num => {
  return num * 4;
};

const subby13 = num => {
  return num - 13;
};

function compose(...args) {
  return function (arg) {
    let ans = args.reduce((acc, item) => (acc = item(acc)), arg);
    return ans;
  };
}

let eval = compose(subby13, addfive, subtwo, mulfour)
console.log(eval(5));
