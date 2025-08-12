## JavaScript Fetch API 简介

Fetch API 是一个强大且现代的工具，它简化了从浏览器直接发起 HTTP 请求的过程。

如果你之前使用过 `XMLHttpRequest` 对象，你会发现 Fetch API 可以处理所有相同的功能，但更加优雅和便捷。

Fetch API 利用 [Promise](https://www.javascripttutorial.net/es6/javascript-promises/)，提供了一种更简洁和灵活的方式与服务器交互。它帮助更直观地处理异步请求和响应。

`fetch()` 是 [全局 window 对象 ](https://www.javascripttutorial.net/javascript-globalthis/)的一个方法，它允许你通过一个命令向 URL 发送 HTTP 请求。无论是获取数据、提交表单还是与 API 交互，Fetch API 都有助于简化整个流程，使你的代码更加易读。

### 发送请求

`fetch()` 只需要一个参数，即你想要获取的资源 URL：

```js
fetch(url);
```

`fetch()` 方法返回一个 `Promise`，因此你可以使用 `then()` 和 `catch()` 方法来处理它：

```js
fetch(url)
    .then(response => {
        // handle the response
    })
    .catch(error => {
        // handle the error
    });
```

一旦请求完成，资源就变得可用，`Promise` 会解析成一个 `Response` 对象。

`Response` 对象作为获取资源的 API 封装。

### 读取响应

如果响应包含 JSON 数据，你可以使用 `Response` 对象的 `json()` 方法来解析它。

`json()` 方法返回一个 `Promise`，该 Promise 在获取的资源完整内容上解析，从而可以访问 JSON 数据：

```js
fetch(url)
    .then(response => response.json())
    .then(data => console.log(data));
```

在实践中，你通常使用 [`async`/`await`](https://www.javascripttutorial.net/es-next/javascript-async-await/) 与 `fetch()` 方法一起使用，使代码更清晰：

```js
const response = await fetch(url);
const data = await response.json();
console.log(data); // json data
```

除了 `json()` 方法外，`Response` 对象还有其他方法，如 `text()`、`blob()`、`formData()` 和 `arrayBuffer()`，用于处理不同的数据类型。

### 处理 HTTP 状态码

`Response` 对象有一个 `status` 属性，可以提供响应的 HTTP 状态码：

```js
response.status
```

HTTP 状态码允许你判断请求是否成功：

```js
const response = await fetch(url);
if (response.status === 200) {
   // success
}
```

在实际应用中，你会使用一个便捷的属性 `ok` 来检查状态码是否在 200-299 的范围内。如果它是 `false`，则请求未成功：

```js
const response = await fetch(url);
if (!response.ok) {
   throw new Error(`HTTP error! Status: ${response.status}`);
}
```

## JavaScript Fetch API 示例

我们将向以下 API 端点发起 GET 请求，该端点返回用户列表：

```
https://jsonplaceholder.typicode.com/users
```

步骤 1： 创建一个新目录，例如 fetch，用于存储项目文件。

步骤 2：在项目目录中创建一个 `index.html` 文件：

```html
<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Fetch API Demo</title>
        <script src="js/app.js" defer></script>
    </head>

    <body>
        <div id="root">
            <div id="content"></div>
            <p id="message"></p>
            <p id="loading"></p>
        </div>
    </body>

</html>
```

HTML 文件有一个根元素，其中包含三个元素：

- `#content` 用于渲染用户列表。
- `#message` 用于显示任何错误消息。
- `#loading` 用于显示加载消息。

步骤 3：在 `js` 目录下创建一个 `app.js`：

```js
const getUsers = async () => {
  const url = 'https://jsonplaceholder.typicode.com/users';
  const response = await fetch(url);
  return await response.json();
};

const render = (users) => {
  return users.map(({ name, email }) => `<li>${name} (${email})</li>`).join('');
};

(async () => {
  const users = await getUsers();
  document.querySelector('#content').innerHTML = `<ul>${render(users)}</ul>`;
})();
```

它是如何工作的？

首先，定义一个名为 `getUsers` 的函数，该函数使用 `fetch()` 方法从 API 端点获取数据：https://jsonplaceholder.typicode.com/users

```js
const getUsers = async () => {
  const url = 'https://jsonplaceholder.typicode.com/users';
  const response = await fetch(url);
  return await response.json();
};
```

其次，创建一个新函数 `render`，该函数返回一个 HTML 片段，用于在屏幕上显示用户列表：

```js
const render = (users) => {
  return users.map(({ name, email }) => `<li>${name} (${email})</li>`).join('');
};
```

最后，定义一个[立即执行函数表达式 ](https://www.javascripttutorial.net/javascript-immediately-invoked-function-expression/)，该函数调用 `getUsers()` 函数并在屏幕上显示用户列表：

```js
(async () => {
  const users = await getUsers();
  document.querySelector('#content').innerHTML = `<ul>${render(users)}</ul>`;
})();
```

### 处理错误

在发起网络请求时，可能会出现各种错误，例如网络中断、服务器宕机或其他连接问题。

要处理错误，你可以使用 `try...catch` 语句：

```js
(async () => {
  try {
    // fetch the users
    const users = await getUsers();

    // show the user list
    document.querySelector('#content').innerHTML = `<ul>${render(users)}</ul>`;
  } catch (err) {
    // show the error message
    document.querySelector('#message').textContent = err.message;
  }
})();
```

在这个例子中，如果发生错误，`catch` 块将执行，在控制台记录错误消息并向用户显示友好的错误消息。

要测试这个功能，你可以将 API 端点更改为无效的 URL，例如：

```
https://jsonplaceholder.typicode.net/users
```

将 `.com` 改为 `.net`，然后打开 `index.html` 文件。页面将显示以下错误信息：

```
Error getting users
```

控制台窗口将显示以下错误：

```
GET https://jsonplaceholder.typicode.net/users net::ERR_NAME_NOT_RESOLVED
```

### 显示加载指示器

如果网络速度慢，你会看到空白页面一段时间，这会导致用户体验不佳。

为了增强此功能，您可以在数据正在获取时显示一个加载消息。

为此，您可以按如下方式修改 IIFE 函数：

```js
(async () => {
  // show the loading element
  const loadingElem = document.querySelector('#loading');
  loadingElem.innerHTML = 'Loading...';
  try {
    // fetch the users
    const users = await getUsers();

    // show the user list
    document.querySelector('#content').innerHTML = `<ul>${render(users)}</ul>`;
  } catch (err) {
    // show the error message
    document.querySelector('#message').textContent = err.message;
  } finally {
    loadingElem.innerHTML = '';
  }
})();
```

在发起请求之前，我们将加载消息设置为 `'Loading...'`：

```js
const loadingElem = document.querySelector('#loading');
loadingElem.innerHTML = 'Loading...';
```

请求完成后，无论成功与否，你都可以通过在 `finally` 块中将加载消息设置为空白来清除它：

```js
// ...
finally {
    loadingElem.innerHTML = '';
}
```

请注意，如果网络速度足够快，加载消息可能不会可见。要测试加载消息，你可以模拟网络延迟，如下所示：

```js
(async () => {
  // show the loading element
  const loadingElem = document.querySelector('#loading');
  loadingElem.innerHTML = 'Loading...';

  // simulate network delay
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  await delay(2000); // delay 2 seconds

  try {
    // fetch the users
    const users = await getUsers();

    // show the user list
    document.querySelector('#content').innerHTML = `<ul>${render(users)}</ul>`;
  } catch (err) {
    // show the error message
    document.querySelector('#message').textContent = err.message;
  } finally {
    loadingElem.innerHTML = '';
  }
})();
```

在这段代码中，我们包含以下代码片段来在发起请求前引入2秒的延迟：

```js
// simulate network delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
await delay(2000); // delay 2 seconds
```

## 发起 HTTP POST 请求

我们向你展示如何向以下 API 端点发起 HTTP POST 请求，该端点用于创建包含 `title`、`body` 和 `userId` 的新博客文章：

```html
<code>https://jsonplaceholder.typicode.com/posts</code>
```

第一步：创建一个新目录来存储项目文件。

第二步：在项目目录中创建一个新的 `index.html` 文件。

```html
<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Fetch API Demo - HTTP POST</title>
        <meta name="robots" content="noindex">
        <script src="js/app.js" defer></script>
    </head>
    <body>
    </body>

</html>
```

`index.html` 文件在其头部包含了 `js/app.js` 文件。

第三步：创建一个新的 `js/app.js` 文件，包含以下代码：

```js
async function create(blogPost) {
  try {
    // Create the URL
    const url = 'https://jsonplaceholder.typicode.com/posts';

    // Create the headers
    const headers = {
      'Content-Type': 'application/json',
    };

    // Create the POST body
    const body = JSON.stringify({
      title: blogPost.title,
      body: blogPost.body,
      userId: blogPost.userId,
    });

    // Send the POST request
    const response = await fetch(url, { method: 'POST', headers, body });

    // Check the response status
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the JSON response
    const data = await response.json();
    console.log('Success:', data);
  } catch (error) {
    // Handle any errors
    console.error('Error:', error);
  }
}

create({
  title: 'Test Post',
  body: 'This is a test post',
  userId: 1,
});
```

第四步：在网页浏览器中打开 index.html。它将执行 app.js 文件，该文件会发起 HTTP POST 请求。

第五步：打开控制台窗口，如果请求成功，你会看到以下消息：

![](https://raw.githubusercontent.com/zyileven/image-hosting-platform/master/src/2025/08/11/c862911df26776bd7f63789e70c446f4-javascript-fetch-api-post-method-e389ca.png)

它是如何工作的？

1.定义一个创建新博客文章的函数，该函数接受一个文章对象：

```js
async function create(post)
```

2.构建一个用于发送 POST 请求的 URL 端点：

```js
const url = 'https://jsonplaceholder.typicode.com/posts';
```

3.创建一个随请求一起发送的 HTTP 头部：

```js
const headers = {
  'Content-Type': 'application/json',
};
```

将 `'Content-Type'` 头部设置为 `'application/json'`，以指示请求的正文内容为 JSON 格式。

4.通过使用 `JSON.stringify()` 方法将 post 对象序列化为 JSON 字符串来创建 POST 请求的主体：

```js
const body = JSON.stringify({
  title: post.title,
  body: post.body,
  userId: post.userId,
});
```

这假设了 `blogPost` 对象具有 `title`、`body` 和 `userId` 属性。

5.使用 `fetch()` 方法发送 POST 请求：

```js
const response = await fetch(url, {
    method: 'POST',
    headers,
    body
});
```

在此语法中：

- `url`：发送 POST 请求的 API 端点。
- `method: 'POST'`：指定这是一个 HTTP POST 请求。
- `headers`: 在请求中包含头部信息。
- `body`: 包含在 HTTP POST 请求正文中传输的 JSON 字符串。

`fetch()` 方法返回一个 `Response` 对象。

6.检查响应状态，如果请求未成功则抛出错误：

```js
if (!response.ok) {
  throw new Error(`HTTP error! Status: ${response.status}`);
}
```

7.解析 JSON 响应并将数据记录到控制台窗口：

```js
const data = await response.json();
console.log('Success:', data);
```

8.捕获请求过程中发生的任何错误并将其记录到控制台：

```js
catch (error) {
  console.error('Error:', error);
}
```

9.调用 `create()` 函数，传入包含 `title`、`body` 和 `userId` 属性的博客文章对象：

```js
create({
  title: 'Test Post',
  body: 'This is a test post',
  userId: 1,
});
```





















































