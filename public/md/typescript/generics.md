## 泛型 Generics

TypeScript 中的泛型（Generics）是一种强大的类型工具，用于创建可重用、类型安全的代码组件。它通过类型参数化机制，允许在定义函数、接口、类时延迟指定具体类型，从而在保持类型约束的同时提升代码的灵活性和复用性。

### 泛型基础概念

#### 什么是泛型？

泛型允许在定义组件时使用类型变量（如 `T`、`U`），调用时再传入具体类型，避免重复代码并保留类型信息。

```ts
// 使用 any：丢失类型信息
function identity(arg: any): any { return arg; }

// 使用泛型：保留类型关联性
function identity<T>(arg: T): T { return arg; }

const str = identity<string>("hello"); // 显式指定
const num = identity(42);              // 推断为 number
```



### 泛型核心应用场景

#### 泛型函数

```ts
function logAndReturn<T>(arg: T): T {
    console.log(arg);
    return arg;
}
logAndReturn("Hi"); // T = string
logAndReturn(100);  // T = number
```

#### 泛型接口

```ts
interface KeyValuePair<K, V> {
    key: K;
    value: V;
}
const pair: KeyValuePair<string, number> = { key: "age", value: 30 };
```

#### 泛型类

```ts
class Box<T> {
    private value: T;
    constructor(initialValue: T) { this.value = initialValue; }
    getValue(): T { return this.value; }
}
const stringBox = new Box("hello"); // T = string
```

### 高级泛型技术

#### 泛型约束（`extends`）

```ts
interface Lengthwise { length: number; }
function logLength<T extends Lengthwise>(obj: T): void {
    console.log(obj.length); // 安全访问属性
}
logLength("abc"); // ✅ 字符串有 length
logLength(42);    // ❌ 报错
```

#### 多类型参数与默认类型

```ts
function toTuple<T, U>(first: T, second: U): [T, U] {
    return [first, second];
}

function createArray<T = number>(size: number, value: T): T[] { ... }
createArray(3, 5); // T 默认为 number
```

#### 工具类型与类型操作

```ts
type IsString<T> = T extends string ? "yes" : "no";
type A = IsString<"hello">; // "yes"

type Readonly<T> = { readonly [P in keyof T]: T[P] };
type Partial<T> = { [P in keyof T]?: T[P] };

```

### 实际应用示例

#### API 响应处理

```ts
interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
}
async function fetchData<T>(url: string): Promise<ApiResponse<T>> {
    // 请求逻辑...
}
const userData = await fetchData<User[]>("/api/users"); // data 为 User[] 类型
```

#### 集合操作

```ts
function mergeArrays<T>(arr1: T[], arr2: T[]): T[] {
    return [...arr1, ...arr2];
}
mergeArrays([1, 2], [3, 4]); // number[]
mergeArrays(["a"], ["b"]);   // string[]
```































































