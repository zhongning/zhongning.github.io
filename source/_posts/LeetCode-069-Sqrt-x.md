---
title: LeetCode 069 Sqrt(x)
tags:
  - leetcode
  - leetcode-easy
  - leetcode-math
  - leetcode-binary-search
categories:
  - leetcode
abbrlink: 64536
date: 2019-12-23 23:22:12
---

## Description

Implement int sqrt(int x).

Compute and return the square root of x, where x is guaranteed to be a non-negative integer.

Since the return type is an integer, the decimal digits are truncated and only the integer part of the result is returned.

**Example 1:**

```
Input: 4
Output: 2
```

**Example 2:**

```
Input: 8
Output: 2
Explanation: The square root of 8 is 2.82842..., and since 
             the decimal part is truncated, 2 is returned.
```

**Difficulty: Easy**

**Code:**

```java
class Solution {
    public int mySqrt(int x) {
        
    }
}
```

## 题意

实现求x的平方根，x为非负整数，返回结果也为整数，小数位截取掉。

<!-- more -->

## Solution 1

对小于等于1的情况做特殊处理，令left为二分查找的左边界，right为右边界。

while循环条件为left<=right，当left==right还没找到时，则因为舍弃小数部分最终结果为left的前一个数。

当left<right时，mid为left和right的中间数：
1. 若mid的平方等于x则直接返回mid
2. 若mid的平方大于x则说明结果在左半侧，令right=mid-1
3. 若mid的平方小于x则说明结果在右半侧，令left=mid+1

注意，判断mid平方时要考虑int的平方会溢出，所以使用mid>x/mid这种判断方式。

```java
class Solution {
    public int mySqrt(int x) {
        if(x<=1) return x;
        int left=0, right=x;
        while(left<=right){
            int mid=(left+right)/2;
            if(mid==x/mid){
                return mid;
            }else if(mid>x/mid){
                right=mid-1;
            }else{
                left=mid+1;
            }
        }
        return left-1;
    }
}
```

**时间复杂度:** O(log n)。

**空间复杂度:** O(1)。

## Solution 2

上述解法的另外换一种形式，当mid的平方小于等于x时，判断mid+1的平方是不是大于x，若是则直接返回mid。

```java
class Solution {
    public int mySqrt(int x) {
        if (x <= 1)
            return x;
        int left = 1, right = x;
        while (true) {
            int mid = left + (right - left)/2;
            if (mid > x/mid) {
                right = mid - 1;
            }else{
                if (mid + 1 > x/(mid + 1))
                    return mid;
                left = mid + 1;
            }
        }
    }
}
```

**时间复杂度:** O(log n)。

**空间复杂度:** O(1)。

## Solution 3

参见牛顿迭代法，用逼近法求方程根。

```java
class Solution {
    public int mySqrt(int x) {
        long r = x;
        while( r*r > x){
            r = (r + x/r)/2;
        }
        return (int)r;
    }
}
```

**时间复杂度:** O(log n)。

**空间复杂度:** O(1)。
