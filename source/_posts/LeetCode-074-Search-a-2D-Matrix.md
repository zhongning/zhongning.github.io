---
title: LeetCode 074 Search a 2D Matrix
tags:
  - leetcode
  - leetcode-medium
  - leetcode-array
  - leetcode-binary-search
categories:
  - leetcode
abbrlink: 5854
date: 2020-01-13 18:58:56
---

## Description

Write an efficient algorithm that searches for a value in an m x n matrix. This matrix has the following properties:

* Integers in each row are sorted from left to right.
* The first integer of each row is greater than the last integer of the previous row.

**Example 1:**

```
Input:
matrix = [
  [1,   3,  5,  7],
  [10, 11, 16, 20],
  [23, 30, 34, 50]
]
target = 3
Output: true
```

**Example 2:**

```
Input:
matrix = [
  [1,   3,  5,  7],
  [10, 11, 16, 20],
  [23, 30, 34, 50]
]
target = 13
Output: false
```

**Difficulty: Medium**

**Code:**

```java
class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {
        
    }
}
```

## 题意

在m乘n对矩阵中，检索一个数字是否存在。矩阵中每一行从左到右是从小到大排列的，一行的第一个数字比上一行最后一个数字大。

<!-- more -->

## Solution 1

首先当矩阵为空，或者目标target不在矩阵首尾两个数之间时，直接返回false。

先用二分查找找出target所在的行row，再用二分查找在第row行查找目标target。

当查找所在行时，循环条件为start<end，mid为(start+end+1)/2，mid行第一个元素值为val。退出循环时，start=end，返回start即可。
* 若val等于target，则返回所在行mid
* 若val大于target，则end设为mid-1
* 若val小于target，则start设为mid

当在第row行查找所在列时，循环条件为start<=end，mid为(start+end)/2，row行下标mid元素值为val。退出循环时，表示没有找到，返回null。
* 若val等于target，则返回所在行mid
* 若val大于target，则end设为mid-1
* 若val小于target，则start设为mid+1

```java
class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {
        if(matrix==null || matrix.length==0 || matrix[0].length==0) return false;
        int m = matrix.length, n = matrix[0].length;
        if(matrix[0][0]>target||matrix[m-1][n-1]<target) return false;
        int row = searchRow(matrix, target, 0, m-1);
        Integer col = searchCol(matrix, target, row, 0, n-1);
        if(col==null) return false;
        return true;
    }
    
    public int searchRow(int[][] matrix, int target, int start, int end){
        while(start<end){
            int mid = (start+end+1)/2;
            int val = matrix[mid][0];
            if(val==target){
                return mid;
            }else if(val>target){
                end=mid-1;
            }else{
                start=mid;
            }
        }
        return start;
    }
    
    public Integer searchCol(int[][] matrix, int target, int row, int start, int end){
        while(start<=end){
            int mid = (start+end)/2;
            int val = matrix[row][mid];
            if(val==target){
                return mid;
            }else if(val>target){
                end=mid-1;
            }else{
                start=mid+1;
            }
        }
        return null;
    }
}
```

**时间复杂度:** O(log2 mn)。

**空间复杂度:** O(1)。

## Solution 2

同样在第一列上先用一次二分查找法找到目标值所在的行的位置，然后在该行上再用一次二分查找法来找是否存在目标值。

如果是查找第一个不小于目标值的数，当target在第一列时，会返回target所在的行，但若target不在的话，有可能会返回下一行，不好统一。所以可以查找第一个大于目标值的数，这样只要回退一个，就一定是target所在的行。

```java
class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {
        if(matrix==null || matrix.length==0 || matrix[0].length==0) return false;
        int m = matrix.length, n = matrix[0].length;
        if(matrix[0][0]>target||matrix[m-1][n-1]<target) return false;
        int row = searchRow(matrix, target, 0, m-1);
        Integer col = searchCol(matrix, target, row, 0, n-1);
        if(col==null) return false;
        return true;
    }
    
    public int searchRow(int[][] matrix, int target, int start, int end){
        while(start<end){
            int mid = (start+end+1)/2;
            int val = matrix[mid][0];
            if(val==target){
                return mid;
            }else if(val>target){
                end=mid-1;
            }else{
                start=mid;
            }
        }
        return start;
    }
    
    public Integer searchCol(int[][] matrix, int target, int row, int start, int end){
        while(start<=end){
            int mid = (start+end)/2;
            int val = matrix[row][mid];
            if(val==target){
                return mid;
            }else if(val>target){
                end=mid-1;
            }else{
                start=mid+1;
            }
        }
        return null;
    }
}
```

**时间复杂度:** O(log2 mn)。

**空间复杂度:** O(1)。

## Solution 3

使用双指针也是可以的，初始化时i指向第一行，j指向最后一列。

* 若matrix[i][j]与target相等直接返回true
* 若matrix[i][j]小于target则要递增一行i++
* 若大于target则说明只会在当前行对前部出现，往前移动j--

最后若退出循环也没找到则说明不存在返回false。

```java
class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {
        if(matrix==null || matrix.length==0 || matrix[0].length==0) return false;
        int m = matrix.length, n = matrix[0].length;
        int i=0, j=n-1;
        while(i<m&&j>=0){
            int cur = matrix[i][j];
            if(cur==target) return true;
            if(cur>target){
                j--;
            }else{
                i++;
            }
        }
        return false;
    }
}
```

**时间复杂度:** O(m+n)。

**空间复杂度:** O(1)。

## Solution 4

直接将整个矩阵当作有序数组，最左侧是右下角元素下标为0，最右侧是右下角元素下标为m*n-1。

mid设为(left+right)/2，其在矩阵中对位置为`matrix[mid/n][mid%n]`，然后据此进行二分查找。

```java
class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {
        if(matrix==null || matrix.length==0 || matrix[0].length==0) return false;
        int m = matrix.length, n = matrix[0].length;
        int left = 0, right = m*n-1;
        while(left<=right){
            int mid=(left+right)/2;
            int val = matrix[mid/n][mid%n];
            if(val==target){
                return true;
            }else if(val>target){
                right=mid-1;
            }else{
                left=mid+1;
            }
        }
        return false;
    }
}
```

**时间复杂度:** O(log2 mn)。

**空间复杂度:** O(1)。
