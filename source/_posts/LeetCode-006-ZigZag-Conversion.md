---
title: LeetCode 006 ZigZag Conversion
tags:
  - leetcode
  - leetcode-medium
  - leetcode-string
categories:
  - leetcode
abbrlink: 16365
date: 2019-03-31 13:47:53
---

## Description

The string "PAYPALISHIRING" is written in a zigzag pattern on a given number of rows like this: (you may want to display this pattern in a fixed font for better legibility)

```
P   A   H   N
A P L S I I G
Y   I   R
```

And then read line by line: "PAHNAPLSIIGYIR"

Write the code that will take a string and make this conversion given a number of rows:

```
string convert(string s, int numRows);
```

**Example 1:**

```
Input: s = "PAYPALISHIRING", numRows = 3
Output: "PAHNAPLSIIGYIR"
```

**Example 2:**

```
Input: s = "PAYPALISHIRING", numRows = 4
Output: "PINALSIGYAHRPI"
Explanation:

P     I    N
A   L S  I G
Y A   H R
P     I
```

**Difficulty: Medium**

**Code:**

```java
class Solution {
    public String convert(String s, int numRows) {
        
    }
}
```

## 题意

某字符串是基于给定的行数使用锯齿状格式书写，然后逐行读取成字符串。写一段代码完成该转换。

<!-- more -->

## Solution 1

可以使用nRows长的字符数组来保存格式转换后放置的所有字符。字符数组下标代表行数，该字符代表这一行的所有字符。
遍历字符串并将当前字符放入对应的行，然后在遍历该数组，逐行读取所有字符。

```java
class Solution {
    public String convert(String s, int numRows) {
        if(numRows==1){
            return s;
        }
        String[] rows = new String[numRows];
        Arrays.fill(rows,"");
        boolean goDown = false;
        int currRow =0;
        for(int i=0;i<s.length();i++){
            rows[currRow]+=s.charAt(i);
            if(currRow==0||currRow==numRows-1){
                goDown=!goDown;
            }
            currRow=goDown?currRow+1:currRow-1;
        }
        
        String result = "";
        for(String row:rows){
            result+=row;
        }
        return result;
    }
}
```

**时间复杂度:** O(n)，只从左到右遍历一次原始字符串。

**空间复杂度:** O(n)，使用来字符串数组来保存当前转换后到字符。

## Solution 2

按行直接读取转换后到字符。给定当前第几竖列k，有

* 第0行到字符在原始字符串的下标是k(2*numRows-2)
* 第numRows-1行在原始字符串的下标是k(2*numRows-2)+numRows-1
* 在这之间的第i行在原始字符串的下标是k(2*numRows-2)+i和(k+1)(2*numRows-2)-i

```java
class Solution {
    public String convert(String s, int numRows) {
        if(numRows==1){
            return s;
        }
        StringBuilder result = new StringBuilder();
        int cycleLen = 2*numRows -2;
        
        for(int i=0;i<numRows;i++){
            for(int j=0;i+j<s.length();j+=cycleLen){
                result.append(s.charAt(i+j));
                if(i!=0&&i!=numRows-1&&j+cycleLen-i<s.length()){
                    result.append(s.charAt(j+cycleLen-i));
                }
            }
        }
        return result.toString();
    }
}
```

**时间复杂度:** O(n)，只遍历一次原始字符串。

**空间复杂度:** O(n)，使用StringBuilder来保存结果。
