---
title: Paxos共识算法详解
tags: paxos
categories: paxos
abbrlink: 35567
date: 2019-12-20 21:22:55
---

<meta name="referrer" content="no-referrer"/>

在一个分布式系统中，由于节点故障、网络延迟等各种原因，根据CAP理论，我们只能保证**一致性（Consistency）、可用性（Availability）、分区容错性（Partition Tolerance）** 中的两个。

对于一致性要求高的系统，比如银行取款机，就会选择牺牲可用性，故障时拒绝服务。MongoDB、Redis、MapReduce使用这种方案。

对于静态网站、实时性较弱的查询类数据库，会牺牲一致性，允许一段时间内不一致。简单分布式协议Gossip，数据库CouchDB、Cassandra使用这种方案。

![图1](https://user-gold-cdn.xitu.io/2019/4/12/16a0fa27901a1597?imageView2/0/w/1280/h/960/ignore-error/1)

> 图1

如图1所示，一致性问题，可以根据是否存在恶意节点分类两类。无恶意节点，是指节点会丢失、重发、不响应消息，但不会篡改消息。而恶意节点可能会篡改消息。有恶意节点的问题称为拜占庭将军问题，不在今天的讨论范围。Paxos很好地解决了无恶意节点的分布式一致性问题。

<!-- more -->

## 背景

1990年，Leslie Lamport在论文《The Part-Time Parliament》中提出Paxos算法。由于论文使用故事的方式，没有使用数学证明，起初并没有得到重视。直到1998年该论文才被正式接受。后来2001年Lamport又重新组织了论文，发表了[《Paxos Made Simple》](https://lamport.azurewebsites.net/pubs/paxos-simple.pdf)。作为分布式系统领域的早期贡献者，Lamport获得了2013年图灵奖。

Paxos算法广泛应用在分布式系统中，Google Chubby的作者Mike Burrows说：“这个世界上只有一种一致性算法，那就是 Paxos（There is only one consensus protocol, and that's Paxos）”。

后来的Raft算法、是对Paxos的简化和改进，变得更加容易理解和实现。

## Paxos类型

Paxos本来是虚构故事中的一个小岛，议会通过表决来达成共识。但是议员可能离开，信使可能走丢，或者重复传递消息。对应到分布式系统的节点故障和网络故障。

![图2](https://user-gold-cdn.xitu.io/2019/4/12/16a0fab685f8bbfb?imageView2/0/w/1280/h/960/ignore-error/1)

> 图2

如图2所示，假设议员要提议中午吃什么。如果有一个或者多个人同时提议，但一次只能通过一个提议，这就是Basic Paxos，是Paxos中最基础的协议。

显然Basic Paxos是不够高效的，如果将Basic Paxos并行起来，同时提出多个提议，比如中午吃什么、吃完去哪里嗨皮、谁请客等提议，议员也可以同时通过多个提议。这就是Multi-Paxos协议。

## Basic Paxos

### 角色

Paxos算法存在3种角色：Proposer、Acceptor、Learner，在实现中一个节点可以担任多个角色。

![](https://user-gold-cdn.xitu.io/2019/4/12/16a0fabcefe3ad7f?imageView2/0/w/1280/h/960/ignore-error/1)

> 图3

*   Proposer负责提出提案
*   Acceptor负责对提案进行投票
*   Learner获取投票结果，并帮忙传播

Learner不参与投票过程，为了简化描述，我们直接忽略掉这个角色。

### 算法

运行过程分为两个阶段，Prepare阶段和Accept阶段。

Proposer需要发出两次请求，Prepare请求和Accept请求。Acceptor根据其收集的信息，接受或者拒绝提案。

**Prepare阶段**

*   Proposer选择一个提案编号n，发送Prepare(n)请求给超过半数（或更多）的Acceptor。
*   Acceptor收到消息后，如果n比它之前见过的编号大，就回复这个消息，而且以后不会接受小于n的提案。另外，如果之前已经接受了小于n的提案，回复那个提案编号和内容给Proposer。

**Accept阶段**

*   当Proposer收到超过半数的回复时，就可以发送Accept(n, value)请求了。 n就是自己的提案编号，value是Acceptor回复的最大提案编号对应的value，如果Acceptor没有回复任何提案，value就是Proposer自己的提案内容。
*   Acceptor收到消息后，如果n大于等于之前见过的最大编号，就记录这个提案编号和内容，回复请求表示接受。
*   当Proposer收到超过半数的回复时，说明自己的提案已经被接受。否则回到第一步重新发起提案。

完整算法如图4所示：

![](https://user-gold-cdn.xitu.io/2019/4/12/16a0fac250ca2a82?imageView2/0/w/1280/h/960/ignore-error/1)

> 图4， 第4步判断条件应该是n >= minProposal

Acceptor需要持久化存储minProposal、acceptedProposal、acceptedValue这3个值。

### 三种情况

Basic Paxos共识过程一共有三种可能的情况。下面分别进行介绍。

#### 情况1：提案已接受

如图5所示。X、Y代表客户端，S1到S5是服务端，既代表Proposer又代表Acceptor。为了防止重复，Proposer提出的编号由两部分组成：

`序列号.Server ID`

例如S1提出的提案编号，就是1.1、2.1、3.1……

![](https://user-gold-cdn.xitu.io/2019/4/12/16a0fac9204f5244?imageView2/0/w/1280/h/960/ignore-error/1)

> 图5 以上图片来自[Paxos lecture (Raft user study)](https://ramcloud.stanford.edu/~ongaro/userstudy/paxos.pdf)第13页

这个过程表示，S1收到客户端的提案X，于是S1作为Proposer，给S1-S3发送Prepare(3.1)请求，由于Acceptor S1-S3没有接受过任何提案，所以接受该提案。然后Proposer S1-S3发送Accept(3.1, X)请求，提案X成功被接受。

在提案X被接受后，S5收到客户端的提案Y，S5给S3-S5发送Prepare(4.5)请求。对S3来说，4.5比3.1大，且已经接受了X，它会回复这个提案 (3.1, X)。S5收到S3-S5的回复后，使用X替换自己的Y，于是发送Accept(4.5, X)请求。S3-S5接受提案。最终所有Acceptor达成一致，都拥有相同的值X。

这种情况的结果是：**新Proposer会使用已接受的提案**

#### 情况2：提案未接受，新Proposer可见

![](https://user-gold-cdn.xitu.io/2019/4/12/16a0facfea7c6fb4?imageView2/0/w/1280/h/960/ignore-error/1)

> 图6 以上图片来自[Paxos lecture (Raft user study)](https://ramcloud.stanford.edu/~ongaro/userstudy/paxos.pdf)第14页

如图6所示，S3接受了提案(3.1, X)，但S1-S2还没有收到请求。此时S3-S5收到Prepare(4.5)，S3会回复已经接受的提案(3.1, X)，S5将提案值Y替换成X，发送Accept(4.5, X)给S3-S5，对S3来说，编号4.5大于3.1，所以会接受这个提案。

然后S1-S2接受Accept(3.1, X)，最终所有Acceptor达成一致。

这种情况的结果是：**新Proposer会使用已提交的值，两个提案都能成功**

#### 情况3：提案未接受，新Proposer不可见

![](https://user-gold-cdn.xitu.io/2019/4/12/16a0fad41ceaf3e5?imageView2/0/w/1280/h/960/ignore-error/1)

> 图7 以上图片来自[Paxos lecture (Raft user study)](https://ramcloud.stanford.edu/~ongaro/userstudy/paxos.pdf)第15页

如图7所示，S1接受了提案(3.1, X)，S3先收到Prepare(4.5)，后收到Accept(3.1, X)，由于3.1小于4.5，会直接拒绝这个提案。所以提案X无法收到超过半数的回复，这个提案就被阻止了。提案Y可以顺利通过。

这种情况的结果是：**新Proposer使用自己的提案，旧提案被阻止**

### 活锁 (livelock)

活锁发生的几率很小，但是会严重影响性能。就是两个或者多个Proposer在Prepare阶段发生互相抢占的情形。

![](https://user-gold-cdn.xitu.io/2019/4/12/16a0fad792b19024?imageView2/0/w/1280/h/960/ignore-error/1)

> 图8 以上图片来自[Paxos lecture (Raft user study)](https://ramcloud.stanford.edu/~ongaro/userstudy/paxos.pdf)第16页

解决方案是Proposer失败之后给一个随机的等待时间，这样就减少同时请求的可能。

## Multi-Paxos

上一小节提到的活锁，也可以使用Multi-Paxos来解决。它会从Proposer中选出一个Leader，只由Leader提交Proposal，还可以省去Prepare阶段，减少了性能损失。当然，直接把Basic Paxos的多个Proposer的机制搬过来也是可以的，只是性能不够高。

将Basic Paxos并行之后，就可以同时处理多个提案了，因此要能存储不同的提案，也要保证提案的顺序。

Acceptor的结构如图9所示，每个方块代表一个Entry，用于存储提案值。用递增的Index来区分Entry。

![](https://user-gold-cdn.xitu.io/2019/4/12/16a0fadb498e9c76?imageView2/0/w/1280/h/960/ignore-error/1)

> 图9

Multi-Paxos需要解决几个问题，我们逐个来看。

### 1. Leader选举

一个最简单的选举方法，就是Server ID最大的当Leader。

每个Server间隔T时间向其他Server发送心跳包，如果一个Server在2T时间内没有收到来自更高ID的心跳，那么它就成为Leader。

其他Proposer，必须拒绝客户端的请求，或将请求转发给Leader。

当然，还可以使用其他更复杂的选举方法，这里不再详述。

### 2. 省略Prepare阶段

Prepare的作用是阻止旧的提案，以及检查是否有已接受的提案值。

当只有一个Leader发送提案的时候，Prepare是不会产生冲突的，可以省略Prepare阶段，这样就可以减少一半RPC请求。

Prepare请求的逻辑修改为：

*   Acceptor记录一个全局的最大提案编号
*   回复最大提案编号，如果当前entry以及之后的所有entry都没有接受任何提案，回复noMoreAccepted

当Leader收到超过半数的noMoreAccepted回复，之后就不需要Prepare阶段了，只需要发送Accept请求。直到Accept被拒绝，就重新需要Prepare阶段。

### 3. 完整信息流

目前为止信息是不完整的。

*   Basic Paxos只需超过半数的节点达成一致。但是在Multi-Paxos中，这种方式可能会使一些节点无法得到完整的entry信息。我们希望每个节点都拥有全部的信息。
*   只有Proposer知道一个提案是否被接受了（根据收到的回复），而Acceptor无法得知此信息。

第1个问题的解决方案很简单，就是Proposer给全部节点发送Accept请求。

第2个问题稍微复杂一些。首先，我们可以增加一个Success RPC，让Proposer显式地告诉Acceptor，哪个提案已经被接受了，这个是完全可行的，只不过还可以优化一下，减少请求次数。

我们在Accept请求中，增加一个firstUnchosenIndex参数，表示Proposer的第一个未接受的Index，这个参数隐含的意思是，对该Proposer来说，小于Index的提案都已经被接受了。因此Acceptor可以利用这个信息，把小于Index的提案标记为已接受。另外要注意的是，只能标记该Proposer的提案，因为如果发生Leader切换，不同的Proposer拥有的信息可能不同，不区分Proposer直接标记的话可能会不一致。

![](https://user-gold-cdn.xitu.io/2019/4/12/16a0fadee976d006?imageView2/0/w/1280/h/960/ignore-error/1)

> 图10

如图10所示，Proposer正在准备提交Index=2的Accept请求，0和1是已接受的提案，因此firstUnchosenIndex=2。当Acceptor收到请求后，比较Index，就可以将Dumplings提案标记为已接受。

由于之前提到的Leader切换的情况，仍然需要显式请求才能获得完整信息。在Acceptor回复Accept消息时，带上自己的firstUnchosenIndex。如果比Proposer的小，那么就需要发送Success(index, value)，Acceptor将收到的index标记为已接受，再回复新的firstUnchosenIndex，如此往复直到两者的index相等。

## 总结

Paxos是分布式一致性问题中的重要共识算法。这篇文章分别介绍了最基础的Basic Paxos，和能够并行的Multi-Paxos。

在Basic Paxos中，介绍了3种基本角色Proposer、Acceptor、Learner，以及提案时可能发生的3种基本情况。在Multi-Paxos中，介绍了3个需要解决的问题：Leader选举、Prepare省略、完整信息流。

## 附Paxos算法推导过程

Paxos算法的设计过程就是从正确性开始的，对于分布式一致性问题，很多进程提出（Propose）不同的值，共识算法保证最终只有其中一个值被选定，Safety表述如下：

*   只有被提出（Propose）的值才可能被最终选定（Chosen）。
*   只有**一**个值会被选定（Chosen）。
*   进程只会获知到已经确认被选定（Chosen）的值。

Paxos以这几条约束作为出发点进行设计，只要算法最终满足这几点，正确性就不需要证明了。Paxos算法中共分为三种参与者：Proposer、Acceptor以及Learner，通常实现中每个进程都同时扮演这三个角色。

Proposers向Acceptors提出Proposal，为了保证最多只有**一**个值被选定（Chosen），Proposal必须被超过一半的Acceptors所接受（Accept），且每个Acceptor只能接受一个值。

为了保证正常运行（必须有值被接受），所以Paxos算法中：

**P1：Acceptor必须接受（Accept）它所收到的第一个Proposal。**

先来先服务，合情合理。但这样产生一个问题，如果多个Proposers同时提出Proposal，很可能会导致无法达成一致，因为没有Propopal被超过一半Acceptors的接受，因此，Acceptor必须能够接受多个Proposal，不同的Proposal由不同的编号进行区分，当某个Proposal被超过一半的Acceptors接受后，这个Proposal就被选定了。

既然允许Acceptors接受多个Proposal就有可能出现多个不同值都被最终选定的情况，这违背了Safety要求，为了保证Safety要求，Paxos进一步提出：

**P2：如果值为v的Proposal被选定（Chosen），则任何被选定（Chosen）的具有更高编号的Proposal值也一定为v。**

只要算法同时满足**P1**和**P2**，就保证了Safety。**P2**是一个比较宽泛的约定，完全没有算法细节，我们对其进一步延伸：

**P2a：如果值为v的Proposal被选定（Chosen），则对所有的Acceptors，它们接受（Accept）的任何具有更高编号的Proposal值也一定为v。**

如果满足**P2a**则一定满足**P2**，显然，因为只有首先被接受才有可能被最终选定。但是**P2a**依然难以实现，因为acceptor很有可能并不知道之前被选定的Proposal（恰好不在接受它的多数派中），因此进一步延伸：

**P2b：如果值为v的Proposal被选定（Chosen），则对所有的Proposer，它们提出的的任何具有更高编号的Proposal值也一定为v。**

更进一步的：

**P2c：为了提出值为v且编号为n的Proposal，必须存在一个包含超过一半Acceptors的集合S，满足(1) 没有任何S中的Acceptors曾经接受（Accept）过编号比n小的Proposal，或者(2) v和S中的Acceptors所接受过(Accept)的编号最大且小于n的Proposal值一致。**

满足**P2c**即满足**P2b**即满足**P2a**即满足**P2**。至此Paxos提出了Proposer的执行流程，以满足**P2c**：

1.  Proposer选择一个新的编号n，向超过一半的Acceptors发送请求消息，Acceptor回复: (a)承诺不会接受编号比n小的proposal，以及(b)它所接受过的编号比n小的最大Proposal（如果有）。该请求称为Prepare请求。
2.  如果Proposer收到超过一半Acceptors的回复，它就可以提出Proposal，Proposal的值为收到回复中编号最大的Proposal的值，如果没有这样的值，则可以自由提出任何值。
3.  向收到回复的Acceptors发送Accept请求，请求对方接受提出的Proposal。

仔细品味Proposer的执行流程，其完全吻合**P2c**中的要求，但你可能也发现了，当多个Proposer同时运行时，有可能出现没有任何Proposal可以成功被接受的情况（编号递增的交替完成第一步），这就是Paxos算法的Liveness问题，或者叫“活锁”，论文中建议通过对Proposers引入选主算法选出Distinguished Proposer来全权负责提出Proposal来解决这个问题，但是即使在出现多个Proposers同时提出Proposal的情况时，Paxos算法也可以保证Safety。

接下来看看Acceptors的执行过程，和我们对**P2**做的事情一样，我们对**P1**进行延伸：

**P1a：Acceptor可以接受（Accept）编号为n的Proposal当且仅当它没有回复过一个具有更大编号的Prepare消息。**

易见，**P1a**包含了**P1**，对于Acceptors：

1.  当收到Prepare请求时，如果其编号n大于之前所收到的Prepare消息，则回复。
2.  当收到Accept请求时，仅当它没有回复过一个具有更大编号的Prepare消息，接受该Proposal并回复。

以上涵盖了满足**P1a**和**P2b**的一套完整一致性算法。

## Reference

[分布式一致性与共识算法](https://draveness.me/consensus)

[Paxos 算法与 Raft 算法](https://yeasy.gitbooks.io/blockchain_guide/content/distribute_system/paxos.html)

[Paxos](https://en.wikipedia.org/wiki/Paxos_(computer_science)

[Paxos Made Simple](https://lamport.azurewebsites.net/pubs/paxos-simple.pdf)

[Paxos lecture (Raft user study)](https://ramcloud.stanford.edu/~ongaro/userstudy/paxos.pdf)

[YouTube | Paxos lecture (Raft user study)](https://www.youtube.com/watch?v=JEpsBg0AO6o)

https://zhuanlan.zhihu.com/p/31780743

https://segmentfault.com/a/1190000018844326
