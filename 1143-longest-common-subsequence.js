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


const lcsTopDown = (text1, text2) => {
    const hash = (a, b) => (a + b) * (a + b + 1) / 2 + b
    const cache = new Map()

    const lcs = (i, j) => {
        if (text1.length <= i || text2.length <= j)
            return 0

        if (cache.has(hash(i, j)))
            return cache.get(hash(i, j))

        const lcsSize = text1[i] === text2[j] ? 1 + lcs(i + 1, j + 1)
                                              : Math.max(lcs(i + 1, j),
                                                         lcs(i, j + 1))

        cache.set(hash(i, j), lcsSize)

        return lcsSize
    }

    return lcs(0, 0)
}

const lcsBottomUp = (text1, text2) => {
    const subproblems = Array(text1.length).fill(undefined)
                                           .map(() => Array(text2.length).fill(undefined))

    // Base cases
    subproblems[text1.length - 1][text2.length - 1] = text1[text1.length - 1] === text2[text2.length - 1]


    for (let i = text1.length - 1; 0 <= i; i--)
        for (let j = subproblems[i].length - 1; 0 <= j; j--) {
            // Don't overwrite base case
            if ((i === text1.length - 1) && (j === text2.length - 1))
                continue

            subproblems[i][j] = text1[i] === text2[j]
                                ? 1 + (i + 1 < text1.length && j + 1 < text2.length
                                       ? subproblems[i + 1][j + 1] : 0)
                                : Math.max(i + 1 < text1.length ? subproblems[i + 1][j] : 0,
                                           j + 1 < text2.length ? subproblems[i][j + 1] : 0)
        }

    return subproblems[0][0]
}


const longestCommonSubsequence = (text1, text2) => lcsBottomUp(text1, text2)


console.assert(longestCommonSubsequence('abcde', 'ace') === 3)
console.assert(longestCommonSubsequence('abc', 'abc') === 3)
console.assert(longestCommonSubsequence('abc', 'def') === 0)
