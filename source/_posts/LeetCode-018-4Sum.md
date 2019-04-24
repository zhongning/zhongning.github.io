---
title: LeetCode 018 4Sum
tags:
  - leetcode
  - leetcode-medium
  - leetcode-array
  - leetcode-hash-table
  - leetcode-two-pointers
categories:
  - leetcode
abbrlink: 52863
date: 2019-04-24 20:28:26
---

## Description

Given an array nums of n integers and an integer target, are there elements a, b, c, and d in nums such that a + b + c + d = target? Find all unique quadruplets in the array which gives the sum of target.

**Note:**

The solution set must not contain duplicate quadruplets.

**Example:**

```
Given array nums = [1, 0, -1, 0, -2, 2], and target = 0.

A solution set is:
[
  [-1,  0, 0, 1],
  [-2, -1, 1, 2],
  [-2,  0, 0, 2]
]
```

**Difficulty: Medium**

**Code:**

```java
class Solution {
    public List<List<Integer>> fourSum(int[] nums, int target) {
        
    }
}
```

<!-- more -->

## 题意

给定n个整数和一个目标整数，从n个整数中找出所有不重复的4个数字组合，使得它们之和等于目标整数。

## Solution 1

和三数之和一样，把数组从小到大排序，循环固定前两个数字，后两个数组采用双指针，一个从前往后，一个从后往前。

若四数之和等于目标值则加入结果集，若大于，则右侧数字往左移，否则左侧数字往右移。通过Set过滤重复元素。

```java
class Solution {
    public List<List<Integer>> fourSum(int[] nums, int target) {
        Set<List<Integer>> result = new HashSet<List<Integer>>();
        Arrays.sort(nums);
        for(int i=0;i<nums.length-3;i++){
            for(int j=i+1;j<nums.length-2;j++){
                int left=j+1,right=nums.length-1;
                while(left<right){
                    int sum = nums[i]+nums[j]+nums[left]+nums[right];
                    if(sum==target){
                        result.add(Arrays.asList(nums[i],nums[j],nums[left],nums[right]));
                        left++;
                        right--;
                    }else if(sum>target){
                        right--;
                    }else{
                        left++;
                    }
                }
            }
        }
        return new ArrayList<List<Integer>>(result);
    }
}
```

**时间复杂度:** O()。

**空间复杂度:** O()。

## Solution 2

下面解法不使用Set去重，对于四个数的每一位取值上，若当前数字和前一位一样则跳过。

```java
class Solution {
    public List<List<Integer>> fourSum(int[] nums, int target) {
        List<List<Integer>> result = new ArrayList<List<Integer>>();
        Arrays.sort(nums);
        for(int i=0;i<nums.length-3;i++){
            if(i>0&&nums[i]==nums[i-1]) continue;
            for(int j=i+1;j<nums.length-2;j++){
                if(j>i+1&&nums[j]==nums[j-1]) continue;
                int left=j+1,right=nums.length-1;
                while(left<right){
                    int sum = nums[i]+nums[j]+nums[left]+nums[right];
                    if(sum==target){
                        result.add(Arrays.asList(nums[i],nums[j],nums[left],nums[right]));
                        while(left<right&&nums[left+1]==nums[left]) left++;
                        while(left<right&&nums[right-1]==nums[right]) right--;
                        left++;
                        right--;
                    }else if(sum>target){
                        right--;
                    }else{
                        left++;
                    }
                }
            }
        }
        return result;
    }
}
```

**时间复杂度:** O()。

**空间复杂度:** O()。

