---
title: LeetCode 064 Minimum Path Sum
tags:
  - leetcode
  - leetcode-medium
  - leetcode-array
  - leetcode-dynamic-programming
categories:
  - leetcode
abbrlink: 27000
date: 2019-12-18 22:26:04
---

## Description

Given a m x n grid filled with non-negative numbers, find a path from top left to bottom right which minimizes the sum of all numbers along its path.

**Note:** You can only move either down or right at any point in time.

**Example:**

```
Input:
[
  [1,3,1],
  [1,5,1],
  [4,2,1]
]
Output: 7
Explanation: Because the path 1→3→1→1→1 minimizes the sum.
```

**Difficulty: Medium**

**Code:**

```java
class Solution {
    public int minPathSum(int[][] grid) {
        
    }
}
```

## 题意

给定m x n的网格，填充的都是非负数，从左上角到右下角找出一条线路，使路径上数字之和最小，并返回这个最小和的值。

每次只能向下或者向右移动。

<!-- more -->

## Solution 1

使用动态规划dp[i][j]，表示在当前位置时所有路径数字之和最小的值，初始化起始位置dp[0][0]。

当i=0表示在第一行，那么dp[i][j] = dp[i][j-1]+grid[i][j]，即等于左侧位置最小和加上当前位置数字。

当j=0表示在第一列，dp[i][j] = dp[i-1][j]+grid[i][j]，即等于上方位置最小和加上当前位置数字。

其他情况下dp[i][j] = Math.min(dp[i-1][j],dp[i][j-1])+grid[i][j]，即上方或者左侧最小和取其中较小的，在加当前位置数字。

```java
class Solution {
    public int minPathSum(int[][] grid) {
        int m = grid.length;
        int n = grid[0].length;
        int[][] dp = new int[m][n];
        dp[0][0] = grid[0][0];
        for(int i=0;i<m;i++){
            for(int j=0;j<n;j++){
                if(i==0&&j==0) continue;
                if(i==0){
                    dp[i][j] = dp[i][j-1]+grid[i][j];
                }else if(j==0){
                    dp[i][j] = dp[i-1][j]+grid[i][j];
                }else{
                    dp[i][j] = Math.min(dp[i-1][j],dp[i][j-1])+grid[i][j];
                }
            }
        }
        return dp[m-1][n-1];
    }
}
```

**时间复杂度:** O(m*n)。

**空间复杂度:** O(m*n)。

## Solution 2

上述动态规划也可用一维数组实现，dp[j]表示在当前行第j列的最小路径和。

当j为0时表示第一列，dp[j]等于前一行第一列的路径和dp[j]加上当前位置的数字。

若i为0时表示第一行，则dp[j]等于左侧位置最小路径和加上当前位置的数字。

其他情况下，dp[j]等于左侧位置最小路径和上方位置最小路径中的较小值，再加上当前位置数字。

```java
class Solution {
    public int minPathSum(int[][] grid) {
        int m = grid.length;
        int n = grid[0].length;
        int[] dp = new int[n];
        dp[0]=0;
        for(int i=0;i<m;i++){
            for(int j=0;j<n;j++){
                if(j==0){
                    dp[j]+=grid[i][j];
                    continue;
                }
                if(i==0){
                    dp[j]=dp[j-1]+grid[i][j];
                }else{
                    dp[j]=Math.min(dp[j-1],dp[j])+grid[i][j];
                }
            }
        }
        return dp[n-1];
    }
}
```

**时间复杂度:** O(m*n)。

**空间复杂度:** O(n)。

