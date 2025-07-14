class MyPromise {
  constructor (executor) {
    this.state = "pending"; // 状态：pending，fulfilled，rejected
    this.successValue = undefined; // 成功值
    this.failedReason = undefined; // 失败原因
    this.onFulfilledCallbacks = []; // 成功回调队列
    this.onRejectedCallbacks = []; // 失败回调队列

    const resolve = (value) => { // 将成功结果传给 resolve
      if (this.state !== 'pending') return ;
      this.state = 'fulfilled';
      this.successValue = value;
      this.onFulfilledCallbacks.forEach(fn => fn());// 执行所有成功的回调
    }

    const reject = (reason) => { // 将失败结果传给 reject
      if (this.state !== 'pending') return;
      this.state = 'rejected';
      this.failedReason = reason;
      this.onRejectedCallbacks.forEach(fn => fn()); // 执行所有失败的回调
    }

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error)
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : err => {throw err;}

    const promise2 = new MyPromise((resolve, reject) => {
      const handle = () => {
        setTimeout(() => { // 模拟微任务
          try {
            const x = this.state === 'fulfilled' ? onFulfilled(this.value) : onRejected(this.reason);
            resolve(x);
          } catch (error) {
            reject(error);
          }
        }, 0);
      }

      if (this.state !== "pending") {
        handle();
      } else {
        // 状态未变更，加入回调队列
        this.onFulfilledCallbacks.push(handle);
        this.onRejectedCallbacks.push(handle);
      }

      return promise2; // 返回新 Promise 支持链式调用
    })
  }
}

const p = new MyPromise((resolve) => resolve(10));
p.then(res => console.log(res)); // 输出 10




