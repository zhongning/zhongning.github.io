---
title: LeetCode 008 String to Integer (atoi)
tags:
  - leetcode
  - leetcode-medium
  - leetcode-math
  - leetcode-string
categories:
  - leetcode
abbrlink: 64402
date: 2019-04-05 17:44:49
---

## Description

Implement atoi which converts a string to an integer.

The function first discards as many whitespace characters as necessary until the first non-whitespace character is found. Then, starting from this character, takes an optional initial plus or minus sign followed by as many numerical digits as possible, and interprets them as a numerical value.

The string can contain additional characters after those that form the integral number, which are ignored and have no effect on the behavior of this function.

If the first sequence of non-whitespace characters in str is not a valid integral number, or if no such sequence exists because either str is empty or it contains only whitespace characters, no conversion is performed.

If no valid conversion could be performed, a zero value is returned.

**Note:**

* Only the space character ' ' is considered as whitespace character.

* Assume we are dealing with an environment which could only store integers within the 32-bit signed integer range: [−231,  231 − 1]. If the numerical value is out of the range of representable values, INT_MAX (231 − 1) or INT_MIN (−231) is returned.

**Example 1:**

```
Input: "42"
Output: 42
```

**Example 2:**

```
Input: "   -42"
Output: -42
Explanation: The first non-whitespace character is '-', which is the minus sign.
             Then take as many numerical digits as possible, which gets 42.
```

**Example 3:**

```
Input: "4193 with words"
Output: 4193
Explanation: Conversion stops at digit '3' as the next character is not a numerical digit.
```

**Example 4:**

```
Input: "words and 987"
Output: 0
Explanation: The first non-whitespace character is 'w', which is not a numerical 
             digit or a +/- sign. Therefore no valid conversion could be performed.
```

**Example 5:**

```
Input: "-91283472332"
Output: -2147483648
Explanation: The number "-91283472332" is out of the range of a 32-bit signed integer.
             Thefore INT_MIN (−231) is returned.
```

**Difficulty: Medium**

**Code:**

```java
class Solution {
    public int myAtoi(String str) {
        
    }
}
```

<!-- more -->

## 题意

实现atoi函数将字符串转换为整数。

函数首先尽可能多的丢弃空白字符，直到发现第一个非空字符位为止。 接着从这个字符开始，读入一个可选的正负号，然后尽可能多的读入数字，最后将它们解析成数值。

字符串中在合法数字后可以包含额外的非法字符，对于这些字符只需丢弃即可。

如果字符串的非空字符不是一个有效的整数，或者，当字符串为空或者只包含空白字符时，不需要执行转换。

如果不能够执行有效的转换则返回0。如果得到的数值超出了整数范围，返回INT_MAX (2147483647) 或者 INT_MIN (-2147483648)。

## Solution 1

使用StringBuilder保存取出的数字，布尔类型保存是否是正数。开始遍历字符串，有以下情况：

* 只有最前面的空格可以忽略
* 第一次遍历到'-'或则'+'则更新是否是正数
* 若为数字
    * 如果当前已保存的数字为空，且当前数字为0后一位也为0，则忽略
    * 其他则保存进StringBuilder
* 其他情况则条件不符，退出遍历

而后判断长度是否超出Integer的限制，并转成Long判断其具体是否超出Integer区间范围。

```java
class Solution {
    public int myAtoi(String str) {
        nt len=str.length();
        StringBuilder sb = new StringBuilder();
        Boolean positive = null;
        for(int i=0;i<len;i++){
            if(sb.length()==0&&positive==null&&str.charAt(i)==' '){
                continue;
            }
            if(sb.length()==0&&positive==null&&(str.charAt(i)=='-'||str.charAt(i)=='+')){
                positive=str.charAt(i)=='-'?false:true;
                continue;
            }
            if(str.charAt(i)>='0'&&str.charAt(i)<='9'){
                if(sb.length()==0&&str.charAt(i)=='0'&&i<len-1&&str.charAt(i+1)=='0'){
                    continue;
                }else{
                    sb.append(str.charAt(i));
                    continue;
                }
            }
            break;
        }
        int maxLen = String.valueOf(Integer.MAX_VALUE).length();
        if(sb.length()==0){
            return 0;
        }
        positive=positive==null?true:positive;
        if(sb.length()>maxLen){
            return positive?Integer.MAX_VALUE:Integer.MIN_VALUE;
        }
        Long longValue = positive?Long.valueOf(sb.toString()):0L-Long.valueOf(sb.toString());
        if(longValue>Integer.MAX_VALUE){
            return Integer.MAX_VALUE;
        }else if(longValue<Integer.MIN_VALUE){
            return Integer.MIN_VALUE;
        }else{
            return longValue.intValue();
        }
    }
}
```

**时间复杂度:** O(n)，遍历一次字符串。

**空间复杂度:** O(n)，使用StringBuilder，取决于字符串长度。

## Solution 2

使用一个int保存结果，另外一个int保存1或者-1代表正负数。截去字符串前后空格后，开始遍历字符串，有以下情况：

* 首字符为'-'或'+'则更新正负数
* 若为数字
    * 判断当前已保存的结果如果乘以10倍的过程中超出int范围则返回
    * 把当前已保存的结果乘以10并加上当前字符的数值
    * 再次判断是否超出int范围
* 其他情况则条件不符，退出遍历

其中判断是否超出int范围，可以用保存的数和加上当前数值后的符号是否发生变化来判断，因为超出区间后其正负发生反转。

```java
class Solution {
    public int myAtoi(String str) {
        if(str==null||str.length()==0) return 0;
        str=str.trim();
        int num=0;
        int sign=1;
        for(int i=0;i<str.length();i++){
            char curr = str.charAt(i);
            if(i==0&&curr=='+'){
                sign=1;
            }else if(i==0&&curr=='-'){
                sign=-1;
            }else if(curr>='0'&&curr<='9'){
                int prev = 0;
                for(int j=0;j<10;j++){
                    prev+=num;
                    if(num>0&&prev<0){
                        return Integer.MAX_VALUE;
                    }else if(num<0&&prev>0){
                        return Integer.MIN_VALUE;
                    }
                }
                prev = 10*num + sign*(curr-'0');
                if(num>0&&prev<0){
                    return Integer.MAX_VALUE;
                }else if(num<0&&prev>0){
                    return Integer.MIN_VALUE;
                }
                num=prev;
            }else{
                break;
            }
        }
        return num;
    }
}
```

**时间复杂度:** O(n)，遍历一次字符串。

**空间复杂度:** O(1)，使用int数字保存。