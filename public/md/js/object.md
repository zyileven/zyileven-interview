## Object 的方法

### 一、创建对象的方法

#### Object.create(proto, [properties])

基于指定原型创建新对象，可添加属性描述符（如是否可写、可枚举）

```ts
const personProto = { 
  greet() { 
    console.log(`Hello, ${this.name}!`);
  } 
};
const john = Object.create(personProto, {
  name: { value: "John", writable: true }
});
john.greet(); // 输出：Hello, John!
```

#### Object.fromEntries(entries)

将键值对数组（如 `[['a', 1], ['b', 2]]`）转换为对象

```ts
const entries = [['name', 'Alice'], ['age', 25]];
const obj = Object.fromEntries(entries);
console.log(obj); // { name: "Alice", age: 25 }
```

### 二、属性操作与检测

#### Object.keys(obj) / Object.values(obj) / Object.entries(obj)

- keys()：返回对象自身可枚举属性名的数组。
- values()：返回属性值的数组。
- entries()：返回 [key, value] 数组

```ts
const user = { name: "Bob", age: 30 };
console.log(Object.keys(user));    // ["name", "age"]
console.log(Object.values(user)); // ["Bob", 30]
console.log(Object.entries(user)); // [["name", "Bob"], ["age", 30]]
```

#### Object.hasOwn(obj, prop) / obj.hasOwnProperty(prop)

检查属性是否为对象**自身属性**（非继承）

> `hasOwn()` 是 ES2022 新方法，避免 `hasOwnProperty` 被重写风险。

```ts
const car = { brand: "Toyota" };
console.log(Object.hasOwn(car, "brand")); // true
console.log("toString" in car);           // true (继承属性)
console.log(Object.hasOwn(car, "toString")); // false
```

### 三、原型与继承操作

#### Object.getPrototypeOf(obj)

返回对象的原型（等价于旧版 `obj.__proto__`）

```ts
const arr = [];
console.log(Object.getPrototypeOf(arr) === Array.prototype); // true
```

#### Object.setPrototypeOf(obj, proto)

动态设置对象的原型（性能敏感场景慎用）

```ts
const animal = { eat() { console.log("Eating...") } };
const dog = {};
Object.setPrototypeOf(dog, animal);
dog.eat(); // 输出：Eating...
```

### 四、对象状态控制

#### Object.freeze(obj) / Object.isFrozen(obj)

**冻结对象**：禁止增/删/改属性（嵌套对象不受影响）

`isFrozen()` 检查冻结状态

```ts
const obj = { score: 90 };
Object.freeze(obj);
obj.score = 100; // 静默失败（严格模式报错）
console.log(Object.isFrozen(obj)); // true
```

#### Object.seal(obj) / Object.isSealed(obj)

**密封对象**：禁止增/删属性，但允许修改现有属性的**值**

isSealed()：检查密封状态

```ts
const obj = { x: 1 };
Object.seal(obj);
delete obj.x; // 失败
obj.x = 2;    // 成功
```

#### Object.preventExtensions(obj) / Object.isExtensible(obj)

禁止添加新属性，但允许修改或删除现有属性

```ts
const obj = { a: 1 };
Object.preventExtensions(obj);
obj.b = 2; // 失败
console.log(Object.isExtensible(obj)); // false
```

### 五、对象复制与合并

#### Object.assign(target, ...sources)

合并多个对象的**可枚举自身属性**到目标对象（浅拷贝）

```ts
const target = { a: 1 };
const source = { b: 2 };
const result = Object.assign(target, source);
console.log(result); // { a: 1, b: 2 }
```

**深拷贝替代方案**

```ts
// JSON 法
const deepCopy = JSON.parse(JSON.stringify(obj)) //（不支持函数、循环引用）
// 递归冻结
function deepFreeze(obj) {
  Object.freeze(obj);
  Object.keys(obj).forEach(key => {
    if (typeof obj[key] === "object") deepFreeze(obj[key]);
  });
}
```

### 六、属性描述符操作

#### Object.defineProperty(obj, prop, descriptor)

精细控制属性行为（可写性、可枚举性等）

可控制的属性有：

value：值，可以是任何JavaScript数据类型，包括原始值和对象

enumerable：决定了该属性是否会在使用`for...in`循环或者`Object.keys()`等方法进行属性枚举时被列出

writable：决定了属性的值是否可以被修改

configurable：决定了属性是否可以被删除，以及属性的描述符是否可以被修改

```ts
const obj = {};
Object.defineProperty(obj, "secret", {
  value: "123",
  enumerable: false // 不可被 for-in 遍历
});
console.log(Object.keys(obj)); // []（空）
```

#### Object.getOwnPropertyDescriptor(obj, prop)

获取属性描述符（如 `configurable`、`writable`）

```ts
const desc = Object.getOwnPropertyDescriptor(Math, "PI");
console.log(desc.writable); // false（PI 只读）
```

### 七、其他实用方法

#### Object.is(value1, value2)

比 `===` 更严格的相等判断（`NaN === NaN` 返回 `true`，`0 === -0` 返回 `false`）

```ts
console.log(Object.is(NaN, NaN)); // true
console.log(0 === -0);            // true
console.log(Object.is(0, -0));    // false
```

#### Object.groupBy(array, callback)

ES2024 提案方法，按回调返回值分组对象（兼容性需注意）

```ts
const students = [
  { name: "Alice", grade: "A" }, 
  { name: "Bob", grade: "B" }
];
const grouped = Object.groupBy(students, s => s.grade);
// { A: [{...}], B: [{...}] }
```





































































