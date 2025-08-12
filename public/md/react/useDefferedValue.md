## useDefferedValue

`useDeferredValue` 是 React 18 并发模式的核心 Hook，通过延迟非紧急更新优化性能，确保高优先级交互（如用户输入）的流畅性。

### 核心作用

#### 延迟非紧急更新

将某个状态值标记为“低优先级”，使其更新可被更高优先级任务（如用户输入）中断，避免界面卡顿。


#### 自动调度优化

基于设备性能动态调整延迟时间（非固定延迟），CPU 空闲时再更新，减少不必要的渲染。



### 实现原理

#### 优先级调度（Lane 模型）

- 当 useDeferredValue 接收新值时，将其标记为 IdleLanes（最低优先级）。
- 高优先级任务（如点击、输入）可中断其更新，优先执行

#### 双阶段渲染流程

- 阶段1：使用旧值立即渲染，保持 UI 响应性。
- 阶段2：后台异步计算新值，空闲时再触发二次渲染

#### 更新中断与重启

- 若后台更新未完成时值再次变化，React 丢弃当前任务，重新调度最新值





### 应用场景

#### 搜索框优化（防抖替代）

```tsx
import { useState, useDeferredValue, useMemo } from 'react';

function SearchBox() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query); // 延迟搜索词

  // 昂贵计算：仅在 deferredQuery 变化时触发
  const results = useMemo(() => {
    return largeList.filter(item => 
      item.name.includes(deferredQuery)
    );
  }, [deferredQuery]);

  return (
    <div>
      <input 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        placeholder="搜索..."
      />
      {/* 延迟渲染时显示半透明效果 */}
      <div style={{ opacity: query !== deferredQuery ? 0.5 : 1 }}>
        {results.map(item => 
                     <div key={item.id}>{item.name}</div>
                    )
        }
      </div>
    </div>
  );
}
```

#### Markdown 编辑器实时预览

```tsx
function MarkdownEditor() {
  const [text, setText] = useState('');
  const deferredText = useDeferredValue(text); // 延迟预览内容

  return (
    <div className="editor">
      <textarea 
        value={text} 
        onChange={e => setText(e.target.value)} 
        placeholder="输入Markdown..."
      />
      {/* 预览延迟时添加加载样式 */}
      <div className={`preview ${text !== deferredText ? 'stale' : ''}`}>
        <MarkdownRenderer content={deferredText} />
      </div>
    </div>
  );
}
```





























































