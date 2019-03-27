---
title: LeetCode 002 Add Two Numbers
tags:
  - leetcode
  - leetcode-medium
  - leetcode-linked-list
  - leetcode-math
categories:
  - leetcode
abbrlink: 4084
date: 2019-03-27 18:42:30
---

## Description

You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order and each of their nodes contain a single digit. Add the two numbers and return it as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.

**Example:**

```
Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)
Output: 7 -> 0 -> 8
Explanation: 342 + 465 = 807.
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
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        
    }
}
```

<!-- more -->

## 题意

给定两个非空链表分别代表两个非负整数。数位以倒序存储，并且每一个节点包含一位数字。将两个数字相加并以链表形式返回。假定两个数不包含任何前置0，除非这个数本身就是0。

这其实就是两个非负整数的加法运算，先从最后一位相加，有进位则保留在下一位中计算进去。

## Solution 1

就是建立一个新链表，然后把输入的两个链表从头往后撸，每两个相加，添加一个新节点到新链表后面。在新链表的头增加一个哨兵节点是非常重要的一个方法，这样就可以解放头结点的作用，方便进行处理。这样遍历时结果链表就可以从哨兵节点作为起始当前节点，返回结果时返回哨兵节点的下一个节点。

While循环条件是只要两个链表当前节点有一个不为空，当其中一个链表当前节点为空时，其值取0，后续节点取null。两个节点值相加，同时还要加上进位，以和对10求余作为新节点对值，添加到结果节点到下一位，并且更新进位。而后更新两个节点，若存在则指向其下一个节点。While退出后若进位不为0则新建节点添加到结果链表的末尾。

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
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        ListNode dummy = new ListNode(0);
        ListNode curr = dummy;
        int carry = 0;
        while(l1 != null || l2 != null){
            int v1 = l1!=null ? l1.val : 0;
            int v2 = l2!=null ? l2.val : 0;
            int sum = v1 + v2 + carry;
            curr.next = new ListNode(sum%10);
            carry = sum/10;
            l1 = l1!=null ? l1.next : null;
            l2 = l2!=null ? l2.next : null;
            curr = curr.next;
        }
        if(carry!=0){
            curr.next = new ListNode(carry);
        }
        return dummy.next;
    }
}
```

**时间复杂度:** O(max(m,n))，遍历到步长取决于两个链表的最大长度。

**空间复杂度:** O(max(m,n))，和的位数取决于最大数的位数。