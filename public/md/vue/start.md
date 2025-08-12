## Vue3 初学

### 创建Vue3 项目的方式

基于 vue-cli 创建



基于 vite 创建

```shell
npm create vue@latest
```



### 项目文件

#### env.d.ts

```ts
/// <reference types="vite/client" />
```

让 ts 去认识.jpg,.txt等文件，如果没有env.d.ts文件，却引用了相关文件：

```ts
import XXX from "./xxx.txt"
```

会提示 TS 错误：找不到`./xxx.txt`或其相应的类型声明.

vite/client 中的内容如下：

```ts
/// <reference path="./types/importMeta.d.ts" />

// CSS modules
type CSSModuleClasses = { readonly [key: string]: string }

declare module '*.module.css' {
  const classes: CSSModuleClasses
  export default classes
}
declare module '*.module.scss' {
  const classes: CSSModuleClasses
  export default classes
}
declare module '*.module.sass' {
  const classes: CSSModuleClasses
  export default classes
}
declare module '*.module.less' {
  const classes: CSSModuleClasses
  export default classes
}
declare module '*.module.styl' {
  const classes: CSSModuleClasses
  export default classes
}
declare module '*.module.stylus' {
  const classes: CSSModuleClasses
  export default classes
}
declare module '*.module.pcss' {
  const classes: CSSModuleClasses
  export default classes
}
declare module '*.module.sss' {
  const classes: CSSModuleClasses
  export default classes
}

// CSS
declare module '*.css' {}
declare module '*.scss' {}
declare module '*.sass' {}
declare module '*.less' {}
declare module '*.styl' {}
declare module '*.stylus' {}
declare module '*.pcss' {}
declare module '*.sss' {}

// Built-in asset types
// see `src/node/constants.ts`

// images
declare module '*.apng' {
  const src: string
  export default src
}
declare module '*.bmp' {
  const src: string
  export default src
}
declare module '*.png' {
  const src: string
  export default src
}
declare module '*.jpg' {
  const src: string
  export default src
}
declare module '*.jpeg' {
  const src: string
  export default src
}
declare module '*.jfif' {
  const src: string
  export default src
}
declare module '*.pjpeg' {
  const src: string
  export default src
}
declare module '*.pjp' {
  const src: string
  export default src
}
declare module '*.gif' {
  const src: string
  export default src
}
declare module '*.svg' {
  const src: string
  export default src
}
declare module '*.ico' {
  const src: string
  export default src
}
declare module '*.webp' {
  const src: string
  export default src
}
declare module '*.avif' {
  const src: string
  export default src
}
declare module '*.cur' {
  const src: string
  export default src
}
declare module '*.jxl' {
  const src: string
  export default src
}

// media
declare module '*.mp4' {
  const src: string
  export default src
}
declare module '*.webm' {
  const src: string
  export default src
}
declare module '*.ogg' {
  const src: string
  export default src
}
declare module '*.mp3' {
  const src: string
  export default src
}
declare module '*.wav' {
  const src: string
  export default src
}
declare module '*.flac' {
  const src: string
  export default src
}
declare module '*.aac' {
  const src: string
  export default src
}
declare module '*.opus' {
  const src: string
  export default src
}
declare module '*.mov' {
  const src: string
  export default src
}
declare module '*.m4a' {
  const src: string
  export default src
}
declare module '*.vtt' {
  const src: string
  export default src
}

// fonts
declare module '*.woff' {
  const src: string
  export default src
}
declare module '*.woff2' {
  const src: string
  export default src
}
declare module '*.eot' {
  const src: string
  export default src
}
declare module '*.ttf' {
  const src: string
  export default src
}
declare module '*.otf' {
  const src: string
  export default src
}

// other
declare module '*.webmanifest' {
  const src: string
  export default src
}
declare module '*.pdf' {
  const src: string
  export default src
}
declare module '*.txt' {
  const src: string
  export default src
}

// wasm?init
declare module '*.wasm?init' {
  const initWasm: (
    options?: WebAssembly.Imports,
  ) => Promise<WebAssembly.Instance>
  export default initWasm
}

// web worker
declare module '*?worker' {
  const workerConstructor: {
    new (options?: { name?: string }): Worker
  }
  export default workerConstructor
}

declare module '*?worker&inline' {
  const workerConstructor: {
    new (options?: { name?: string }): Worker
  }
  export default workerConstructor
}

declare module '*?worker&url' {
  const src: string
  export default src
}

declare module '*?sharedworker' {
  const sharedWorkerConstructor: {
    new (options?: { name?: string }): SharedWorker
  }
  export default sharedWorkerConstructor
}

declare module '*?sharedworker&inline' {
  const sharedWorkerConstructor: {
    new (options?: { name?: string }): SharedWorker
  }
  export default sharedWorkerConstructor
}

declare module '*?sharedworker&url' {
  const src: string
  export default src
}

declare module '*?raw' {
  const src: string
  export default src
}

declare module '*?url' {
  const src: string
  export default src
}

declare module '*?inline' {
  const src: string
  export default src
}

declare module '*?no-inline' {
  const src: string
  export default src
}

declare module '*?url&inline' {
  const src: string
  export default src
}

declare module '*?url&no-inline' {
  const src: string
  export default src
}

declare interface VitePreloadErrorEvent extends Event {
  payload: Error
}

declare interface WindowEventMap {
  'vite:preloadError': VitePreloadErrorEvent
}

```

#### index.html

入口文件

```html
<!DOCTYPE html>
<html lang="">
  <head>
    <meta charset="UTF-8">
    <link rel="icon" href="/favicon.ico">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vite App</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>

```

通过引入 main.ts 引入 js 以实现网站内容。



#### src/main.ts

```ts
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')

```

使用根组件 App 创建一个前端应用`createApp(App)`，然后将这个应用挂载到 #app 元素容器上`mount('#app')`。



#### src/App.vue

根组件。







## Vue3核心语法

### OptionsAPI与 CompositionAPI

- vue2 的 API 是 Options （选项式）风格的
- vue3 的 API 是 Composition （组合式）风格的

#### 选项式的弊端：

数据、方法、计算属性等，是分散在 data，methods，computed 中的，新增或修改需求需要改动多个选项中的内容，不便于维护和复用。

**选项式 API** 

![](https://raw.githubusercontent.com/zyileven/image-hosting-platform/master/src/2025/08/11/0cde63ae2c0901492cabebabc8fed9ca-1bd101840df446c78d52e9c14711aae7-tplv-k3u1fbpfcp-zoom-in-crop-mark-1512-0-0-0-c31226.awebp)

**选项式中不同功能都需要在多个选项中添加内容**

![img](https://raw.githubusercontent.com/zyileven/image-hosting-platform/master/src/2025/08/11/88dcad5d315211cb4eef13dd420fc317-568b0ced69f241d282cf2c512e4e5f33-tplv-k3u1fbpfcp-zoom-in-crop-mark-1512-0-0-0-d25be9.awebp)

**从选项式变为组合式 API**

![img](https://raw.githubusercontent.com/zyileven/image-hosting-platform/master/src/2025/08/11/315b979c1d8208ad2588e34688372aec-d05799744a6341fd908ec03e5916d7b6-tplv-k3u1fbpfcp-zoom-in-crop-mark-1512-0-0-0-782a51.awebp)

**将功能集中之后用函数来管理，函数内部包含数据，方法，计算属性**

![img](https://raw.githubusercontent.com/zyileven/image-hosting-platform/master/src/2025/08/11/c5071f71bc1ecc26d3548701f07be414-4146605abc9c4b638863e9a3f2f1b001-tplv-k3u1fbpfcp-zoom-in-crop-mark-1512-0-0-0-eeba32.awebp)























































