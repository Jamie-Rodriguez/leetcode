/*
  198. House Robber
  Medium

  You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night.

  Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.

  Example 1:
      Input: nums = [1,2,3,1]
      Output: 4
      Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
      Total amount you can rob = 1 + 3 = 4.

  Example 2:
      Input: nums = [2,7,9,3,1]
      Output: 12
      Explanation: Rob house 1 (money = 2), rob house 3 (money = 9) and rob house 5 (money = 1).
      Total amount you can rob = 2 + 9 + 1 = 12.

  Constraints:
      1 <= nums.length <= 100
      0 <= nums[i] <= 400
*/


const robRecurMemo = (nums, i, cache) => {
    if (i >= nums.length) {
        return 0
    }

    /*
      At every 'i'th house, there are two options:
      Rob house i
         We get nums[i] and since we can't rob house 'i+1', we next examine house 'i+2'
      Don't rob house i
         We don't get any value, examine next house 'i+1'
      We will take whichever decision gives us the greater return
    */
    if (cache[i] === undefined) {
        cache[i] = Math.max(nums[i] + robRecurMemo(nums, i+2, cache), robRecurMemo(nums, i+1, cache))
    }

    return cache[i]
}

const robIterative = nums => {
    // Skip if length == 1 because otherwise
    // we write to cache[1], which breaks the return at the end
    if (nums.length === 1) {
        return nums[0]
    }

    // Cache is the cumulative sum of the maximum possible value at index i
    const cache = Array(nums.length).fill(undefined)
    cache[0] = nums[0]
    cache[1] = Math.max(nums[0], nums[1])

    for (let i = 2; i < nums.length; i++) {
        cache[i] = Math.max(nums[i] + cache[i-2], cache[i-1])
    }

    return cache[cache.length - 1]
}


const rob = nums => {
    // return robIterative(nums)
    return robRecurMemo(nums, 0, Array(nums.length).fill(undefined))
}


console.assert(rob([1,2,3,1]) === 4)
console.assert(rob([2,7,9,3,1]) === 12)
console.assert(rob([0]) === 0)
// Time-limit exceeded test
console.assert(rob([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]) === 0)
