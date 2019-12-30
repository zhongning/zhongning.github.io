---
title: Java进程CPU过高分析
tags: java
categories: java
abbrlink: 35377
date: 2019-12-30 22:38:36
---

<meta name="referrer" content="no-referrer" />

### 背景

记得前段时间，同事说他们测试环境的服务器cpu使用率一直处于100%，本地又没有什么接口调用，为什么会这样？cpu使用率居高不下，自然是有某些线程一直占用着cpu资源，那又如何查看占用cpu较高的线程？

<!--more-->

![](//upload-images.jianshu.io/upload_images/2184951-d0d2990160a6c935.png?imageMogr2/auto-orient/strip%7CimageView2/2)  

当然一个正常的程序员不会写出上述代码，这里只是为了让一个线程占用较高的cpu资源。

### top命令

在linux环境下，可以通过`top`命令查看各个进程的cpu使用情况，默认按cpu使用率排序

![](//upload-images.jianshu.io/upload_images/2184951-b61659815716a054.png?imageMogr2/auto-orient/strip%7CimageView2/2)  

1、上图中可以看出pid为23344的java进程占用了较多的cpu资源；  
2、通过`top -Hp 23344`可以查看该进程下各个线程的cpu使用情况；

![](//upload-images.jianshu.io/upload_images/2184951-831f6716e5801e63.png?imageMogr2/auto-orient/strip%7CimageView2/2)  

上图中可以看出pid为25077的线程占了较多的cpu资源，利用jstack命令可以继续查看该线程当前的堆栈状态。

### jstack命令

通过top命令定位到cpu占用率较高的线程之后，继续使用`jstack pid`命令查看当前java进程的堆栈状态

![](//upload-images.jianshu.io/upload_images/2184951-4abd1324fb6e8b7f.png?imageMogr2/auto-orient/strip%7CimageView2/2)  

jstack命令生成的thread dump信息包含了JVM中所有存活的线程，为了分析指定线程，必须找出对应线程的调用栈，**应该如何找？**

在top命令中，已经获取到了占用cpu资源较高的线程pid，将该pid转成16进制的值，例如`printf "%x\n" 21553`，在thread dump中每个线程都有一个nid，找到对应的nid即可；隔段时间再执行一次stack命令获取thread dump，区分两份dump是否有差别，在nid=0x246c的线程调用栈中，发现该线程一直在执行JstackCase类第33行的calculate方法，得到这个信息，就可以检查对应的代码是否有问题。

### 通过thread dump分析线程状态

除了上述的分析，大多数情况下会基于thead dump分析当前各个线程的运行情况，如是否存在死锁、是否存在一个线程长时间持有锁不放等等。

在dump中，线程一般存在如下几种状态：  
1、RUNNABLE，线程处于执行中  
2、BLOCKED，线程被阻塞  
3、WAITING，线程正在等待

###### 实例1：多线程竞争synchronized锁

![](//upload-images.jianshu.io/upload_images/2184951-311ab1b4ea7dde3e.png?imageMogr2/auto-orient/strip%7CimageView2/2)  

很明显：线程1获取到锁，处于RUNNABLE状态，线程2处于BLOCK状态  
1、`locked <0x000000076bf62208>`说明线程1对地址为0x000000076bf62208对象进行了加锁；  
2、`waiting to lock <0x000000076bf62208>` 说明线程2在等待地址为0x000000076bf62208对象上的锁；  
3、`waiting for monitor entry [0x000000001e21f000]`说明线程1是通过synchronized关键字进入了监视器的临界区，并处于"Entry Set"队列，等待monitor，具体实现可以参考[深入分析synchronized的JVM实现](http://www.jianshu.com/p/c5058b6fe8e5)；

###### 实例2：通过wait挂起线程

    static class Task implements Runnable {
        @Override
        public void run() {
            synchronized (lock) {
                try {
                    lock.wait();
                    //TimeUnit.SECONDS.sleep(100000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }
    }

###### dump结果

![](//upload-images.jianshu.io/upload_images/2184951-18d46d5260925392.png?imageMogr2/auto-orient/strip%7CimageView2/2)  

线程1和2都处于WAITING状态  
1、线程1和2都是先`locked <0x000000076bf62500>`，再`waiting on <0x000000076bf62500>`，之所以先锁再等同一个对象，是因为wait方法需要先通过synchronized获得该地址对象的monitor；  
2、`waiting on <0x000000076bf62500>`说明线程执行了wait方法之后，释放了monitor，进入到"Wait Set"队列，等待其它线程执行地址为0x000000076bf62500对象的notify方法，并唤醒自己，具体实现可以参考[深入分析Object.wait/notify实现机制](http://www.jianshu.com/p/f4454164c017)；

转载：http://www.jianshu.com/p/6690f7e92f27