---
title: LeetCode 048 Rotate Image
tags:
  - leetcode
  - leetcode-medium
  - leetcode-array
categories:
  - leetcode
abbrlink: 41135
date: 2019-05-28 22:11:03
---

## Description

You are given an n x n 2D matrix representing an image.

Rotate the image by 90 degrees (clockwise).

**Note:**

You have to rotate the image in-place, which means you have to modify the input 2D matrix directly. DO NOT allocate another 2D matrix and do the rotation.

**Example 1:**

```
Given input matrix = 
[
  [1,2,3],
  [4,5,6],
  [7,8,9]
],

rotate the input matrix in-place such that it becomes:
[
  [7,4,1],
  [8,5,2],
  [9,6,3]
]
```

**Example 2:**

```
Given input matrix =
[
  [ 5, 1, 9,11],
  [ 2, 4, 8,10],
  [13, 3, 6, 7],
  [15,14,12,16]
], 

rotate the input matrix in-place such that it becomes:
[
  [15,13, 2, 5],
  [14, 3, 4, 1],
  [12, 6, 8, 9],
  [16, 7,10,11]
]
```

**Difficulty: Medium**

**Code:**

```java
class Solution {
    public void rotate(int[][] matrix) {
        
    }
}
```

## 题意

给定一个n x n的二维矩阵表示一张图片，将图片顺时针旋转90度。要求直接修改二维矩阵，不允许使用额外的二维矩阵去做旋转。

<!-- more -->

## Solution 1

可以一层层从最外层到最内层进行旋转，递归调用直到到达最内层。

例如在最外层level为0，则要调整的起始位置为matrix[level][level]到matrix[level][len-level-1]。

从这几个点出发，旋转一周即调整4条边上的值即可。针对当前点matrix[row][col]，其应该调整到matrix[col][len-row-1]。

```java
class Solution {
    public void rotate(int[][] matrix) {
        int n=matrix.length;
        helper(matrix,n,0);
    }
    
    public void helper(int[][] matrix, int len, int level){
        if(level>=len/2) return;
        for(int i=level;i<len-level-1;i++){
            int curr=matrix[level][i];
            int nextRow=i, nextCol=len-level-1;
            for(int j=0;j<4;j++){
                int next = matrix[nextRow][nextCol];
                matrix[nextRow][nextCol]=curr;
                curr=next;
                int tmp=nextRow;
                nextRow=nextCol;
                nextCol=len-tmp-1;
            }
        }
        helper(matrix,len,level+1);
    }
}
```

**时间复杂度:** O()。

**空间复杂度:** O()。

## Solution 2

不用递归，直接在一个方法中完成，i为行数，j为列数。

```
1  2  3                 7  2  1                 7  4  1

4  5  6      -->        4  5  6      -->        8  5  2　　

7  8  9                 9  8  3　　　            9  6  3
```

```java
class Solution {
    public void rotate(int[][] matrix) {
        int n=matrix.length;
        for(int i=0;i<n/2;i++){
            for(int j=i;j<n-i-1;j++){
                int tmp=matrix[i][j];
                matrix[i][j]=matrix[n-j-1][i];
                matrix[n-j-1][i]=matrix[n-i-1][n-j-1];
                matrix[n-i-1][n-j-1]=matrix[j][n-i-1];
                matrix[j][n-i-1]=tmp;
            }
        }
    }
}
```

**时间复杂度:** O()。

**空间复杂度:** O()。

## Solution 3

先将矩阵以对角线为轴翻转，在以x轴中线上下翻转即可。

```
1  2  3　　　 　　 9  6  3　　　　　   7  4  1

4  5  6　　-->　　 8  5  2　　 -->    8  5  2

7  8  9 　　　 　　7  4  1　　　　　   9  6  3
```

```java
class Solution {
    public void rotate(int[][] matrix) {
        int n=matrix.length;
        for(int i=0;i<n-1;i++){
            for(int j=0;j<n-i;j++){
                int tmp=matrix[i][j];
                matrix[i][j]=matrix[n-j-1][n-i-1];
                matrix[n-j-1][n-i-1]=tmp;
            }
        }
        for(int i=0;i<n/2;i++){
            for(int j=0;j<n;j++){
                int tmp = matrix[i][j];
                matrix[i][j]=matrix[n-i-1][j];
                matrix[n-i-1][j]=tmp;
            }
        }
    }
}
```

**时间复杂度:** O()。

**空间复杂度:** O()。

## Solution 4

先将矩阵转置，再对每一行进行翻转。

```
1  2  3　　　 　　 1  4  7　　　　　    7  4  1

4  5  6　　-->　　 2  5  8　　 -->  　 8  5  2　　

7  8  9 　　　 　　3  6  9            9  6  3
```

```java
class Solution {
    public void rotate(int[][] matrix) {
        int n=matrix.length;
        for(int i=0;i<n;i++){
            for(int j=i+1;j<n;j++){
                int tmp=matrix[i][j];
                matrix[i][j]=matrix[j][i];
                matrix[j][i]=tmp;
            }
        }
        for(int i=0;i<n;i++){
            for(int j=0;j<n/2;j++){
                int tmp = matrix[i][j];
                matrix[i][j]=matrix[i][n-j-1];
                matrix[i][n-j-1]=tmp;
            }
        }
    }
}
```

**时间复杂度:** O()。

**空间复杂度:** O()。
