---
title: LeetCode 030 Substring with Concatenation of All Words
tags:
  - leetcode
  - leetcode-hard
  - leetcode-hash-table
  - leetcode-two-pointers
  - leetcode-string
categories:
  - leetcode
abbrlink: 6607
date: 2019-05-01 21:42:40
---

## Description

You are given a string, s, and a list of words, words, that are all of the same length. Find all starting indices of substring(s) in s that is a concatenation of each word in words exactly once and without any intervening characters.

**Example 1:**

```
Input:
  s = "barfoothefoobarman",
  words = ["foo","bar"]
Output: [0,9]
Explanation: Substrings starting at index 0 and 9 are "barfoor" and "foobar" respectively.
The output order does not matter, returning [9,0] is fine too.
```

**Example 2:**

```
Input:
  s = "wordgoodgoodgoodbestword",
  words = ["word","good","best","word"]
Output: []
```

**Difficulty: Hard**

**Code:**

```java
class Solution {
    public List<Integer> findSubstring(String s, String[] words) {
        
    }
}
```

## 题意

给定字符串s和一系列单词words，单词的长度都相等。找出所有匹配的子串的起始位置，匹配的字符子串需是由所有这些单词串联一次而成。

<!-- more -->

## Solution 1

首先若字符串s的长度m小于所有单词长度之和n，则返回空。同时令单词长度为l。

然后对字符串s从第0位到m-n位进行遍历，若从当前i到i+l，若单词列表中含有，则开始进行判断。

判读是重新copy一份单词列表到wordCopy，对从i开始的每一长度为l的子串，若在wordCopy中，则将其从wordCopy删除，并移动l重新查找，直到wordCopy不包含或者为空。

```java
class Solution {
    public List<Integer> findSubstring(String s, String[] words) {
        List<Integer> res = new ArrayList<Integer>();
        if(s==null||words==null||s.length()==0||words.length==0||words[0]==null||words[0].length()==0) return res;
        int m = s.length(), n = words.length*words[0].length(), l=words[0].length();
        if(n>m) return res;
        List<String> wordList = Arrays.asList(words);
        for(int i=0;i<=m-n;i++){
            if(wordList.contains(s.substring(i,i+l))){
                List<String> wordCopy = new ArrayList<String>();
                wordCopy.addAll(wordList);
                int start = i;
                while(wordCopy.size()>0){
                    if(wordCopy.contains(s.substring(start,start+l))){
                        wordCopy.remove(s.substring(start,start+l));
                        start+=l;
                    }else{
                        break;
                    }
                }
                if(wordCopy.size()==0){
                    res.add(i);
                }
            }
        }
        return res;
    }
}
```

**时间复杂度:** O()。

**空间复杂度:** O()。

## Solution 2

上述解法1有个缺陷是单词不能重复，为了针对单词有重复到情况，要使用HashMap代替List。

```java
class Solution {
    public List<Integer> findSubstring(String s, String[] words) {
        List<Integer> res = new ArrayList<Integer>();
        if(s==null||words==null||s.length()==0||words.length==0||words[0]==null||words[0].length()==0) return res;
        int m = s.length(), n = words.length, l=words[0].length();
        if(n*l>m) return res;
        Map<String,Integer> wordMap = new HashMap<String,Integer>();
        for(String word:words){
            if(wordMap.containsKey(word)){
                wordMap.put(word,wordMap.get(word)+1);
            }else{
                wordMap.put(word,1);
            }
        }
        for(int i=0;i<=m-n*l;i++){
            int j=0;
            Map<String,Integer> wordTmpMap = new HashMap<String,Integer>();
            for(;j<n;j++){
                String word = s.substring(i+j*l,i+j*l+l);
                if(wordMap.containsKey(word)){
                    if(wordTmpMap.containsKey(word)){
                        if(wordTmpMap.get(word)==wordMap.get(word)) break;
                        wordTmpMap.put(word,wordTmpMap.get(word)+1);
                    }else{
                        wordTmpMap.put(word,1);
                    }
                }else{
                    break;
                }
            }
            if(j==n&&wordTmpMap.size()==wordMap.size()) res.add(i);
        }
        return res;
    }
}
```

**时间复杂度:** O()。

**空间复杂度:** O()。

## Solution 3

上述解法2到优化版，使用了Map.getOrDefault()来优化Map到操作。

```java
class Solution {
    public List<Integer> findSubstring(String s, String[] words) {
        final Map<String, Integer> counts = new HashMap<>();
        for (final String word : words) {
            counts.put(word, counts.getOrDefault(word, 0) + 1);
        }
        final List<Integer> indexes = new ArrayList<>();
        final int n = s.length(), num = words.length, len = words[0].length();
        for (int i = 0; i < n - num * len + 1; i++) {
            final Map<String, Integer> seen = new HashMap<>();
            int j = 0;
            while (j < num) {
                final String word = s.substring(i + j * len, i + (j + 1) * len);
                if (counts.containsKey(word)) {
                    seen.put(word, seen.getOrDefault(word, 0) + 1);
                    if (seen.get(word) > counts.getOrDefault(word, 0)) {
                        break;
                    }
                } else {
                    break;
                }
                j++;
            }
            if (j == num) {
                indexes.add(i);
            }
        }
        return indexes;
    }
}
```

**时间复杂度:** O()。

**空间复杂度:** O()。
