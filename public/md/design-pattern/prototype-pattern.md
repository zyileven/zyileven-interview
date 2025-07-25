## Prototype Pattern 原型模式

原型模式是在同一类型的许多对象之间共享属性的有用方法。原型是 JavaScript 原生的对象，可以通过原型链被对象访问。

在我们的应用程序中，我们经常需要创建许多相同类型的对象。实现此目的的一个有用方法是创建 ES6 类的多个实例。

```js
class Dog {
  constructor(name) {
    this.name = name;
  }

  bark() {
    return `Woof!`;
  }
}

const dog1 = new Dog("Daisy");
const dog2 = new Dog("Max");
const dog3 = new Dog("Spot");
```

使用 ES6 类时，类本身定义的所有属性（在本例中为 bark）都会自动添加到原型中。

我们可以通过访问构造函数上的`prototype`属性直接查看原型，或者通过任何实例上的`__proto__`属性。

```js
console.log(Dog.prototype);
// constructor: ƒ Dog(name, breed) bark: ƒ bark()

console.log(dog1.__proto__);
// constructor: ƒ Dog(name, breed) bark: ƒ bark()
```

构造函数的任何实例上的 `__proto__` 值都是对构造函数原型的直接引用！每当我们尝试直接访问对象上不存在的对象属性时，JavaScript 就会沿着原型链向下查找该属性在原型链中是否可用。

![Flow](https://raw.githubusercontent.com/zyileven/image-hosting-platform/master/src/2024/04/09/d5ce7b83379bfcf170f4b951d1af76b1-Screen_Shot_2020-12-24_at_1.05.14_PM_k6pumf-90d4b7.png)

由于所有实例都可以访问原型，因此即使在创建实例之后也可以轻松向原型添加属性。

```js
class Dog {
  constructor(name) {
    this.name = name;
  }

  bark() {
    return `Woof!`;
  }
}

const dog1 = new Dog("Daisy");
const dog2 = new Dog("Max");
const dog3 = new Dog("Spot");

Dog.prototype.play = () => console.log("Playing now!");

dog1.play(); // 
```

通过继承的方式可以继承父类上的属性

```js
class SuperDog extends Dog {
  constructor(name) {
    super(name);
  }

  fly() {
    return "Flying!";
  }
}

const dog1 = new SuperDog("Daisy");
dog1.bark();
dog1.fly();
```

他们之间的原型关系如下：

![Flow](https://raw.githubusercontent.com/zyileven/image-hosting-platform/master/src/2024/04/09/f4541d99446cd8d379f3b03afb5abca6-Screen_Shot_2020-12-24_at_1.09.36_PM_isgkmt-4e07d7.png)

