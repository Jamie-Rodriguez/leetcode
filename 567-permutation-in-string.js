/*
  567. Permutation in String
  Medium

  Given two strings s1 and s2, return true if s2 contains a permutation of s1, or false otherwise.

  In other words, return true if one of s1's permutations is the substring of s2.

  Example 1:
      Input: s1 = "ab", s2 = "eidbaooo"
      Output: true
      Explanation: s2 contains one permutation of s1 ("ba").

  Example 2:
      Input: s1 = "ab", s2 = "eidboaoo"
      Output: false

  Constraints:
      1 <= s1.length, s2.length <= 10^4
      s1 and s2 consist of lowercase English letters.
*/


const checkInclusion = (s1, s2) => {
    if (s1.length > s2.length)
        return false


    const s1Freqs = {}

    for (const letter of s1)
        s1Freqs[letter] = 1 + (s1Freqs[letter] ?? 0)

    const s2WindowFreqs = {}

    for (let i = 0; i < s1.length; i++)
        s2WindowFreqs[s2[i]] = 1 + (s2WindowFreqs[s2[i]] ?? 0)

    if (Object.entries(s1Freqs)
              .map(([letter, freq]) => s2WindowFreqs[letter] === freq)
              .reduce((acc, match) => acc && match, true))
        return true


    for (let i = 1; i < (s2.length - s1.length + 1); i++) {
        s2WindowFreqs[s2[i - 1]]--
        const windowEndLetter = s2[i + s1.length - 1]
        s2WindowFreqs[windowEndLetter] = 1 + (s2WindowFreqs[windowEndLetter] ?? 0)

        if (Object.entries(s1Freqs)
                  .map(([letter, freq]) => s2WindowFreqs[letter] === freq)
                  .reduce((acc, match) => acc && match, true))
            return true
    }

    return false
}


console.assert(checkInclusion('ab', 'eidbaooo') === true)
console.assert(checkInclusion('ab', 'eidboaoo') === false)
