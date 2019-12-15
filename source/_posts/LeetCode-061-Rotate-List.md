---
title: LeetCode 061 Rotate List
tags:
  - leetcode
  - leetcode-medium
  - leetcode-linked-list
  - leetcode-two-pointers
categories:
  - leetcode
abbrlink: 50679
date: 2019-12-15 17:17:02
---

## Description

Given a linked list, rotate the list to the right by k places, where k is non-negative.

**Example 1:**

```
Input: 1->2->3->4->5->NULL, k = 2
Output: 4->5->1->2->3->NULL
Explanation:
rotate 1 steps to the right: 5->1->2->3->4->NULL
rotate 2 steps to the right: 4->5->1->2->3->NULL
```

**Example 2:**

```
Input: 0->1->2->NULL, k = 4
Output: 2->0->1->NULL
Explanation:
rotate 1 steps to the right: 2->0->1->NULL
rotate 2 steps to the right: 1->2->0->NULL
rotate 3 steps to the right: 0->1->2->NULL
rotate 4 steps to the right: 2->0->1->NULL
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
    public ListNode rotateRight(ListNode head, int k) {
        
    }
}
```

## 题意

对给定链表，将最后k个移动到最前面。

<!-- more -->

## Solution 1

利用快慢双指针，快指针先走k步，然后快慢指针一起后移直到快指针到达末尾，然后进行旋转。

对k比链表长对情况，先求出链表长度n，在用k对n求余作为新对k。

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
    public ListNode rotateRight(ListNode head, int k) {
        if(head==null) return head;  
        ListNode dummy = new ListNode(0), left=dummy, right=dummy;
        dummy.next=head;
        int n = 0;
        while(right.next!=null){
            n++;
            right=right.next;
        }
        k = k%n;
        right = dummy;
        for(int i=0;i<k;i++){
            right=right.next;
        }
        while(right.next!=null){
            left=left.next;
            right=right.next;
        }
        right.next=dummy.next;
        dummy.next=left.next;
        left.next=null;
        return dummy.next;
    }
}
```

**时间复杂度:** O(n)。

**空间复杂度:** O(1)。

## Solution 2

只使用一个指针，当遍历链表到末尾后记录其长度n，然后将链接头尾相连。

重新从尾部向着头部方向接着走n-k%n即可到达新链表到前置节点，然后从此节点后断开链表即可。

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
    public ListNode rotateRight(ListNode head, int k) {
        if(head==null) return head;  
        ListNode dummy = new ListNode(0), cur=dummy;
        dummy.next=head;
        int n = 0;
        while(cur.next!=null){
            n++;
            cur=cur.next;
        }
        k = k%n;
        cur.next=dummy.next;
        int m = n-k;
        for(int i=0;i<m;i++){
            cur = cur.next;
        }
        ListNode res = cur.next;
        cur.next = null;
        return res;
    }
}
```

**时间复杂度:** O(n)。

**空间复杂度:** O(1)。

