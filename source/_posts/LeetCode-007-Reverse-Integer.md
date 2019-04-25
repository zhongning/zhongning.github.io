---
title: LeetCode 007 Reverse Integer
tags:
  - leetcode
  - leetcode-easy
  - leetcode-math
categories:
  - leetcode
abbrlink: 8972
date: 2019-04-05 16:30:33
---

## Description

Given a 32-bit signed integer, reverse digits of an integer.

**Example 1:**

```
Input: 123
Output: 321
```

**Example 2:**

```
Input: -123
Output: -321
```

**Example 3:**

```
Input: 120
Output: 21
```

**Noted:**

Note:
Assume we are dealing with an environment which could only store integers within the 32-bit signed integer range: [−231,  231 − 1]. 
For the purpose of this problem, assume that your function returns 0 when the reversed integer overflows.

**Difficulty: Easy**

**Code:**

```java
class Solution {
    public int reverse(int x) {
        
    }
}
```

## 题意

给定一个32位有符号的整数，找出其反转后的整数。反转后的数字如果溢出，则返回0。

<!-- more -->

## Solution 1

将数字转成字符串，然后保留符号反转，去除掉最前面多出的0。再将字符串转成Long，比较数字是否在Int的范围，如果不在返回0。

```java
class Solution {
    public int reverse(int x) {
        String s = String.valueOf(x);
        String result = null;
        if(s.charAt(0)=='-'){
            result = new StringBuilder(s.substring(1)).reverse().toString();
            if(result.charAt(0)=='0'&&result.length()>1){
                result=result.substring(1);
            }
            result = '-'+result;
        }else{
            result = new StringBuilder(s).reverse().toString();
            if(result.charAt(0)=='0'&&result.length()>1){
                result=result.substring(1);
            }
        }
        Long out = Long.valueOf(result);
        if(out>Integer.MAX_VALUE||out<Integer.MIN_VALUE){
            return 0;
        }else{
            return Integer.valueOf(result);
        }
    }
}
```

**时间复杂度:** O(n)，取决于数字的长度。

**空间复杂度:** O(n)，取决于数字的长度。

## Solution 2

不使用字符串，直接循环取出原始整数的尾数从后往前进行累加。中间注意判断当前结果数是否超出范围。

int的范围是在-2147483648到2147483647之间，边界条件下反转后的最后一位也只能是1或者2，即21474836471和21474836472。
再次反转得输入数字1463847412和2463847412，后者超出界限，故输入数字只能是1463847412。
所以当反转后数字除以10不需要比较214748364，因为满足条件的只有2147483641。

```java
class Solution {
    public int reverse(int x) {
        int result = 0;
        while(x!=0){
            if(Math.abs(result)>Integer.MAX_VALUE/10){
                return 0;
            }
            result = result*10 + x%10;
            x=x/10;
        }
        return result;
    }
}
```

**时间复杂度:** O(log(n))，取决于数字的长度。

**空间复杂度:** O(1)，只使用一个数字保留结果。

## Solution 3

跟解法2类似，使用long来保存中间结果。

```java
class Solution {
    public int reverse(int x) {
        Long result = 0L;
        while(x!=0){
            result = result*10 + x%10;
            x=x/10;
        }
        if(result>Integer.MAX_VALUE||result<Integer.MIN_VALUE){
            return 0;
        }
        return result.intValue();
    }
}
```

**时间复杂度:** O(log(n))，取决于数字的长度。

**空间复杂度:** O(1)，只使用一个数字保留结果。
