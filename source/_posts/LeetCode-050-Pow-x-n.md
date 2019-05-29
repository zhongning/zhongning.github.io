---
title: 'LeetCode 050 Pow(x, n)'
tags:
  - leetcode
  - leetcode-medium
  - leetcode-math
  - leetcode-binary-search
categories:
  - leetcode
abbrlink: 46336
date: 2019-05-29 21:02:20
---

## Description

Implement pow(x, n), which calculates x raised to the power n (xn).

**Example 1:**

```
Input: 2.00000, 10
Output: 1024.00000
```

**Example 2:**

```
Input: 2.10000, 3
Output: 9.26100
```

**Example 3:**

```
Input: 2.00000, -2
Output: 0.25000
Explanation: 2-2 = 1/22 = 1/4 = 0.25
```

**Note:**

* -100.0 < x < 100.0
* n is a 32-bit signed integer, within the range [−231, 231 − 1]

**Difficulty: Medium**

**Code:**

```java
class Solution {
    public double myPow(double x, int n) {
        
    }
}
```

## 题意

求x的n次方，x范围是(-100.0, 100.0)，n是32位有符号整数其范围是[−231, 231 − 1]

<!-- more -->

## Solution 1

采用递归来折半计算，每次把n除2来计算myPow(x,n/2)，最终第二个参数指数会变成0。

* 若n为0，则返回1
* 若n为偶数，那么直接返回折半的结果的平方
* 若n为正的奇数，那么在折半结果平方的基础上再乘以x
* 若n为负的负数，那么在折半结果平方的基础上再除以x

```java
class Solution {
    public double myPow(double x, int n) {
        if(n==0) return 1;
        double half=myPow(x,n/2);
        if(n%2==0) return half*half;
        if(n>0) return half*half*x;
        return half*half/x;
    }
}
```

**时间复杂度:** O()。

**空间复杂度:** O()。

## Solution 2

使用迭代去完成，在n折半时将x进行平方。i初始化为n，当i时2当倍数时，将x平方；否则res先乘以x，x再平方，然后i折半。

最后若n为整数，则直接返回结果res，若n为负数，则用返回1/res。

```java
class Solution {
    public double myPow(double x, int n) {
        double res=1.0;
        for(int i=n;i!=0;i/=2){
            if(i%2!=0) res*=x;
            x*=x;
        }
        return n>0?res:1/res;
    }
}
```

**时间复杂度:** O()。

**空间复杂度:** O()。

## Solution 3

也可以将n先转成正数再折半，但是要注意n为Integer.MIN_VALUE的情况。

```java
class Solution {
    public double myPow(double x, int n) {
        if(n==0) return 1;
        if(n==Integer.MIN_VALUE){
            x=x*x;
            n=n/2;
        }
        if(n<0){
            n=-n;
            x=1/x;
        }
        return (n%2==0)?myPow(x*x,n/2):x*myPow(x*x,n/2);
    }
}
```

**时间复杂度:** O()。

**空间复杂度:** O()。

