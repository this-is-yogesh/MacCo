class MyPromise {
 

  then(onFulfilled) {
    if (typeof onFulfilled === "function") {
      if (this.status === "fulfilled") {
        queueMicrotask(() => onFulfilled(this.value));
      } else if (this.status === "pending") {
        this.onFulfilledCallbacks.push(onFulfilled);
      }
    }
    return this;
  }

  catch(onRejected) {
    if (typeof onRejected === "function") {
      if (this.status === "rejected") {
        queueMicrotask(() => onRejected(this.reason));
      } else if (this.status === "pending") {
        this.onRejectedCallbacks.push(onRejected);
      }
    }
    return this;
  }
}

const promise1 = new MyPromise((resolve, reject) => {
  resolve(1);
  reject(3);
  // Ignored
  console.log("hello");
  setTimeout(() => {
    console.log("insideTimeout");
  });
});

promise1
  .then(value => {
    console.log(value, "resolveResult");
  })
  .catch(error => {
    console.log(error, "rejectResult");
  });
