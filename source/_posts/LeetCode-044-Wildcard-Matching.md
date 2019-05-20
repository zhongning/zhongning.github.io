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

## Solution 3

使用动态规划，定义dp[m+1][n+1]，dp[i][j]表示s中的前i个字符组成的字符串和p中的前j个字符组成的字符串是否匹配。

初始化dp[0][0]为true，因为s和p都为空时应返回true。还有当s为空，p中都是星号时也返回true。

若p中第j个字符为星号，若星号匹配空串即dp[i][j-1]为true，则d[i][j]也为true；有dp[i-1][j]为true时星号也可再多匹配一个，则dp[i][j]也为true。

若p中第j个字符不为星号，则在直到dp[i-1][j-1]的情况下，看s[i-1]和p[j-1]是否匹配。

```java
class Solution {
    public boolean isMatch(String s, String p) {
        int m=s.length(), n=p.length();
        boolean[][] dp = new boolean[m+1][n+1];
        dp[0][0] = true;
        for(int i=1;i<=n;i++){
            if(p.charAt(i-1)=='*') dp[0][i]=dp[0][i-1];
        }
        for(int i=1;i<=m;i++){
            for(int j=1;j<=n;j++){
                if(p.charAt(j-1)=='*'){
                    dp[i][j]=dp[i][j-1]||dp[i-1][j];
                }else{
                    dp[i][j]=dp[i-1][j-1]&&(s.charAt(i-1)==p.charAt(j-1)||p.charAt(j-1)=='?');
                }
            }
        }
        return dp[m][n];
    }
}
```

**时间复杂度:** O()。

**空间复杂度:** O()。

## Solution 4

同解法1使用递归调用，但同时采用剪枝。递归方法返回但不是boolean而是int，有三种状态。0表示匹配到s到末尾，但是未匹配成功。1表示未匹配到s到末尾就失败了。2表示匹配成功。

若s和p都完成匹配则返回2。若s匹配完成，但p当前字符不是星号则返回0。若s未匹配完而p匹配完，返回1。

若s和p都匹配完成则对下一位字符递归调用。否则若p当前字符为星号，那么先跳过连续的星号，然后分别让星号匹配空串、1个字符、2个字符...

剪枝条件：当返回值为0或者2时，则返回，否则继续遍历。

```java
class Solution {
    public boolean isMatch(String s, String p) {
        return helper(s, p, 0, 0) > 1;
    }
    
    public int helper(String s, String p, int i, int j){
        if(i==s.length() && j==p.length()) return 2;
        if(i==s.length() && p.charAt(j)!='*') return 0;
        if(j==p.length()) return 1;
        if(i<s.length()&&(s.charAt(i)==p.charAt(j)||p.charAt(j)=='?')){
            return helper(s, p, i+1, j+1);
        }
        if(p.charAt(j)=='*'){
            if(j+1<p.length()&&p.charAt(j+1)=='*'){
                return helper(s,p,i,j+1);
            }
            for(int k=0;k<=s.length()-i;k++){
                int res=helper(s,p,i+k,j+1);
                if(res==0||res==2) return res;
            }
        }
        return 1;
    }
}
```

**时间复杂度:** O()。

**空间复杂度:** O()。
