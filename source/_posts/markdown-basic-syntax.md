---
title: Markdown基本语法
tags:
  - markdown
categories:
  - hexo
abbrlink: 48840
date: 2019-03-25 22:10:59
---

Markdown基本语法，几乎所有Markdown应用程序都支持`John Gruber`原始设计文档中概述的基本语法。

## 标题

在标题前插入1到6个#，表示6个不同级别的标题

```
# Heading level 1
## Heading level 2
### Heading level 3
#### Heading level 4
##### Heading level 5
###### Heading level 6
```

## 段落

段落之间用空行隔开，不能使用空格或者缩进

```
I really like using Markdown.

I think I'll use it to format all of my documents from now on.
```

<!--more-->

## 换行符

在文字中间插入`<br>`可以进行换行，或者两个空格再回车。

```
This is the first line. <br> And this is the second line.
```

This is the first line. <br> And this is the second line.

## 强调

### 加粗

在文字的前后用两个`*`或者`_`可以加粗字体

```
I just love **bold text**.
I just love __bold text__.
Love**is**bold
```

I just love **bold text**.  
I just love __bold text__.  
Love**is**bold

### 斜体

在文字的前后用一个`*`或者`_`可以变成斜体

```
Italicized text is the *cat's meow*.
Italicized text is the _cat's meow_.
A*cat*meow
```

Italicized text is the *cat's meow*.  
Italicized text is the _cat's meow_.  
A*cat*meow

### 同时加粗和斜体

在文字的前后用三个`*`或者`_`可以同时加粗和变成斜体

```
This text is ***really important***.
This text is ___really important___.
```

This text is ***really important***.  
This text is ___really important___.

## 引用

在一段文字中的开头加上 `>` 来表示一段引用文字

```
> Dorothy followed her through many of the beautiful rooms in her castle.
```

> Dorothy followed her through many of the beautiful rooms in her castle.

### 引用多个段落

在每个段落及空行开头加上 `>` 来表示引用多段文字

```
> Dorothy followed her through many of the beautiful rooms in her castle.
>
> The Witch bade her clean the pots and kettles and sweep the floor.
```

> Dorothy followed her through many of the beautiful rooms in her castle.
>
> The Witch bade her clean the pots and kettles and sweep the floor.

### 引用嵌套

引用可以嵌套，在段落的开头加上`>>`

```
> Dorothy followed her through many of the beautiful rooms in her castle.
>
>> The Witch bade her clean the pots and kettles and sweep the floor.
```

> Dorothy followed her through many of the beautiful rooms in her castle.
>
>> The Witch bade her clean the pots and kettles and sweep the floor.

### 引用中使用其他元素

引用中可以包含其他Markdown的元素，但并不是所有但元素都可以用

```
> #### The quarterly results look great!
>
> - Revenue was off the chart.
> - Profits were higher than ever.
>
>  *Everything* is going according to **plan**.
```

> #### The quarterly results look great!
>
> - Revenue was off the chart.
> - Profits were higher than ever.
>
>  *Everything* is going according to **plan**.

## 列表

列表可以分为有序列表和无序列表

### 有序列表

有序列表在文字开头加上数字和点，数字并不要求按照顺序，但是起始应该是1

```
1. First item
2. Second item
3. Third item
4. Fourth item

1. First item
8. Second item
3. Third item
5. Fourth item

1. First item
2. Second item
3. Third item
    1. Indented item
    2. Indented item
4. Fourth item
```

1. First item
2. Second item
3. Third item
    1. Indented item
    2. Indented item
4. Fourth item

### 无序列表

无序列表在每一行开头加上`-`、`+`、`*`，缩进去创建嵌套列表

```
- First item
- Second item
- Third item
- Fourth item

* First item
* Second item
* Third item
* Fourth item

+ First item
* Second item
- Third item
+ Fourth item

- First item
- Second item
- Third item
    - Indented item
    - Indented item
- Fourth item
```

- First item
- Second item
- Third item
    - Indented item
    - Indented item
- Fourth item

### 在列表中添加其他元素

在列表中添加其他元素，要缩进4个空格或者1个tab

```
*   This is the first list item.
*   Here's the second list item.

    I need to add another paragraph below the second list item.

*   And here's the third list item.
```

*   This is the first list item.
*   Here's the second list item.

    I need to add another paragraph below the second list item.

*   And here's the third list item.

## 代码

要表示一行代码，使用`` ` ``来包裹

```
At the command prompt, type `nano`.
```

At the command prompt, type `nano`.

### 反引号转义

在一行代码中如果代码本身也含有反引号，可以把最外层用两个反引号包裹

```
``Use `code` in your Markdown file.``
```

``Use `code` in your Markdown file.``

### 代码块

代码块的每行代码必须最少缩进4个空格或者1个tab

```
####
    <html>
      <head>
      </head>
    </html>
```

    <html>
      <head>
      </head>
    </html>

## 分割线

使用三个及以上的`*`、`-`、`_`表示分割线

```
***

---

_________________
```

***

## 链接

用`[]`包裹链接文字，随后用`()`包裹URL

```
My favorite search engine is [Duck Duck Go](https://duckduckgo.com).
```

My favorite search engine is [Duck Duck Go](https://duckduckgo.com).

### 链接添加提示

```
My favorite search engine is [Duck Duck Go](https://duckduckgo.com "The best one").
```

My favorite search engine is [Duck Duck Go](https://duckduckgo.com "The best one").

### 网页和邮箱

为了快速将网页和邮箱转为链接，可以用`<>`包裹起来

```
<https://www.markdownguide.org>
<fake@example.com>
```

<https://www.markdownguide.org>  
<fake@example.com>

### 格式化链接

为了强调链接，可以在链接的前后加星号

```
I love supporting **[EFF](https://eff.org)**.
This is the *[Markdown Guide](https://www.markdownguide.org)*.
```

I love supporting **[EFF](https://eff.org)**.  
This is the *[Markdown Guide](https://www.markdownguide.org)*.

## 图片

图片的插入方式是在最开始插入`!`，然后用`[]`包裹图片无法加载的描述，再把图片的地址用`()`包裹

```
![Google](http://pngimg.com/uploads/google/google_PNG19631.png "Google Search")
```

![Google](http://pngimg.com/uploads/google/google_PNG19631.png "Google Search")

### 带链接的图片

给图片加链接的方式是，把图片的Markdown用`[]`包裹，再在后面把链接地址用`()`包裹

```
[![Google](http://pngimg.com/uploads/google/google_PNG19631.png "Google Search")](https://www.google.com)
```

[![Google](http://pngimg.com/uploads/google/google_PNG19631.png "Google Search")](https://www.google.com)

## 转义字符

如果有些符号是Markdown使用的，但是又想显示，可以在字符前加` \ `

```
\* Without the backslash, this would be a bullet in an unordered list.
```

## 转义字符列表

| Character | Name |
| --- | --- |
| \ | backslash |
| ` | tick mark |
| * | asterisk |
| _ | underscore |
| {} | curly braces |
| [] | brackets |
| () | parentheses |
| # | pound sign |
| + | plus sign |
| - | minus sign (hyphen) |
| . | dot|
| ! | exclamation mark |
