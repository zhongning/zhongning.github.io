---
title: LeetCode 072 Edit Distance
tags:
  - leetcode
  - leetcode-hard
  - leetcode-dynamic-programming
categories:
  - leetcode
abbrlink: 44378
date: 2020-01-07 21:04:21
---

## Description

Given two words word1 and word2, find the minimum number of operations required to convert word1 to word2.

You have the following 3 operations permitted on a word:

1. Insert a character
2. Delete a character
3. Replace a character

**Example 1:**

```
Input: word1 = "horse", word2 = "ros"
Output: 3
Explanation: 
horse -> rorse (replace 'h' with 'r')
rorse -> rose (remove 'r')
rose -> ros (remove 'e')
```

**Example 2:**

```
Input: word1 = "intention", word2 = "execution"
Output: 5
Explanation: 
intention -> inention (remove 't')
inention -> enention (replace 'i' with 'e')
enention -> exention (replace 'n' with 'x')
exention -> exection (replace 'n' with 'c')
exection -> execution (insert 'u')
```

**Difficulty: Hard**

**Code:**

```java
class Solution {
    public int minDistance(String word1, String word2) {
        
    }
}
```

## 题意

这道题让求从一个字符串转变到另一个字符串需要的变换步骤，共有三种变换方式，插入一个字符，删除一个字符，和替换一个字符。

<!-- more -->

## Solution 1

根据以往的经验，对于字符串相关的题目且求极值的问题，十有八九都是用动态规划 Dynamic Programming 来解，这道题也不例外。

使用动态规划dp[i,j]表示把word1的前i个字符转变成word2的前j个字符所需要的最少步骤。

当word1[i]==word2[j]，dp[i+1][j+1]=dp[i][j];

当word1[i]!=word2[j]，可以进行插入、删除、替换操作，dp[i+1][j+1]=1+min{dp[i+1][j], dp[i][j+1], dp[i][j]}

1. dp[i+1][j]表示在word1位置i后新插入word2位置j上的字符，则word1的前i+1个字符必然要转成word2的前j个字符
2. dp[i][j+1]表示将word1位置i上的字符删除，则word1的前i个字符必然要转成word2的前j+1个字符
3. dp[i-1][j-1]表示将word1位置i替换为word2位置j上的字符，则word1的前i个字符必然要转成word2的前j个字符

初始值dp[0,k]=dp[k,0]=k

```java
class Solution {
    public int minDistance(String word1, String word2) {
        int m = word1.length(), n = word2.length();
        int[][] dp = new int[m+1][n+1];
        for(int i=0;i<=m;i++){
            dp[i][0]=i;
        }
        for(int j=0;j<=n;j++){
            dp[0][j]=j;
        }
        for(int i=0;i<m;i++){
            for(int j=0;j<n;j++){
                if(word1.charAt(i)==word2.charAt(j)){
                    dp[i+1][j+1]=dp[i][j];
                    continue;
                }
                int insert = dp[i+1][j];
                int delete = dp[i][j+1];
                int replace = dp[i][j];
                int min = Math.min(Math.min(insert,delete),replace);
                dp[i+1][j+1]=1+min;
            }
        }
        return dp[m][n];
    }
}
```

**时间复杂度:** O(nm)。

**空间复杂度:** O(nm)。
