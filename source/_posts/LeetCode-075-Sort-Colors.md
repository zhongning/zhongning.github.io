---
title: LeetCode 075 Sort Colors
tags:
  - leetcode
  - leetcode-medium
  - leetcode-array
  - leetcode-two-pointers
  - leetcode-sort
categories:
  - leetcode
abbrlink: 29179
date: 2020-01-20 20:31:07
---

## Description

Given an array with n objects colored red, white or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white and blue.

Here, we will use the integers 0, 1, and 2 to represent the color red, white, and blue respectively.

**Note:** You are not suppose to use the library's sort function for this problem.

**Example:**

```
Input: [2,0,2,1,1,0]
Output: [0,0,1,1,2,2]
```

**Follow up:**

* A rather straight forward solution is a two-pass algorithm using counting sort.
First, iterate the array counting number of 0's, 1's, and 2's, then overwrite array with total number of 0's, then 1's and followed by 2's.
* Could you come up with a one-pass algorithm using only constant space?

**Difficulty: Medium**

**Code:**

```java
class Solution {
    public void sortColors(int[] nums) {
        
    }
}
```

## 题意

一个数组用数字表示颜色，0表示红色，1表示白色，2表示蓝色，将数字按照从0到1到顺序排序。要求不能使用排序API，看能否只遍历一遍数组。

<!-- more -->


## Solution 1

定义int数组res表示各种颜色的个数：
1. 首先遍历一遍数组，分别记录三种颜色对应的个数
2. 根据res去从头到尾更新，按照个数分别赋予0、1、2

```java
class Solution {
    public void sortColors(int[] nums) {
        int[] res = new int[3];
        for(int num:nums){
            res[num]++;
        }
        for(int i=0,cur=0;i<3;i++){
            for(int j=0;j<res[i];j++){
                nums[cur++]=i;
            }
        }
    }
}
```

**时间复杂度:** O(n)。

**空间复杂度:** O(1)。



## Solution 2

使用双指针，red指向开头位置，blue指向结尾位置，表示下一个0或者1要放置到下标。

从头开始遍历，若遇到0，则交换nums[i]和nums[red]的值，并将red++；

若遇到2，则交换nums[i]和nums[blue]的值，并将blue--，但由于从后面blue交换过来的值没有排过序，所以将i--

若遇到1，则不处理继续遍历。

```java
class Solution {
    public void sortColors(int[] nums) {
        int n = nums.length;
        int red=0, blue=n-1;
        for(int i=0;i<=blue;i++){
            int cur = nums[i];
            if(cur==0){
                nums[i]=nums[red];
                nums[red]=0;
                red++;
            }else if(cur==2){
                nums[i]=nums[blue];
                nums[blue]=2;
                blue--;
                i--;
            }
        }
    }
}
```

**时间复杂度:** O(n)。

**空间复杂度:** O(1)。
