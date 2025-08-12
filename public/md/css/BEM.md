## BEM

BEM是一种 CSS 书写规范；BEM是一种 CSS 书写规范；BEM是一种 CSS 书写规范；

重要的事说三遍！！！

BEM 的格式：

![img](https://raw.githubusercontent.com/zyileven/image-hosting-platform/master/src/2025/08/12/97916fe2bfa7b3dbbfa0bfa1362814bd-1-O3bBonPBEugnTOVzpTaghg-38d1c0.png)

BEM 的模块化方法使组织 CSS 代码变得容易，并保持其简洁和可读性。通过将样式分解为块、元素和修饰符，您可以创建一个清晰且结构化的层次结构，便于导航和维护。



### BEM 的核心

#### B：Block 模块

一个独立存在的实体，其本身具有意义。块级样式永远不会依赖于页面上的其他元素，因此你永远不会遇到[级联问题 ](http://www.phase2technology.com/blog/used-and-abused-css-inheritance-and-our-misuse-of-the-cascade/)。

#### E：Element 元素

一个没有独立意义且在语义上与其所属模块相关联的模块的一部分。

在 BEM 中，你使用一个`双下划线 (__)` 来分隔块和元素

在 BEM 中使用元素有助于保持代码的条理清晰和易于阅读。它还使得在不影响代码其他部分的情况下，更容易对特定元素进行修改。

在 CSS 代码中选择元素时，使用 BEM 命名约定非常重要，这样你的代码可以保持一致性并易于理解。

```html
<div class="header__item">
```



#### M：Modify 修饰符

块或元素上的一个标志。使用它们来改变外观或行为。

修饰符是 BEM 的一个强大功能，它允许你在无需创建新的类名的情况下创建块和元素的变体。修饰符用于根据特定条件（如状态、主题或大小）改变元素或块的外观。

修饰符用两个连字符（--）后跟修饰符名称表示。修饰符可以应用于块或元素，并且还可以与其他修饰符组合以创建更复杂的效果。

```html
<div class="button button--disabled">Disabled Button</div>
```



### 完整的 BEM 样式模式

```html
<div class="card">
  <img class="card__image card__image--circular" src="image.jpg" alt="Image">
  <div class="card__content">
    <p class="card__content--title">The card content title goes here.</p>
    <p class="card__content--description">Card content description goes here.</p>
  </div>
</div>
```

通过这种方式，修饰符可以帮助您创建复杂且灵活的设计，而不会牺牲清晰度或可维护性。



#### BEM 的优势

使用 BEM 的主要优势之一在于其模块化设计。通过将样式分解为块、元素和修饰符，BEM 使得 CSS 代码易于阅读和维护，即使项目规模越来越大、越来越复杂也是如此。

BEM 还鼓励使用描述性的类名，这使得每个 CSS 规则的目的易于理解。这对于可能需要协作同一代码库的大型团队来说尤其有用。



#### BEM 与响应式设计

响应式设计已成为现代网页开发的重要组成部分。随着设备数量和屏幕尺寸的不断增长，确保您的网站在所有屏幕上都能呈现出良好的效果至关重要。BEM 可以帮助您创建易于维护和扩展的响应式设计。

响应式设计的核心在于使用 CSS 断点。这些是您代码中的特定点，您可以在这些点上为不同的屏幕尺寸指定不同的样式。例如，您可能希望导航菜单在小屏幕上从水平布局切换到垂直布局。

使用 BEM，您可以通过使用修饰符轻松地为您的代码添加断点。例如，您可以创建一个名为——small 的修饰符，用于在小屏幕上为某个块或元素应用特定的样式。这使得编写清晰易读且能适应不同屏幕尺寸的代码变得简单。

BEM 也与网格系统配合得很好，网格系统是创建响应式设计的常用工具。网格系统允许你定义一组列和行，你的内容可以放置其中。使用 BEM，你可以创建与这些网格列和行对应的块和元素，从而轻松组织内容并确保它在所有屏幕上看起来都很棒。



































