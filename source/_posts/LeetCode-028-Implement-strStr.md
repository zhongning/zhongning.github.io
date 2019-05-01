---
title: LeetCode 028 Implement strStr()
tags:
  - leetcode
  - leetcode-easy
  - leetcode-string
  - leetcode-two-pointers
categories:
  - leetcode
abbrlink: 18258
date: 2019-04-29 22:49:27
---

## Description

Implement strStr().

Return the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack.

**Example 1:**

```
Input: haystack = "hello", needle = "ll"
Output: 2
```

**Example 2:**

```
Input: haystack = "aaaaa", needle = "bba"
Output: -1
```

**Clarification:**

What should we return when needle is an empty string? This is a great question to ask during an interview.

For the purpose of this problem, we will return 0 when needle is an empty string. This is consistent to C's strstr() and Java's indexOf().

**Difficulty: Easy**

**Code:**

```java
class Solution {
    public int strStr(String haystack, String needle) {
        
    }
}
```

## 题意

实现String.indexOf()的功能，返回needle在haystack第一次出现的下标，若不存在则返回-1。若needle是空字符串，则返回0。

<!-- more -->

## Solution 1

遍历haystack直到其当前字符等于needle的首字符，然后基于needle比较后续字符是否相等。

若有不想等或者到达haystack末尾，则说明不匹配，haystack往后移动一位。

```java
class Solution {
    public int strStr(String haystack, String needle) {
        if(needle==null||needle.isEmpty()) return 0;
        if(haystack==null||haystack.isEmpty()) return -1;
        for(int i=0;i<haystack.length();i++){
            if(haystack.charAt(i)==needle.charAt(0)){
                boolean flag = true;
                for(int j=0;j<needle.length();j++){
                    if(i+j>=haystack.length() || haystack.charAt(i+j)!=needle.charAt(j)){
                        flag = false;
                        break;
                    }
                }
                if(flag) return i;
            }
        }
        return -1;
    }
}
```

**时间复杂度:** O()。

**空间复杂度:** O()。

## Solution 2

解法1的优化版本，遍历haystack时，直接比较needle的所有字符。

```java
class Solution {
    public int strStr(String haystack, String needle) {
        if(needle==null||needle.isEmpty()) return 0;
        if(haystack==null||haystack.length()<needle.length()) return -1;
        for(int i=0;i<=haystack.length()-needle.length();i++){
            int j = 0;
            for(;j<needle.length();j++){
                if(haystack.charAt(i+j)!=needle.charAt(j)) break;
            }
            if(j==needle.length()) return i;
        }
        return -1;
    }
}
```

**时间复杂度:** O()。

**空间复杂度:** O()。
