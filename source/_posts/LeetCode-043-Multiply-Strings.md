---
title: LeetCode 043 Multiply Strings
tags:
  - leetcode
  - leetcode-medium
  - leetcode-math
  - leetcode-string
categories:
  - leetcode
abbrlink: 15075
date: 2019-05-09 22:50:06
---

## Description

Given two non-negative integers num1 and num2 represented as strings, return the product of num1 and num2, also represented as a string.

**Example 1:**

```
Input: num1 = "2", num2 = "3"
Output: "6"
```

**Example 2:**

```
Input: num1 = "123", num2 = "456"
Output: "56088"
```

**Note:**

1. The length of both num1 and num2 is < 110.
2. Both num1 and num2 contain only digits 0-9.
3. Both num1 and num2 do not contain any leading zero, except the number 0 itself.
4. You must not use any built-in BigInteger library or convert the inputs to integer directly.

**Difficulty: Medium**

**Code:**

```java
class Solution {
    public String multiply(String num1, String num2) {
        
    }
}
```

## 题意

给定两个代表非负num1和num2的字符串，用字符串表示它们的乘积。字符串的长度小于110，只包含0-9。不能将输入转成int进行计算。

<!-- more -->

## Solution 1

用一个数组pos保存m+n长度的数字，代表每一位上的数字，最后一个数字表示结果的个位。

从字符串num1和num2的右侧开始，提取对应位置上的数字并计算乘积，确定相乘后所影响的pos位置上的数字。

num1[i] * num2[j]将会影响pos[i+j]和pos[i+j+1]上的数字，对其进行更新。

最后遍历pos返回结果字符串。

```java
class Solution {
    public String multiply(String num1, String num2) {
        if(num1.equals("0")||num2.equals("0")) return "0";
        int m=num1.length(), n=num2.length();
        if(m>n) return multiply(num2,num1);
        int[] pos=new int[m+n];
        for(int i=m-1;i>=0;i--){
            for(int j=n-1;j>=0;j--){
                int tmp = (num1.charAt(i)-'0')*(num2.charAt(j)-'0');
                int p1=i+j, p2=i+j+1, sum=tmp+pos[p2];
                pos[p1]+=sum/10;
                pos[p2]=sum%10;
            }
        }
        StringBuilder sb = new StringBuilder();
        for(int i=0;i<pos.length;i++){
            if(i==0&&pos[i]==0) continue;
            sb.append(pos[i]);
        }
        return sb.length()==0?"0":sb.toString();
    }
}
```

**时间复杂度:** O()。

**空间复杂度:** O()。
