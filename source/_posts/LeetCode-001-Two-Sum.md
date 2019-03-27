---
title: LeetCode 001 Two Sum
tags:
  - leetcode
  - leetcode-easy
  - leetcode-array
  - leetcode-hash-table
categories:
  - leetcode
abbrlink: 45823
date: 2019-03-27 18:17:30
---

## Description

Given an array of integers, return indices of the two numbers such that they add up to a specific target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

**Example:**

```
Given nums = [2, 7, 11, 15], target = 9,

Because nums[0] + nums[1] = 2 + 7 = 9,
return [0, 1].
```

**Difficulty: Easy**

**Code:**

```java
class Solution {
    public int[] twoSum(int[] nums, int target) {
        
    }
}
```

<!-- more -->

## 题意

给定一个整数数组，从中找出两个数的下标，使得它们的和等于一个特定的数字。假定每个输入肯定会有一个唯一解，同一个元素不可以使用两次。

## Solution 1

可以使用两层循环去遍历数组，外层从下标0开始，内层从外层下标+1开始。若外层和内层之和等于目标值则返回外层和内层的下标。

```java
class Solution {
    public int[] twoSum(int[] nums, int target) {
        for(int i=0;i<nums.length;i++){
            for(int j=i+1;j<nums.length;j++){
                if(nums[i]+nums[j]==target){
                    return new int[]{i,j};
                }
            }
        }
        return new int[]{};
    }
}
```

**时间复杂度:** O(n2)，两层循环的遍历。

**空间复杂度:** O(1)，没有使用额外的空间储存。

## Solution 2

遍历一遍数组，将数字放入以数字为Key以数组下标为Value的HashMap中，在放入前检查HashMap中是否已经存在另外一个数满足两数之和等于目标值。若存在则返回HashMap中数字的下标和当前数字的下标。

```java
class Solution {
    public int[] twoSum(int[] nums, int target) {
        HashMap<Integer,Integer> map = new HashMap<>();
        for(int i=0;i<nums.length;i++){
            if(map.containsKey(target-nums[i])){
                return new int[]{map.get(target-nums[i]),i};
            }
            map.put(nums[i],i);
        }
        return new int[]{};
    }
}
```

**时间复杂度:** O(n)，只对数组遍历来一次，HashMap的操作耗时是O(1)。

**空间复杂度:** O(n)，使用HashMap储存数组中的数字。
