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

  