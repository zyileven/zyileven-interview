## useLayoutEffect

`useLayoutEffect` 是 `useEffect` 的一种版本，它在浏览器重绘屏幕之前触发。

```ts
useLayoutEffect(setup, dependencies?)
```

在浏览器重绘屏幕之前调用 `useLayoutEffect` 以执行布局测量

```tsx
import { useState, useRef, useLayoutEffect } from 'react';

function Tooltip() {
  const ref = useRef(null);
  const [tooltipHeight, setTooltipHeight] = useState(0);

  useLayoutEffect(() => {
    const { height } = ref.current.getBoundingClientRect();
    setTooltipHeight(height);
  }, []);
  // ...
```

useLayoutEffect 内部的代码以及从它调度的所有状态更新会阻止浏览器重绘屏幕。如果过度使用，这会使你的应用变慢。在可能的情况下，请优先选择 useEffect 。

如果你在 `useLayoutEffect` 中触发状态更新，React 将立即执行所有剩余的 Effect，包括 `useEffect` 

### 在浏览器重绘屏幕之前测量布局





























