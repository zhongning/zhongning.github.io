---
title: Linux进程和线程pid
tags: 
 - linux
 - java
categories: linux
abbrlink: 28138
date: 2019-12-30 22:05:28
---

<meta name="referrer" content="no-referrer" />

### Linux的进程和线程

Linux的进程和线程有很多异同点，可以Google下。但只要能清楚地理解一下几点，则足够理解Linux中各种ID的含义。

*   **进程是资源分配的基本单位，线程是调度的基本单位**
*   进程是资源的集合，这些资源包括内存地址空间，文件描述符等等，一个进程中的多个线程共享这些资源。
*   CPU对任务进行调度时，可调度的基本单位 (dispatchable entity)是线程。如果一个进程中没有其他线程，可以理解成这个进程中只有一个主线程，这个主进程独享进程中的所有资源。
*   进程的个体间是完全独立的，而线程间是彼此依存，并且共享资源。多进程环境中，任何一个进程的终止，不会影响到其他非子进程。而多线程环境中，父线程终止，全部子线程被迫终止(没有了资源)。

<!--more-->

上述第一点说明是最基础的，也是最重要的。

初步理解各种ID。基本上按照重要程度从高到低，在分割线下方的IDs不太重要。

*   **pid**: 进程ID。
*   **lwp**: 线程ID。在用户态的命令(比如ps)中常用的显示方式。
*   **tid**: 线程ID，等于lwp。tid在系统提供的接口函数中更常用，比如syscall(SYS\_gettid)和syscall(\_\_NR\_gettid)。
*   **tgid**: 线程组ID，也就是线程组leader的进程ID，等于pid。
*   ------分割线------
*   **pgid**: 进程组ID，也就是进程组leader的进程ID。
*   **pthread id**: pthread库提供的ID，生效范围不在系统级别，可以忽略。
*   **sid**: session ID for the session leader。
*   **tpgid**: tty process group ID for the process group leader。

 从上面的列表看出，各种ID最后都归结到pid和lwp(tid)上。所以理解各种ID，最终归结为理解pid和lwp(tid)的联系和区别。

引用原文

> The four threads will have the same PID but only when viewed from above. What you (as a user) call a PID is not what the kernel (looking from below) calls a PID.
> 
> In the kernel, each thread has it's own ID, called a PID (although it would possibly make more sense to call this a TID, or thread ID) and they also have a TGID (thread group ID) which is the PID of the thread that started the whole process.
> 
> Simplistically, when a new process is created, it appears as a thread where both the PID and TGID are the same (new) number.
> 
> When a thread starts another thread, that started thread gets its own PID (so the scheduler can schedule it independently) but it inherits the TGID from the original thread.
> 
> That way, the kernel can happily schedule threads independent of what process they belong to, while processes (thread group IDs) are reported to you.

关于线程继承关系图如下：

                   USER VIEW
     <-- PID 43 --> <----------------- PID 42 ----------------->
                         +---------+
                         | process |
                        _| pid=42  |_
                      _/ | tgid=42 | \_ (new thread) _
           _ (fork) _/   +---------+                  \
          /                                        +---------+
    +---------+                                    | process |
    | process |                                    | pid=44  |
    | pid=43  |                                    | tgid=42 |
    | tgid=43 |                                    +---------+
    +---------+
     <-- PID 43 --> <--------- PID 42 --------> <--- PID 44 --->
                         KERNEL VIEW

在这里你可以清晰的看到，创建一个新的进程会给一个新的PID和TGID，并且2个值相同，  
当创建一个新的线程的时候，会给你一个新的PID，并且TGID和之前开始的进程一致。

上图很好地描述了用户视角(user view)和内核视角(kernel view)看到线程的差别：

*   从用户视角出发，在pid 42中产生的tid 44线程，属于tgid(线程组leader的进程ID) 42。甚至用ps和top的默认参数，你都无法看到tid 44线程。
*   从内核视角出发，tid 42和tid 44是独立的调度单元，可以把他们视为"pid 42"和"pid 44"。

需要指出的是，有时候在Linux中进程和线程的区分也是不是十分严格的。即使线程和进程混用，pid和tid混用，根据上下文，还是可以清楚地区分对方想要表达的意思。上图中，从内核视角出发看到了pid 44，是从调度单元的角度出发，但是在top或ps命令中，你是绝对找不到一个pid为44的进程的，只能看到一个lwp(tid)为44的线程。

### Linux查看某个进程的线程

线程是现代操作系统上进行并行执行的一个流行的编程方面的抽象概念。当一个程序内有多个线程被叉分出用以执行多个流时，这些线程就会在它们之间共享特定的资源（如，内存地址空间、打开的文件），以使叉分开销最小化，并避免大量高成本的IPC（进程间通信）通道。这些功能让线程在并发执行时成为一个高效的机制。

在Linux中，程序中创建的线程（也称为轻量级进程，LWP）会具有和程序的PID相同的“线程组ID”。然后，各个线程会获得其自身的线程ID（TID）。对于Linux内核调度器而言，线程不过是恰好共享特定资源的标准的进程而已。经典的命令行工具，如ps或top，都可以用来显示线程级别的信息，只是默认情况下它们显示进程级别的信息。

这里提供了在Linux上显示某个进程的线程的几种方式。Linux通过进程查看线程的方法 1).htop按t(显示进程线程嵌套关系)和H(显示线程) ，然后F4过滤进程名。2).ps -eLf | grep java(快照，带线程命令，e是显示全部进程，L是显示线程，f全格式输出) 3).pstree -p <pid>(显示进程树，不加pid显示所有) 4).top -Hp <pid> (实时) 5).ps -T -p <pid>(快照) 推荐程度按数字从小到大。

**方法一：PS**

在ps命令中，“-T”选项可以开启线程查看。下面的命令列出了由进程号为<pid>的进程创建的所有线程。

ps -T -p <pid>

![](https://images2017.cnblogs.com/blog/417876/201712/417876-20171224154237818-2089734676.png)

“SID”栏表示线程ID，而“CMD”栏则显示了线程名称。

**方法二： Top**

top命令可以实时显示各个线程情况。要在top输出中开启线程查看，请调用top命令的“-H”选项，该选项会列出所有Linux线程。在top运行时，你也可以通过按“H”键将线程查看模式切换为开或关。

top -H

![](https://images2017.cnblogs.com/blog/417876/201712/417876-20171224154304740-1853439090.png)

要让top输出某个特定进程<pid>并检查该进程内运行的线程状况：

top -H -p <pid>

![](https://images2017.cnblogs.com/blog/417876/201712/417876-20171224154321475-969285560.png)

**方法三： Htop**

一个对用户更加友好的方式是，通过htop查看单个进程的线程，它是一个基于ncurses的交互进程查看器。该程序允许你在树状视图中监控单个独立线程。

要在htop中启用线程查看，请开启htop，然后按<F2>来进入htop的设置菜单。选择“设置”栏下面的“显示选项”，然后开启“树状视图”和“显示自定义线程名”选项。按<F10>退出设置。

![](https://images2017.cnblogs.com/blog/417876/201712/417876-20171224154341771-1447632241.png)

现在，你就会看到下面这样单个进程的线程视图。

![](https://images2017.cnblogs.com/blog/417876/201712/417876-20171224154352225-1958827666.png)

### 参考：

https://www.linuxidc.com/Linux/2019-03/157819.htm

https://www.cnblogs.com/EasonJim/p/8098217.html

