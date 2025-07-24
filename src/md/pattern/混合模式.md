## Mixin Pattern 混合模式

首先我们看一段代码：

```js
// 动物
class AnimalFunctionality {
	walk = () => {
		console.log("Walking!");
	};
	sleep = () => console.log("Sleeping!");
}
// 犬科
class CanidaeFunctionality {
	bark = () => console.log("Woof!");
	wagTail = () => console.log("Wagging my tail!");
	play = () => console.log("Playing!");
}
// 狗
class Dog extends CanidaeFunctionality {
	constructor(name) {
        super();
		this.name = name;
	}
}

const dog = new Dog("FFFF");

console.log(dog.name);
console.log(dog.bark());


```

Dog 类只能继承一个父类，如果CanidaeFunctionality和AnimalFunctionality没有继承关系，则无法同事继承两个类的内容。

> 由于每个类只可以扩展另外一个类。狗类只能基于动物类来继承，而不能继承 2 个不同的类，这时候使用 mixin 就可以实现。

看下面的代码：

```js
class Dog {
	constructor(name) {
		this.name = name;
	}
}
// 动物
const animalFunctionality = {
	walk: () => console.log("Walking!"),
	sleep: () => console.log("Sleeping!"),
};
//带毛
const canidaeFunctionality = {
    bark: () => console.log("Woof!"),
	wagTail: () => console.log("Wagging my tail!"),
	play: () => console.log("Playing!"),
};

// 这里将两个类中的功能 mixin 到 Dog 类上
Object.assign(Dog.prototype, animalFunctionality);
Object.assign(Dog.prototype, canidaeFunctionality);

const pet1 = new Dog("Daisy");

console.log(pet1.name);
pet1.bark();
pet1.wagTail();
pet1.play();
pet1.walk();
pet1.sleep();

```

通过将功能定义到对象中，然后将对象中的功能 mixin 到 Dog 类中，就实现了我们想要的效果。