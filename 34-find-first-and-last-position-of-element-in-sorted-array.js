/*
  34. Find First and Last Position of Element in Sorted Array
  Medium

  Given an array of integers nums sorted in non-decreasing order, find the starting and ending position of a given target value.

  If target is not found in the array, return [-1, -1].

  You must write an algorithm with O(log n) runtime complexity.

  Example 1:
      Input: nums = [5,7,7,8,8,10], target = 8
      Output: [3,4]

  Example 2:
      Input: nums = [5,7,7,8,8,10], target = 6
      Output: [-1,-1]

  Example 3:
      Input: nums = [], target = 0
      Output: [-1,-1]

  Constraints:
      0 <= nums.length <= 10^5
      -10^9 <= nums[i] <= 10^9
      nums is a non-decreasing array.
      -10^9 <= target <= 10^9
*/


const searchRange = (nums, target) => {
    if (nums.length < 1) {
        return [-1, -1]
    }

    let left = 0
    let right = nums.length - 1
    while (left <= right) {
        const middle = left + Math.floor((right - left) / 2)

        if (nums[middle] < target) {
            left = middle + 1
        } else {
            right = middle - 1
        }
    }

    const leftBound = left

    // We know that the rightmost point can't be further left than the left position
    // Shorten the search a little bit
    left = right + 1
    right = nums.length - 1
    while (left <= right) {
        const middle = left + Math.floor((right - left) / 2)

        if (nums[middle] <= target) {
            left = middle + 1
        } else {
            right = middle - 1
        }
    }

    const rightBound = right

    return ((nums[leftBound] === nums[rightBound]) && (nums[leftBound] === target)) ? [leftBound, rightBound] : [-1, -1]
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

console.assert(compareArrays(searchRange([5,7,7,8,8,10], 8), [3,4]))
console.assert(compareArrays(searchRange([5,7,7,8,8,10], 6), [-1,-1]))
console.assert(compareArrays(searchRange([], 0), [-1,-1]))
console.assert(compareArrays(searchRange([1], 1), [0,0]))
console.assert(compareArrays(searchRange([1, 1, 1, 1, 1], 1), [0,4]))
