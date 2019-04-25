---
title: LeetCode 014 Longest Common Prefix
tags:
  - leetcode
  - leetcode-easy
  - leetcode-string
categories:
  - leetcode
abbrlink: 48879
date: 2019-04-15 23:43:46
---

## Description

Write a function to find the longest common prefix string amongst an array of strings.

If there is no common prefix, return an empty string "".

**Example 1:**

```
Input: ["flower","flow","flight"]
Output: "fl"
```

**Example 2:**

```
Input: ["dog","racecar","car"]
Output: ""
Explanation: There is no common prefix among the input strings.
```

**Note:**

All given inputs are in lowercase letters a-z.

**Difficulty: Easy**

**Code:**

```java
class Solution {
    public String longestCommonPrefix(String[] strs) {
        
    }
}
```

## 题意

在字符串数组中找出最长的公共前缀字符串，若没有则返回空字符串。

<!-- more -->

## Solution 1

已字符串数组到第一个元素为基础，遍历该字符串取得当前字符，然后遍历其他字符串到当前位置，若其他字符串已经到达末尾或者字符不一致，则返回已经匹配过的。

```java
class Solution {
    public String longestCommonPrefix(String[] strs) {
        if(strs==null||strs.length==0||strs[0]==null||strs[0].length()==0) return "";
        for(int i=0;i<strs[0].length();i++){
            char curr = strs[0].charAt(i);
            for(int j=1;j<strs.length;j++){
                if(strs[j].length()<=i||strs[j].charAt(i)!=curr){
                    return strs[0].substring(0,i);
                }
            }
        }
        return strs[0];
    }
}
```

**时间复杂度:** O(S)，S是所有字符串字符的长度，因为所有字符都只遍历一次。

**空间复杂度:** O(1)。

## Solution 2

可以将所以字符串排序，那么最前和最后的字符串肯定是差距最大的，此时只需要比较这两个字符串即可。

```java
class Solution {
    public String longestCommonPrefix(String[] strs) {
        if(strs==null||strs.length==0) return "";
        Arrays.sort(strs);
        int len = Math.min(strs[0].length(),strs[strs.length-1].length());
        int i=0;
        while(i<len){
            if(strs[0].charAt(i)!=strs[strs.length-1].charAt(i)){
                return strs[0].substring(0,i);
            }
            i++;
        }
        return strs[0].substring(0,i);
    }
}
```

**时间复杂度:** O(S)，S是所有字符串字符的长度，因为所有字符都只遍历一次。

**空间复杂度:** O(1)。
