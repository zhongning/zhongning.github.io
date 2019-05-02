---
title: LeetCode 031 Next Permutation
tags:
  - leetcode
  - leetcode-medium
  - leetcode-array
categories:
  - leetcode
abbrlink: 12241
date: 2019-05-02 20:44:54
---

## Description

Implement next permutation, which rearranges numbers into the lexicographically next greater permutation of numbers.

If such arrangement is not possible, it must rearrange it as the lowest possible order (ie, sorted in ascending order).

The replacement must be in-place and use only constant extra memory.

Here are some examples. Inputs are in the left-hand column and its corresponding outputs are in the right-hand column.

1,2,3 → 1,3,2

3,2,1 → 1,2,3

1,1,5 → 1,5,1

**Difficulty: Medium**

**Code:**

```java
class Solution {
    public void nextPermutation(int[] nums) {
        
    }
}
```

## 题意

求全排列下一个排列顺序，参考如下。

```
Input: [1,2,3]
Output:
[
  [1,2,3],
  [1,3,2],
  [2,1,3],
  [2,3,1],
  [3,1,2],
  [3,2,1]
]
```

<!-- more -->

## Solution 1

若给定数组是降序，则说明是全排列到最后一组，下一个排列顺序就是最开始到一组。

例如又一个数组`1　　2　　7　　4　　3　　1`，则下一个排列为`1　　3　　1　　2　　4　　7`。

从末尾往前看，数字逐渐变大，到来2开始减小，在从后往前找到第一个比2大的数3，将3与2进行交换，再将3后面的数字反转。

```java
class Solution {
    public void nextPermutation(int[] nums) {
        int len = nums.length, i=0, j=0;
        for(i=len-2;i>=0;i--){
            if(nums[i]<nums[i+1]){
                break;
            }
        }
        if(i!=-1){
            for(j=len-1;j>=0;j--){
                if(nums[j]>nums[i]){
                    break;
                }
            }
            int tmp=nums[i];
            nums[i]=nums[j];
            nums[j]=tmp;
        }
        i=i+1;
        j=len-1;
        while(i<j){
            int tmp=nums[i];
            nums[i]=nums[j];
            nums[j]=tmp;
            i++;
            j--;
        }
    }
}
```

**时间复杂度:** O()。

**空间复杂度:** O()。
