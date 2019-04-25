---
title: LeetCode 005 Longest Palindromic Substring
tags:
  - leetcode
  - leetcode-medium
  - leetcode-string
  - leetcode-dynamic-programming
categories:
  - leetcode
abbrlink: 26628
date: 2019-03-29 23:35:38
---

## Description

Given a string s, find the longest palindromic substring in s. You may assume that the maximum length of s is 1000.

**Example 1:**

```
Input: "babad"
Output: "bab"
Note: "aba" is also a valid answer.
```

**Example 2:**

```
Input: "cbbd"
Output: "bb"
```

**Difficulty: Medium**

**Code:**

```java
class Solution {
    public String longestPalindrome(String s) {
        
    }
}
```

## 题意

给定一个字符串，找出最长的回文子串，假定字符串最大长度是1000。

<!-- more -->

## Solution 1

暴力遍历，外层作为子串的左侧，内层作为子串右侧，检查子串的左侧和右侧是否相等，若不等，则忽略，否则左侧和右侧往中间不断收缩继续检查。

```java
class Solution {
    public String longestPalindrome(String s) {
        int max=-1;
        String res="";
        for(int i=0;i<s.length();i++){
            for(int j=i;j<s.length();j++){
                int left=i,right=j;
                boolean flag = true;
                while(left<=right){
                    if(s.charAt(left)!=s.charAt(right)){
                        flag=false;
                        break;
                    }
                    left++;
                    right--;
                }
                if(!flag){
                    continue;
                }
                if(j-i+1>max){
                    max=j-i+1;
                    res=j==s.length()-1?s.substring(i):s.substring(i,j+1); 
                }
            }
        }
        return res;
    }
}
```

**时间复杂度:** O(n3)，双层遍历，内部循环检查是否回文。

**空间复杂度:** O(1)，没有使用额外空间。

## Solution 2

遍历字符串，以当前字符为中心去检查最大回文(奇数长度)，另外以当前字符及当前字符下一位检查最大回文长度(偶数长度)。

```java
class Solution {
    int start=0,maxLen=0;
    
    public String longestPalindrome(String s) {
        if(s.length()<2){
            return s;
        }
        for(int i=0;i<s.length()-1;i++){
            searchPalindrome(s,i,i);
            searchPalindrome(s,i,i+1);
        }
        return s.substring(start,start+maxLen);
    }
    
    public void searchPalindrome(String s, int left, int right){
        while(left>=0&&right<s.length()&&s.charAt(left)==s.charAt(right)){
            left--;
            right++;
        }
        if(right-left-1>maxLen){
            maxLen=right-left-1;
            start=left+1;
        }
    }
}
```

**时间复杂度:** O(n2)，一层遍历，内部循环检查是否回文。

**空间复杂度:** O(1)，没有使用额外空间。

## Solution 3

使用动态规划，维护一个二维数组dp，其中dp[i][j]表示字符串区间[i,j]是否为回文串。

当j=i时，因为只有一个字符肯定是回文串，结果为true。

当j=i+1时，说明是相邻字符，只需要比较s[j]==s[i]。

当j>i+1时，则判断s[j]==s[i] && dp[i+1][j-1]。

```java
class Solution {
    public String longestPalindrome(String s) {
        if(s.length()<=1){
            return s;
        }
        boolean[][] dp = new boolean[s.length()][s.length()];
        int left=0, right=0, maxLen=0;
        for(int j=0;j<s.length();j++){
            dp[j][j]=true;
            for(int i=0;i<j;i++){
                dp[i][j]=s.charAt(i)==s.charAt(j)&&(j<=i+1||dp[i+1][j-1]);
                if(dp[i][j]&&j-i+1>maxLen){
                    left=i;
                    right=j;
                    maxLen=j-i+1;
                }
            }
        }
        return s.substring(left,right+1);
    }
}
```

**时间复杂度:** O(n2)，两层遍历。

**空间复杂度:** O(n2)，使用二维数组存储结果。

## Solution 4

使用马拉车算法Manacher's Algorithm，这个算法将时间复杂度提升到了O(n)。
