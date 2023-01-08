/*
  1143. Longest Common Subsequence
  Medium

  Given two strings text1 and text2, return the length of their longest common subsequence. If there is no common subsequence, return 0.

  A subsequence of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.

  For example, "ace" is a subsequence of "abcde".

  A common subsequence of two strings is a subsequence that is common to both strings.

  Example 1:
      Input: text1 = "abcde", text2 = "ace"
      Output: 3
      Explanation: The longest common subsequence is "ace" and its length is 3.

  Example 2:
      Input: text1 = "abc", text2 = "abc"
      Output: 3
      Explanation: The longest common subsequence is "abc" and its length is 3.

  Example 3:
      Input: text1 = "abc", text2 = "def"
      Output: 0
      Explanation: There is no such common subsequence, so the result is 0.

  Constraints:
      1 <= text1.length, text2.length <= 1000
      text1 and text2 consist of only lowercase English characters.
*/


const longestCommonSubsequence = (text1, text2) => {
    const cache = [...Array(text1.length)].map(() => Array(text2.length).fill(undefined))

    const lcs = (i=text1.length, j=text2.length) => {
        if (i === 0 || j === 0)
            return 0

        if (cache[i - 1][j - 1] !== undefined)
            return cache[i - 1][j - 1]

        if (text1[i - 1] === text2[j - 1])
            cache[i - 1][j - 1] = 1 + lcs(i - 1, j - 1)
        else
            cache[i - 1][j - 1] = Math.max(lcs(i, j - 1), lcs(i - 1, j))

        return cache[i - 1][j - 1]
    }

    return lcs(text1.length, text2.length)
}


console.assert(longestCommonSubsequence('abcde', 'ace') === 3)
console.assert(longestCommonSubsequence('abc', 'abc') === 3)
console.assert(longestCommonSubsequence('abc', 'def') === 0)
