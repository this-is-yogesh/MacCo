let a = chunk([1, 2, 3, 4, 5], 1);
console.log(a);
//output : [[1],[2],[3],[4],[5]]

let b = chunk([1, 2, 3, 4, 5], 2);
console.log(b);
//output : [[1,2],[3,4],[5]]

let c = chunk([1,2,3,4,5],3)
console.log(c)
//output : [[1,2,3],[4,5]]

let d = chunk([1, 2, 3, 4, 5], 4);
console.log(d);
//output : [[1,2,3,4],[5]]

let e = chunk([1,2,3,4,5],5)
console.log(e)
//output : [[1,2,3,4,5]]

function chunk(arr, size) {
  const finalArray = new Array();
  if (!size) return arr;
  let i = 0;
  while (i < arr.length) {
    finalArray.push(arr.slice(i, i + size));
    i += size;
  }
  return finalArray;
}

//chunk([1, 2, 3, 4, 5], 4);
