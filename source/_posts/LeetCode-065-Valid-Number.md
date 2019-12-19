---
title: LeetCode 065 Valid Number
tags:
  - leetcode
  - leetcode-hard
  - leetcode-math
  - leetcode-string
categories:
  - leetcode
abbrlink: 55807
date: 2019-12-19 22:37:53
---

## Description

Validate if a given string can be interpreted as a decimal number.

Some examples:

```
"0" => true
" 0.1 " => true
"abc" => false
"1 a" => false
"2e10" => true
" -90e3   " => true
" 1e" => false
"e3" => false
" 6e-1" => true
" 99e2.5 " => false
"53.5e93" => true
" --6 " => false
"-+3" => false
"95a54e53" => false
```

Note: It is intended for the problem statement to be ambiguous. 
You should gather all requirements up front before implementing one. 
However, here is a list of characters that can be in a valid decimal number:

* Numbers 0-9
* Exponent - "e"
* Positive/negative sign - "+"/"-"
* Decimal point - "."

Of course, the context of these characters also matters in the input.

**Difficulty: Hard**

**Code:**

```java
class Solution {
    public boolean isNumber(String s) {
        
    }
}
```

## 题意

验证给定的字符串是否能够转成数字。

<!-- more -->

## Solution 1

分开头中间结尾三个位置来讨论情况：

1. 先对字符串首位空格做预处理，可以使用两个指针分别指向开头结尾，遇到空格则跳过
2. 对首字符的处理，首字符只能是数字、小数点或者+/-，定义三个flag表示是否之前是否检测到小数点、数字、指数。
首字符若是数字、小数点或正负号，修改对应flag，否则直接返回false
3. 对中间字符的处理，会出现数字、小数点、指数、正负号、其他字符
    1. 若是数字，标记flag并通过
    2. 若是指数，则必须是第一次出现指数，前一个字符不能是正负号并且之前要出现过数字，才能标记flag并通过
    3. 若是正负号，则之前的字符必须是指数，才能标记flag并通过
    4. 若是小数点，则必须是第一次出现小数点，并且指数没有出现过，才能标记flag并通过
    5. 其他字符返回false
4. 对结尾字符的处理，最后一个字符只能是数字或者小数点，其他返回false
    1. 若是数字，返回true
    2. 若是小数点，则必须是第一次出现，前面必须是数字并且指数之前没有出现过，才能返回true

```java
class Solution {
    public boolean isNumber(String s) {
        if(s==null || s.isEmpty()) return false;
        int len = s.length();
        int left = 0, right = len-1;
        boolean eExisted=false, dotExisted=false, numExisted=false;
        
        while(left<right&&s.charAt(left)==' ') left++;
        while(left<right&&s.charAt(right)==' ') right--;
        if(left>=right && (s.charAt(left)<'0'||s.charAt(left)>'9')) return false;
        
        if(s.charAt(left)=='.'){
            dotExisted=true;
        }else if(s.charAt(left)>='0'&&s.charAt(left)<='9'){
            numExisted=true;
        }else if(s.charAt(left)!='+'&&s.charAt(left)!='-'){
            return false;
        }
        
        for(int i=left+1;i<=right-1;i++){
            char curr = s.charAt(i), prev = s.charAt(i-1);
            if(curr>='0'&&curr<='9'){
                numExisted=true;
            }else if(curr=='e'||curr=='E'){
                if(!eExisted && prev!='+' && prev!='-' && numExisted){
                    eExisted=true;
                }else{
                    return false;
                }
            }else if(curr=='+'||curr=='-'){
                if(prev!='e'&&prev!='E'){
                    return false;
                }
            }else if(curr=='.'){
                if(!dotExisted && !eExisted){
                    dotExisted=true;
                }else{
                    return false;
                }
            }else{
                return false;
            }
        }
        
        if(s.charAt(right)>='0'&&s.charAt(right)<='9'){
            return true;
        }else if(s.charAt(right)=='.'&&!dotExisted&&!eExisted&&numExisted){
            return true;
        }else{
            return false;
        }
    }
}
```

**时间复杂度:** O(n)。

**空间复杂度:** O(1)。

## Solution 2

对上述情况进行简化，定义四个flag分别表示检测到小数点、指数、数字、指数后的数字，先删除掉首尾两端空格。

从头到尾遍历剩下的字符：
1. 数字，标记num和numAfterE为true
2. 小数点，如果之前出现过小数点或者指数则返回false，否则标记dot为true
3. 指数，如果之前出现过指数或者没出现数字则返回false，否则标记e为true，numAfterE为false
4. 正负号，如果不是出现在第一位或者前一位不是指数则返回false
5. 其他字符返回false

最后返回num&&numAfterE，即字符串包含数字，并且在有指数的情况下指数后面有数字。

```java
class Solution {
    public boolean isNumber(String s) {
        if(s==null||s.isEmpty()) return false;
        s=s.trim();
        boolean dot=false,e=false,num=false,numAfterE=true;
        
        for(int i=0;i<s.length();i++){
            char curr = s.charAt(i);
            if(curr>='0'&&curr<='9'){
                num=true;
                numAfterE=true;
            }else if(curr=='.'){
                if(e||dot){
                    return false;
                }else{
                    dot=true;
                }
            }else if(curr=='e'||curr=='E'){
                if(!num||e){
                    return false;
                }else{
                    e=true;
                    numAfterE=false;
                }
            }else if(curr=='+'||curr=='-'){
                if(i!=0&&(s.charAt(i-1)!='e'&&s.charAt(i-1)!='E')){
                    return false;
                }
            }else{
                return false;
            }
        }
        
        return num && numAfterE;
    }
}
```

**时间复杂度:** O(n)。

**空间复杂度:** O(1)。

