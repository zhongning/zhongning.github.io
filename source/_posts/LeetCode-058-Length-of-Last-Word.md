---
title: LeetCode 058 Length of Last Word
tags:
  - leetcode
  - leetcode-easy
  - leetcode-string
categories:
  - leetcode
abbrlink: 34918
date: 2019-12-12 16:15:00
---

## Description

Given a string s consists of upper/lower-case alphabets and empty space characters ' ', return the length of last word in the string.

If the last word does not exist, return 0.

**Note:** A word is defined as a character sequence consists of non-space characters only.

**Example:**

```
Input: "Hello World"
Output: 5
```

**Difficulty: Easy**

**Code:**

```java
class Solution {
    public int lengthOfLastWord(String s) {
        
    }
}
```

## 题意

给定一个字符串包含大小写字母和空格，返回最后一个单词的长度。

<!-- more -->

## Solution 1

把字符串转成字符数组，start为当前单词的起始位置初始为0，len为当前遍历最后一个单词的长度。

遍历字符数组，若遇到位置i的字符为空格且其前一个字符不为空格，说明上个单词结束，len为i-start，start更新为i+1。

若位置i的字符为空格但其前一个字符也为空格，说明最后一个单词没有发生变化，只更新start为i+1。

最后一个单词理论上len为字符串的长度s.length()-start，但要考虑若最后一个字符是空格的情况。

```java
class Solution {
    public int lengthOfLastWord(String s) {
        if(s==null||s.isEmpty()) return 0;
        int start = 0, len = 0;
        for(int i=0;i<s.length();i++){
            if(s.charAt[i]==' '){
                if((i-1>=0)&&s.charAt[i-1]!=' ') len = i-start;
                start = i+1;
            }
        }
        if(s.length()-start==0){
            return len;
        }else{
            return s.length()-start;
        }
    }
}
```

**时间复杂度:** O(n)。

**空间复杂度:** O(1)。

## Solution 2

先对字符串进行预处理，将开头和结尾对空格都去掉。

遍历剩余都字符串，用计数器res去累计当前单词都长度，若遇到空格res重置为0，否则res+1。

```java
class Solution {
    public int lengthOfLastWord(String s) {
        if(s==null||s.isEmpty()) return 0;
        int left=0,right=s.length()-1,res=0;
        while(left<=right&&s.charAt(left)==' ') left++;
        while(left<=right&&s.charAt(right)==' ') right--;
        for(int i=left;i<=right;i++){
            if(s.charAt(i)==' '){
                res=0;
            }else{
                res++;
            }
        }
        return res;
    }
}
```

**时间复杂度:** O(n)。

**空间复杂度:** O(1)。

## Solution 3

遍历字符串，如果当前字符为非空字符，并且前一个字符为空则说明是新单词，单词长度res置为1，否则res++。

```java
class Solution {
    public int lengthOfLastWord(String s) {
        if(s==null||s.isEmpty()) return 0;
        int res = 0;
        for(int i=0;i<s.length();i++){
            if(s.charAt(i)!=' '){
                if(i>0 && s.charAt(i-1)==' '){
                    res=1;
                }else{
                    res++;
                }
            }
        }
        return res;
    }
}
```

**时间复杂度:** O(n)。

**空间复杂度:** O(1)。

## Solution 4

由于只关心最后一个单词，先将末尾空格去掉，从后往前遍历，找到非空格字符都长度即可。

```java
class Solution {
    public int lengthOfLastWord(String s) {
        if(s==null||s.isEmpty()) return 0;
        int right=s.length()-1, res = 0;
        while(right>=0&&s.charAt(right)==' ') right--;
        while(right>=0&&s.charAt(right)!=' ') {
            res++;
            right--;
        }
        return res;
    }
}
```

**时间复杂度:** O(n)。

**空间复杂度:** O(1)。
