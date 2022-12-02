/*
  1027. Longest Arithmetic Subsequence
  Medium

  Given an array nums of integers, return the length of the longest arithmetic subsequence in nums.

  Recall that a subsequence of an array nums is a list nums[i_1], nums[i_2], ..., nums[i_k] with 0 <= i_1 < i_2 < ... < i_k <= nums.length - 1, and that a sequence seq is arithmetic if seq[i+1] - seq[i] are all the same value (for 0 <= i < seq.length - 1).

  Example 1:
      Input: nums = [3,6,9,12]
      Output: 4
      Explanation:
      The whole array is an arithmetic sequence with steps of length = 3.

  Example 2:
      Input: nums = [9,4,7,2,10]
      Output: 3
      Explanation:
      The longest arithmetic subsequence is [4,7,10].

  Example 3:
      Input: nums = [20,1,15,3,10,5,8]
      Output: 4
      Explanation:
      The longest arithmetic subsequence is [20,15,10,5].

  Constraints:
      2 <= nums.length <= 1000
      0 <= nums[i] <= 500
*/


const longestArithSeqLength = nums => {
    let las = 1 // Longest Arithmetic Subsequence
    // LAS[fromIndex][diff]
    let lengthLasFromIndex = [...Array(nums.length)].map(() => new Map())

    // Go in reverse order and build up the LAS from each index until we get to
    // the start
    for (let i = nums.length - 1; i >= 0; i--) {
        for (let j = i + 1; j < nums.length; j++) {
            const diff = nums[j] - nums[i]

            lengthLasFromIndex[i].set(diff,
                                      1 + lengthLasFromIndex[j].get(diff) || 2)

            las = Math.max(las, lengthLasFromIndex[i].get(diff))
        }
    }

    return las
}


console.assert(longestArithSeqLength([3,6,9,12]) === 4)
console.assert(longestArithSeqLength([9,4,7,2,10]) === 3)
console.assert(longestArithSeqLength([20,1,15,3,10,5,8]) === 4)
