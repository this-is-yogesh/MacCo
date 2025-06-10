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

//2.
let sum = (a, b, c, d) => a + b + 32;

let total = currySum(sum);
total(1);

function currySum(fn) {
  return function curried(...args) {
    if (fn.length <= args.length) {
      return fn(...args.reverse());
    } else {
      return function (...argnextinline) {
        console.log(argnextinline, "argnextinline");
        console.log(args, "args");
        return curried(...argnextinline, ...args);
      };
    }
  };
}

// let sum = (a, b, c, d) => {
//   console.log(a, b, c, d);
// };

// let total = currySum(sum);
// let t = total(1);
// let r = t(3);
// let d = r(5);
// d(6);