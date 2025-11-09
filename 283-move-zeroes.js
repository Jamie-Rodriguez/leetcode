/*
  283. Move Zeroes
  Easy

  Given an integer array `nums`, move all `0`'s to the end of it while maintaining the relative order of the non-zero elements.

   **Note** that you must do this in-place without making a copy of the array.

  Example 1:
      Input: nums = [0,1,0,3,12]
      Output: [1,3,12,0,0]

  Example 2:
      Input: nums = [0]
      Output: [0]

  Constraints:
      * `1 <= nums.length <= 10^4`
      * `-2^31 <= nums[i] <= 2^31 - 1`

  **Follow up**: Could you minimize the total number of operations done?
*/


/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
const moveZeroes = nums => {
    let lastNonZero = 0
    let tempSwap = nums[0]

    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== 0) {
            tempSwap = nums[lastNonZero]
            nums[lastNonZero] = nums[i]
            nums[i] = tempSwap

            lastNonZero++
        }
    }
}


const arraysEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length)
        return false

    for (let i = 0; i < arr1.length; i++)
        if (arr1[i] !== arr2[i])
            return false

    return true
}


let nums = [0,1,0,3,12]
moveZeroes(nums)
console.assert(arraysEqual(nums, [1,3,12,0,0]))

nums = [0]
moveZeroes(nums)
console.assert(arraysEqual(nums, [0]))
