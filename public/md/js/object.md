## Object 

### Object.assign

语法：Object.assign(targetObject, obj1, obj2, ...)

将 obj1 和 obj2 上的属性全部传递到 targetObject 中。

```js
const obj1 = { a: 1, b: 2};
const obj2 = { b: 3, c: 4}; 

Object.assign(targetObject, obj1, obj2);
targetObject 
// {
//  a: 1,
//  b: 3, 
//  c: 4
// }
```

### Object.defineProperty

**`Object.defineProperty()`** 静态方法会直接在一个对象上定义一个新属性，或修改其现有属性，并返回此对象。

#### 基本语法：

Object.defineProperty(obj, prop, descriptor)

`obj`

要定义属性的对象。

`prop`

一个字符串或 `Symbol`，指定了要定义或修改的属性键。

`descriptor`

要定义或修改的属性的描述符。主要有configurable，enumerable，value，writable 。

>
> `configurable`
>
> 当设置为 `false` 时，
>
> - 该属性的类型不能在数据属性和访问器属性之间更改，且
> - 该属性不可被删除，且
> - 其描述符的其他属性也不能被更改（但是，如果它是一个可写的数据描述符，则 `value` 可以被更改，`writable` 可以更改为 `false`）。
>
> 默认值为 `false`。
>
> `enumerable`
>
> 当且仅当该属性在对应对象的属性枚举中出现时，值为 `true`。**默认值为 `false`。**
>
> **数据描述符**还具有以下可选键值：
>
> `value`
>
> 与属性相关联的值。可以是任何有效的 JavaScript 值（数字、对象、函数等）。**默认值为 `undefined`。**
>
> `writable`
>
> 如果与属性相关联的值可以使用赋值运算符更改，则为 `true`。**默认值为 `false`。**

#### 案例：

```js
Object.defineProperty(object1, 'property1', {
  value: 42,
  writable: false,
  configurable: false,
  enumerable: false
});


obj.property1 = 42
// 等价于
Object.defineProperty(object1, 'property1', {
  value: 42,
});
```

