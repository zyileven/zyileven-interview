## startTransition

React 18 引入的 `startTransition` 是**并发模式（Concurrent Mode）**的核心特性之一，旨在通过区分任务的优先级优化用户界面的响应性。其本质是将非紧急更新标记为“可中断的低优先级任务”，确保紧急交互（如输入、点击）不被阻塞，从而提升用户体验。



### 核心概念

#### 任务优先级划分

通过将任务分为紧急任务与非紧急任务的方式，我们可以让紧急任务优先执行而让非紧急任务暂缓执行。

**紧急任务**：需立即响应用户交互（如输入框输入、按钮点击）

**非紧急任务**：可延迟处理的更新（如大数据列表渲染、搜索过滤、分页切换）

> `startTransition` 将非紧急任务标记为低优先级，避免其阻塞高优先级任务，确保界面流畅



### 工作原理：并发调度的底层机制

#### Lane 优先级模型

React 将更新任务分配到不同优先级的“赛道”（Lane），例如

- 高优先级：`SyncLane`（同步赛道）：用户输入
- 低优先级：`TransitionLane`（过度赛道）：通过 `startTransition` 标记

#### Fiber 架构的可中断渲染

**传统模式**：渲染不可中断，长任务阻塞界面（Legacy Mode）

**并发模式**：使用 `workLoopConcurrent`，在时间片（5ms）耗尽时暂停渲染，让出主线程

```ts
// 伪代码：并发模式的任务调度
while (任务存在 && 未超时) {
  执行任务单元();
}
```

低优先级任务被拆分为多个可中断的小任务，避免长时间占用主线程

#### 状态更新流程

调用 `startTransition` 时：

- 同步执行回调函数，但其中的状态更新被标记为“过渡更新”。
- React 触发两次渲染：
  1. 设置 `isPending=true`（高优先级）；
  2. 执行回调中的更新并设置 `isPending=false`（低优先级）



### 使用方式

使用方式有两种 API：

- **`startTransition`**：基础函数，适用于类组件或外部逻辑。
- **`useTransition`**：Hook 形式，返回 `[isPending, startTransition]`，可显示加载状态

```ts
const [isPending, startTransition] = useTransition();

startTransition(() => {
  setSearchQuery(input); // 低优先级更新
});
```

或者直接引入

```ts
import { startTransition } from 'react';

function TabContainer() {
  const [tab, setTab] = useState('about');

  function selectTab(nextTab) {
    startTransition(() => {
      setTab(nextTab);
    });
  }
  // ...
}
```

> **禁止控制输入框**：输入更新需同步，不可标记为过渡
>
> ``` tsx
> // 错误示例：会导致输入卡顿
> startTransition(() => setText(e.target.value));
> ```

回调函数必须是**同步**的，异步操作需外置

```tsx
// 错误：异步回调内的更新不生效
startTransition(async () => {
  await fetchData();
  setData(); // ❌ 未被标记
});

// 正确：先执行异步，再包裹同步更新
const data = await fetchData();
startTransition(() => setData(data));
```



### 应用场景

#### 搜索/过滤：输入框实时响应，结果列表延迟渲染。

输入时触发大数据量过滤计算，导致输入卡顿。通过`useDeferredValue` 延迟列表更新 + `useTransition` 取消冗余请求，解决此问题：

```tsx
import { useState, useDefferedValue, useTransition, useMemo } from "react";

function SearchFilter({items}) {
  const [query, setQuqery] = useState("");
	// 延迟过滤值（自动低优先级更新）
  const defferedQuery = useDefferedValue(query);
  const [isPending, startTransition] = useTransition();
  
  const handleInput = (e) => {
    const value = e.target.value;
    setQuery(value); // 高优先级：立即更新输入框
    // 低优先级：取消未完成的过滤任务，比如快速输入 abc 时，每个字母间隔输入时间为 10ms,而filteredItems获取返回值的时间时 200ms，那么每次输入都回取消掉上一次的计算任务
    startTransition(() => {
      // 此处可以发请求
      // ...
    })
  }
  // 计算过滤结果（耗时操作）
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      return item.name.toLowerCase().includes(defferedQuery.toLowerCase())
    });
  }, [defferedQuery, items])
  
  return <div>
  	<input 
      value={query} 
      onChange={handleInput} 
      placeholder="搜索商品..." 
    />
    {isPending && <div>加载中...</div>}
    <ul>
    	{
				filteredItems.map(item => (
          <li key={item.id}>{item.name}</li>
        ))
      }
    </ul>
  </div>
}

```

- deferredQuery 保证输入框即时响应，过滤计算延迟执行
- startTransition 中断旧搜索任务，避免冗余请求
- isPending 提供加载状态反馈



#### 视图切换：选项卡切换时，保持旧视图直至新视图就绪

选项卡切换时白屏或闪烁，`useTransition` 管理视图优先级 + `isPending` 控制过渡状态

```tsx
import { useState, useTransition } from "react";

function TabSwitcher() {
  
  const [tab, setTab] = useState("home");
  const [isPending, startTransition] = useTransition();
  
  const handleSwitchTab = (newTab) => {
    startTransition(() => {
      setTab(newTab);
    })
  }
  
  
  return (
  	<div>
      <button onClick={() => handleSwitchTab("home")}>首页</button>
      <button onClick={() => handleSwitchTab("profile")}>个人资料</button>
      
      <div>
        {
            tab === "home" && <HomeView /> : <Profile />
        }
      </div>
      {
        isPending && <div>加载新视图...</div>
      }
    </div>
  )
}


// 模拟重型组件
const HomeView = () => <div>首页内容（复杂组件树）</div>;
const ProfileView = () => <div>个人资料（大数据量）</div>;
```

- startTransition 将视图渲染标记为可中断任务
- 过渡期间继续显示旧视图（opacity 降低提示用户）
- isPending 显示加载指示器，提升用户体验

#### 万级列表渲染：不阻塞用户输入

大数据列表更新导致界面冻结，虚拟滚动（react-window）+ `useDeferredValue` 延迟过滤

```tsx
import { useState, useDefferedValue } from "react";
import { FixedSizeList } from "react-window";

function BigDataList = () => {
  const [filter, setFilter] = useState("");
  // 延迟过滤条件（避免频繁重复渲染）
  const defferedFilter = useDefferedValue(filter);
  
  // 生成 10000 条数据
  const data = Array.from({length: 10000}, (_,i) => {
    return {
      id: i,
      text: `项目${i}`
    }
  })
  
  const filteredData = data.filter(item => {
    return item.text.includes(defferedFilter);
  })
  
  const Row = ({index, style}) => {
    return <div style={style}>
      {filterData[index]?.text || "加载中..."}
    </div>
  }
  
  return <div>
  	<input 
      value={filter} 
      onChange={e => setFilter(e.target.value)} 
      placeholder="过滤万级列表..." 
    />
  	<FixedSizeList
      height={500}
      width={300}
      itemSize={50}
      itemCount={filteredData.length}
      >
    	{Row}
    </FixedSizeList>
  </div>
}




```

- deferredFilter 降低过滤频率，避免输入阻塞
- 虚拟滚动（react-window）仅渲染可视区域节点
- 双重优化确保万级数据流畅交互
