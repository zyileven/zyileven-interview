## 基础类型

### 原始类型

- number：包含整数、浮点数、Infinity、NaN。
- string：支持单引号、双引号及模板字符串。
- boolean：仅限 true/false。
- null/undefined：独立类型，需开启 strictNullChecks 严格检测。
- symbol：唯一标识符（ES6+）

```ts
type BaseType = {
	age: number;
  name: string;
  isActive: boolean;
  school?: string | null; // 可以是 null，也可以是 string，还可以是 undefined
  
}
```

### 对象与数组类型

- `number[]`：数字数组类型

  ```ts
  let arr1: number[] = [1, 2]; 
  ```

  

- `string[]`：字符串数组类型

  ```ts
  let arr1: string[] = ["a", "b"]; 
  ```

  

- `Array<string>`：字符串数组类型

  ```ts
  let arr1: Array<string> = ["a", "b"]; 
  ```

  

- `{name: string, age: number}`：对象类型

  ```ts
  let obj: {name: string, age: number} = {
    name: "zzz",
    age: 18
  }
  ```



- `Record<string, string | number>`：对象类型

  ```ts
  let obj: Record<string, string | number> = {
    name: "zzz",
    age: 18
  }
  ```

  

- `{name: string, age: number}[]`：对象数组类型

  ```ts
  let obj: {name: string, age: number}[] = [
    {
      name: "zzz",
      age: 18
    },
    {
      name: "xxx",
      age: 81
    }
  ]
  ```

  

- `[number, string]`：元组类型

  ```
  let tuple: [number, string] = [30, "Bob"]; // 严格匹配位置
  ```

  



### 特殊类型

- any：完全跳过类型检查，允许任意赋值和操作，但可能导致运行时错误

  ```ts
  let unsafe: any = "hello";
  unsafe = 42; // ✅ 允许
  unsafe.trim(); // ⚠️ 编译通过，但运行时可能崩溃！
  ```

  

- void：表示函数无有效返回值（默认返回 `undefined`）

  ```ts
  function logMessage(message: string): void {
      console.log(message); // 无 return
  }
  ```

  

- never：表示永不会发生的值，用于**彻底的类型收窄**和**防御性编程**

  ```ts
  type Shape = { kind: "circle"; radius: number } | { kind: "square"; side: number };
  function getArea(shape: Shape): number {
      switch (shape.kind) {
          case "circle": return Math.PI * shape.radius ** 2;
          case "square": return shape.side ** 2;
          default:
              const _exhaustive: never = shape; // ⚠️ 若新增 `Shape` 类型会报错！
              throw new Error("未处理的类型");
      }
  }
  ```

  

- unknown ：接受任意值，但必须通过**类型断言**或**类型守卫**收窄类型后才能操作

  ```ts
  let data: unknown = fetchExternalData();
  // 必须类型收窄！
  if (typeof data === "string") {
      data.toUpperCase(); // ✅ 安全操作
  }
  ```


### type 与 interface 的区别

**`interface`**接口

- **定义对象的结构**（如属性、方法、索引签名），强调“形状约束”
- 天然支持类实现（`implements`）和接口继承（`extends`），适合 OOP 模式

```ts
interface Person {
  name: string;
  greet(): void;
}
```

**`type`** 类型别名

- **为任意类型创建别名**，支持对象、联合类型、元组等，更强调“类型组合”
- 可定义原始类型、联合类型等非对象结构

```ts
type ID = string | number; // 联合类型
type Point = [number, number]; // 元组
```

#### 对比

1. interface 通过使用 extends 实现继承`（interface B extends A）`，而 type 使用合并符 &实现`（type B = A & {....}）`

2. interface支持同名接口自动合并，而 type 禁止重复声明

   ```ts
   interface User { name: string; }
   interface User { age: number; }
   // 合并后：{ name: string; age: number; }
   ```

   

3. interface 只能定义对象类型，不能定义单一类型如：string， number 等

   ```ts
   type name = "string"
   
   interface name {
     // ...
   }
   // interface无法定义单个变量的类型
   ```

   

4. interface 不支持映射类型，但是 type 可以，如`[K in keys]: T`

   - Keys 是一个联合类型（如 "name" | "age"）；

   - K in Keys 表示遍历 Keys 中的每个键；

   - T 是每个键对应的值类型（可基于原类型动态计算）。

     示例：

     ```ts
     type User = { name: string; age: number };
     type ReadonlyUser = { [K in keyof User]: User[K] }; // 生成只读版本
     // 结果：{ readonly name: string; readonly age: number }
     ```

     而 interface 只能静态定义属性，无法使用 `in` 遍历语法

     ```ts
     interface User { 
       name: string; 
       age: number; 
     }
     // ❌ 错误：Interface 不支持映射类型
     interface ReadonlyUser { 
       [K in keyof User]: User[K]; 
     }
     ```

     

5. Interface 实现元组与数组定义很复杂，而 type 定义简单（type Tuple = [number, string]）

#### 使用场景

- 定义对象结构（如 API 响应）：推荐使用interface（支持声明合并，扩展性强）
- 联合类型、元组、映射类型：推荐使用 type （语法更简洁，直接支持复杂组合）
- 类实现（`implements`）：推荐使用interface（更符合 OOP 范式，错误提示更清晰）
- 扩展第三方类型（添加新字段）：推荐使用interface（通过声明合并无缝扩展）
- 基本类型别名或函数类型：推荐使用 type（`interface` 无法直接定义（如 `type Handler = () => void`））

















