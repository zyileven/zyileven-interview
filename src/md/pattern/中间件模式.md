

## Middleware Pattern 中间件模式

中间件模式使组件可以通过一个中心点（中介者）相互交互。中介者不是直接相互交谈，而是接收请求并将其转发！在 JavaScript 中，中介者通常只不过是一个对象文字或一个函数。

![Flow](https://raw.githubusercontent.com/zyileven/image-hosting-platform/master/src/2024/04/07/79ffb40f36fb79cb3acb2e634662f1ae-Screen_Shot_2020-12-23_at_11.20.28_PM_u12fsw-20240407下午14713977-211483.png)

对象的请求由中介处理，而不是让每个对象直接与其他对象通信，从而形成多对多关系。中介器处理该请求，并将其转发到需要的位置。

![Flow](https://raw.githubusercontent.com/zyileven/image-hosting-platform/master/src/2024/04/07/7af8832e366bef05f5a3985b2e4c7089-Screen_Shot_2020-12-23_at_11.23.32_PM_wjft0a-98c2d3.png)

假设我们有个聊天室功能：

```js
class ChatRoom {
  logMessage(user, message) {
    const time = new Date();
    const sender = user.getName();

    console.log(`${time} [${sender}]: ${message}`);
  }
}

class User {
  constructor(name, chatroom) {
    this.name = name;
    this.chatroom = chatroom;
  }

  getName() {
    return this.name;
  }

  send(message) {
    this.chatroom.logMessage(this, message);
  }
}
// 定义一个聊天室
const chatroom = new ChatRoom();

// 定义用户
const user1 = new User("John Doe", chatroom);
const user2 = new User("Jane Doe", chatroom);

// 发送消息
user1.send("Hi there!");
user2.send("Hey!");

```

上面的代码在用户发送消息并得到结果的过程中会记录好消息的日志，这个消息的日志就是中间件的效果。