# 数组方法

## 增删改查方法

### 增

- push
- unshift
- splice
- concat

#### `push()`在数组最后添加

方法接收任意数量的参数，并将它们添加到数组末尾，返回数组的最新长度

```js
let colors = []; // 创建一个数组
let count = colors.push("red", "green"); // 推入两项
console.log(count) // 2
console.log(colors) // ["red", "green"]
```

#### `unshift()`在数组最前面天添加

在数组开头添加任意多个值，然后返回新的数组长度

```js
let colors = new Array(); // 创建一个数组
let count = colors.unshift("red", "green"); // 从数组开头推入两项
alert(count); // 2
```

#### `splice`在特定位置添加多个元素

传入三个参数，分别是**开始位置**、0（**要删除的元素数量**）、**插入的元素**，返回空数组

```js
let colors = ["red", "green", "blue"];
let removed = colors.splice(1, 0, "yellow", "orange")
console.log(colors) // red,yellow,orange,green,blue
console.log(removed) // []
```

#### `contact` 在数组最后添加

首先会创建一个当前数组的副本，然后再把它的参数添加到副本末尾，最后返回这个新构建的数组，不会影响原始数组。

⚠️注意：<span style="color: red">不变更原来的数组</span>

```js
let colors = ["red", "green", "blue"];
let colors2 = colors.concat("yellow", ["black", "brown"]);
console.log(colors); // ["red", "green","blue"]
console.log(colors2); // ["red", "green", "blue", "yellow", "black", "brown"]
```

### 删

- pop
- shitf
- splice
- slice

#### `pop()` 删除最后一个

方法用于删除数组的最后一项，同时减少数组的`length` 值，返回被删除的项

```js
let colors = ["red", "green"]
let item = colors.pop(); // 取得最后一项
console.log(item) // green
console.log(colors.length) // 1
```

#### `shift()`删除第一个

方法用于删除数组的第一项，同时减少数组的`length` 值，返回被删除的项

```js
let colors = ["red", "green"]
let item = colors.shift(); // 取得第一项
console.log(item) // red
console.log(colors.length) // 1
```

#### `splice`从指定位置开始删除特定元素

传入两个参数，分别是开始位置，删除元素的数量，返回包含删除元素的数组

```js
let colors = ["red", "green", "blue"];
let removed = colors.splice(0,1); // 删除第一项
console.log(colors); // green,blue
console.log(removed); // red，只有一个元素的数组
```

#### `slice()` 

用于创建一个包含原有数组中一个或多个元素的新数组，不会影响原始数组

```js
let colors = ["red", "green", "blue", "yellow", "purple"];
let colors2 = colors.slice(1);
let colors3 = colors.slice(1, 4);
console.log(colors)   // red,green,blue,yellow,purple
concole.log(colors2); // green,blue,yellow,purple
concole.log(colors3); // green,blue,yellow
```

### 改

- splice

#### `splice`

传入三个参数，分别是开始位置，要删除元素的数量，要插入的任意多个元素，返回删除元素的数组，对原数组产生影响

```js
let colors = ["red", "green", "blue"];
let removed = colors.splice(0,1); // 删除第一项
console.log(colors); // green,blue
console.log(removed); // red，只有一个元素的数组
```

### 查

- indexof
- includes
- find
- findLast

#### `indexof()` 

返回要查找的元素在数组中的位置，如果没找到则返回 -1

```js
let numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
numbers.indexOf(4) // 3
```

#### `lastIndexOf`

返回要查找的元素在数组中的最后位置，如果没找到则返回 -1

```js
let numbers = [1, 2, 3, 4, 5, 4, 4, 2, 1];
numbers.lastIndexOf(4) // 5
```

#### `includes()` 

返回要查找的元素在数组中的位置，找到返回`true`，否则`false`

```js
let numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
numbers.includes(4) // true
```

#### `find()` 

返回第一个匹配的元素

```js
const people = [
    {
        name: "Matt",
        age: 27
    },
    {
        name: "Nicholas",
        age: 29
    }
];
people.find((element, index, array) => element.age < 28) // // {name: "Matt", age: 27}
```

#### `findLast()`

返回最后匹配的元素

```js
const people = [
    {
        name: "Matt",
        age: 27
    },
    {
        name: "Nicholas",
        age: 29
    }
];
people.findLast((element, index, array) => element.age < 28) // // {name: "Matt", age: 27}
```

## 排序方法

#### `sort()` 

方法接受一个比较函数，用于判断哪个值应该排在前面

```js
function compare(value1, value2) {
    if (value1 < value2) {
        return -1;
    } else if (value1 > value2) {
        return 1;
    } else {
        return 0;
    }
}
let values = [0, 1, 5, 10, 15];
values.sort(compare);
alert(values); // 0,1,5,10,15
```

#### `reverse()` 

将数组元素方向反转

```js
let values = [1, 2, 3, 4, 5];
values.reverse();
alert(values); // 5,4,3,2,1
```

## 转换方法

- join

#### `join()` 

方法接收一个参数，即字符串分隔符，返回包含所有项的字符串

```js
let colors = ["red", "green", "blue"];
alert(colors.join(",")); // red,green,blue
alert(colors.join("||")); // red||green||blue
```

## 迭代方法

- some
- every
- map
- filter
- reduce
- reduceRight
- forEach

#### `some` 

对数组每一项都运行传入的测试函数，如果至少有1个元素返回 true ，则这个方法返回 true

```js
let numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
let someResult = numbers.some((item, index, array) => item > 2);
console.log(someResult) // true
```

#### `every` 

对数组每一项都运行传入的测试函数，如果所有元素都返回 true ，则这个方法才返回 true

```js
let numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
let everyResult = numbers.every((item, index, array) => item > 2);
console.log(everyResult) // false
```

#### `forEach` 

对数组每一项都运行传入的函数，没有返回值（一般用于按照数组顺序执行某些操作）

```js
let numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
numbers.forEach((item, index, array) => {
    // 执行某些操作
});
```

`map` 对数组每一项都运行传入的函数，返回由每次函数调用的结果构成的数组

```js
let numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
let mapResult = numbers.map((item, index, array) => item * 2);
console.log(mapResult) // 2,4,6,8,10,8,6,4,2
```

#### `filter` 

对数组每一项都运行传入的函数，函数返回 `true` 的项会组成数组之后返回

```js
let numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
let filterResult = numbers.filter((item, index, array) => item > 2);
console.log(filterResult); // 3,4,5,4,3
```

#### `reduce`

对数组中的每个元素按序执行一个提供的 **reducer** 函数，每一次运行 **reducer** 会将先前元素的计算结果作为参数传入，最后将其结果汇总为单个返回值。

```js
const array1 = [1, 2, 3, 4];

// 0 + 1 + 2 + 3 + 4
const initialValue = 0;
const sumWithInitial = array1.reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  initialValue,
);

console.log(sumWithInitial);
// Expected output: 10
```

#### `reduceRight`

倒序累加器

```js
const array1 = [
  [0, 1],
  [2, 3],
  [4, 5],
];

const result = array1.reduceRight((accumulator, currentValue) =>
  accumulator.concat(currentValue),
);

console.log(result);
// Expected output: Array [4, 5, 2, 3, 0, 1]
```









## 其他方法

`at`

根据索引索取元素的值

```js
const array = [5, 12, 8, 130, 44];
array.at(2) // 8
// 等价于
array[2] // 8
```



#### `keys`

返回一个新的数组迭代器对象，其中包含数组中每个索引的键

```js
const array1 = ['a', 'b', 'c'];
const iterator = array1.keys();

for (const key of iterator) {
  console.log(key);
}

// Expected output: 0
// Expected output: 1
// Expected output: 2
```

#### `values`

返回一个新的数组迭代器对象，该对象迭代数组中每个元素的值。

```js
const array1 = ['a', 'b', 'c'];
const iterator = array1.values();

for (const value of iterator) {
  console.log(value);
}

// Expected output: "a"
// Expected output: "b"
// Expected output: "c"
```



#### `fill`

用一个固定值填充一个数组中从起始索引（默认为 `0`）到终止索引（默认为 `array.length`）内的全部元素。它返回修改后的数组。

```js
const array1 = [1, 2, 3, 4];

// Fill with 0 from position 2 until position 4
console.log(array1.fill(0, 2, 4));
// Expected output: Array [1, 2, 0, 0]

// Fill with 5 from position 1
console.log(array1.fill(5, 1));
// Expected output: Array [1, 5, 5, 5]

console.log(array1.fill(6));
// Expected output: Array [6, 6, 6, 6]
```

#### `findIndex`

#### `findLastIndex`

#### `flat`

拆分嵌套数组

```js
const arr = [1, [2,3], 4];
const result = arr.flat(2) // [1,2,3,4]
```







