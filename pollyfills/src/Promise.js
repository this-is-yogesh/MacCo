class MyPromise {
  constructor(executor) {
    this.status = "pending"; // 'fulfilled' or 'rejected'
    this.value = undefined;
    this.reason = undefined;

    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = value => {
      if (this.status === "pending") {
        this.status = "fulfilled";
        this.value = value;
        queueMicrotask(() => {
          this.onFulfilledCallbacks.forEach(cb => cb(value));
        });
      }
    };

    const reject = reason => {
      if (this.status === "pending") {
        this.status = "rejected";
        this.reason = reason;
        queueMicrotask(() => {
          this.onRejectedCallbacks.forEach(cb => cb(reason));
        });
      }
    };

    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

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
