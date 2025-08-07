## Type Operate 类型操作



### keyof 类型运算符

`keyof` 运算符接受一个对象类型，并生成其键的字符串或数字字面量联合类型。以下类型 `P` 与 `type P = "x" | "y"` 相同：

```ts
type Point = { x: number; y: number };
type P = keyof Point;
```

如果类型具有 `string` 或 `number` 索引签名，`keyof` 将返回这些类型：

```ts
type Arrayish = { [n: number]: unknown };
type A = keyof Arrayish;
    
// type A = number
 
type Mapish = { [k: string]: boolean };
type M = keyof Mapish;
    
// type M = string | number
```

> 请注意，在这个示例中，`M` 是 `string | number` — 这是因为 JavaScript 对象键总是被强制转换为字符串，所以 `obj[0]` 总是与 `obj["0"]` 相同。

当与映射类型结合使用时，`keyof` 类型会变得特别有用，我们将在后面更多地学习映射类型。



### typeof 类型运算符

JavaScript 已经有一个可以在 *表达式* 上下文中使用的 `typeof` 运算符，用于获取内容的类型：

```ts
// Prints "string"
console.log(typeof "Hello world");
```

TypeScript 添加了一个可以在 *类型* 上下文中使用的 `typeof` 运算符，用于引用变量或属性的 *类型* ：

```ts
let s = "hello";
let n: typeof s;
// let n: string
```

这对于基本类型来说并不太有用，但与其他类型运算符结合使用时，你可以用 `typeof` 方便地表达许多模式。例如，让我们先从预定义类型 `ReturnType<T>` 开始看起。它接受一个 *函数类型* 并产生其返回类型：

```ts
type Predicate = (x: unknown) => boolean;
type K = ReturnType<Predicate>;
    
// type K = boolean

// 但是如果定义一个函数 f，并使用ReturnType
function f() {
  return { x: 10, y: 3 };
}
type P = ReturnType<f>;
// 'f' refers to a value, but is being used as a type here. Did you mean 'typeof f'?


// 应该改为：
type P = ReturnType<typeof f>;
```

记住值和类型不是一回事。要引用值 `f` 所具有的*类型* ，我们使用 `typeof`

TypeScript 有意限制了你可以使用 `typeof` 的表达式类型。

### Indexed Access Types 索引访问类型

我们可以使用一个*索引访问类型*来查找另一个类型上的特定属性：

```ts
type Person = { age: number; name: string; alive: boolean };
type Age = Person["age"];
     
// type Age = number
```

索引类型本身也是一个类型，因此我们可以使用联合类型、`keyof` 或其他类型：

```ts
type Person = { age: number; name: string; alive: boolean };
type I1 = Person["age" | "name"];
     
// type I1 = string | number
 
type I2 = Person[keyof Person];
     
// type I2 = string | number | boolean
 
type AliveOrName = "alive" | "name";
type I3 = Person[AliveOrName];
     
// type I3 = string | boolean
```

使用任意类型进行索引的另一个例子是使用 `number` 来获取数组元素的类型。我们可以将这个与 `typeof` 结合，方便地捕获数组字面量的元素类型：

```ts
const MyArray = [
  { name: "Alice", age: 15 },
  { name: "Bob", age: 23 },
  { name: "Eve", age: 38 },
];
 
type Person = typeof MyArray[number];
// type Person = {
//    name: string;
//    age: number;
// }

type Age = typeof MyArray[number]["age"];
// type Age = number

type Age2 = Person["age"];
// type Age2 = number

```

### Conditional Types条件类型

条件类型有助于描述输入类型和输出类型之间的关系。

```ts
interface Animal {
  live(): void;
}
interface Dog extends Animal {
  woof(): void;
}
 
type Example1 = Dog extends Animal ? number : string;
        
// type Example1 = number
 
type Example2 = RegExp extends Animal ? number : string;
        
// type Example2 = string
```

条件类型的形式有点像 JavaScript 中的条件表达式（ `condition ? trueExpression : falseExpression` ）

条件类型的强大之处在于与泛型一起使用

```ts
interface IdLabel {
  id: number /* some fields */;
}
interface NameLabel {
  name: string /* other fields */;
}
 
function createLabel(id: number): IdLabel;
function createLabel(name: string): NameLabel;
function createLabel(nameOrId: string | number): IdLabel | NameLabel;
function createLabel(nameOrId: string | number): IdLabel | NameLabel {
  throw "unimplemented";
}
```

上面的方法存在一些问题：

- 如果库在其 API 中反复需要做出相同的类型选择，这会变得繁琐。
- 我们必须创建三个重载：一个用于我们*确定*类型的情况（一个用于 `string`，一个用于 `number`），一个用于最通用的情况（接受 `string | number`）。对于 `createLabel` 可以处理的每种新类型，重载的数量都会呈指数级增长。

相反，我们可以将这种逻辑编码在一个条件类型中：

```ts
type NameOrId<T extends number | string> = T extends number
  ? IdLabel
  : NameLabel;
```

通常，条件类型中的检查会为我们提供一些新的信息。就像类型守卫可以让我们获得更具体的类型一样，条件类型的真分支会通过我们检查的类型进一步约束泛型。

```ts
type MessageOf<T extends { message: unknown }> = T["message"];
 
interface Email {
  message: string;
}
 
type EmailMessageContents = MessageOf<Email>;
// type EmailMessageContents = string
```

### Mapped Types映射类型

映射类型基于索引签名的语法构建，索引签名用于声明那些事先未声明的属性的类型：

```ts
type OnlyBoolsAndHorses = {
  [key: string]: boolean | Horse;
};
 
const conforms: OnlyBoolsAndHorses = {
  del: true,
  rodney: false,
};
```

映射类型是一种泛型，它使用 `PropertyKey` 的联合（通常通过 `keyof` 创建）来迭代键以创建类型：

```ts
type OptionsFlags<Type> = {
  [Property in keyof Type]: boolean;
};
```









































































































































































