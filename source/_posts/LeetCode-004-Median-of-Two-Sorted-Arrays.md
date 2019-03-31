---
title: LeetCode 004 Median of Two Sorted Arrays
tags:
  - leetcode
  - leetcode-hard
  - leetcode-array
  - leetcode-binary-search
  - leetcode-divide-and-conquer
categories:
  - leetcode
abbrlink: 40546
date: 2019-03-28 23:27:57
---

## Description

There are two sorted arrays nums1 and nums2 of size m and n respectively.

Find the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).

You may assume nums1 and nums2 cannot be both empty.

**Example 1:**

```
nums1 = [1, 3]
nums2 = [2]

The median is 2.0
```

**Example 2:**

```
nums1 = [1, 2]
nums2 = [3, 4]

The median is (2 + 3)/2 = 2.5
```

**Difficulty: Hard**

**Code:**

```java
class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        
    }
}
```

<!-- more -->

## 题意

给定两个有序数组，长度分别是m和n。找出这两个数组到中位数，总体到时间复杂度要求O(log (m+n))，假定两个数组都不为空。

## Solution 1

中位数是把一组有序数分成两个相等长度的部分，一部分比另外一部分都要大。如果是偶数个，则取最中间两个数的平均数。

如果两个有序数组混合起来成为一个有序数组再去找中位数，肯定很简单，但是时间复杂度应该是O(m+n)，不符合要求。O(log (m+n))提示应该是用二分查找，但是两个数组又如何去做，着实很难。

首先将数组A在随机的位置i切成两部分：

```
          left_A             |        right_A
    A[0], A[1], ..., A[i-1]  |  A[i], A[i+1], ..., A[m-1]
```

因为A有m个元素，所以有m+1种切法(i=0~m)。

```
len(left_A)=i,len(right_A)=m−i.
Note: when i = 0, left_A is empty, and when i = m, right_A is empty.
```

使用同样的方式，把数组B在随机位置j切成两部分。

```
          left_B             |        right_B
    B[0], B[1], ..., B[j-1]  |  B[j], B[j+1], ..., B[n-1]
```

把left_A和left_B放到一起合并成left_part，把right_A和right_B放到一起合并成right_part。

```
          left_part          |        right_part
    A[0], A[1], ..., A[i-1]  |  A[i], A[i+1], ..., A[m-1]
    B[0], B[1], ..., B[j-1]  |  B[j], B[j+1], ..., B[n-1]
```

如果我们能保证

```
1. len(left_part)=len(right_part)
2. max(left_part)≤min(right_part)
```

那么我们就成功将数组A和B中所有的元素分成了长度相同的两部分，并且一部分总是比另外一部分大。那么

```
median= (max(left_part)+min(right_part))/2
```

为了达到上述两个条件，只需要保证

```
1. i+j=m−i+n−j or i+j=m−i+n−j+1
    如果n>=m，只需要设：i=0~m,j=(m+n+1)/2-i;
2. B[j−1] ≤ A[i] and A[i−1] ≤ B[j]
```

ps.1 为了简化，假定A[i-1],B[j-1],A[i],B[j]都是有效的即使i=0,i=m,j=0,j=n。后面会介绍这些边界值如何处理。

ps.2 为什么要保证n>=m，因为要保证j是非负数。

所以我们需要做的是

```
在[0~m]中查找i，能够满足
B[j-1]<=A[i] and A[i-1]<=B[j], j=(m+n+1)/2-i
```

按照以下的步骤进行二分查找
1. 初始化imin=0 and imax=m，然后在[imin,imax]进行查找
2. 设置i=(imin+imax)/2 and j=(m+n+1)/2-i
3. 已经达成len(left_part)=len(right_part)，只会碰到3种情况
    * B[j-1]<=A[i] and A[i-1]<=B[j]
    
        意味着我们找到了目标i，停止查找
        
    * B[j-1]>A[i]
    
        意味着A[i]太小，必须增大i以达到B[j-1]<=A[i]。当i增大时，j减小，A[i]增大，B[j-1]减小。调整查找范围[i+1,imax]，imin=i+1，跳转到第2步。
        
    * A[i-1]>B[j]
    
        意味着A[i-1]太大，必须减小i以达到A[i-1]<=B[j]。调整查找范围[imin,i-1]，imax=i-1，跳转到第2步

当目标i找到时，中位数是

```
max(A[i-1],B[j-1])，当m+n是奇数
(max(A[i-1],B[j-1)+min(A[i]+B[j])/2，当m+n是偶数
```

现在考虑边界值，i=0,i=m,j=0,j=m，此时A[i-1],B[j-1],A[i],B[j]可能不存在。

只需要保证max(left_part)<=min(right_part)，但是当A[i-1],B[j-1],A[i],B[j]不存在时，不需要检查所有的那两个条件。

```
(j=0 or i=m or B[j−1]≤A[i]) and ( i=0 or j=n or A[i-1]<=B[j])，当j=(m+n+1)/2-i
```

在循环搜索时，只会碰到以下三种情况

```
1. (j=0 or i=m or B[j−1]≤A[i]) and ( i=0 or j=n or A[i-1]<=B[j])
    意味着i已经找到，可以停止搜索
2. j>0 and i<m and B[j-1]>A[i]
    意味着i太小，要增大i
3. i>0 and j<n and A[j-1]>B[j]
    意味着i太大，要减小i
```

代码如下

```java
class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        int m=nums1.length;
        int n=nums2.length;
        if(m>n){
            return findMedianSortedArrays(nums2,nums1);
        }
        int imin=0,imax=m,halfLen=(m+n+1)/2;
        while(imin<=imax){
            int i = (imin+imax)/2;
            int j = halfLen-i;
            if(i<imax&&nums2[j-1]>nums1[i]){
                imin=i+1;
            }else if(i>imin&&nums1[i-1]>nums2[j]){
                imax=i-1;
            }else{
                int maxLeft=0;
                if(i==0){
                    maxLeft=nums2[j-1];
                }else if(j==0){
                    maxLeft=nums1[i-1];
                }else{
                    maxLeft=Math.max(nums1[i-1],nums2[j-1]);
                }
                if((m+n)%2==1){
                    return maxLeft;
                }
                
                int minRight=0;
                if(i==m){
                    minRight=nums2[j];
                }else if(j==n){
                    minRight=nums1[i];
                }else{
                    minRight=Math.min(nums1[i],nums2[j]);
                }
                return (maxLeft+minRight)/2.0;
            }
        }
        return 0.0;
    }
}
```

**时间复杂度:** O(log (m+n))，每次调整i都是将其范围减半。

**空间复杂度:** O(1)，只使用了固定几个变量保存状态。
