## 深拷贝与浅拷贝

`JavaScript`中存在两大数据类型：

- 基本类型
- 引用类型

基本类型数据保存在在栈内存中。

引用类型数据保存在堆内存中，引用数据类型的变量是一个指向堆内存中实际对象的引用，存在栈中。

### 浅拷贝

浅拷贝，指的是创建新的数据，这个数据有着原始数据属性值的一份精确拷贝

- 如果属性是基本类型，拷贝的就是基本类型的值。
- 如果属性是引用类型，拷贝的就是内存地址，即复制前后的引用是一样的

简单实现一个浅拷贝

```js
function shallowClone(obj) {
    const newObj = {};
    for(let prop in obj) {
        if(obj.hasOwnProperty(prop)){ // 看看那些属性是在 obj 上的，不包含继承的
            newObj[prop] = obj[prop]; // 将自己的属性保存到新对象
        }
    }
    return newObj;
}
```

在`JavaScript`中，存在浅拷贝的现象有：

- `Object.assign`

  ```js
  const obj1 = { foo: { x: 1 } };
  const obj2 = Object.assign({}, obj1);
  
  obj1.foo.x = 2;
  obj2.foo.x; // 2
  ```

- `Array.prototype.slice()` 的浅复制只会复制第一层，第二层的对象还是原来的引用

  ```js
  const arr1 = [1, 2, {foo: 'bar'}];
  const arr2 = arr1.slice();
  console.log(arr2); // [1, 2, {foo: 'bar'}] 
  arr1[2].foo = 'baz';
  console.log(arr1[2].foo) // 'baz'
  console.log(arr2[2].foo); // 'baz'
  ```

-  `Array.prototype.concat()` 的浅复制只会复制第一层，第二层的对象还是原来的引用

  ```js
  const arr1 = [1, 2, {foo: 'bar'}];
  const arr2 = arr1.concat(); 
  console.log(arr2); // [1, 2, {foo: 'bar'}]
  arr1[2].foo = 'baz';
  console.log(arr1[2].foo); // 'baz'
  console.log(arr2[2].foo); // 'baz'
  // arr2 是通过浅复制 arr1 创建的，所以 arr2[2] 和 arr1[2] 最初指向的是同一个对象 {foo: 'baz'}。然后，你修改了 arr1[2].foo 的值为 'baz'，这个修改也影响了 arr2[2].foo，因为 arr2[2].foo 和 arr1[2].foo 指向的是同一个对象。
  ```

- 使用拓展运算符实现的复制 

  ```js
  // 对象浅复制
  const obj1 = { foo: 'bar', x: 42 };
  const obj2 = {...obj1}; 
  
  console.log(obj2); // {foo: "bar", x: 42} 
  
  // 对象中嵌套对象仍然是同一个引用
  obj1.foo = 'baz'; // 将 obj1.foo 指向新的 baz
  console.log(obj2.foo); // 'bar',在复制的时候 obj2.foo就已经指向 bar 了
  
  // 数组浅复制
  const arr1 = [1, 2, 3]; 
  const arr2 = [...arr1];
  
  console.log(arr2); // [1, 2, 3]
  
  // 数组中嵌套数组仍然是同一个引用
  arr1[0] = 10; 
  console.log(arr1[0]); // 10
  console.log(arr2[0]); // 1
  ```

### 深拷贝（完全生成一个新的东西）

深拷贝开辟一个新的栈，两个对象属完成相同，但是对应两个不同的地址，修改一个对象的属性，不会改变另一个对象的属性

- _.cloneDeep()
- jQuery.extend()
- JSON.stringify()
- 手写循环递归

#### _.cloneDeep()

```js
const _ = require('lodash');
const obj1 = {
    a: 1,
    b: { f: { g: 1 } },
    c: [1, 2, 3]
};
const obj2 = _.cloneDeep(obj1);
console.log(obj1.b.f === obj2.b.f);// false
```

#### jQuery.extend()

```js
const $ = require('jquery');
const obj1 = {
    a: 1,
    b: { f: { g: 1 } },
    c: [1, 2, 3]
};
const obj2 = $.extend(true, {}, obj1);
console.log(obj1.b.f === obj2.b.f); // false
```

#### JSON.stringify()

```js
const obj2=JSON.parse(JSON.stringify(obj1));
```

但是这种方式存在弊端，会忽略`undefined`、`symbol`和`函数`

```js
const obj = {
    name: 'A',
    name1: undefined,
    name3: function() {},
    name4:  Symbol('A')
}
const obj2 = JSON.parse(JSON.stringify(obj));
console.log(obj2); // {name: "A"}
```

#### 循环递归

1. 先判断对象是否为 null，如果是 null 直接返回
2. 再判断对象是否是日期，如果是，使用 `new Date()` 可以返回一个全新的对象
3. 如果是正则，也可以直接返回 `new RegExp()` 返回一个全新对象
4. 如果是普通值，可以直接返回
5. 现在判定是对象：
   1. 首先判断这个对象是否在 hash 里面

```js
function deepClone(obj, hash = new WeakMap()) {
  if (obj === null) return obj; // 如果是null或者undefined我就不进行拷贝操作
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  // 可能是对象或者普通的值  如果是函数的话是不需要深拷贝
  if (typeof obj !== "object") return obj;
  // 是对象的话就要进行深拷贝
  if (hash.get(obj)) return hash.get(obj);
  let cloneObj = new obj.constructor();
  // 找到的是所属类原型上的constructor,而原型上的 constructor指向的是当前类本身
  hash.set(obj, cloneObj);
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      // 实现一个递归拷贝
      cloneObj[key] = deepClone(obj[key], hash);
    }
  }
  return cloneObj;
}
```

![img](https://raw.githubusercontent.com/zyileven/image-hosting-platform/master/src/2024/03/01/c0a6986b9e9232c00e88f0842b91aaf9-d9862c00-69b8-11eb-ab90-d9ae814b240d-20240301%E4%B8%8B%E5%8D%8824611295-2c045b.png)

浅拷贝和深拷贝都创建出一个新的对象，但在复制对象属性的时候，行为就不一样。

浅拷贝只复制属性指向某个对象的指针，而不复制对象本身，**新旧对象还是共享同一块内存**，修改对象属性会影响原对象。

```js
// 浅拷贝
const obj1 = {
    name : 'init',
    arr : [1,[2,3],4],
};
const obj3=shallowClone(obj1) // 一个浅拷贝方法
obj3.name = "update";
obj3.arr[1] = [5,6,7] ; // 新旧对象还是共享同一块内存

console.log('obj1',obj1) // obj1 { name: 'init',  arr: [ 1, [ 5, 6, 7 ], 4 ] }
console.log('obj3',obj3) // obj3 { name: 'update', arr: [ 1, [ 5, 6, 7 ], 4 ] }
```

但深拷贝会另外创造一个一模一样的对象，**新对象跟原对象不共享内存**，修改新对象不会改到原对象。

```js
// 深拷贝
const obj1 = {
    name : 'init',
    arr : [1,[2,3],4],
};
const obj4=deepClone(obj1) // 一个深拷贝方法
obj4.name = "update";
obj4.arr[1] = [5,6,7] ; // 新对象跟原对象不共享内存

console.log('obj1',obj1) // obj1 { name: 'init', arr: [ 1, [ 2, 3 ], 4 ] }
console.log('obj4',obj4) // obj4 { name: 'update', arr: [ 1, [ 5, 6, 7 ], 4 ] }
```

### 总结

一个相对比较完美的深复制函数：

```js
function deepClone(obj, hash = new WeakMap()) {
	if (obj instanceof RegExp) return new RegExp(obj);
	if (obj instanceof Date) return new Date(obj);
	if (obj === null || typeof obj !== "object") {// 如果不是复杂数据类型，直接返回
		return obj;
	}
	if (hash.has(obj)) {// 因为是递归函数，检查 obj 是否已经被复制过，如果已经复制过，就返回吧
		return hash.get(obj);
	}
	let t = new obj.constructor(); // 假设 const obj = new XXX(),那么这段代码表示 let t = new XXX()
	hash.set(obj, t); // 将用构造函数 new XXX() 创建的新对象 t 放入 hash 里
	for (let key in obj) { // 遍历 obj 的所有属性
		if (obj.hasOwnProperty(key)) { // 只复制实例上的属性
			t[key] = deepClone(obj[key], hash);
		}
	}
	return t;
}
```

- 浅拷贝是拷贝一层，属性为对象时，浅拷贝是复制，两个对象指向同一个地址
- 深拷贝是递归拷贝深层次，属性为对象时，深拷贝是新开栈，两个对象指向不同的地址