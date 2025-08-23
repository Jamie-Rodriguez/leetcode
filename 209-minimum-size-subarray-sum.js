/*
  209. Minimum Size Subarray Sum
  Medium

  Given an array of positive integers `nums` and a positive integer `target`, return *the **minimal length** of a whose sum is greater than or equal to `target`*. If there is no such subarray, return `0` instead.

  Example 1:
      Input: target = 7, nums = [2,3,1,2,4,3]
      Output: 2
      Explanation: The subarray [4,3] has the minimal length under the problem constraint.

  Example 2:
      Input: target = 4, nums = [1,4,4]
      Output: 1

  Example 3:
      Input: target = 11, nums = [1,1,1,1,1,1,1,1]
      Output: 0

  Constraints:
      - `1 <= target <= 10^9`
      - `1 <= nums.length <= 10^5`
      - `1 <= nums[i] <= 10^4`

  Follow up: If you have figured out the `O(n)` solution, try coding another solution of which the time complexity is `O(n log(n))`.
*/


/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
const minSubArrayLen = (target, nums) => {
    let left = 0
    let right = 0
    let sum = nums[0]
    let minimum = Infinity

    while (left < nums.length && right < nums.length) {
        if (sum >= target) {
            minimum = Math.min(minimum, right - left + 1)
            sum -= nums[left++]
        } else {
            sum += nums[++right]
        }
    }

    return minimum === Infinity ? 0 : minimum
}


console.assert(minSubArrayLen(7, [2,3,1,2,4,3]) === 2)
console.assert(minSubArrayLen(4, [1,4,4]) === 1)
console.assert(minSubArrayLen(11, [1,1,1,1,1,1,1,1]) === 0)
