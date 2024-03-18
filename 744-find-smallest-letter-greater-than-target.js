/*
  744. Find Smallest Letter Greater Than Target
  Easy

  You are given an array of characters letters that is sorted in non-decreasing order, and a character target. There are at least two different characters in letters.

  Return the smallest character in letters that is lexicographically greater than target. If such a character does not exist, return the first character in letters.

  Example 1:
  Input: letters = ["c","f","j"], target = "a"
  Output: "c"
  Explanation: The smallest character that is lexicographically greater than 'a' in letters is 'c'.

  Example 2:
  Input: letters = ["c","f","j"], target = "c"
  Output: "f"
  Explanation: The smallest character that is lexicographically greater than 'c' in letters is 'f'.

  Example 3:
  Input: letters = ["x","x","y","y"], target = "z"
  Output: "x"
  Explanation: There are no characters in letters that is lexicographically greater than 'z' so we return letters[0].

  Constraints:
      2 <= letters.length <= 10^4
      letters[i] is a lowercase English letter.
      letters is sorted in non-decreasing order.
      letters contains at least two different characters.
      target is a lowercase English letter.
*/


const nextGreatestLetter = (letters, target) => {
    let l = 0
    let r = letters.length - 1

    while (l <= r) {
        const mid = Math.floor((r - l) / 2) + l

        if (letters[mid] <= target)
            l = mid + 1
        else
            r = mid - 1
    }

    return l < letters.length ? letters[l] : letters[0]
}


console.assert(nextGreatestLetter(['c','f','j'], 'a') === 'c')
console.assert(nextGreatestLetter(['c','f','j'], 'c') === 'f')
console.assert(nextGreatestLetter(['x','x','y','y'], 'z') === 'x')
