---
title: LeetCode 033 Search in Rotated Sorted Array
tags:
  - leetcode
  - leetcode-medium
  - leetcode-array
  - leetcode-binary-search
categories:
  - leetcode
abbrlink: 61834
date: 2019-05-05 20:46:28
---

## Description

Suppose an array sorted in ascending order is rotated at some pivot unknown to you beforehand.

(i.e., [0,1,2,4,5,6,7] might become [4,5,6,7,0,1,2]).

You are given a target value to search. If found in the array return its index, otherwise return -1.

You may assume no duplicate exists in the array.

Your algorithm's runtime complexity must be in the order of O(log n).

**Example 1:**

```
Input: nums = [4,5,6,7,0,1,2], target = 0
Output: 4
```

**Example 2:**

```
Input: nums = [4,5,6,7,0,1,2], target = 3
Output: -1
```

**Difficulty: Medium**

**Code:**

```java
class Solution {
    public int search(int[] nums, int target) {
        
    }
}
```

## 题意

有一个数组，其原本按升序排列，但后来在某个轴被旋转。给定一个目标数字，在数组中查找其下标，若不存在则返回-1。

数组中的元素不重复，算法时间复杂度必须是O(log n)。

<!-- more -->

## Solution 1

从时间复杂度看，必须要使用二分查找，问题的难点在于数组不是全部有序的。其先是升序，在某个点突然变小，后面接着升序。

对于数组[0,1,2,3,4,5,6,7]共有以下旋转后排列，若中间的数字小于最右边的数字，说明右半段是有序的，否则说明左半段是有序的。

利用有序半段的首尾两个数来判断目标数字应该落在哪半边。

```
0　　1　　2　　 4　　5　　6　　7

7　　0　　1　　 2　　4　　5　　6

6　　7　　0　　 1　　2　　4　　5

5　　6　　7　　 0　　1　　2　　4

4　　5　　6　　7　　0　　1　　2

2　　4　　5　　6　　7　　0　　1

1　　2　　4　　5　　6　　7　　0
```

```java
class Solution {
    public int search(int[] nums, int target) {
        if(nums==null||nums.length==0) return -1;
        if(target==nums[0]) return 0;
        if(nums.length==1) return -1;
        int left=0, right=nums.length-1;
        while(left<=right){
            int mid = (left+right)/2;
            if(nums[mid]==target){
                return mid;
            }
            if(nums[mid]<nums[right]){
                if(nums[mid]<target&&nums[right]>=target){
                    left=mid+1;
                }else{
                    right=mid-1;
                }
            }else{
                if(nums[left]<=target&&nums[mid]>target){
                    right=mid-1;
                }else{
                    left=mid+1;
                }
            }
        }
        return -1;
    }
}
```

**时间复杂度:** O()。

**空间复杂度:** O()。

## Solution 2

上述解法1的优化算法，若mid和target在num[0]的同一侧，则取nums[mid]，否则按需取最大最小值。

```java
class Solution {
    public int search(int[] nums, int target) {
        int left=0, right=nums.length-1;
        while(left<=right){
            int mid = (left+right)/2;
            int value = (nums[mid]<nums[0])==(target<nums[0]) ? nums[mid] : (target<nums[0]?Integer.MIN_VALUE:Integer.MAX_VALUE);
            if(value==target){
                return mid;
            }else if(value<target){
                left=mid+1;
            }else{
                right=mid-1;
            }
        }
        return -1;
    }
}
```

**时间复杂度:** O()。

**空间复杂度:** O()。
