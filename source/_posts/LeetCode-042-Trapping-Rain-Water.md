---
title: LeetCode 042 Trapping Rain Water
tags:
  - leetcode
  - leetcode-hard
  - leetcode-array
  - leetcode-two-pointers
  - leetcode-stack
categories:
  - leetcode
abbrlink: 37397
date: 2019-05-09 00:02:34
---

## Description

Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it is able to trap after raining.

![pic](https://assets.leetcode.com/uploads/2018/10/22/rainwatertrap.png)

The above elevation map is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped. Thanks Marcos for contributing this image!

**Example:**

```
Input: [0,1,0,2,1,0,1,3,2,1,2,1]
Output: 6
```

**Difficulty: Hard**

**Code:**

```java
class Solution {
    public int trap(int[] height) {
        
    }
}
```

## 题意

收集雨水，给定n个非负整数代表宽为1不同高度柱子的容器，求它能收集多少雨水。

<!-- more -->

## Solution 1

双指针left和right分别指向最左端和最右端，同时维护maxLeft和maxRight表示左侧和右侧遍历时最大高度。

若当前left的高度较小，则固定住right侧，填充左侧的格子。

```java
class Solution {
    public int trap(int[] height) {
        int left=0,right=height.length-1,maxLeft=0,maxRight=0,res=0;
        while(left<=right){
            if(height[left]<=height[right]){
                if(height[left]>=maxLeft){
                    maxLeft=height[left];
                }else{
                    res+=maxLeft-height[left];
                }
                left++;
            }else{
                if(height[right]>maxRight){
                    maxRight=height[right];
                }else{
                    res+=maxRight-height[right];
                }
                right--;
            }
        }
        return res;
    }
}
```

**时间复杂度:** O()。

**空间复杂度:** O()。

## Solution 2

从左侧及右侧更新两边的最大高度maxLeft和maxRight，当maxLeft比maxRight小时，意味着左侧可以存水，值为maxLeft-height[left]。

```java
class Solution {
    public int trap(int[] height) {
        int left=0,right=height.length-1,maxLeft=0,maxRight=0,res=0;
        while(left<=right){
            maxLeft=Math.max(maxLeft,height[left]);
            maxRight=Math.max(maxRight,height[right]);
            if(maxLeft<=maxRight){
                res+=maxLeft-height[left];
                left++;
            }else{
                res+=maxRight-height[right];
                right--;
            }
        }
        return res;
    }
}
```

**时间复杂度:** O()。

**空间复杂度:** O()。

## Solution 3

每次只处理最左侧left和最右侧right高度较小的一侧，拿出较小的高度去更新当前安全深度level，取其中较大的值。

然后用此level减去当前格子的高度，累加至结果res，同时更新left和right。

```java
class Solution {
    public int trap(int[] height) {
        int left=0,right=height.length-1,level=0,res=0;
        while(left<right){
            int lower = height[height[left]<height[right]?left++:right--];
            level = Math.max(level,lower);
            res+=level-lower;
        }
        return res;
    }
}
```

**时间复杂度:** O()。

**空间复杂度:** O()。

## Solution 4

使用栈，从左到右遍历数组，保存递减的高度到下标。若找到当前格子比栈中最上面的下标对应的高度高，则栈中最顶上的格子就是一个洼地，可以存水。

从栈中弹出这块洼地的下标，用洼地格子的右方和左方的高度较小的一个减去当前格子的高度，累加进结果。相当于这一小块洼地被填平，并不断重复此判断。

```java
class Solution {
    public int trap(int[] height) {
        int i=0,res=0;
        Stack<Integer> stack = new Stack<Integer>();
        while(i<height.length){
            if(!stack.isEmpty()&&height[i]>height[stack.peek()]){
                int bar = stack.pop();
                if(!stack.isEmpty()){
                    int h = Math.min(height[i],height[stack.peek()]);
                    res+=(i-stack.peek()-1)*(h-height[bar]);
                }
            }else{
                stack.push(i++);
            }
        }
        return res;
    }
}
```

**时间复杂度:** O()。

**空间复杂度:** O()。
