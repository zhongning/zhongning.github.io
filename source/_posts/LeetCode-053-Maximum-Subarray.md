---
title: LeetCode 053 Maximum Subarray
tags:
  - leetcode
  - leetcode-easy
  - leetcode-array
  - leetcode-divide-and-conquer
  - leetcode-dynamic-programming
categories:
  - leetcode
abbrlink: 54807
date: 2019-11-19 21:10:37
---

## Description

Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.

**Example:**

```
Input: [-2,1,-3,4,-1,2,1,-5,4],
Output: 6
Explanation: [4,-1,2,1] has the largest sum = 6.
```

**Follow Up:**

```
If you have figured out the O(n) solution, try coding another solution using the divide and conquer approach, which is more subtle.
```

**Difficulty: Easy**

**Code:**

```java
class Solution {
    public int maxSubArray(int[] nums) {
        
    }
}
```

## 题意

给定一个数字数组，找出一个连续都子数组，其所有数之和最大，并返回这个和。

如果已经找到来复杂度为O(n)的解法，可以试试分治的思路。

<!-- more -->

## Solution 1

定义两个变量res、curr，res表示最大子数组的和，curr表示当前子数组的和并初始化为0。

遍历数组，若curr+num比num大，说明当前curr是正数，那么肯定是新子数组肯定是要继续在之前大基础上往后扩展。

一旦curr是负数或者0，那么之前的都可以抛弃因为不能使新子数组之和变大。

所以curr取curr+num和num中大的数，再用curr去更新保存起来的最大和res。

```java
class Solution {
    public int maxSubArray(int[] nums) {
        int res = Integer.MIN_VALUE;
        int curr = 0;
        for(int num:nums){
            curr = Math.max(curr+num,num);
            res = Math.max(res,curr);
        }
        return res;
    }
}
```

**时间复杂度:** O()。

**空间复杂度:** O()。

## Solution 2

上道解法的另一种写法，通俗易懂。

```java
class Solution {
    public int maxSubArray(int[] nums) {
        int res = Integer.MIN_VALUE;
        int curr = 0;
        for(int num:nums){
            curr+=num;
            if(curr>res) res=curr;
            if(curr<0) curr=0;
        }
        return res;
    }
}
```

**时间复杂度:** O()。

**空间复杂度:** O()。

