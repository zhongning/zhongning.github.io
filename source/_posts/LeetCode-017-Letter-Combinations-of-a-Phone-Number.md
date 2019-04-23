---
title: LeetCode 017 Letter Combinations of a Phone Number
tags:
  - leetcode
  - leetcode-medium
  - leetcode-string
  - leetcode-backtracking
categories:
  - leetcode
abbrlink: 35100
date: 2019-04-23 22:45:33
---

## Description

Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent.

A mapping of digit to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.

![pic](http://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Telephone-keypad2.svg/200px-Telephone-keypad2.svg.png)

**Example:**

```
Input: "23"
Output: ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].
```

**Note:**

Although the above answer is in lexicographical order, your answer could be in any order you want.

**Difficulty: Medium**

**Code:**

```java
class Solution {
    public List<String> letterCombinations(String digits) {
        
    }
}
```

<!-- more -->

## 题意

给定一个包含数字2-9的字符串，返回数字代表的所有可能的字符组合。数字和字母的映射和电话按钮一样。

## Solution 1

使用递归进行，递归方法没有返回值，只有当递归到输入字符串为空时，才将当前字符组合添加进结果集并返回。

否则，找到当前字符串第一位对应到所有字符，循环调用递归，更新参数。

```java
class Solution {
    public List<String> letterCombinations(String digits) {
        List<String> result = new ArrayList<String>();
        if(digits.isEmpty()) return result;
        String[] mapping = new String[]{"abc","def","ghi","jkl","mno","pqrs","tuv","wxyz"};
        generateAll(digits,result,"",mapping);
        return result;
    }
    
    public void generateAll(String digits, List<String> result, String out, String[] mapping){
        if(digits.isEmpty()){
            result.add(out);
            return;
        };
        int index = (digits.charAt(0)-'0')-2;
        for(char curr:mapping[index].toCharArray()){
            generateAll(digits.substring(1),result,out+curr,mapping);
        }
    }
}
```

**时间复杂度:** O()。

**空间复杂度:** O()。

## Solution 2

使用迭代，结果集初始化进去一个空字符串。在遍历digits中的所有数字时，先建立一个临时字符串结果列表，通过数字取出其对应字符数组，遍历字符数组并取出结果集中所有字符串，将字符拼接在后面并放入临时列表。

每遍历一个数字，将结果集重新指向临时列表。

```java
class Solution {
    public List<String> letterCombinations(String digits) {
        List<String> result = new ArrayList<String>();
        if(digits.isEmpty()) return result;
        String[] mapping = new String[]{"abc","def","ghi","jkl","mno","pqrs","tuv","wxyz"};
        result.add("");
        for(int i=0;i<digits.length();i++){
            List<String> tmp = new ArrayList<>();
            int index = (digits.charAt(i)-'0')-2;
            for(String s:result){
                for(char c:mapping[index].toCharArray()){
                    tmp.add(s+c);
                }
            }
            result=tmp;
        }
        return result;
    }
}
```

**时间复杂度:** O()。

**空间复杂度:** O()。
