let ans = new Array();
let a = [[4, [5, [6]], 7], 12];

function flattenArray(a) {
  for (let i = 0; i < a.length; i++) {
    if (Array.isArray(a[i])) {
      flattenArray(a[i]);
    } else {
      ans.push(a[i]);
    }
  }
  return ans;
}

let result = flattenArray(a);
console.log(result);
