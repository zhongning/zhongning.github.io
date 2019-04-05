---
title: Hexo创建自定义页面的方法
tags:
  - hexo
categories:
  - hexo
abbrlink: 56866
date: 2019-04-01 23:07:21
---

## 自定义页面的问题

只有source目录下的文件才会发布到public（能够在网络上访问到），因此Hexo只默认渲染source目录下的文件，但有一些前端作品或demo页我们不希望经过渲染，而是能保持完全自定义的样子，那该怎么用Hexo添加自定义的web页面呢？

## 第一种解决方法

第一种方法是使用Hexo提供的跳过渲染配置，针对某个文件或者目录进行排除。具体步骤，打开博客根目录_config.yml，找到其中skip_render项，这个项目用来配置/source/中需要跳过渲染的文件或目录。

<!-- more -->

假设source目录下的文件如以下目录树所示

```
├─ demo
|  ├─ js-view-size
|  |  ├─ 1.html
|  |  └┈ 2.html
|  ├─ other
|  |  ├─ 3.html
|  |  ├─ 4.html
|  |  └┈ 5.md
|  ├─ 6.html
|  └┈ 7.md
├─ baidu.html
└┈ google.html
```

### 排除单个文件

排除baidu.html

```yaml
skip_render:
  - 'baidu.html'
```

### 排除多个文件

排除baidu.html，google.html和3.html

```yaml
skip_render:
  - 'baidu.html'
  - 'google.html'
  - 'demo/other/3.html'
```

或者

```yaml
skip_render:
  - '*.html'
  - 'demo/other/3.html'
```

排除source/demo/other目录中的所有文件

```yaml
skip_render: 'demo/other/**'
```

匹配规则是一种类似正则的规则，官方给出的参考是[这个](https://github.com/isaacs/minimatch)。另外修改了配置后为了及时应用新配置，最好在生成之前执行一下hexo clean命令，清除掉旧的生成文件和缓存。

## 第二种解决方法

第二种方法是给单个文件添加不应用模板的标记，适用于个别特殊文件的处理。例如我们的网站如果要使用百度统计，往往需要在根目录放一个html格式的验证文件，这个文件默认也会经过用主题模板渲染，避免渲染的办法就是在文件头部添加如下内容：

```
layout: false
```

这样，这个文件就不会经过模板渲染，最终发布到/public/里的文件就是去掉标记后的文件的样子。
