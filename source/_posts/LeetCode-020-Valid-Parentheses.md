---
title: LeetCode 020 Valid Parentheses
tags:
  - leetcode
  - leetcode-easy
  - leetcode-string
  - leetcode-stack
categories:
  - leetcode
abbrlink: 29601
date: 2019-04-24 21:20:06
---

## Description

Given a string containing just the characters '(', ')', '{', '}', '\[' and '\]', determine if the input string is valid.

An input string is valid if:

1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.

Note that an empty string is also considered valid.

**Example 1:**

```
Input: "()"
Output: true
```

**Example 2:**

```
Input: "()[]{}"
Output: true
```

**Example 3:**

```
Input: "(]"
Output: false
```

**Example 4:**

```
Input: "([)]"
Output: false
```

**Example 5:**

```
Input: "{[]}"
Output: true
```

**Difficulty: Easy**

**Code:**

```java
class Solution {
    public boolean isValid(String s) {
        
    }
}
```

<!-- more -->

## 题意

给定一个字符串，只包含"(){}[]"，判断输入到字符串是否有效。开括号和必须以同样到类型到闭括号关闭，开括号必须以正确到顺序关闭。

## Solution 1

看到开括号必要要以相同到顺序关闭，自然想到栈，读取到开括号则压栈，读取到闭括号则出栈并判断是否配对。读取完栈需为空，否则无效。

```java
class Solution {
    public boolean isValid(String s) {
        Stack<Character> stack = new Stack<Character>();
        String left = "([{";
        String right = ")]}";
        for(char curr:s.toCharArray()){
            if(left.indexOf(curr)!=-1){
                stack.push(curr);
            }else if(right.indexOf(curr)!=-1){
                if(stack.isEmpty()) return false;
                char open = stack.pop();
                if(right.charAt(left.indexOf(open))!=curr){
                    return false;
                }
            }
        }
        return stack.isEmpty();
    }
}
```

**时间复杂度:** O(N)，字符串长度。

**空间复杂度:** O(N)，字符串长度。

## Solution 2

把所有括号符号依次拼接成字符串，Stack里面存括号在字符串中位置，以简化计算。

```java
public class Solution {
    public boolean isValid(String s) {
        Stack<Integer> p = new Stack<>();
        String brackets = "(){}[]";
        for(char curr:s.toCharArray()) {
            int q = brackets.indexOf(curr);
            if(q % 2 == 1) {
                if(p.isEmpty() || p.pop() != q - 1) return false;
            } else p.push(q);
        }
        return p.isEmpty();
    }
}
```

**时间复杂度:** O(N)，字符串长度。

**空间复杂度:** O(N)，字符串长度。
