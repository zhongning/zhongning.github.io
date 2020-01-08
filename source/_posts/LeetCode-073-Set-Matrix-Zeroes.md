---
title: LeetCode 073 Set Matrix Zeroes
tags:
  - leetcode
  - leetcode-medium
  - leetcode-array
categories:
  - leetcode
abbrlink: 53382
date: 2020-01-07 22:12:31
---

## Description

Given a m x n matrix, if an element is 0, set its entire row and column to 0. Do it in-place.

**Example 1:**

```
Input: 
[
  [1,1,1],
  [1,0,1],
  [1,1,1]
]
Output: 
[
  [1,0,1],
  [0,0,0],
  [1,0,1]
]
```

**Example 2:**

```
Input: 
[
  [0,1,2,0],
  [3,4,5,2],
  [1,3,1,5]
]
Output: 
[
  [0,0,0,0],
  [0,4,5,0],
  [0,3,1,0]
]
```

**Follow Up**
* A straight forward solution using O(mn) space is probably a bad idea.
* A simple improvement uses O(m + n) space, but still not the best solution.
* Could you devise a constant space solution?

**Difficulty: Medium**

**Code:**

```java
class Solution {
    public void setZeroes(int[][] matrix) {
        
    }
}
```

## 题意

对于一个m乘n的矩阵，若某个元素为0，将其所在行和列都置成0。

<!-- more -->

## Solution 1

使用另外一个m乘n的数组res去标记最终结果中该位置是否是0，用1表示为0。

遍历矩阵数组，当前位置为0时，对该行该列所有元素在res用1标记。

最后再次遍历矩阵数组，若对应res中为1，则将其值置为0。

```java
class Solution {
    public void setZeroes(int[][] matrix) {
        int m = matrix.length, n = matrix[0].length;
        int[][] res = new int[m][n];
        for(int i=0;i<m;i++){
            for(int j=0;j<n;j++){
                if(matrix[i][j]==0){
                    helper(matrix,res,i,j);
                }
            }
        }
        for(int i=0;i<m;i++){
            for(int j=0;j<n;j++){
                if(res[i][j]==1){
                    matrix[i][j]=0;
                }
            }
        }
    }
    
    public void helper(int[][] matrix, int[][] res, int row, int col){
        for(int i=0;i<matrix.length;i++){
            res[i][col]=1;
        }
        for(int i=0;i<matrix[0].length;i++){
            res[row][i]=1;
        }
    }
}
```

**时间复杂度:** O(mn)。

**空间复杂度:** O(mn)。

## Solution 2

将其优化到O(m+n)的方法是，用一个长度为m的一维数组记录各行中是否有0，用一个长度为n的一维数组记录各列中是否有0，最后直接更新matrix数组即可。

```java
class Solution {
    public void setZeroes(int[][] matrix) {
        int m=matrix.length, n=matrix[0].length;
        boolean[] rowFlag = new boolean[m];
        boolean[] colFlag = new boolean[n];
        for(int i=0;i<m;i++){
            for(int j=0;j<n;j++){
                if(matrix[i][j]==0){
                    rowFlag[i]=true;
                    colFlag[j]=true;
                }
            }
        }
        
        for(int i=0;i<m;i++){
            for(int j=0;j<n;j++){
                if(rowFlag[i]||colFlag[j]) matrix[i][j]=0;
            }
        }
    }
}
```

**时间复杂度:** O(mn)。

**空间复杂度:** O(m+n)。

## Solution 3

在上述解法的基础上继续优化空间为O(1)，用每一行的第一个元素标识该行是否有0，使用每一列的第一个元素标识该列是否有0。

但是这样的话第一行和第一列会在左上角有冲突，那么另外定义变量col0表示第一列自身是否有0。

先从第一行往最后一行从左到右遍历，碰到元素为0，修改一行和第一列对应的标识为0。

然后从最后一行到第一行从右向左遍历，若第一行和第一列对应的标识为0，则将其置为0，同时对第一列根据col0修改。

```java
class Solution {
    public void setZeroes(int[][] matrix) {
        int m=matrix.length, n=matrix[0].length;
        int col0 = 1;
        
        for(int i=0;i<m;i++){
            if(matrix[i][0]==0) col0=0;
            for(int j=1;j<n;j++){
                if(matrix[i][j]==0){
                    matrix[i][0]=0;
                    matrix[0][j]=0;
                }
            }
        }
        
        for(int i=m-1;i>=0;i--){
            for(int j=n-1;j>=1;j--){
                if(matrix[i][0]==0||matrix[0][j]==0) matrix[i][j]=0;
            }
            if(col0==0) matrix[i][0]=0;
        }
    }
}
```

**时间复杂度:** O(mn)。

**空间复杂度:** O(1)。
