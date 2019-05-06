---
title: LeetCode 036 Valid Sudoku
tags:
  - leetcode
  - leetcode-medium
  - leetcode-hash-table
categories:
  - leetcode
abbrlink: 43501
date: 2019-05-06 21:59:39
---

## Description

Determine if a 9x9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules:

1. Each row must contain the digits 1-9 without repetition.
2. Each column must contain the digits 1-9 without repetition.
3. Each of the 9 3x3 sub-boxes of the grid must contain the digits 1-9 without repetition.

![pic](https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Sudoku-by-L2G-20050714.svg/250px-Sudoku-by-L2G-20050714.svg.png)

A partially filled sudoku which is valid.

The Sudoku board could be partially filled, where empty cells are filled with the character '.'.

**Example 1:**

```
Input:
[
  ["5","3",".",".","7",".",".",".","."],
  ["6",".",".","1","9","5",".",".","."],
  [".","9","8",".",".",".",".","6","."],
  ["8",".",".",".","6",".",".",".","3"],
  ["4",".",".","8",".","3",".",".","1"],
  ["7",".",".",".","2",".",".",".","6"],
  [".","6",".",".",".",".","2","8","."],
  [".",".",".","4","1","9",".",".","5"],
  [".",".",".",".","8",".",".","7","9"]
]
Output: true
```

**Example 2:**

```
Input:
[
  ["8","3",".",".","7",".",".",".","."],
  ["6",".",".","1","9","5",".",".","."],
  [".","9","8",".",".",".",".","6","."],
  ["8",".",".",".","6",".",".",".","3"],
  ["4",".",".","8",".","3",".",".","1"],
  ["7",".",".",".","2",".",".",".","6"],
  [".","6",".",".",".",".","2","8","."],
  [".",".",".","4","1","9",".",".","5"],
  [".",".",".",".","8",".",".","7","9"]
]
Output: false
Explanation: Same as Example 1, except with the 5 in the top left corner being 
    modified to 8. Since there are two 8's in the top left 3x3 sub-box, it is invalid.
```

**Note:**

* A Sudoku board (partially filled) could be valid but is not necessarily solvable.
* Only the filled cells need to be validated according to the mentioned rules.
* The given board contain only digits 1-9 and the character '.'.
* The given board size is always 9x9.

**Difficulty: Medium**

**Code:**

```java
class Solution {
    public boolean isValidSudoku(char[][] board) {
        
    }
}
```

## 题意

判断9x9的数独棋盘是否有效，要求满足以下条件：

1. 每一行必须包含1-9，不能重复
2. 每一列必须包含1-9，不能重复
3. 每个3x3的格子必须包含1-9，不能重复

另外请注意

1. 数独棋盘已经填充的部分要求有效但不要求能解出来
2. 只有已经填充的格子才需要验证是否符合上述条件
3. 棋盘只包含1-9和字符`.`
4. 棋盘大小是9x9

<!-- more -->

## Solution 1

准备三个set，分别记录各行、各列、各小方阵是否出现某个数字，下标需要转换。

```java
class Solution {
    public boolean isValidSudoku(char[][] board) {
        for(int i=0;i<9;i++){
            Set<Character> row = new HashSet<Character>();
            Set<Character> column = new HashSet<Character>();
            Set<Character> block = new HashSet<Character>();
            for(int j=0;j<9;j++){
                if(board[i][j]!='.'&&!row.add(board[i][j])){
                    return false;
                }
                if(board[j][i]!='.'&&!column.add(board[j][i])){
                    return false;
                }
                int rowIndex = 3*(i/3);
                int colIndex = 3*(i%3);
                if(board[rowIndex+j/3][colIndex+j%3]!='.'&&!block.add(board[rowIndex+j/3][colIndex+j%3])){
                    return false;
                }
            }
        }
        return true;
    }
}
```

**时间复杂度:** O()。

**空间复杂度:** O()。


## Solution 2

用一个set保存数字分别在行row、列column、块block中的值的字符串形式，若相同的数在同一行、同一列、同一块再次出现，则添加到set中会返回false，依次来判断是否有效。

```java
class Solution {
    public boolean isValidSudoku(char[][] board) {
        Set<String> set = new HashSet<String>();
        for(int i=0;i<9;i++){
            for(int j=0;j<9;j++){
                char num = board[i][j];
                if(num=='.') continue;
                if(!set.add(num+" in row "+i)||
                   !set.add(num+" in column "+j)||
                   !set.add(num+" in block "+i/3+"-"+j/3)){
                    return false;
                }
            }
        }
        return true;
    }
}
```

**时间复杂度:** O()。

**空间复杂度:** O()。
