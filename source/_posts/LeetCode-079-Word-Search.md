---
title: LeetCode 079 Word Search
tags:
  - leetcode
  - leetcode-medium
  - leetcode-array
  - leetcode-backtracking
categories:
  - leetcode
abbrlink: 57786
date: 2020-04-28 17:35:03
---

## Description

Given a 2D board and a word, find if the word exists in the grid.

The word can be constructed from letters of sequentially adjacent cell, where "adjacent" cells are those horizontally or vertically neighboring. 
The same letter cell may not be used more than once.

**Example:**

```
board =
[
  ['A','B','C','E'],
  ['S','F','C','S'],
  ['A','D','E','E']
]

Given word = "ABCCED", return true.
Given word = "SEE", return true.
Given word = "ABCB", return false.
```

**Constraints:**

* board and word consists only of lowercase and uppercase English letters.
* 1 <= board.length <= 200
* 1 <= board[i].length <= 200
* 1 <= word.length <= 10^3

**Difficulty: Medium**

**Code:**

```java
class Solution {
    public boolean exist(char[][] board, String word) {
        
    }
}
```

## 题意

给定一个2D的棋盘和一个单词，找出单词是否在网格出现。单词可以从有序相邻的单元格中构造，同一个字符只能用一次。

原二维数组就像一个迷宫，可以上下左右四个方向走，可以以每个数都作为起点来走。

<!-- more -->

## Solution 1

因为要求同一个字符只能使用一次，构造一个和棋盘一样的数组visited来记录当前位置是否被使用过。

若棋盘当前位置的字符和目标单词对应位置的字符相等，则对其上下左右调用递归，去看是否能找到下一个字符。

```java
class Solution {
    public boolean exist(char[][] board, String word) {
        int m = board.length, n = board[0].length;
        boolean[][] visited = new boolean[m][n];
        for(int i=0;i<m;i++){
            for(int j=0;j<n;j++){  
                if(helper(board, word, visited, i, j, 0)) return true;
            }
        }
        return false;
    }
    
    private boolean helper(char[][] board, String word, boolean[][] visited, int i, int j, int cnt){
        if(cnt==word.length()) return true;
        if(i<0||i>=board.length||j<0||j>=board[0].length) return false;
        if(board[i][j]==word.charAt(cnt)&&!visited[i][j]){
            visited[i][j]=true;
            boolean res = helper(board, word, visited, i+1, j, cnt+1)||
            helper(board, word, visited, i-1, j, cnt+1) ||
            helper(board, word, visited, i, j+1, cnt+1) ||
            helper(board, word, visited, i, j-1, cnt+1);
            visited[i][j]=false;
            return res;
        }  
        return false;
    }
}
```

**时间复杂度:** O()。

**空间复杂度:** O()。

## Solution 2

可以不使用visited数组记录是否被访问过，递归调用时可以直接对棋盘访问过对字符置为#号，调用完后再恢复到原来到字符。

```java
class Solution {
    public boolean exist(char[][] board, String word) {
        int m = board.length, n = board[0].length;
        for(int i=0;i<m;i++){
            for(int j=0;j<n;j++){  
                if(helper(board, word, i, j, 0)) return true;
            }
        }
        return false;
    }
    
    private boolean helper(char[][] board, String word, int i, int j, int cnt){
        if(cnt==word.length()) return true;
        if(i<0||i>=board.length||j<0||j>=board[0].length) return false;
        if(board[i][j]==word.charAt(cnt)){
            char cur = board[i][j];
            board[i][j]='#';
            boolean res = helper(board, word, i+1, j, cnt+1)||
            helper(board, word, i-1, j, cnt+1) ||
            helper(board, word, i, j+1, cnt+1) ||
            helper(board, word, i, j-1, cnt+1);
            board[i][j]=cur;
            return res;
        }  
        return false;
    }
}
```

**时间复杂度:** O()。

**空间复杂度:** O()。

