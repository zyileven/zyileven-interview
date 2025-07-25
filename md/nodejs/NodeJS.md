##### NodeJS

### 基本概念

`Node.js` 是一个开源与跨平台的 `JavaScript` 运行时环境

在浏览器外运行 V8 JavaScript 引擎（Google Chrome 的内核），利用事件驱动、非阻塞和异步输入输出模型等技术提高性能

`Node.js` 就是一个服务器端的、非阻塞式I/O的、事件驱动的`JavaScript`运行环境

#### 非阻塞异步

`Nodejs`采用了非阻塞型`I/O`机制，在做`I/O`操作的时候不会造成任何的阻塞，当完成之后，以事件的形式通知执行操作。

例如在执行了访问数据库的代码之后，将立即转而执行其后面的代码，把数据库返回结果的处理代码放在回调函数中，从而提高了程序的执行效率

> 形象理解：我路过水龙头，打开了水，然后去做别的事情了，当我听到水满溢出来的声音了，然后我去取水

#### 事件驱动

事件驱动就是当进来一个新的请求的时，请求将会被压入一个事件队列中，然后通过一个循环来检测队列中的事件状态变化，如果检测到有状态变化的事件，那么就执行该事件对应的处理代码，一般都是回调函数。

比如读取一个文件，文件读取完毕后，就会触发对应的状态，然后通过对应的回调函数来进行处理。

![img](https://raw.githubusercontent.com/zyileven/image-hosting-platform/master/src/2024/03/07/e1978073c54f78dee7e2083f6ac1c439-a7729590-c1e8-11eb-ab90-d9ae814b240d-3afc95.png)

#### Nodejs 的特点

- 善于`I/O`，不善于计算。因为Nodejs是一个单线程，如果计算（同步）太多，则会阻塞这个线程
- 大量并发的I/O，应用程序内部并不需要进行非常复杂的处理
- 与 websocket 配合，开发长连接的实时交互应用程序

具体场景可以表现为如下：

- 第一大类：用户表单收集系统、后台管理系统、实时交互系统、考试系统、联网软件、高并发量的web应用程序
- 第二大类：基于web、canvas等多人联网游戏
- 第三大类：基于web的多人实时聊天客户端、聊天室、图文直播
- 第四大类：单页面浏览器应用程序
- 第五大类：操作数据库、为前端和移动端提供基于`json`的API



### Nodejs 的全局对象

在浏览器 `JavaScript` 中，通常`window` 是全局对象， 而 `Nodejs`中的全局对象是 `global`。

所有的用户代码都是当前模块的，只在当前模块里可用，但可以通过`exports`对象的使用将其传递给模块外部。所以，在`NodeJS`中，用`var`声明的变量并不属于全局的变量，只在当前模块生效。

上述的`global`全局对象则在全局作用域中，任何全局变量、函数、对象都是该对象的一个属性值。

#### Class:Buffer

可以处理二进制以及非`Unicode`编码的数据

在`Buffer`类实例化中存储了原始数据。`Buffer`类似于一个整数数组，在V8堆原始存储空间给它分配了内存

一旦创建了`Buffer`实例，则无法改变大小

#### process

`process` 对象是一个全局变量，提供了有关当前 `Node.js`进程的信息并对其进行控制，作为一个全局变量。进程是计算机系统进行资源分配和调度的基本单位，是操作系统结构的基础，是线程的容器。

当我们启动一个`js`文件，实际就是开启了一个服务进程，每个进程都拥有自己的独立空间地址、数据栈，像另一个进程无法访问当前进程的变量、数据结构，只有数据通信后，进程之间才可以数据共享

> 由于`JavaScript`是一个单线程语言，所以通过`node xxx`启动一个文件后，只有一条主线程

关于`process`常见的属性有如下：

- process.env：环境变量，例如通过 `process.env.NODE_ENV 获取不同环境项目配置信息

- process.nextTick

  我们知道`NodeJs`是基于事件轮询，在这个过程中，同一时间只会处理一件事情

  在这种处理模式下，`process.nextTick()`就是定义出一个动作，并且让这个动作在下一个事件轮询的时间点上执行

  例如下面例子将一个`foo`函数在下一个时间点调用

  ```js
  function foo() {
      console.error('foo');
  }
  
  process.nextTick(foo);
  console.error('bar');
  
  // bar
  // foo
  ```

  process.nextTick() 会在这一次event loop 的 call stack 清空后，下一次event loop开始前，再调用callback

- process.pid：获取当前进程id

- process.ppid：当前进程对应的父进程

- process.cwd()：获取当前进程工作目录，

- process.platform：获取当前进程运行的操作系统平台

- process.uptime()：当前进程已运行时间，例如：pm2 守护进程的 uptime 值

- 进程事件： process.on(‘uncaughtException’,cb) 捕获异常信息、 process.on(‘exit’,cb）进程退出时的监听

- 三个标准流： process.stdout 标准输出、 process.stdin 标准输入、 process.stderr 标准错误输出

- process.title 指定进程名称，有的时候需要给进程指定一个名称

- process.argv 

- 在终端通过 Node 执行命令的时候，通过 `process.argv` 可以获取传入的命令行参数，返回值是一个数组：

  ​	0: Node 路径（一般用不到，直接忽略）

  ​	1: 被执行的 JS 文件路径（一般用不到，直接忽略）

  ​	2~n: 真实传入命令的参数

  ```js
  const args = process.argv.slice(2);
  ```

#### console

最常用的输出日志内容的方式：console.log("Hello world")

清空日志：console.clear();

打印栈：console.trace();

#### clearInterval、setInterval、clearTimeout、setTimeout

设置与清空定时器

#### global

全局命名空间对象，前面讲到的`process`、`console`、`setTimeout`等都有放到`global`中

### 模块局全局对象

这些全局对象是模块中的变量，只是每个模块都有，看起来就像全局变量，像在命令交互中是不可以使用，包括：

- __dirname
- __filename
- exports
- module
- require

#### __dirname

获取当前文件所在的路径，不包括后面的文件名

从 `/Users/xxx` 运行 `node example.js`：

```js
console.log(__dirname);
// 打印: /Users/xxx
```

#### __filename

获取当前文件所在的路径和文件名称，包括后面的文件名称

从 `/Users/mjr` 运行 `node example.js`：

```js
console.log(__filename);
// 打印: /Users/mjr/example.js
```

#### exports

`module.exports` 用于指定一个模块所导出的内容，即可以通过 `require()` 访问的内容

```js
exports.name = name;
exports.age = age;
exports.sayHello = sayHello;
```

#### module

对当前模块的引用，通过`module.exports` 用于指定一个模块所导出的内容，即可以通过 `require()` 访问的内容

#### require

用于引入模块、 `JSON`、或本地文件。 可以从 `node_modules` 引入模块。

可以使用相对路径引入本地模块或`JSON`文件，路径会根据`__dirname`定义的目录名或当前工作目录进行处理



### fs 模块

fs（filesystem），该模块提供本地文件的读写能力，基本上是`POSIX`文件操作命令的简单包装，可以说，所有与文件的操作都是通过`fs`核心模块实现

导入模块如下：

```js
const fs = require('fs');
```

这个模块对所有文件系统操作提供异步（不具有`sync` 后缀）和同步（具有 `sync` 后缀）两种操作方式，而供开发者选择

#### 权限位 mode

针对文件所有者、文件所属组、其他用户进行权限分配，其中类型又分成读、写和执行，具备权限位4、2、1，不具备权限为0。

![img](https://raw.githubusercontent.com/zyileven/image-hosting-platform/master/src/2024/03/07/60800a51e09ecfd5b6e786e8879ae3ae-4f4d41a0-c46b-11eb-ab90-d9ae814b240d-947727.png)

如在`linux`查看文件权限位：

```js
drwxr-xr-x 1 PandaShen 197121 0 Jun 28 14:41 core
-rw-r--r-- 1 PandaShen 197121 293 Jun 23 17:44 index.md
```

在开头前十位中，第一位是`d`表示文件夹，第一位是`-`表示文件，后九位就代表当前用户、用户所属组和其他用户的权限位，按每三位划分，分别代表读（r）、写（w）和执行（x），- 代表没有当前位对应的权限。

#### 标识位

标识位代表着对文件的操作方式，如可读、可写、即可读又可写等等，如下表所示：

| 符号 | 含义                                                     |
| ---- | -------------------------------------------------------- |
| r    | 读取文件，如果文件不存在则抛出异常。                     |
| r+   | 读取并写入文件，如果文件不存在则抛出异常。               |
| rs   | 读取并写入文件，指示操作系统绕开本地文件系统缓存。       |
| w    | 写入文件，文件不存在会被创建，存在则清空后写入。         |
| wx   | 写入文件，排它方式打开。                                 |
| w+   | 读取并写入文件，文件不存在则创建文件，存在则清空后写入。 |
| wx+  | 和 w+ 类似，排他方式打开。                               |
| a    | 追加写入，文件不存在则创建文件。                         |
| ax   | 与 a 类似，排他方式打开。                                |
| a+   | 读取并追加写入，不存在则创建。                           |
| ax+  | 与 a+ 类似，排他方式打开。                               |

#### 文件描述维 fd

操作系统会为每个打开的文件分配一个名为文件描述符的数值标识，文件操作使用这些文件描述符来识别与追踪每个特定的文件。

`Window`系统使用了一个不同但概念类似的机制来追踪资源，为方便用户，`NodeJS`抽象了不同操作系统间的差异，为所有打开的文件分配了数值的文件描述符

在 `NodeJS`中，每操作一个文件，文件描述符是递增的，文件描述符一般从 `3` 开始，因为前面有 `0`、`1`、`2`三个比较特殊的描述符，分别代表 `process.stdin`（标准输入）、`process.stdout`（标准输出）和 `process.stderr`（错误输出）



#### 文件读取

#####  fs.readFileSync(path, options)

同步读取，参数如下：

- 第一个参数为读取文件的路径或文件描述符
- 第二个参数为 options，默认值为 null，其中有 encoding（编码，默认为 null）和 flag（标识位，默认为 r），也可直接传入 encoding

```js
const fs = require("fs");

let buf = fs.readFileSync("1.txt");
let data = fs.readFileSync("1.txt", "utf8");

console.log(buf); // <Buffer 48 65 6c 6c 6f>
console.log(data); // Hello
```

##### fs.readFile()

异步读取方法 `readFile` 与 `readFileSync` 的前两个参数相同，最后一个参数为回调函数，函数内有两个参数 `err`（错误）和 `data`（数据），该方法没有返回值，回调函数在读取文件成功后执行

```js
const fs = require("fs");

fs.readFile("1.txt", "utf8", (err, data) => {
   if(!err){
       console.log(data); // Hello
   }
});
```

#### 文件写入

##### fs.writeFileSync

同步写入，有三个参数：

- 第一个参数为写入文件的路径或文件描述符
- 第二个参数为写入的数据，类型为 String 或 Buffer
- 第三个参数为 options，默认值为 null，其中有 encoding（编码，默认为 utf8）、 flag（标识位，默认为 w）和 mode（权限位，默认为 0o666），也可直接传入 encoding

```js
const fs = require("fs");

fs.writeFileSync("2.txt", "Hello world");
let data = fs.readFileSync("2.txt", "utf8");

console.log(data); // Hello world
```

##### writeFile

异步写入，`writeFile` 与 `writeFileSync` 的前三个参数相同，最后一个参数为回调函数，函数内有一个参数 `err`（错误），回调函数在文件写入数据成功后执行。

```js
const fs = require("fs");

fs.writeFile("2.txt", "Hello world", err => {
    if (!err) {
        fs.readFile("2.txt", "utf8", (err, data) => {
            console.log(data); // Hello world
        });
    }
});
```

#### 文件追加写入

##### fs.appendFileSync

参数如下：

- 第一个参数为写入文件的路径或文件描述符
- 第二个参数为写入的数据，类型为 String 或 Buffer
- 第三个参数为 options，默认值为 null，其中有 encoding（编码，默认为 utf8）、 flag（标识位，默认为 a）和 mode（权限位，默认为 0o666），也可直接传入 encoding

```js
const fs = require("fs");

fs.appendFileSync("3.txt", " world");
let data = fs.readFileSync("3.txt", "utf8");
```

##### fs.appendFile

异步追加写入方法 `appendFile` 与 `appendFileSync` 的前三个参数相同，最后一个参数为回调函数，函数内有一个参数 `err`（错误），回调函数在文件追加写入数据成功后执行

```js
const fs = require("fs");

fs.appendFile("3.txt", " world", err => {
    if (!err) {
        fs.readFile("3.txt", "utf8", (err, data) => {
            console.log(data); // Hello world
        });
    }
});
```

#### 文件拷贝

##### fs.copyFileSync

同步拷贝

```js
const fs = require("fs");

fs.copyFileSync("3.txt", "4.txt");
let data = fs.readFileSync("4.txt", "utf8");

console.log(data); // Hello world
```

##### copyFile

异步拷贝

```js
const fs = require("fs");

fs.copyFile("3.txt", "4.txt", () => {
    fs.readFile("4.txt", "utf8", (err, data) => {
        console.log(data); // Hello world
    });
});
```

#### 创建目录

##### fs.mkdirSync

同步创建，参数为一个目录的路径，没有返回值，在创建目录的过程中，必须保证传入的路径前面的文件目录都存在，否则会抛出异常。

```js
// 假设已经有了 a 文件夹和 a 下的 b 文件夹
fs.mkdirSync("a/b/c")
```

##### fs.mkdir

异步创建，第二个参数为回调函数

```js
fs.mkdir("a/b/c", err => {
    if (!err) console.log("创建成功");
});
```

### Buffer

在引入 TypedArray 之前，JavaScript 语言没有用于读取或操作二进制数据流的机制。 Buffer 类是作为 Node.js API 的一部分引入的，用于在 TCP 流、文件系统操作、以及其他上下文中与八位字节（8 位二进制）流进行交互。这是来自 Node.js 官网的一段描述，比较晦涩难懂，总结起来一句话 **Node.js 可以用来处理二进制流数据或者与之进行交互**。

Buffer 用于读取或操作二进制数据流，做为 Node.js API 的一部分使用时无需 require，用于操作网络协议、数据库、图片和文件 I/O 等一些需要大量二进制数据的场景。Buffer 在创建时大小已经被确定且是无法调整的，在内存分配这块 Buffer 是由 C++ 层面提供而不是 V8 具体后面会讲解。

> **公交车站乘车例子**
>
> 举一个公交车站乘车的例子，通常公交车会每隔几十分钟一趟，在这个时间到达之前就算站点的乘客已经满了，车辆也不会提前到达，早到的乘客就需要先在车站进行等待。假设到达的乘客过多，后到的一部分则需要在公交车站等待下一趟车驶来。
>
> 这个公交车站就等同于我们的 Buffer 缓冲区。我们不能控制乘客挤满公交站的速度，但是我们可以控制什么时候发车，对应到 Buffer 中就是：程序无法控制数据流到达的时间，只能决定何时发送数据。

#### Buffer.from(data, byteOffset, length) 

将一个字符串或数组转换为 Buffer对象。

```js
const b1 = Buffer.from('10');
const b2 = Buffer.from('10', 'utf8');
const b3 = Buffer.from([10]);
const b4 = Buffer.from(b3);

console.log(b1, b2, b3, b4); // <Buffer 31 30> <Buffer 31 30> <Buffer 0a> <Buffer 0a>
```

#### Buffer.alloc(size, fill)

创建一个指定`size`大小的新的 Buffer对象,并将其填充为 `fill`

```js
const bAlloc1 = Buffer.alloc(10); // 创建一个大小为 10 个字节的缓冲区
const bAlloc2 = Buffer.alloc(10, 1); // 建一个长度为 10 的 Buffer,其中全部填充了值为 `1` 的字节
console.log(bAlloc1); // <Buffer 00 00 00 00 00 00 00 00 00 00>
console.log(bAlloc2); // <Buffer 01 01 01 01 01 01 01 01 01 01>
```

#### Buffer.allocUnsafe(size, fill)

创建一个指定大小的新的 Buffer对象,并将其 filled with the specified fill value。和`alloc`方法不同的是,`allocUnsafe`方法不会自动初始化 Buffer对象的值,而是将其填充为`0x00`。

```js
const b1 = Buffer.alloc(10, "1"); 

const b2 = Buffer.allocUnsafe(10, "1");
console.log(b1); // <Buffer 31 31 31 31 31 31 31 31 31 31> 
console.log(b2); // <Buffer 00 00 00 00 00 00 00 00 00 00>
```

#### Buffer.isBuffer(obj)

判断一个对象是否为 Buffer对象。

```js
const b1 = Buffer.from('abc');
const b2 = "abc";
console.log(Buffer.isBuffer(b1)); // true
console.log(Buffer.isBuffer(b2)); // false
```

#### Buffer.prototype.copy(target[, targetStart[, sourceStart[, sourceEnd]]])

将一个 Buffer对象的一部分复制到另一个 Buffer对象中。

target：复制的目标

targetStart：复制的内从目标的 targetStart 位置开始插入

sourceStart：复制源的开始位置

sourceEnd：复制源的结束位置

```js
// Create two `Buffer` instances.
const buf1 = Buffer.allocUnsafe(26).fill("x");
const buf2 = Buffer.allocUnsafe(26).fill("!");

// 将 buf1 中 16 到 19 的内容复制到 buf2 中从 8 开始的位置
buf1.copy(buf2, 8, 16, 20);

console.log(buf1)
console.log(buf2)

console.log(buf2.toString("ascii", 0, 25)); // !!!!!!!!xxxx!!!!!!!!!!!!!

```



#### Buffer.prototype.includes(value, from, to)

判断一个 Buffer对象是否包含指定的 value。

```js
const buf = Buffer.from('this is a buffer');

console.log(buf.includes('this'));
// Prints: true
console.log(buf.includes('is'));
// Prints: true
console.log(buf.includes(Buffer.from('a buffer')));
// Prints: true
console.log(buf.includes(97));
// Prints: true (97 is the decimal ASCII value for 'a')
console.log(buf.includes(Buffer.from('a buffer example')));
// Prints: false
console.log(buf.includes(Buffer.from('a buffer example').slice(0, 8)));
// Prints: true
console.log(buf.includes('this', 4));
// Prints: false
```

#### Buffer.prototype.indexOf(value, from, to)

在一个 Buffer对象中查找 value,返回第一个匹配的位置。

```js
const buf = Buffer.from('this is a buffer');

console.log(buf.indexOf('this'));
// Prints: 0
console.log(buf.indexOf('is'));
// Prints: 2
console.log(buf.indexOf(Buffer.from('a buffer')));
// Prints: 8
console.log(buf.indexOf(97));
// Prints: 8 (97 is the decimal ASCII value for 'a')
console.log(buf.indexOf(Buffer.from('a buffer example')));
// Prints: -1
console.log(buf.indexOf(Buffer.from('a buffer example').slice(0, 8)));
// Prints: 8

const utf16Buffer = Buffer.from('\u039a\u0391\u03a3\u03a3\u0395', 'utf16le');

console.log(utf16Buffer.indexOf('\u03a3', 0, 'utf16le'));
// Prints: 4
console.log(utf16Buffer.indexOf('\u03a3', -4, 'utf16le'));
// Prints: 6
```

#### Buffer.prototype.subarray([start[, end]])

返回一个新的 Buffer对象,包含从 start到 end的子集。

```js
const buf1 = Buffer.allocUnsafe(26);

for (let i = 0; i < 26; i++) {
  // 97 is the decimal ASCII value for 'a'.
  buf1[i] = i + 97;
}

const buf2 = buf1.subarray(0, 3);

console.log(buf2.toString('ascii', 0, buf2.length));
// Prints: abc

buf1[0] = 33;

console.log(buf2.toString('ascii', 0, buf2.length));
// Prints: !bc
```

#### Buffer.prototype.toString(encoding)

encoding可选；

将一个 Buffer对象转换为字符串,使用指定的 encoding

```js
const buffer = Buffer.from("你好");
console.log(buffer);
// <Buffer e4 bd a0 e5 a5 bd>
const str = buffer.toString();
console.log(str);
// 你好
```

如果编码与解码不是相同的格式则会出现乱码的情况

```js
const buffer = Buffer.from("你好","utf-8 ");
console.log(buffer);
// <Buffer e4 bd a0 e5 a5 bd>
const str = buffer.toString("ascii");
console.log(str); 
// d= e%=
```

当设定的范围导致字符串被截断的时候，也会存在乱码情况

```js
const buf = Buffer.from('Node.js 技术栈', 'UTF-8');

console.log(buf)          // <Buffer 4e 6f 64 65 2e 6a 73 20 e6 8a 80 e6 9c af e6 a0 88>
console.log(buf.length)   // 17

console.log(buf.toString('UTF-8', 0, 9))  // Node.js �
console.log(buf.toString('UTF-8', 0, 11)) // Node.js 技
```

> 所支持的`byteOffset`字符集有如下：
>
> - ascii：仅支持 7 位 ASCII 数据，如果设置去掉高位的话，这种编码是非常快的
> - utf8：多字节编码的 Unicode 字符，许多网页和其他文档格式都使用 UTF-8
> - utf16le：2 或 4 个字节，小字节序编码的 Unicode 字符，支持代理对（U+10000至 U+10FFFF）
> - ucs2，utf16le 的别名
> - base64：Base64 编码
> - latin：一种把 Buffer 编码成一字节编码的字符串的方式
> - binary：latin1 的别名，
> - hex：将每个字节编码为两个十六进制字符



#### Buffer 的应用场景

##### I/O 操作

通过流的形式，将一个文件的内容读取到另外一个文件

```js
const fs = require('fs');

const inputStream = fs.createReadStream('input.txt'); // 创建可读流
const outputStream = fs.createWriteStream('output.txt'); // 创建可写流

inputStream.pipe(outputStream); // 管道读写
```

##### 加解密

在一些加解密算法中会遇到使用 `Buffer`，例如 `crypto.createCipheriv` 的第二个参数 `key` 为 `string` 或 `Buffer` 类型

##### zlib.js

`zlib.js` 为 `Node.js` 的核心库之一，其利用了缓冲区（`Buffer`）的功能来操作二进制数据流，提供了压缩或解压功能



### Stream 流

流（Stream），是一个数据传输手段，是端到端信息交换的一种方式，而且是有顺序的,是逐块读取数据、处理内容，用于顺序读取输入或写入输出。`Node.js`中很多对象都实现了流，其中流的基本单位是 buffer

流不像传统的程序那样一次将一个文件读入内存，而是逐块读取数据、处理其内容，而不是将其全部保存在内存中，流可以分成三部分：`source`（源）、`dest`（目的地）、`pipe`（管道）。

在`source`和`dest`之间有一个连接的管道`pipe`,它的基本语法是`source.pipe(dest)`，`source`和`dest`就是通过pipe连接，让数据从`source`流向了`dest`，如下图所示：

![img](https://raw.githubusercontent.com/zyileven/image-hosting-platform/master/src/2024/03/08/b080c17a96875cfca40b0bd7d0f078ff-aec05670-c76f-11eb-ab90-d9ae814b240d-bfd153.png)

在`NodeJS`，几乎所有的地方都使用到了流的概念，分成四个种类：

- 可写流：可写入数据的流。例如 `fs.createWriteStream()` 可以使用流将数据写入文件

  主要的特性有:

  - 它是可写流(Writable stream),可以通过pipe方法从可读流中接收数据并写入。
  - 通过 open 事件可以监听流的打开。
  - 通过 write 方法可以写入数据。
  - 通过 end 事件可以监听写入结束。
  - 通过 error 事件可以监听写入错误。

- 可读流：可读取数据的流。例如`fs.createReadStream()` 可以从文件读取内容

  主要的特性有:

  - 它是可读流(Readable stream),可以通过事件监听获取数据。
  - 通过pipe方法可以和其他流连接起来，比如：和一个写入流连接以实现文件复制。
  - 通过open事件可以监听流的打开。
  - 通过data事件可以获取读取的数据。
  - 通过end事件可以监听读取结束。
  - 通过error事件可以监听读取错误。

- 双工流：既可读又可写的流。例如 `net.Socket`

- 转换流：可以在数据写入和读取时修改或转换数据的流。例如，在文件压缩操作中，可以向文件写入压缩数据，并从文件中读取解压数据

在`NodeJS`中`HTTP`服务器模块中，`request` 是可读流，`response` 是可写流。还有`fs` 模块，能同时处理可读和可写文件流

可读流和可写流都是单向的，比较容易理解，而另外两个是双向的

#### 流的应用场景

##### get请求返回文件给客户端

使用`stream`流返回文件，`res`也是一个`stream`对象，通过`pipe`管道将文件数据返回

```js
const server = http.createServer(function (req, res) {
    const method = req.method; // 获取请求方法
    if (method === 'GET') { // get 请求
        const fileName = path.resolve(__dirname, 'data.txt');
        let stream = fs.createReadStream(fileName);
        stream.pipe(res); // 将 res 作为 stream 的 dest
      // 参见：inputStream.pipe(outputStream); // 管道读写
    }
});
server.listen(8000);
```

##### 文件操作

创建一个可读数据流`readStream`，一个可写数据流`writeStream`，通过`pipe`管道把数据流转过去

```js
const fs = require('fs')
const path = require('path')

// 两个文件名
const fileName1 = path.resolve(__dirname, 'data.txt')
const fileName2 = path.resolve(__dirname, 'data-bak.txt')
// 读取文件的 stream 对象
const readStream = fs.createReadStream(fileName1)
// 写入文件的 stream 对象
const writeStream = fs.createWriteStream(fileName2)
// 通过 pipe执行拷贝，数据流转
readStream.pipe(writeStream)
// 数据读取完成监听，即拷贝完成
readStream.on('end', function () {
    console.log('拷贝完成')
})
```

##### 一些打包工具的底层操作

目前一些比较火的前端打包构建工具，都是通过`node.js`编写的，打包和构建的过程肯定是文件频繁操作的过程，离不来`stream`，如`gulp`



### EventEmitter 类

我们知道`Node`采用的是事件驱动机制来实现各种功能的，而`EventEmitter`类就是`Node`实现事件驱动的基础。`Node`几乎所有的模块都继承了这个类，这些模块拥有了自己的事件，可以绑定／触发监听器，实现了异步操作

> 比如 `fs.readStream` 对象会在文件被打开的时候触发一个事件。
>
> 这些产生事件的对象都是 `events.EventEmitter` 的实例，这些对象有一个 `eventEmitter.on()` 函数，用于将一个或多个函数绑定到命名事件上

`EventEmitter`类实现了`Node`异步事件驱动架构的基本模式——观察者模式，在这种模式中，被观察者(主体)维护着一组其他对象派来(注册)的观察者，有新的对象对主体感兴趣就注册观察者，不感兴趣就取消订阅，主体有更新的话就依次通知观察者们。

```js
const EventEmitter = require('events')

class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter()

function callback() {
    console.log('触发了event事件！')
}
myEmitter.on('event', callback); // 通过实例对象的on方法注册一个名为event的事件
myEmitter.emit('event'); // 通过emit方法触发该事件
myEmitter.removeListener('event', callback); // 取消事件的监听
```

#### EventEmitter 实例的常用方法

- emitter.addListener/on(eventName, listener) 

  添加类型为 eventName 的监听事件到事件数组尾部

- emitter.prependListener(eventName, listener)

  添加类型为 eventName 的监听事件到事件数组头部

- emitter.emit(eventName[, ...args])

  触发类型为 eventName 的监听事件

- emitter.removeListener/off(eventName, listener)

  移除类型为 eventName 的监听事件

- emitter.once(eventName, listener)

  添加类型为 eventName 的监听事件，以后只能执行一次并删除

- emitter.removeAllListeners([eventName])

  移除全部类型为 eventName 的监听事件

#### 实现一个 EventEmitter 类

```js
class EventEmitter {
	constructor() {
		this.events = {};
		// {
		//     "event1": [f1,f2,f3]，
		//     "event2": [f4,f5]，
		//     ...
		//   }
	}

	emit(type, ...args) {
		this.events[type].forEach(item => {
			Reflect.apply(item, this, args);
		});
	}

	on(type, handler) {
		if (!this.events[type]) {
			// 如果这个 type 的事件还不存在
			this.events[type] = []; // 则设置为空数组
		}
		this.events[type].push(handler); // 这个 type 事件方法的数组不为空，就把新的处理函数加入到数组中
	}

	addListener(type, handler) {
		// 等价于 on
		this.on(type, handler);
	}

	prependListener(type, handler) {
		// 移除 type 事件的方法数组中的第一个
		if (!this.events[type]) {
			this.events[type] = [];
		}
		this.events[type].unshift(handler);
	}

	removeListener(type, handler) {
		if (!this.events[type]) {
			return;
		}
		this.events[type] = this.events[type].filter(item => item !== handler);
	}

	off(type, handler) {
		this.removeListener(type, handler);
	}

	once(type, handler) { // 实现once方法
		this.on(type, this._onceWrap(type, handler, this));
	}

	_onceWrap(type, handler, target) { // 再传入事件监听处理函数的时候进行封装
		const state = { fired: false, handler, type, target }; // 利用闭包的特性维护当前状态
		const wrapFn = this._onceWrapper.bind(state);
		state.wrapFn = wrapFn;
		return wrapFn;
	}

	_onceWrapper(...args) {
		if (!this.fired) { // 通过fired属性值判断事件函数是否执行过
			this.fired = true;
			Reflect.apply(this.handler, this.target, args);
			this.target.off(this.type, this.wrapFn);
		}
	}
}

const ee = new EventEmitter();

ee.once("wakeUp", (name) => {console.log('weakUp', name)}) // 注册之后就定义好状态fired了

ee.on('eat', (name) => { console.log(`eat ${name} 2`) });
ee.on('eat', (name) => { console.log(`eat ${name} 3`) });

const meetingFn = (name) => { console.log(`off ${name} 4`) };
ee.on('work', meetingFn);
ee.on('work', (name) => { console.log(`work ${name} 5`) });

ee.emit('wakeUp', 'xx');
ee.emit('wakeUp', 'xx');         // 第二次没有触发
ee.emit('eat', 'xx');
ee.emit('work', 'xx');
ee.off('work', meetingFn);        // 移除事件
ee.emit('work', 'xx');
```



### Nodejs 事件循环

> <span style="color: #f00">**同步 >  微任务 > nextTick宏任务 > setImmediate宏任务 > 其他宏任务**</span>

在`NodeJS`中，事件循环是基于`libuv`实现，`libuv`是一个多平台的专注于异步IO的库。

事件循环允许 Node.js 执行非阻塞 I/O 操作（尽管 JavaScript 是单线程的），尽可能将操作卸载到系统内核。

由于大多数现代内核都是多线程的，因此可以处理后台执行的多个操作。当其中一个操作完成时，内核会通知 Node.js，以便将适当的回调添加到轮询队列中，最终执行。

当 Node.js 启动时，它会初始化事件循环，处理所提供的输入脚本（或放入 REPL，本文档不涉及），其中可能会进行异步 API 调用、安排计时器或调用 `process.nextTick()`，然后开始处理事件循环。

下图显示了事件循环操作顺序的不同阶段的简化概览

![image-20240308下午53731932](https://raw.githubusercontent.com/zyileven/image-hosting-platform/master/src/2024/03/08/1a20090c40fb9a9bb2ecaedda4923d5f-image-20240308%E4%B8%8B%E5%8D%8853731932-961139.png)

> 每个方框将被称为事件循环的一个 "阶段"。

每个阶段都有一个要执行的回调 FIFO 队列。虽然每个阶段都有自己的特殊性，但一般来说，当事件循环进入某个阶段时，它会执行该阶段特有的任何操作，然后执行该阶段队列中的回调，直到队列耗尽或回调次数达到上限。当队列耗尽或达到回调次数上限时，事件循环将进入下一阶段，依此类推。

由于这些操作中的任何一个都可能安排更多的操作，而且**轮询阶段处理的新事件会被内核排队**，因此轮询事件可以在轮询事件处理的同时被排队。因此，长时间运行的回调可使轮询阶段的运行时间远远超过定时器的阈值。更多详情，请参阅[定时器](https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick#timers)和[轮询](https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick#poll)部分。

#### Node 事件循环阶段

**timer**：执行由`setTimeout`和`setInterval`安排的回调。

**pending callbacks**：执行系统操作（例如 TCP 错误， I / O）的回调。

**idle, prepare**：闲置阶段，仅系统内部使用

**poll**：检索新的I/O事件，执行与 I/O 相关的回调（除了关闭回调、定时器调度的回调和 setImmediate() 以外的几乎所有回调）；节点会在适当的时候在此阻塞。

**check**：setImmediate() 回调在此调用。

**close callbacks**：一些关闭回调，例如 socket.on('close',...)

在每次运行事件循环之间，Node.js 会检查是否正在等待任何异步 I/O 或定时器，如果没有，就会干净利落地关闭。

##### timer 阶段

定时器指定的是执行回调的阈值，而不是执行的确切时间。定时器回调将在指定时间过后尽早运行，但操作系统调度或其他回调的运行可能会延迟它们。

> 从技术上讲，轮询阶段控制计时器的执行时间。

例如，如果您安排在 100 毫秒阈值后执行超时，那么您的脚本就会开始异步读取文件（需要 95 毫秒）

```js
const fs = require('node:fs');
function someAsyncOperation(callback) {
  // 假设这需要95ms来完成
  fs.readFile('/path/to/file', callback);
}
const timeoutScheduled = Date.now();
setTimeout(() => {
  const delay = Date.now() - timeoutScheduled;
  console.log(`${delay}ms have passed since I was scheduled`);
}, 100);
// 做一些需要95毫秒才能完成的异步操作
someAsyncOperation(() => {
  const startCallback = Date.now();
  // 做一些需要10毫秒的事情……
  while (Date.now() - startCallback < 10) {
    // do nothing
  }
});
```

当事件循环进入轮询阶段时，它的队列是空的（fs.readFile() 尚未完成），因此它将等待剩余的毫秒数，直到达到最快计时器的阈值。在等待 95 毫秒时，fs.readFile() 会完成文件读取，并将需要 10 毫秒才能完成的回调添加到轮询队列并执行。回调完成后，队列中不再有其他回调，因此事件循环将看到最快定时器的阈值已达到，然后返回定时器阶段执行定时器的回调。在本例中，从定时器被调度到执行其回调之间的总延迟时间为 105 毫秒。

##### pending callbacks 阶段

该阶段为某些系统操作（如 TCP 错误类型）执行回调。例如，如果 TCP 套接字在尝试连接时收到 ECONNREFUSED，某些 unix 系统会希望等待报告该错误。这将在待处理回调阶段排队执行。

##### poll 阶段

轮询阶段有两个主要功能：

- 计算它应该阻塞，轮询I/O和 then 的时间
- 处理轮询队列中的事件。

当事件循环进入轮询阶段时，如果没有安排定时器，就会发生两种情况之一：

1）如果轮询队列不是空的，事件循环就会遍历其回调队列，同步执行这些回调，直到队列耗尽或达到与系统相关的硬限制。

2）如果轮询队列为空，就会发生另外两种情况之一：

​	1.如果已通过 setImmediate() 安排了脚本，事件循环将结束轮询阶段，并继续进入检查阶段，执行这些已安排的脚本。

​	2.如果脚本没有被 setImmediate() 调度，事件循环将等待回调添加到队列，然后立即执行。

一旦轮询队列清空，事件循环将检查时间阈值已达的计时器。如果一个或多个计时器已准备就绪，事件循环将返回计时器阶段，执行这些计时器的回调。

##### check 阶段

该阶段允许用户在轮询阶段结束后立即执行回调。如果轮询阶段处于空闲状态，且脚本已用 setImmediate() 排好队，则事件循环可继续进入检查阶段，而无需等待。

setImmediate() 实际上是一个特殊的计时器，在事件循环的一个单独阶段运行。它使用 libuv API 调度回调，以便在轮询阶段结束后执行。

一般来说，随着代码的执行，事件循环最终会进入轮询阶段，在此阶段等待传入的连接、请求等。但是，如果使用 setImmediate() 安排了回调，而轮询阶段处于空闲状态，则会结束并继续进入检查阶段，而不是等待轮询事件。

##### close callback 阶段

如果套接字或句柄被突然关闭（如 socket.destroy()），"close "事件将在此阶段发出。否则将通过 process.nextTick() 发布。





#### 浏览器的事件循环

每个浏览器都`Web API`为异步代码提供单独的执行空间。当异步代码执行完毕后，`callback`（回调）`Task Queue`会被发送到（任务队列），`Call Stack`一旦（调用堆栈）为空，队列中的`callback`函数`Call Stack`就会被压入并执行。
这个过程就是事件循环。

```js
console.log('1')

setTimeout(function callback(){
 console.log('2')
}, 1000)

console.log('3')
```

![img](https://raw.githubusercontent.com/zyileven/image-hosting-platform/master/src/2024/03/09/f873a946a70771c4022dcb1424d4e73e-e13dc3ecb05b-20220822-122c0a.gif)







#### 宏任务与微任务

```js
console.log('1')

setTimeout(function callback(){
 console.log('2')
}, 1000)

new Promise((resolve, reject) => {
    console.log('3')
    resolve()
})
.then(res => {
    console.log('4');
})

console.log('5')
// 执行结果顺序是： 1,3,5,4,2
```

首先我们已经知道 setTimeout 和 Promise 都是异步任务，但是为什么`promise`它先执行，因为 then 的回调函数是一个微任务。

微任务与宏任务的区别：**<u>每次遍历任务队列的时候，如果存在微任务，优先执行完微任务再执行宏任务</u>**

![img](https://raw.githubusercontent.com/zyileven/image-hosting-platform/master/src/2024/03/09/de26f559aacd7968fda3411fc3b30552-8b7473c81438-20220826-d38148.png)

演示视频如下：

https://youtu.be/v-nkgloafIQ

#### setImmediate() vs setTimeout()

setImmediate() 和 setTimeout() 类似，但根据调用时间的不同，行为方式也不同。

- setImmediate() 用于在当前轮询阶段结束后执行脚本。
- setTimeout()则安排在最小阈值（以毫秒为单位）结束后运行脚本。

定时器的执行顺序会因调用环境而异。如果两个定时器都在主模块内调用，那么定时将受进程性能的限制（可能会受到机器上运行的其他应用程序的影响）。

例如，如果我们运行以下不在 I/O 循环（即主模块）内的脚本，那么两个定时器的执行顺序是非确定的，因为它受进程性能的限制：

```js
// timeout_vs_immediate.js
setTimeout(() => {
  console.log('timeout');
}, 0);
setImmediate(() => {
  console.log('immediate');
});
```

但是，如果在一个I/O周期内移动这两个调用，则setImmediate的回调总是首先执行:

```js
// timeout_vs_immediate.js
const fs = require('node:fs');
fs.readFile(__filename, () => {
  setTimeout(() => {
    console.log('timeout');
  }, 0);
  setImmediate(() => {
    console.log('immediate');
  });
});
```

与 setTimeout() 相比，使用 setImmediate() 的主要优势在于，如果在 I/O 周期内安排了定时器，setImmediate() 总是会在任何定时器之前执行，与存在多少个定时器无关。



#### process.nextTick()

Event Loop中，每一次循环称为tick，每一次tick的任务如下

- 执行栈选择最先进入队列的宏任务（一般都是script），执行其同步代码直至结束；
- 检查是否存在微任务，有则会执行至微任务队列为空；
- 如果宿主为浏览器，可能会渲染页面；
- 开始下一轮tick，执行宏任务中的异步代码（setTimeout等回调）。

nextTick 是宏任务，所以他的执行顺序应该是在微任务之后，起他宏任务之前：

```js
setTimeout(() => {
    console.log(1);
}, 0)
setImmediate(() => {
    console.log(2);
})
new Promise(resolve => {
    console.log(3);
    resolve()
    console.log(4);
})
.then(() => {
    console.log(5);
})
console.log(6);
process.nextTick(() => {
    console.log(7);
})
console.log(8);
// 在 esm 模块输出结果为： 3,4,6,8,5,7,2,1
// 在 Common.js模块输出结果为：3,4,6,8,7,5,2,1
```

在 ESM 中执行优先级为：<span style="color: #f00">**同步 >  微任务 > nextTick > setImmediate宏任务 > 其他宏任务**</span>

在 Common.js 中执行优先级微：<span style="color: #f00">**同步 > nextTick >  微任务 >  setImmediate宏任务 > 其他宏任务**</span>

> CommonJS 首先处理“nexTick”，而 ESM 则偏向于微任务。

您可能已经注意到，尽管 process.nextTick() 是异步 API 的一部分，但它并没有显示在图表中。这是因为 process.nextTick() 严格来说并不是事件循环的一部分。相反，nextTickQueue 将在当前操作完成后处理，与事件循环的当前阶段无关。在这里，操作被定义为从底层 C/C++ 处理程序到处理需要执行的 JavaScript 的过渡。

回过头来看我们的示意图，只要在给定阶段调用 process.nextTick()，传给 process.nextTick() 的所有回调都将在事件循环继续之前解决。这可能会造成一些糟糕的情况，因为它允许你通过递归调用 process.nextTick() 来 "饿死 "你的 I/O，从而阻止事件循环进入轮询阶段。

为什么 Node.js 中会包含这样的功能？部分原因在于一种设计理念，即 API 始终应该是异步的，即使在不需要异步的情况下也是如此。以这段代码为例：

```js
function apiCall(arg, callback) {
  if (typeof arg !== 'string')
    return process.nextTick(
      callback,
      new TypeError('argument should be string')
    );
}
```

该代码段会进行参数检查，如果不正确，就会将错误信息传递给回调函数。最近更新的 API 允许将参数传递给 process.nextTick()，使其可以将回调后传递的任何参数作为参数传播给回调，这样就不必嵌套函数了。

我们要做的就是将错误信息传回给用户，但只有在允许用户的其他代码执行后才会这样做。通过使用 process.nextTick()，我们可以保证 apiCall() 总是在用户代码的其余部分执行完毕后、事件循环允许继续执行之前运行其回调。为此，JS 调用堆栈允许松开，然后立即执行所提供的回调，这样就可以对 process.nextTick() 进行递归调用，而不会出现 RangeError：超出了 v8 版本的最大调用堆栈大小。



### Nodejs 中间件

中间件（Middleware）是介于应用系统和系统软件之间的一类软件，它使用系统软件所提供的基础服务（功能），衔接网络上应用系统的各个部分或不同的应用，能够达到资源共享、功能共享的目的。

在`NodeJS`中，中间件主要是指封装`http`请求细节处理的方法

例如在`express`、`koa`等`web`框架中，中间件的本质为一个回调函数，参数包含请求对象、响应对象和执行下一个中间件的函数。

> **node中间件本质上就是在进入具体的业务处理之前，先让特定过滤器处理**。

![img](https://raw.githubusercontent.com/zyileven/image-hosting-platform/master/src/2024/03/09/45472966ab6c973ed28c9e5bf4c11077-6a6ed3f0-cce4-11eb-85f6-6fac77c0c9b3-0e4630.png)

在这些中间件函数中，我们可以执行业务逻辑代码，修改请求和响应对象、返回响应数据等操作。

#### 实现中间件

这是路由函数

``` js
router.get("/", async (req, res) => {
	res.send("Hello World!");
});
```

这是中间件函数

```js
router.get("/", async (req, res, next) => {
	res.send("Hello World!");
	next();
});
```

> 注意⚠️：中间件函数的形参列表中，必须包含 next 参数。而路由处理函数中只包含 req 和 res。

![img](https://raw.githubusercontent.com/zyileven/image-hosting-platform/master/src/2024/03/10/360c388f10be53bac3abd5e4f359e282-2022082415495676-adfcd6.png)

定义一个最简单的中间件，并由 express 使用：

```js
const simpleMiddleware = (req, res, next) => {
    // 逻辑代码
    next(); // 调用下一个中间件或回到路由函数
}

app.use(simpleMiddleware); // 这样写法的中间件在每次请求都会触发，也称为全局生效中间件

app.use("/user", simpleMiddleware, (req, res) => {}) // 这样的写法表示设置的是局部中间件

// 定义多个中间件
app.use("/user", simpleMiddleware, simpleMiddleware, (req, res) => {})
// 或
app.use("/user", [simpleMiddleware, simpleMiddleware], (req, res) => {})
```

Express 官方把中间件分为如下几类：

-  应用级别的中间件

  通过 app.use() 或 app.get() 或 app.post() ，绑定到 app 实例上的中间件，叫做应用级别的中间件

  ```js
  app.use((req, res, next) => {
    // ...
  	next()
  })
  app.get("/", mw, (req, res) => {})
  ```

  

- 路由级别的中间件

  绑定到 express.Router() 实例上的中间件，叫做路由级别的中间件

  ```js
  router.get("/", mw, (req, res) => {})
  ```

  

- 错误级别的中间件

  错误级别中间件的作用：专门用来捕获整个项目中发生的异常错误，从而防止项目异常崩溃的问题。

  格式：错误级别中间件的 function 处理函数中，必须有 4 个形参，形参顺序从前到后，分别是 (err, req, res, next)。

  ```js
  app.use("/user", userRouter)
  // 其他路由
  app.use((err, req, res, next) => {})
  ```

  > 注意⚠️：错误中间件必须注册在所有路由之后

- Express 内置的中间件

  - express.static：快速托管静态资源的内置中间件，例如： HTML 文件、图片、CSS 样式等（无兼容性）
  - express.json：解析 JSON 格式的请求体数据
  - express.urlencoded：解析 URL-encoded 格式的请求体数据

- 第三方的中间件

  是由第三方开发出来的中间件，叫做第三方中间件。在项目中，大家可以按需下载并配置

  第三方中间件，从而提高项目的开发效率。

  例如：bodyParser

  ```js
  // 导入 express 模块
  const express = require('express')
  // 创建 express 的服务器实例
  const app = express()
  // 1. 导入解析表单数据的中间件 body-parser
  const parser = require('body-parser')
  // 2. 使用 app.use() 注册中间件
  app.use(parser.urlencoded({ extended: false }))
  // app.use(express.urlencoded({ extended: false }))
  app.post('/user', (req, res) => {
    // 如果没有配置任何解析表单数据的中间件，则 req.body 默认等于 undefined
    console.log(req.body)
    res.send('ok')
  })
  // 调用 app.listen 方法，指定端口号并启动web服务器
  app.listen(80, function () {
    console.log('Express server running at http://127.0.0.1')
  })
  ```



#### 自定义中间件

前面我们定义了一个最简单的中间件：

```js
export const simpleMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // 逻辑代码
    console.log("trigger simpleMiddleware");
    next(); // 调用下一个中间件或回到路由函数
}
```

现在我们看看能在逻辑代码区域做些什么事：

- 监听req的data事件

  ```js
  export const simpleMiddleware = (req: Request, res: Response, next: NextFunction) => {
      // 逻辑代码
      console.log("trigger simpleMiddleware");
    
    	req.on("data", function () {
        // data事件
      })
    
      next(); // 调用下一个中间件或回到路由函数
  }
  ```

- 监听req的end事件

  

  ```js
  export const simpleMiddleware = (req: Request, res: Response, next: NextFunction) => {
      // 逻辑代码
      console.log("trigger simpleMiddleware");
      req.on("data", function () {
        // data事件
      })
  
      req.on("end", function () {
  
      })
  
      next(); // 调用下一个中间件或回到路由函数
  }
  ```

- 使用Qs模块解析请求体数据

  Node.js 内置了一个Qs 模块，专门用来处理查询字符串。通过这个模块提供的 parse() 函数，可以轻松把查询字符串，解析成对象的格式。

  ```js
  const qs = require("queryString");
  
  export const simpleMiddleware = (req: Request, res: Response, next: NextFunction) => {
      // 逻辑代码
      console.log("trigger simpleMiddleware");
  	  const str;
      req.on("data", function (chunk) {
        // data事件
        str += chunk
      })
  
      req.on("end", function () {
  			console.log(str)
      })
    
    	const body = qs.parse(str)
  
      next(); // 调用下一个中间件或回到路由函数
  }
  ```

- 将解析出来的数据对象挂载为req.body

  ```js
  const qs = require("queryString");
  
  export const simpleMiddleware = (req: Request, res: Response, next: NextFunction) => {
      // 逻辑代码
      console.log("trigger simpleMiddleware");
  	  const str;
      req.on("data", function (chunk) {
        // data事件
        str += chunk
      })
  
      req.on("end", function () {
  			console.log(str)
      })
    
    	const body = qs.parse(str)
  
      req.body = body;
      
      next(); // 调用下一个中间件或回到路由函数
  }
  ```



#### 常见的中间件案例

- IP筛选
- 查询字符串传递
- 请求体解析
- cookie信息处理
- 权限校验
- 日志记录
- 会话管理中间件(session)
- gzip压缩中间件(如compress)
- 错误处理































