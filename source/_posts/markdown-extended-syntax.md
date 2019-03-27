---
title: Markdown扩展语法
tags:
  - markdown
categories:
  - tools
abbrlink: 38514
date: 2019-03-27 14:01:16
---

Markdown扩展语法的由来是基本语法不太够用，一些个人和组织添加来额外的元素来扩展基本语法。主要包括表格、代码块、语法高亮、URL自动链接、脚注。

## 可用性

扩展语法并不是在所有的Markdown应用中都能使用，你需要去检查自己的应用使用的轻量级Markdown语言是否支持。

## 轻量级Markdown语言

这里列举集中轻量级Markdown语言，很多流行的Markdown应用都使用其中一种。

- [CommonMark](http://commonmark.org/)
- [GitHub Flavored Markdown (GFM)](https://github.github.com/gfm/)
- [Markdown Extra](https://michelf.ca/projects/php-markdown/extra/)
- [MultiMarkdown](http://fletcherpenney.net/multimarkdown/)

### Markdown处理器

有很多可用的Markdown处理器，都能够允许你增加扩展去使用扩展语法。

## 表格

使用3个或者更多的连字符`---`去创建每一列的表头，使用竖线`|`去分割每一列。

```
| Syntax      | Description |
| ----------- | ----------- |
| Header      | Title       |
| Paragraph   | Text        |

| Syntax | Description |
| --- | ----------- |
| Header | Title |
| Paragraph | Text |
```

| Syntax      | Description |
| ----------- | ----------- |
| Header      | Title       |
| Paragraph   | Text        |

<!--more-->

### 对齐

可以在表头连字符的左边、右边、两边添加`:`来达到列文字居左、居右、居中对齐的效果。

```
| Syntax      | Description | Test Text     |
| :---        |    :----:   |          ---: |
| Header      | Title       | Here's this   |
| Paragraph   | Text        | And more      |
```

| Syntax      | Description | Test Text     |
| :---        |    :----:   |          ---: |
| Header      | Title       | Here's this   |
| Paragraph   | Text        | And more      |

### 表格中文字的格式化

在表格中，可以加入链接、代码、加粗、斜体。

### 表格中竖线的转义

可以使用竖线对应的HTML字符编码`&#124;`来表示`|`。

## 带栅栏的代码块

Markdown基本语法允许使用缩进4个空格或者1个tab来创建代码块。另外你也可以使用3个反引号\`\`\`或者3个波浪号\~\~\~在代码块的前后来创建带栅栏的代码块，不需要缩进任何行。

````
```
{
  "firstName": "John",
  "lastName": "Smith",
  "age": 25
}
```
````


```
{
  "firstName": "John",
  "lastName": "Smith",
  "age": 25
}
```

### 语法高亮

很多Markdown处理器支持在带栅栏的代码块中语法高亮，这将使你用任何语言写的代码增加色彩高亮。只需要在反引号后紧接着指定语言，即可实现。

````
```json
{
  "firstName": "John",
  "lastName": "Smith",
  "age": 25
}
```
````

```json
{
  "firstName": "John",
  "lastName": "Smith",
  "age": 25
}
```

## 脚注

脚注允许你增加笔记和参考在不截断文章内容的前提下。当你创建一个脚注，一个带链接上标数字就会出现在你加脚注的地方。点击链接就可以跳转到页面底部脚注的内容。

在`[]`中添加异或符号`^`和标识即可创建脚注引用。标识即可是数字也可是字符，但不能包含空格或者制表符。

```
Here's a simple footnote,[^1] and here's a longer one.[^bignote]

[^1]: This is the first footnote.

[^bignote]: Here's one with multiple paragraphs and code.

    Indent paragraphs to include them in the footnote.

    `{ my code }`

    Add as many paragraphs as you like.
```

## 标题IDs

可以给标题加自定义ID，这样能链接到标题并且可以通过CSS样式进行修改。在标题后把自定义ID用`{}`包裹

```
### My Great Heading {#custom-id}
```

### 指向标题到链接

创建一个标准到链接，链接地址使用`#`再跟上标题ID。

```
[Heading IDs](#heading-ids)
```

[轻量级Markdown语言](#轻量级Markdown语言)

## 定义列表

创建术语到定义列表，把术语放在第一行，下一行用`:`接一个空格开头，后面写定义。

```
First Term
: This is the definition of the first term.

Second Term
: This is one definition of the second term.
: This is another definition of the second term.
```

## 删除线

删除线能够在文字到中间加一条水平线，以表示文字是错误的。使用两个波浪线在文字的前后即可创建删除线。

```
~~The world is flat.~~ We now know that the world is round.
```

~~The world is flat.~~ We now know that the world is round.

## 任务列表

任务列表可以创建一系列带复选框的事项，使用连字符`-`加空格，再加`[ ]`，而后跟事项。选中复选框，使用`[x]`.

```
- [x] Write the press release
- [ ] Update the website
- [ ] Contact the media
```

- [x] Write the press release
- [ ] Update the website
- [ ] Contact the media

## URL自动生成链接

很多Markdown处理器能自动将URL转成链接，不用加`<>`。

```
http://www.example.com
```

http://www.example.com

## 禁止URL自动生成链接

如果你不想将URL自动转成链接，你可以将URL当成代码。

```
`http://www.example.com`
```

`http://www.example.com`
