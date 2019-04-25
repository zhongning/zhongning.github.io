---
title: LeetCode 009 Palindrome Number
tags:
  - leetcode
  - leetcode-easy
  - leetcode-math
categories:
  - leetcode
abbrlink: 5013
date: 2019-04-10 22:48:32
---

## Description

Determine whether an integer is a palindrome. An integer is a palindrome when it reads the same backward as forward.

**Example 1:**

```
Input: 121
Output: true
```

**Example 2:**

```
Input: -121
Output: false
Explanation: From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.
```

**Example 3:**

```
Input: 10
Output: false
Explanation: Reads 01 from right to left. Therefore it is not a palindrome.
```

**Difficulty: Easy**

**Code:**

```java
class Solution {
    public boolean isPalindrome(int x) {

    }
}
```

## 题意

判断一个int数是否是回文格式，即从前读取和从后开始读取都是一样的。

<!-- more -->

## Solution 1

首先负数排除，不是回文数字。而0是回文数字。针对正数，可以从后往前读取并累加来找出其反向数字，并和原始数字进行比较。

若反转时溢出，那么最终的结果肯定不会相等，可以不用判断是否溢出。

```java
class Solution {
    public boolean isPalindrome(int x) {
        if(x<0){
            return false;
        }else if(x==0){
            return true;
        }
        int reverseNum = 0;
        int curr = x;
        while(curr!=0){
            reverseNum = reverseNum*10 + curr%10;
            curr = curr/10;
        }
        return reverseNum==x;
    }
}
```

**时间复杂度:** O(n)，取决于数字的长度。

**空间复杂度:** O(1)，只使用int来保存结果。

## Solution 2

首先负数排除，不是回文数字。而0是回文数字。并且如果正数的末尾是0也不是回文。

其他正数只需要验证前后半段是否对称，和解法1相比快了一倍。具体做法是：每次对10取余取出数的末尾，把reverseNum乘以10并加上余数；同时把x除以10。
这样当reverseNum大于等于x时停止循环，x即为前半段，reverseNum为后半段。由于回文数的位数可奇可偶，偶数时两者相等，奇数时中间数字在reverseNum最低位需除以10后再比较。

```java
class Solution {
    public boolean isPalindrome(int x) {
        if(x<0){
            return false;
        }else if(x==0){
            return true;
        }else if(x%10==0){
            return false;
        }
        int reverseNum = 0;
        while(x>reverseNum){
            reverseNum = reverseNum*10 + x%10;
            x = x/10;
        }
        return x==reverseNum || x==reverseNum/10;
    }
}
```

**时间复杂度:** O(n)，取决于数字的长度。

**空间复杂度:** O(1)，只使用int来保存结果。
