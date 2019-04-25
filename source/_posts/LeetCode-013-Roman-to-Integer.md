---
title: LeetCode 013 Roman to Integer
tags:
  - leetcode
  - leetcode-easy
  - leetcode-math
  - leetcode-string
categories:
  - leetcode
abbrlink: 19839
date: 2019-04-14 22:02:55
---

## Description

Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.

````
Symbol       Value
I             1
V             5
X             10
L             50
C             100
D             500
M             1000
````

For example, two is written as II in Roman numeral, just two one's added together. Twelve is written as, XII, which is simply X + II. The number twenty seven is written as XXVII, which is XX + V + II.

Roman numerals are usually written largest to smallest from left to right. However, the numeral for four is not IIII. Instead, the number four is written as IV. Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as IX. There are six instances where subtraction is used:

* I can be placed before V (5) and X (10) to make 4 and 9. 
* X can be placed before L (50) and C (100) to make 40 and 90. 
* C can be placed before D (500) and M (1000) to make 400 and 900.

Given a roman numeral, convert it to an integer. Input is guaranteed to be within the range from 1 to 3999.

**Example 1:**

```
Input: "III"
Output: 3
```

**Example 2:**

```
Input: "IV"
Output: 4
```

**Example 3:**

```
Input: "IX"
Output: 9
```

**Example 4:**

```
Input: "LVIII"
Output: 58
Explanation: L = 50, V= 5, III = 3.
```

**Example 5:**

```
Input: "MCMXCIV"
Output: 1994
Explanation: M = 1000, CM = 900, XC = 90 and IV = 4.
```

**Difficulty: Easy**

**Code:**

```java
class Solution {
    public int romanToInt(String s) {
        
    }
}
```

## 题意

将罗马数字转成整数，假定此整数范围在1到3999。

<!-- more -->

## Solution 1

将罗马字符和其整数值相对应，遍历罗马数字字符串，若后一位字符所代表到位数比当前位数高，则用后一位到整数值减去当前位到整数值再累加，否则直接累加。

```java
class Solution {
    public int romanToInt(String s) {
        int result = 0;
        int[] values = new int[]{1000,500,100,50,10,5,1};
        String roman = "MDCLXVI";
        for(int i=0;i<s.length();i++){
            if(i<s.length()-1&&roman.indexOf(s.charAt(i))>roman.indexOf(s.charAt(i+1))){
                result += values[roman.indexOf(s.charAt(i+1))] - values[roman.indexOf(s.charAt(i))];
                i++;
            }else{
                result += values[roman.indexOf(s.charAt(i))];
            }
        }
        return result;
    }
}
```

**时间复杂度:** O(n)，数字到长度。

**空间复杂度:** O()。

## Solution 2

我们需要用到HashMap数据结构，来将罗马数字的字母转化为对应的整数值，因为输入的一定是罗马数字，那么我们只要考虑两种情况即可：
第一，如果当前数字不是最后一个数字且之后的数字比它大的话，则减去当前数字。
第二，其他情况则加上这个数字。


```java
class Solution {
    public int romanToInt(String s) {
        int result = 0;
        Map<Character,Integer> romans = new HashMap<Character,Integer>();
        romans.put('M',1000);
        romans.put('D',500);
        romans.put('C',100);
        romans.put('L',50);
        romans.put('X',10);
        romans.put('V',5);
        romans.put('I',1);
        for(int i=0;i<s.length();i++){
            char curr = s.charAt(i);
            if(i<s.length()-1&&romans.get(curr)<romans.get(s.charAt(i+1))){
                result -= romans.get(curr);
            }else{
                result += romans.get(curr);
            }
        }
        return result;
    }
}
```

**时间复杂度:** O()。

**空间复杂度:** O()。

