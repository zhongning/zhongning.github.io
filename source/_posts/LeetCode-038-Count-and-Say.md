---
title: LeetCode 038 Count and Say
tags:
  - leetcode
  - leetcode-easy
  - leetcode-string
categories:
  - leetcode
abbrlink: 40563
date: 2019-05-07 20:56:10
---

## Description

The count-and-say sequence is the sequence of integers with the first five terms as following:

```
1.     1
2.     11
3.     21
4.     1211
5.     111221
```

1 is read off as "one 1" or 11.

11 is read off as "two 1s" or 21.

21 is read off as "one 2, then one 1" or 1211.

Given an integer n where 1 ≤ n ≤ 30, generate the nth term of the count-and-say sequence.

Note: Each term of the sequence of integers will be represented as a string.

**Example 1:**

```
Input: 1
Output: "1"
```

**Example 2:**

```
Input: 4
Output: "1211"
```

**Difficulty: Easy**

**Code:**

```java
class Solution {
    public String countAndSay(int n) {
        
    }
}
```

## 题意

对于前一个数，找出其对应字符串中相同数字都个数，并将其个数和数字一起存到新都字符串中作为当前数字的对应结果。

<!-- more -->

## Solution 1

递归调用，当n等于1时直接返回"1"，否则利用该方法求得前一个数对应的字符串。再按照题意理解生成新的字符串。

```java
class Solution {
    public String countAndSay(int n) {
        if(n==1){
            return "1";
        }
        String pre = countAndSay(n-1);
        StringBuilder sb = new StringBuilder();
        int count = 1;
        for(int i=1;i<pre.length();i++){
            if(pre.charAt(i)!=pre.charAt(i-1)){
                sb.append(count).append(pre.charAt(i-1));
                count=1;
            }else{
                count++;
            }
        }
        sb.append(count).append(pre.charAt(pre.length()-1));
        return sb.toString();
    }
}
```

**时间复杂度:** O()。

**空间复杂度:** O()。

## Solution 2

也可以对字符串"1"进行n-1次更新，更新规则与上述解法相同。

```java
class Solution {
    public String countAndSay(int n) {
        if(n==1) return "1";
        String res = "1";
        while(--n>0){
            String curr = "";
            for(int i=0;i<res.length();i++){
                int count=1;
                while(i+1<res.length()&&res.charAt(i)==res.charAt(i+1)){
                    count++;
                    i++;
                }
                curr=curr+count+res.charAt(i);
            }
            res=curr;
        }
        return res;
    }
}
```

**时间复杂度:** O()。

**空间复杂度:** O()。
