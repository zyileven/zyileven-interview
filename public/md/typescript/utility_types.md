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



