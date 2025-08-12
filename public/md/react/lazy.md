## Lazy 懒加载

### lazy 的核心功能

`React.lazy`用于动态导入组件（代码分割），但**单独使用 `lazy`会导致报错或渲染失败**。当懒加载的组件尚未加载完成时，React 会抛出异常，此时必须由 `Suspense`捕获并显示 `fallback`内容（如加载提示）。

> 注意⚠️：如果仅仅使用 lazy 而不使用 `Suspense` 包裹，会报错

`React.lazy`通过动态导入语法（`import()`）将组件拆分为独立的代码块（chunk），**仅在组件首次渲染时触发加载**，而非初始化时加载所有代码。这直接减少了首屏资源体积，提升加载性能。

```tsx
const MyComponent = lazy(() => import('./MyComponent')); 
// 生成独立 chunk 文件
```

**异步加载触发时机**：当`lazy`组件首次渲染时，浏览器才会发起网络请求加载对应的Chunk文件

**Suspense处理加载状态**：加载过程中显示`fallback`内容（如加载动画），避免页面空白







### lazy 与项目工具的协同使用

#### `import()`动态导入语法

`React.lazy(() => import('./Component'))`中的`import()`是动态导入语法，会被打包工具识别为代码分割点

1.**标记分割点** → 2. **打包工具生成Chunk** → 3. **运行时按需加载** → 4. **Suspense管理状态** → 5. **优化加载策略**



Webpack/Vite会将动态导入的模块编译为独立的文件（Chunk）。

- Webpack通过`optimization.splitChunks`配置自动分割
- Vite通过Rollup的Tree Shaking和动态导入支持实现

#### webpack

**SplitChunks插件**：将第三方库（如`node_modules`）和公共模块拆分为独立Chunk，避免重复加载

```json
optimization: {
  splitChunks: { chunks: 'all', cacheGroups: { vendors: { test: /node_modules/ } } }
}
```

> **魔法注释**：通过`webpackChunkName: "name"`自定义Chunk名称，便于调试和缓存管理

**webpackPrefetch**：在浏览器空闲时预加载未来可能需要的模块（如路由组件）

```json
import(/* webpackPrefetch: true */ './Modal');
```

**`webpackPreload`**：高优先级预加载关键资源（如首屏组件）







#### vite（基于Rollup）

**manualChunks配置**：手动指定分包策略，例如将Vue、React等框架代码单独打包

```json
build: {
  rollupOptions: { output: { manualChunks: { 'vue-vendor': ['vue', 'vue-router'] } } }
}
```

> **预构建依赖**：使用`esbuild`将CommonJS模块转换为ESM，优化加载效率



### lazy 的最佳实践

#### 始终用 `Suspense`包裹 `lazy`组件

确保加载期间显示友好提示，避免白屏或报错：

```tsx
<Suspense fallback={<Spinner />}>
  <LazyComponent />
</Suspense>
```

#### 结合错误边界（Error Boundary）

捕获懒加载过程中的网络错误或模块缺失：

```tsx
<ErrorBoundary> {/* 自定义错误处理组件 */}
  <Suspense fallback={<Spinner />}>
    <LazyComponent />
  </Suspense>
</ErrorBoundary>
```

#### 避免滥用

仅对非首屏关键组件（如弹窗、二级路由）使用 `lazy`。过度拆分可能增加请求次数，反而降低性能。







