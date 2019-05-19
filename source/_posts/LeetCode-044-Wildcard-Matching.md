---
title: LeetCode 044 Wildcard Matching
tags:
  - leetcode
  - leetcode-hard
  - leetcode-string
  - leetcode-dynamic-programming
  - leetcode-backtracking
  - leetcode-greedy
categories:
  - leetcode
abbrlink: 9565
date: 2019-05-18 20:49:00
---

## Description

Given an input string (s) and a pattern (p), implement wildcard pattern matching with support for '?' and '*'.

```
'?' Matches any single character.
'*' Matches any sequence of characters (including the empty sequence).
```

The matching should cover the entire input string (not partial).

**Note:**

* s could be empty and contains only lowercase letters a-z.
* p could be empty and contains only lowercase letters a-z, and characters like ? or *.

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
p = "*"
Output: true
Explanation: '*' matches any sequence.
```

**Example 3:**

```
Input:
s = "cb"
p = "?a"
Output: false
Explanation: '?' matches 'c', but the second letter is 'a', which does not match 'b'.
```

**Example 4:**

```
Input:
s = "adceb"
p = "*a*b"
Output: true
Explanation: The first '*' matches the empty sequence, while the second '*' matches the substring "dce".
```

**Example 5:**

```
Input:
s = "acdcb"
p = "a*c?b"
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

## 题意

给定一个字符串s和模式p，实现通配符匹配，支持？和*。？表示任意一个字符，*表示任何字符串。

匹配是完全匹配，s可能为空或者只包含a-z，p可能为空或者包含a-z和？或*。

<!-- more -->

## Solution 1

进行下列判断：
1. p和s相等或者p为"*"，则直接返回true
2. p是否为空，若p为空，则直接返回s是否为空
3. s是否为空，若s为空，则p必须必须全部是*
4. 若p[0]=='?'，则返回递归调用isMatch(s[1:],p[1:])
5. 若p[0]=='*'，则要么星号没匹配上s中任何字符，通过递归调用isMatch(s,p[1:])；否则递归说明星号匹配上了递归调用isMatch(s[1:],p)
6. 若p[0]不为'?'或'*'，比较p[0]==s[0]&&isMatch(s[1:],p[1:])

但是这段代码提交时发现超过时间限制。

```java
class Solution {
    public boolean isMatch(String s, String p) {
        if(p.equals(s)||p.equals("*")) return true;
        if(p.isEmpty()) return s.isEmpty();
        if(s.isEmpty()){
            if(p.charAt(0)=='*'){
                return isMatch(s,p.substring(1));
            }else{
                return false;
            }
        }
        if(p.charAt(0)=='?') return isMatch(s.substring(1),p.substring(1));
        if(p.charAt(0)=='*'){
            int n=1;
            while(n<p.length()&&p.charAt(n)=='*'){
                n++;
            }
            p=p.substring(n-1);
            if(isMatch(s,p.substring(1))) return true;
            return isMatch(s.substring(1),p);
        }
        return p.charAt(0)==s.charAt(0) && isMatch(s.substring(1),p.substring(1));
    }
}
```

**时间复杂度:** O()。

**空间复杂度:** O()。

## Solution 2

定义i、j为s和p当前遍历对位置，iStar、jStar为星号出现时在s和p中匹配的最新位置。

进行while循环，条件时i小于s的长度。进行下列判断：

1. 若s[i]==p[j]或者p[j]=='?'，则i和j分别加1
2. 若p[j]=='*'，则iStar=i，jStart=j，j++
3. 若当前星号出现即iStar>=0时，p[jStar]可以在s中多向前匹配一位，则i回退到iStart++，j回退到jStar+1
4. 若星号没出现则返回false

最后若s已经匹配完，但p还有剩余字符，则要判断p中剩余字符是否都是*

```java
class Solution {
    public boolean isMatch(String s, String p) {
        int i=0, j=0, iStar=-1, jStar=-1;
        while(i<s.length()){
            if(j<p.length()&&(s.charAt(i)==p.charAt(j)||p.charAt(j)=='?')){
                i++;
                j++;
            }else if(j<p.length()&&p.charAt(j)=='*'){
                iStar=i;
                jStar=j;
                j++;
            }else if(iStar>=0){
                i=++iStar;
                j=jStar+1;
            }else{
                return false;
            }
        }
        while(j<p.length()&&p.charAt(j)=='*') j++;
        return j==p.length();
    }
}
```

**时间复杂度:** O()。

**空间复杂度:** O()。

