---
title: LeetCode 052 N-Queens II
tags:
  - leetcode
  - leetcode-hard
  - backtracking
categories:
  - leetcode
abbrlink: 23032
date: 2019-11-19 19:03:25
---

## Description

The n-queens puzzle is the problem of placing n queens on an n×n chessboard such that no two queens attack each other.

![pic](https://assets.leetcode.com/uploads/2018/10/12/8-queens.png)

Given an integer n, return the number of distinct solutions to the n-queens puzzle.

**Example:**

```
Input: 4
Output: 2
Explanation: There are two distinct solutions to the 4-queens puzzle as shown below.
[
 [".Q..",  // Solution 1
  "...Q",
  "Q...",
  "..Q."],

 ["..Q.",  // Solution 2
  "Q...",
  "...Q",
  ".Q.."]
]
```

**Difficulty: Hard**

**Code:**

```java
class Solution {
    public int totalNQueens(int n) {
        
    }
}
```

## 题意

N皇后问题，将n个皇后放在nxn的棋盘上，保证任意两个皇后不能相互攻击。

给定正整数n，求不重复的N皇后问题答案的个数。

<!-- more -->

## Solution 1

这道题和上一题一样，只需要返回结果数量更加简单，可以用上一题的解法。

```java
class Solution {
    public int totalNQueens(int n) {
        char[][] board = new char[n][n];
        for(int i=0;i<n;i++){
            for(int j=0;j<n;j++){
                board[i][j]='.';
            }
        }
        List<List<String>> res = new ArrayList<List<String>>();
        helper(res,board,0);
        return res.size();
    }
    
    public void helper(List<List<String>> res,char[][] board,int row){
        if(row==board.length){
            res.add(convert(board));
            return;
        }
        for(int col=0;col<board.length;col++){
            if(valid(board, row, col)){
                board[row][col]='Q';
                helper(res,board,row+1);
                board[row][col]='.';
            }
        }
    }
    
    public boolean valid(char[][] board, int row, int col){
        for(int i=0;i<board.length;i++){
            for(int j=0;j<board.length;j++){
                if(board[i][j]=='Q'){
                    if(i==row||j==col||i-row==j-col||i-row==col-j){
                        return false;
                    }
                }
            }
        }
        return true;
    }
    
    public List<String> convert(char[][] board){
        List<String> res = new ArrayList<String>();
        for(int i=0;i<board.length;i++){
            String row = new String(board[i]);
            res.add(row);
        }
        return res;
    }
}
```

**时间复杂度:** O()。

**空间复杂度:** O()。

## Solution 2

我们并不需要知道每一行皇后的具体位置，而只需要知道会不会产生冲突即可。

对于每行要新加的位置，需要看跟之前的列，对角线，及逆对角线之间是否有冲突。

同一条对角线上的点，其横坐标减纵坐标都相等（要保证数组边界）。同一条逆对角线，其横坐标加纵坐标都相等。

```java
class Solution {
    int res = 0;
    boolean[] cols;
    boolean[] posDiag;
    boolean[] negDiag;
    
    public int totalNQueens(int n) {
        cols = new boolean[n];
        posDiag = new boolean[2*n-1];
        negDiag = new boolean[2*n-1];
        dfs(0,n);
        return res;
    }
    
    private void dfs(int row, int n){
        if(row==n){
            res++;
            return;
        }
        for(int col=0;col<n;col++){
            if(valid(row,col,n)){
                update(row,col,n,true);
                dfs(row+1,n);
                update(row,col,n,false);
            }
        }
    }
    
    private void update(int row, int col, int n, boolean used){
        cols[col]=used;
        posDiag[row+col]=used;
        negDiag[row-col+n-1]=used;
        
    }
    
    private boolean valid(int row, int col, int n){
        return !cols[col] && !posDiag[row+col] && !negDiag[row-col+n-1];
    }
}
```

**时间复杂度:** O()。

**空间复杂度:** O()。

