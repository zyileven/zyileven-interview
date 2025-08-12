## PostCSS 后处理器

在 CSS 中，我们有预处理器Sass/Less，同时也有后处理器 PostCSS 。

### PostCSS 核心概念与定位

核心：通过 JavaScript 插件转换现有 CSS 为新的 CSS

流程：输入 CSS → 解析为 AST → 插件处理 AST → 生成新 CSS，每个环节独立可扩展

> **与预处理器关系**：互补而非替代（常与 Sass/Less 共存），例如用 Sass 写逻辑，PostCSS 做兼容性处理



### PostCSS 的工作流程

1. **解析 (Parse)**

   CSS 源代码 → 抽象语法树 (AST)

2. **转换 (Transform)**

   AST → 修改后的 AST

3. **生成 (Generate)**

   修改后的 AST → 目标 CSS 代码



#### AST 节点类型

- Root：整个 CSS 文件的根节点。
- AtRule：处理 @media、@keyframes等规则。
- Rule：普通 CSS 规则（如 .class）。
- Declaration：属性声明（如 color: red;）。
- Comment：注释内容



### 插件生态系统

#### 支持嵌套/未来语法

使用插件：`postcss-nested`, `postcss-preset-env`

#### 自动前缀/降级语法

使用插件：`Autoprefixer`, `cssgrace`

#### 压缩/删除冗余

使用插件：`cssnano`, `UnCSS`

#### 代码质量/规范校验

使用插件：`Stylelint`

#### 模块化/资源管理

使用插件：`CSS Modules`, `postcss-assets`



### 插件使用方法

#### Autoprefixer

基于 Can I Use数据自动加前缀，支持目标浏览器配置

```js
// postcss.config.js
plugins: [
  require('autoprefixer')({ 
    overrideBrowserslist: ['last 2 versions', 'IE 11'] 
  })
]
```

#### cssnano

生产环境压缩，预设 `default`包含 50+ 优化规则

#### postcss-preset-env

启用 CSS 未来特性（如 `:has()`选择器），自动转换为兼容语法



### 安装与工作流集成

```shell
npm install --save-dev postcss postcss-cli autoprefixer cssnano
```

新增配置文件：`postcss.config.js`

```js
module.exports = {
  plugins: [
    require('autoprefixer'),   // 自动前缀
    require('cssnano')({ preset: 'default' }) // 压缩
  ]
};
```

集成构建工具，Webpack通过 `postcss-loader`集成：

```js
// webpack.config.js
module: {
  rules: [
    {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader',
        { loader: 'postcss-loader' } // 自动读取 postcss.config.js
      ]
    }
  ]
}
```

命令行手动编译：

```shell
npx postcss src/style.css -o dist/style.min.css
```



### 总结

PostCSS 通过 AST 驱动的插件化架构，解决了 CSS 开发的三大痛点：

- 兼容性：自动化前缀与语法降级，无需手动适配浏览器。
- 工程化：无缝集成构建工具，支持模块化与代码优化。
- 可维护性：插件组合取代 monolithic 工具，按需扩展功能

























































