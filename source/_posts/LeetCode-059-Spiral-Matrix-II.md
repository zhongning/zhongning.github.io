---
title: LeetCode 059 Spiral Matrix II
tags:
  - leetcode
  - leetcode-medium
  - leetcode-array
categories:
  - leetcode
abbrlink: 5021
date: 2019-12-12 18:03:46
---

## Description

Given a positive integer n, generate a square matrix filled with elements from 1 to n2 in spiral order.

**Example:**

```
Input: 3
Output:
[
 [ 1, 2, 3 ],
 [ 8, 9, 4 ],
 [ 7, 6, 5 ]
]
```

**Difficulty: Medium**

**Code:**

```java
class Solution {
    public int[][] generateMatrix(int n) {
        
    }
}
```

## 题意

给定正整数n，生成一个正方形矩阵，用从1到n的平方以螺旋到方式进行填充。

<!-- more -->

## Solution 1

注意上右下左四条边up、right、down、left。

1、在上边up上，从左向右即left到right开始填充，结束后up向下移，并判断若up大于down则退出
2、在右边right上，从上向下即up到down开始填充，结束后right向左移，并判断若right小于left则退出
3、在下边down上，从右向左即right到left开始填充，结束后down向上移，并判断若down小于up则退出
4、在左边left上，从下向上即down到up开始填充，结束后left向右移，并判断若left大于right则退出

继续循环，直至满足退出条件，此时所以元素都已经按照螺旋到方式填充完成。

```java
class Solution {
    public int[][] generateMatrix(int n) {
        int[][] res = new int[n][n];
        int up=0, down=n-1, left=0, right=n-1;
        int num = 1;
        while(true){
            for(int i=left;i<=right;i++) res[up][i]=num++;
            if(++up>down) break;
            
            for(int i=up;i<=down;i++) res[i][right]=num++;
            if(--right<left) break;
            
            for(int i=right;i>=left;i--) res[down][i]=num++;
            if(--down<up) break;
            
            for(int i=down;i>=up;i--) res[i][left]=num++;
            if(++left>right) break;
        }
        return res;
    }
}
```

**时间复杂度:** O(n2)。

**空间复杂度:** O(n2)。
