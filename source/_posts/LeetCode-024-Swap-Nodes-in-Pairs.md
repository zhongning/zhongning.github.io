---
title: LeetCode 024 Swap Nodes in Pairs
tags:
  - leetcode
  - leetcode-medium
  - leetcode-linked-list
categories:
  - leetcode
date: 2019-04-28 18:17:33
---

## Description

Given a linked list, swap every two adjacent nodes and return its head.

You may not modify the values in the list's nodes, only nodes itself may be changed.

**Example:**

```
Given 1->2->3->4, you should return the list as 2->1->4->3.
```

**Difficulty: Medium**

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
    public ListNode swapPairs(ListNode head) {
        
    }
}
```

## 题意

给定一个链表，按顺序将每两个节点交换，并返回链表头部。不能修改节点的值，只能改变整个节点。

<!-- more -->

## Solution 1

若链表为空或只有一个节点则返回头节点。循环遍历，条件是当前节点和当前节点的下一个节点都存在，在循环体中把这两个交换位置放入结果链表中。

当退出循环体后，只有一个节点没有遍历或者都遍历过，只需要在将其添加到结果链表中去。

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
    public ListNode swapPairs(ListNode head) {
        if(head==null||head.next==null) return head;
        ListNode dummy = new ListNode(0), curr = dummy;
        while(head!=null&&head.next!=null){
            ListNode tmp = head.next.next;
            curr.next=head.next;
            curr.next.next=head;
            curr=curr.next.next;
            head=tmp;
        }
        curr.next=head;
        return dummy.next;
    }
}
```

**时间复杂度:** O()。

**空间复杂度:** O()。

## Solution 2

递归调用，先把链表的前两个节点交换，再对除去这两个节点对链表进行递归调用，并将其赋给第二个节点的下一位，返回第一个节点。

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
    public ListNode swapPairs(ListNode head) {
        if(head==null||head.next==null) return head;
        ListNode res = head.next;
        head.next=swapPairs(head.next.next);
        res.next=head;
        return res;
    }
}
```

**时间复杂度:** O()。

**空间复杂度:** O()。

