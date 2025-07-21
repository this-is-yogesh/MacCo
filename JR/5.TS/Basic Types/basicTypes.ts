let aNumber: number = 2;
let aBoolean: boolean = true;
let aArray: object[] = [{ hello: "string" }, [1], () => {}];
let uUser: { name: string; age: number } = {
  name: "Tarun",
  age: 12,
};
let uUndefined: undefined = undefined;
let nNull: null = null;
let tTuple: [string, boolean, { sitar: string }, number, object] = [
  "firstValue",
  true,
  { sitar: "instrument" },
  1,
  () => {},
];

enum Color {
  primary = "red",
  secondary = "black",
}

let eEnum: Color = Color.primary;

let uUnknown: unknown = 12;
uUnknown = "thsitype";

function numberValue(): number {
  return 12;
}

function infinite(): never {
  while (true) {}
}

function voidFunction(): void {}
