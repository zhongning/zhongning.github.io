---
title: LeetCode 077 Combinations
tags:
  - leetcode
  - leetcode-medium
  - leetcode-backtracking
categories:
  - leetcode
abbrlink: 13541
date: 2020-04-27 23:50:12
---

## Description

Given two integers n and k, return all possible combinations of k numbers out of 1 ... n.

**Example:**

```
Input: n = 4, k = 2
Output:
[
  [2,4],
  [3,4],
  [2,3],
  [1,2],
  [1,3],
  [1,4],
]
```

**Difficulty: Medium**

**Code:**

```java
class Solution {
    public List<List<Integer>> combine(int n, int k) {
        
    }
}
```

## 题意

给定数字n和k，从数字1到n中返回k个数字到所有组合。

<!-- more -->

## Solution 1

这种要求出所有结果的集合，一般都是用调用递归来解。

```java
class Solution {
    public List<List<Integer>> combine(int n, int k) {
        List<List<Integer>> res = new ArrayList<List<Integer>>();
        help(res,n,k,new ArrayList<Integer>(),1);
        return res;
    }
    
    private void help(List<List<Integer>> res,int n, int k, List<Integer> cur, int start){
        if(cur.size()==k){
            res.add(new ArrayList<Integer>(cur));
            return;
        }
        for(int i=start;i<=n;i++){
            cur.add(i);
            help(res,n,k,cur,i+1);
            cur.remove(cur.size()-1);
        }
    }
}
```

**时间复杂度:** O()。

**空间复杂度:** O()。

## Solution 2

结果都是大小为k的数组，i为数组下标，开始给第i位递增给其赋值，然后处理第i+1位，并将其初始值设为第i位第值。

当第i位的值大于n时，说明当前第i位已经遍历完毕，要回去接着遍历i-1位的值。

当i等于k-1时，说明已经找到k个数的组合，加入到结果集中。

当最左侧即第0位的值也超过n时，要去遍历i为-1的值，此时退出循环。

总体来看，当填满1到k时，是先增加最右端的数字，当最右端的数字大于n时，增加其左侧的数字，并将当前值赋值为左侧数字，直到最左侧也超过n，退出循环。

```java
class Solution {
    public List<List<Integer>> combine(int n, int k) {
        List<List<Integer>> res = new ArrayList<List<Integer>>();
        int[] tmp = new int[k];
        int i=0;
        while(i>=0){
            tmp[i]++;
            if(tmp[i]>n){
                i--;
            }else if(i==k-1){
                add(res,tmp);
            }else{
                i++;
                tmp[i]=tmp[i-1];
            }
            
        }
        return res;
    }

    private void add(List<List<Integer>> res, int[] tmp){
        List<Integer> out = new ArrayList<Integer>();
        for(int i:tmp){
            out.add(i);
        }
        res.add(out);
    }
}
```

**时间复杂度:** O()。

**空间复杂度:** O()。

