type Executor<T> = (
  resolve: (value: T) => void,
  reject: (reason: any) => void
) => void;

type Status = "pending" | "fulfilled" | "rejected";

class MyPromise<T> {
  private status: Status = "pending";
  private value: T | null = null;
  private reason = null;

  private onFulfilledCallbacks: ((value: T) => void)[] = [];
  private onRejectedCallbacks: ((reason: any) => void)[] = [];

  constructor(executor: Executor<T>) {
    const resolve = (value: T) => {
      if (this.status === "pending") {
        this.status = "fulfilled";
        this.value = value;
        queueMicrotask(() => {
          this.onFulfilledCallbacks.forEach(cb => cb(value));
        });
      }
    };

    const reject = (reason: any) => {
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

  then(onFulfilled?: (value: T) => void) {
    if (onFulfilled) {
      if (this.status === "fulfilled") {
        queueMicrotask(() => onFulfilled(this.value!));
      } else if (this.status === "pending") {
        this.onFulfilledCallbacks.push(onFulfilled);
      }
    }
    return this;
  }

  catch(onRejected?: (reason: any) => void) {
    if (onRejected) {
      if (this.status === "rejected") {
        queueMicrotask(() => onRejected(this.reason));
      } else if (this.status === "pending") {
        this.onRejectedCallbacks.push(onRejected);
      }
    }
    return this;
  }
}

const promise1 = new MyPromise<number>((resolve, reject) => {
  reject(3);
  resolve(1); // This will be ignored
  console.log("hello");
  setTimeout(() => {
    console.log("insideTimeout");
  });
});

promise1
  .then(result => {
    console.log(result, "resolveResult");
  })
  .catch(error => {
    console.log(error, "rejectResult");
  });
