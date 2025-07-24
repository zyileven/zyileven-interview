## 单例模式

首先明白“单例”是什么，单例就是只能实例化一次的实例对象，我们把他叫做单例对象。由于只能实例化一次，因此当我们重复调用构造函数时，也只会返回同一个实例，以确保达成上面的效果。

通过使用闭包可以达成我们的目的：

```js
const Singleton = (function(){
  let instance; // 定义一个持久化存在于内存中的变量
  
	function createInstance() {
    return {name: "fff"}
  }
  
  return function () {
    if (!instance) {
      instance = createInstance()
    }
    return instance;
  }
})();

const obj1 = Singleton();
const obj2 = Sihgleton();

console.log(obj1 === obj2); // true
```

