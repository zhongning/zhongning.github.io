---
title: LeetCode 067 Add Binary
tags:
  - leetcode
  - leetcode-easy
  - leetcode-math
  - leetcode-string
categories:
  - leetcode
abbrlink: 56763
date: 2019-12-20 23:05:37
---

## Description

Given two binary strings, return their sum (also a binary string).

The input strings are both non-empty and contains only characters 1 or 0.

**Example 1:**

```
Input: a = "11", b = "1"
Output: "100"
```

**Example 2:**

```
Input: a = "1010", b = "1011"
Output: "10101"
```

**Difficulty: Easy**

**Code:**

```java
class Solution {
    public String addBinary(String a, String b) {
        
    }
}
```

## 题意

对两个二进制字符串进行加法运算，并返回结果字符串。

<!-- more -->

## Solution 1

令进位carry初始化为0，i、j分别代表a、b字符串要遍历的位置，从两个字符串最后一位开始往前遍历。

若i、j都大于等于0，则用其位置上都数字iNum、jNum，否则取0。

用iNum、jNum和carry相加之和，用和对2求余添加到结果字符串末尾，carry更新为和除2。

直到i、j都小于0，退出循环，说明两个字符串都遍历完毕。

遍历完后若carry不等于0，则将carry加入字符串末尾。

最后返回结果字符串到反转即可。

```java
class Solution {
    public String addBinary(String a, String b) {
        int carry = 0, i = a.length()-1, j = b.length()-1;
        StringBuilder sb = new StringBuilder();
        while(i>=0 || j>=0){
            int iNum = i>=0 ? (a.charAt(i)-'0') : 0;
            int jNum = j>=0 ? (b.charAt(j)-'0') : 0;
            int sum = iNum + jNum + carry;
            sb.append(sum%2);
            carry=sum/2;
            i--;
            j--;
        }
        if(carry!=0) sb.append(carry);
        return sb.reverse().toString();
    }
}
```

**时间复杂度:** O(n)。

**空间复杂度:** O(n)。

## Solution 2

同上述解法相似，只是不使用StringBuilder，不需要反转字符串。

```java
class Solution {
    public String addBinary(String a, String b) {
        int carry = 0, i = a.length()-1, j = b.length()-1;
        String res = "";
        while(i>=0 || j>=0){
            int iNum = i>=0 ? (a.charAt(i--)-'0') : 0;
            int jNum = j>=0 ? (b.charAt(j--)-'0') : 0;
            int sum = iNum + jNum + carry;
            res = sum%2 + res;
            carry=sum/2;
        }
        if(carry!=0) res="1"+res;
        return res;
    }
}
```

**时间复杂度:** O(n)。

**空间复杂度:** O(n)。

