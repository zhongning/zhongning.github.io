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



## Solution 1



```java

```

**时间复杂度:** O(max(m,n))，遍历到步长取决于两个链表的最大长度。

**空间复杂度:** O(max(m,n))，和的位数取决于最大数的位数。

## Solution 2



```java

```

**时间复杂度:** O(max(m,n))，遍历到步长取决于两个链表的最大长度。

**空间复杂度:** O(max(m,n))，和的位数取决于最大数的位数。

