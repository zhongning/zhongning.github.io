---
title: LeetCode 039 Combination Sum
tags:
  - leetcode
  - leetcode-medium
  - leetcode-array
  - leetcode-backtracking
categories:
  - leetcode
abbrlink: 19748
date: 2019-05-07 21:50:47
---

## Description

Given a set of candidate numbers (candidates) (without duplicates) and a target number (target), find all unique combinations in candidates where the candidate numbers sums to target.

The same repeated number may be chosen from candidates unlimited number of times.

**Note:**

* All numbers (including target) will be positive integers.
* The solution set must not contain duplicate combinations.

**Example 1:**

```
Input: candidates = [2,3,6,7], target = 7,
A solution set is:
[
  [7],
  [2,2,3]
]
```

**Example 2:**

```
Input: candidates = [2,3,5], target = 8,
A solution set is:
[
  [2,2,2,2],
  [2,3,3],
  [3,5]
]
```

**Difficulty: Medium**

**Code:**

```java
class Solution {
    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        
    }
}
```

## 题意

给定几个不重复的候选正整数和一个目标数，求所有不重复组合使得候选数相加等于目标值，候选数可以多次选择。

<!-- more -->

## Solution 1

使用递归，用Set去重，当前已有的数字放入curr的list中，将curr中所有数求和sum，若sum和target一样则加入结果集并返回。

若sum比target大，则不符合条件直接返回。否则遍历候选集，尝试将每个候选数加入当前curr，再去递归判断。

```java
class Solution {
    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        Set<List<Integer>> res = new HashSet<List<Integer>>();
        List<Integer> curr = new ArrayList<Integer>();
        checkAll(candidates,target,res,curr);
        return new ArrayList<List<Integer>>(res);
    }
    
    public void checkAll(int[] candidates, int target, Set<List<Integer>> res, List<Integer> curr){
        int sum = 0;
        for(int num:curr){
            sum+=num;
        }
        if(sum==target){
            Collections.sort(curr);
            res.add(curr);
            return;
        }else if(sum>target){
            return;
        }
        for(int num:candidates){
            List<Integer> tmp = new ArrayList<Integer>();
            tmp.addAll(curr);
            tmp.add(num);
            checkAll(candidates,target,res,tmp);
        }
    }
}
```

**时间复杂度:** O()。

**空间复杂度:** O()。

## Solution 2

解法1的优化，先把候选数组排序，然后增加从候选数组选择数字起始位置start，这样可以避免重复添加。

另外，直接传入target和当前数组的差值，这样不用每次都将当前数组的和算一遍，只保留最新的差值。

最后，为了减少临时数组的创建，递归调用后可以将当前数组删除末尾元素来进行恢复。

```java
class Solution {
    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        List<List<Integer>> res = new ArrayList<List<Integer>>();
        Arrays.sort(candidates);
        checkAll(candidates,res,new ArrayList<Integer>(),target,0);
        return res;
    }
    
    public void checkAll(int[] candidates, List<List<Integer>> res, List<Integer> curr, int remain, int start){
        if(remain==0){
            res.add(new ArrayList<Integer>(curr));
            return;
        }else if(remain<0){
            return;
        }
        for(int i=start;i<candidates.length;i++){
            curr.add(candidates[i]);
            checkAll(candidates,res,curr,remain-candidates[i],i);
            curr.remove(curr.size()-1);
        }
    }
}
```

**时间复杂度:** O()。

**空间复杂度:** O()。

