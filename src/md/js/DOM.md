## DOM 操作方法

常见的 DOM 操作主要有：

- 创建节点
- 查询节点
- 更新节点
- 添加节点
- 删除节点



### 创建节点

创建新元素，接受一个参数，即要创建元素的标签名

```js
const divEl = document.createElement("div");
```

创建一个文本节点

```js
const textEl = document.createTextNode("content");
```

创建一个文档碎片，它表示一种轻量级的文档，主要是用来存储临时节点，然后把文档碎片的内容一次性添加到`DOM`中

> 注意⚠️：当请求把一个`DocumentFragment` 节点插入文档树时，插入的不是 `DocumentFragment`自身，而是它的所有子孙节点

```js
const fragment = document.createDocumentFragment();
```

创建属性节点，可以是自定义属性

```js
const dataAttribute = document.createAttribute('custom');
consle.log(dataAttribute);
```

### 获取节点

#### querySelector

传入任何有效的`css` 选择器，即可选中单个 `DOM`元素（首个），如果页面上没有指定的元素时，返回 `null`

```js
// document/element.querySelector('CSS选择器'); 
document.querySelector('.element')
document.querySelector('#element')
document.querySelector('div')
document.querySelector('[name="username"]')
document.querySelector('div + p > span')
```

#### querySelectorAll

返回一个包含节点子树内所有与之相匹配的`Element`节点列表，如果没有相匹配的，则返回一个空节点列表

> 注意⚠️：该方法返回的是一个 `NodeList`的静态实例，它是一个静态的“快照”，而非“实时”的查询

```js
// document/element.querySelectorAll('CSS选择器');
const notLive = document.querySelectorAll("p");
```

#### getElementById

返回拥有指定id的对象的引用

```js
document.getElementById('id属性值');
```

#### getElementsByClassName

返回拥有指定class的对象集合

```js
document.getElementsByClassName('class属性值');
```

#### getElementsByTagName

返回拥有指定标签名的对象集合

```js
document.getElementsByTagName('标签名');
```

#### getElementsByName

返回拥有指定名称的对象结合

```js
document.getElementsByName('name属性值');
```

#### 特殊节点获取

```js
document.documentElement;  获取页面中的HTML标签
document.body; 获取页面中的BODY标签

document.all[''];  获取页面中的所有元素节点的对象集合型
```

除此之外，每个`DOM`元素还有`parentNode`、`childNodes`、`firstChild`、`lastChild`、`nextSibling`、`previousSibling`属性，关系图如下图所示

![img](https://raw.githubusercontent.com/zyileven/image-hosting-platform/master/src/2024/03/03/bc4db6840acb54c3f61612ef9d87d74d-c100f450-7fdc-11eb-ab90-d9ae814b240d-73fa4a.png)

### 更新节点

#### innerHtml 

修改一个`DOM`节点的文本内容，还可以直接通过`HTML`片段修改`DOM`节点内部的子树

```js
// 获取<p id="p">...</p >
var p = document.getElementById('p');
// 设置文本为abc:
p.innerHTML = 'ABC'; // <p id="p">ABC</p >
// 设置HTML:
p.innerHTML = 'ABC <span style="color:red">RED</span> XYZ';
// <p>...</p >的内部结构已修改
```

#### innerText、textContent

一定是插入文本节点，会自动对字符串进行`HTML`编码，保证无法设置任何`HTML`标签

```js
// 获取<p id="p-id">...</p >
var p = document.getElementById('p-id');
// 设置文本:
p.innerText = '<script>alert("Hi")</script>';
// HTML被自动编码，无法设置一个<script>节点:
// <p id="p-id">&lt;script&gt;alert("Hi")&lt;/script&gt;</p >
```

两者的区别在于读取属性时，`innerText`不返回隐藏元素的文本，而`textContent`返回所有文本。



### 添加节点

#### innerHtml

如果这个DOM节点是空的，例如，`<div></div>`，那么，直接使用`innerHTML = '<span>child</span>'`就可以修改`DOM`节点的内容，相当于添加了新的`DOM`节点。如果这个DOM节点不是空的，那就不能这么做，因为`innerHTML`会直接替换掉原来的所有子节点。

#### appendChild

把一个子节点添加到父节点的最后一个子节点

```js
<!-- HTML结构 -->
<p id="js">JavaScript</p >
<div id="list">
    <p id="java">Java</p >
    <p id="python">Python</p >
    <p id="scheme">Scheme</p >
</div>
<script>
// 添加一个 P 元素
const js = document.getElementById('js')
js.innerHTML = "JavaScript"
const list = document.getElementById('list');
list.appendChild(js);      
</script>

```

如果动态添加新的节点，则先创建一个新的节点，然后插入到指定的位置

```js
const list = document.getElementById('list'),
const haskell = document.createElement('p');
haskell.id = 'haskell';
haskell.innerText = 'Haskell';
list.appendChild(haskell);
```

#### insertBefore

把子节点插入到指定的位置，使用方法如下：

referenceElement：指定节点位置，插入的元素会在这个元素之前

```js
parentElement.insertBefore(newElement, referenceElement)
```

#### setAttribute

在指定元素中添加一个属性节点，如果元素中已有该属性改变属性值

```js
const div = document.getElementById('id')
div.setAttribute('class', 'white');//第一个参数属性名，第二个参数属性值。
```

### 删除节点

删除一个节点，首先要获得该节点本身以及它的父节点，然后，调用父节点的`removeChild`把自己删掉，并且返回这个节点。

```js
// 拿到待删除节点:
const self = document.getElementById('to-be-removed');
// 拿到父节点:
const parent = self.parentElement;
// 删除:
const removed = parent.removeChild(self);
removed === self; // true
```













