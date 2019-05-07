---
title: LeetCode 037 Sudoku Solver
tags:
  - leetcode
  - leetcode-hard
  - leetcode-hash-table
  - leetcode-backtracking
categories:
  - leetcode
abbrlink: 21287
date: 2019-05-06 23:13:04
---

## Description

Write a program to solve a Sudoku puzzle by filling the empty cells.

A sudoku solution must satisfy all of the following rules:

1. Each of the digits 1-9 must occur exactly once in each row.
2. Each of the digits 1-9 must occur exactly once in each column.
3. Each of the the digits 1-9 must occur exactly once in each of the 9 3x3 sub-boxes of the grid.

Empty cells are indicated by the character '.'.

![pic](https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Sudoku-by-L2G-20050714.svg/250px-Sudoku-by-L2G-20050714.svg.png)

A sudoku puzzle...

![pic](https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Sudoku-by-L2G-20050714_solution.svg/250px-Sudoku-by-L2G-20050714_solution.svg.png)

...and its solution numbers marked in red.

**Note:**
* The given board contain only digits 1-9 and the character '.'.
* You may assume that the given Sudoku puzzle will have a single unique solution.
* The given board size is always 9x9.

**Difficulty: Hard**

**Code:**

```java
class Solution {
    public void solveSudoku(char[][] board) {
        
    }
}
```

## 题意

将数独中的空白按规则正确填充，假设有且仅有唯一解。

<!-- more -->

## Solution 1

对每个空格子都带入1-9，每带入一个数字判定其是否合法，若合法则将其放入棋盘并递归调用。

若其递归调用都仍然合法，说明棋盘已经填充正确，直接返回；若不合法，说明这个数字不适合，将棋盘此位置重新放入`.`。

```java
class Solution {
    public void solveSudoku(char[][] board) {
        if(board==null||board.length==0){
            return;
        }
        solve(board);
    }
    
    public boolean solve(char[][] board){
        for(int i=0;i<9;i++){
            for(int j=0;j<9;j++){
                if(board[i][j]=='.'){
                    for(char curr='1';curr<='9';curr++){
                        if(isValid(board,i,j,curr)){
                            board[i][j]=curr;
                            if(solve(board)){
                                return true;
                            }else{
                                board[i][j]='.';
                            }
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }
    
    public boolean isValid(char[][] board, int row, int column, char curr){
        for(int i=0;i<9;i++){
            if(board[row][i]!='.'&&board[row][i]==curr) return false;
            if(board[i][column]!='.'&&board[i][column]==curr) return false;
            if(board[3*(row/3)+i/3][3*(column/3)+i%3]!='.'&&board[3*(row/3)+i/3][3*(column/3)+i%3]==curr) return false;
        }
        return true;
    }
}
```

**时间复杂度:** O()。

**空间复杂度:** O()。
