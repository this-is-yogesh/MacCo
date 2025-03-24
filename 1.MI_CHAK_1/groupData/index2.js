const arrayofObj = [
  {
    key: "Sample 1",
    data: "Data1",
  },
  {
    key: "Sample 1",
    data: "Data1",
  },
  {
    key: "Sample 2",
    data: "Data2",
  },
  {
    key: "Sample 1",
    data: "Data1",
  },
  {
    key: "Sample 3",
    data: "Data1",
  },
  {
    key: "Sample 4",
    data: "Data1",
  },
  {
    key: "Sample 3",
    data: "Data1",
  },
  {
    key: "Sample 5",
    data: "Data1",
  },
];

//using reduce

//my reduce :

Array.prototype.myReduce = function (cb, initalValue) {
  let acc = initalValue ? initalValue : this[0];
  for (let i = initalValue ? 0 : 1; i < this.length; i++) {
    acc = cb(acc, this[i]);
  }
  return acc;
};
let output = arrayofObj.myReduce((acc, item) => {
  acc[item.key] ? acc[item.key].push(item) : (acc[item.key] = [item]);
  return acc;
}, {});

let op2 = [1, 2, 3, 4, 5].myReduce((acc, item) => item);

console.log(op2);
