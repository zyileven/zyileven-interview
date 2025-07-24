

## Command Pattern 命令模式

通过命令模式，我们可以将执行特定任务的对象与调用方法的对象解耦。

```js
// 定义一个类
class OrderManager() {
  constructor() {
    this.orders = []
  }

  placeOrder(order, id) {
    this.orders.push(id)
    return `You have successfully ordered ${order} (${id})`;
  }

  trackOrder(id) {
    return `Your order ${id} will arrive in 20 minutes.`
  }

  cancelOrder(id) {
    this.orders = this.orders.filter(order => order.id !== id)
    return `You have canceled your order ${id}`
  }
}
const om = new OrderManager();
// 通过实例划，返回得到的实例化对象可以调用内部的方法
om.placeOrder("Pad Thai", "1234");
om.trackOrder("1234");
om.cancelOrder("1234");
// 上面一切都很好，没有任何问题
```

上面的代码有一个不好，但是无伤大雅的问题：**所有的方法都是绑定了实例对象的**。、

假设我们现在将其重命名为 addOrder，而不是称之为 placeOrder！这意味着我们必须确保不在代码库中的任何位置调用 placeOrder 方法，这在大型应用程序中可能非常棘手。相反，我们希望将方法与管理器对象解耦，并为每个命令创建单独的命令函数！

现在我们重构OrderManager类，它将不再有 `placeOrder`、`cancelOrder` 和 `trackOrder` 方法，而是只有一个方法：`execute`。该方法将执行它给出的任何命令。

这就是命令模式，接下来我们看看命令模式是如何工作的：

```js
// 接受一个函数，并返回带有 execute 属性的实例对象
class Command {
  constructor(execute) {
    this.execute = execute;
  }
}

function PlaceOrderCommand(order, id) {
  return new Command((orders) => {
    orders.push(id);
    return `You have successfully ordered ${order} (${id})`;
  });
}

function CancelOrderCommand(id) {
  return new Command((orders) => {
    orders = orders.filter((order) => order.id !== id);
    return `You have canceled your order ${id}`;
  });
}

function TrackOrderCommand(id) {
  return new Command(() => `Your order ${id} will arrive in 20 minutes.`);
}

// 首先，上面三个方法都返回一个 Command 的实例对象

class OrderManager {
  constructor() {
    this.orders = [];
  }
  // 每个命令都应该有权访问管理器的命令，我们将其作为第一个参数传递。
  execute(command, ...args) {
    return command.execute(this.orders, ...args);
  }
}

const manager = new OrderManager();
// 这里的 execute 执行传入的参数都是 command 实例对象
manager.execute(new PlaceOrderCommand("Pad Thai", "1234"));
manager.execute(new TrackOrderCommand("1234"));
manager.execute(new CancelOrderCommand("1234"));
```

> 总结：感觉没啥卵用的解耦

