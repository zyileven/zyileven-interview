### 函数类型系统

#### 参数与返回值类型注解

```ts
function add(x: number, y: number): number { return x + y; } 
const greet = (name: string): void => console.log(`Hello, ${name}`); 
```

#### 可选参数

```ts
function createUser(name: string, age?: number) {...} [3,7] 
```

#### 默认参数

```ts
function log(message: string, level: string = "info") {...}
```

#### 剩余参数（Rest Parameters）

```ts
function sum(...nums: number[]): number {...} 
```

#### 函数重载

```ts
function getData(id: number): Data; 
function getData(name: string): Data[]; 
function getData(input: any): any {...} // 实现需兼容所有签名
```

