## Set 与 Map

`Set`是一种叫做集合的数据结构，`Map`是一种叫做字典的数据结构

- 集合
  是由一堆无序的、相关联的，且不重复的内存结构【数学中称为元素】组成的组合
- 字典
  是一些元素的集合。每个元素有一个称作key 的域，不同元素的key 各不相同

### Set

#### 基本语法

```js
const s = new Set();
s.add(1);
s.add(2);
s.add(3);

const returnValue = s.delete(1); // 删除成功返回 true，删除失败返回 false

// has 判断是否有具体值
s.has(1);// false
s.has(2);// true

s.clear(); //会清空整个 set

console.log(s); // Set(0) {size: 0}
```

#### 循环遍历 Set 数据

```js
let set = new Set(['red', 'green', 'blue']);

for (let item of set.keys()) {
  console.log(item);
}
// red
// green
// blue
for (let item of set.values()) {
  console.log(item);
}
// red
// green
// blue
for (let item of set.entries()) {
  console.log(item);
}
// ["red", "red"]
// ["green", "green"]
// ["blue", "blue"]

// 使用 forEach 来进行循环
let set = new Set([1, 4, 9]);
set.forEach((value, key) => console.log(key + ' : ' + value))
// 1 : 1
// 4 : 4
// 9 : 9
```

#### 常见用法：

``` js
// 1.数组去重
let arr = [3, 5, 2, 2, 5, 5];
let unique = [...new Set(arr)]; // [3, 5, 2]

// 字符串去重
// 字符串
let str = "352255";
let unique = [...new Set(str)].join(""); // "352"

// 集合操作
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);

// 并集
let union = new Set([...a, ...b]);
// Set {1, 2, 3, 4}

// 交集
let intersect = new Set([...a].filter(x => b.has(x)));
// set {2, 3}

// （a 相对于 b 的）差集
let difference = new Set([...a].filter(x => !b.has(x)));
// Set {1}
```

### Map

#### 基本语法

```js
const m = new Map()

// set 添加
m.set("foo", 1);
m.set("bar", true);

// size 查看长度
m.size // 2

// get 通过键名获取值
m.get("foo");// 1

// has 检查值
m.has("fff"); // false
m.has("bar"); // true

const value = m.delete("foo"); // 删除 foo 键，删除成功返回 true，删除失败返回 false

m.clear() // 清楚所有成员


```

#### 循环遍历

```javascript
const map = new Map([
  ['F', 'no'],
  ['T',  'yes'],
]);

for (let key of map.keys()) {
  console.log(key);
}
// "F"
// "T"

for (let value of map.values()) {
  console.log(value);
}
// "no"
// "yes"

for (let item of map.entries()) {
  console.log(item[0], item[1]);
}
// "F" "no"
// "T" "yes"

// 或者
for (let [key, value] of map.entries()) {
  console.log(key, value);
}
// "F" "no"
// "T" "yes"

// 等同于使用map.entries()
for (let [key, value] of map) {
  console.log(key, value);
}
// "F" "no"
// "T" "yes"

map.forEach(function(value, key, map) {
  console.log("Key: %s, Value: %s", key, value);
});
```

#### Map 与 Object 的区别

##### 同名属性碰撞

对象其实就是在堆中开辟了一块内存，其实Map的键存的就是这块内存的地址，只要地址不一样，就是两个不同的键，这就解决了同名属性的碰撞问题，而传统的Object显然做不到这一点。

```js
let m = new Map()
m.set({},1)
m.set({},2)
m.set({},3) //每一次都是开辟新的堆内存作为键
console.log(m) //Map { {} => 1, {} => 2, {} => 3 }

let o = {}
o['a'] = 1
o['a'] = 2
o['a'] = 3

console.log(o) //{ a: 3 }
```

##### 可迭代，可用for...of遍历

```js
let cont = document.getElementById('cont')
let m = new Map()
m.set(cont, 'hello,world')//dom对象作为键
m.set(['username'],'jack')//数组作为键
m.set(true,1)//boolean类型作为键
//可以迭代
for(let val of m){
    console.log(val[0])//key
    console.log(val[1])//value

}
```

##### 可以获取数据长度

```js
let m = new Map()
m.set({a:1}, 'hello,world')//dom对象作为键
m.set(['username'],'jack')//数组作为键
m.set(true,1)//boolean类型作为键

console.log(m.size)//3
```

##### 有序性

```js
let cont = document.getElementById('cont')
let m = new Map()
m.set(cont, 'hello,world')//dom对象作为键
m.set(['username'],'jack')//数组作为键
m.set(true,1)//boolean类型作为键
//可以保持原有顺序打印
for(let [key,value] of m){
    console.log(key)

}

let obj = new Object()
obj['jack'] =  1
obj[0] = 2
obj[5] = 3
obj['tom'] = 4
//填入Object的元素key是自动按照字符串排序的，数字排在前面
for(let k in obj){
    console.log(k) // 0 5 jack tom
}
```

##### 可以扩展运算符展开

```js
let m = new Map()
m.set({a:1}, 'hello,world')//dom对象作为键
m.set(['username'],'jack')//数组作为键
m.set(true,1)//boolean类型作为键

console.log([...m])//可以展开为二维数组

let obj = new Object()
obj['jack'] =  1
obj[0] = 2
obj[5] = 3
obj['tom'] = 4
console.log([...obj])//TypeError: obj is not iterable
```

