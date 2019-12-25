---
title: Mac终端代理和git代理设置
tags: proxy
categories: computer
abbrlink: 53106
date: 2019-12-25 21:12:50
---

## 一、直接设置系统环境变量

### 1. 临时代理

在终端中输入

```shell
export http_proxy="http://127.0.0.1:1087"   
export https_proxy="http://127.0.0.1:1087"
或者直接
export all_proxy="http://127.0.0.1:1087"// 这是直接设置了http/https省得麻烦，当然你要是有分开设置的需求就分开设置
```

> 这是代理本身走的https/http

<!-- more -->

或者

```shell
export http_proxy="socks5://127.0.0.1:1086"   
export https_proxy="socks5://127.0.0.1:1086"
或者
export all_proxy="socks5://127.0.0.1:1086" // 这是直接设置了http/https省得麻烦，当然你要是有分开设置的需求就分开设置
```

> 这是代理本身走的socks5


### 2. 永久写入

如果使用的是zsh就在.zshrc中写入

```shell
export http_proxy="http://127.0.0.1:1087"   
export https_proxy="http://127.0.0.1:1087"
或者
export http_proxy="socks5://127.0.0.1:1086"   
export https_proxy="socks5://127.0.0.1:1086"
或者
export all_proxy="socks5://127.0.0.1:1086"
或者
export all_proxy="http://127.0.0.1:1087"
```

### 3. 取消代理

```shell
unset http_proxy // 取消http代理
unset https_proxy // 取消https代理
或者直接全部取消
unset ALL_PROXY
```

### 4. 验证代理是否成功（查看公网ip和所在地址）

终端输入

```shell
curl ip.gs
```

你会看到

```
~ curl ip.gs
Current IP / 当前 IP: 101.69.200.10
ISP / 运营商:  ChinaUnicom
City / 城市: Jiaxing Zhejiang
Country / 国家: China
IP.GS is now IP.SB, please visit https://ip.sb/ for more information. / IP.GS 已更改为 IP.SB ，请访问 https://ip.sb/ 获取更详细 IP 信息！
Please join Telegram group https://t.me/sbfans if you have any issues. / 如有问题，请加入 Telegram 群 https://t.me/sbfans

  /\_/\
=( °w° )=
  )   (  //
 (__ __)//

~ 
```

当然了你要是只想看ip就输入

```shell
curl ip.sb
```

就直接显示你在公网上的ip

> 注：ifconfig是查看本机在局域网内的ip，不是公网ip

你要是装了istat menus直接点击顶栏的网络部分就可以查看局域网ip和公网ip

## 使用alias自定义命令

像这样（我用的zsh所以是在.zshrc文件中写入）

```shell
alias setproxy="export ALL_PROXY=socks5://127.0.0.1:1086"
alias setproxyhttp="export ALL_PROXY=http://127.0.0.1:1087"
alias unsetproxy="unset ALL_PROXY"
```

这样你只需要输入setproxy或者setproxyhttp就行了，取消的话就unsetproxy就好了

你也可以单独给git设置代理

```shell
alias agent="git config --global http.proxy socks5://127.0.0.1:1086;git config --global https.proxy socks5://127.0.0.1:1086;git config --global http.sslVerify false"
alias unagent="git config --global --unset http.proxy;git config --global --unset https.proxy"
或者
alias agent="git config --global http.proxy http://127.0.0.1:1087;git config --global https.proxy http://127.0.0.1:1087;git config --global http.sslVerify false"
alias unagent="git config --global --unset http.proxy;git config --global --unset https.proxy"
```

使用和取消同上

作者：LanceAdd

原文链接：https://www.jianshu.com/p/205aff65954a

