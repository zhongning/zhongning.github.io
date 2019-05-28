---
title: LeetCode 049 Group Anagrams
tags:
  - leetcode
  - leetcode-medium
  - leetcode-hash-table
  - leetcode-string
categories:
  - leetcode
abbrlink: 4255
date: 2019-05-28 23:41:43
---

## Description

Given an array of strings, group anagrams together.

**Example:**

```
Input: ["eat", "tea", "tan", "ate", "nat", "bat"],
Output:
[
  ["ate","eat","tea"],
  ["nat","tan"],
  ["bat"]
]
```

**Note:**

* All inputs will be in lowercase.
* The order of your output does not matter.

**Difficulty: Medium**

**Code:**

```java
class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        
    }
}
```

## 题意

给定一组字符串，按字谜（颠倒字母而成的字）分组。所有输入为小写，结果顺序不要求。

<!-- more -->

## Solution 1

对每个字符串统计其每个字母出现对次数，用int[26]表示，下标对应字母，值对应出现对个数，并将统计信息转化成字符串。

保存一个HashMap，key是统计信息字符串，value是一组的字符串，用上述结果去更新Map，最终返回Map中所有Value。

```java
class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        Map<String,List<String>> res = new HashMap<String,List<String>>();
        for(String str:strs){
            int[] count = new int[26];
            for(char c:str.toCharArray()){
                count[c-'a']+=1;
            }
            StringBuilder sb = new StringBuilder();
            for(int i=0;i<count.length;i++){
                sb.append('a'+i).append(count[i]);
            }
            if(res.containsKey(sb.toString())){
                res.get(sb.toString()).add(str);
            }else{
                List<String> group = new ArrayList<String>();
                group.add(str);
                res.put(sb.toString(),group);
            }
        }
        return new ArrayList(res.values());
    }
}
```

**时间复杂度:** O()。

**空间复杂度:** O()。

## Solution 2

对每个字符串对应对char[]进行排序，然后再将char[]转成String。

建立一个Map，其key是上述新生成对String，value是一组字谜对字符串数组，最后返回Map中所有value。

```java
class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        Map<String,List<String>> res = new HashMap<String,List<String>>();
        for(String str:strs){
            char[] chars = str.toCharArray();
            Arrays.sort(chars);
            String key = new String(chars);
            if(!res.containsKey(key)) res.put(key,new ArrayList<String>());
            res.get(key).add(str);
        }
        return new ArrayList(res.values());
    }
}
```

**时间复杂度:** O()。

**空间复杂度:** O()。

