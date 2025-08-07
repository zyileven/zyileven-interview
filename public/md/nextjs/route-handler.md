## Route-Handler 路由处理程序

路由处理程序的本质是服务端 API 端点（如 app/api/route.ts），其运行在**服务端**。

接收客户端请求后，在服务端完成数据获取、逻辑处理，再将结果返回客户端。

```ts
// app/api/data/route.ts
export async function GET() {
  const res = await fetch('https://external-api.com/data', { headers: { key: process.env.API_KEY } });
  return NextResponse.json(await res.json());
}
```

页面内获取数据

- **服务端组件**：在服务端渲染时执行 `fetch`，结果直接嵌入页面 HTML（如 `app/page.tsx` 中使用 `async/await`）
- **客户端组件**：在浏览器中执行 `fetch`，需处理加载状态和错误（如 `useEffect` 或 SWR）



### 路由处理程序的优势

#### 敏感数据保护

如上面介绍的，当接口的参数存在一些敏感数据时，比如 `process.env.API_KEY` ，在页面中请求，可以在浏览器网络 tab 中看到这些参数的信息，会导敏感数据暴露。而路由程序完美解决这个问题。

#### 缓存数据

在路由处理程序中，通过**GET 请求**获取的数据：默认缓存响应结果（除非显式设置不缓存 `cache: 'no-store'`）

```ts

export const dynamic = "force-static" // 确保缓存
export async function GET() {
  
  return NextResponse.json({
    time: new Date().toLocaleTimeString()
  });
}
```

访问页面可以看到每次刷新会显示新的事件，这是因为开发环境的问题，如果切换到生产环境，则每次刷新访问的事件都是同一个，因为在 build 的时候就固定了。

如果要保证数据每隔一定时间刷新：

```ts
export const dynamic = "force-static" // 确保缓存
export const revalidate = 10;// 10s后更新数据
export async function GET() {
  
  return NextResponse.json({
    time: new Date().toLocaleTimeString()
  });
}
```





当然，POST 请求不缓存。

在页面中的 fetch 获取数据时，也会默认缓存数据，但是支持按需刷新（`revalidateTag`）或定时刷新（`next: { revalidate: 3600 }`）

```ts
// app/page.tsx
export default async function Page() {
  const data = await fetch('https://api.example.com', { next: { tags: ['data'], revalidate: 60 } });
  // 缓存60秒，可通过 revalidateTag('data') 手动刷新
}
```



### 路由处理程序与客户端 fetch 的比较

#### 路由处理程序

网络请求路径：客户端 → Next.js 服务端 → 外部 API；

性能特点：服务端间通信更快，延迟更低

#### 客户端 `fetch`

网络请求路径：客户端 → 外部 API

性能特点：受用户网络环境限制，易成为性能瓶颈



### 适用场景区别

#### 路由处理程序

- 接口使用到了需要隐藏的 API 密钥或数据库连接信息
- 执行敏感操作（如写入数据库、发送邮件）
- 聚合多个 API 数据并统一返回客户端
- 分离数据逻辑与 UI 组件，便于维护和复用

#### 页面内 `fetch`

- **服务端组件**：纯数据渲染页面（如博客列表），利用缓存提升加载速度
- **客户端组件**：用户交互后动态加载数据（如无限滚动）
- 在服务端组件中直接获取数据，减少中间层





















