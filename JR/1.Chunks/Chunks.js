//chunk([1,2,3,4,5],1)
//output : [[1],[2],[3],[4],[5]]

//chunk([1,2,3,4,5],2)
//output : [[1,2],[3,4],[5]]

//chunk([1,2,3,4,5],3)
//output : [[1,2,3],[4,5]]

//chunk([1,2,3,4,5],4)
//output : [[1,2,3,4],[5]]

//chunk([1,2,3,4,5],5)
//output : [[1,2,3,4,5]]

function chunk(arr, size) {
  if(!size){
    return arr;
  }
  let resultArray = [];
  let i = 0;
  while (i < arr.length) {
    let j = 0;
    let subArray = [];
    while (j < size) {
      subArray.push(arr[i]);
      j++;
      i++;
    }
    
    resultArray.push(subArray.filter((item)=>item))
  }

  return resultArray
}

console.log(chunk([1, 2, 3, 4, 5], 2));
