## Observer Pattern 观察者模式

通过观察者模式，我们可以将某些对象（观察者）订阅到另一个称为可观察对象的对象。每当事件发生时，可观察者都会通知其所有观察者！

一个可观察对象通常包含 3 个重要部分：

- 观察者observers：当特定事件发生时将收到通知的观察者数组
- 订阅subscribe()：：将观察者添加到观察者列表的方法
- 取消订阅unsubscribe()：从观察者列表中删除观察者的方法
- 通知notify()：每当特定事件发生时通知所有观察者的方法

实现一个简单的观察者的结构：

```js
class Observable {
  constructor() {
    this.observers = [];
  }

  subscribe(func) {
    this.observers.push(func);
  }

  unsubscribe(func) {
    // 移除掉指定的
    this.observers = this.observers.filter((observer) => observer !== func);
  }

  notify(data) {
    this.observers.forEach((observer) => observer(data));
  }
}
```

现在有一个 UI 效果：

```jsx
export default function App() {
  return (
    <div className="App">
      <Button>Click me!</Button>
      <FormControlLabel control={<Switch />} />
    </div>
  );
}
```

我们希望跟踪用户与应用程序的交互。每当用户单击按钮或切换开关时，我们都希望使用时间戳记录此事件。除了记录之外，我们还想创建一个 Toast 通知，每当事件发生时就会显示！

![4月7日](https://raw.githubusercontent.com/zyileven/image-hosting-platform/master/src/2024/04/07/78053bb91a617d47bf14f7a9561fd501-4月7日-2bd9f4.gif)

每当用户调用handleClick 或handleToggle 函数时，这些函数都会调用观察者上的notify 方法。通知方法用handleClick或handleToggle函数传递的数据通知所有订阅者！

```jsx
import { ToastContainer, toast } from "react-toastify";

class Observable {
  constructor() {
    this.observers = [];
  }

  subscribe(f) {
    this.observers.push(f);
  }

  unsubscribe(f) {
    this.observers = this.observers.filter(subscriber => subscriber !== f);
  }

  notify(data) {
    this.observers.forEach(observer => observer(data));
  }
}

const observable = new Observable();

function logger(data) {
  console.log(`${Date.now()} ${data}`);
}

function toastify(data) {
  toast(data);
}

function toastify(data) {
  toast(data, {
    position: toast.POSITION.BOTTOM_RIGHT,
    closeButton: false,
    autoClose: 2000
  });
}

// 订阅这两个方法
observable.subscribe(logger);
observable.subscribe(toastify);


export default function App() {
  // 执行订阅好的方法
  function handleClick() {
    observable.notify("User clicked button!");
  }
	// 执行订阅号的方法
  function handleToggle() {
    observable.notify("User toggled switch!");
  }
  
  return (
    <div className="App">
      <Button variant="contained" onClick={handleClick}>
        Click me!
      </Button>
      <FormControlLabel
        control={<Switch name="" onChange={handleToggle} />}
        label="Toggle me!"
      />
      <ToastContainer />
    </div>
  );
}
```

