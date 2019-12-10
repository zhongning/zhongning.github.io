---
title: LeetCode 056 Merge Intervals
tags:
  - leetcode
  - leetcode-medium
  - leetcode-array
  - leetcode-sort
categories:
  - leetcode
abbrlink: 8023
date: 2019-12-10 21:34:07
---

## Description

Given a collection of intervals, merge all overlapping intervals.

**Example 1:**

```
Input: [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]
Explanation: Since intervals [1,3] and [2,6] overlaps, merge them into [1,6].
```

**Example 2:**

```
Input: [[1,4],[4,5]]
Output: [[1,5]]
Explanation: Intervals [1,4] and [4,5] are considered overlapping.
```

**Difficulty: Medium**

**Code:**

```java
class Solution {
    public int[][] merge(int[][] intervals) {
        
    }
}
```

## 题意

给定一组区间，要求合并所有重叠的区间。

<!-- more -->

## Solution 1

先将区间进行排序，用每个区间的起始位置进行比较。

将第一个区间存入结果集，循环遍历所有区间。

若当前区间和结果集中最后一个区间有重叠，那么修改最后一个区间的end，其值为两个区间end的最大值。

若无重叠，则直接将当前区间存入结果集，其作为结果集中最后一个区间。

```java
class Solution {
    public int[][] merge(int[][] intervals) {
        if(intervals==null||intervals.length<2) return intervals;
        Arrays.sort(intervals,(i1,i2) -> Integer.compare(i1[0],i2[0]));
        List<int[]> res = new ArrayList<int[]>();
        int[] newInterval = intervals[0];
        res.add(newInterval);
        for(int[] interval:intervals){
            if(interval[0]<=newInterval[1]){
                newInterval[1]=Math.max(newInterval[1],interval[1]);
            }else{
                newInterval = interval;
                res.add(newInterval);
            }
        }
        return res.toArray(new int[res.size()][2]);
    }
}
```

**时间复杂度:** O(n)。

**空间复杂度:** O(n)。

## Solution 2

将每个区间的起始位置和结束位置分别存入数组starts和ends，并分别对其进行排序。

令i，j起始为0，start[i+1]若比前一个位置end[i]大，说明区间不连续，可以直接{start[j],end[i]}添加到结果集。

j为上一个不连续区间的下一个位置。

注意：若区间为[[8,19],[15,18]]，则starts为[8,15]，ends为[19,18]，那么分别排序后starts为[8,15]，ends为[18,19]，对结果没有影响。

```java
class Solution {
    public int[][] merge(int[][] intervals) {
        if(intervals==null||intervals.length<2) return intervals;
        List<int[]> res = new ArrayList<int[]>();
        int[] starts = new int[intervals.length];
        int[] ends = new int[intervals.length];
        for(int i=0;i<intervals.length;i++){
            starts[i]=intervals[i][0];
            ends[i]=intervals[i][1];
        }
        Arrays.sort(starts);
        Arrays.sort(ends);
        for(int i=0,j=0;i<intervals.length;i++){
            if(i==intervals.length-1||starts[i+1]>ends[i]){
                res.add(new int[]{starts[j],ends[i]});
                j=i+1;
            }
        }
        return res.toArray(new int[res.size()][2]);
    }
}
```

**时间复杂度:** O(n)。

**空间复杂度:** O(n)。

