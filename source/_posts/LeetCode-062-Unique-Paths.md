---
title: LeetCode 062 Unique Paths
tags:
  - leetcode
  - leetcode-medium
  - leetcode-array
  - leetcode-dynamic-programming
categories:
  - leetcode
abbrlink: 38849
date: 2019-12-17 22:56:51
---

## Description

A robot is located at the top-left corner of a m x n grid (marked 'Start' in the diagram below).

The robot can only move either down or right at any point in time. The robot is trying to reach the bottom-right corner of the grid (marked 'Finish' in the diagram below).

How many possible unique paths are there?

![](https://assets.leetcode.com/uploads/2018/10/22/robot_maze.png)

Above is a 7 x 3 grid. How many possible unique paths are there?

**Note:** m and n will be at most 100.

**Example 1:**

```
Input: m = 3, n = 2
Output: 3
Explanation:
From the top-left corner, there are a total of 3 ways to reach the bottom-right corner:
1. Right -> Right -> Down
2. Right -> Down -> Right
3. Down -> Right -> Right
```

**Example 2:**

```
Input: m = 7, n = 3
Output: 28
```

**Difficulty: Medium**

**Code:**

```java
class Solution {
    public int uniquePaths(int m, int n) {
        
    }
}
```

## 题意

求机器人在长为m宽为n到格子中，从左上角走到右下角所有不重复路线的个数，每次只能向下或者向右移动。

<!-- more -->

## Solution 1

使用动态规划，dp[i][j]表示当前当前位置不同走法的个数。

当i或者j为0时表示在第一行或者第一列，因为每次只能向下或者向右移动，所有这种情况下线路只有一条。

否则dp[i][j]=dp[i-1][j]+dp[i][j-1]，即等于当前位置的正上方和正左侧的所有线路之和。

```java
class Solution {
    public int uniquePaths(int m, int n) {
        int[][] dp = new int[m][n];
        for(int i=0;i<m;i++){
            dp[i][0]=1;
        }
        for(int j=0;j<n;j++){
            dp[0][j]=1;
        }
        for(int i=1;i<m;i++){
            for(int j=1;j<n;j++){
                dp[i][j]=dp[i-1][j]+dp[i][j-1];
            }
        }
        return dp[m-1][n-1];
    }
}
```

**时间复杂度:** O(m*n)。

**空间复杂度:** O(m*n)。

## Solution 2

上述解法还有另外一种写法。

```java
class Solution {
    public int uniquePaths(int m, int n) {
        int[][] dp = new int[m][n];
        for(int i=0;i<m;i++){
            for(int j=0;j<n;j++){
                if(i==0||j==0){
                    dp[i][j]=1;
                }else{
                    dp[i][j]=dp[i-1][j]+dp[i][j-1];
                }
            }
        }
        return dp[m-1][n-1];
    }
}
```

**时间复杂度:** O(m*n)。

**空间复杂度:** O(m*n)。

## Solution 3

对7*3的格子来说，一共要向下走2步向右走6步，可以用任意的顺序，这是一个全排列。

其中的一条线路如：D R R R D R R R，所有线路的条数为(m-1+n-1)!/((m-1)!(n-1)!)

若m比n大，则结果为排列组合C(n-1)(m+n-2)，即m...(m+n-2)/1...(n-1)

```java
class Solution {
    public int uniquePaths(int m, int n) {
        long res = 1;
        for(int i=1;i<=Math.min(m-1,n-1);i++){
            res=res*(m+n-1-i)/i;
        }
        return (int)res;
    }
}
```

**时间复杂度:** O(m+n)。

**空间复杂度:** O(1)。
