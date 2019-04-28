---
title: LeetCode 025 Reverse Nodes in k-Group
tags:
  - leetcode
  - leetcode-hard
  - leetcode-linked-list
categories:
  - leetcode
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



```java

```

**时间复杂度:** O()。

**空间复杂度:** O()。

