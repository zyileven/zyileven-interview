在 JavaScript 中创建 Object 对象的方法有很多种，具体如下：

### 一、对象字面量语法123

对象字面量语法是指用花括号括起来的一组以逗号分割的 key-value 键值对。

```js
var object = {
	name: "zhangsan",
  age: 30
}
```

> 注意⚠️：对象的键必须是字符串，值可以是任何数据类型。

### 二、对象构造函数

使用 Object 构造函数也能实现创建一个对象

```js
var obj = new Object();

var obj = new Object({name: "ddd"})
console.log(obj); // {name: 'sdd'}
```

Object() 是一个内置构造函数，因此创建普通对象可以不使用 new 关键字，可以直接使用，比如：

```js
var obj = Object()
```

### 三、 Object.create方法

Object 的 create 方法用于通过传递指定原型对象和属性作为参数来创建新对象，也就是说，此模式有助于基于现有对象创建新对象（对于设置原型继承很有用）。第二个参数是可选的，用于在新创建的对象上创建属性。

##### 从 null 中创建一个对象，原型为空

```js
var obj = Object.create(null)
```

##### 从旧对象中创建一个新对象

```js
var oldObj = {name: "xxx"}
var newObj = Object.create(oldObj);
console.log(newObj, oldObj); // {} {name: "xxx"}
console.log(newObj.name); // "xxx"
```

造成上面结果的原因是 create 方法不是将旧对象的属性传给新对象，而是放在新对象的原型上，因此新对象可以访问 name 属性，但是这个属性并不属于新对象。

##### 从旧对象中创建一个新对象，并设置新对象的属性

```js
var oldObj = {name: "xxx"}
var newObj = Object.create(oldObj, {
  age: {
    value: 30
  },
  sex: {
    value: "男"
  }
});
console.log(newObj, oldObj); // {} {name: "xxx"}
console.log(newObj.name, newObj.age); // "xxx" 30
```

也许有的人看到这里很疑惑，为什么 newObj 打印出来还是 {} ，这个对象有新的 name 和 age 属性啊！

> 其实这里涉及到对象中的属性的配置的问题，一个对象的属性除了我们常见的 value 配置以外，还有一些别的配置用于直接定义属性的值和行为特性：
>
> - **value**
>
> 属性的值，默认为 undefined。
> 示例：value: 42。
>
> - **writable**
>
> 布尔值，控制属性值是否可修改。
> 默认值：false（不可修改）
> 若为 false，赋值操作静默失败（严格模式下报错）
>
> - **enumerable**
>
> 布尔值，控制属性是否可被枚举（如 for...in、Object.keys()）。
> 默认值：false（不可枚举）。
> 示例：不可枚举属性不会出现在循环中。
>
> - **configurable**
>
> 布尔值，控制属性是否可被删除或重新配置描述符。
> 默认值：false（不可配置）。
> **若为 false**：
> 不能删除属性（delete obj.prop 失败）。
> 不能修改除 writable 外的描述符（writable 仅允许从 true 改为 false）。

因此，让我们修改上面的代码：

```js
var oldObj = {name: "xxx"}
var newObj = Object.create(oldObj, {
	age: {
    value: 30,
    enumerable: true // 让这个 age 属性可以直接打印 newObj 的时候打印出来，因为他可以枚举循环了
  },
  sex: {
    value: "男"
  }
});
console.log(newObj, oldObj); // { age: 30 } {name: "xxx"}
console.log(newObj.name, newObj.age, newObj.sex); // "xxx" 30 男
```

### 四、函数构造函数

创建任意函数并应用 new 关键字来创建对象实例，这是 ES6 类之前基于构造函数实现 OOP 的主要方法（现在肯定是使用 class 关键字来创建类了）。

```js
function Person(name, age) {
	this.name = name;
  this.age = age;
}
var obj = new Person("zhangsan", 20);
console.log(obj) // {name: 'zhangsan', age: 20}
```

### 五、 Object.assign 方法

Object.assign 方法用于从源对象（一个或多个）复制所有属性并将其存储到目标对象中。这主要用于克隆或合并对象操作。

```js
var oldObj = {
  name: "xxx"
}
var oldObj2 = {
  age: 20
}

var newObj = Object.assign({}, oldObj, oldObj2);
console.log(newObj); // {name: 'xxx', age: 20}
```

### 六、 ES6 类语法

ES6 引入了类特性，因此可以使用类语法来创建对象（类本身就是原型的语法糖）

```js
class Person{
  constructor(name){
    this.name = name;
  }
}
var obj = new Person("ddd");
```





