---
title: LeetCode 068 Text Justification
tags:
  - leetcode
  - leetcode-hard
  - leetcode-string
categories:
  - leetcode
abbrlink: 30697
date: 2019-12-21 13:31:36
---

## Description

Given an array of words and a width maxWidth, format the text such that each line has exactly maxWidth characters and is fully (left and right) justified.

You should pack your words in a greedy approach; that is, pack as many words as you can in each line. Pad extra spaces ' ' when necessary so that each line has exactly maxWidth characters.

Extra spaces between words should be distributed as evenly as possible. If the number of spaces on a line do not divide evenly between words, the empty slots on the left will be assigned more spaces than the slots on the right.

For the last line of text, it should be left justified and no extra space is inserted between words.

**Note:**

* A word is defined as a character sequence consisting of non-space characters only.
* Each word's length is guaranteed to be greater than 0 and not exceed maxWidth.
* The input array words contains at least one word.

**Example 1:**

```
Input:
words = ["This", "is", "an", "example", "of", "text", "justification."]
maxWidth = 16
Output:
[
   "This    is    an",
   "example  of text",
   "justification.  "
]
```

**Example 2:**

```
Input:
words = ["What","must","be","acknowledgment","shall","be"]
maxWidth = 16
Output:
[
  "What   must   be",
  "acknowledgment  ",
  "shall be        "
]
Explanation: Note that the last line is "shall be    " instead of "shall     be",
             because the last line must be left-justified instead of fully-justified.
             Note that the second line is also left-justified becase it contains only one word.
```

**Example 3:**

```
Input:
words = ["Science","is","what","we","understand","well","enough","to","explain",
         "to","a","computer.","Art","is","everything","else","we","do"]
maxWidth = 20
Output:
[
  "Science  is  what we",
  "understand      well",
  "enough to explain to",
  "a  computer.  Art is",
  "everything  else  we",
  "do                  "
]
```

**Difficulty: Hard**

**Code:**

```java
class Solution {
    public List<String> fullJustify(String[] words, int maxWidth) {
        
    }
}
```

## 题意

在给定每行宽度为maxWidth实现文本左右对齐，空格要尽量均匀的分布。

若一行只有一个单词或者最后一行则左对齐，单词间隔为1个空格，没达到宽度则补全空格。

若空格在单词间不能均匀分布，则左侧的空格要比右侧多谢。

<!-- more -->

## Solution 1

令res表示最终结果集，line表示当前行所包含对单词，count为当前行的最小长度为n个单词加上n-1个空格长度。

首先确定每行能放下的单词列表，若当前行count小于等于maxWidth，则继续遍历后续单词，并将其加入line更新count。
若大于，则说明当前行不能再添加单词，调用helper对此行进行处理。处理结束后清空line，重置count，i--。

调用helper去对非最后行进行处理时，若只有一个单词，则直接处理返回。
否则计算出所有空格数，求出单词间隔对平均空格数interval，并用remain标记不能剩余空格数。
对单词列表进行遍历，将单词添加到行结果中，若到最后一个单词则直接返回，否在单词后加上interval个空格。同时若remain--大于零还要多加一个空格。

最后对结尾行进行左对齐处理。

```java
class Solution {
    public List<String> fullJustify(String[] words, int maxWidth) {
        List<String> res = new ArrayList<String>();
        List<String> line = new ArrayList<String>();
        int count = 0, len=words.length;;
        for(int i=0;i<len;i++){
            String cur = words[i];
            if(count+cur.length()>maxWidth){
                helper(res,line,maxWidth,count);
                line.clear();
                count=0;
                i--;
            }else{
                line.add(cur);
                count+=1+cur.length();
            }
        }
        String tmp = "";
        for (String str : line) {
            tmp += str + " ";
        }
        if(tmp.length()>maxWidth){
            tmp=tmp.substring(0,tmp.length()-1);
        }else{
            int remain = maxWidth - tmp.length();
            while(remain-->0){
                tmp+=" ";
            }
        }
        res.add(tmp);
        return res;
    }
    
    public void helper(List<String> res, List<String> line, int maxWidth, int count){
        String tmp = "";
        if(line.size()==1){
            tmp = line.get(0);
            while(maxWidth!=tmp.length()){
                tmp = tmp + " ";
            }
            res.add(tmp);
            return;
        }
        int space = maxWidth-count+line.size();
        int interval = space/(line.size()-1);
        int remain = space%(line.size()-1);
        for(int i=0;i<line.size();i++){
            tmp+=line.get(i);
            if(i==line.size()-1) {
                break;
            }
            int c = interval + (remain-->0?1:0);
            while(c-->0){
                tmp+=" ";
            }
        }
        res.add(tmp);
    }
}
```

**时间复杂度:** O(n)。

**空间复杂度:** O(n)。

## Solution 2

上述代码的另外一种写法，使用双层while循环，index为当前行的起始位置，last为下一行的起始位置。

里面一层循环是为了根据单词和空格对最小长度去决定last的位置，外面一层循环是当找到index和last后，对当前行进行调整。

对当前行进行调整时，若是最后一行或者该行只有一个单词，则左对齐，单词间距1个空格，结尾用空格补齐。

否则是左右对齐，计算出单词间空格对平均长度spaces以及不能整除剩余的空格r，对该行调整。

```java
class Solution {
    public List<String> fullJustify(String[] words, int maxWidth) {
        List<String> lines = new ArrayList<String>();
        
        int index = 0;
        while (index < words.length) {
            int count = words[index].length();
            int last = index + 1;
            while (last < words.length) {
                if (words[last].length() + count + 1 > maxWidth) break;
                count += words[last].length() + 1;
                last++;
            }
            
            StringBuilder builder = new StringBuilder();
            int diff = last - index - 1;
            // if last line or number of words in the line is 1, left-justified
            if (last == words.length || diff == 0) {
                for (int i = index; i < last; i++) {
                    builder.append(words[i] + " ");
                }
                builder.deleteCharAt(builder.length() - 1);
                for (int i = builder.length(); i < maxWidth; i++) {
                    builder.append(" ");
                }
            } else {
                // middle justified
                int spaces = (maxWidth - count) / diff;
                int r = (maxWidth - count) % diff;
                for (int i = index; i < last; i++) {
                    builder.append(words[i]);
                    if (i < last - 1) {
                        for (int j = 0; j <= (spaces + ((i - index) < r ? 1 : 0)); j++) {
                            builder.append(" ");
                        }
                    }
                }
            }
            lines.add(builder.toString());
            index = last;
        }
        
        
        return lines;
    }
}
```

**时间复杂度:** O(n)。

**空间复杂度:** O(n)。

