---
title: LeetCode 011 Container With Most Water
tags:
  - leetcode
  - leetcode-medium
  - leetcode-array
  - leetcode-two-pointers
categories:
  - leetcode
abbrlink: 12616
date: 2019-04-11 23:51:14
---

## Description

Given n non-negative integers a1, a2, ..., an , where each represents a point at coordinate (i, ai). n vertical lines are drawn such that the two endpoints of line i is at (i, ai) and (i, 0). Find two lines, which together with x-axis forms a container, such that the container contains the most water.

**Note:** You may not slant the container and n is at least 2.

![pic](https://s3-lc-upload.s3.amazonaws.com/uploads/2018/07/17/question_11.jpg)

The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.

**Example:**

```
Input: [1,8,6,2,5,4,8,3,7]
Output: 49
```

**Difficulty: Medium**

**Code:**

```java
class Solution {
    public int maxArea(int[] height) {
        
    }
}
```

<!-- more -->

## 题意

给定正整数1, a2, ..., an，代表坐标轴横轴上1到n到地方，各有一条垂直到线段，其另一端到高度为正整数到值。
两根线及横轴组成了容器，求使容器装最多水到两条线段，并返回装水到面积。

## Solution 1

使用双指针，定义i和j分别指向数组到左右两端，然后两个指针向中间搜索。
搜索到策略是如果左右两端某端的高度要小一些，则将这一端向中间移动，并更新最大面积。
因为如果往中间移动高度较高的一端，则面积只会减小，因为最终的面积的高度是由较低的那端决定的，这样高度不变，长度缺减少，面积只能也减小。

```java
class Solution {
    public int maxArea(int[] height) {
        int i=0,j=height.length-1,max=0;
        while(i<j){
            int h = Math.min(height[i],height[j]);
            max = Math.max(h*(j-i),max);
            if(height[i]<height[j]){
                i++;
            }else{
                j--;
            }
        }
        return max;
    }
}
```

**时间复杂度:** O(n)，遍历一遍数组。

**空间复杂度:** O(1)。

## Solution 2

也可以在上述解法上小优化，不用每步都计算面积。当确定左侧还是右侧向中间移动后，跳过高度小于上次计算时那侧高度的点。

```java
class Solution {
    public int maxArea(int[] height) {
        int i=0,j=height.length-1,max=0;
        while(i<j){
            int h = Math.min(height[i],height[j]);
            max = Math.max(h*(j-i),max);
            boolean moveRight = height[i]<height[j]?true:false;
            while(i<j&&moveRight&&h>=height[i]){
                i++;
            };
            while(i<j&&!moveRight&&h>=height[j]){
                j--;
            }
        }
        return max;
    }
}
```

**时间复杂度:** O(n)，遍历一遍数组。

**空间复杂度:** O(1)。
