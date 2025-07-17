# JS 事件循环

## 同步（sync）与异步（async）

在 JavaScript 中，**同步（Synchronous）** 与 **异步（Asynchronous）** 是两种核心的任务执行模型，直接决定了代码的执行顺序、性能表现及应用响应能力。



### **核心概念与区别**

![image-20250717上午114925861](https://raw.githubusercontent.com/zyileven/image-hosting-platform/master/src/2025/07/17/df44745cfa59958135a506c9894e1484-image-20250717上午114925861-7acb19.png)

### **异步实现方式**

![image-20250717上午114943349](https://raw.githubusercontent.com/zyileven/image-hosting-platform/master/src/2025/07/17/a180cce60a9fd916ac8745ef431bf1dc-image-20250717上午114943349-36b859.png)

### 什么情况下实用异步方法

I/O 密集型操作：

- 网络请求（fetch）
- 文件读写（Node.js 中的 fs.readFile）
- 数据库查询

用户交互响应：如点击事件、滚动监听。

性能优化：拆分长任务，使用 setTimeout 分块执行或 Web Workers





## 宏任务（Macrotask）与微任务（Microtask）

宏任务（Macrotask）与微任务（Microtask）是 JavaScript 事件循环（Event Loop）中处理异步操作的两种任务类型，它们的**执行时机、优先级和产生方式**有本质区别，直接影响代码执行顺序和性能优化。

### 核心区别

![image-20250717上午115005179](https://raw.githubusercontent.com/zyileven/image-hosting-platform/master/src/2025/07/17/cfaeb0ff7d9ec20d829506528b91ff6d-image-20250717上午115005179-99fc10.png)

> **关键规则**：
> **同步代码 → 清空微任务队列 → 执行一个宏任务 → 循环**

### **宏任务与微任务的具体产生方式**

#### 1.宏任务的产生方式

由浏览器或 Node.js 宿主环境触发：

- 定时器：setTimeout()、setInterval()
- I/O 操作：文件读写（Node.js）、网络请求（fetch/XMLHttpRequest）
- 用户交互事件：点击、滚动、键盘输入等 DOM 事件
- UI 渲染：页面重绘（requestAnimationFrame 在部分规范中被视为宏任务）
- 脚本执行：`<script>` 标签内的整体代码（首个宏任务）
- 跨窗口通信：postMessage

#### 2.微任务的产生方式

由 JavaScript 引擎内部机制触发：

- Promise 回调：Promise.then()、Promise.catch()、Promise.finally()
- 异步函数：async/await 中的 await 后续代码（等价于 Promise.then）
- DOM 变更监听：MutationObserver（浏览器）
- 显式手动添加：queueMicrotask()
- Node.js 专属：process.nextTick()（优先级最高）



## 事件循环机制演示

事件循环机制主要是有同步、异步，宏任务，微任务共同构成的

首先执行已有宏任务，遇到新的宏任务将其放进新宏任务栈中等待调用，遇到微任务将其放到微任务栈等待调用，同步代码执行完毕之后，开始执行所有的微任务栈，执行完微任务栈之后，渲染 UI

```js
function logA() { console.log('A') }
function logB() { console.log('B') }
function logC() { console.log('C') }
function logD() { console.log('D') }

// Click the "RUN" button to learn how this works!
logA();
setTimeout(logB, 0);
Promise.resolve().then(logC);
logD();

// 打印结果为：A D C B
```

1）执行 LogA

2）将 logB 存入宏任务栈 Macrostak[ logB ] 

3）将 logC 存入微任务栈 Microtask [logC]

4）执行 logD

5）执行微任务栈中的所有内容

6）开始执行新的一轮宏任务栈

> 注意⚠️：事件循环的初始阶段会执行整个 `script` 标签中的同步代码，这被视为 **第一个宏任务**



### 案例展示

```js
function logA() { console.log('A') }
function logB() { console.log('B') }
function logB21() { console.log('B21') }
function logB22() { console.log('B22') }
function logB23() { console.log('B23') }
function logB2() { 
  setTimeout(logB21, 2000)  
  setTimeout(logB22, 0)  
  Promise.resolve().then(logB23);
}
function logB31() { console.log('B31') }
function logB32() { console.log('B32') }
function logB33() { console.log('B33') }
function logB3() { 
  setTimeout(logB31, 2000)  
  setTimeout(logB32, 0)  
  Promise.resolve().then(logB33);
}
function logC() { console.log('C') }
function logD() { console.log('D') }

// Click the "RUN" button to learn how this works!
logA();
setTimeout(logB, 0);
logB2();
setTimeout(logB3, 0);
Promise.resolve().then(logC);
logD();

// NOTE:
//   This is an interactive vizualization. So try 
//   editing this code and see what happens. You
//   can also try playing with some of the examples 
//   from the dropdown!
```

上述所有案例来自于：[可视化代码](https://www.jsv9000.app/?code=ZnVuY3Rpb24gbG9nQSgpIHsgY29uc29sZS5sb2coJ0EnKSB9CmZ1bmN0aW9uIGxvZ0IoKSB7IGNvbnNvbGUubG9nKCdCJykgfQpmdW5jdGlvbiBsb2dCMjEoKSB7IGNvbnNvbGUubG9nKCdCMjEnKSB9CmZ1bmN0aW9uIGxvZ0IyMigpIHsgY29uc29sZS5sb2coJ0IyMicpIH0KZnVuY3Rpb24gbG9nQjIzKCkgeyBjb25zb2xlLmxvZygnQjIzJykgfQpmdW5jdGlvbiBsb2dCMigpIHsgCiAgc2V0VGltZW91dChsb2dCMjEsIDIwMDApICAKICBzZXRUaW1lb3V0KGxvZ0IyMiwgMCkgIAogIFByb21pc2UucmVzb2x2ZSgpLnRoZW4obG9nQjIzKTsKfQpmdW5jdGlvbiBsb2dCMzEoKSB7IGNvbnNvbGUubG9nKCdCMzEnKSB9CmZ1bmN0aW9uIGxvZ0IzMigpIHsgY29uc29sZS5sb2coJ0IzMicpIH0KZnVuY3Rpb24gbG9nQjMzKCkgeyBjb25zb2xlLmxvZygnQjMzJykgfQpmdW5jdGlvbiBsb2dCMygpIHsgCiAgc2V0VGltZW91dChsb2dCMzEsIDIwMDApICAKICBzZXRUaW1lb3V0KGxvZ0IzMiwgMCkgIAogIFByb21pc2UucmVzb2x2ZSgpLnRoZW4obG9nQjMzKTsKfQpmdW5jdGlvbiBsb2dDKCkgeyBjb25zb2xlLmxvZygnQycpIH0KZnVuY3Rpb24gbG9nRCgpIHsgY29uc29sZS5sb2coJ0QnKSB9CgovLyBDbGljayB0aGUgIlJVTiIgYnV0dG9uIHRvIGxlYXJuIGhvdyB0aGlzIHdvcmtzIQpsb2dBKCk7CnNldFRpbWVvdXQobG9nQiwgMCk7CmxvZ0IyKCk7CnNldFRpbWVvdXQobG9nQjMsIDApOwpQcm9taXNlLnJlc29sdmUoKS50aGVuKGxvZ0MpOwpsb2dEKCk7CgovLyBOT1RFOgovLyAgIFRoaXMgaXMgYW4gaW50ZXJhY3RpdmUgdml6dWFsaXphdGlvbi4gU28gdHJ5IAovLyAgIGVkaXRpbmcgdGhpcyBjb2RlIGFuZCBzZWUgd2hhdCBoYXBwZW5zLiBZb3UKLy8gICBjYW4gYWxzbyB0cnkgcGxheWluZyB3aXRoIHNvbWUgb2YgdGhlIGV4YW1wbGVzIAovLyAgIGZyb20gdGhlIGRyb3Bkb3duIQ%3D%3D) 可以点击进去逐步查看

#### 1）执行脚本

1. 执行 logA，打印内容
2. 将 LogB 存入宏任务栈
3. 执行 logB2
   1. 将 logB21 和 logB22 加入宏任务栈
   2. 将logB23 加入微任务栈
4. 将 logB3 加入宏任务栈
5. 将 logC 加入微任务栈
6. 执行 logD，打印内容，此时状态如下

![image-20250717上午102735536](https://raw.githubusercontent.com/zyileven/image-hosting-platform/master/src/2025/07/17/61ebe3a90f22785dc0f7c9d2d27c4d20-image-20250717上午102735536-46fbcc.png)

如上刚调用完 logD 的状态



#### 2）开始执行所有微任务

1. 执行 logB23，打印内容
2. 执行 logC，打印内容

执行完所有微任务之后：

![image-20250717上午103325787](https://raw.githubusercontent.com/zyileven/image-hosting-platform/master/src/2025/07/17/4a10831677dfa9cbafd9ef031829f3ff-image-20250717上午103325787-cfc5bf.png)

#### 3）渲染 UI，然后执行第二次循环

1. 执行logB，打印内容

2. 执行 logB22，打印内容（定时为 0）

3. 执行 logB3，打印内容（定时为 0，但是比 logB22 晚）

   ![image-20250717上午105106884](https://raw.githubusercontent.com/zyileven/image-hosting-platform/master/src/2025/07/17/7e0ba820afcce954c79386bbda89287c-image-20250717上午105106884-545942.png)

   1. 将 logB31 加入宏任务栈
   2. 将 logB32 加入宏任务栈
   3. 将 logB33 加入微任务栈

   ![image-20250717上午105349006](https://raw.githubusercontent.com/zyileven/image-hosting-platform/master/src/2025/07/17/117660fea44f8681b970a41d1dae81cb-image-20250717上午105349006-dec6b5.png)

4. 执行完 B3 宏任务之后立即清空微任务队列

   ![image-20250717上午105415196](https://raw.githubusercontent.com/zyileven/image-hosting-platform/master/src/2025/07/17/8aaf847f464584ebe390b294c3742f8b-image-20250717上午105415196-974960.png)

5. 执行 logB32，打印内容（定时为 0）

6. 执行 logB21，打印内容（定时为 2000）

7. 执行 logB31，打印内容（定时为 2000）

































































