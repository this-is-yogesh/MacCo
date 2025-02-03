/**
 * @template T
 * @param {T} value
 * @return {T}
 */
export default function deepClone(value) {
  //making deep clone without parse and stringify
  if (!value || typeof value !== "object") {
    return value;
  } else if (Array.isArray(value)) {
    return value.map(m => {
      return deepClone(m);
    });
  } else {
    return Object.keys(value).reduce((acc, curr) => {
      acc[curr] = deepClone(value[curr]);
      return acc;
    }, {});
  }

  throw "Not implemented!";
}

let v = {
  user: {
    id: "123",
    role: "admin",
  },
};
console.log(Object.keys(v));
let obj2 = deepClone(v);
obj2.user.role = "general";
console.log(v);
