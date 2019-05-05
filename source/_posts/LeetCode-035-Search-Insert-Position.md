---
title: LeetCode 035 Search Insert Position
tags:
  - leetcode
  - leetcode-easy
  - leetcode-array
  - leetcode-binary-search
categories:
  - leetcode
abbrlink: 10372
date: 2019-05-05 23:16:39
---

## Description

Given a sorted array and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.

You may assume no duplicates in the array.

**Example 1:**

```
Input: [1,3,5,6], 5
Output: 2
```

**Example 2:**

```
Input: [1,3,5,6], 2
Output: 1
```

**Example 3:**

```
Input: [1,3,5,6], 7
Output: 4
```

**Example 4:**

```
Input: [1,3,5,6], 0
Output: 0
```

**Difficulty: Easy**

**Code:**

```java
class Solution {
    public int searchInsert(int[] nums, int target) {
        
    }
}
```

## 题意

给定一个有序数组nums和一个目标值target，若数组中nums能找到target则返回下标，否则返回它应该放入的位置。数组中没有重复元素。

<!-- more -->

## Solution 1

先把target大于或者小于nums所有数的情况解决掉，剩下就是在nums中进行二分查找。

若能找到则返回下标，若不能，则退出循环时left的位置即为应插入的位置。

```java
class Solution {
    public int searchInsert(int[] nums, int target) {
        if(nums==null||nums.length==0) return 0;
        int len=nums.length;
        if(target<nums[0]) return 0;
        if(target>nums[len-1]) return len;
        int left=0,right=len-1;
        while(left<=right){
            int mid=(left+right)/2;
            if(nums[mid]==target){
                return mid;
            }else if(nums[mid]>target){
                right=mid-1;
            }else{
                left=mid+1;
            }
        }
        return left;
    }
}
```

**时间复杂度:** O()。

**空间复杂度:** O()。
