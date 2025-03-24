let targetObj = { name: "hello" };
const MainObject = {
  name: "mainObjectName",
  arrowFn: () => {
    console.log("1->", this.name, "this1");
  },
  normalFn() {
    console.log("2->", this.name, "this2");
  },
  arrowFnInsideNormalFn() {
    let a = () => {
      console.log("3->", this.name, "thisNonReturned", "this3");
    };
    a();
  },
  arrowFnInsideNormalFnReturning() {
    return () => {
      console.log("4->", this.name, "thisReturned", "this4");
    };
  },
  normalFnInsideArrowFn: () => {
    let calling = function () {
      console.log("5->", this.name, "this5");
    };
    calling.call(targetObj); //hello this 5
    calling(); //undefined this5, fn call not method
  },
  threelevelnesting: function () {
    let a = () => {
      console.log("6->", this.name, "this6"); //takes 'this' from parent function
      let calling = function () {
        console.log("7->", this.name, "this7");
      };
      calling.call(targetObj); //hello this7
      calling(); //undefined this7-> fn call not method
    };
    a();
  },
  objectWithFns: {
    name: "childObj",
    ArrowFn: () => {
      console.log("8->", this.name, "this8");
    },
    NormalFn() {
      console.log("9->", this.name, "this9");
    },
    ArrowFnInsideNormalFN() {
      let calling = () => {
        console.log("10->", this.name, "this10");
      };
      calling.call(targetObj); //doesnt work on arrow fn
      calling(); //childObj this10
    },
    NormalFnInsideArrowFN: function () {
      let calling = function () {
        console.log("11->", this.name, "this11");
      };
      calling(); //undefined this11, fn call not method
      calling.call(targetObj); //hello this11
    },
  },
};

MainObject.arrowFn();
MainObject.normalFn();
MainObject.arrowFnInsideNormalFn();
let returnedArrow = MainObject.arrowFnInsideNormalFnReturning();
returnedArrow();
returnedArrow.call(targetObj); //CBA doesnt work
MainObject.normalFnInsideArrowFn();
MainObject.threelevelnesting();
MainObject.objectWithFns.ArrowFn();
MainObject.objectWithFns.NormalFn();
MainObject.objectWithFns.ArrowFnInsideNormalFN();
MainObject.objectWithFns.NormalFnInsideArrowFN();
