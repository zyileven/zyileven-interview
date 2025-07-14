在 JavaScript 中，call 、 apply 、 bind 是允许你控制函数执行上下文的方法，虽然他们的用途相似，但在处理参数的方式以及函数调用的时间上有所不同。

### call

call 方法可以接收多个参数，第一个是 this 指向，后续的都是参数。

```js
var employee1 = { firstName: "John", lastName: "Rodson" }
var employee2 = { firstName: "Jimmy", lastName: "Baily" }

function invite(greeting1, greeting2) {
  console.log(greeting1 + " " + this.firstName + " " + this.lastName + ", " greeting2 )
}

invite.call(employee1, "Hello", "How are you?"); // Hello John Rodson, How are you?
invite.call(employee2, "Hello", "How are you?");// Hello Jimmy Baily, How are you?
```

apply 方法类似于 call，只是他将除了 this 参数以外的其他参数整合到一个数组里，作为 apply 的第二参数

```js
var employee1 = { firstName: "John", lastName: "Rodson" }
var employee2 = { firstName: "Jimmy", lastName: "Baily" }

function invite(greeting1, greeting2) {
  console.log(greeting1 + " " + this.firstName + " " + this.lastName + ", " greeting2 )
}

invite.apply(employee1, ["Hello", "How are you?"]); // Hello John Rodson, How are you?
invite.apply(employee2, ["Hello", "How are you?"]);// Hello Jimmy Baily, How are you?
```

bind 方法只处理 this 绑定，并返回一个绑定后的函数，需要用户手动调用时才传参数

```js
var employee1 = { firstName: "John", lastName: "Rodson" }
var employee2 = { firstName: "Jimmy", lastName: "Baily" }

function invite(greeting1, greeting2) {
  console.log(greeting1 + " " + this.firstName + " " + this.lastName + ", " greeting2 )
}

const fn1 = invite.bind(employee1);
const fn2 = invite.bind(employee2);
fn1("Hello", "How are you?"); // Hello John Rodson, How are you?
fn2("Hello", "How are you?"); // Hello Jimmy Baily, How are you?
```

总结三者的区别如下：

- 立即调用函数：call 、 apply；非立即调用函数：bind
-  参数接收方式：call 逗号分割，apply 数组，bind返回函数接收参数