---
title: LeetCode 054 Spiral Matrix
tags:
  - leetcode
  - leetcode-medium
  - leetcode-array
categories:
  - leetcode
abbrlink: 57431
date: 2019-11-25 21:19:36
---

## Description

Given a matrix of m x n elements (m rows, n columns), return all elements of the matrix in spiral order.

**Example 1:**

```
Input:
[
 [ 1, 2, 3 ],
 [ 4, 5, 6 ],
 [ 7, 8, 9 ]
]
Output: [1,2,3,6,9,8,7,4,5]
```

**Example 2:**

```
Input:
[
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9,10,11,12]
]
Output: [1,2,3,4,8,12,11,10,9,5,6,7]
```

**Difficulty: Medium**

**Code:**

```java
class Solution {
    public List<Integer> spiralOrder(int[][] matrix) {
        
    }
}
```

## 题意

给定m x n的矩阵，按照螺旋的顺序返回所有元素。

<!-- more -->

## Solution 1

cc表示螺旋总的环数，i表示当前的环数，p为当前环的宽度，q为当前环的高度。

对每个环按顺序遍历四条边，当p或q为1时，表示最后一环只有一行或者一列，可以跳出循环。

```java
class Solution {
    public List<Integer> spiralOrder(int[][] matrix) {
        List<Integer> res = new ArrayList<Integer>();
        if(matrix.length==0||matrix[0].length==0) return res;
        int m = matrix.length, n = matrix[0].length;
        int c = Math.min((m+1)/2,(n+1)/2);
        int p = m, q = n;
        for(int i=0;i<c;i++,p-=2,q-=2){
            for(int col=i;col<i+q;col++){
                res.add(matrix[i][col]);
            }
            for(int row=i+1;row<i+p;row++){
                res.add(matrix[row][i+q-1]);
            }
            if(p==1||q==1) break;
            for(int col=i+q-2;col>=i;col--){
                res.add(matrix[i+p-1][col]);
            }
            for(int row=i+p-2;row>i;row--){
                res.add(matrix[row][i]);
            }
        }
        return res;
    }
}
```

**时间复杂度:** O()。

**空间复杂度:** O()。

## Solution 2

注意四条边对变化，上边是up初始化0，下边down初始化m-1，左边left初始化0，右边right初始化n-1。

进行while循环，先遍历上边，结束后将上边加1，若上边大于下边说明遍历结束。其他边同理。

```java
class Solution {
    public List<Integer> spiralOrder(int[][] matrix) {
        List<Integer> res = new ArrayList<Integer>();
        if(matrix.length==0||matrix[0].length==0) return res;
        int m = matrix.length, n = matrix[0].length;
        int up = 0, down = m-1, left = 0, right = n-1;
        while(true){
            for(int i=left;i<=right;i++) res.add(matrix[up][i]);
            if(++up>down) break;
            for(int i=up;i<=down;i++) res.add(matrix[i][right]);
            if(--right<left) break;
            for(int i=right;i>=left;i--) res.add(matrix[down][i]);
            if(--down<up) break;
            for(int i=down;i>=up;i--) res.add(matrix[i][left]);
            if(++left>right) break;
        }
        return res;
    }
}
```

**时间复杂度:** O()。

**空间复杂度:** O()。

