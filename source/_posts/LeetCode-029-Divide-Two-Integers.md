---
title: LeetCode 029 Divide Two Integers
tags:
  - leetcode
  - leetcode-medium
  - leetcode-math
  - leetcode-binary-search
categories:
  - leetcode
abbrlink: 4645
date: 2019-05-01 20:13:44
---

## Description

Given two integers dividend and divisor, divide two integers without using multiplication, division and mod operator.

Return the quotient after dividing dividend by divisor.

The integer division should truncate toward zero.

**Example 1:**

```
Input: dividend = 10, divisor = 3
Output: 3
```

**Example 2:**

```
Input: dividend = 7, divisor = -3
Output: -2
```

**Note:**

* Both dividend and divisor will be 32-bit signed integers.
* The divisor will never be 0.
* Assume we are dealing with an environment which could only store integers within the 32-bit signed integer range: [−231,  231 − 1]. For the purpose of this problem, assume that your function returns 231 − 1 when the division result overflows.

**Difficulty: Medium**

**Code:**

```java
class Solution {
    public int divide(int dividend, int divisor) {
        
    }
}
```

## 题意

实现整数的除法，禁止使用乘法、除法、取余。整数范围为有符号int，除数不会是0，结果溢出后返回231 − 1。

<!-- more -->

## Solution 1

思路是把数转成正数long，再按位移动的操作。若被除数m比除数n大，将n往左移一位成t再比较，这样可以快速定位到例如1、2、4、8倍的倍数p。

然后将m减去t，倍数结果res加上p，不断循环，最后根据符号返回结果。

```java
class Solution {
    public int divide(int dividend, int divisor) {
        if(dividend==0) return 0;
        if(divisor==1) return dividend;
        if(dividend==Integer.MIN_VALUE&&divisor==-1) return Integer.MAX_VALUE;
        if(divisor==-1) return -dividend;
        long m = Math.abs(Long.valueOf(dividend)), n = Math.abs(Long.valueOf(divisor));
        int res = 0, sign = (dividend<0)^(divisor<0)?-1:1;
        while(m>=n){
            long t=n,p=1;
            while(m>=(t<<1)){
                t<<=1;
                p<<=1;
            }
            res+=p;
            m-=t;
        }
        return sign==1?res:-res;
    }
}
```

**时间复杂度:** O()。

**空间复杂度:** O()。

## Solution 2

在解法1的基础上使用递归。

```java
class Solution {
    public int divide(int dividend, int divisor) {
        if(dividend==0) return 0;
        if(divisor==1) return dividend;
        if(dividend==Integer.MIN_VALUE&&divisor==-1) return Integer.MAX_VALUE;
        if(divisor==-1) return -dividend;
        long m = Math.abs(Long.valueOf(dividend)), n = Math.abs(Long.valueOf(divisor));
        if(m<n) return 0;
        int res = 0, sign = (dividend<0)^(divisor<0)?-1:1;
        long t=n,p=1;
        while(m>=(t<<1)){
            t<<=1;
            p<<=1;
        }
        res+=p+divide(Long.valueOf(m-t).intValue(),Long.valueOf(n).intValue());
        return sign==1?res:-res;
    }
}
```

**时间复杂度:** O()。

**空间复杂度:** O()。
