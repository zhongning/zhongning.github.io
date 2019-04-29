---
title: LeetCode 026 Remove Duplicates from Sorted Array
tags:
  - leetcode
  - leetcode-easy
  - leetcode-array
  - leetcode-two-pointers
categories:
  - leetcode
abbrlink: 12484
date: 2019-04-29 21:53:16
---

## Description

Given a sorted array nums, remove the duplicates in-place such that each element appear only once and return the new length.

Do not allocate extra space for another array, you must do this by modifying the input array in-place with O(1) extra memory.

**Example 1:**

```
Given nums = [1,1,2],

Your function should return length = 2, with the first two elements of nums being 1 and 2 respectively.

It doesn't matter what you leave beyond the returned length.
```

**Example 2:**

```
Given nums = [0,0,1,1,1,2,2,3,3,4],

Your function should return length = 5, with the first five elements of nums being modified to 0, 1, 2, 3, and 4 respectively.

It doesn't matter what values are set beyond the returned length.
```

**Clarification:**

Confused why the returned value is an integer but your answer is an array?

Note that the input array is passed in by reference, which means modification to the input array will be known to the caller as well.

Internally you can think of this:

```
// nums is passed in by reference. (i.e., without making a copy)
int len = removeDuplicates(nums);

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
    public int removeDuplicates(int[] nums) {
        
    }
}
```

## 题意

给定一个有序的数字数组，移除重复的元素，并且返回新的长度。不允许分配额外的空间给另外一个数组，要直接修改输入数组达到O(1)的空间复杂度。

<!-- more -->

## Solution 1

使用双指针，left指向该数字出现的第一个位置，right初始指向left的下一位，len表示最终的长度。

遍历数组，若right位置上的数字和left相同，则right往后移动一位，直到发现不同的数字或者达到末尾。

当发现不同数字时，更新len，并将数组len-1上的值更新为最新发现的数字，同时left移动到right位置，right后移一位。

```java
class Solution {
    public int removeDuplicates(int[] nums) {
        if(nums.length<=1) return nums.length;
        int left = 0, right = 1;
        int len = 1;
        while(right<nums.length){
            while(nums[right]==nums[left]){
                right++;
                if(right>=nums.length){
                    return len;
                }
            } 
            len++;
            nums[len-1]=nums[right];
            left=right;
            right++;
        }
        return len;
    }
}
```

**时间复杂度:** O()。

**空间复杂度:** O()。

## Solution 2

对解法1进行优化，left指向最终去重后对当前位置，right指向当前遍历对位置。

当right位置上到元素和left不相等时，left后移一位，同时给left位置赋right的值，然后继续right后移一位。

```java
class Solution {
    public int removeDuplicates(int[] nums) {
        if(nums.length<=1) return nums.length;
        int left = 0, right = 0;
        while(++right < nums.length){
            if(nums[right]!=nums[left]){
                nums[++left]=nums[right];
            }
        }
        return left+1;
    }
}
```

**时间复杂度:** O()。

**空间复杂度:** O()。

## Solution 3

也可以如解法2，只使用左侧指针，右侧依靠for循环来取出当前位置的值。

```java
class Solution {
    public int removeDuplicates(int[] nums) {
        int n = 0;
        for(int num:nums){
            if(n==0 || num!=nums[n-1]){
                nums[n++]=num;
            }
        }
        return n;
    }
}
```

**时间复杂度:** O()。

**空间复杂度:** O()。
