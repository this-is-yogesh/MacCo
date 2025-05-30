function MyPromise(executor) {
  this.value = undefined;
  this.status = "pending";

  function resolve(val) {
    this.value = val;
    if (this.status === "pending") {
      this.status = "fulfilled";
    }
  }

  function reject() {}

  try {
    executor(resolve, reject);
  } catch (e) {}
}

MyPromise.prototype.then = thenCallback => {
  console.log(this, "thisInProto");
  if (typeof thenCallback === "function") {
    if (this.status === "fulfilled") {
      queueMicrotask(() => thenCallback(value));
    }
  }
};



