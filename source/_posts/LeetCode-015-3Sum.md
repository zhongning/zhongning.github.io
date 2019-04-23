---
title: LeetCode 015 3Sum
tags:
  - leetcode
  - leetcode-medium
  - leetcode-array
  - leetcode-two-pointers
categories:
  - leetcode
abbrlink: 42879
date: 2019-04-17 00:19:08
---

## Description

Given an array nums of n integers, are there elements a, b, c in nums such that a + b + c = 0? Find all unique triplets in the array which gives the sum of zero.

**Note:**

The solution set must not contain duplicate triplets.

**Example:**

```
Given array nums = [-1, 0, 1, 2, -1, -4],

A solution set is:
[
  [-1, 0, 1],
  [-1, -1, 2]
]
```

**Difficulty: Medium**

**Code:**

```java
class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        
    }
}
```

<!-- more -->

## 题意

给定n个整数，求所有三个数字组合使得它们之和为0，数字组合不能重复。

## Solution 1

可以将数字排序，顺序取三个满足条件的数字。循环固定第一个数字，肯定不大于0，否则之和会大于0。第二个数字从第一个数的右边开始往右，第三个从末尾开始往左。

若之和为0，则添加进结果集。若小于0，则第二个数字太小，需要往右侧移动。若大于0，则表明第三个数字过大，需要往左侧移动。

```java
class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        List<List<Integer>> res = new ArrayList<>();
        Arrays.sort(nums);
        for(int i=0;i<nums.length-2&&nums[i]<=0;i++){
            if(i>0&&nums[i]==nums[i-1]){
                continue;
            }
            int j=i+1,k=nums.length-1;
            while(j<k){
                if(nums[i]+nums[j]+nums[k]==0){
                    List<Integer> match = new ArrayList<>();
                    match.add(nums[i]);
                    match.add(nums[j]);
                    match.add(nums[k]);
                    res.add(match);
                    while(j<k&&nums[j+1]==nums[j]){
                        j++;
                    }
                    while(j<k&&nums[k-1]==nums[k]){
                        k--;
                    }
                    j++;
                    k--;
                }else if(nums[i]+nums[j]+nums[k]>0){
                    k--;
                }else{
                    j++;   
                }
            }
        }
        return res;
    }
}
```

**时间复杂度:** O(n2)，每个数字最多遍历两遍。

**空间复杂度:** O(1)，需要保存结果集。

## Solution 2

可以使用Set来保存结果，这样可以去掉去重部分的代码。

```java
class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        Set<List<Integer>> res = new HashSet<>();
        Arrays.sort(nums);
        for(int i=0;i<nums.length-2&&nums[i]<=0;i++){
            int j=i+1,k=nums.length-1;
            while(j<k){
                if(nums[i]+nums[j]+nums[k]==0){
                    res.add(Arrays.asList(nums[i],nums[j],nums[k]));
                    j++;
                    k--;
                }else if(nums[i]+nums[j]+nums[k]>0){
                    k--;
                }else{
                    j++;   
                }
            }
        }
        return new ArrayList(res);
    }
}
```

**时间复杂度:** O(n2)，每个数字最多遍历两遍。

**空间复杂度:** O(1)，需要保存结果集。

