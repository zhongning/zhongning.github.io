---
title: LeetCode 010 Regular Expression Matching
tags:
  - leetcode
  - leetcode-hard
  - leetcode-string
  - leetcode-dynamic-programming
  - leetcode-backtracking
categories:
  - leetcode
abbrlink: 47345
date: 2019-04-10 23:32:02
---

## Description

Given an input string (s) and a pattern (p), implement regular expression matching with support for '.' and '*'.

```
'.' Matches any single character.
'*' Matches zero or more of the preceding element.
```

The matching should cover the entire input string (not partial).

**Note:**

* s could be empty and contains only lowercase letters a-z.
* p could be empty and contains only lowercase letters a-z, and characters like . or *.

**Example 1:**

```
Input:
s = "aa"
p = "a"
Output: false
Explanation: "a" does not match the entire string "aa".
```

**Example 2:**

```
Input:
s = "aa"
p = "a*"
Output: true
Explanation: '*' means zero or more of the precedeng element, 'a'. Therefore, by repeating 'a' once, it becomes "aa".
```

**Example 3:**

```
Input:
s = "ab"
p = ".*"
Output: true
Explanation: ".*" means "zero or more (*) of any character (.)".
```

**Example 4:**

```
Input:
s = "aab"
p = "c*a*b"
Output: true
Explanation: c can be repeated 0 times, a can be repeated 1 time. Therefore it matches "aab".
```

**Example 5:**

```
Input:
s = "mississippi"
p = "mis*is*p*."
Output: false
```

**Difficulty: Hard**

**Code:**

```java
class Solution {
    public boolean isMatch(String s, String p) {
        
    }
}
```

<!-- more -->

## 题意

这道题关于正则表达式，'.'表示任意字符，'*'表示其之前的字符可以出现0次或者多次。要求返回字符串是否完全匹配正则表达式。

## Solution 1

使用递归来解，大致思路如下：

* 当p为空时，若s为空则返回true，否则返回false
* 当p的长度为1时，若s当长度也为1并且s[0]==p[0]或者p[0]=='.'则返回true，否则返回false
* 当p的第二个字符不为'*'时，若s为空则返回false，否则判断首字符是否匹配，并且从各自的第二个字符递归调用去匹配
* 当p的第二个字符为'*'时，进行下列循环，条件时s不为空并且首字符匹配，在循环中递归调用去匹配s和去掉前两个字符的p（假设此时p星号的作用是让前面的字符出现0次）
    若匹配则返回true，否则去掉s首字符继续循环（因为首字符已经匹配所以可以去掉s首字符往后面去匹配）
* 返回递归调用去匹配s和去掉前两个字符的p，因为要处理以下两种情况
    * 若s为空，则表明p的星号表示出现0次
    * 若s不为空，首字符不匹配，也表明p的星号表示出现0次

```java
class Solution {
    public boolean isMatch(String s, String p) {
        if(p.length()==0){
            return s.length()==0;
        }
        if(p.length()==1){
            return s.length()==1&&(s.charAt(0)==p.charAt(0)||p.charAt(0)=='.');
        }
        if(p.charAt(1)!='*'){
            if(s.length()==0){
                return false;
            }else if(s.length()==1){
                return (s.charAt(0)==p.charAt(0)||p.charAt(0)=='.')&&isMatch("",p.substring(1));
            }else{
                return (s.charAt(0)==p.charAt(0)||p.charAt(0)=='.')&&isMatch(s.substring(1),p.substring(1));
            }
        }
        while(s.length()!=0&&(s.charAt(0)==p.charAt(0)||p.charAt(0)=='.')){
            if(isMatch(s,p.substring(2))){
                return true;
            }
            s=s.substring(1);
        }
        return isMatch(s,p.substring(2));
    }
}
```

**时间复杂度:** O()。

**空间复杂度:** O()。

## Solution 2

上面的解法可以换一种写法，让代码更简洁

```java
class Solution {
    public boolean isMatch(String s, String p) {
        if (p.isEmpty()) return s.isEmpty();
        boolean first_match = (!s.isEmpty() &&
                               (p.charAt(0) == s.charAt(0) || p.charAt(0) == '.'));

        if (p.length() >= 2 && p.charAt(1) == '*'){
            return (isMatch(s, p.substring(2)) ||
                    (first_match && isMatch(s.substring(1), p)));
        } else {
            return first_match && isMatch(s.substring(1), p.substring(1));
        }
    }
}
```

**时间复杂度:** O()。

**空间复杂度:** O()。


## Solution 3

动态规划解法，dp[i][j]表示s[0:i)和p[0:j)是否匹配，从前往进行匹配。

条件判断：

```
1.  P[i][j] = P[i - 1][j - 1], if p[j - 1] != '*' && (s[i - 1] == p[j - 1] || p[j - 1] == '.');
2.  P[i][j] = P[i][j - 2], if p[j - 1] == '*' and the pattern repeats for 0 times;
3.  P[i][j] = P[i - 1][j] && (s[i - 1] == p[j - 2] || p[j - 2] == '.'), if p[j - 1] == '*' and the pattern repeats for at least 1 times.
```

```java
class Solution {
    public boolean isMatch(String s, String p) {
        if (s == null || p == null) {
            return false;
        }
        boolean[][] dp = new boolean[s.length()+1][p.length()+1];
        dp[0][0] = true;
        for (int i = 0 ; i <= s.length(); i++) {
            for (int j = 1; j <= p.length(); j++) {
                if(j>1 && p.charAt(j-1)=='*'){
                    dp[i][j]=dp[i][j-2]||(i>0&&(s.charAt(i-1)==p.charAt(j-2)||p.charAt(j-2)=='.')&&dp[i-1][j]);
                }else{
                    dp[i][j]=i>0&&(s.charAt(i-1)==p.charAt(j-1)||p.charAt(j-1)=='.')&&dp[i-1][j-1];
                }
            }
        }
        return dp[s.length()][p.length()];
    }
}
```

**时间复杂度:** O(SP)，S代表字符串长度，P代表正则表达式长度。

**空间复杂度:** O(SP)，S代表字符串长度，P代表正则表达式长度。

## Solution 4

使用动态规划，dp[i][j]表示s[i:]和p[j:]是否匹配，从后往前进行匹配。

```java
class Solution {
    public boolean isMatch(String s, String p) {
        boolean[][] dp = new boolean[s.length() + 1][p.length() + 1];
        dp[s.length()][p.length()] = true;

        for (int i = s.length(); i >= 0; i--){
            for (int j = p.length() - 1; j >= 0; j--){
                boolean first_match = (i < s.length() &&
                                       (p.charAt(j) == s.charAt(i) ||
                                        p.charAt(j) == '.'));
                if (j + 1 < p.length() && p.charAt(j+1) == '*'){
                    dp[i][j] = dp[i][j+2] || first_match && dp[i+1][j];
                } else {
                    dp[i][j] = first_match && dp[i+1][j+1];
                }
            }
        }
        return dp[0][0];
    }
}
```

**时间复杂度:** O(SP)，S代表字符串长度，P代表正则表达式长度。

**空间复杂度:** O(SP)，S代表字符串长度，P代表正则表达式长度。
