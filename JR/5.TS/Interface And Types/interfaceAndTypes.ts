type User = [string, null, { name: string }];
let uUserType: User = ["s", null, { name: "Shanky" }];

type User2 = number;
let uUserType2: User2 = 12;

type Vehicle = {
  model: string;
};
type Car = Vehicle & {
  isElectric: boolean;
};

let myCar: Car = {
  model: "renault",
  isElectric: true,
};

let person: string | object = "13";
person = { name: "personName" };

interface UserInt {
  name: string;
  age?: number;
}

interface UserInt {
  id: number;
}

//we can merge interface which we cant do with type - declaration merging
let personInterface: UserInt = {
  name: "nameof person",
  id: 121,
};
