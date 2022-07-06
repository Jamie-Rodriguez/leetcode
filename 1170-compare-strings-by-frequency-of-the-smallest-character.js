/*
  1170. Compare Strings by Frequency of the Smallest Character
  Medium

  Let the function f(s) be the frequency of the lexicographically smallest character in a non-empty string s. For example, if s = "dcce" then f(s) = 2 because the lexicographically smallest character is 'c', which has a frequency of 2.

  You are given an array of strings words and another array of query strings queries. For each query queries[i], count the number of words in words such that f(queries[i]) < f(W) for each W in words.

  Return an integer array answer, where each answer[i] is the answer to the ith query.

  Example 1:
      Input: queries = ["cbd"], words = ["zaaaz"]
      Output: [1]
      Explanation: On the first query we have f("cbd") = 1, f("zaaaz") = 3 so f("cbd") < f("zaaaz").

  Example 2:
      Input: queries = ["bbb","cc"], words = ["a","aa","aaa","aaaa"]
      Output: [1,2]
      Explanation: On the first query only f("bbb") < f("aaaa"). On the second query both f("aaa") and f("aaaa") are both > f("cc").

  Constraints:
      1 <= queries.length <= 2000
      1 <= words.length <= 2000
      1 <= queries[i].length, words[i].length <= 10
      queries[i][j], words[i][j] consist of lowercase English letters.
*/


// O(length of word)
// Assumption: 1 <= queries[i].length, words[i].length <= 10
const frequencySmallestLetter = word => {
    const frequencies = {}
    let smallestChar = 'z'

    for (const letter of word) {
        // In JavaScript, characters can be compared lexicographically directly
        if (letter < smallestChar) {
            smallestChar = letter
        }

        frequencies[letter] = (frequencies[letter] || 0) + 1
    }

    return frequencies[smallestChar]
}

// O(# queries) * O(# words)
const numSmallerByFrequency = (queries, words) => {
    // O(# queries)
    const queriesFreqs = queries.map(q => frequencySmallestLetter(q))
    // O(# words)
    const wordsFreqs = words.map(w => frequencySmallestLetter(w))

    // O(# queries) * O(# words)
    return queriesFreqs.map(q => wordsFreqs.reduce((n, freq) => q < freq ? n + 1 : n, 0))
}


const compareArrays = (a, b) => {
    if (a.length !== b.length) {
        return false
    }

    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
            return false
        }
    }

    return true
}

console.assert(compareArrays(numSmallerByFrequency(["cbd"],["zaaaz"]), [1]))
console.assert(compareArrays(numSmallerByFrequency(["bbb","cc"],["a","aa","aaa","aaaa"]), [1,2]))
