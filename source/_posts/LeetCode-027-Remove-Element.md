---
title: LeetCode 027 Remove Element
tags:
  - leetcode
  - leetcode-easy
  - leetcode-array
  - leetcode-two-pointers
categories:
  - leetcode
abbrlink: 39064
date: 2019-04-29 22:37:00
---

## Description

Given an array nums and a value val, remove all instances of that value in-place and return the new length.

Do not allocate extra space for another array, you must do this by modifying the input array in-place with O(1) extra memory.

The order of elements can be changed. It doesn't matter what you leave beyond the new length.

**Example 1:**

```
Given nums = [3,2,2,3], val = 3,

Your function should return length = 2, with the first two elements of nums being 2.

It doesn't matter what you leave beyond the returned length.
```

**Example 2:**

```
Given nums = [0,1,2,2,3,0,4,2], val = 2,

Your function should return length = 5, with the first five elements of nums containing 0, 1, 3, 0, and 4.

Note that the order of those five elements can be arbitrary.

It doesn't matter what values are set beyond the returned length.
```

**Clarification:**

Confused why the returned value is an integer but your answer is an array?

Note that the input array is passed in by reference, which means modification to the input array will be known to the caller as well.

Internally you can think of this:

```
// nums is passed in by reference. (i.e., without making a copy)
int len = removeElement(nums, val);

// any modification to nums in your function would be known by the caller.
// using the length returned by your function, it prints the first len elements.
for (int i = 0; i < len; i++) {
    print(nums[i]);
}
```

**Difficulty: Easy**

**Code:**

```java
class Solution {
    public int removeElement(int[] nums, int val) {
        
    }
}
```

## 题意

给定一个整数数组nums，将所有等于val的元素移除，并且返回新数组的长度。

不允许分配额外的空间同创建新数组，必须直接修改当前数组以达到空间复杂度为O(1)。

<!-- more -->

## Solution 1

使用双指针，left指向最终去掉目前元素数组掉最新位置，right指向当前遍历掉位置。

若right的值不等于目标值val，则nums在left的值更新为right的值，left及right加1。

```java
class Solution {
    public int removeElement(int[] nums, int val) {
        int left = 0, right = 0;
        while(right<nums.length){
            if(nums[right]!=val){
                nums[left++]=nums[right];
            }
            right++;
        }
        return left;
    }
}
```

**时间复杂度:** O(n)。

**空间复杂度:** O(1)。
