---
title: LeetCode 055 Jump Game
tags:
  - leetcode
  - leetcode-medium
  - leetcode-array
  - leetcode-greedy
categories:
  - leetcode
abbrlink: 19449
date: 2019-12-10 20:31:58
---

## Description

Given an array of non-negative integers, you are initially positioned at the first index of the array.

Each element in the array represents your maximum jump length at that position.

Determine if you are able to reach the last index.

**Example 1:**

```
Input: [2,3,1,1,4]
Output: true
Explanation: Jump 1 step from index 0 to 1, then 3 steps to the last index.
```

**Example 2:**

```
Input: [3,2,1,0,4]
Output: false
Explanation: You will always arrive at index 3 no matter what. Its maximum
             jump length is 0, which makes it impossible to reach the last index.
```

**Difficulty: Medium**

**Code:**

```java
class Solution {
    public boolean canJump(int[] nums) {
        
    }
}
```

## 题意

有一个非负数组，每个数字表示在当前位置最大能跳跃的跨度，初始位置在第一个位置，求是否能达到最后一个位置。

<!-- more -->

## Solution 1

使用动态规划，dp[i]表示是否能从位置i跳到最后的位置，从后往前遍历。

在位置i的时候，其值为n，则依次判断跳1至n的距离j后，下一个位置上dp[i+j]是否为true，若true直接返回表明能跳到最后。

```java
class Solution {
    public boolean canJump(int[] nums) {
        int n = nums.length;
        boolean[] dp = new boolean[n];
        dp[n-1] = true;
        for(int i=n-2;i>=0;i--){
            dp[i]=helper(nums,dp,i);
        }
        return dp[0];
    }
    
    public boolean helper(int[] nums, boolean[] dp, int start){
        for(int j=1;j<=nums[start];j++){
            if(dp[start+j]){
                return true;
            }
        }
        return false;
    }
}
```

**时间复杂度:** O(n2)。

**空间复杂度:** O(n)。

## Solution 2

依然使用动态规划，dp[i]表示到达位置i上剩余的跳力。

dp[i]的值取决于前一个位置dp[i-1]的剩余跳力与前一个位置上的本身的跳力，其等于二者最大值减1。

若某时刻dp[i]为负数，则说明无法抵达当前位置，那么也就无法到达末尾。

```java
class Solution {
    public boolean canJump(int[] nums) {
        int[] dp = new int[nums.length];
        for(int i=1;i<nums.length;i++){
            dp[i]=Math.max(dp[i-1],nums[i-1])-1;
            if(dp[i]<0) return false;
        }
        return true;
    }
}
```

**时间复杂度:** O(n)。

**空间复杂度:** O(n)。

## Solution 3

贪婪算法，对每个位置的剩余跳力并不关心，只关心目前能到达的最远位置。若能到达末尾，本质上所有的位置都必须可达。

令max=0表示能到达的最远位置，遍历数组中每个元素，若当前坐标大于max则退出。

否则更新max，其值为当前max和i+nums[i]中的最大值。

```java
class Solution {
    public boolean canJump(int[] nums) {
        int max = 0;
        for(int i=0;i<nums.length;i++){
            if(i>max) return false;
            max = Math.max(max, i+nums[i]);
        }
        return true;
    }
}
```

**时间复杂度:** O(n)。

**空间复杂度:** O(1)。