# CSS BFC 块级格式化上下

CSS BFC（Block Formatting Context，块级格式化上下文）是CSS布局中的核心概念，指页面中的一个独立渲染区域，其内部元素的布局与外部隔离，遵循特定规则。

### **BFC的本质与核心特性**

#### **独立渲染区域**

BFC是一个封闭容器，内部元素布局不受外部影响，反之亦然。比如：父元素触发BFC后，浮动子元素的高度会被计算，避免“高度塌陷”

我们常说的文档流其实分为定位流、浮动流和普通流三种。而普通流其实就是指BFC中的FC

FC是formatting context的首字母缩写，直译过来是格式化上下文，它是页面中的一块渲染区域，有一套渲染规则，决定了其子元素如何布局，以及和其他元素之间的关系和作用。

常见的FC有BFC、IFC（行级格式化上下文），还有GFC（网格布局格式化上下文）和FFC（自适应格式化上下文）。

> BFC 可以简单的理解为**某个元素的一个 CSS 属性**，只不过这个属性**不能被开发者显式的修改**，拥有这个属性的元素对内部元素和外部元素会表现出一些特性，这就是BFC。

#### **布局规则**

- 内部块级元素在垂直方向依次排列。
- 同一BFC内相邻元素的垂直（上下）外边距会合并（取较大值）。
- BFC区域不与浮动元素重叠
- 计算BFC的高度时，浮动子元素也参与计算
- 边子元素的左外边距始终与容器左边界接触（从左向右布局）
- BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之亦然

### **触发BFC的条件**

满足以下任一条件即可创建BFC：

1. 根元素：`<html>` 自身是BFC。
2. 浮动元素：float: left/right（非none）。
3. 绝对定位：position: absolute/fixed。
4. 特定display值：
   1. inline-block、table-cell、table-caption
   2. flex、inline-flex、grid、flow-root（现代布局首选）。
5. 溢出控制：overflow: hidden/auto/scroll（非visible）

### **BFC的应用场景与解决方案**

#### **清除浮动（解决高度塌陷）**

- 问题：浮动元素脱离文档流，父容器高度为0。
- 解决：触发父元素BFC，使其包含浮动子元素高度

```css
<style>
    .parent {
        border: 5px solid #fcc;
        width: 300px;
      	overflow: hidden; // BFC
    }
 
    .child {
        border: 5px solid #f66;
        width:100px;
        height: 100px;
        float: left;
    }
</style>
<body>
    <div class="parent">
        <div class="child"></div>
        <div class="child"></div>
    </div>
</body>
```

#### **阻止外边距重叠（Margin Collapsing）**

- 问题：相邻垂直边距合并（如上下两个div的margin: 20px → 实际间距20px）。
- 解决：为其中一个元素包裹BFC容器，隔离边距。

```html
<style>
    .wrap {
        overflow: hidden;// 新的BFC
    }
    p {
        color: #f55;
        background: #fcc;
        width: 200px;
        line-height: 100px;
        text-align:center;
        margin: 100px;
    }
</style>
<body>
    <p>Haha</p >
    <div class="wrap">
        <p>Hehe</p >
    </div>
</body>
```

#### **实现自适应两栏布局**

- 问题：左侧浮动，右侧内容被覆盖。
- 解决：触发右侧元素BFC，避免与浮动重叠

```css
<style>
    body {
        width: 300px;
        position: relative;
    }
 
    .aside {
        width: 100px;
        height: 150px;
        float: left;
        background: #f66;
    }
 
    .main {
        height: 200px;
        background: #fcc;
      	overflow: hidden;
    }
</style>
<body>
    <div class="aside"></div>
    <div class="main"></div>
</body>
```

#### **阻止浮动元素覆盖**

- 问题：非浮动元素被浮动元素覆盖。
- 解决：为被覆盖元素触发BFC（如设置overflow: hidden）

上一个案例就是为覆盖的元素设置 BFC，从而实现的。



### 现代替代方案：

- Flex/Grid布局天然创建BFC，优先替代浮动布局。
- display: flow-root 专为BFC设计，无副作用









