## 页面隐藏元素的方法

实现元素隐藏的方式有很多种，但是每一种的效果不太一样。

### display：none

设置元素的 display 为 none 是最常用的隐藏元素的方法

```css
.hide{
	display: none;
}
```

设置这个样式之后，元素将从页面上彻底消失，原来占有的空间会被其他元素补充，所以会导致浏览器的重排和重绘。

所有与这个元素有关的东西都无法进行。



### visibility：hidden

设置元素 visibility 为 hidden 也是一种常用的隐藏元素的方法。

DOM 结构依旧存在，只是不可见，不会触发重排，但是会触发重绘。

```css
.hidden{
	visibility: hidden;
}
```



### opacity: 0

将一个元素的透明度设置为 0 之后，也能达到隐藏元素的效果，不会引发重排，一般情况下也会引发重绘。

```css
.transparent{
  opacity: 0;
}
```

元素任然存在于页面，所以他自身的事件仍然是可以触发的。



### 设置 height 、 width 属性为 0

将元素的 margin，border，padding，height，width 等影响元素盒模型的属性设置成 0，如果元素内存在子元素或内容，还应该设置其 overflow：hidden 来隐藏其子元素。

```css
.hiddenBox {
  margin: 0;
  border: 0;
  padding: 0;
  height: 0;
  width: 0;
  overflow: hidden;
}
```



### position：absolute

将元素移出可视区域

```css
.hide{
  position: absolute;
  top: -9999px;
  left: -9999px;
}
```

元素依旧存在，但是不在视口内，于是实现隐藏的效果



### clip-path

通过裁剪的形式

```css
.hide{
  clip-path: polygon(0px 0px, 0px 0px, 0px 0px,0px 0px)
}
```

元素不可见，占据页面空间，无法响应点击事件。























































































