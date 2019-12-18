---
title: LeetCode 063 Unique Paths II
tags:
  - leetcode
  - leetcode-medium
  - leetcode-array
  - leetcode-dynamic-programming
categories:
  - leetcode
abbrlink: 61593
date: 2019-12-18 20:54:30
---

## Description

A robot is located at the top-left corner of a m x n grid (marked 'Start' in the diagram below).

The robot can only move either down or right at any point in time. The robot is trying to reach the bottom-right corner of the grid (marked 'Finish' in the diagram below).

Now consider if some obstacles are added to the grids. How many unique paths would there be?

![](https://assets.leetcode.com/uploads/2018/10/22/robot_maze.png)

An obstacle and empty space is marked as 1 and 0 respectively in the grid.

**Note:** m and n will be at most 100.

**Example 1:**

```
Input:
[
  [0,0,0],
  [0,1,0],
  [0,0,0]
]
Output: 2
Explanation:
There is one obstacle in the middle of the 3x3 grid above.
There are two ways to reach the bottom-right corner:
1. Right -> Right -> Down -> Down
2. Down -> Down -> Right -> Right
```

**Difficulty: Medium**

**Code:**

```java
class Solution {
    public int uniquePathsWithObstacles(int[][] obstacleGrid) {
        
    }
}
```

## 题意

求机器人在长为m宽为n到格子中，从左上角走到右下角所有不重复路线的个数，每次只能向下或者向右移动。

考虑到在格子中添加一些障碍物，障碍物用1表示，空格子用0表示。

<!-- more -->

## Solution 1

使用动态规划，dp[i][j]代表到达位置行i列j的路线个数，一般来说等于当前位置的正上方和正左侧的所有线路之和。

遍历行m列n，若当前位置有障碍物，则dp[i][j]=0；对起始位置来说没有障碍物的话就是1。

当i或者j为0时，只能一直在第一行或者第一列移动，那么其取决于左侧或上方的值。

其他情况下dp[i][j]=dp[i-1][j]+dp[i][j-1];    

```java
class Solution {
    public int uniquePathsWithObstacles(int[][] obstacleGrid) {
        int m = obstacleGrid.length;
        int n = obstacleGrid[0].length;
        int[][] dp = new int[m][n];
        for(int i=0;i<m;i++){
            for(int j=0;j<n;j++){
                if(obstacleGrid[i][j]==1){
                    dp[i][j]=0;
                    continue;
                }
                if(i==0&&j==0){
                    dp[i][j]=1;
                    continue;
                }
                if(i==0){
                    dp[i][j]=dp[i][j-1];
                }else if(j==0){
                    dp[i][j]=dp[i-1][j];
                }else{
                    dp[i][j] = dp[i-1][j]+dp[i][j-1];
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

上述动态规划也可使用一维数组来保存，dp[j]表示当前行在列j的线路条数。

遍历数组，在同一行上，若当前位置有障碍则dp[j]为0；否则当j>0时，dp[j]+=dp[j-1]。

因为对下一行来说，其在位置j上的线路包含上一行位置j的线路个数，再加上本行左侧j-1线路个数。

```java
class Solution {
    public int uniquePathsWithObstacles(int[][] obstacleGrid) {
        int m = obstacleGrid.length;
        int n = obstacleGrid[0].length;
        int[] dp = new int[n];
        dp[0]=1;
        for(int i=0;i<m;i++){
            for(int j=0;j<n;j++){
                if(obstacleGrid[i][j]==1){
                    dp[j]=0;
                }else if(j>0){
                    dp[j]+=dp[j-1];
                }
            }
        }
        return dp[n-1];
    }
}
```

**时间复杂度:** O(m*n)。

**空间复杂度:** O(n)。

