---
title: LeetCode 070 Climbing Stairs
tags:
  - leetcode
  - leetcode-easy
  - leetcode-dynamic-programming
categories:
  - leetcode
abbrlink: 39180
date: 2019-12-25 19:11:25
---

## Description

You are climbing a stair case. It takes n steps to reach to the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

**Note:** Given n will be a positive integer.

**Example 1:**

```
Input: 2
Output: 2
Explanation: There are two ways to climb to the top.
1. 1 step + 1 step
2. 2 steps
```

**Example 2:**

```
Input: 3
Output: 3
Explanation: There are three ways to climb to the top.
1. 1 step + 1 step + 1 step
2. 1 step + 2 steps
3. 2 steps + 1 step
```

**Difficulty: Easy**

**Code:**

```java
class Solution {
    public int climbStairs(int n) {
        
    }
}
```

## 题意

有楼梯台阶为n级，每次可以爬1或者2步台阶，问有多少种不同的方式到达台阶顶端。

<!-- more -->

## Solution 1

使用动态规划，dp[i]表示到达第i级台阶第不重复路径之和。

考虑到每次只能走一步或者两步，那么到达第i级台阶之前要么是从i-1处走一步，要么是从i-2处走两步。

所以初始化dp[1]和dp[2]，则dp[i] = dp[i-1] + dp[i-2]，dp[n]即为最终结果。

```java
class Solution {
    public int climbStairs(int n) {
        if(n<3) return n;
        int[] dp = new int[n+1];
        dp[1]=1;
        dp[2]=2;
        for(int i=3;i<=n;i++){
            dp[i]=dp[i-1]+dp[i-2];
        }
        return dp[n];
    }
}
```

**时间复杂度:** O(n)。

**空间复杂度:** O(n)。

## Solution 2

从上述解题思路看，实际上很像斐波那契数列， 可以用两个变量a、b来存储过程值。

然后将原来b的值赋给a，再将a+b的值赋给b即可。

```java
class Solution {
    public int climbStairs(int n) {
        if(n==1) return 1;
        int a = 1, b = 1;
        while(--n>0){
            int tmp = a;
            a = b;
            b = tmp + b;
        }
        return b;
    }
}
```

**时间复杂度:** O(n)。

**空间复杂度:** O(1)。

## Solution 3

上述使用斐波那契额数列的解法可以进一步优化，核心思想不变，但返回a的值以满足n=1。

```java
class Solution {
    public int climbStairs(int n) {
        int a = 1, b = 1;
        while(n-->0){
            b += a;
            a = b - a;
        }
        return a;
    }
}
```

**时间复杂度:** O(n)。

**空间复杂度:** O(1)。

