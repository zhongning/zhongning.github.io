---
title: LeetCode 060 Permutation Sequence
tags:
  - leetcode
  - leetcode-medium
  - leetcode-math
  - leetcode-backtracking
categories:
  - leetcode
abbrlink: 26693
date: 2019-12-12 19:26:29
---

## Description

The set [1,2,3,...,n] contains a total of n! unique permutations.

By listing and labeling all of the permutations in order, we get the following sequence for n = 3:

1. "123"
2. "132"
3. "213"
4. "231"
5. "312"
6. "321"

Given n and k, return the kth permutation sequence.

**Note:**

* Given n will be between 1 and 9 inclusive.

* Given k will be between 1 and n! inclusive.

**Example 1:**

```
Input: n = 3, k = 3
Output: "213"
```

**Example 2:**

```
Input: n = 4, k = 9
Output: "2314"
```

**Difficulty: Medium**

**Code:**

```java
class Solution {
    public String getPermutation(int n, int k) {
        
    }
}
```

## 题意

给定数字n和k，返回1到n的全排列中第k个结果。

<!-- more -->

## Solution 1

若n=4，则有{1,2,3,4}，此时列出其全排列顺序如下：

1 + {2,3,4}的全排列  
2 + {1,3,4}的全排列  
3 + {1,2,4}的全排列  
4 + {1,2,3}的全排列  

对第一位来说后面三个数字排列组合有3!即6种，所以当k=9换算成下标为8，肯定在上述第二组种，第一个数字的下标为8/6=1即数字2。在确定了第一位为2的情况下，剩余组合为{1,3,4}，k更新为8%6=2。找后面数字的方式和第一位一样。

对第二位来说后面两个数字排列组合有2!即2种，第二个数字的下标为2/2=1即数字3。在确定了第二位为3的情况下，剩余组合为{1,4}，k更新为2%2=0。

因为k已经为0，则后面的数字为其组合的升序即{1,4}。所以最终结果为2314。

```java
class Solution {
    public String getPermutation(int n, int k) {
        String res = "";
        int[] fn = new int[n+1];
        fn[0] = 1;
        List<Integer> nums = new ArrayList<Integer>();
        for(int i=1;i<=n;i++){
            fn[i] = fn[i-1]*i;
            nums.add(i);
        }
        k--;
        
        for(int i=n;i>=1;i--){
            int j = k/fn[i-1];
            k = k%fn[i-1];
            res+=nums.get(j);
            nums.remove(j);
        }
        return res;
    }
}
```

**时间复杂度:** O(n)。

**空间复杂度:** O(n)。
