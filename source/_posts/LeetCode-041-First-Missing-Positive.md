---
title: LeetCode 041 First Missing Positive
tags:
  - leetcode
  - leetcode-hard
  - leetcode-array
categories:
  - leetcode
abbrlink: 25277
date: 2019-05-08 23:28:01
---

## Description

Given an unsorted integer array, find the smallest missing positive integer.

**Example 1:**

```
Input: [1,2,0]
Output: 3
```

**Example 2:**

```
Input: [3,4,-1,1]
Output: 2
```

**Example 3:**

```
Input: [7,8,9,11,12]
Output: 1
```

**Note:**

Your algorithm should run in O(n) time and uses constant extra space.

**Difficulty: Hard**

**Code:**

```java
class Solution {
    public int firstMissingPositive(int[] nums) {
        
    }
}
```

## 题意

给定一个未排序的整数数组，找出首个缺失的正数。时间复杂度要求O(n)，空间复杂度为O(1)。

<!-- more -->

## Solution 1

不能建立新的数组，只能在原有的数组上修改。当读到第i个元素当值是n时，应该把n放在nums[n-1]上，即应该把nums[i]放到nums[nums[i]-1]上。

遍历整个数组，若不满足nums[i]==nums[nums[i]-1]，则将两者调换位置。例如当发现5，则将其与nums[4]上的数字交换。

最后再次遍历数组，若nums[i]!=i+1，则返回i+1，否则说明现有数组都不缺，返回最后一个数都下一位。

```java
class Solution {
    public int firstMissingPositive(int[] nums) {
        int len = nums.length;
        for(int i=0;i<len;i++){
            while(nums[i]>0&&nums[i]<=len&&nums[nums[i]-1]!=nums[i]){
                int tmp=nums[nums[i]-1];
                nums[nums[i]-1]=nums[i];
                nums[i]=tmp;
            }
        }
        for(int i=0;i<len;i++){
            if(nums[i]!=i+1){
                return i+1;
            }
        }
        return len+1;
    }
}
```

**时间复杂度:** O()。

**空间复杂度:** O()。
