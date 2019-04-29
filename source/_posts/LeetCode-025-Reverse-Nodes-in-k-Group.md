---
title: LeetCode 025 Reverse Nodes in k-Group
tags:
  - leetcode
  - leetcode-hard
  - leetcode-linked-list
categories:
  - leetcode
abbrlink: 34575
date: 2019-04-28 18:55:45
---

## Description

Given a linked list, reverse the nodes of a linked list k at a time and return its modified list.

k is a positive integer and is less than or equal to the length of the linked list. If the number of nodes is not a multiple of k then left-out nodes in the end should remain as it is.

**Example:**

Given this linked list: 1->2->3->4->5

For k = 2, you should return: 2->1->4->3->5

For k = 3, you should return: 3->2->1->4->5

**Note:**

* Only constant extra memory is allowed.
* You may not alter the values in the list's nodes, only nodes itself may be changed.

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
    public ListNode reverseKGroup(ListNode head, int k) {
        
    }
}
```

## 题意

给定一个链表，将其每k个节点反转，并返回修改后的链表。k是小于等于链表长度的正整数，不足k个时保持原样。不允许修改节点的值，只允许修改整个节点。

<!-- more -->

## Solution 1

把每k个节点为一组进行反转，那样需要两个函数，一个用来分段，一个用来反转。

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
    public ListNode reverseKGroup(ListNode head, int k) {
        if(head==null||head.next==null) return head;
        ListNode dummy = new ListNode(0), curr= head, start = curr , lastDone = dummy;
        int count = 0;
        while(curr!=null){
            count++;
            ListNode nextOne = curr.next;
            if(count==k){
                lastDone.next=reverse(start,k);
                lastDone=start;
                start=nextOne;
                count=0;
            }
            curr=nextOne;
        }
        lastDone.next=start;
        return dummy.next;
    }
    
    public ListNode reverse(ListNode node, int k){
        ListNode dummy = new ListNode(0), curr = node;
        for(int i=0;i<k;i++){
            ListNode tmp = dummy.next;
            dummy.next = curr;
            curr = curr.next;
            dummy.next.next=tmp;
        }
        return dummy.next;
    }
}
```

**时间复杂度:** O()。

**空间复杂度:** O()。

## Solution 2

上述解法，是以k为步进来生成最终的结果链表，保存了很多状态。也可以很平滑地进行反转，在反转是带上k个节点为一组的前置和后置节点。

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
    public ListNode reverseKGroup(ListNode head, int k) {
        if(head==null||head.next==null) return head;
        ListNode dummy = new ListNode(0), pre = dummy, curr = head;
        dummy.next = head;
        for(int i=1;curr!=null;i++){
            if(i%k==0){
                pre = reverse(pre,curr.next);
                curr = pre.next;
            }else{
                curr = curr.next;
            }
        }
        return dummy.next;
    }
    
    public ListNode reverse(ListNode pre, ListNode next){
        ListNode last = pre.next, curr = last.next;
        while(curr!=next){
            last.next = curr.next;
            curr.next = pre.next;
            pre.next = curr;
            curr = last.next;
        }
        return last;
    }
}
```

**时间复杂度:** O()。

**空间复杂度:** O()。

## Solution 3

上述过程也可以在一个方法中完成，先遍历整个链表计算出链表长度，然后每次对k个节点进行反转。

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
    public ListNode reverseKGroup(ListNode head, int k) {
        if(head==null||head.next==null) return head;
        ListNode dummy = new ListNode(0), pre = dummy, curr = head;
        dummy.next = head;
        int num = 0;
        while(curr!=null){
            num++;
            curr = curr.next;
        }
        while(num>k){
            curr = pre.next;
            for(int i=1;i<k;i++){
                ListNode tmp = curr.next;
                curr.next=tmp.next;
                tmp.next=pre.next;
                pre.next=tmp;
            }
            pre = curr;
            num -= k;
        }
        return dummy.next;
    }
}
```

**时间复杂度:** O()。

**空间复杂度:** O()。

## Solution 4

递归调用，我们用pre记录每段的开始位置的前一个节点，cur记录结束位置的下一个节点，然后我们调用reverse函数来将这段翻转，然后得到一个new_head，原来的head就变成了末尾，这时候后面接上递归调用下一段得到的新节点，返回new_head即可。

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
    public ListNode reverseKGroup(ListNode head, int k) {
        if(head==null||head.next==null) return head;
        ListNode dummy = new ListNode(0), pre = dummy, curr = head;
        dummy.next = head;
        for(int i=0;i<k;i++){
            if(curr==null) return head;
            curr = curr.next;
        }
        ListNode newHead = reverse(pre,curr);
        head.next = reverseKGroup(curr,k);
        return newHead;
    }
    
    public ListNode reverse(ListNode pre, ListNode next){
        ListNode last = pre.next, curr = last.next;
        while(curr!=next){
            last.next = curr.next;
            curr.next = pre.next;
            pre.next = curr;
            curr = last.next;
        }
        return pre.next;
    }
}
```

**时间复杂度:** O()。

**空间复杂度:** O()。
