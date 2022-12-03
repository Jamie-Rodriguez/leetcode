/*
  494. Target Sum
  Medium

  You are given an integer array nums and an integer target.

  You want to build an expression out of nums by adding one of the symbols '+' and '-' before each integer in nums and then concatenate all the integers.

      For example, if nums = [2, 1], you can add a '+' before 2 and a '-' before 1 and concatenate them to build the expression "+2-1".

  Return the number of different expressions that you can build, which evaluates to target.

  Example 1:
      Input: nums = [1,1,1,1,1], target = 3
      Output: 5
      Explanation: There are 5 ways to assign symbols to make the sum of nums be target 3.
      -1 + 1 + 1 + 1 + 1 = 3
      +1 - 1 + 1 + 1 + 1 = 3
      +1 + 1 - 1 + 1 + 1 = 3
      +1 + 1 + 1 - 1 + 1 = 3
      +1 + 1 + 1 + 1 - 1 = 3

  Example 2:
      Input: nums = [1], target = 1
      Output: 1

  Constraints:
      1 <= nums.length <= 20
      0 <= nums[i] <= 1000
      0 <= sum(nums[i]) <= 1000
      -1000 <= target <= 1000
*/


const findTargetSumWays = (nums, target) => {
    /*
      Using Map instead of Object because was getting "Time Limit Exceeded"
      errors. Testing confirmed a large performance improvement when using Map.
      According to https://stackoverflow.com/a/66932877 Map is more optimised
      for large amounts of writes
    */
    const cache = new Map()

    /*
      'index' is 1-indexed
      Because index = 0, sum = 0 needs to be reserved for the root of the tree.
      The first item 'n' needs to be recorded as both +n and -n, and so on...
    */
    const dp = (index, sum) => {
        const key = `i:${index}, sum:${sum}`

        if (cache.has(key))
            return cache.get(key)

        if (index === nums.length)
            return sum === target ? 1 : 0

        cache.set(key, dp(index + 1, sum + nums[index]) + dp(index + 1, sum - nums[index]))

        return cache.get(key)
    }

    return dp(0, 0)
}


console.assert(findTargetSumWays([1,1,1,1,1],3) === 5)
console.assert(findTargetSumWays([1],1) === 1)
// Time limit exceeded
console.assert(findTargetSumWays([2,107,109,113,127,131,137,3,2,3,5,7,11,13,17,19,23,29,47,53],899) === 0)
console.assert(findTargetSumWays([28,29,35,48,9,9,3,22,43,0,33,3,3,11,44,39,35,0,25,8],25) === 6672)
