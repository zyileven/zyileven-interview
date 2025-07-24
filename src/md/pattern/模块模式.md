## Module Pattern 模块模式

随着应用程序和代码库的增长，保持代码的可维护性和独立性变得越来越重要。模块模式允许您将代码分割成更小的、可重用的部分。

除了能够将代码分割成更小的可重用片段之外，模块还允许您将文件中的某些值保持为私有。默认情况下，模块内的声明的范围（封装）到该模块。如果我们不显式导出某个值，则该值在该模块之外不可用。这降低了代码库其他部分中声明的值发生名称冲突的风险，因为这些值在全局范围内不可用。

定义一个math.js文件：

```js
const privateValue = "This is a value private to the module!";
export function add(x, y) {
  return x + y;
}
export function multiply(x) {
  return x * 2;
}
export function subtract(x, y) {
  return x - y;
}
export function square(x) {
  return x * x;
}
```

定义一个index.js文件：

```js
import { add, multiply, subtract, square } from "./math.js";
console.log(add(2, 3));
console.log(multiply(2));
console.log(subtract(2, 3));
console.log(square(2));
console.log(privateValue);// 报错：因为这个变量是 Math 私有的
```

这样按照文件来进行模块划分的方式在目前主流框架中体现为组件式分模块。