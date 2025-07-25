## Diff 算法

React 的 **Diff 算法**是优化虚拟 DOM（Virtual DOM）更新的核心机制，通过对比新旧虚拟 DOM 树的差异，仅更新实际变化的部分，避免全量 DOM 操作，从而大幅提升性能。

### **Diff 算法：最小化 DOM 操作的差异对比机制**

React 通过以下三层策略将算法复杂度从传统 Diff 的 **O(n³)** 降至 **O(n)**：

#### **Tree Diff（树层级优化）**

- 同层比较：仅对比同一层级的节点，跨层级移动视为“删除旧节点 + 创建新节点”。
- 性能影响：跨层级操作（如将节点从父级移至子级）会导致整棵子树重建，故官方建议通过 CSS 控制显隐而非增删 DOM

#### **Component Diff（组件层级优化）**

- 同类组件：若组件类型相同，递归比较其子节点。
- 异类组件：直接销毁旧组件并创建新组件（如` <Button> `替换为 `<Input>`）。
- 性能控制：可通过 shouldComponentUpdate 跳过无意义比较

#### **Element Diff（元素层级优化）**

**Key 的作用**：为列表元素添加唯一 `key`，帮助 React 识别节点身份，减少位置变更时的重建开销

- 示例：列表 [A, B, C] 变为 [B, A, C]，通过 key 仅移动节点而非重新创建。
- 无 Key 的代价：依赖节点内容比对，可能导致大量无效更新（如修改所有列表项的文本）

#### 传统 diff 与 react diff 算法的区别

时间复杂度：O(n³)     ——   O(n)

性能瓶颈：递归全树对比 	——      跨层级移动、列表无 Key

React 优化策略：分层对比 + Key 标识	——	同层比较、组件类型判断、Key



### 具体实现流程

#### **虚拟 DOM 生成与比对**

- 旧虚拟 DOM 和新虚拟 DOM 通过深度优先遍历逐层比较。
- 若节点类型不同，直接替换；若相同，则更新属性并递归比对子节点。

#### 列表节点的优化策略

- 双指针遍历：通过 lastPlacedIndex 记录最后一次复用的节点位置，减少移动次数。
- key 的作用：稳定标识节点，帮助 React 精准识别可复用的节点

**批量更新机制**

- 所有差异收集完成后，React 会批量执行 DOM 操作，减少重排和重绘次数



### 性能优化建议

#### 合理使用 `key`

列表项应使用唯一且稳定的 `key`（如 ID），避免使用索引（index）

```jsx
// 推荐：使用唯一 ID 作为 key
<ul>
  {items.map(item => <li key={item.id}>{item.name}</li>)}
</ul>
```

#### **避免跨层级移动节点**

跨层级操作会触发销毁和重建，建议通过 CSS 控制显示/隐藏而非实际移动节点

#### 组件复用与 `shouldComponentUpdate`

通过 `shouldComponentUpdate` 或 `React.memo` 阻止不必要的渲染



### 实际应用示例

```jsx
// 列表更新示例
function List() {
  const [items, setItems] = useState(['A', 'B', 'C']);
  
  const moveItem = () => {
    setItems(['B', 'A', 'C']); // 通过 key 实现高效移动
  };

  return (
    <div>
      <button onClick={moveItem}>移动 B 到首位</button>
      <ul>
        {items.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
```

- 无 key 时：React 会删除原 B 并插入新 B，导致两次 DOM 操作。
- 有 key 时：直接移动 B 的位置，仅需一次移动操作

### 总结

React 的 Diff 算法通过分层比较、类型判断和 key 优化，将复杂度降至 O(n)，显著提升渲染性能。实际开发中需注意合理使用 key、避免跨层级操作，并结合 shouldComponentUpdate 等机制进一步优化。













































































































