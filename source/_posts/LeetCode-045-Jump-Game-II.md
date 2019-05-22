---
title: LeetCode 045 Jump Game II
tags:
  - leetcode
  - leetcode-hard
  - leetcode-array
  - leetcode-greedy
categories:
  - leetcode
abbrlink: 28112
date: 2019-05-20 22:51:26
---

## Description

Given an array of non-negative integers, you are initially positioned at the first index of the array.

Each element in the array represents your maximum jump length at that position.

Your goal is to reach the last index in the minimum number of jumps.

**Example:**

```
Input: [2,3,1,1,4]
Output: 2
Explanation: The minimum number of jumps to reach the last index is 2.
    Jump 1 step from index 0 to 1, then 3 steps to the last index.
```

**Note:**

You can assume that you can always reach the last index.

**Difficulty: Hard**

**Code:**

```java
class Solution {
    public int jump(int[] nums) {
        
    }
}
```

## 题意

给定一个正数数组，初始化时指向数组的第一个元素，每个元素的值表示在这个位置上能向前跳的最大长度。

目标是跳动到最后一个元素，并且用到步数最少，并返回最少步数。假定一定能够到达最后一个元素。

<!-- more -->

## Solution 1

使用动态规划，令len表示nums第长度，有dp[len]，dp[i]表示从数组第i位跳到数组最后一位所需第最少步数。dp[len-1]=0，因为数组最后一位不需要跳。

从数组第倒数第二位开始往前遍历，取出当前位置i上的数字steps，初始化当前位置i用的最少步数min为int最大值。在位置i上最多有steps中跳法，但同时要保证不会跳出数组边界。

假定从位置i跳j步到位置i+j上，若dp[i+j]不能到达数组末尾即dp[i+j]为int最大值，则j加1。否则此时所用步数为1+dp[i+j]，更新min到值。

所有可能到步数遍历完后，确定位置i对应所需到步数dp[i]。最终结果返回dp[0]。

```java
class Solution {
    public int jump(int[] nums) {
        int len = nums.length;
        int[] dp = new int[len];
        dp[len-1]=0;
        for(int i=len-2;i>=0;i--){
            int steps=nums[i];
            int min=Integer.MAX_VALUE;
            for(int j=1;j<=steps&&i+j<=len-1;j++){
                if(dp[i+j]==Integer.MAX_VALUE) continue;
                int curr = 1 + dp[i+j];
                min = Math.min(min,curr);
            }
            dp[i]=min;
        }
        return dp[0];
    }
}
```

**时间复杂度:** O()。

**空间复杂度:** O()。

## Solution 2

贪婪算法，jumps代表跳到步数，curEnd表示当前能跳到点的范围是[curBegin, curEnd]，curFarthest表示在[curBegin, curEnd]下一次跳所能到达的最远的点。

遍历数组，i为数组当前所在点，则该点能最远到达的点为i+nums[i]，并据此更新curFarthest。

当i到达curEnd，表示[curBegin, curEnd]所能到达的点都已检查完毕，下次跳最远能跳到curFarthest。

那么将跳一次jumps++，同时此时能跳的最远位置curEnd更新为curFarthest，继续循环。

```java
class Solution {
    public int jump(int[] nums) {
        int jumps=0, curEnd=0, curFarthest=0;
        for(int i=0;i<nums.length-1;i++){
            curFarthest=Math.max(curFarthest,i+nums[i]);
            if(i==curEnd){
                jumps++;
                curEnd=curFarthest;
            }
        }
        return jumps;
    }
}
```

**时间复杂度:** O()。

**空间复杂度:** O()。

