# React Fiber 架构

React 的 Fiber 架构是 React 16 版本引入的核心改进，旨在解决传统 React 在复杂场景下的性能瓶颈和响应性问题。

在 React 中，Fiber 是一种用于描述组件树的数据结构，它代表了一个可中断的、可恢复的渲染任务。传统的渲染过程是递归式的，一旦开始渲染，就无法中断，直到渲染完成或发生错误。而 Fiber 架构将渲染过程分解成多个小任务，使得在渲染过程中可以中断，并且可以根据需要重新调度任务。Fiber 的引入使得 React 应用能够更好地利用浏览器的空闲时间，提升性能和用户体验。

## **一、传统 React 架构的局限性**

React 最初的架构在处理 UI 更新时采用了同步的、阻塞的方式。即一次更新会从根节点开始递归遍历整棵组件树，直至完成所有组件的渲染。这种方式在处理简单的 UI 时表现良好，但随着应用的复杂性增加，特别是在处理大量节点更新或频繁用户交互时，传统架构暴露出了以下几个主要局限性：

- **单次渲染时间过长**：当组件树较大时，一次完整的渲染更新可能会占用大量的时间，这会导致主线程被阻塞，无法响应用户的输入，进而影响用户体验。
- **缺乏优先级管理**：传统架构无法根据任务的重要性分配优先级，所有更新一视同仁，这意味着关键任务（如用户输入处理）可能会被不重要的任务（如低优先级的动画或日志更新）阻塞。
- **中断和恢复困难**：在传统架构中，一旦开始渲染更新，就无法中途中断并恢复，这使得在处理高优先级任务时非常不灵活。

## 二、React 要解决的问题

为了克服传统 React 架构的局限性，React 团队提出了 Fiber 架构。Fiber 是 React 的一种新的协调引擎，它通过将更新过程拆分为多个小任务来解决性能瓶颈和用户体验问题

### 1.性能瓶颈

- **增量渲染**：Fiber 将渲染过程分成多个可以中断的小任务，这样即使组件树非常庞大，每个任务的执行时间也会较短，避免了长时间的阻塞。
- **任务分片**：通过任务分片（Time Slicing）技术，Fiber 可以在空闲时间片段内执行渲染任务，从而最大限度地利用浏览器的空闲时间，提升整体性能。

### 2.用户体验问题

- **响应性提升**：通过将任务拆分并分配优先级，Fiber 可以确保高优先级的用户交互任务能够尽快得到处理，而不会被低优先级任务阻塞。
- **平滑的用户体验**：由于渲染过程可以中断并恢复，Fiber 可以更灵活地处理动画和过渡效果，提供更加平滑的用户体验。

### 3.Fiber 架构的目标

- **提升性能**：通过增量渲染和任务分片等技术，显著降低长时间渲染任务对用户体验的影响。
- **灵活性和扩展性**：Fiber 架构为未来的新特性和优化奠定了基础，例如 Concurrent Mode 和 Suspense，这些特性能够进一步提升 React 应用的性能和开发体验。
- **可维护性和可调试性**：新的架构不仅提升了性能，还改进了 React 内部的代码结构，使得调试和维护更加容易。



## 三、Fiber 架构的基本概念

在 React 中，Fiber 是一种用于描述组件树的数据结构，它代表了一个可中断的、可恢复的渲染任务。传统的渲染过程是递归式的，一旦开始渲染，就无法中断，直到渲染完成或发生错误。而 Fiber 架构将渲染过程分解成多个小任务，使得在渲染过程中可以中断，并且可以根据需要重新调度任务。Fiber 的引入使得 React 应用能够更好地利用浏览器的空闲时间，提升性能和用户体验。

```js
{
    stateNode: new ClickCounter,
    type: clickCounter,
    alternate: null,
    key: null,
    updateQueue: null,
    memoizedstate: {count:0},
    pendingProps: {}
    memoizedProps: {},
    tag: 1,
    effectTag: 0,
    nextEffect: null
}
```

Fiber 节点是一个 JavaScript 对象，用于描述组件树的结构和状态。每个 Fiber 节点包含了与组件相关的信息，如类型、props、state、效果标记（effect tag）等。Fiber 节点还包含了指向其子节点、兄弟节点和父节点的引用，以构建组件树的层级结构。Fiber 节点的数据结构设计使得 React 能够更高效地管理组件树的更新和渲染过程。

### **1.Fiber 树**

Fiber 树的创建过程主要包括以下几个步骤：

1. **根据 JSX 构建虚拟 DOM 树**：React 会根据 JSX 语法构建虚拟 DOM 树，表示整个组件树的结构。
2. **生成 Fiber 节点**：对于每个虚拟 DOM 节点，React 会生成对应的 Fiber 节点，并建立起 Fiber 树的层级结构。
3. **执行初次渲染**：React 会从根节点开始递归遍历 Fiber 树，执行组件的生命周期方法和渲染函数，将组件树渲染到 DOM 中。

Fiber 节点之间通过不同类型的指针（如 child、sibling、return 等）相互连接，构成了 Fiber 树，表示了组件树的结构。

![Fiber树](https://raw.githubusercontent.com/zyileven/image-hosting-platform/master/src/2025/07/18/977c652886a3778bca1d95daf6a3df99-0e195735c8324a6cbb4cdfee5dc1b688-tplv-73owjymdk6-jj-mark-v1-0-0-0-0-5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5rSe56qd5oqA5pyv-q75-46602a.awebp)

在 Fiber 架构中，Fiber 树的构建是一个增量的过程，即渲染过程可以在任意时刻中断，并在下一个空闲时间片段内恢复。这种设计使得 React 能够更灵活地处理大型组件树的更新，并且可以根据需要调整更新的优先级。

### 2.更新 Fiber 树

更新过程是指在组件状态或属性发生变化时，React 如何更新组件树以反映这些变化。树的协调和更新过程主要包括以下几个步骤：

- **触发更新**：当组件的状态或属性发生变化时，React 会调用相应的更新函数，标记组件为需要更新状态。
- **生成新的虚拟 DOM 树**：React 会根据新的状态或属性生成一棵新的虚拟 DOM 树，表示组件树的更新后状态。
- **协调新旧树**：React 使用协调算法比较新旧两棵虚拟 DOM 树的差异，找出需要更新的部分。
- **执行更新**：根据协调算法的结果，React 会更新 Fiber 树的相应节点，执行组件的生命周期方法和渲染函数，将更新后的组件树渲染到 DOM 中。



### **3.协调（Reconciliation）**

在 React 中，协调是指确定组件树的更新方式，即如何将新的状态映射到 UI 上。

传统的协调算法是递归式的深度优先遍历，即通过递归遍历虚拟 DOM 树来查找需要更新的节点，并进行相应的更新操作。然而，这种算法在处理大型组件树或高频更新时效率较低，可能导致界面卡顿或响应缓慢。

传统的协调算法采用深度优先遍历虚拟 DOM 树的方式来进行更新。这种算法的问题在于，一旦开始更新，就无法中断，直到所有节点都完成更新或者发生错误。这导致在更新过程中无法处理其他任务，从而影响了用户体验。

#### 新的协调算法：增量渲染

为了解决传统协调算法的局限性，React 引入了一种新的协调算法：增量渲染。增量渲染的核心思想是将协调过程分解为多个小任务，并使用任务调度器（Scheduler）来动态地调度这些任务。这种方式使得在更新过程中可以中断，并在下一个空闲时间片段内恢复，从而提高了渲染的灵活性和效率。

通过增量渲染，React 能够更好地利用浏览器的空闲时间，提升界面的响应速度和用户体验。同时，增量渲染还为 React 引入了一些新的特性，如时间切片（Time Slicing）和任务优先级调度，使得 React 应用能够更好地适应不同的网络环境和设备性能。

## 四、Fiber 架构的工作原理

### 1.双缓存

在 React 中，双缓存是一种用于解决 UI 渲染过程中闪烁和视觉不连续的技术。传统的渲染过程中，更新操作会直接修改 DOM，导致在更新过程中用户可能会看到中间状态的 UI，造成视觉上的不连续和不稳定。双缓存技术通过在内存中维护两份 UI 状态，一份用于渲染当前帧，另一份用于计算下一帧的状态，从而避免了直接在 DOM 上进行更新操作。

### 2.双缓存Fiber树

在`React`中最多会同时存在两棵`Fiber树`。当前屏幕上显示内容对应的`Fiber树`称为`current Fiber树`，正在内存中构建的`Fiber树`称为`workInProgress Fiber树`。

`current Fiber树`中的`Fiber节点`被称为`current fiber`，`workInProgress Fiber树`中的`Fiber节点`被称为`workInProgress fiber`，他们通过`alternate`属性连接。

```js
currentFiber.alternate === workInProgressFiber;
workInProgressFiber.alternate === currentFiber;
```

`React`应用的根节点通过使`current`指针在不同`Fiber树`的`rootFiber`间切换来完成`current Fiber`树指向的切换。

即当`workInProgress Fiber树`构建完成交给`Renderer`渲染在页面上后，应用根节点的`current`指针指向`workInProgress Fiber树`，此时`workInProgress Fiber树`就变为`current Fiber树`。

每次状态更新都会产生新的`workInProgress Fiber树`，通过`current`与`workInProgress`的替换，完成`DOM`更新。

接下来我们以具体例子讲解`mount`、`update`的构建/替换流程。

#### mount时

```jsx
function App() {
  const [count, add] = useState(0);
  return (
    <div onClick={() => add(count + 1)}>{count}</div>
  )
}
ReactDOM.render(<App/>, document.getElementById('root'));

```

1. 首次创建时

   首次执行`ReactDOM.render`会创建`fiberRootNode`（源码中叫`fiberRoot`）和`rootFiber`。其中`fiberRootNode`是整个应用的根节点，`rootFiber`是`<App/>`所在组件树的根节点。

   之所以要区分`fiberRootNode`与`rootFiber`，是因为在应用中我们可以多次调用`ReactDOM.render`渲染不同的组件树，他们会拥有不同的`rootFiber`。但是整个应用的根节点只有一个，那就是`fiberRootNode`。

   `fiberRootNode`的`current`会指向当前页面上已渲染内容对应`Fiber树`，即`current Fiber树`。

   ```js
   fiberRootNode.current = rootFiber;
   ```

   由于是首屏渲染，页面中还没有挂载任何`DOM`，所以`fiberRootNode.current`指向的`rootFiber`没有任何`子Fiber节点`（即`current Fiber树`为空）。

   ![image-20250718下午45242391](https://raw.githubusercontent.com/zyileven/image-hosting-platform/master/src/2025/07/18/dac160f8c4ad8dd8fb9f35bb754f2fca-image-20250718下午45242391-6ddd66.png)

2. 渲染阶段

   接下来进入 `render 阶段`，根据组件返回的 `JSX` 在内存中`依次创建 Fiber 节点`并`连接`在一起，构建 Fiber 树，被称为 `workInProgress Fiber 树` 。

   在构建 workInProgress Fiber 树时会`尝试复用` current Fiber 树中已有的 Fiber 节点内的属性，在首屏渲染时只有 rootFiber 存在对应的 current fiber (即 `rootFiber.alternate` ) 。

   下图中`左侧`为页面显示的树，`右侧`为内存中构建的树：

   ![image-20250718下午45430439](https://raw.githubusercontent.com/zyileven/image-hosting-platform/master/src/2025/07/18/2fe3df57e55a56a90978b234a6fd4ba1-image-20250718下午45430439-87e501.png)

3. 提交阶段

   已构建完的 `workInProgress Fiber 树` 在 `commit 阶段` 渲染到页面。

   此时 DOM 更新为`右侧树`对应的样子。fiberRootNode 的 current 指针指向 `workInProgress Fiber 树` 使其变为 `current Fiber 树` 。

   ![image-20250718下午45559891](https://raw.githubusercontent.com/zyileven/image-hosting-platform/master/src/2025/07/18/ae2aeb479814ce7aea525f4ed8784954-image-20250718下午45559891-662900.png)

#### update 时

1. 点击 div 节点，触发状态改变

   接下来我们点击 div 节点触发状态改变，这会开启一次`新的 render 阶段`并构建一棵新的 workInProgress Fiber 树。

   和 mount 时一样，workInProgress fiber 的创建可以`复用` current Fiber 树对应的节点数据。

   ![image-20250718下午45920484](https://raw.githubusercontent.com/zyileven/image-hosting-platform/master/src/2025/07/18/fc3436b0683381038e030305daed1c7f-image-20250718下午45920484-3219a1.png)

2. 渲染之后，提交

   workInProgress Fiber 树在 `render 阶段` 完成构建后进入 `commit 阶段` 渲染到页面上。渲染完毕后，workInProgress Fiber 树变为current Fiber 树。

   ![2](https://raw.githubusercontent.com/zyileven/image-hosting-platform/master/src/2025/07/18/afe8c78f50b6226fab5da66d0f8f9bda-942f1c06c45b4b3783aca8e685b5de34-tplv-73owjymdk6-jj-mark-v1-0-0-0-0-5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5rSe56qd5oqA5pyv-q75-398a29.awebp)

   双缓存技术能够有效地解决 UI 渲染过程中的闪烁和不连续问题，提升用户体验和界面稳定性。

### **时间切片**

时间切片是一种将任务拆分成多个小片段，在浏览器空闲时间执行的技术。在 React 中，时间切片被用于将渲染任务拆分成多个小任务，并在多个帧之间动态调度执行，以提高页面的响应速度和用户体验。

- **任务队列（Task Queue）**: React 将所有的更新操作（如状态更新或属性更改）封装成任务，并放入一个任务队列中。
- **执行任务**: React 从任务队列中取出任务并执行。在执行过程中，React 会检查当前任务的执行时间。
- **时间检查**: 如果任务的执行时间超过了一个预设的阈值（默认是5毫秒），React 会中断当前任务的执行。
- **让出线程**: React 使用 `MessageChannel` 和 `postMessage` API 来让出执行线程。这意味着浏览器可以在此时处理其他任务，如用户输入或动画。
- **继续执行**: 一旦浏览器处理完其他任务，它将通过 `onmessage` 事件来继续执行之前中断的任务。
- **循环执行**: 这个过程会一直重复，直到任务队列中的所有任务都被执行完毕。

### **优先级调度**

优先级主要分为如下集中优先级：

```js
// 无优先级任务
export const NoPriority = 0;
// 立即执行任务
export const ImmediatePriority = 1;
// 用户阻塞任务
export const UserBlockingPriority = 2;
// 正常任务
export const NormalPriority = 3;
// 低优先级任务
export const LowPriority = 4;
// 空闲执行任务
export const IdlePriority = 5;
```

在 React 中，任务被划分为不同的优先级，以便根据任务的重要性进行调度。通常情况下，React 将任务分为以下几个优先级：

- **同步任务**：最高优先级的任务，通常用于处理用户交互事件和页面加载过程中的同步操作。
- **异步任务**：中等优先级的任务，包括普通的更新任务和网络请求等异步操作。
- **空闲任务**：最低优先级的任务，通常用于执行一些不紧急的任务，如日志记录或统计信息收集等。

**调度器**是 React 中负责任务调度的核心组件，它根据任务的优先级和类型来动态地安排任务的执行顺序。调度器会监视浏览器的空闲时间，并根据当前任务队列中的任务优先级，决定在何时执行哪些任务。



## 五、Concurrent Mode 并发模式

Concurrent Mode 是 React Fiber 的一项重要特性，它是一种新的渲染模式，旨在提高 React 应用的性能和用户体验。在 Concurrent Mode 下，React 能够在多个优先级任务之间动态地调度执行，使得高优先级任务能够优先得到处理，从而提高了页面的响应速度和用户交互的流畅度。

Concurrent Mode 利用了 Fiber 架构的增量渲染和时间切片技术，实现了多优先级任务的动态调度。通过 Fiber 架构，React 能够将渲染任务拆分成多个小任务，并在浏览器空闲时间执行，从而最大限度地利用浏览器的资源，提高了渲染效率和用户体验。

### 1.batchedUpdates 批量更新

在React的事件处理过程中，如果连续触发多次状态更新，这些更新可能会被智能地合并为单一的更新操作，以避免不必要的渲染。例如，以下代码片段：

```jsx
// class
onClick() {
  this.setState({ count: 1 });
  this.setState({ flag: false });
  this.setState({ count: 2 });
}

// function
const [count, setCount] = useState(0);
const [flag, setFlag] = useState(false);

function handleClick() {
    setCount(c => c + 1); // 不会重新render
    setFlag(f => !f); // 不会重新render
    // 合并后才会 重新render
}
```

尽管看起来我们进行了三次状态更新，实际上，React 会将这些更新合并，只触发一次组件的重新渲染。这种优化策略被称为 `batchedUpdates`。

`batchedUpdates` 在React早期版本就已经存在，但其早期实现有一定的局限性，主要是它不能合并那些脱离当前上下文环境的更新。

在 `Concurrent Mode` 这种模式下，状态更新的合并不再局限于当前上下文，而是根据更新的优先级来决定是否合并。这意味着，即使更新操作发生在不同的上下文或异步操作中，只要它们的优先级允许，这些更新仍然可以被有效地合并。 这种基于优先级的更新合并策略，不仅提高了应用的响应速度，还使得状态管理更加高效和灵活。

Concurrent Mode 还提供了一种优雅降级的机制，用于处理低优先级任务无法立即执行的情况。在任务无法立即执行时，Concurrent Mode 能够自动调整任务的优先级，保证高优先级任务能够得到及时处理，从而避免页面加载和渲染的阻塞，提高用户体验的稳定性和流畅度。





引用自：

作者：洞窝技术

链接：https://juejin.cn/post/7395079370795663414

来源：稀土掘金

著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。











