---
title: LeetCode 012 Integer to Roman
tags:
  - leetcode
  - leetcode-medium
  - leetcode-math
  - leetcode-string
categories:
  - leetcode
abbrlink: 56606
date: 2019-04-14 21:56:15
---

## Description

Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.

```
Symbol       Value
I             1
V             5
X             10
L             50
C             100
D             500
M             1000
```

For example, two is written as II in Roman numeral, just two one's added together. Twelve is written as, XII, which is simply X + II. The number twenty seven is written as XXVII, which is XX + V + II.

Roman numerals are usually written largest to smallest from left to right. However, the numeral for four is not IIII. Instead, the number four is written as IV. Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as IX. There are six instances where subtraction is used:

* I can be placed before V (5) and X (10) to make 4 and 9. 
* X can be placed before L (50) and C (100) to make 40 and 90. 
* C can be placed before D (500) and M (1000) to make 400 and 900.

Given an integer, convert it to a roman numeral. Input is guaranteed to be within the range from 1 to 3999.

**Example 1:**

```
Input: 3
Output: "III"
```

**Example 2:**

```
Input: 4
Output: "IV"
```

**Example 3:**

```
Input: 9
Output: "IX"
```

**Example 4:**

```
Input: 58
Output: "LVIII"
Explanation: L = 50, V = 5, III = 3.
```

**Example 5:**

```
Input: 1994
Output: "MCMXCIV"
Explanation: M = 1000, CM = 900, XC = 90 and IV = 4.
```

**Difficulty: Medium**

**Code:**

```java
class Solution {
    public String intToRoman(int num) {
        
    }
}
```

## 题意

给定一个整数，将其转成罗马数字，整数的范围在1到3999。

<!-- more -->

## Solution 1

给定的整数范围在1到3999，那么只有千位、百位、十位、个位。例如计算出百位的数字，那么这个百位数字涉及到到罗马字符只有'M','D','C'，同理其他位。
写一个工具方法，可以根据当前位的值及涉及的三个罗马字符得到此位最后的罗马字符。对数不断对位的权重取商，并更新为对位的权重求余结果。

```java
class Solution {
    public String intToRoman(int num) {
        StringBuilder sb = new StringBuilder();
        char[] symbols = new char[]{' ',' ','M','D','C','L','X','V','I'};
        int weight = 1000;
        int index = 0;
        while(num!=0){
            int n = num/weight;
            appendRoman(sb,n,symbols[index],symbols[index+1],symbols[index+2]);
            num = num%weight;
            weight=weight/10;
            index+=2;
        }
        return sb.toString();
    }
    
    public void appendRoman(StringBuilder sb, int n, char prev, char five, char one){
        if(n==4){
            sb.append(one).append(five);
        }else if(n==9){
            sb.append(one).append(prev);   
        }else if(n<4){
            for(int i=0;i<n;i++){
                sb.append(one);
            }
        }else{
            sb.append(five);
            for(int i=0;i<n-5;i++){
                sb.append(one);
            }
        }
    }
}
```

**时间复杂度:** O(n)，数字的长度。

**空间复杂度:** O()。

## Solution 2

上述解法还有另外一种写法，在一个函数即可完成。

```java
class Solution {
    public String intToRoman(int num) {
        StringBuilder sb = new StringBuilder();
        char[] romans = new char[]{'M','D','C','L','X','V','I'};
        int[] values = new int[]{1000,500,100,50,10,5,1};
        for(int i=0;i<7;i+=2){
            int x = num/values[i];
            num=num%values[i];
            if(x<4){
                for(int j=0;j<x;j++) sb.append(romans[i]);
            }else if(x==4){
                sb.append(romans[i]).append(romans[i-1]);
            }else if(x>4&&x<9){
                sb.append(romans[i-1]);
                for(int j=0;j<x-5;j++) sb.append(romans[i]);
            }else if(x==9){
                sb.append(romans[i]).append(romans[i-2]);
            }
        }
        return sb.toString();
    }
}
```

**时间复杂度:** O(n)，数字的长度。

**空间复杂度:** O()。

## Solution 3

将十进制进一步细分到每次罗马字符变动到数表，如十位划分成90、50、40、10。每次找到当前最大的数，返回结果加上对应的罗马字符并减去。

```java
class Solution {
    public String intToRoman(int num) {
        StringBuilder sb = new StringBuilder();
        String[] romans = new String[]{"M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"};
        int[] values = new int[]{1000,900,500,400,100,90,50,40,10,9,5,4,1};
        for(int i=0;i<romans.length;i++){
            while(num>=values[i]){
                sb.append(romans[i]);
                num-=values[i];
            }
        }
        return sb.toString();
    }
}
```

**时间复杂度:** O(n)，数字的长度。

**空间复杂度:** O()。


## Solution 4

建立更加详细的数表，把位上的1-9都给列出来，直接查表。

```java
class Solution {
    public String intToRoman(int num) {
        String[] m = new String[]{"", "M", "MM", "MMM"};
        String[] c = new String[]{"", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"};
        String[] x = new String[]{"", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"};
        String[] i = new String[]{"", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"};
        return m[num / 1000] + c[(num % 1000) / 100] + x[(num % 100) / 10] + i[num % 10];
    }
}
```

**时间复杂度:** O(1)，直接查表。

**空间复杂度:** O()。
