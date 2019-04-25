---
title: LeetCode 022 Generate Parentheses
tags:
  - leetcode
  - leetcode-medium
  - leetcode-string
  - leetcode-backtracking
categories:
  - leetcode
abbrlink: 28316
date: 2019-04-25 21:38:38
---

## Description

Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.

For example, given n = 3, a solution set is:

```
[
  "((()))",
  "(()())",
  "(())()",
  "()(())",
  "()()()"
]
```

**Difficulty: Medium**

**Code:**

```java
class Solution {
    public List<String> generateParenthesis(int n) {
        
    }
}
```

<!-- more -->

## 题意

给定n对括弧，生成所有正确形式组合的字符串。

## Solution 1

对于这种列出所有结果的题目优先考虑递归Recursion求解。对于n，则有n个左括号和n个右括号，定义两个变量open、close表示左右括号还剩下的个数。因为总是先出现左括号，所有open应该不大于close。

若出现open大于close则直接返回。若open和close都为0则将当前字符串放入结果中。若open或者close不为0，则递归调用并更新open或close的值。

```java
class Solution {
    public List<String> generateParenthesis(int n) {
        List<String> res = new ArrayList<String>();
        if(n<=0) return res;
        generate(n,n,res,"");
        return res;
    }
    
    public void generate(int open, int close, List<String> res, String out){
        if(close<open) return;
        if(open==0&&close==0) res.add(out);
        if(open>0){
            generate(open-1,close,res,out+"(");
        }
        if(close>0){
            generate(open,close-1,res,out+")");
        }
    }
}
```

**时间复杂度:** O()。

**空间复杂度:** O()。

## Solution 2

没当N加1时，找现有N的所有结果，在结果字符串中如果遇见左括号，则直接在其后加入()或者在该字符串末尾加上()，然后返回。使用Set去重，变化如下所示。

```
n＝1:    ()

n=2:    (())    ()()

n=3:    (()())    ((()))    ()(())    (())()    ()()()   
```

```java
class Solution {
    public List<String> generateParenthesis(int n) {
        if(n<=0) return new ArrayList<String>();
        Set<String> res = new HashSet<String>();
        res.add("()");
        for(int i=1;i<n;i++){
            Set<String> tmp = new HashSet<String>();
            for(String str:res){
                for(int j=0;j<str.length();j++){
                    if(str.charAt(j)=='('){
                        tmp.add(str.substring(0,j+1)+"()"+str.substring(j+1));
                        tmp.add(str+"()");
                    }
                }
            }
            res = tmp;
        }
        return new ArrayList<String>(res);
    }
}
```

**时间复杂度:** O()。

**空间复杂度:** O()。

