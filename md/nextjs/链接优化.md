## Next 的链接优化

Next.js 在链接优化方面采用了多种技术手段，显著提升页面加载性能与用户体验

### 通过 `next/link` 进行优化

#### 1.客户端导航（Client-Side Navigation）

- **无刷新跳转**：拦截浏览器默认跳转行为，通过 JavaScript 动态加载目标页面组件，避免整页刷新（节省 300ms+ 延迟）
- **代码拆分（Code Splitting）**：仅加载新页面所需代码块，利用 Webpack 分块机制减少初始负载

#### 2.智能预加载（Prefetching）

- **视口预加载**：当 `Link` 组件进入视口时，自动预加载目标页面资源（默认行为）
- **优先级控制**：对关键链接（如导航栏）手动触发预加载：

```jsx
useEffect(() => { import('/pages/about') }, []); // 应用启动时预加载
```

#### 3.渲染性能优化

- **避免重渲染**：为列表中的 `Link` 设置唯一 `key`，结合 `React.memo` 减少无效渲染
- **动态导入（Lazy Loading）**：对非核心页面使用动态导入延迟加载：

```jsx
<Link href="/settings" onClick={() => import('../pages/settings')}>
  高级设置
</Link>
```



### 链接高级技巧

- 使用 `next/dynamic` 实现路由级懒加载：

```jsx
const SettingsPage = dynamic(() => import('../pages/settings'));
```

- 通过 `IntersectionObserver` 自定义预加载逻辑





















