function dummy(a, b, c, d, e) {
  return a + b + c + d + e;
}

function main(dummy) {
  return function curried(...args) {
    if (dummy.length <= args.length) {
      return dummy(...args.reverse());
    } else {
      return function (...argsNext) {
        return curried(...argsNext, ...args);
      };
    }
  };
}

let curriedFunction = main(dummy);
console.log(curriedFunction(1)(2)(3)(4)(5));
