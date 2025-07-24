## Webpack 概览

### 一、核心概念

#### Entry

定义入口文件，一般为应用的入口 index.js，Webpack 分析依赖的起点。

#### Output

输入配置，经过 Webpack 一系列处理之后输出结果文件的地方。

#### Loader

处理非JS文件（如CSS、图片），需注意执行顺序从右到左（如 ['style-loader', 'css-loader']）

#### Plugins

扩展功能（如 HtmlWebpackPlugin 自动生成HTML）。

#### Mode

开发模式（development）与生产模式（production）的区别



### 二、基础使用

在这里以一个 React+webpack+Typescript+sass 来实现一个项目，并使用 Webpack 的各种功能。

#### 1.首先创建一个 react 项目

```sh
npx create-react-app admin-system --template typescript
cd admin-system
npm install webpack webpack-cli webpack-dev-server --save-dev
```

由于 create-react-app 创建的项目，所以很多默认配置项是隐藏的。

```json
"scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
```

- 默认情况下，使用 CRA 创建的 React 项目，所有的构建配置（如 webpack、Babel、ESLint 等）都被封装在 `react-scripts` 包中，用户无法直接修改这些配置。
- 执行 `npm run eject` 或 `yarn eject` 后，所有的配置文件和依赖会被“弹出”到项目根目录，变成可见且可编辑的文件（如 `webpack.config.js`、`babel.config.js` 等）。
- 弹出后，你可以完全自定义构建流程，但**无法回退**，这个操作是不可逆的。

在这里，我们执行npm run eject，然后删除弹出的配置，进行自定义创建。

下面是弹出文件：

![image-20250714下午84635226](https://raw.githubusercontent.com/zyileven/image-hosting-platform/master/src/2025/07/14/2a14c515d6ac7c3decb750ca2bdfbec5-image-20250714下午84635226-90355c.png)



#### 2.创建自己的 webpack.config.js

现在删除上面这些所有的文件并创建我们自己的配置文件 `webpack.config.js` 并配置入口（`src/index.tsx`）、输出路径（`dist/`）

```js
const path = require('path');
module.exports = {
  entry: './src/index.tsx',
  output: { 
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  mode: 'development' // 开发模式不压缩代码
};
```





#### 3.配置 loader 加载器，用于处理 CSS，图片，文字

``` js
const path = require('path');
module.exports = {
  entry: './src/index.tsx',
  output: { 
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
		rules: [
			// TypeScript 编译
			{ test: /\.tsx?$/, use: "babel-loader" },
      // CSS 处理
			{ test: /\.css$/, use: ["style-loader", "css-loader"] },
			// Sass 处理（Loader 顺序：sass-loader → css-loader → style-loader）
			{ test: /\.scss$/, use: ["style-loader", "css-loader", "sass-loader"] },
			// 图片/字体处理（Webpack 5 内置 Asset Modules）
			{ test: /\.(png|svg|woff2)$/, type: "asset/resource" },
		],
	},
  mode: 'development' // 开发模式不压缩代码
};
```

`{ test: /\.tsx?$/, use: 'babel-loader' },`

当遇到以 .ts 或 .tsx 结尾的文件（即 TypeScript 文件）时，使用 babel-loader 这个 loader 来处理这些文件，`babel-loader` 会调用 Babel，把 TypeScript 代码转换成浏览器可以执行的 JavaScript。

> **注意：**
> 如果你用 `babel-loader` 处理 TypeScript 文件，通常还需要在 Babel 配置中加上 `@babel/preset-typescript`，否则 Babel 不能正确解析 TypeScript 语法。
>
> 因此安装 babel：
>
> ```sh
> npm install --save-dev @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript babel-loader
> ```
>
> 在项目根目录下新建 `.babelrc` 文件，内容如下：
>
> ```json
> {
>   "presets": [
>     "@babel/preset-env",
>     "@babel/preset-react",
>     "@babel/preset-typescript"
>   ]
> }
> ```
>
> 这样，Babel 就能正确处理 `.ts` 和 `.tsx` 文件了。如果你用的是 `babel.config.js` 也可以用类似配置。

`{ test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },`

- 当遇到 `.scss` 结尾的文件（即 Sass 文件）时，
- 依次使用 `sass-loader`、`css-loader` 和 `style-loader` 进行处理。

1. `sass-loader`：把 Sass（.scss）代码编译成标准的 CSS。
2. `css-loader`：让 webpack 能理解和处理 CSS 的 `@import` 和 `url()` 等语法。
3. `style-loader`：把处理后的 CSS 通过 `<style>` 标签插入到 HTML 页面中。

> 注意：Loader 从右向左执行，Sass 需先编译为 CSS 再注入 DOM

`{ test: /\.(png|svg|woff2)$/, type: 'asset/resource' }`

告诉 webpack：

- 当遇到 `.png`、`.svg`、`.woff2` 结尾的文件（常见的图片和字体文件）时
- 使用 webpack 5 内置的 Asset Modules 功能，**将这些文件作为资源文件处理**。

具体来说，`type: 'asset/resource'` 会把这些文件复制到输出目录（如 `dist`），并返回一个文件的 URL 路径。这样你可以在代码中直接 `import` 或 `require` 这些资源文件，webpack 会自动处理它们的引用和输出。



#### 4.配置开发环境配置与实时调试

##### 配置热更新与开发服务器

```js
devServer: {
		static: path.join(__dirname, "dist"), // 指定了开发服务器（devServer）在运行时，会将 dist 目录作为静态资源根目录
		port: 3000, // 端口
		hot: true, // 启用模块热替换（HMR）
		historyApiFallback: true, // 支持 React Router 路由回退
	},
```

完整如下：

```js
const path = require("path");
module.exports = {
	entry: "./src/index.tsx",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "bundle.js",
	},
	module: {
		rules: [
			// TypeScript 编译
			{ test: /\.tsx?$/, use: "babel-loader" },
      // CSS 处理
			{ test: /\.css$/, use: ["style-loader", "css-loader"] },
			// Sass 处理（Loader 顺序：sass-loader → css-loader → style-loader）
			{ test: /\.scss$/, use: ["style-loader", "css-loader", "sass-loader"] },
			// 图片/字体处理（Webpack 5 内置 Asset Modules）
			{ test: /\.(png|svg|woff2)$/, type: "asset/resource" },
		],
	},
	mode: "development", // 开发模式不压缩代码，
	devServer: {
		static: path.join(__dirname, "dist"), // 指定了开发服务器（devServer）在运行时，会将 dist 目录作为静态资源根目录
		port: 3000, // 端口
		hot: true, // 启用模块热替换（HMR）
		historyApiFallback: true, // 支持 React Router 路由回退
	},
};

```

执行打包命令

```js
npx webpack serve
```

启动一个本地开发服务器，自动打包你的项目，并在本地提供访问（通常是 http://localhost:3000）

但是启动之后页面只有一个`Cannot GET /`这是由于根目录下没有 index.html 的原因导致的。



##### html-webpack-plugin

使用这个插件可以自动生成 index.html 文件

安装插件

```
npm install --save-dev html-webpack-plugin
```

在 webpack.config.js 中配置插件

```js
plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html", // 推荐放在 public 目录下
    }),
  ],
```

完整如下：

```js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // 新增

module.exports = {
	entry: "./src/index.tsx",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "bundle.js",
	},
	resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json']
  },
	module: {
		rules: [
			// TypeScript 编译
			{ test: /\.tsx?$/, use: "babel-loader" },
			// CSS 处理
			{ test: /\.css$/, use: ["style-loader", "css-loader"] },
			// Sass 处理（Loader 顺序：sass-loader → css-loader → style-loader）
			{ test: /\.scss$/, use: ["style-loader", "css-loader", "sass-loader"] },
			// 图片/字体处理（Webpack 5 内置 Asset Modules）
			{ test: /\.(png|svg|woff2)$/, type: "asset/resource" },
		],
	},
	mode: "development", // 开发模式不压缩代码，
	devServer: {
		static: path.join(__dirname, "dist"), // 指定了开发服务器（devServer）在运行时，会将 dist 目录作为静态资源根目录
		port: 3000,
		hot: true, // 启用模块热替换（HMR）
		historyApiFallback: true, // 支持 React Router 路由回退
	},
	plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html", // 推荐放在 public 目录下
    }),
  ],
};

```

 此时再次执行命令

```shell
npx webpack serve
```

就可以正常访问local'host:3000访问页面了。



##### 调试工具

添加如下配置

```js
devtool: 'eval-source-map'
```

可以让你在浏览器中精准定位源码错误

##### 代理 API 请求

添加如下配置

```js
devServer: {
  proxy: {
    '/api': 'http://localhost:8080' // 解决跨域问题
  }
}
```

#### 5.**生产环境优化与构建**

##### **代码分割与懒加载**

```js
// 动态导入路由组件
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
output: {
  filename: '[name].[contenthash].js', // 哈希缓存策略
  chunkFilename: '[id].[chunkhash].js'
},
optimization: {
  splitChunks: {
    chunks: 'all', // 分离 node_modules 到 vendors.js
    minSize: 20000 // 超过 20KB 才拆分
  }
}
```

作用如下：

- `optimization.splitChunks` 是 webpack 用于**代码分割（Code Splitting）**的配置项。
- `chunks: "all"` 表示对所有类型的 chunk（包括同步和异步）都进行分割，通常会把`node_modules`里的依赖单独打包成一个 vendors 文件，从而实现第三方库和业务代码分离，提高缓存利用率。
- `minSize: 20000`表示只有当被分割出来的 chunk 大小超过 20KB 时，才会真正生成一个新的文件，避免生成过多的小文件。

##### **资源压缩与 Tree Shaking**

```js
plugins: [
  new TerserPlugin(), // JS 压缩
  new CssMinimizerPlugin(), // CSS 压缩
  new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }) // 抽离 CSS
],
optimization: {
  usedExports: true, // 启用 Tree Shaking
}
```

- `new TerserPlugin()`：用于压缩和优化 JavaScript 代码，减小打包后的 JS 文件体积。
- `new CssMinimizerPlugin()`：用于压缩和优化 CSS 文件，减小打包后的 CSS 文件体积。
- `new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' })`：将 CSS 从 JS 文件中抽离出来，单独生成 CSS 文件，并用内容哈希命名，方便浏览器缓存。
- `optimization: { usedExports: true }`：开启 Tree Shaking，移除项目中未被使用的代码（只导出但未被用到的内容不会被打包进最终文件），进一步减小包体积。

> **验证**：通过 `webpack-bundle-analyzer` 检查未使用代码是否被移除



### 三、**性能分析与深度优化**

#### 1.**构建性能分析**

```sh
npx webpack --profile --json=stats.json  # 生成构建报告
```

`Webpack Bundle Analyzer`：分析模块体积占比

`SpeedMeasurePlugin`：统计 Loader/Plugin 耗时（如 Babel 占时过长则用 `thread-loader` 并行处理）

#### 2.**缓存策略**

```js
module: {
  rules: [{
    test: /\.js$/,
    use: ['cache-loader', 'babel-loader'] // 缓存 Loader 结果
  }]
},
cache: { type: 'filesystem' } // Webpack 5 持久化缓存
```













































































