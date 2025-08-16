/*
  33. Search in Rotated Sorted Array
  Medium

  There is an integer array `nums` sorted in ascending order (with **distinct** values).

  Prior to being passed to your function, `nums` is **possibly left rotated** at an unknown index `k` (`1 <= k < nums.length`) such that the resulting array is `[nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]` (**0-indexed**). For example, `[0,1,2,4,5,6,7]` might be left rotated by `3` indices and become `[4,5,6,7,0,1,2]`.

  Given the array `nums` **after** the possible rotation and an integer target, return *the index of target if it is in `nums`, or -1 if it is not in `nums`*.

  You must write an algorithm with `O(log n)` runtime complexity.

  Example 1:
      Input: nums = [4,5,6,7,0,1,2], target = 0
      Output: 4

  Example 2:
      Input: nums = [4,5,6,7,0,1,2], target = 3
      Output: -1

  Example 3:
      Input: nums = [1], target = 0
      Output: -1

  Constraints:
      1 <= nums.length <= 5000
      -10^4 <= nums[i] <= 10^4
      All values of `nums` are unique.
      `nums` is an ascending array that is possibly rotated.
      -10^4 <= target <= 10^4
*/


/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
const search = (nums, target) => {
    let l = 0               // left
    let r = nums.length - 1 // right

    while (l < r) {
        const m = l + Math.floor((r - l) / 2) // middle

        if (nums[l] <= nums[m]) // Left half is sorted
            if (nums[l] <= target && target <= nums[m]) // Target is within the sorted left range
                r = m
            else                                        // Target must be in the right half
                l = m + 1
        else                    // Right half is sorted
            if (nums[m] < target && target <= nums[r]) // Target is within the sorted right range
                l = m + 1
            else                                       // Target must be in the left half
                r = m
    }

    return nums[l] === target ? l : -1
}


console.assert(search([4,5,6,7,0,1,2], 0) === 4)
console.assert(search([4,5,6,7,0,1,2], 3) === -1)
console.assert(search([1], 0) === -1)
console.assert(search([1,3,5], 3) === 1)
console.assert(search([5,1,3], 5) === 0)
