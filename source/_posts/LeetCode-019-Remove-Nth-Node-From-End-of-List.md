---
title: LeetCode 019 Remove Nth Node From End of List
tags:
  - leetcode
  - leetcode-medium
  - leetcode-linked-list
  - leetcode-two-pointers
categories:
  - leetcode
abbrlink: 58507
date: 2019-04-24 20:54:47
---

## Description

Given a linked list, remove the n-th node from the end of list and return its head.

**Example:**

```
Given linked list: 1->2->3->4->5, and n = 2.

After removing the second node from the end, the linked list becomes 1->2->3->5.
```

**Note:**

Given n will always be valid.

**Follow up:**

Could you do this in one pass?

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
    public ListNode removeNthFromEnd(ListNode head, int n) {
        
    }
}
```

## 题意

给定一个链表，移除链表的倒数第N个节点，并返回链表的头节点。限定N总是有效的不会超出链表长度，最好遍历一次。

<!-- more -->

## Solution 1

在第一个节点的前面建立一个哨兵节点，使用双指针left和right，最初都指向哨兵节点。

然后先把right往后移N位，若right的next为空则表明N和链表的长度相同，要删除第一个节点。

否则开始同时移动left和right，保持right和left间距为N，直至right的next为空即移动到末尾。此时，left到下一个节点即为要删除到节点。

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
    public ListNode removeNthFromEnd(ListNode head, int n) {
        if(head.next==null) return null;
        ListNode dummy = new ListNode(0);
        dummy.next=head;
        ListNode left = dummy, right = dummy;
        for(int i=0;i<n;i++){
            right=right.next;
        }
        if(right.next==null) return dummy.next.next;
        while(right.next!=null){
            right=right.next;
            left=left.next;
        }
        left.next=left.next.next;
        return dummy.next;
    }
}
```

**时间复杂度:** O(N)，遍历一次。

**空间复杂度:** O(1)，使用恒定到额外空间。

