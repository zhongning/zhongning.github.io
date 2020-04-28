---
title: LeetCode 078 Subsets
tags:
  - leetcode
  - leetcode-medium
  - leetcode-array
  - leetcode-backtracking
  - leetcode-bit-manipulation
categories:
  - leetcode
abbrlink: 46736
date: 2020-04-28 17:04:22
---

## Description

Given a set of distinct integers, nums, return all possible subsets (the power set).

**Note:** The solution set must not contain duplicate subsets.

**Example:**

```
Input: nums = [1,2,3]
Output:
[
  [3],
  [1],
  [2],
  [1,2,3],
  [1,3],
  [2,3],
  [1,2],
  []
]
```

**Difficulty: Medium**

**Code:**

```java
class Solution {
    public List<List<Integer>> subsets(int[] nums) {
        
    }
}
```

## 题意

给定一组不重复的数字，返回所有不重复的子集。

<!-- more -->

## Solution 1

这种要求出所有结果的集合，一般都是用调用递归来解。

```java
class Solution {
    public List<List<Integer>> subsets(int[] nums) {
        List<List<Integer>> res = new ArrayList<List<Integer>>();
        List<Integer> cur = new ArrayList<Integer>();
        helper(nums, res, cur, 0);
        return res;
    }
    
    private void helper(int[] nums, List<List<Integer>> res, List<Integer> cur, int start){
        res.add(new ArrayList<Integer>(cur));
        for(int i=start;i<nums.length;i++){
            cur.add(nums[i]);
            helper(nums, res, cur, i+1);
            cur.remove(cur.size()-1);
        }
    }
}
```

**时间复杂度:** O()。

**空间复杂度:** O()。

## Solution 2

不使用递归，刚开始结果集只有空集，处理1时，就在仅有的空集上加1并加入结果集得到[]和[1]。

处理2时，把结果集中的每个子集都加上2再放入结果集，得到[],[1],[2],[1,2]。

同理处理其他数字，最终返回所有子集。

```java
class Solution {
    public List<List<Integer>> subsets(int[] nums) {
        List<List<Integer>> res = new ArrayList<List<Integer>>();
        res.add(new ArrayList<Integer>());
        for(int i=0;i<nums.length;i++){
            int size = res.size();
            for(int j=0;j<size;j++){
                List<Integer> cur = new ArrayList<Integer>(res.get(j));
                cur.add(nums[i]);
                res.add(cur);
            }
        }
        return res;
    }
}
```

**时间复杂度:** O()。

**空间复杂度:** O()。

