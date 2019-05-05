---
title: LeetCode 034 Find First and Last Position of Element in Sorted Array
tags:
  - leetcode
  - leetcode-medium
  - leetcode-array
  - leetcode-binary-search
categories:
  - leetcode
abbrlink: 53326
date: 2019-05-05 22:19:58
---

## Description

Given an array of integers nums sorted in ascending order, find the starting and ending position of a given target value.

Your algorithm's runtime complexity must be in the order of O(log n).

If the target is not found in the array, return [-1, -1].

**Example 1:**

```
Input: nums = [5,7,7,8,8,10], target = 8
Output: [3,4]
```

**Example 2:**

```
Input: nums = [5,7,7,8,8,10], target = 6
Output: [-1,-1]
```

**Difficulty: Medium**

**Code:**

```java
class Solution {
    public int[] searchRange(int[] nums, int target) {
        
    }
}
```

## 题意

给定一个整数数组nums，按升序排列，元素可以重复，找出目标数target出现的起始和结束位置。时间复杂度要求O(log n)，若没找到，返回[-1, -1]。

<!-- more -->

## Solution 1

和二分查找一样，当找到mid的值等于target时，从mid分别往左和往右去找和target相等的数。

```java
class Solution {
    public int[] searchRange(int[] nums, int target) {
        if(nums==null||nums.length==0) return new int[]{-1,-1};
        int left=0, right=nums.length-1;
        while(left<=right){
            int mid=(left+right)/2;
            if(nums[mid]==target){
                int start=mid,end=mid;
                while(--start>=0&&nums[start]==target){};
                while(++end<=nums.length-1&&nums[end]==target){};
                return new int[]{start+1,end-1};
            }else if(nums[mid]<target){
                left=mid+1;
            }else{
                right=mid-1;
            }
        }
        return new int[]{-1,-1};
    }
}
```

**时间复杂度:** O()。

**空间复杂度:** O()。

## Solution 2

上述解法1有个问题是在mid处找到target后，起点和终点点查找并不是二分的。下述是改进版。

```java
class Solution {
    public int[] searchRange(int[] nums, int target) {
        if(nums==null||nums.length==0) return new int[]{-1,-1};
        int left=0, right=nums.length-1;
        while(nums[left]<nums[right]){
            int mid=(left+right)/2;
            if(nums[mid]==target){
                if(nums[left]==target){
                    right--;
                }else{
                    left++;
                }
            }else if(nums[mid]<target){
                left=mid+1;
            }else{
                right=mid-1;
            }
        }
        if(nums[left]==nums[right]&&nums[left]==target){
            return new int[]{left,right};
        }else{
            return new int[]{-1,-1};
        }
    }
}
```

**时间复杂度:** O()。

**空间复杂度:** O()。
