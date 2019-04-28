---
title: LeetCode 023 Merge k Sorted Lists
tags:
  - leetcode
  - leetcode-hard
  - leetcode-linked-list
  - leetcode-divide-and-conquer
  - leetcode-heap
categories:
  - leetcode
abbrlink: 44312
date: 2019-04-25 22:54:13
---

## Description

Merge k sorted linked lists and return it as one sorted list. Analyze and describe its complexity.


**Example:**

```
Input:
[
  1->4->5,
  1->3->4,
  2->6
]
Output: 1->1->2->3->4->4->5->6
```

**Difficulty: Hard**

**Code:**

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; }
 * }
 */
class Solution {
    public ListNode mergeKLists(ListNode[] lists) {
        
    }
}
```

## 题意

把K个有序链表合并成一个有序链表。

<!-- more -->

## Solution 1

和合并两个链表类似，建立哨兵节点，结果返回哨兵节点下一位。进循环，循环中每次遍历所有链表的首个节点，并比较各个节点，找出值最小的节点。

将结果链接的当前节点指向这个最小节点，并将链表数组中最小节点所在的链表移动到最小节点到下一节点。

若碰到某个链表当前节点为空则跳过，若所有链表当前节点都为空则退出循环。

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; }
 * }
 */
class Solution {
    public ListNode mergeKLists(ListNode[] lists) {
        ListNode dummy=new ListNode(0), curr=dummy;
        while(true){
            int num = lists.length;
            int minVal = Integer.MAX_VALUE;
            int minIndex = -1;
            ListNode minNode = null;
            for(int i=0;i<lists.length;i++){
                ListNode node = lists[i];
                if(node==null){
                    num--;
                    continue;
                }
                if(node.val<minVal){
                    minVal=node.val;
                    minIndex = i;
                    minNode=node;
                }
            }
            if(minNode!=null){
                curr.next=minNode;
                curr=curr.next;
                lists[minIndex]=minNode.next;
            }
            if(num==0){
                break;
            }
        }
        return dummy.next;
    }
}
```

**时间复杂度:** O()。

**空间复杂度:** O()。

## Solution 2

使用PriorityQueue来维持一个最小堆，把k个链表到首节点放入优先队列中，它们会自动根据值val排序好。

每次取出最小的节点加入到结果链表中，并把该最小节点的下一位放入队列中。依此类推，直到队列中没有元素。

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; }
 * }
 */
class Solution {
    public ListNode mergeKLists(ListNode[] lists) {
        if (lists==null||lists.length==0) return null;
        ListNode dummy=new ListNode(0), curr=dummy;
        PriorityQueue<ListNode> queue = new PriorityQueue<ListNode>(lists.length, new Comparator<ListNode>(){
            public int compare(ListNode o1, ListNode o2){
                if(o1.val<o2.val){
                    return -1;
                }else if(o1.val==o2.val){
                    return 0;
                }else{
                    return 1;
                }
            }
        });
        for(ListNode node:lists){
            if(node!=null){
                queue.add(node);
            }
        }
        while(!queue.isEmpty()){
            curr.next=queue.poll();
            curr=curr.next;
            if(curr.next!=null){
                queue.add(curr.next);
            }
        }
        return dummy.next;
    }
}
```

**时间复杂度:** O()。

**空间复杂度:** O()。

## Solution 3

不管几个链表，都可以两两合并，最终合并成一个链表。利用分治思想，将链表数组从中划分为两部分，分别顺序合并两部分每一个链表并赋给前半部分。

不停地对半划分并合并更新，直到应该合并的链表数量为1，即已经合并完成所有链表。

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; }
 * }
 */
class Solution {
    public ListNode mergeKLists(ListNode[] lists) {
        if (lists==null||lists.length==0) return null;
        int n = lists.length;
        while(n>1){
            int steps = (n+1)/2;
            for(int i=0;i<n/2;i++){
                lists[i]=mergeTwoLists(lists[i],lists[i+steps]);
            }
            n=steps;
        }
        return lists[0];
    }
    
    public ListNode mergeTwoLists(ListNode l1, ListNode l2){
        ListNode dummy=new ListNode(0), curr=dummy;
        while(l1!=null&&l2!=null){
            if(l1.val<l2.val){
                curr.next=l1;
                curr=curr.next;
                l1=l1.next;
            }else{
                curr.next=l2;
                curr=curr.next;
                l2=l2.next;
            }
        }
        if(l1==null) curr.next=l2;
        if(l2==null) curr.next=l1;
        return dummy.next;
    }
}
```

**时间复杂度:** O()。

**空间复杂度:** O()。

