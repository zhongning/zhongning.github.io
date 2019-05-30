---
title: LeetCode 051 N-Queens
tags:
  - leetcode
  - leetcode-hard
  - leetcode-backtracking
categories:
  - leetcode
abbrlink: 55521
date: 2019-05-29 21:43:39
---

## Description

The n-queens puzzle is the problem of placing n queens on an n×n chessboard such that no two queens attack each other.

![pic](https://assets.leetcode.com/uploads/2018/10/12/8-queens.png)

Given an integer n, return all distinct solutions to the n-queens puzzle.

Each solution contains a distinct board configuration of the n-queens' placement, where 'Q' and '.' both indicate a queen and an empty space respectively.

**Example:**

```
Input: 4
Output: [
 [".Q..",  // Solution 1
  "...Q",
  "Q...",
  "..Q."],

 ["..Q.",  // Solution 2
  "Q...",
  "...Q",
  ".Q.."]
]
Explanation: There exist two distinct solutions to the 4-queens puzzle as shown above.
```

**Difficulty: Hard**

**Code:**

```java
class Solution {
    public List<List<String>> solveNQueens(int n) {
        
    }
}
```

## 题意

N皇后问题，将n个皇后放在nxn的棋盘上，保证任意两个皇后不能相互攻击。

国际象棋中，皇后不仅能横竖走，还能走两个斜线。诞生八皇后问题，在一个8x8的棋盘上才能放8个皇后，保证不能相互攻击，即不能处于同一横线、竖线、斜线上。

给定正整数n，求不重复的N皇后问题答案。'Q','.'分别表示棋盘上的皇后和空格。

<!-- more -->

## Solution 1

使用递归列出所有符合条件的棋盘，从第0列开始，每列最多只能放一个皇后。

在第colIndex列，从每一行选择一个点进行检查，看如果在这一行及colIndex列的位置上放入皇后，棋盘是否还是有效。

若有效，则将这一点先置成'Q'，然后往下一列进行递归，递归后再将这一点还原便于其他行判断。直到检查超出棋盘最后一列，则说明已经全部放置完毕，将棋盘格式化后加入结果集。

对棋盘是否有效对判断方法是，因为用列递归，所以只用判断棋盘已有对皇后是否和新对皇后处于同一行或同一对角线上。

```java
class Solution {
    public List<List<String>> solveNQueens(int n) {
        char[][] board = new char[n][n];
        for(int i=0;i<n;i++){
            for(int j=0;j<n;j++){
                board[i][j]='.';
            }
        }
        List<List<String>> res = new ArrayList<List<String>>();
        dfs(board,0,res);
        return res;
    }
    
    private void dfs(char[][] board, int colIndex, List<List<String>> res){
        if(colIndex==board.length){
            res.add(construct(board));
            return;
        }
        
        for(int i=0;i<board.length;i++){
            if(validate(board,i,colIndex)){
                board[i][colIndex]='Q';
                dfs(board,colIndex+1,res);
                board[i][colIndex]='.';
            }
        }
    }
    
    private boolean validate(char[][] board,int row,int col){
        for(int i=0;i<board.length;i++){
            for(int j=0;j<col;j++){
                if(board[i][j]=='Q'&&(i==row||row-i==col-j||i-row==col-j)){
                    return false;
                }
            }
        }
        return true;
    }
    
    private List<String> construct(char[][] board){
        List<String> res = new ArrayList<String>();
        for(int i=0;i<board.length;i++){
            res.add(new String(board[i]));
        }
        return res;
    }
}
```

**时间复杂度:** O()。

**空间复杂度:** O()。

## Solution 2



```java

```

**时间复杂度:** O()。

**空间复杂度:** O()。

