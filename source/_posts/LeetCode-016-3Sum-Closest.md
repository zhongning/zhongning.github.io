---
title: LeetCode 016 3Sum Closest
tags:
  - leetcode
  - leetcode-medium
  - leetcode-array
  - leetcode-two-pointers
categories:
  - leetcode
abbrlink: 38928
date: 2019-04-17 00:21:20
---

## Description

Given an array nums of n integers and an integer target, find three integers in nums such that the sum is closest to target. Return the sum of the three integers. You may assume that each input would have exactly one solution.

**Example:**

```
Given array nums = [-1, 2, 1, -4], and target = 1.

The sum that is closest to the target is 2. (-1 + 2 + 1 = 2).
```

**Difficulty: Medium**

**Code:**

```java
class Solution {
    public int threeSumClosest(int[] nums, int target) {
        
    }
}
```

## 题意

给定n个整数和一个目标整数，找出三个整数，其和和目标整数最接近。

<!-- more -->

## Solution 1

和求三数之和为0类似，循环固定第一个数，第二个数从第一个数下一位往右取，第三个从末尾往左取。

定义一个变量记录三数之和与给定值差的绝对值，比较差值，若小则更新最小差值并记录和。

```java
class Solution {
    public int threeSumClosest(int[] nums, int target) {
        int closest = Integer.MAX_VALUE, res = Integer.MAX_VALUE;
        Arrays.sort(nums);
        for(int i=0;i<nums.length-2;i++){
            int j=i+1,k=nums.length-1;
            while(j<k){
                int sum = nums[i]+nums[j]+nums[k];
                if(closest>Math.abs(sum-target)){
                    closest = Math.abs(sum-target);
                    res = sum;
                }
                if(sum==target){
                    return target;
                }else if(sum>target){
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

**空间复杂度:** O(1)。
