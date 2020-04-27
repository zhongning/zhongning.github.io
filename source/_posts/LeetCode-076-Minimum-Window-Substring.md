---
title: LeetCode 076 Minimum Window Substring
tags:
  - leetcode
  - leetcode-hard
  - leetcode-hash-table
  - leetcode-two-pointers
  - leetcode-string
  - leetcode-sliding-window
categories:
  - leetcode
abbrlink: 19339
date: 2020-04-14 21:27:08
---

## Description

Given a string S and a string T, find the minimum window in S which will contain all the characters in T in complexity O(n).

**Example:**

```
Input: S = "ADOBECODEBANC", T = "ABC"
Output: "BANC"
```

**Note:**

* If there is no such window in S that covers all characters in T, return the empty string "".
* If there is such window, you are guaranteed that there will always be only one unique minimum window in S.

**Difficulty: Hard**

**Code:**

```java
class Solution {
    public String minWindow(String s, String t) {
        
    }
}
```

## 题意

给定一个字符串S和字符串T，从S中找出最短的子字符串能包含T中所有的字符，复杂度要求O(n)。

<!-- more -->

## Solution 1

使用双指针来定义滑动窗口，窗口右侧从s左侧往右移动，直到包含所以t的字符，然后将窗口左侧右移，去除掉不需要的部分。

定义计数器cnt表示当前窗口包含t中字符的个数，minLen是最小窗口的长度，res是窗口对应的子字符串。

1. 先扫一遍t将对应的字符及其出现次数放入HashMap中
2. 开始遍历s，遍历到的字符对应HashMap中的value减1，若减1后仍大于等于0，
说明当前遍历到的字母是T串中的字母并且没有超过出现的次数，cnt加1
3. 若cnt等于t的长度，开始一个循环，循环中更新minLen和res。
然后将子窗口的左边界向右移，将该字符对应HashMap中的value加1，若加1后大于0，
说明少了一个t中的字母，那么cnt自减1，表示没有匹配成功，然后移动左边界

```java
class Solution {
    public String minWindow(String s, String t) {
        String res = "";
        HashMap<Character,Integer> map = new HashMap<Character,Integer>();
        for(char c:t.toCharArray()){
            if(map.containsKey(c)){
                map.put(c,map.get(c)+1);
            }else{
                map.put(c,1);
            }
        }
        int left=0, count=0, minLen=Integer.MAX_VALUE;
        for(int i=0;i<s.length();i++){
            char c = s.charAt(i);
            if(!map.containsKey(c)){
                map.put(c,0);
            }
            map.put(c,map.get(c)-1);
            if(map.get(c)>=0) count++;
            while(count==t.length()){
                if(minLen>i-left+1){
                    minLen=i-left+1;
                    res=s.substring(left,i+1);
                }
                char l=s.charAt(left);
                map.put(l,map.get(l)+1);
                left++;
                if(map.get(l)>0) count--;
            }
        }
        return res;
    }
}
```

**时间复杂度:** O(n)。

**空间复杂度:** O(1)。

## Solution 2

由于只有256个字符，可以用int数组来代替HashMap，提高运行速度。

```java
class Solution {
    public String minWindow(String s, String t) {
        int left = 0, cnt = 0, minLeft=-1, minLen = Integer.MAX_VALUE;
        int[] map = new int[256];
        for(char c:t.toCharArray()){
            map[c]++;
        }
        for(int i=0;i<s.length();i++){
            char c = s.charAt(i);
            if(--map[c]>=0){
                cnt++;
            }
            while(cnt==t.length()){
                if(minLen>i-left+1){
                    minLen=i-left+1;
                    minLeft=left;
                }
                if(++map[s.charAt(left)]>0) cnt--;
                left++;
            }
        }
        return minLeft==-1 ? "" : s.substring(minLeft,minLeft+minLen);
    }
}
```

**时间复杂度:** O(n)。

**空间复杂度:** O(1)。

