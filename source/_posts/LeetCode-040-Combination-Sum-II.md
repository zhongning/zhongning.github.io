---
title: LeetCode 040 Combination Sum II
tags:
  - leetcode
  - leetcode-medium
  - leetcode-array
  - leetcode-backtracking
categories:
  - leetcode
abbrlink: 55336
date: 2019-05-08 22:54:51
---

## Description

Given a collection of candidate numbers (candidates) and a target number (target), find all unique combinations in candidates where the candidate numbers sums to target.

Each number in candidates may only be used once in the combination.

**Note:**

* All numbers (including target) will be positive integers.
* The solution set must not contain duplicate combinations.

**Example 1:**

```
Input: candidates = [10,1,2,7,6,1,5], target = 8,
A solution set is:
[
  [1, 7],
  [1, 2, 5],
  [2, 6],
  [1, 1, 6]
]
```

**Example 2:**

```
Input: candidates = [2,5,2,1,2], target = 5,
A solution set is:
[
  [1,2,2],
  [5]
]
```

**Difficulty: Medium**

**Code:**

```java
class Solution {
    public List<List<Integer>> combinationSum2(int[] candidates, int target) {
        
    }
}
```

## 题意

给定一系列候选数字candidates和目标值target，找出所有的不重复组合使得候选数字组合的和等于目标值。

一个组合中每个候选数字元素只能使用一次，所有数字均为正整数，不能包含重复的组合。

<!-- more -->

## Solution 1

与第39题类似，多了一个要求是候选元素只能使用一次，但候选元素之间可以重复。

同样使用递归，在递归中，遍历候选元素添加时，判断在选择当前位上数时，若从候选数字中后一个元素和前一个元素相同则跳过，因为之前已经在当前位上添加过该元素，完成去重。

并且已经递归调用时，候选元素但起始位置在当前元素上加1，同一个元素不会使用多次。

```java
class Solution {
    public List<List<Integer>> combinationSum2(int[] candidates, int target) {
        List<List<Integer>> res = new ArrayList<List<Integer>>();
        Arrays.sort(candidates);
        resolve(res,new ArrayList<Integer>(),candidates,target,0);
        return res;
    }
    
    public void resolve(List<List<Integer>> res, List<Integer> curr, int[] candidates, int remain, int start){
        if(remain==0){
            res.add(new ArrayList<Integer>(curr));
            return;
        }else if(remain<0){
            return;
        }
        for(int i=start;i<candidates.length;i++){
            if(candidates[i]>remain) return;
            if(i>start&&candidates[i]==candidates[i-1]) continue;
            curr.add(candidates[i]);
            resolve(res,curr,candidates,remain-candidates[i],i+1);
            curr.remove(curr.size()-1);
        }
    }
}
```

**时间复杂度:** O()。

**空间复杂度:** O()。
