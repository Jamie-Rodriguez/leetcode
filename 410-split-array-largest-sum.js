/*
  410. Split Array Largest Sum
  Hard

  Given an array nums which consists of non-negative integers and an integer m, you can split the array into m non-empty continuous subarrays.

  Write an algorithm to minimize the largest sum among these m subarrays.

  Example 1:
      Input: nums = [7,2,5,10,8], m = 2
      Output: 18
      Explanation:
      There are four ways to split nums into two subarrays.
      The best way is to split it into [7,2,5] and [10,8],
      where the largest sum among the two subarrays is only 18.

  Example 2:
      Input: nums = [1,2,3,4,5], m = 2
      Output: 9

  Example 3:
      Input: nums = [1,4,4], m = 3
      Output: 4

  Constraints:
      1 <= nums.length <= 1000
      0 <= nums[i] <= 10^6
      1 <= m <= min(50, nums.length)
*/


// O(nums)
const numSubArrays = (nums, max) => {
    let currentSum = 0
    let splits = 0

    for (let i = 0; i < nums.length; i++) {
        currentSum += nums[i]

        if (currentSum > max) {
            currentSum = nums[i]
            splits++
        }
    }

    // Returning the number of *subarrays*, which is the number of splits + 1
    return splits + 1
}


const splitArray = (nums, m) => {
    let left = Math.max(...nums) // O(nums)
    let right = nums.reduce((sum, num) => num + sum, 0) // O(nums)
    let largestSum = 0

    // O(log(sum(nums)))
    while (left <= right) {
        let mid = left + Math.floor((right - left) / 2)

        // If num sub arrays <= m,
        // Then search toward the left, because 'mid' is too big
        // O(nums)
        if (numSubArrays(nums, mid) <= m) {
            right = mid - 1
            largestSum = mid
        } else
            left = mid + 1
    }

    return largestSum
}


console.assert(splitArray([7,2,5,10,8], 2) === 18)
console.assert(splitArray([1,2,3,4,5], 2) === 9)
console.assert(splitArray([1,4,4], 3) === 4)
