## Object 与 Map 的区别



### 一、对象的键只能是字符串和符号，而Map的键可以是任何值（包括：函数，对象，任何原始类型）

```js
const obj = {}; obj[1] = 'number'; // 实际存储键为字符串"1"

const map = new Map(); map.set({}, 'object_key'); // 对象直接作为键
```



### 二、Map中的键是有序的，而Object中的键是无序的

```js
const obj = {2: 'a', 1: 'b'}; 
Object.keys(obj) // 输出为 ["1", "2"]

const map = new Map(); 
map.set('2', 'a'); 
map.set('1', 'b'); 
// 获取键的迭代器 
const keysIterator = map.keys(); // 转换为数组（常用） 
const keysArray = Array.from(keysIterator); console.log(keysArray); // 输出: ['2', '1'] 
// 或直接遍历迭代器 
for (const key of keysIterator) {  
  console.log(key);// 依次输出: '2', '1'
}
```



### 三、快速获取Map的大小，而Object获取大小相对复杂

```js

const obj = {2: 'a', 1: 'b'}; 
Object.keys(obj).length // 2
const map = new Map(); 
map.set('2', 'a'); 
map.set('1', 'b'); 
map.size() // 2
```



### **四、Object不能直接迭代，而Map可以直接迭代**

```js
// 需通过for...in循环或Object.keys()获取键列表，再间接遍历值。
const obj = {2: 'a', 1: 'b'};
Object.keys(obj).map(item => {
    console.log(item);
}) // 输出 [2, 1]

// map
const map = new Map();
map.set('2', 'a');
map.set('1', 'b');
map.forEach((value, key) => console.log(key, value));
```

### 五、Object通过点语法或方括号访问属性，使用delete删除属性，map提供专用方法（set()/get()/has()/delete()）

```js
// Object
const obj = {};
obj.name = "张三"; // set
console.log(obj.name); // get 
delete obj.name // delete
console.log(obj); // {}

// Map
const map = new Map();
map.set('2', 'a'); // set
map.set('1', 'b');
console.log(map.get('2')); // get
console.log(map.has('2')); // find
map.delete('2') // delete
console.log(map) // Map(1) {'1' => 'b'}

```



### 六、Object可以直接JSON化，而Map需要转化为数组之后才能JSON化

```js
// Object
const obj = {}
JSON.stringify(obj)

// Map
const map = new Map();
map.set('2', 'a');
map.set('1', 'b');
const arr = Array.from(map)
JSON.stringify(arr)
```
