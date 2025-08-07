## 实用类型 Utility Types

### `Awaited<Type>`

此类型用于模拟 `await` 函数中的操作，或在 `async` 上的 `.then()` 方法——具体来说，是它们递归地解包 `Promise` 的方式。

```ts
type A = Awaited<Promise<string>>;
    
// type A = string
 
type B = Awaited<Promise<Promise<number>>>;
    
// type B = number
 
type C = Awaited<boolean | Promise<number>>;
    
// type C = number | boolean
```

#### 实现原理

基于**条件类型**、**类型推断**（`infer`）和**递归展开**



```ts
type Awaited<T> =
  T extends null | undefined ? T : // 处理 null/undefined
  T extends object & { 
    then(onfulfilled: infer F, ...args: infer _): any 
  } ? // 检测 then 方法
    F extends ((value: infer V, ...args: infer _) => any) ? 
      Awaited<V> // 递归解包
      : never    // 非法 thenable
  : T; // 普通类型
```

- 首先判断 T 类型是不是 null 或 undefined，

  - 是 null 或者 undefined，就返回 T

  - 否，判断 T 是否是对象并且具有 `then(onfulfilled: infer F, ...args: infer _): any` 方法，用来判定是否是 PromiseLike（类似 `Promise` 的类型）
    - 如果 T 是 PromiseLink，则看看他的 onFulfilled 参数类型 F 是不是`((value: infer V, ...args: infer _) => any)`类型的函数
      - 是，将 value 参数的类型 V 传给 Awaited 递归解包
      - 否，返回 never 代表是一个非法的 thenable
    - 如果 T 不是 PromiseLike，则直接返回 T









### `Partial<Type>`

构建一个所有属性都设为可选的类型。这个工具将返回一个表示给定类型所有子集的类型。

```ts
interface Todo {
  title: string;
  description: string;
}
// fieldsToUpdate 只有 Todo 的一部分类型，作用是覆盖 Todo 的部分类型。
function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
  return { ...todo, ...fieldsToUpdate };
}
 
const todo1 = {
  title: "organize desk",
  description: "clear clutter",
};
 
const todo2 = updateTodo(todo1, {
  description: "throw out trash",
});


```

#### 实现原理

一个内置工具类型，用于将指定类型 `Type` 的所有属性变为**可选属性**。其实现原理基于 TypeScript 的**映射类型（Mapped Types）** 和 **索引类型（Index Types）**。

通过 `in` 操作符遍历属性，实现批量转换，避免手动声明每个可选属性。

```ts
type Partial<T> = {
  [P in keyof T]?: T[P];
};
```

- **keyof T**：获取类型 T 的所有属性名组成的联合类型（例如 User 类型对应 "id" | "name" | "age"）。
- **[P in keyof T]**：遍历 T 的每一个属性名 P，相当于对每个属性进行映射。
- **?: T[P]**：为每个属性添加 ? 修饰符，使其变为可选属性，同时保留其原始类型 T[P]

> 注意⚠️：
>
> **非对象类型**：若 `T` 不是对象类型（如 `string`），`keyof T` 返回 `never`，生成空对象类型 `{}`
>
> **严格空检查**：开启 `strictNullChecks` 时，未赋值的可选属性类型为 `T[P] | undefined`
>
> **嵌套对象**：`Partial` 仅处理第一层属性，不递归深层对象（需自定义 `DeepPartial`）
>
> ```ts
> type DeepPartial<T> = {
>   [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
> };
> ```
>
> 





### `Required<Type>`

构建一个所有属性都设为必填的类型。它是 `Partial` 的相反数。

```ts
interface Props {
  a?: number;
  b?: string;
}
 
const obj: Props = { a: 5 };
 
const obj2: Required<Props> = { a: 5 }; // Property 'b' is missing in type '{ a: number; }' but required in type 'Required<Props>'.
```

若 `T` 是联合类型（如 `A | B`），`Required<T>` 会分发到每个成员，等价于 `Required<A> | Required<B>`



#### 实现原理

实现原理基于 TypeScript 的**映射类型（Mapped Types）** 和**修饰符操作**

```ts
type Required<T> = {
  [P in keyof T]-?: T[P];
};
```

- **`keyof T`**：获取类型 `T` 的所有属性名组成的联合类型（如 `{ a?: number; b: string }` → `"a" | "b"`）。
- **`[P in keyof T]`**：遍历 `T` 的每个属性名 `P`，生成新属性。
- **`-?:`**：核心操作符，**移除属性的可选修饰符 `?`**，使其变为必选属性
- **`T[P]`**：保留属性 `P` 的原始类型（索引访问类型）。

> `-?` 是 TypeScript 2.8 引入的语法，专用于**移除可选修饰符**（`?`）
>
> 类似操作符还有 `-readonly`（移除只读修饰符）和 `+?`（添加可选修饰符，可省略为 `?`）

`Required` 仅处理顶层属性，不递归嵌套对象（需自定义 `DeepRequired`）

```ts
type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
};
```





### `Readonly<Type>`

构建一个所有属性都设置为 `readonly` 的类型 `Type` ，这意味着构建的类型中的属性不能重新赋值。

```ts
interface Todo {
  title: string;
}
 
const todo: Readonly<Todo> = { // 要求类型 Todo 里面的必须只能读取
  title: "Delete inactive users",
};
 
todo.title = "Hello"; // 修改报错
// Cannot assign to 'title' because it is a read-only property.
```

一般用于`Object.freeze`对数据进行处理之后，将类型设置为 Readonly

```ts
function freeze<Type>(obj: Type): Readonly<Type>;
```

#### 实现原理

将指定类型 `Type` 的所有属性标记为**只读**（readonly），确保对象创建后属性不可修改。其实现原理基于 **映射类型（Mapped Types）** 和 **索引类型（Index Types）**

```ts
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
```

- **keyof T**：获取类型 T 的所有属性名组成的联合类型（如 User 类型对应 "id" | "name" | "age"）。
- **[P in keyof T]**：遍历 T 的每一个属性名 P，生成新的属性映射。
- **readonly 修饰符**：为每个属性添加 readonly 标记，使其不可重新赋值。
- **T[P]**：保留原属性 P 的类型（如 T["name"] 为 string）





### `Record<Keys, Type>`

构建一个对象类型，其属性键为 `Keys` ，属性值为 `Type` 。此工具可用于将一个类型的属性映射到另一个类型。

```ts
type CatName = "miffy" | "boris" | "mordred";
 
interface CatInfo {
  age: number;
  breed: string;
}
// 创建一个 key 为 CatName 类型，value 为 CatInfo 类型的对象
const cats: Record<CatName, CatInfo> = {
  miffy: { age: 10, breed: "Persian" },
  boris: { age: 5, breed: "Maine Coon" },
  mordred: { age: 16, breed: "British Shorthair" },
};
 
cats.boris;
```

#### 实现原理

实现原理基于 **泛型约束** 和 **映射类型**

```ts
type Record<K extends keyof any, T> = {
    [P in K]: T;
};
```

**泛型约束 `K extends keyof any`**  

- `keyof any` 表示所有合法的对象键类型，即 `string | number | symbol` 的联合类型
- 约束 `K` 必须是这三种类型之一或其子类型（如字面量联合类型 `'id' | 'name'`），否则触发类型错误

**映射类型 `[P in K]: T`** 

- 遍历 `K` 中的每个键 `P`，生成一个属性名为 `P`、属性值为 `T` 的对象类型
- 若 `K` 是联合类型（如 `'a' | 'b'`），则生成的类型包含所有联合成员作为必填键



### `Pick<Type, Keys>`

通过从 `Type` 中选择一部分 `Keys` （字面量字符串或字面量字符串的联合）来构造一个类型。

```ts
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}
 
type TodoPreview = Pick<Todo, "title" | "completed">;
 
const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
};
 
todo;
```

#### 实现原理

核心实现原理基于 **映射类型（Mapped Types）** 和 **泛型约束**

```ts
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};
```

- **T**：源类型（需为对象类型）。
- **K extends keyof T**：约束 K 必须是 T 的键组成的联合类型（如 "name" | "age"），确保属性名合法。
- **[P in K]**：遍历联合类型 K 中的每个属性名 P，类似循环迭代。
- **T[P]**：获取源类型 T 中属性 P 的类型（索引访问类型）







### `Omit<Type, Keys>`

通过从 `Type` 中选取所有属性，然后排除 `Keys` （字面量字符串或字面量字符串的联合）来构造一个类型。它是 `Pick` 的相反数。

```ts
interface Todo {
  title: string;
  description: string;
  completed: boolean;
  createdAt: number;
}
 
type TodoPreview = Omit<Todo, "description">;
 
const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
  createdAt: 1615544252770,
};
 
todo;
 
const todo: TodoPreview
 
type TodoInfo = Omit<Todo, "completed" | "createdAt">;
 
const todoInfo: TodoInfo = {
  title: "Pick up kids",
  description: "Kindergarten closes at 5pm",
};
 
todoInfo;
```

#### 实现原理

实现原理基于 **映射类型（Mapped Types）** 和 **条件类型（Conditional Types）** 的组合，核心逻辑是“**先排除键，再挑选剩余属性**”

```ts
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
```

**T**：原始对象类型（如 interface User { id: number; name: string }）。
**K extends keyof any**：约束 K 为 string | number | symbol 的联合类型（即合法的对象键类型）。
**Exclude<keyof T, K>**：从 T 的所有键（keyof T）中排除 K 指定的键，返回剩余键的联合类型。
**Pick<T, ...>**：基于剩余键从 T 中挑选属性，生成新类型。







### `Exclude<UnionType, ExcludedMembers>`（取差集）

通过从联合类型 `UnionType` 中排除所有可分配给 `ExcludedMembers` 的联合成员来构建一个类型。

```ts
type T0 = Exclude<"a" | "b" | "c", "a">;
// type T0 = "b" | "c"

type T1 = Exclude<"a" | "b" | "c", "a" | "b">;
// type T1 = "c"

type T2 = Exclude<string | number | (() => void), Function>;
// type T2 = string | number

 
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; x: number }
  | { kind: "triangle"; x: number; y: number };
 
type T3 = Exclude<Shape, { kind: "circle" }>
// type T3 = {
//    kind: "square";
//    x: number;
// } | {
//    kind: "triangle";
//    x: number;
//    y: number;
// }
```

#### 实现原理

实现原理基于 **条件类型（Conditional Types）** 和 **分布式条件类型（Distributive Conditional Types）** 的特性。

```ts
type Exclude<T, U> = T extends U ? never : T;
```

- **T**：源联合类型（如 "a" | "b" | "c"）。
- **U**：需排除的类型（如 "a"）。
- **条件判断 T extends U ? never : T**

若 `T` 中的某个成员可赋值给 `U`，则返回 `never`（表示排除）；否则保留该成员。

#### 分布式条件类型

当 `T` 是联合类型时，TypeScript 会将条件类型**自动分发**到每个成员上

```ts
type Result = Exclude<"a" | "b" | "c", "a">;
```

等价于：

```ts
type Result = 
  | ("a" extends "a" ? never : "a") 
  | ("b" extends "a" ? never : "b") 
  | ("c" extends "a" ? never : "c");
```



### `Extract<Type, Union>`（取交集）

通过从 `Type` 中提取所有可分配给 `Union` 的联合成员来构建一个类型。

```ts
type T0 = Extract<"a" | "b" | "c", "a" | "f">; // 取交集  
// type T0 = "a"

type T1 = Extract<string | number | (() => void), Function>;     
// type T1 = () => void

type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; x: number }
  | { kind: "triangle"; x: number; y: number };
 
type T2 = Extract<Shape, { kind: "circle" }>
     
// type T2 = {
//     kind: "circle";
//     radius: number;
// }
```

#### 实现原理

核心原理基于**条件类型分发机制**

```ts
type Extract<T, U> = T extends U ? T : never;
```

若 `T` 是联合类型（如 `A | B | C`），TypeScript 会自动将条件类型**分发**到每个成员上，等价于：

```ts
type Result = 
(A extends U ? A : never) | 
(B extends U ? B : never) | 
(C extends U ? C : never)
```

#### 案例

##### 精确过滤联合类型

```ts
type Status = "success" | "error" | "pending" | 404;
type StringStatus = Extract<Status, string>; // "success" | "error" | "pending"
```

##### 提取函数签名

```ts
type Fn = (() => void) | string | { call: () => void };
type Callable = Extract<Fn, Function>; // () => void
```

##### 结合映射类型实现高级操作

```ts
// 提取对象中值为函数的属性
type FunctionKeys<T> = Extract<keyof T, { [K in keyof T]: T[K] extends Function ? K : never }[keyof T]>;
```











### `NonNullable<Type>`

通过从 `Type` 中排除 `null` 和 `undefined` 来构造一个类型。

```ts
type T0 = NonNullable<string | number | undefined>;     
// type T0 = string | number

type T1 = NonNullable<string[] | null | undefined>;     
// type T1 = string[]
```

### `Parameters<Type>`（取函数参数类型）

从函数类型 `Type` 的参数中使用的类型构造一个元组类型。

```ts
type T0 = Parameters<() => string>; // 获取函数的参数类型     
// type T0 = []

type T1 = Parameters<(s: string) => void>;     
// type T1 = [s: string]

type T2 = Parameters<<T>(arg: T) => T>;     
// type T2 = [arg: unknown]

declare function f1(arg: { a: number; b: string }): void;
type T3 = Parameters<typeof f1>;     
// type T3 = [arg: {
//     a: number;
//     b: string;
// }]

type T4 = Parameters<any>;     
// type T4 = unknown[]

type T5 = Parameters<never>;     
// type T5 = never

type T6 = Parameters<string>;
// Type 'string' does not satisfy the constraint '(...args: any) => any'.
// type T6 = never
           
type T7 = Parameters<Function>;
// Type 'Function' does not satisfy the constraint '(...args: any) => any'.
//Type 'Function' provides no match for the signature '(...args: any): any'.  
// type T7 = never              
```

#### 实现原理

实现原理基于 **条件类型（Conditional Types）** 和 **类型推断（`infer` 关键字）**

```ts
type Parameters<T extends (...args: any) => any> = 
  T extends (...args: infer P) => any ? P : never;
```

**泛型约束 `T extends (...args: any) => any`**，作用是要求 `T` 必须是函数类型（接受任意参数，返回任意类型）。

`T extends (...args: infer P) => any`：检查 `T` 是否为函数类型，若是则通过 `infer P` 捕获其参数类型到变量 `P` 中

#### 案例

##### 函数参数动态提取

```ts
function fetchData(url: string, config: { timeout: number }) { /* ... */ }
type FetchParams = Parameters<typeof fetchData>; // [url: string, config: { timeout: number }]
```

##### API 接口设计

```ts
type Handler = (req: Request, res: Response) => void;
type HandlerParams = Parameters<Handler>; // [req: Request, res: Response]
```

##### 函数组合与柯里化

```ts
const curry = <T extends (...args: any[]) => any>(fn: T) => {
  return (...args: Parameters<T>) => fn(...args);
};
```







### `ConstructorParameters<Type>`（取构造函数参数类型）

从构造函数类型中构建一个元组或数组类型。它产生一个包含所有参数类型的元组类型（如果 `Type` 不是函数，则产生类型 `never` ）。

```ts
class C {
  constructor(a: number, b: string) {}
}
type T3 = ConstructorParameters<typeof C>;
     
// type T3 = [a: number, b: string]
```

### `ReturnType<Type>`（取函数返回值类型）

构建一个由函数 `Type` 的返回类型组成的类型。

```ts
type T0 = ReturnType<() => string>;     
// type T0 = string

type T1 = ReturnType<(s: string) => void>;     
// type T1 = void

type T2 = ReturnType<<T>() => T>;     
// type T2 = unknown

type T3 = ReturnType<<T extends U, U extends number[]>() => T>;  
// type T3 = number[]

declare function f1(): { a: number; b: string };
type T4 = ReturnType<typeof f1>;    
// type T4 = {
//     a: number;
//     b: string;
// }

type T5 = ReturnType<any>;     
// type T5 = any
                     
type T6 = ReturnType<never>;     
// type T6 = never

type T7 = ReturnType<string>;
// Type 'string' does not satisfy the constraint '(...args: any) => any'.  
// type T7 = any

```

#### 实现原理

基于**条件类型**（Conditional Types）和**类型推断**（`infer` 关键字）实现。

```ts
type ReturnType<T extends (...args: unknown[]) => unknown> = 
  T extends (...args: unknown[]) => infer R ? R : never;
```

- 首先进行类型约束，确认 T 是一个函数类型
- 其次通过 infer 推断返回值 R 类型，如果有推断结果，则返回 R 类型，如果没有则返回 never







### `InstanceType<Type>`（取实例对象的类型）

构建一个由 `Type` 中的构造函数的实例类型组成的类型。

```ts
class C {
  x = 0;
  y = 0;
}
 
type T0 = InstanceType<typeof C>;     
//type T0 = C
                       
type T1 = InstanceType<any>;     
// type T1 = any
                       
type T2 = InstanceType<never>;
// type T2 = never
                       
type T3 = InstanceType<string>;
// Type 'string' does not satisfy the constraint 'abstract new (...args: any) => any'.  
// type T3 = any
```

#### 实现原理

实现原理基于 TypeScript 的**类型推断**和**条件类型机制**

```ts
type InstanceType<T extends abstract new (...args: any) => any> =
  T extends abstract new (...args: any) => infer R ? R : any;
```

**泛型约束** `T extends abstract new (...args: any) => any`

- 约束 `T` 必须是一个**构造函数类型**（即可以通过 `new` 调用的函数）
- `abstract` 关键字支持抽象类

**条件类型与 `infer` 推断 ** `T extends abstract new (...args: any) => infer R ? R : any`

- 通过条件类型判断 T 是否符合构造函数签名。
- 若符合，则用 infer R **捕获构造函数返回的实例类型 R**（即 new T() 的结果类型）。
- 若 T 不是构造函数，返回 any（兜底类型）







### `NoInfer<Type>`

阻止对包含类型的推断。除了阻止推断之外， `NoInfer<Type>` 与 `Type` 完全相同。

```ts
// 第一个参数时 C 类型的数组，第二个参数要求一定不是 C 类型的
function createStreetLight<C extends string>(
  colors: C[],
  defaultColor?: NoInfer<C>,
) {
  // ...
}
createStreetLight(["red", "yellow", "green"], "red");  // OK
createStreetLight(["red", "yellow", "green"], "blue");  // Error
```

### `ThisParameterType<Type>`

提取函数类型中 this 参数的类型，如果函数类型没有 `this` 参数，则为 unknown

```ts
function toHex(this: Number) {
  return this.toString(16);
}
 
function numberToString(n: ThisParameterType<typeof toHex>) {
  return toHex.apply(n);
}
```

### `OmitThisParameter<Type>`

从 `Type` 中移除 `this` 参数。如果 `Type` 没有显式声明的 `this` 参数，结果就是 `Type` 。否则，会从 `Type` 创建一个没有 `this` 参数的新函数类型。泛型会被擦除，只有最后一个重载签名会被传播到新的函数类型中

```ts
function toHex(this: Number) {
  return this.toString(16);
}
 
const fiveToHex: OmitThisParameter<typeof toHex> = toHex.bind(5);
 
console.log(fiveToHex());
```

### `ThisType<Type>`

这个工具不会返回一个转换后的类型。相反，它作为上下文类型的一个标记。请注意，必须启用 `noImplicitThis` 标志才能使用这个工具。

```ts
type ObjectDescriptor<D, M> = {
  data?: D;
  methods?: M & ThisType<D & M>; // Type of 'this' in methods is D & M
};
 
function makeObject<D, M>(desc: ObjectDescriptor<D, M>): D & M {
  let data: object = desc.data || {};
  let methods: object = desc.methods || {};
  return { ...data, ...methods } as D & M;
}
 
let obj = makeObject({
  data: { x: 0, y: 0 },
  methods: {
    moveBy(dx: number, dy: number) {
      this.x += dx; // Strongly typed this
      this.y += dy; // Strongly typed this
    },
  },
});
 
obj.x = 10;
obj.y = 20;
obj.moveBy(5, 5);
```



