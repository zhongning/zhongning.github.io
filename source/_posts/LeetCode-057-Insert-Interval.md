---
title: LeetCode 057 Insert Interval
tags:
  - leetcode
  - leetcode-hard
  - leetcode-array
  - leetcode-sort
categories:
  - leetcode
abbrlink: 25158
date: 2019-12-11 21:34:36
---

## Description

Given a set of non-overlapping intervals, insert a new interval into the intervals (merge if necessary).

You may assume that the intervals were initially sorted according to their start times.

**Example 1:**

```
Input: intervals = [[1,3],[6,9]], newInterval = [2,5]
Output: [[1,5],[6,9]]
```

**Example 2:**

```
Input: intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
Output: [[1,2],[3,10],[12,16]]
Explanation: Because the new interval [4,8] overlaps with [3,5],[6,7],[8,10].
```

**Difficulty: Hard**

**Code:**

```java
class Solution {
    public int[][] insert(int[][] intervals, int[] newInterval) {
        
    }
}
```

## 题意

给定一系列非重叠对区间，然后插入一个新区间，若和原有区间重叠，则要进行合并操作。

<!-- more -->

## Solution 1

用变量cur来遍历所有区间，若当前区间cur的end比要插入区间的start小，说明没有重叠，直接将当前区间存入结果集。
直到cur到达末尾或者第一次遇到重叠，则退出上述循环。

新进行循环，条件是当前区间cur的start要小于等于要插入区间的end，说明有重叠，那么更新新插入区间的start和end作为两个区间合并后的区间。
直到cur到达末尾或者已经没有重叠，则退出上述循环。

之后将重叠部分合并后的区间即更新后的插入区间放入结果集，并将未遍历的区间也放入结果集。

```java
class Solution {
    public int[][] insert(int[][] intervals, int[] newInterval) {
        int n = intervals.length;
        List<int[]> res = new ArrayList<int[]>();
        int cur = 0;
        while(cur<n && intervals[cur][1]<newInterval[0]){
            res.add(intervals[cur++]);
        }
        while(cur<n && intervals[cur][0]<=newInterval[1]){
            newInterval[0] = Math.min(intervals[cur][0],newInterval[0]);
            newInterval[1] = Math.max(intervals[cur][1],newInterval[1]);
            cur++;
        }
        res.add(newInterval);
        while(cur<n){
            res.add(intervals[cur++]);
        }
        return res.toArray(new int[res.size()][]);
    }
}
```

**时间复杂度:** O(n)。

**空间复杂度:** O(n)。

## Solution 2

使用for循环遍历所有区间，使用count表示合并后的区间插入的位置。

若当前区间的end小于新插入区间的start，说明没有重叠，直接放入结果集并count+1。
若当前区间的start大于新插入区间的end，说明也没有重叠，直接放入结果集。
其他情况说明有重叠，更新新插入的区间的start和end去代表合并后的区间。

最后将最终合并的区间放入结果集适当的位置，即count所在的位置。

```java
class Solution {
    public int[][] insert(int[][] intervals, int[] newInterval) {
        int n = intervals.length;
        List<int[]> res = new ArrayList<int[]>();
        int count = 0;
        int[] cur = null;
        for(int i=0;i<n;i++){
            cur = intervals[i];
            if(cur[1]<newInterval[0]){
                res.add(cur);
                count++;
            }else if(cur[0]>newInterval[1]){
                res.add(cur);
            }else{
                newInterval[0]=Math.min(cur[0],newInterval[0]);
                newInterval[1]=Math.max(cur[1],newInterval[1]);
            }
        }
        res.add(count, newInterval);
        return res.toArray(new int[res.size()][]);
    }
}
```

**时间复杂度:** O(n)。

**空间复杂度:** O(n)。

