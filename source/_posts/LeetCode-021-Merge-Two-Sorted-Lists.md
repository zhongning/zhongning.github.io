---
title: LeetCode 021 Merge Two Sorted Lists
tags:
  - leetcode
  - leetcode-easy
  - leetcode-linked-list
categories:
  - leetcode
abbrlink: 13700
date: 2019-04-25 20:55:51
---

## Description

Merge two sorted linked lists and return it as a new list. The new list should be made by splicing together the nodes of the first two lists.

**Example:**

```
Input: 1->2->4, 1->3->4
Output: 1->1->2->3->4->4
```

**Difficulty: Easy**

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
    public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
        
    }
}
```

<!-- more -->

## 题意

合并两个有序到链表

## Solution 1

建立哨兵节点，当前节点指向哨兵节点。开始While循环，条件是l1和l2都不为空。在循环体中，比较l1和l2到值找出较小的节点，到将其放在结果链表当前位置之后，并将该节点及结果链接都往后移一位，继续循环。

由于遍历到最后，肯定有一个链表先遍历到末尾退出循环，则结果链表的后面接上未完成的链表，最终返回哨兵节点的后一位。

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
    public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
        ListNode dummy=new ListNode(0), curr=dummy;
        while(l1!=null&&l2!=null){
            if(l1.val<=l2.val){
                curr.next=l1;
                l1=l1.next;
            }else{
                curr.next=l2;
                l2=l2.next;
            }
            curr=curr.next;
        }
        curr.next=l1!=null?l1:l2;
        return dummy.next;
    }
}
```

**时间复杂度:** O(M+N)，两个链表的长度。

**空间复杂度:** O(M+N)，两个链表的长度。

## Solution 2

使用递归，比较两个链表当前节点的大小找出较小的节点，则对剩余对节点进行递归调用，将返回对结果赋给此节点对下一位，同时返回该节点作为结果。

相当于每次递归只找出一个合适的节点，递归结束的条件是有个链表为空，则直接返回另一个链表未完成的部分。

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
    public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
        if(l1==null) return l2;
        if(l2==null) return l1;
        if(l1.val<=l2.val){
            l1.next=mergeTwoLists(l1.next,l2);
            return l1;
        }else{
            l2.next=mergeTwoLists(l1,l2.next);
            return l2;
        }
    }
}
```

**时间复杂度:** O(M+N)，两个链表的长度。

**空间复杂度:** O(M+N)，两个链表的长度。

