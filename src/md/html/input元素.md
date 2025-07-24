## Input 输入框

Input 元素的作用是：创建交互式控件，用于收集用户输入数据（文本、选择、文件等）

- 通过 type 属性定义控件类型（默认 text）。
- 依赖 name 属性标识表单提交时的数据键名

### 一、文本输入类

#### `type="text"`

**用途**：单行文本输入（用户名、搜索词）

**关键属性**：`placeholder`, `maxlength`

```html
<input type="text" placeholder="姓名">
```

#### `type="password"`

**用途**：密码输入（内容掩码显示）

**关键属性**：`minlength`, `autocomplete`

```html
<input type="password" required>
```



#### `type="email"`

**用途**：邮箱地址（自动格式验证）

**关键属性**：`pattern`, `multiple`

```html
<input type="email" pattern=".+@.+\..+">
```



#### `type="url"`

**用途**：URL 地址（验证格式）

```html
<input type="url" name="website">
```





#### `type="tel"`

用途：电话号码（无强制验证）

```html
<input type="tel" placeholder="手机号">
```



#### `type="search"`

用途：搜索框（样式优化）

```html
<input type="search" name="q">
```

### 二、选择类

#### `type="checkbox"`

用途：多选（可勾选多个选项）

关键属性：`checked`, `value`

```html
<input type="checkbox" value="sports">
```



#### `type="radio"`

用途：单选（同组互斥）

关键属性：`name` 相同, `checked`

```html
<input type="radio" name="gender" value="male">
```



#### `type="file"`

用途：文件上传

关键属性：`accept`, `multiple`

```html
<input type="file" accept=".jpg, .png">
```



#### `type="range"`

用途：滑块选择数值范围

关键属性：`min`, `max`, `step`

```html
<input type="range" min="0" max="100">
```



### 三、功能类

#### `type="submit"`

用途：提交表单数据到服务器

关键属性：`value`（按钮文字）

```html
<input type="submit" value="提交">
```



#### `type="reset"`

用途：重置表单内容

```html
<input type="reset" value="清空">
```



#### `type="button"`

用途：自定义按钮（需 JS 绑定事件

```html
<input type="button" value="点击" onclick="fn()">
```



#### `type="hidden"`

用途：隐藏字段（传递后台数据）

关键属性：`value`（固定值）

```html
<input type="hidden" name="token" value="abc">
```

#### `type="image"`

用途：图片按钮（替代 `submit`）

关键属性：`src`, `alt`

```html
<input type="image" src="btn.png">
```

### 四、日期时间类

#### `type="date"`

用途：选择日期

```html
<input type="date" name="birthday">
```



#### `type="time"`

用途：选择时间

```html
<input type="time" name="meeting">
```



#### `type="month"`

用途：选择年月

```html
<input type="month" name="expiry">
```



#### `type="week"`

用途：选择年周

```html
<input type="week" name="vacation">
```



#### `type="datetime-local"`

用途：选择日期+时间（本地）

```html
<input type="datetime-local" name="event">
```













































































