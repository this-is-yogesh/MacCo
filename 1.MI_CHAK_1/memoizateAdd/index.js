const add = (a, b) => {
  for (let i = 0; i < 1000000; i++) {}
  return a + b;
};

function memoizeOne(callBackFn) {
  let cacheObject = new Map();
  return function memoizeAdd(...args) {
    let key = JSON.stringify(args);
    if (cacheObject.has(key)) {
      console.log(cacheObject);
      return cacheObject.get(key);
    } else {
      let result = callBackFn(...args);
      cacheObject.set(key,result)
      return result;
    }
  };
}
const memoizeAdd = memoizeOne(add);

console.time("AddMemoize2");
console.log(memoizeAdd("s", "t"));
console.timeEnd("AddMemoize2");

console.time("Add1");
console.log(memoizeAdd(1, 2));
console.timeEnd("Add1");

console.time("AddMemoize");
console.log(memoizeAdd(1, 2));
console.timeEnd("AddMemoize");

console.time("Add2");
console.log(memoizeAdd(8, 9));
console.timeEnd("Add2");


