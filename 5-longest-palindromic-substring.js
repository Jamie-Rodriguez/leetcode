/*
  5. Longest Palindromic Substring
  Medium

  Given a string s, return the longest palindromic substring in s.

  Example 1:
      Input: s = "babad"
      Output: "bab"
      Explanation: "aba" is also a valid answer.

  Example 2:
      Input: s = "cbbd"
      Output: "bb"

  Constraints:
      1 <= s.length <= 1000
      s consist of only digits and English letters.
*/


const longestPalindrome = s => {
    // Edge cases
    if (s.length <= 1)
        return s

    let longest = ''

    for (let i = 0; i < s.length; i++) {
        let l = i
        let r = i

        // Odd-length substrings
        while (l >= 0 && r < s.length && s[l] === s[r]) {
            if ((r - l + 1) > longest.length)
                longest = s.substring(l, r + 1)

            l--
            r++
        }

        l = i
        r = i + 1
        // Even-length substrings
        while (l >= 0 && r < s.length && s[l] === s[r]) {
            if ((r - l + 1) > longest.length)
                longest = s.substring(l, r + 1)

            l--
            r++
        }
    }

    return longest
}


console.assert(longestPalindrome('babad') === 'bab' || longestPalindrome('babad') === 'aba')
console.assert(longestPalindrome('cbbd') === 'bb')

// Unofficial test cases
console.assert(longestPalindrome('a') === 'a')
console.assert(longestPalindrome('bb') === 'bb')
console.assert(longestPalindrome('abbac') === 'abba')
console.assert(longestPalindrome('abcbac') === 'abcba')
