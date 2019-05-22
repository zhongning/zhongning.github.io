---
title: LeetCode 047 Permutations II
tags:
  - leetcode
  - leetcode-medium
  - leetcode-backtracking
categories:
  - leetcode
abbrlink: 30253
date: 2019-05-22 23:48:20
---

## Description

Given a collection of numbers that might contain duplicates, return all possible unique permutations.

**Example:**

```
Input: [1,1,2]
Output:
[
  [1,1,2],
  [1,2,1],
  [2,1,1]
]
```

**Difficulty: Medium**

**Code:**

```java
class Solution {
    public List<List<Integer>> permuteUnique(int[] nums) {
        
    }
}
```

## 题意

给定一组可能包含重复数字的集合，返回所以不重复的全排列。

<!-- more -->

## Solution 1

笨办法，用Set对结果进行去重。把nums中的数字一个一个添加进结果集，注意当添加一个数字时有多个地方可以插入。

如已有[1,2]，那么3可以放在[3,1,2],[1,3,2],[1,2,3]。

```java
class Solution {
    public List<List<Integer>> permuteUnique(int[] nums) {
        Set<List<Integer>> res = new HashSet<List<Integer>>();
        List<Integer> start = new ArrayList<Integer>();
        start.add(nums[0]);
        res.add(start);
        for(int i=1;i<nums.length;i++){
            Set<List<Integer>> tmp = new HashSet<List<Integer>>();
            for(int j=0;j<=i;j++){
                for(List<Integer> curr:res){
                    List<Integer> copy = new ArrayList<Integer>(curr);
                    copy.add(j,nums[i]);
                    tmp.add(copy);
                }
            }
            res=tmp;
        }
        return new ArrayList<List<Integer>>(res);
    }
}
```

**时间复杂度:** O()。

**空间复杂度:** O()。

## Solution 2

递归，用boolean[]保存某个位置上对数字是否被使用过。

```java
class Solution {
    public List<List<Integer>> permuteUnique(int[] nums) {
        List<List<Integer>> res = new ArrayList<List<Integer>>();
        Arrays.sort(nums);
        helper(res,nums,new ArrayList<Integer>(),new boolean[nums.length]);
        return res;
    }
    
    public void helper(List<List<Integer>> res, int[] nums, List<Integer> curr, boolean[] used){
        if(curr.size()==nums.length){
            res.add(new ArrayList<Integer>(curr));
        }
        for(int i=0;i<nums.length;i++){
            if(used[i]||(i>0&&nums[i]==nums[i-1]&&!used[i-1])) continue;
            curr.add(nums[i]);
            used[i]=true;
            helper(res,nums,curr,used);
            curr.remove(curr.size()-1);
            used[i]=false;
        }
    }
}
```

**时间复杂度:** O()。

**空间复杂度:** O()。

