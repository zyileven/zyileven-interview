## 元素居中的方式



### 利用定位 + margin:auto

```html
<style>
  .father{
    width: 500px;
    height: 300px;
    border: 1px solid #0a3b98;
  }
  .son{
    width: 100px;
    height: 40px;
    background: #f0a238;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
</style>
<div class="father">
  <div class="son"></div>
</div>
```

### 利用定位 + margin:负值

```html
<style>
  .father{
    position: relative;
    width: 200px;
    height: 200px;
    background: skyblue;
  }
  .son{
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -50px;
    mamrgin-top: -50px;
    width: 100px;
    height: 100px;
    background: red;
  }
</style>
<div class="father">
  <div class="son">
    
  </div>   
</div>
```

### 利用定位 + transform

```html
<style>
  .father{
    position: relative;
    width: 200px;
    height: 200px;
    background: skyblue;
  }
  .son{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100px;
    height: 100px;
    background: red;
  }
</style>

<div class="father">
  <div class="son">
    
  </div>
</div>
```

### table布局

设置父元素为 `display：table-cell`，子元素设置 `display：inline-block` 。利用 verticel 和 text-align 可以让所有的行内块级元素水平垂直居中。

```html
<style>
  .father{
    display: table-cell;
    width: 200px;
    height: 200px;
    background: skyblue;
    vertical-align: middle;
    text-align: center;
  }
  .son{
    display: inline-block;
    width: 100px;
    height: 100px;
    background: red;
  }
</style>

<div class="father">
  <div class="son">
    
  </div>
</div>
```

### flex 弹性布局

```html
<style>
  .father{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 200px;
    background: skyblue;
  }
  .son{
    width: 100px;
    height: 100px;
    background: red;
  }

</style>

<div class="father">
  <div class="son">
    
  </div>
</div>
```

### grid网格布局

```html
<style>
  .father{
    display: grid;
    align-items: center;
    justify-content: center;
    width: 200px;
    height: 200px;
    background: skyblue;
  }
  .son{
    width: 10px;
    height: 10px;
    border: 1px solid red;
  }
</style>

<div class="father">
  <div class="son">
    
  </div>
</div>
```







































































