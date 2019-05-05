---
title: LeetCode 032 Longest Valid Parentheses
tags:
  - leetcode
  - leetcode-hard
  - leetcode-string
  - leetcode-dynamic-programming
categories:
  - leetcode
abbrlink: 65225
date: 2019-05-02 21:32:55
---

## Description

Given a string containing just the characters '(' and ')', find the length of the longest valid (well-formed) parentheses substring.

**Example 1:**

```
Input: "(()"
Output: 2
Explanation: The longest valid parentheses substring is "()"
```

**Example 2:**

```
Input: ")()())"
Output: 4
Explanation: The longest valid parentheses substring is "()()"
```

**Difficulty: Hard**

**Code:**

```java
class Solution {
    public int longestValidParentheses(String s) {
        
    }
}
```

## 题意

给定一个只包含`(`及`)`的字符串，求最长有效括号的子串的长度。

<!-- more -->

## Solution 1

遍历字符串，以当前字符为`(`，则开始检查以当前字符为起始位置到末尾，最大有效子串到长度。

检查最大有效子串长度到方法为借助栈，碰到左括号则压栈，碰到有括号则检查栈是否为空，若为空则返回，若不为空则弹出，更新匹配到到对数，并且再次判断栈是否为空。

此时栈为空表明，从起始位置到当前位置都是有效，并更新最大有效子串长度。

```java
class Solution {
    public int longestValidParentheses(String s) {
        if(s==null||s.length()<=1||s.indexOf("(")==-1||s.indexOf(")")==-1) return 0;
        int res=0;
        for(int i=0;i<s.length()-1;i++){
            if(s.charAt(i)=='('){
                int max = checkLongest(s,i);
                res = Math.max(res,max);
            }
        }
        return res;
    }
    
    public int checkLongest(String s, int start){
        Stack<Character> stack = new Stack<Character>();
        int matched=0, max = 0;
        for(int i=start;i<s.length();i++){
            char curr = s.charAt(i);
            if(curr=='('){
                stack.push('(');
                continue;
            }
            if(stack.isEmpty()){
                return max;
            }
            stack.pop();
            matched++;
            if(stack.isEmpty()){
                max=2*matched;
            }
        }
        return max;
    }
}
```

**时间复杂度:** O()。

**空间复杂度:** O()。

## Solution 2

在上诉解法1的基础上进行优化，只遍历一次数组。

定义res为最长子串长度，start为有效子串的起始位置。遍历字符串当前位置i，若遇到左括号，则将其下标压入栈中。若遇到右括号，如果栈为空，则说明从start到当前位置有效子串截止，start后移到当前位置后一位；若栈不为空，则弹出栈顶元素，再判断栈是否为空。

此时，若栈为空，则说明从start到当前位置都是有效，比较当前res和i-start+1并更新；若不为空，则说明前面有左括号并没有匹配，比较res和i-栈顶元素到值，即从最后一个没有匹配到左括号到当前位置到有效子串长度。

```java
class Solution {
    public int longestValidParentheses(String s) {
        if(s==null||s.length()<=1||s.indexOf("(")==-1||s.indexOf(")")==-1) return 0;
        int res=0, start=0;
        Stack<Integer> stack = new Stack<Integer>();
        for(int i=0;i<s.length();i++){
            char curr = s.charAt(i);
            if(curr=='('){
                stack.push(i);
                continue;
            }
            if(stack.isEmpty()){
                start=i+1;
                continue;
            }
            stack.pop();
            if(stack.isEmpty()){
                res=Math.max(res,i-start+1);
            }else{
                res=Math.max(res,i-stack.peek());
            }
        }
        return res;
    }
}
```

**时间复杂度:** O()。

**空间复杂度:** O()。

## Solution 3

使用动态规划，dp[i]表示从字符串开始位置到i下标到有效子串最大长度。若字符串当前位置为左括号，则跳过，因为并不能影响当前最长子串到长度值。

若当前字符串为右括号，则进行以下判断：

1. 若s[i]==')'且s[i-1]=='('，则dp[i]=dp[i-2]+2;
2. 若s[i]==')'且s[i-1]==')'，则判断s[i-dp[i-1]-1]=='('，则dp[i]=dp[i−1]+dp[i−dp[i−1]−2]+2

```java
class Solution {
    public int longestValidParentheses(String s) {
        if(s==null||s.length()<=1||s.indexOf("(")==-1||s.indexOf(")")==-1) return 0;
        int res=0;
        int[] dp = new int[s.length()];
        for(int i=1;i<s.length();i++){
            if(s.charAt(i)=='('){
                continue;
            }
            if(s.charAt(i-1)=='('){
                dp[i] = i>=2?dp[i-2]+2:2;
            }else if(i-dp[i-1]-1>=0 && s.charAt(i-dp[i-1]-1)=='('){
                dp[i] = dp[i-1] + ((i-dp[i-1]-2)>=0?dp[i-dp[i-1]-2]+2:2);
            }
            res = Math.max(res,dp[i]);
        }
        return res;
    }
}
```

**时间复杂度:** O()。

**空间复杂度:** O()。
