/*
  516. Longest Palindromic Subsequence
  Medium

  Given a string s, find the longest palindromic subsequence's length in s.

  A subsequence is a sequence that can be derived from another sequence by deleting some or no elements without changing the order of the remaining elements.

  Example 1:
    Input: s = "bbbab"
    Output: 4
    Explanation: One possible longest palindromic subsequence is "bbbb".

  Example 2:
    Input: s = "cbbd"
    Output: 2
    Explanation: One possible longest palindromic subsequence is "bb".

  Constraints:
      1 <= s.length <= 1000
      s consists only of lowercase English letters.
*/


const longestPalindromeSubseqTopDown = s => {
    // Cantor pairing function
    // Feel free to swap out with any other hash function you like e.g.
    // const hash = (a, b) => `${a}, ${b}`
    const hash = (a, b) => (a + b) * (a + b + 1) / 2 + b
    const cache = new Map()

    // LPS = Longest Palindromic Subsequence
    const lps = (left, right) => {
        if (cache.has(hash(left, right)))
            return cache.get(hash(left, right))

        if (left > right)
            return 0

        if (left === right)
            return 1

        const longest = s[left] === s[right]
                        ? 2 + lps(left + 1, right - 1)
                        : Math.max(lps(left + 1, right), lps(left, right - 1))

        cache.set(hash(left, right), longest)

        return longest
    }

    return lps(0, s.length - 1)
}

const longestPalindromeSubseqBottomUp = s => {
    // Where subproblems[left][right] = longest palindromic subsequence of
    // s[left] to s[right]
    const subproblems = Array(s.length).fill(undefined)
                                       .map(() => Array(s.length).fill(0))

    // Add base cases: single-letter subsequences
    // Technically any subsequence where right < left is also a base case -
    // equal to 0. But these have already been populated during initialisation
    for (let letter = 0; letter < s.length; letter++)
        subproblems[letter][letter] = 1

    // Notice we avoid iterating on the single-letter subsequences
    for (let left = s.length - 2; 0 <= left; left--)
        for (let right = left + 1; right < s.length; right++)
            subproblems[left][right] = s[left] === s[right]
                                       ? 2 + subproblems[left + 1][right - 1]
                                       : Math.max(subproblems[left + 1][right],
                                                  subproblems[left][right - 1])

    return subproblems[0][s.length - 1]
}


const longestPalindromeSubseq = s => {
    // return longestPalindromeSubseqTopDown(s)
    return longestPalindromeSubseqBottomUp(s)
}


console.assert(longestPalindromeSubseq("bbbab") === 4)
console.assert(longestPalindromeSubseq("cbbd") === 2)
