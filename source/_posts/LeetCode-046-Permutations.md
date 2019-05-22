---
title: LeetCode 046 Permutations
tags:
  - leetcode
  - leetcode-medium
  - leetcode-backtracking
categories:
  - leetcode
abbrlink: 6792
date: 2019-05-21 23:33:04
---

## Description

Given a collection of distinct integers, return all possible permutations.

**Example:**

```
Input: [1,2,3]
Output:
[
  [1,2,3],
  [1,3,2],
  [2,1,3],
  [2,3,1],
  [3,1,2],
  [3,2,1]
]
```

**Difficulty: Medium**

**Code:**

```java
class Solution {
    public List<List<Integer>> permute(int[] nums) {
        
    }
}
```

## 题意

给定一系列非重复数字，返回全排列。

<!-- more -->

## Solution 1

使用递归，代码如下。

```java
class Solution {
    public List<List<Integer>> permute(int[] nums) {
        List<List<Integer>> res = new ArrayList<List<Integer>>();
        helper(res,new ArrayList<Integer>(),nums);
        return res;
    }
    
    public void helper(List<List<Integer>> res, List<Integer> curr, int[] nums){
        if(curr.size()==nums.length){
            res.add(new ArrayList<Integer>(curr));
        }
        for(int i=0;i<nums.length;i++){
            int num = nums[i];
            if(curr.contains(num)) continue;
            curr.add(num);
            helper(res,curr,nums);
            curr.remove(curr.size()-1);
        }
    }
}
```

**时间复杂度:** O()。

**空间复杂度:** O()。

## Solution 2

笨办法，把nums中的数字一个一个添加进结果集，注意当添加一个数字时有多个地方可以插入。

如已有[1,2]，那么3可以放在[3,1,2],[1,3,2],[1,2,3]。

```java
class Solution {
    public List<List<Integer>> permute(int[] nums) {
        List<List<Integer>> res = new ArrayList<List<Integer>>();
        List<Integer> start = new ArrayList<Integer>();
        start.add(nums[0]);
        res.add(start);
        for(int i=1;i<nums.length;i++){
            List<List<Integer>> tmp = new ArrayList<List<Integer>>();
            for(int j=0;j<=i;j++){
                for(List<Integer> curr:res){
                    List<Integer> copy = new ArrayList<Integer>(curr);
                    copy.add(j,nums[i]);
                    tmp.add(copy);
                }
            }
            res=tmp;
        }
        return res;
    }
}
```

**时间复杂度:** O()。

**空间复杂度:** O()。

