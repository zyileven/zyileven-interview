## Factory Pattern 工厂模式

<span style="color: red">**当一个函数不使用 new 关键字返回一个新对象时，它就是一个工厂函数**</span>！通过工厂模式，我们可以使用工厂函数来创建新对象。

比如：

```js
const createUser = ({ firstName, lastName, email }) => ({
  firstName,
  lastName,
  email,
  fullName() {
    return `${this.firstName} ${this.lastName}`;
  },
});
```

现在，我们可以通过调用 createUser 函数轻松创建多个用户。

```js
const user1 = createUser({
  firstName: "John",
  lastName: "Doe",
  email: "john@doe.com"
});

const user2 = createUser({
  firstName: "Jane",
  lastName: "Doe",
  email: "jane@doe.com"
});

console.log(user1);
console.log(user2);
```

工厂模式的特点：

- 创建相对复杂且可配置的对象（不像类实例对象，更改属性必须调用内部的方法，这里可以直接更改属性）

  ```js
  user1.firstName = "John1"
  ```

- 使用工厂模式，我们可以轻松创建包含自定义键和值的新对象

  ```js
  const createObjectFromArray = ([key, value]) => ({
    [key]: value,
  });
  
  createObjectFromArray(["name", "John"]); // { name: "John" }
  ```

### 缺点

创建新实例比每次创建新对象更节省内存。

