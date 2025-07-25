# 原型链与继承

JavaScript的继承和原型链是其面向对象编程的核心机制，理解它们对掌握语言设计至关重要。

## 原型链的本质与工作原理



### **原型链的结构**

每个对象都有一个私有属性 `[[Prototype]]`（通过 `__proto__` 或 `Object.getPrototypeOf()` 访问），指向其原型对象。

```js
const obj = new Object();
console.log(obj.__proto__); // Object
console.log(Object.getPrototypeOf(obj)); // Object
```

原型对象也有自己的原型，形成链式结构，终点为 `null`（`Object.prototype.__proto__ === null`）

最常见的原型链继承是实用 `Object.create` 方法

```js
const animal = { eats: true };
const dog = Object.create(animal); // dog.__proto__ = animal
console.log(dog.eats); // true（沿原型链查找）
```

### **属性查找规则**

- 访问对象属性时，先查找自身属性
- 未找到则沿 `__proto__` 向上查找，通过`obj.__proto__.__proto__`
- 直到 `Object.prototype` 或返回 `undefined`



## 继承的实现方式

### **ES5 传统继承模式**

- **原型链继承**：

`Child.prototype = new Parent();`

**问题**：父类引用属性被所有子类实例共享（如数组）

- **构造函数继承**：

在子类中调用 `Parent.call(this)`，解决属性共享问题，但**无法复用父类方法**

- **组合继承（最常用）**：

结合构造函数继承属性 + 原型链继承方法：

```js
function Child(name) {
  Parent.call(this, name); // 继承属性
}
Child.prototype = Object.create(Parent.prototype); // 继承方法
Child.prototype.constructor = Child;
```

- **寄生组合继承（优化版）**：

避免组合继承中两次调用父类构造函数，通过空函数过渡：

```js
function inherit(Child, Parent) {
  const F = function() {};
  F.prototype = Parent.prototype;
  Child.prototype = new F(); // 仅继承方法
  Child.prototype.constructor = Child;
}
```

### **ES6 Class 继承（语法糖）**

`class Child extends Parent` 本质是寄生组合继承的封装：

- extends 建立两条原型链：
  - `Child.__proto__ = Parent`（继承静态方法）
  - `Child.prototype.__proto__ = Parent.prototype`（继承实例方法）。
- super() 调用父类构造函数，绑定 this。

```js
class Animal {
  constructor(name) { this.name = name; }
}
class Dog extends Animal {
  constructor(name, breed) {
    super(name); // 等价于 Animal.call(this, name)
    this.breed = breed;
  }
}
```









