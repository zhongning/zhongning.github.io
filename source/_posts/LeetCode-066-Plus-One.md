---
title: LeetCode 066 Plus One
tags:
  - leetcode
  - leetcode-easy
  - leetcode-array
categories:
  - leetcode
abbrlink: 11445
date: 2019-12-20 22:06:24
---

## Description

Given a non-empty array of digits representing a non-negative integer, plus one to the integer.

The digits are stored such that the most significant digit is at the head of the list, and each element in the array contain a single digit.

You may assume the integer does not contain any leading zero, except the number 0 itself.

**Example 1:**

```
Input: [1,2,3]
Output: [1,2,4]
Explanation: The array represents the integer 123.
```

**Example 2:**

```
Input: [4,3,2,1]
Output: [4,3,2,2]
Explanation: The array represents the integer 4321.
```

**Difficulty: Easy**

**Code:**

```java
class Solution {
    public int[] plusOne(int[] digits) {
        
    }
}
```

## 题意

给定一个非空非负的数字数组，其表示一个int数字，对这个数字加一。这个int数字最前面没有0，除非它本身是0。

<!-- more -->

## Solution 1

令进位数字为carry初始化为1，然后从最后一位向前遍历。

若当前carry为0表示此位没有进位，则直接返回digits；否则更新当前位数字和carry。

退出循环后若carry不为0，则说明最前面要多一位数字1，考虑到一开始只加1，那么说明最开始所有的数字都是9，最终结果开头为1后面为0。

```java
class Solution {
    public int[] plusOne(int[] digits) {
        int len = digits.length, carry = 1;
        for(int i=len-1;i>=0;i--){
            if(carry==0) return digits;
            int sum = digits[i]+carry;
            digits[i]=sum%10;
            carry=sum/10;
        }
        
        int[] res = new int [len+1];
        res[0] = 1;
        return carry==0 ? digits : res;
    }
}
```

**时间复杂度:** O(n)。

**空间复杂度:** O(n)。

## Solution 2

针对加1这个情景，从最后一位数字开始遍历，重点考察是否为9，因为只有是9才需要进位。

当前位置的数字若比9小，则加1后直接返回。

当前位置的数字是9，则加1后当前位置数字变成0，前一位数字要加1，重复上述操作。

遍历到第一位后也没有返回，说明第一位有进位，考虑到一开始只加1，那么说明所有的数字都是9，结果开头为1后面为0。

```java
class Solution {
    public int[] plusOne(int[] digits) {
        int len = digits.length;
        for(int i=len-1;i>=0;i--){
            if(digits[i]<9){
                digits[i]+=1;
                return digits;
            }
            digits[i]=0;
        }
        
        int[] res = new int [len+1];
        res[0] = 1;
        return res;
    }
}
```

**时间复杂度:** O(n)。

**空间复杂度:** O(1)。

