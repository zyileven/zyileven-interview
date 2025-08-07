## Nextjs中的路由

在 next.js 中，实现了基于文件夹的路由配置模式，通过文件夹的嵌套实现路由地址的拼接。

### 一、路由的规则

但是并非所有文件夹都将视作路由，而是有一些特定的规则进行限制，比如：

- 所有路由必须在 app 目录中
- 只有包含 page.jsx 或者 page.tsx 文件的目录才能视作路由
- 目录的层级嵌套结构代表 URL 中的地址的一个片段

![image-20250728下午51157095](https://raw.githubusercontent.com/zyileven/image-hosting-platform/master/src/2025/07/28/170dcc35a101954884b517f4771cb887-image-20250728下午51157095-834a47.png)

如上所示，可以访问

- app下的 page.tsx  → localhost:3000
- app下的 about 中的 page.tsx  → localhost:3000/about
- app下的 progfile 中的 page.tsx  → localhost:3000/profile

> 对于访问不存在的路由地址，则会默认返回一个 nextjs 提供的 404 页面



### 二、嵌套路由

通过在文件夹中创建子文件夹，并在子文件夹中添加 page.tsx 文件后，就可以实现嵌套路由效果。

![image-20250728下午52019020](https://raw.githubusercontent.com/zyileven/image-hosting-platform/master/src/2025/07/28/6fe925559aee6b0ddf395a9b9d6ac3d9-image-20250728下午52019020-62f6f3.png)

如上，在 blog 文件夹中添加了 2 个不同的文件夹 first 和 second，并在对应文件夹中创建 page.tsx 文件，就创建了 2 个嵌套路由

- app/blog/first/page.tsx   →  localhost:3000/blog/first
- app/blog/second/page.tsx   →  localhost:3000/blog/second



### 三、动态路由 Dynamic Routes

对于复用性很高的相似路由（比如商品详情页），next 提供了动态路由的方式来实现。

假设某个产品的访问地址是 `localhost:3000/products/productId`，其中 productId 是一个动态的值，代表产品的id，因此 next 提供了`[productId]` 格式的目录来代表动态路由。

然后在 `[productId]` 文件夹中创建 page.tsx 文件来展示产品详情的模板页面，并且可以在页面中通过参数的方式获取到当前的 productId 值。

```jsx
export default async function ProductDetailPage({
  params
}) {
  const {productId} = await params;
  return <h2>Product Detail in {produtId}</h2>
}
```

访问 `localhost:3000/products/1` 将会在页面中呈现 `Product Detail in 1`，以实现根据不同产品 id 显示相同模板的页面的效果。

![image-20250728下午53940338](https://raw.githubusercontent.com/zyileven/image-hosting-platform/master/src/2025/07/28/81985791b390035582b4619f737bf76b-image-20250728下午53940338-747506.png)

#### 嵌套动态路由段

如果页面中存在对多个动态路由段的需求，比如访问`localhost:3000/products/1/reviews/1`来查看产品详情中的指定评论。

我们可以在 `[productId]`文件中创建一个 reviews 文件夹，然后再 reviews 文件夹中创建一个名为 `[reviewId]` 的文件夹，并在内部添加 page.tsx 。

![image-20250728下午55352546](https://raw.githubusercontent.com/zyileven/image-hosting-platform/master/src/2025/07/28/e61fd21e91d0971f29974e69a01c751e-image-20250728下午55352546-b5bf60.png)

```jsx
export default async fucntion ProductReview({params}) {
	const {productId, reviewId} = await params;
  return <h2>this is product {productId} and review {reviewId}</h2>
}
```

#### 所有路由段 Catch-all segments

这种模式是为了实现`localhost:3000/docs/feature1/concept1`模式的路由，但是同时有 100 个 feature 和 100 个 concept，因此这将组成 10000 个路由。

对于后面可能还存在的其他 url 片段，我们可以手动为每一个创建一个动态路由，但是在这里我们是用另外一种方法。

在 docs 目录下创建一个文件夹`[...slug]`，这将捕获url 中 docs 片段之后的所有路由结构，如：`localhost:3000/docs/feature1/concept1/XXX/YYY`将获取到`/feature1/concept1/XXX/YYY`，无论后续的路由有多少，都将通过编程式来映射内容。

现在在[...slug]中创建 page.tsx 文件，并模拟访问`localhost:3000/docs/feature1/concept1`

```jsx
export default async function SlugPage({params}){
  
  const {slug} = await params;
  
  if (slug?.length === 2) {
    return <div>
    	View docs for feature {slug[0]} and concept {slug[1]}
    </div>
  } esle if(slug?.length === 1) {
    return <div>
    	View docs for feature {slug[0]}
    </div>
  }
  
  return <h2>DOCS page</h2>
}
```

现在可以访问`localhost:3000/docs/feature1/concept1`并跳转到指定页面了。

> 注意⚠️：此时访问`localhost:3000/docs`将会跳转到 404 页面中，而不是显示`DOCS page`内容，为了使`localhost:3000/docs`也能显示 `DOCS page`内容，可以将`[...slug]`更改为`[[...slug]]`即可访问`localhost:3000/docs`，并渲染`DOCS page`内容。



### 四、私有文件 Private folders

这是一种告诉 Next.js 这个文件是一个内部的文件，不应该纳入路由系统。这个文件以及所有的子文件都将排除在路由系统之外。

创建私有文件的方法是：在文件的开头添加下滑线，如：`_fileName`

> 如果你一定需要使用`_fileName`文件夹来作为路由片段，则应该是用`%5F`代替下划线，写成`%5FfileName`



### 五、路由组 Route Group

让我们可以把一系列路由共享同样的布局，同时这个组名不会出现在 url 的片段中。

首先在 app 中创建一个名为 `(auth)` 文件夹目录，并在此文件夹中创建 `register`、`login`、`forget` 文件路由。

此时访问：

localhost:3000/register    →    register页面

localhost:3000/login    →    login页面

localhost:3000/forget    →    forget页面

可以看出，虽然我们的路由是包裹在`(auth)`文件中的，但是并不需要在 url 中写上 `(auth)`。



### 六、并行路由

在同一路由中同时显示多个模块，并且每个模块都是一个路由控制的。

为了实现并行路由，我们应该是用插槽来实现：@folder

创建如下文件结构：

![image-20250730上午100613644](https://raw.githubusercontent.com/zyileven/image-hosting-platform/master/src/2025/07/30/38c842de4a96c846f486b9aa02db9528-image-20250730上午100613644-07aa89.png)

然后在 dashboard 中的 page.tsx 中实现如下代码：

```jsx
export default function CpmplexDashboardLayout ({
  children,
  users,
  revenue,
  notifications
}) {
  return (
  	<>
    <div>{children}</div>
    <div style={{display: "flex"}}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div>{users}</div>
        <div>{revenue}</div>
      </div>
      <div style={{display: "flex", flex: 1}}>
        {notifications}
    	</div>
    </div>
    </>
  )
}
```

其中users,revenue,notifications分别代表定义的并行路由@folder 中的 page.tsx 中的内容。

当然那，也可以使用常规的组件来实现类似的效果，不过并行路由的好处是可以独立处理每一个路线，因为每个布局中的插槽@folder 中都可以处理自己的加载和错误状态，这种精细的控制在页面不同部分有加载时间上较大差距的时候比较有用，比如单独捕获错误或者为特定模块添加加载状态而不影响其他模块。



### 六、 特殊路由文件配置

#### 404 页面 not-found

为了处理不同路由中的 404 页面问题，我们需要为指定的路由目录中创建`not-found.tsx`文件，此时这个`not-found.tsx`只处理当前路由下的所有子路由的 404 问题。因此，我们一般会在 app 目录下面创建一个`not-found.tsx`文件来作为全局 404 页面处理。当子路由中没有设置`not-found.tsx`的时候，由 app 中的`not-found.tsx`来处理 404 页面。

```jsx
export default function NotFound() {
  return (
    <div>
      <h2>Page Not Found</h2>
      <p>Could not find requested resource</p>
    </div>
  )
}
```

触发 404 页面处理的方式：

- 访问不存在的路由地址，会自动触发已有的`not-found.tsx`
- 通过编程式访问 `notFound()` 方法来跳转到 404 页面

> 当触发 404 的时候，根据当前路由地址，优先查找当前路由中是否有`not-found.tsx`文件，如果没有，则一层一层往上查询，直到找到 app 中的 `not-found.tsx`

#### layout 布局

`page.tsx` 是路由指定的独有页面组件

`layou.tsx` 则是多个子路由页面共享的UI 布局

在 app 目录中必定会有一个 `layout.tsx` 文件，作为初始根布局。

```jsx
export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js"
}

export default function RootLayout({
  children
}) {
  return <html lang="en">
    <body>
      {children}
    </body>
  </html>
}

```

`chilren` 中的内容就是 `page.tsx` 的内容。

##### 多重根路由布局

这是为了解决特定部分使用自己的布局，而不是全局布局。那就是使用路由组来实现多重跟布局。

在 app 目录下创建个多个同级别的**路由组**，并且每个路由组中都有自己独特的 layout.tsx 文件，并且这个 layout 也是根 layout 。

#### 模板文件 template.tsx

 模板文件类似于布局，是多个应用程序之间共享的 UI，关键在于每当用户在共享模板的路由之间导航时，都会获得一个全部刷新。

相比切换子路由时，layout 文件中的状态不会更新的问题，如果放在 tamplate 中，切换路由会重新加载 template 中的内容。

template 与 layout 和 page 的包裹关系如下：

![image-20250729下午45737494](https://raw.githubusercontent.com/zyileven/image-hosting-platform/master/src/2025/07/29/d6d9a94d60bb8b52ad69c2a9074320a3-image-20250729下午45737494-941c52.png)



#### loading 加载中

loading 是用来在路由页面加载的时候呈现的备用 UI。

```jsx
export default function Loading() {
  return <h1>page is loading...</h1>
}
```

在 page 页面遇到异步加载时会呈现 loading 的内容

```jsx
export default async function Blog() {
  
  await new Promise((resolve) => {
    resolve("intentional delay")
  }, 2000)
  
  return <h1>My Blog</h1>
}
```

在等待 2s 再渲染 page 页面的时候会呈现 loading 中的内容，2s 后再显示 page 中的内容。



使用 loading 的好处：

- 当用户进入新的路由页面时，给予用户立即的反馈，他们知道那些加载完了，那些正在加载
- next 确保 layout 在加载 page 的过程中，layout 继续保持交互，即使 page 中的核心内容还没加载完，但是 layout 中的菜单等内容是可以继续使用的



#### 错误处理 error handle

通过在路由文件夹中创建 `error.tsx` 来实现错误处理。

```jsx
// error.tsx

export default function ErrorPage(){
  return <>
  <h1>Error Page</h1>
  <p>some error happen!!!</p>
  </>
}
```

当 page 页面中抛出错误的时候，会打开 error 页面。

> 注意⚠️：如果当前路由段有 error.tsx 则由这个文件作为错误边界，如果没有 error.tsx 则根据路由嵌套向上查找 error.tsx 以捕获这个错误，直到找到app下的 error.tsx 全局错误边界。

##### 高级错误处理

在 error.tsx 中，除了能够简单的呈现错误信息以外，我们还可以使用错误边界接收到的参数来进行一些错误处理。

```jsx
// page.tsx
// ...
if (random === 1) {
  throw new Error("Error loaing page");
}
// ...


// error.tsx
export default function ErrorBoundary({error, reset}) {
  return (
    <div>
      <p>{error.message}</p>
      <button onClick={reset}>Try Again</button>
    </div>
  )
}
```

参数中提供了 2 个参数：

error：一个错误对象，里面存了一些错误的信息

reset：一个方法，用于刷新导致错误的 page，且不引起页面重新渲染

> 注意⚠️：这里点击 Try Again 会一直触发错误，因为 reset 功能将尝试重新渲染客户端



##### reset优化

```jsx
import {useRouter} from "next/navigation";
import {startTransition} from "react";

export default function ErrorBoundary({error, reset}) {
  
  const router = useRouter();
  const reload = () => {
    stratTransition(() =>{ 
    	router.refresh();
      reset();
    })
  }
  
  return (
    <div>
      <p>{error.message}</p>
      <button onClick={reload}>Try Again</button>
    </div>
  )
}
```

将 reset 封装到 reload 函数中可以确保本次刷新被推迟到下一个渲染阶段，从而允许 react 处理任何待处理的状态更新

##### 处理 layout 布局中的错误

- 一个 error.tsx 将会处理他嵌套的所有子路由片段的错误。
- 不会捕获与 error.tsx 同级别 layout.tsx 中的错误
- Layout 的层级要高于 ErrorBounary

```jsx
// layout.tsx
// ...
if (random === 1) {
  throw new Error("Error loading layout")
}
// ...


// error.tsx
export default function ErrorBoundary({error, reset}) {
  return (
    <div>
      <p>{error.message}</p>
      <button onClick={reset}>Try Again</button>
    </div>
  )
}
```

在这种情况在，会直接出现页面错误，因为 error.tsx 无法捕获到 Layou 中出现的错误。

解决方案：将 error.tsx 放置在 layout 父级路由中。

但是如果是最顶级的 app/layout.tsx 出现的错误呢？

此时就需要使用到 global error，在 app 中创建一个名为 global-error.tsx 文件：

```jsx
// global-error.tsx
export default function ErrorBoundary({error, reset}) {
  return (
    <div>
      <p>{error.message}</p>
      <button onClick={reset}>Try Again</button>
    </div>
  )
}
```

##### 全局错误

next.js 提供了一个名为 global-error.tsx 的文件来作为全局错误捕获。

```jsx
export default function GlobalError() {
  return <html>
    <body>
    	<div>
        <h2>global error</h2>
      </div>
    </body>
  </html>
}
```

当路由从深层次发生错误，并不断冒泡的过程中，如果一直没有进行错误处理，那么最终他将使用 global-error.tsx 来处理，需要注意的是：

- 全局错误边界因为时全局覆盖，所以应该协商 html 和 body 标签。

- global-error.tsx 并不在本地生效，而是在 build 环境生效。

#### 总结

各种 next.js 提供的特殊文件上面已经讲述过了，接下来查看一下他们之间的关系。

![image-20250729下午53529706](https://raw.githubusercontent.com/zyileven/image-hosting-platform/master/src/2025/07/29/64a817aa2d56f2ec0d633fb7db412959-image-20250729下午53529706-c67d42.png)







### 七、元数据对象 metadata

这是为页面设置 meta 相关属性的地方，用于优化搜索以及其他信息描述。

我们有两种方式处理布局中的元数据：

- 导出一个静态的 `metadata` 对象；
- 导出一个动态的 `generateMetadata` 函数；

一些 metadata 的规则：

- 无论是 `layout.tsx`还是`page.tsx`都可以用来到处 metadata 元数据，layout 应用于所有子页面，page 应用与特定页面。
- 元数据遵循从根级别开始自上而下的顺序
- 元数据存在于路由中的多个位置时，会进行合并处理，同时最深的 metadata 属性会覆盖浅层接收到的 metadata 元数据。

#### layout 中导出元数据

```jsx
// layout.tsx
export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js"
}

export default function RootLayout({
  children
}) {
  return <html lang="en">
    <body>
      {children}
    </body>
  </html>
}
```



#### page.tsx 中导出元数据

```jsx
export const metadata = {
  title: "About xxxx"
}

export default function About() {
  return <h1>About me</h1>
}
```

#### 在动态路由中使用动态元数据

```jsx
// [productId]/page.tsx
export const generateMetadata = async ({params}) => {
  const productId = await params;
  
  // 在这里进行一些异步操作，如请求
  // 这里使用 setTimeout 来模拟
  const title = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(`belong to ${productId}`)
    }, 3000)
  })
  
  return {
    title: `Product Title: ${title}`
  }
}


export default async function ProductDetails({params}) {
  
  const {productId} = await params;
  
  
  return <h1>Product Detail {productId}</h1>
}
```

> 注意⚠️：
>
> 1.不能在同一个文件中使用 **元数据对象** 和 **生成元数据方法**，只能选择其中一个来使用。
>
> 2.不能在客户端组件中导出元数据，如果有需要，请将客户端功能提取到一个新的组件中。

#### title 的对象写法

除了我们上述的传递字符串给 title 属性以外，还可以传递对象给 title 。这个对象具有如下属性：

- default：作为任何子路由的后备，当子路由中没有设置元数据的时候，就用这个值作为 title
- template：模板标题，用于动态显示占位的内容
- absolute：绝对标题，不受外部任何影响

##### 默认标题的用法

``` jsx
// layout.tsx
export const metadata = {
  title: {
    default: "Next.js"
  }
}

// page.tsx
export const metadata = {
  
}
```

如果 page 页面中没有定义 title，则使用 layout 中的 default 的内容。

##### 模板标题的用法

```jsx
// layout.tsx
export const metadata = {
  title: {
    template: "%s | Page",
  }
}

// page.tsx
export const metadata = {
  title: "Blog"
}

```

上面的会将 `Blog` 代替 `%s` 占位，最终显示 `Blog | Page`

##### 绝对标题的作用

```jsx
// layout.tsx
export const metadata = {
  title: {
    template: "%s | Page",
  }
}

// page.tsx
export const metadata = {
  title: {
  	absolute: "Blog" // 绝对标题
  }
}

```

即使布局中有模板，但是 page 页面设置了标题绝对是 Blog，所以最终显示 Blog



### 八、链接组件跳转路由

修改 URL 的方式确实可以实现页面的访问，但是对于用户而言这不是最好的办法，因此我们必须为他们提供链接来进行路由的跳转。

#### Link 组件

next.js 为我们提供了链接组件，这个 `<Link>` 组件扩展自 html 默认的 `<a>` 元素，是 next.js 用于导航的主要方式。

```jsx
import Link from "next/link"

export default function Page() {
  return <>
  	<h1>Home</h1>

	  <Link href="/blog">blog</Link>
    <Link href="/products">products</Link>
  </>
}
```

#### 编程式路由跳转

为了在 JavaScript 的逻辑中实现路由的跳转，next 为我们提供了 useRouter 的 hook 来实现编程式的路由跳转。

```jsx
import {useRouter} from "next/navigation";


export default function OrderRouter() {
  const router = useRouter();
  const handleClick = () => {
    router.push("/xxx/yyy");
    
  }
  
  return <div>
    <h1>Order product</h1>
    <button onClick={handleClick} >Click</button>
  </div>
}

```

##### router.push(href: string, { scroll: boolean }) 方法

执行到指定路由的客户端导航。在浏览器历史记录中添加新条目堆。

scroll 的作用：

可以使用router.back()再返回上一个页面

##### router.replace(href: string, { scroll: boolean }) 方法

执行到所提供路线的客户端导航，而无需在浏览器的历史记录堆栈中添加新条目

不可以使用router.back()返回上一个页面

##### router.refresh()方法

刷新当前路由。向服务器发起新的请求，重新获取数据请求，并重新渲染服务器组件。客户端将合并更新后的 React 服务器组件负载，而不会丢失未受影响的客户端 React（例如 `useState` ）或浏览器状态（例如滚动位置）

##### router.prefetch(href: string, options?: { onInvalidate?: () => void })方法

预取提供的路由，以加快客户端转换速度。当预取的数据过期时，会调用可选的 onInvalidate 回调。

##### router.back()方法

导航回浏览器历史堆栈中的上一个路由。

##### router.forward()方法

导航到浏览器历史堆栈中的下一页

























### 九、 params 与 searchParams

对于一个给定的路由，params 获取 url 中动态路有对应的那些段，而 searchParams 对应 url 中 query 参数。

举个例子：localhost:3000/products/123/reviews/1?name=zgq&age=18

```jsx
export default function Page({
  params,
  searchParams
}) {
  
  
  
  return <h1>page</h1>
}
```

params能获取到

```jsx
{
	productId: 123,
	reviewId: 1
}
```

searchParams能获取到

```jsx
{
  name: "zgq",
 	age: 18
}
```

> 注意⚠️：
>
> 在 `page.tsx` 中，可以访问 `params` 以及 `searchParams`
>
> 在 `layout.tsx` 中，只可以访问 `params`



### 十、路由处理程序

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



#### 路由处理程序的优势

##### 敏感数据保护

如上面介绍的，当接口的参数存在一些敏感数据时，比如 `process.env.API_KEY` ，在页面中请求，可以在浏览器网络 tab 中看到这些参数的信息，会导敏感数据暴露。而路由程序完美解决这个问题。

##### 缓存数据

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



#### 路由处理程序与客户端 fetch 的比较

##### 路由处理程序

网络请求路径：客户端 → Next.js 服务端 → 外部 API；

性能特点：服务端间通信更快，延迟更低

##### 客户端 `fetch`

网络请求路径：客户端 → 外部 API

性能特点：受用户网络环境限制，易成为性能瓶颈



#### 适用场景区别

##### 路由处理程序

- 接口使用到了需要隐藏的 API 密钥或数据库连接信息
- 执行敏感操作（如写入数据库、发送邮件）
- 聚合多个 API 数据并统一返回客户端
- 分离数据逻辑与 UI 组件，便于维护和复用

##### 页面内 `fetch`

- **服务端组件**：纯数据渲染页面（如博客列表），利用缓存提升加载速度
- **客户端组件**：用户交互后动态加载数据（如无限滚动）
- 在服务端组件中直接获取数据，减少中间层



### 十一、中间件 middleware

在 app 目录下创建一个名为 middleware.ts 的文件来作为中间件，这是一个强大的功能，可让你拦截和控制整个应用程序的请求和响应流。

他在全局级别执行此操作，显式的实现重定向URL，身份验证，headers，cookies 等相关功能。

#### 重定向

方法一：配置方式

```ts
import { NextResponse } from "next/server";
import type {NextRequest} form "next/server";

export function middleware(request: NextRequest){
  // 访问 /profile 时重定向到 /
  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: "/profile"
}
```

方法二：条件语句

``` ts
import { NextResponse } from "next/server";
import type {NextRequest} form "next/server";

export function middleware(request: NextRequest){
  if(request.nextUrl.pathname === "/profile") { // 当访问 /profile 时
    // 跳转到 /hello
    return NextResponse.redirect(new URL("/hello", requeust.nextUrl))
  }
}
```

#### cookie 的使用

``` ts
import { NextResponse } from "next/server";
import type {NextRequest} form "next/server";

export function middleware(request: NextRequest){
  const response = NextResponse.next();
  const themePreference = request.cookies.get("theme")
  if (!themePreference){
    response.cookies.set("theme", "dark");
  }
  return response;
}
```

#### header的使用

```ts
import { NextResponse } from "next/server";
import type {NextRequest} form "next/server";

export function middleware(request: NextRequest){
  const response = NextResponse.next();
  
  response.headers.set("custom-header", "custom-value");
  
  return response;
}
```







































































