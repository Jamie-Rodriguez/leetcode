/*
  3. Longest Substring Without Repeating Characters
  Medium

  Given a string s, find the length of the longest substring without repeating characters.

  Example 1:
      Input: s = "abcabcbb"
      Output: 3
      Explanation: The answer is "abc", with the length of 3.

  Example 2:
      Input: s = "bbbbb"
      Output: 1
      Explanation: The answer is "b", with the length of 1.

  Example 3:
      Input: s = "pwwkew"
      Output: 3
      Explanation: The answer is "wke", with the length of 3.
  Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.

  Constraints:
      0 <= s.length <= 5 * 10^4
      s consists of English letters, digits, symbols and spaces.
*/


const lengthOfLongestSubstring = s => {
    const seen = {}
    let left = 0
    let maxDistance = 0

    for (let right = 0; right < s.length; right++) {
        const currentChar = s[right]

        // How the two-pointer technique works in this algorithm
        // -----------------------------------------------------
        // The goal is that we want to ensure that
        // there are no duplicate characters between the left and right pointers.
        // If we have found a previously-seen character,
        // move left pointer 1 ahead of the character's previously seen position;
        // thus ensuring that this character is not repeated between the left and right pointers.
        // Example (ignore spaces):
        //        a c b d a c k k l
        //        l       r
        //     We have seen character 'a' before, at index 0.
        //     Move left pointer to index 1 (i.e. 1 ahead of previously seen 'a')
        //        a c b d a c k k l
        //          l     r
        //     Next we hit the second 'c':
        //        a c b d a c k k l
        //          l       r
        //     We have seen character 'c' before, at index 1.
        //     Move left pointer to index 2 (i.e. 1 ahead of previously seen 'c')
        //        a c b d a c k k l
        //            l     r
        //     Fast-forward to when we hit the second 'k':
        //        a c b d a c k k l
        //            l         r
        //     We have seen character 'k' before, at index 6.
        //     Move left pointer to index 7 (i.e. 1 ahead of previously seen 'k')
        //     (left pointer and right pointer are at same position here)
        //        a c b d a c k k l
        //                      lr
        if ((currentChar in seen) && (left < seen[currentChar])) {
            // Could remove second condition and just put:
            //     left = Math.max(seen[currentChar], left)
            left = seen[currentChar]
        }

        // Offset the indexes and distance by 1 because of the case when
        // 's' is only one character - distance should be 1, not 0

        // Update maxDistance if we found a longer distance
        // Effectively just:
        //     maxDistance = Math.max(maxDistance, right - left + 1)
        const currentDistance = right - left + 1
        if (currentDistance > maxDistance) {
            maxDistance = currentDistance
        }

        // This updates the 'seen' map with the
        // latest-seen indexes of each letter in the map
        seen[currentChar] = right + 1
    }

    return maxDistance
}


console.assert(lengthOfLongestSubstring('abcabcbb') === 3)
console.assert(lengthOfLongestSubstring('bbbbb') === 1)
console.assert(lengthOfLongestSubstring('pwwkew') === 3)
console.assert(lengthOfLongestSubstring('abba') === 2)
console.assert(lengthOfLongestSubstring('') === 0)
console.assert(lengthOfLongestSubstring(' ') === 1)
console.assert(lengthOfLongestSubstring('acbdackkl') === 5)

