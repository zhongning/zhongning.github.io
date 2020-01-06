---
title: LeetCode 071 Simplify Path
tags:
  - leetcode
  - leetcode-medium
  - leetcode-string
  - leetcode-stack
categories:
  - leetcode
abbrlink: 8718
date: 2020-01-06 20:34:14
---

## Description

Given an absolute path for a file (Unix-style), simplify it. Or in other words, convert it to the canonical path.

In a UNIX-style file system, a period . refers to the current directory. Furthermore, a double period .. moves the directory up a level. For more information, see: Absolute path vs relative path in Linux/Unix

Note that the returned canonical path must always begin with a slash /, and there must be only a single slash / between two directory names. 
The last directory name (if it exists) must not end with a trailing /. Also, the canonical path must be the shortest string representing the absolute path.

**Example 1:**

```
Input: "/home/"
Output: "/home"
Explanation: Note that there is no trailing slash after the last directory name.
```

**Example 2:**

```
Input: "/../"
Output: "/"
Explanation: Going one level up from the root directory is a no-op, as the root level is the highest level you can go.
```

**Example 3:**

```
Input: "/home//foo/"
Output: "/home/foo"
Explanation: In the canonical path, multiple consecutive slashes are replaced by a single one.
```

**Example 4:**

```
Input: "/a/./b/../../c/"
Output: "/c"
```

**Example 5:**

```
Input: "/a/../../b/../c//.//"
Output: "/c"
```

**Example 6:**

```
Input: "/a//b////c/d//././/.."
Output: "/a/b/c"
```

**Difficulty: Medium**

**Code:**

```java
class Solution {
    public String simplifyPath(String path) {
        
    }
}
```

## 题意

简化linux的文件绝对路径。

<!-- more -->

## Solution 1

先用斜线对路径进行分割，然后从左到右一级级遍历所有的目录，进行压栈处理。

若当前目录是符号`.`或者空字符串，则忽略；

若当前目录是符号`..`，当栈不为空时弹出最上面当元素，即当前目录当上一级目录；

其他情况下将目录存入栈中保存。

然后对栈进行遍历，最上面对元素要放在结果路径的最后面。

```java
class Solution {
    public String simplifyPath(String path) {
        if(path==null||path.length()<=1) return path;
        String[] dirs = path.split("/");
        String res = "";
        Stack<String> stack = new Stack<String>();
        for(int i=1;i<dirs.length;i++){
            String dir = dirs[i];
            if(dir.equals(".")||dir.isEmpty()){
                continue;
            }else if(dir.equals("..")){
                if(!stack.isEmpty()) stack.pop();
            }else{
                stack.push(dir);
            }
        }
        while(!stack.isEmpty()){
            res = "/" + stack.pop() + res;
        }
        if(res.length()==0) return "/";
        return res;
    }
}
```

**时间复杂度:** O(n)。

**空间复杂度:** O(n)。

## Solution 2

上述解法的优化。

只有当前目录不为空、符号`.`、符号`..`才放入栈中；

当遇到符号为`..`且栈不为空时出栈。

最后用栈构建字符串List并用斜线连接。

```java
class Solution {
    public String simplifyPath(String path) {
        Stack<String> stack = new Stack<>();
        String[] p = path.split("/");
        for (int i = 0; i < p.length; i++) {
            if (!stack.empty() && p[i].equals(".."))
                stack.pop();
            else if (!p[i].equals(".") && !p[i].equals("") && !p[i].equals(".."))
                stack.push(p[i]);
        }
        List<String> list = new ArrayList(stack);
        return "/"+String.join("/", list);
    }
}
```

**时间复杂度:** O(n)。

**空间复杂度:** O(n)。

