## use api

`use` 是一个 React API，可让您读取 [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) 或 [context](https://react.dev/learn/passing-data-deeply-with-context) 等资源的值。

```jsx
const value = use(resource);
```

注意事项：

- 必须在组件或 Hook 内部调用 `use` API。
- 在[服务器组件](https://react.dev/reference/rsc/server-components)中获取数据时，优先 `async` 和 `await` 而不是 `use` 。 `async` 和 `await` 从 `await` 被调用的地方继续渲染，而 `use` 在数据解析后重新渲染组件。
- 在服务器组件中创建 Promise 并传递给客户端组件，而不是在客户端组件中创建 Promise。在客户端组件中创建的 Promise 在每次渲染时都会重新创建。从服务器组件传递给客户端组件的 Promise 在重新渲染时保持稳定。



### 读取方式的变化

旧的读取 Promise 的值的方式

```jsx
const value = await new Promise();
```

旧的获取 context 的方法

```jsx
// 1.创建context
export const LevelContext = createContext(1);
<LevelContext value="1">
	{children}
</LevelContext>

// 2.子元素中通过 useContext 获取
const level = useContext(LevelContext);
```

新的获取 context 的方法

```jsx
import { use } from 'react';

function Button() {
  const theme = use(ThemeContext);
  // ...
```

> 与 `useContext` 不同， `use` 可以像 `if` 一样在条件语句和循环中调用

```jsx
function HorizontalRule({ show }) {
  if (show) {
    const theme = use(ThemeContext);
    return <hr className={theme} />;
  }
  return false;
}
```



### use 处理 Promise

服务端组件获取数据

```jsx
import { fetchMessage } from './lib.js';
import { Message } from './message.js';

export default async function App() {
  // 旧语法
  const messagePromise = await fetchMessage();
  // 新语法
  const messagePromise = fetchMessage();
  
  return (
    <Suspense fallback={<p>waiting for message...</p>}>
      <Message messagePromise={messagePromise} />
    </Suspense>
  );
}
```

在客户端组件中通过 use 以同步的方式获取 Promise 中的数据

``` jsx
// message.js
'use client';

import { use } from 'react';

export function Message({ messagePromise }) {
  const messageContent = use(messagePromise);
  return <p>Here is the message: {messageContent}</p>;
}
```

因为 `Message` 被包裹在 `Suspense` 中，所以当 Promise 解析完成之前会显示fallback 中的内容，直到 Promise 被解决。当 Promise 被解决时， `use` API 会读取值， `Message` 组件将替换 Suspense 的回退内容。

> 注意⚠️：当从一个服务器组件传递一个 Promise 到客户端组件时，它的解析值必须是可序列化的，以便在服务器和客户端之间传递。像函数这样的数据类型是不可序列化的，不能作为这种 Promise 的解析值。

#### 当 Promise 失败的情况下的处理方式

- 使用错误边界捕获错误，并告知用户

  ```jsx
  export function MessageContainer({ messagePromise }) {
    return (
      <ErrorBoundary fallback={<p>⚠️Something went wrong</p>}>
        <Suspense fallback={<p>⌛Downloading message...</p>}>
          <Message messagePromise={messagePromise} />
        </Suspense>
      </ErrorBoundary>
    );
  }
  ```

  

- 使用 Promise.catch 提供替代值

  ```jsx
  export default function App() {
    const messagePromise = new Promise((resolve, reject) => {
      reject();
    }).catch(() => {
      return "no new message found.";
    });
  
    return (
      <Suspense fallback={<p>waiting for message...</p>}>
        <Message messagePromise={messagePromise} />
      </Suspense>
    );
  }
  ```

  要使用 Promise 的 `catch` 方法，在 Promise 对象上调用 `catch` 。 `catch` 接受一个参数：一个将错误消息作为参数的函数。传递给 `catch` 的函数返回的任何内容都将被用作 Promise 的解决值。























