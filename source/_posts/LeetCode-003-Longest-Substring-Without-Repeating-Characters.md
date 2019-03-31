---
title: LeetCode 003 Longest Substring Without Repeating Characters
tags:
  - leetcode
  - leetcode-medium
  - leetcode-hash-table
  - leetcode-two-pointers
  - leetcode-string
  - leetcode-sliding-window
categories:
  - leetcode
abbrlink: 33885
date: 2019-03-27 18:48:14
---

## Description

Given a string, find the length of the longest substring without repeating characters.

**Example 1:**

```
Input: "abcabcbb"
Output: 3 
Explanation: The answer is "abc", with the length of 3.
```

**Example 2:**

```
Input: "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.
```

**Example 3:**

```
Input: "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3. 
             Note that the answer must be a substring, "pwke" is a subsequence and not a substring.
```

**Difficulty: Medium**

**Code:**

```java
class Solution {
    public int lengthOfLongestSubstring(String s) {
        
    }
}
```

<!-- more -->

## 题意

给定一个字符串，找出不包含重复字符的最长子串的长度。

## Solution 1

使用两层遍历，外层是子串起始字符，内层则进行遍历时检查是否包含重复字符，若不包含则继续往后面移动，直到有重复字符或者到达末尾则结束。

将此子串到最大长度和已保存到最大长度进行对比，去其中大的进行更新。

```java
class Solution {
    public int lengthOfLongestSubstring(String s) {
        if(s.length() <= 1){
            return s.length();
        }
        int max = 0;
        for(int i=0;i<s.length();i++){
            Set<Character> set = new HashSet<Character>();
            for(int j=i;j<s.length();j++){
                if(set.contains(s.charAt(j))){
                    max = Math.max(max,j-i);
                    break;
                }else{
                    set.add(s.charAt(j));
                    max = Math.max(max,j-i+1);
                }
            }
        }
        return max;
    }
}
```

**时间复杂度:** O(n2)，两层循环遍历。

**空间复杂度:** O(n)，用来HashSet来存储每次已经遍历过的字符。

## Solution 2

使用滑动窗口，窗口的左右两侧起始都是字符串第一个字符，然后向前移动窗口的右侧，同时将当前字符和其所在位置放入HashSet中，同时更新最大子串长度。

若检测到HashSet中已经存在该字符，则从HashSet删除窗口左侧元素并移动左侧位置，直到不包含重复字符为止。

```java
class Solution {
    public int lengthOfLongestSubstring(String s) {
        if (s.length()<=1) return s.length();
        Set<Character> set = new HashSet<Character>();
        int left=0, right=0, max = 0;
        while(right<s.length()){
            if(set.contains(s.charAt(right))){
                set.remove(s.charAt(left));
                left++;
            }else{
                set.add(s.charAt(right));
                max = Math.max(max,right-left+1);
                right++;
            }
        }
        return max;
    }
}
```
**时间复杂度:** O(2n)=O(n)，一层循环，主要是右侧窗口移动。

**空间复杂度:** O(n)，用来HashSet来存储已经遍历过的字符。

## Solution 3

同样使用滑动窗口，窗口的左右两侧起始都是字符串第一个字符，然后向前移动窗口的右侧，同时将当前字符和其所在位置放入HashMap中，同时更新最大子串长度。

若检测到HashMap中已经存在该字符，则判断已存在字符到位置是否小于窗口左侧，若小于则忽略，否则直接移动窗口左侧到此位置到右侧。

```java
class Solution {
    public int lengthOfLongestSubstring(String s) {
        if (s.length()<=1) return s.length();
        Map<Character,Integer> map = new HashMap<Character,Integer>();
        int max = 0;
        for(int left=0,right=0;right<s.length();right++){
            if(map.containsKey(s.charAt(right)) && map.get(s.charAt(right))>=left){
                left=map.get(s.charAt(right))+1;
            }
            map.put(s.charAt(right),right);
            max = Math.max(max,right-left+1);
        }
        return max;
    }
}
```

**时间复杂度:** O(n)，一层循环遍历，HashMap操作耗时O(1)。

**空间复杂度:** O(n)，用来HashMap来存储已经遍历过的字符。
