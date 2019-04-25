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



```java

```

**时间复杂度:** O()。

**空间复杂度:** O()。

