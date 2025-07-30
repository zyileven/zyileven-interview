## Performance

Performance 接口可用于获取当前页面中与性能相关的信息。

性能条目特定于执行上下文。你可以通过 `Window.performance` 访问窗口中运行的代码的性能信息，通过 `WorkerGlobalScope.performance` 访问 worker 中运行的代码的性能信息。



### 实例属性

#### eventCounts

只读的 `performance.eventCounts` 属性是一个 [`EventCounts`](https://developer.mozilla.org/en-US/docs/Web/API/EventCounts) 映射，包含每种事件类型已派发的事件数量。

**报告事件类型及其计数**

如果你想要将事件计数发送到你的分析系统，你可能需要实现一个像 sendToEventAnalytics 这样的函数，该函数从 performance.eventCounts 映射中获取事件计数，然后使用 Fetch API 将数据发送到你的端点。

```js
// Report all exposed events
for (entry of performance.eventCounts.entries()) {
  const type = entry[0];
  const count = entry[1];
  // sendToEventAnalytics(type, count);
}

// 指定事件的触发次数
const clickCount = performance.eventCounts.get("click");
// sendToEventAnalytics("click", clickCount);

// 检查是否公开这个类型的事件计数
const isExposed = performance.eventCounts.has("mousemove"); // false

```

#### timeOrigin

接口 Performance 的只读属性 timeOrigin 返回一个表示 the performance measurement 开始时间的高精度 timestamp。

表示当前文档或 Worker 开始性能测量的绝对时间起点，所有通过 `performance.now()` 获取的时间值均相对于此基准点计算。

```js
var timeOrigin = performance.timeOrigin
```

### 实例方法

#### mark()

**`mark()`** 方法创建一个名为 [`PerformanceMark`](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceMark) 的对象，该对象代表浏览器性能时间线中的一个高精度时间戳标记。

**语法**

```js
mark(name)
mark(name, markOptions)
```

**参数**

`name`：一个表示标记名称的字符串。

`markOptions`：一个用于指定时间戳和附加元数据的对象，具有以下参数：

- `detail`：要包含在 mark 中的任意元数据。默认值为 null。必须是 可结构化克隆的 。
- `startTime`：用作 mark 时间的 DOMHighResTimeStamp。默认值为 performance.now()。

**返回值**

创建的 [`PerformanceMark`](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceMark) 条目。

##### 创建命名标记

以下示例使用 mark() 创建命名的 PerformanceMark 条目。您可以创建具有相同名称的多个标记。您还可以将它们赋值，以引用已创建的 PerformanceMark 对象。

```js
performance.mark("login-started");
performance.mark("login-started");
performance.mark("login-finished");
performance.mark("form-sent");

const videoMarker = performance.mark("video-loaded");
```

##### 创建带详情的标记

性能标记可以通过 `markOptions` 对象进行配置，你可以在 `detail` 属性中添加额外信息，该属性可以是任何类型。

```js
performance.mark("login-started", {
  detail: "Login started using the login button in the top menu.",
});

performance.mark("login-started", {
  detail: { htmlElement: myElement.id },
});
```

##### 使用不同的开始时间创建标记

mark() 方法的默认时间戳是 performance.now()。你可以使用 markOptions 中的 startTime 选项将其设置为不同的时间。

```js
performance.mark("start-checkout", {
  startTime: 20.0,
});

performance.mark("login-button-pressed", {
  startTime: myEvent.timeStamp,
});
```

#### measure()

measure() 方法创建一个名为 PerformanceMeasure 对象，该对象表示浏览器性能时间轴中两个标记之间的时间测量。

在两个标记之间进行测量时，分别有一个开始标记和结束标记 。命名的时间戳称为测量 。

人话：测两个标记之间的时间差

```js
measure(measureName)
measure(measureName, startMark)
measure(measureName, startMark, endMark)
measure(measureName, measureOptions)
measure(measureName, measureOptions, endMark)

```

如果仅指定了 measureName ，则开始时间戳设置为零，结束时间戳（用于计算持续时间）是 Performance.now() 返回的值。

##### measureOptions

- detail：度量中包含的任意元数据。默认为 null 。必须是结构化可克隆的 。
- start：用作开始时间的时间戳（ DOMHighResTimeStamp ），或命名用于开始时间的 PerformanceMark 字符串。
- duration：开始标记时间与结束标记时间之间的时长（以毫秒为单位）。如果省略，则默认为 performance.now() ；即自上下文创建以来已过去的时间。如果提供，则还必须指定 start 或 end ，但不能同时指定两者。
- end：用作结束时间的时间戳（ DOMHighResTimeStamp ），或命名用于结束时间的 PerformanceMark 字符串。如果这是一个命名 PerformanceMark 字符串，那么它的定义方式与 endMark 相同。

#### clearMarks()

`clearMarks()` 这个方法可以从浏览器的 performance entry 缓存中移除声明的标记。如果调用这个方法时没有传递参数，则所有带有entry type这类标记的performance entries 将从 performance entry 缓存区中被移除。

人话：清除 mark（标记）

```js
function clear_mark(name) { 
  if (performance.clearMarks === undefined) {
    console.log("performance.clearMarks Not supported"); // 检查方法兼容性
    return;
  }
  //移除所有标记了此名称的 peformance entry
  performance.clearMarks(name);
}
function clear_all_marks() { 
  if (performance.clearMarks === undefined) {
    console.log("performance.clearMarks Not supported");
    return;
  }
  //从 performance 缓冲区中移除所有标记的 performance entry
  performance.clearMarks();
}

```

`performance.clearMarks(name)`：移除所有标记了此名称的 peformance entry

`performance.clearMarks()`：从 performance 缓冲区中移除所有标记的 performance entry



#### clearMeasures()

clearMeasures() 方法可以从浏览器的性能入口缓存区中移除声明的度量衡。如果这个方法被调用时没有传入参数，则所有 entry type 标记值为"measure" 的性能实体将被从性能入口缓存区中移除。

人话：清除 measure（测量）

```js
function clear_measure(name) {
  if (performance.clearMeasures === undefined) {
    console.log("performance.clearMeasures Not supported");
    return;
  }
  // 根据给定的 name 移除所有标记类型为 "measure" 的性能入口
  performance.clearMeasures(name);
}
function clear_all_measures() {
  if (performance.clearMeasures === undefined) {
    console.log("performance.clearMeasures Not supported");
    return;
  }
  // 移除性能缓存区中所有标记类型为 "measure" 的性能入口
  performance.clearMeasures();
}

```

`performance.clearMeasures(name)`：根据给定的 name 移除所有标记类型为 "measure" 的性能入口

`performance.clearMeasures()`：移除性能缓存区中所有标记类型为 "measure" 的性能入口



#### now()

performance.now() 方法返回一个高精度的时间戳（以毫秒为单位）。它表示自 Performance.timeOrigin （在窗口上下文中导航开始的时间，或在 Worker 和 ServiceWorker 上下文中运行工作进程的时间）以来经过的时间。

now = 当前时间 - timeOrigin时间

人话：从开始到现在，过了多久了。

#### toJSON()

 toJSON() 方法是一个序列化器 ；它返回 Performance 对象的 JSON 表示形式。

返回一个作为 Performance 对象序列化的 JSON 对象。

返回的 JSON 不包含 eventCounts 属性，因为它属于 EventCounts 类型，而该类型不提供 toJSON() 操作。

```js
performance.toJSON()
// 输出结果是

const result = {
  "timeOrigin": 1668077531367.4,
  "timing": {
    "connectStart": 1668077531372,
    "navigationStart": 1668077531367,
    "secureConnectionStart": 0,
    "fetchStart": 1668077531372,
    "domContentLoadedEventStart": 1668077531580,
    "responseStart": 1668077531372,
    "domInteractive": 1668077531524,
    "domainLookupEnd": 1668077531372,
    "responseEnd": 1668077531500,
    "redirectStart": 0,
    "requestStart": 1668077531372,
    "unloadEventEnd": 0,
    "unloadEventStart": 0,
    "domLoading": 1668077531512,
    "domComplete": 1668077531585,
    "domainLookupStart": 1668077531372,
    "loadEventStart": 1668077531585,
    "domContentLoadedEventEnd": 1668077531580,
    "loadEventEnd": 1668077531585,
    "redirectEnd": 0,
    "connectEnd": 1668077531372
  },
  "navigation": {
    "type": 0,
    "redirectCount": 0
  }
}

```





### 使用场景

#### **计算绝对时间**

将 `performance.now()` 的相对时间转换为绝对时间：

```js
const startTime = performance.timeOrigin + performance.now();
console.log("当前绝对时间:", startTime); // 输出类似 1678889977578.233
```

#### **跨上下文时间同步**

在 Worker 和主线程间同步时间戳：

```js
// Worker 中
const workerStart = performance.now() + performance.timeOrigin;
postMessage({ startTime: workerStart });

// 主线程中
worker.onmessage = (e) => {
    const adjustedTime = e.data.startTime - performance.timeOrigin;
    console.log("Worker任务相对于主线程的时间:", adjustedTime);
}
```

#### **性能监控**

结合 `performance.mark()` 和 `performance.measure()` 记录关键阶段耗时：

```js
performance.mark("start");
// 执行代码...
performance.mark("end");
performance.measure("total", "start", "end");

const duration = performance.getEntriesByName("total")[0].duration;
console.log(`耗时: ${duration}ms (基准: ${performance.timeOrigin})`)
```















