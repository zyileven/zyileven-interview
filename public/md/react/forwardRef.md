## React.forwardRef

React.forwardRef 是 React 提供的**高阶函数**，用于解决组件间 ref 传递的痛点，尤其在函数组件和高阶组件（HOC）中。其核心作用是**允许父组件直接访问子组件的 DOM 节点或类组件实例**，打破默认的 ref 传递限制。以下是详细解析：

### 一、核心作用与原理

#### 1.打破函数组件的 ref 限制

函数组件无实例，默认无法通过 ref 获取其内部 DOM 或子组件。forwardRef 通过接收 props 和 ref 参数，将 ref 转发到内部的目标元素或组件，使父组件可直接操作子组件的 DOM（如聚焦输入框、触发动画）。

#### 2.解决高阶组件（HOC）的 ref 丢失问题

当组件被 HOC 包裹时，直接传递的 ref 会指向 HOC 而非原始组件。forwardRef 可将 ref 透传给包裹的组件，确保父组件访问的是实际子组件而非 HOC 层

### 二、主要使用场景

#### 1.操作子组件 DOM 元素

示例：父组件控制子组件输入框聚焦

```jsx
const Child = React.forwardRef((props, ref) => {
	return <input ref={ref} {...props} />
});
function Parent() {
  const inputRef = useRef();
  useEffect(() => inputRef.current.focus(), []);
  return <Child ref={inputRef} />;
}
```

父组件初始化时触发 useEffect，通过 inputRef 直接操作子组件的 `<input>` 元素



### 三、进阶用法：useImperativeHandle

由于使用React.forwardRef会将子元素的引用暴露给父组件，因此父组件可以操作所有的事情，但是这样并不是最合理的状况，应该精细化到控制父组件只能使用子组件中的部分功能。

结合 `useImperativeHandle` 可精细化控制暴露给父组件的内容，避免直接暴露整个 DOM 节点：

```jsx
const SmartInput = forwardRef((props, ref) => {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current.focus(),
    shake: () => { /* 抖动动画逻辑 */ }
  }));
  return <input ref={inputRef} {...props} />;
});

function Parent() {
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
    inputRef.current.shake();
    // 只能调用上面 2 个方法，其他方法均不允许调用
  }, []);
  return <SmartInput ref={inputRef} />;
}
// 父组件调用：smartInputRef.current.shake();
```

### 四、最佳实践与注意事项

#### 1.避免滥用

优先使用 props/state 数据流，仅当需要直接操作 DOM 或子组件方法时才用 `forwardRef`，以保持组件解耦。

#### 2.性能优化

- 与 `React.memo` 结合：避免因 ref 传递导致子组件无效重渲染：

```jsx
const MemoizedComponent = memo(forwardRef((props, ref) => { /* ... */ }));
```

- 使用 `useCallback` 缓存回调函数。

#### 3.TypeScript 类型定义

明确泛型参数顺序：`forwardRef<元素类型, 属性类型>(...)`

```jsx
interface Props { label: string; }
const FancyButton = forwardRef<HTMLButtonElement, Props>(
  ({ label }, ref) => <button ref={ref}>{label}</button>
);
```

#### 4.错误排查

- `ref.current` 为 null：检查 `forwardRef` 是否包裹正确。
- HOC 中 ref 未传递：确保 HOC 内部使用 `forwardRef`





























