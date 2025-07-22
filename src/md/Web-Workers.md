

## Web Workers

以前我们总说，JS 是单线程没有多线程，当 JS 在页面中运行长耗时同步任务的时候就会导致页面假死影响用户体验，从而需要设置把任务放在任务队列中；执行任务队列中的任务也并非多线程进行的，然而现在 HTML5 提供了我们前端开发这样的能力 - [Web Workers API](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API)，我们一起来看一看 Web Worker 是什么，怎么去使用它，在实际生产中如何去用它来进行产出。



### 一、概念

Web Workers 使得一个 Web 应用程序可以在与主执行线程分离的后台线程中运行一个脚本操作。这样做的好处是可以在一个单独的线程中执行费时的处理任务，从而允许主（通常是 UI）线程运行而不被阻塞。

它的作用就是给 JS 创造多线程运行环境，允许主线程创建 worker 线程，分配任务给后者，主线程运行的同时 worker 线程也在运行，相互不干扰，在 worker 线程运行结束后把结果返回给主线程。这样做的好处是主线程可以把计算密集型或高延迟的任务交给 worker 线程执行，这样主线程就会变得轻松，不会被阻塞或拖慢。这并不意味着 JS 语言本身支持了多线程能力，而是浏览器作为宿主环境提供了 JS 一个多线程运行的环境。

不过因为 worker 一旦新建，就会一直运行，不会被主线程的活动打断，这样有利于随时响应主线程的通性，但是也会造成资源的浪费，所以不应过度使用，用完注意关闭。或者说：如果 worker 无实例引用，该 worker 空闲后立即会被关闭；如果 worker 实列引用不为 0，该 worker 空闲也不会被关闭。

不同浏览器对 Web Workers 的兼容性：

![image](https://raw.githubusercontent.com/zyileven/image-hosting-platform/master/src/2025/07/22/a7eb5d5af68e8e9f34e212248223a81f-image-20250722上午92421852-0ae5a7.png)

### 二、Web Workers 的使用

#### 1.几个注意的点

- **同源限制**： worker 线程执行的脚本文件必须和主线程的脚本文件同源，这是当然的了，总不能允许 worker 线程到别人电脑上到处读文件吧
- **文件限制**： 为了安全，worker 线程无法读取本地文件，它所加载的脚本必须来自网络，且需要与主线程的脚本同源
- **DOM 操作限制**： worker 线程在与主线程的 window 不同的另一个全局上下文中运行，其中无法读取主线程所在网页的 DOM 对象，也不能获取 `document`、`window`等对象，但是可以获取`navigator`、`location(只读)`、`XMLHttpRequest`、`setTimeout族`等浏览器API
- **通信限制**： worker 线程与主线程不在同一个上下文，不能直接通信，需要通过`postMessage`方法来通信
- **脚本限制**： worker 线程不能执行`alert`、`confirm`，但可以使用 `XMLHttpRequest` 对象发出 ajax 请求

#### 2.Web Workers 使用

创建一个 WebWorkers 的方式是：

```js
var myWorker = new Worker(jsUrl, options)
```

Worker() 构造函数，第一个参数是脚本的网址（必须遵守同源政策），该参数是必需的，且只能加载 JS 脚本，否则报错。第二个参数是配置对象，该对象可选。它的一个作用就是指定 Worker 的名称，用来区分多个 Worker 线程。

```js
// 主线程 main.js
var myWorker = new Worker('worker.js', { name : 'myWorker' });

// Worker 线程 thead.js
self.name // myWorker
```



### 三、实际使用

#### 1.案例一

**线程文件`workerThread1.js**

```js
// workerThread1.js

let i = 1

function simpleCount() {
  i++
  self.postMessage(i)
  setTimeout(simpleCount, 1000)
}

simpleCount()

self.onmessage = ev => {
  postMessage(ev.data + ' 呵呵~')
}
```

Worker 线程中全局对象为 `self`，代表子线程自身，这时 `this`指向`self`，其上有一些 api：

- `self.postMessage`: worker 线程往主线程发消息，消息可以是任意类型数据，包括二进制数据
- `self.close`: worker 线程关闭自己
- `self.onmessage`: 指定主线程发 worker 线程消息时的回调，也可以`self.addEventListener('message',cb)`
- `self.onerror`: 指定 worker 线程发生错误时的回调，也可以 `self.addEventListener('error',cb)`

**主线程 `index.html`**

```html
<!--主线程，HTML文件的body标签中-->

<div>
  Worker 输出内容：<span id='app'></span>
  <input type='text' title='' id='msg'>
  <button onclick='sendMessage()'>发送</button>
  <button onclick='stopWorker()'>stop!</button>
</div>

<script type='text/javascript'>
  if (typeof(Worker) === 'undefined')	// 使用Worker前检查一下浏览器是否支持
    document.writeln(' Sorry! No Web Worker support.. ')
  else {
    window.w = new Worker('workerThread1.js');// 指定这个新的 worker 要执行的代码
    window.w.onmessage = ev => { // 子线程发给主线程消息时触发
      document.getElementById('app').innerHTML = ev.data
    }
    
    window.w.onerror = err => { // 子线程报错时触发
      window.w.terminate()
      console.log(error.filename, error.lineno, error.message) // 发生错误的文件名、行号、错误内容
    }
    
    function sendMessage() {
      const msg = document.getElementById('msg')
      window.w.postMessage(msg.value) // 主线程使用 postMessage 传递内容给子线程
    }
    
    function stopWorker() { // 终止子线程
      window.w.terminate()
    }
  }
</script>
```

- `worker.postMessage`: 主线程往 worker 线程发消息，消息可以是任意类型数据，包括二进制数据
- `worker.terminate`: 主线程关闭 worker 线程
- `worker.onmessage`: 指定 worker 线程发消息时的回调，也可以通过`worker.addEventListener('message',cb)`的方式
- `worker.onerror`: 指定 worker 线程发生错误时的回调，也可以 `worker.addEventListener('error',cb)`

> 注意，`w.postMessage(aMessage, transferList)` 方法接受两个参数，`aMessage` 是可以传递任何类型数据的，包括对象，这种通信是拷贝关系，即是传值而不是传址，Worker 对通信内容的修改，不会影响到主线程。事实上，浏览器内部的运行机制是，先将通信内容串行化，然后把串行化后的字符串发给 Worker，后者再将它还原。一个可选的 [Transferable](https://developer.mozilla.org/zh-CN/docs/Web/API/Transferable) 对象的数组，用于传递所有权。如果一个对象的所有权被转移，在发送它的上下文中将变为不可用（中止），并且只有在它被发送到的 worker 中可用。可转移对象是如 ArrayBuffer，MessagePort 或 ImageBitmap 的实例对象，`transferList`数组中不可传入 null。
>
> 更详细的 API 参见 [MDN - WorkerGlobalScope](https://developer.mozilla.org/zh-CN/docs/Web/API/WorkerGlobalScope)。

worker 线程中加载脚本的 api：

```js
importScripts('script1.js')	// 加载单个脚本
importScripts('script1.js', 'script2.js')	// 加载多个脚本

```



### 四、使用场景

Web Worker 我们可以当做计算器来用，需要用的时候掏出来摁一摁，不用的时候一定要收起来。

#### 1.加密数据

有些加解密的算法比较复杂，或者在加解密很多数据的时候，这会非常耗费计算资源，导致 UI 线程无响应，因此这是使用 Web Worker 的好时机，使用 Worker 线程可以让用户更加无缝的操作 UI。

**主线程**

```js
// 导入加密库（通常在主线程初始化时加载好，Worker内部会独立加载一份）
import CryptoJS from 'crypto-js'; // 或者选择其他库/Web Crypto API

// 创建或复用 Worker
const cryptoWorker = new Worker('./crypto-worker.js'); // 指向 Worker 脚本

// 从服务器获取加密数据 (伪代码)
async function fetchAndDecryptAssets() {
  try {
    // 1. 显示加载状态
    ui.showLoadingSpinner();

    // 2. 模拟获取加密数据
    const response = await fetch('/api/encrypted-assets');
    const encryptedAssets = await response.json(); // [{id:1, encryptedData: ...}, ...]

    // 3. 用户提供的密钥 (示例)
    const secretKey = getUserSecretKeyFromSecureInput(); // 从安全来源获取

    // 4. 发送解密任务到 Worker
    cryptoWorker.postMessage({
      action: 'decryptList',
      encryptedList: encryptedAssets,
      key: secretKey.toString(), // 确保转换为 Worker 可处理的格式
      iv: CryptoJS.lib.WordArray.random(128 / 8).toString(), // 假设需要 IV, 随机生成或从数据中取
    });

    // 5. 监听 Worker 返回消息
    cryptoWorker.onmessage = function (event) {
      const msg = event.data;
      switch (msg.type) {
        case 'progress':
          // 更新进度条
          ui.updateDecryptProgress(msg.percent);
          break;
        case 'result':
          // 接收到最终解密结果（或某个批次的结果）
          const decryptedAssets = msg.data;
          ui.displayAssets(decryptedAssets); // 更新UI展示解密后的数据
          ui.hideLoadingSpinner(); // 隐藏加载状态
          break;
        case 'error':
          console.error('Decryption failed:', msg.error);
          ui.showError('Decryption failed! ' + msg.error);
          ui.hideLoadingSpinner();
          break;
      }
    };

    // 6. 监听 Worker 错误
    cryptoWorker.onerror = function (error) {
      console.error('Worker error:', error);
      ui.showError('Web Worker encountered an error!');
      ui.hideLoadingSpinner();
    };

  } catch (fetchError) {
    console.error('Fetch error:', fetchError);
    ui.showError('Failed to fetch data!');
    ui.hideLoadingSpinner();
  }
}

// 用户触发获取资产
document.getElementById('loadAssetsBtn').addEventListener('click', fetchAndDecryptAssets);
```

**子线程**`crypto-worker.js`

```js
// Worker 内部也需要导入加密库 (会独立加载)
importScripts('https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js'); // 直接引入 CDN 或使用模块打包确保可用

// 监听主线程发送的消息
self.onmessage = function (event) {
  const { action, encryptedList, key, iv } = event.data;

  if (action === 'decryptList') {
    try {
      // 解密列表 (这里可以添加进度报告逻辑)
      const decryptedList = [];
      const total = encryptedList.length;

      for (let i = 0; i < total; i++) {
        const encryptedAsset = encryptedList[i];

        // **实际解密核心操作 - 替换为你的具体算法**
        // 示例使用 CryptoJS AES-CBC 解密
        const keyHex = CryptoJS.enc.Utf8.parse(key);
        const ivHex = CryptoJS.enc.Hex.parse(iv);
        const bytes = CryptoJS.AES.decrypt(
          encryptedAsset.encryptedData, // 假设你的加密字段是 'encryptedData'
          keyHex,
          { iv: ivHex }
        );
        const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

        // 解析解密后的数据 (假设是 JSON 字符串)
        const decryptedObj = JSON.parse(decryptedData);

        decryptedList.push({
          ...encryptedAsset, // 保留原始id等元数据
          ...decryptedObj // 覆盖/添加解密后的数据
        });

        // **进度报告 (可选)：每处理一定数量或百分比报告一次**
        if (i % 10 === 0 || i === total - 1) { // 每10条或最后一条报告一次
          const percent = Math.round((i + 1) / total * 100);
          self.postMessage({
            type: 'progress',
            percent: percent
          });
        }
      }

      // 解密完成，发送结果给主线程
      self.postMessage({
        type: 'result',
        data: decryptedList
      });

    } catch (decryptError) {
      // 解密出错，通知主线程
      self.postMessage({
        type: 'error',
        error: decryptError.message || 'Unknown decryption error'
      });
    }
  }
};
```

这个案例清晰地展示了如何利用Web Worker将密集的批量数据解密任务剥离出主线程，从而保持用户界面的流畅响应。核心就是**通信**（`postMessage`/`onmessage`）、**后台计算**（Worker中的解密操作）、**异步更新**（主线程收到消息后更新UI）。通过添加进度报告、错误处理、优化数据传输（Transferable Objects）和复用Worker，可以构建出高性能且用户体验良好的加密/解密功能。

#### 2.预取数据

有时候为了提升数据加载速度，可以提前使用 Worker 线程获取数据，因为 Worker 线程是可以是用 `XMLHttpRequest` 的。

在这里，我们是用一个阅读博客文章，当用户 hover 到博客列表上时进行博客预加载，达到立即跳转的效果。

**主线程**

```js
// 创建预取worker
const prefetchWorker = new Worker('/js/prefetch-worker.js');

// 当用户浏览到可能感兴趣的文章时触发预取
function onArticleHover(articleId) {
  // 发送预取指令
  prefetchWorker.postMessage({
    type: 'prefetch',
    id: articleId,
    url: `/api/articles/${articleId}`
  });
}

// 用户点击文章时的处理
async function navigateToArticle(articleId) {
  // 1. 显示加载状态
  showLoadingSpinner();
  
  // 2. 尝试从worker获取预取数据
  const cachedArticle = await getCachedArticle(articleId);
  
  if (cachedArticle) { // 看看是否有缓存
    // 直接使用预取的数据渲染
    renderArticle(cachedArticle);
    hideLoadingSpinner(); // 移除加载状态
  } else {
    // 如果预取失败或未完成，立即请求
    const articleData = await fetch(`/api/articles/${articleId}`).then(r => r.json());
    renderArticle(articleData);
    hideLoadingSpinner();
  }
}

// 向worker请求已缓存的文章
function getCachedArticle(articleId) {
  return new Promise((resolve) => {
    // 唯一ID用于匹配响应
    const requestId = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    
    // 设置消息监听器
    const handler = (event) => {
      if (event.data.type === 'cachedArticle' && event.data.requestId === requestId) {
        prefetchWorker.removeEventListener('message', handler);
        resolve(event.data.data); // 返回获取到的缓存的文章
      }
    };
    
    prefetchWorker.addEventListener('message', handler); // 
    
    // 发送请求
    prefetchWorker.postMessage({
      type: 'getCached',
      id: articleId,
      requestId: requestId
    });
    
    // 超时机制 - 避免无限等待
    setTimeout(() => {
      prefetchWorker.removeEventListener('message', handler);
      resolve(null);
    }, 300);
  });
}

// --- 页面交互部分 ---
// 示例：当用户hover到文章卡片上时预取
document.querySelectorAll('.article-card').forEach(card => {
  const articleId = card.dataset.id;
  
  card.addEventListener('mouseenter', () => {
    // 只预取一次
    if (!card.dataset.prefetched) { // 如果预加载过了就不再加载了
      onArticleHover(articleId);
      card.dataset.prefetched = 'true'; // 请求预加载之后设置为 true
    }
  });
  
  card.addEventListener('click', () => { // 点击时，跳转页面
    navigateToArticle(articleId);
  });
});
```

**子线程`prefetch-worker.js`**

```js
// 预取缓存（内存缓存）
const prefetchCache = new Map();

// 监听主线程消息
self.addEventListener('message', async (event) => {
  const { type, id, url, requestId } = event.data;
  
  switch (type) {
    case 'prefetch':
      // 如果没有缓存过，开始预取
      if (!prefetchCache.has(id)) {
        try {
          // 在worker中发起fetch请求
          const response = await fetch(url);
          const data = await response.json();
          
          // 存入缓存
          prefetchCache.set(id, data);
          
          // 可选：报告预取成功
          self.postMessage({
            type: 'prefetchSuccess',
            id: id
          });
        } catch (error) {
          console.error(`Prefetch failed for article ${id}:`, error);
          // 预取失败也存一个标志，避免重复尝试
          prefetchCache.set(id, null);
        }
      }
      break;
      
    case 'getCached':
      // 响应主线程的请求
      self.postMessage({
        type: 'cachedArticle',
        requestId: requestId,
        id: id,
        data: prefetchCache.get(id) || null
      });
      break;
  }
});

// 缓存管理：定期清理旧缓存（24小时）
setInterval(() => {
  const now = Date.now();
  let count = 0;
  
  for (const [id, cachedAt] of prefetchCache) {
    // 如果缓存超过24小时（86400000ms）
    if (now - cachedAt.timestamp > 86400000) {
      prefetchCache.delete(id);
      count++;
    }
  }
  
  console.log(`Cleaned ${count} expired prefetch items`);
}, 3600000); // 每小时检查一次
```

**高级优化**：使用IndexedDB持久化缓存

```js
// 在worker中（prefetch-worker.js）添加IndexedDB支持
const CACHE_DB_NAME = 'prefetchCache';
let db;

// 初始化IndexedDB
const initDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(CACHE_DB_NAME, 1);
    
    request.onerror = (event) => {
      console.error('IndexedDB error:', event.target.error);
      reject(event.target.error);
    };
    
    request.onsuccess = (event) => {
      db = event.target.result;
      resolve();
    };
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('articles')) {
        db.createObjectStore('articles', { keyPath: 'id' });
      }
    };
  });
};

// 存储到IndexedDB
const cacheToIDB = (id, data) => {
  return new Promise((resolve, reject) => {
    if (!db) return resolve();
    
    const transaction = db.transaction('articles', 'readwrite');
    const store = transaction.objectStore('articles');
    
    const item = {
      id: id,
      data: data,
      timestamp: Date.now()
    };
    
    const request = store.put(item);
    
    request.onsuccess = () => resolve();
    request.onerror = (event) => {
      console.error('Cache to IDB error:', event.target.error);
      reject(event.target.error);
    };
  });
};

// 从IndexedDB读取
const getFromIDB = (id) => {
  return new Promise((resolve) => {
    if (!db) return resolve(null);
    
    const transaction = db.transaction('articles', 'readonly');
    const store = transaction.objectStore('articles');
    const request = store.get(id);
    
    request.onsuccess = (event) => {
      resolve(event.target.result ? event.target.result.data : null);
    };
    
    request.onerror = (event) => {
      console.error('Get from IDB error:', event.target.error);
      resolve(null);
    };
  });
};

// 在fetch逻辑中使用
self.addEventListener('message', async (event) => {
  // ... 其他代码 ...
  
  // 修改prefetch逻辑
  if (!prefetchCache.has(id)) {
    // 先检查IDB
    const cached = await getFromIDB(id);
    if (cached) {
      prefetchCache.set(id, cached);
    } else {
      try {
        // 获取数据
        const response = await fetch(url);
        const data = await response.json();
        
        // 存入内存和IDB
        prefetchCache.set(id, data);
        await cacheToIDB(id, data);
        
        // ... 报告预取成功 ...
      } catch (error) {
        // ... 错误处理 ...
      }
    }
  }
  
  // ... getCached逻辑类似
});
```



#### 3.预渲染 

在某些渲染场景下，比如渲染复杂的 canvas 的时候需要计算的效果比如反射、折射、光影、材料等，这些计算的逻辑可以使用 Worker 线程来执行，也可以使用多个 Worker 线程。

**主线程**

```js
// 获取 Canvas 元素并转成 OffscreenCanvas
const canvas = document.getElementById('renderCanvas');
const offscreen = canvas.transferControlToOffscreen();

// 创建渲染管理 Worker
const renderManager = new Worker('render-manager.js');

// 初始化渲染系统
renderManager.postMessage({ // 发送这些数据给子线程
  type: 'init',
  canvas: offscreen,
  width: canvas.width,
  height: canvas.height,
  workerCount: 4 // 可根据设备性能调整
}, [offscreen]);

// 用户交互处理（示例：光源位置改变）
function handleLightPositionChange(x, y, z) {
  renderManager.postMessage({ // 发送数据给子线程
    type: 'updateLight',
    position: [x, y, z]
  });
}

// 材质参数调整
function updateMaterial(type, properties) {
  renderManager.postMessage({
    type: 'updateMaterial',
    materialType: type,
    properties
  });
}

// 接收渲染完成通知
renderManager.onmessage = (event) => {
  if (event.data.type === 'frameReady') {
    // 更新UI显示渲染状态
    document.getElementById('fps').innerText = `FPS: ${event.data.fps.toFixed(1)}`;
    
    if (event.data.progress) {
      // 渐进式渲染显示进度
      updateProgressBar(event.data.progress);
    }
  }
};

// 销毁时清理
window.addEventListener('beforeunload', () => {
  renderManager.postMessage({ type: 'terminate' });
});
```

**子线程（渲染线程render-manager.js）**

```js
importScripts('gl-utils.js'); // WebGL实用函数

let workers = [];
let renderTasks = new Map();
let frameId = 0;
let frameStartTime = 0;
let sceneData = null;
let gl = null;
let renderTarget = null;

self.onmessage = (event) => {
  switch (event.data.type) {
    case 'init':
      initializeSystem(event.data);
      break;
      
    case 'updateLight':
      updateSceneLight(event.data.position);
      break;
      
    case 'updateMaterial':
      updateSceneMaterial(event.data.materialType, event.data.properties);
      break;
      
    case 'terminate':
      terminateWorkers();
      break;
  }
};

function initializeSystem(config) {
  // 创建WebGL上下文
  const canvas = config.canvas;
  gl = canvas.getContext('webgl2');
  
  // 创建离屏渲染目标
  renderTarget = createRenderTarget(gl, config.width, config.height);
  
  // 创建计算Worker池
  createWorkerPool(config.workerCount);
  
  // 初始化场景数据
  sceneData = initializeScene();
  
  // 开始渲染循环
  frameStartTime = performance.now();
  requestAnimationFrame(renderLoop);
}

function createWorkerPool(count) {
  for (let i = 0; i < count; i++) {
    const worker = new Worker(`render-worker.js`);
    worker.id = i;
    worker.onmessage = handleWorkerResponse;
    workers.push(worker);
  }
}

function updateSceneLight(position) {
  sceneData.light.position = position;
}

function updateSceneMaterial(type, properties) {
  sceneData.materials[type] = { ...sceneData.materials[type], ...properties };
}

function renderLoop(timestamp) {
  frameId++;
  
  // 分割渲染任务
  const tasks = createRenderTasks(sceneData, workers.length);
  
  // 分发给Worker
  tasks.forEach((task, i) => {
    workers[i].postMessage({
      type: 'renderTask',
      frameId,
      scene: sceneData,
      viewport: task.viewport,
      taskType: task.type
    });
  });
  
  // 启动超时检测（防止Worker卡死）
  renderTasks.set(frameId, {
    startTime: timestamp,
    tasksCompleted: 0,
    totalTasks: tasks.length
  });
  
  // 保持动画运行（Worker会通知我们何时渲染完成）
  requestAnimationFrame(renderLoop);
}

function handleWorkerResponse(event) {
  const data = event.data;
  const frameData = renderTasks.get(data.frameId);
  
  if (!frameData) return;
  
  if (data.type === 'result') {
    frameData.tasksCompleted++;
    
    // 处理Worker返回的渲染结果
    processRenderResult(data.result, data.viewport);
    
    if (frameData.tasksCompleted === frameData.totalTasks) {
      // 所有任务完成，最终合成
      finalizeFrame(frameId, data.frameStartTime);
    }
    
    // 部分结果到达时可渐进渲染
    else if (data.intermediateResult) {
      reportIntermediateProgress(frameId, frameData);
    }
  } else if (data.type === 'error') {
    console.error(`Worker ${data.workerId} error: ${data.message}`);
  }
}

function finalizeFrame(frameId, startTime) {
  // 应用后期处理效果
  applyPostProcessing(gl, renderTarget);
  
  // 报告渲染性能
  const frameTime = performance.now() - startTime;
  const fps = 1000 / frameTime;
  
  self.postMessage({
    type: 'frameReady',
    frameId,
    fps,
    frameTime
  });
  
  renderTasks.delete(frameId);
}
```

**子线程（渲染计算render-worker.js）**

```js
// 导入计算所需库
importScripts('glsl-compute.js', 'raytracer.js', 'materials.js');

// 预缓存常用函数
const math = {
  rayIntersect: cachedFunction(rayIntersect),
  calculateRefraction: cachedFunction(calculateRefraction),
  generateNoise: cachedFunction(generatePerlinNoise)
};

self.onmessage = (event) => {
  const { type, scene, viewport, frameId, taskType } = event.data;
  
  if (type !== 'renderTask') return;
  
  try {
    // 根据任务类型执行不同计算
    let result;
    switch(taskType) {
      case 'raytracing':
        result = renderRaytracing(scene, viewport);
        break;
        
      case 'shadows':
        result = renderShadows(scene, viewport);
        break;
        
      case 'material':
        result = renderMaterials(scene, viewport);
        break;
    }
    
    // 发送计算结果
    self.postMessage({
      type: 'result',
      frameId,
      result,
      taskType,
      viewport
    });
    
    // 渐进式渲染时发送中间结果
    if (scene.progressive) {
      self.postMessage({
        type: 'result',
        frameId,
        intermediateResult: result.slice(0, Math.floor(result.length * 0.5)), // 发送部分结果
        viewport
      });
    }
    
  } catch (error) {
    self.postMessage({
      type: 'error',
      frameId,
      message: error.toString(),
      taskType
    });
  }
};

// 示例光线追踪函数
function renderRaytracing(scene, viewport) {
  const { width, height } = viewport;
  const pixels = new Uint8ClampedArray(width * height * 4);
  
  // 基于场景设置迭代采样
  const samples = scene.quality === 'high' ? 16 : 4;
  
  for (let s = 0; s < samples; s++) {
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4;
        
        // 计算光线方向
        const ray = generateCameraRay(scene.camera, x, y);
        
        // 计算光线追踪颜色
        const color = traceRay(scene, ray);
        
        // 累计样本
        pixels[idx]     = (pixels[idx] || 0) + color[0] / samples;
        pixels[idx + 1] = (pixels[idx + 1] || 0) + color[1] / samples;
        pixels[idx + 2] = (pixels[idx + 2] || 0) + color[2] / samples;
        pixels[idx + 3] = 255; // Alpha
      }
    }
    
    // 每完成一定采样发送中间结果
    if (s % 4 === 0) {
      self.postMessage({
        type: 'result',
        frameId,
        intermediateResult: pixels.slice(),
        viewport,
        progress: s / samples
      });
    }
  }
  
  return pixels;
}

// 辅助函数：追踪单条光线
function traceRay(scene, ray, depth = 0) {
  if (depth > scene.maxDepth) return [0, 0, 0];
  
  const intersection = math.rayIntersect(scene.objects, ray);
  
  if (!intersection) {
    // 无交点则返回背景色
    return scene.background;
  }
  
  const { point, normal, material } = intersection;
  
  // 计算直接光照
  let color = calculateDirectLight(scene, point, normal, material);
  
  // 计算反射
  if (material.reflection > 0.01) {
    const reflectionRay = generateReflectionRay(ray, normal);
    const reflectionColor = traceRay(scene, reflectionRay, depth + 1);
    color = addColors(color, scaleColor(reflectionColor, material.reflection));
  }
  
  // 计算折射
  if (material.transparency > 0.01) {
    const refractionRay = math.calculateRefraction(ray, normal, material.ior);
    if (refractionRay) {
      const refractionColor = traceRay(scene, refractionRay, depth + 1);
      color = addColors(color, scaleColor(refractionColor, material.transparency));
    }
  }
  
  // 添加材质环境光
  color = addColors(color, material.emissive);
  
  return color;
}
```







#### 4.复杂数据处理场景 

某些检索、排序、过滤、分析会非常耗费时间，这时可以使用 Web Worker 来进行，不占用主线程。

**主线程**

```js
class SearchController {
  constructor() {
    // 创建数据管理Worker
    this.dataWorker = new Worker('data-manager.js');
    
    // 绑定消息处理器
    this.dataWorker.onmessage = this.handleWorkerResponse.bind(this);
    
    // 初始化数据系统
    this.initializeDataSystem();
  }
  
  initializeDataSystem() {
    this.dataWorker.postMessage({
      type: 'init',
      dataset: 'products',
      indexPath: '/indexes/product-index.idx'
    });
  }
  
  // 用户发起搜索
  searchProducts(query, filters, sortMethod) {
    // 显示加载状态
    UI.showLoading();
    
    this.dataWorker.postMessage({
      type: 'search',
      query: query,
      filters: filters,
      sort: sortMethod,
      requestId: Date.now() + '-' + Math.random().toString(36).slice(2)
    });
  }
  
  // 处理Worker响应
  handleWorkerResponse(event) {
    const data = event.data;
    
    switch(data.type) {
      case 'searchResults':
        // 显示搜索结果
        UI.displayResults(data.results);
        break;
        
      case 'analyticsData':
        // 更新分析图表
        Analytics.updateCharts(data.stats);
        break;
        
      case 'progress':
        // 更新进度条
        UI.updateProgress(data.percent);
        break;
    }
  }
  
  // 销毁时清理
  destroy() {
    this.dataWorker.terminate();
  }
}
```

**子线程（数据管理data-manager.js）**

```js
// 导入数据处理模块
importScripts('lunr.min.js', 'fuse.js', 'tiny-sort.min.js');

// 全局状态
let productIndex = null;
let rawData = null;
const analyticsCache = new Map();

self.onmessage = async (event) => {
  const { type } = event.data;
  
  switch(type) {
    case 'init':
      await initializeSystem(event.data);
      break;
      
    case 'search':
      processSearchRequest(event.data);
      break;
  }
};

async function initializeSystem(config) {
  // 从IndexedDB加载索引和数据
  const [indexData, products] = await Promise.all([
    loadIndexFromIDB(config.indexPath),
    fetchProductsFromAPI()
  ]);
  
  // 创建全文搜索索引
  productIndex = lunr.Index.load(JSON.parse(indexData));
  
  // 初始化数据
  rawData = products;
  
  // 报告初始化完成
  self.postMessage({ type: 'systemReady' });
}

async function processSearchRequest(request) {
  const { query, filters, sort, requestId } = request;
  
  // 分步处理并报告进度
  // 阶段1: 全文搜索 (30%)
  let results = await performSearch(query);
  reportProgress(requestId, 30);
  
  // 阶段2: 过滤 (20%)
  results = applyFilters(results, filters);
  reportProgress(requestId, 50);
  
  // 阶段3: 排序 (30%)
  results = sortResults(results, sort);
  reportProgress(requestId, 80);
  
  // 阶段4: 分析 (20%)
  const analytics = generateAnalytics(results);
  
  // 发送最终结果
  self.postMessage({
    type: 'searchResults',
    results: results.slice(0, 100), // 仅返回前100条
    total: results.length,
    requestId
  });
  
  // 发送分析数据
  self.postMessage({
    type: 'analyticsData',
    stats: analytics,
    requestId
  });
}

// 全文搜索实现
function performSearch(query) {
  if (!query.trim()) return rawData;
  
  // 使用Lunr.js进行搜索
  const searchResults = productIndex.search(query);
  
  // 获取匹配的文档ID
  const resultIds = new Set(searchResults.map(res => res.ref));
  
  // 检索完整数据
  return rawData.filter(product => resultIds.has(product.id));
}

// 多维度过滤器
function applyFilters(results, filters) {
  return results.filter(product => {
    // 价格过滤
    if (filters.priceRange && 
       (product.price < filters.priceRange[0] || 
        product.price > filters.priceRange[1])) {
      return false;
    }
    
    // 品牌过滤
    if (filters.brands && filters.brands.length > 0 &&
        !filters.brands.includes(product.brand)) {
      return false;
    }
    
    // 评分过滤
    if (filters.minRating && product.rating < filters.minRating) {
      return false;
    }
    
    // 其他属性过滤...
    return true;
  });
}

// 多策略排序
function sortResults(results, method) {
  switch(method) {
    case 'relevance':
      // 根据搜索得分排序（已在Lunr中计算）
      return results.sort((a, b) => b._score - a._score);
      
    case 'priceAsc':
      return results.sort((a, b) => a.price - b.price);
      
    case 'priceDesc':
      return results.sort((a, b) => b.price - a.price);
      
    case 'bestSelling':
      // 复杂排序：综合评分和销量
      return results.sort((a, b) => {
        const scoreA = (a.rating * 0.7) + (a.salesRank * 0.3);
        const scoreB = (b.rating * 0.7) + (b.salesRank * 0.3);
        return scoreB - scoreA;
      });
      
    default:
      return results;
  }
}

// 分析数据生成
function generateAnalytics(results) {
  // 价格分布
  const priceData = calculatePriceDistribution(results);
  
  // 品牌占比
  const brandData = calculateBrandShare(results);
  
  // 评分分析
  const ratingData = calculateRatingStats(results);
  
  return {
    priceDistribution: priceData,
    brandShare: brandData,
    ratingStats: ratingData,
    totalResults: results.length
  };
}

// 计算价格分布直方图
function calculatePriceDistribution(products) {
  // 找出价格范围
  const minPrice = Math.min(...products.map(p => p.price));
  const maxPrice = Math.max(...products.map(p => p.price));
  
  // 分成10个区间
  const range = (maxPrice - minPrice) / 10;
  const buckets = Array(10).fill(0).map((_, i) => ({
    from: minPrice + i * range,
    to: minPrice + (i + 1) * range,
    count: 0
  }));
  
  // 统计每个价格区间的产品数量
  products.forEach(product => {
    for (let i = 0; i < buckets.length; i++) {
      if (product.price >= buckets[i].from && product.price < buckets[i].to) {
        buckets[i].count++;
        break;
      }
    }
  });
  
  return buckets;
}
```

**高级优化策略**

```js
// 在数据管理Worker中添加以下优化功能

// 1. 索引预热
function warmupIndex() {
  // 预加载热门搜索词
  const popularQueries = ['laptop', 'phone', 'shoes', 'dress'];
  popularQueries.forEach(query => {
    productIndex.search(query);
  });
}

// 2. 增量索引更新
function updateIndex(newProducts) {
  // 在后台增量更新索引
  const updateWorker = new Worker('index-updater.js');
  
  updateWorker.postMessage({
    type: 'partialUpdate',
    newProducts,
    existingIndex: productIndex.toJSON()
  });
  
  updateWorker.onmessage = (event) => {
    if (event.data.type === 'indexUpdated') {
      productIndex = lunr.Index.load(event.data.updatedIndex);
      self.postMessage({ type: 'indexUpdated' });
    }
  };
}

// 3. 缓存系统（memoization）
const filterCache = new Map();
const sortCache = new Map();

function applyFiltersWithCache(results, filters) {
  const cacheKey = JSON.stringify(filters);
  
  // 检查缓存
  if (filterCache.has(cacheKey)) {
    return filterCache.get(cacheKey);
  }
  
  // 缓存计算结果
  const filteredResults = applyFilters(results, filters);
  filterCache.set(cacheKey, filteredResults);
  
  return filteredResults;
}

// 4. 性能监控
function startPerformanceProfiler() {
  setInterval(() => {
    const memUsage = performance.memory ? 
      performance.memory.usedJSHeapSize : 'N/A';
    
    self.postMessage({
      type: 'perfMetrics',
      memory: memUsage,
      queueSize: currentTasks.size
    });
    
    // 内存紧张时清除缓存
    if (memUsage > 500000000) { // 500MB
      filterCache.clear();
      sortCache.clear();
      analyticsCache.clear();
    }
  }, 10000);
}
```



#### 5.预加载图片 

有时候一个页面有很多图片，或者有几个很大的图片的时候，如果业务限制不考虑懒加载，也可以使用 Web Worker 来加载图片。

```js
// 主线程
let w = new Worker("js/workers.js");
w.onmessage = function (event) {
  var img = document.createElement("img");
  img.src = window.URL.createObjectURL(event.data);
  document.querySelector('#result').appendChild(img)
}

// worker线程
let arr = [...好多图片路径];
for (let i = 0, len = arr.length; i < len; i++) {
    let req = new XMLHttpRequest();
    req.open('GET', arr[i], true);
    req.responseType = "blob";
    req.setRequestHeader("client_type", "DESKTOP_WEB");
    req.onreadystatechange = () => {
      if (req.readyState == 4) {
      postMessage(req.response);
    }
  }
  req.send(null);
}
```

### 五、注意事项

实战的时候注意

- 虽然使用 worker 线程不会占用主线程，但是启动 worker 会比较耗费资源
- 主线程中使用 XMLHttpRequest 在请求过程中浏览器另开了一个异步 http 请求线程，但是交互过程中还是要消耗主线程资源





















































