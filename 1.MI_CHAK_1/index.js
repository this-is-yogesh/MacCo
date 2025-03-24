//1.predict output and give reason 

console.log("A");

setTimeout(function setFn() {
  console.log("B");
});

let p = new Promise(function promise(res, rej) {
  res("F");
});
let arr = ["C", "D"];
arr.forEach(x => {
  console.log(x);
});
console.log("E");
p.then(function resolved(resolvedValue) {
  console.log(resolvedValue);
});

//outuput
//Reason:
/*
a.) Task Queue , MicroTask Queue, Call stack → Microtask queue > Task Queue

b.) setTimeout callback fn is added to Task Queue, new Promise callback funciton is added to call stack first and then immediately executed to put the promise in Microtask queue, and then it gets removed from call stack and then other sync code is run, after that, first Microtask queue is cleared to callstack and then Task queue
*/
