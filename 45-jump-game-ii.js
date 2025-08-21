/*
  45. Jump Game II
  Medium

  You are given a **0-indexed** array of integers `nums` of length `n`. You are initially positioned at index 0.

  Each element `nums[i]` represents the maximum length of a forward jump from index `i`. In other words, if you are at index `i`, you can jump to any index `(i + j)` where:
      - `0 <= j <= nums[i]` and
      - `i + j < n`

  Return _the minimum number of jumps to reach index_ `n - 1`. The test cases are generated such that you can reach index `n - 1`.

  Example 1:
      Input: nums = [2,3,1,1,4]
      Output: 2
      Explanation: The minimum number of jumps to reach the last index is 2. Jump 1 step from index 0 to 1, then 3 steps to the last index.

  Example 2:
      Input: nums = [2,3,0,1,4]
      Output: 2

  Constraints:
      - `1 <= nums.length <= 10^4`
      - `0 <= nums[i] <= 1000`
      - It's guaranteed that you can reach `nums[n - 1]`.
*/


// O(n^2) time and O(n) space complexity
/**
 * @param {number[]} nums
 * @return {number}
 */
const jumpTopDown = nums => {
    // index -> minimum number of jumps to reach the end from that index
    const minJumps = new Array(nums.length).fill(undefined)

    // Minimum number of jumps to reach index i
    const minimumJumpsFrom = i => {
        if (minJumps[i] !== undefined)
            return minJumps[i]
        // Base case
        if (i === nums.length - 1)
            return 0

        let jumps = Infinity

        for (let j = 1; j <= nums[i]; j++)
            if (i + j < nums.length)
                jumps = Math.min(jumps, 1 + minimumJumpsFrom(i + j))

        minJumps[i] = jumps

        return jumps
    }

    return minimumJumpsFrom(0)
}

// O(n^2) time and O(n) space complexity
/**
 * @param {number[]} nums
 * @return {number}
 */
const jumpBottomUp = nums => {
    // index -> minimum number of jumps to reach the end from that index
    const minJumps = new Array(nums.length).fill(Infinity)

    // Base case
    minJumps[minJumps.length - 1] = 0

    for (let i = nums.length - 2; 0 <= i; i--)
        for (let j = 1; j <= nums[i]; j++)
            if (i + j < nums.length)
                minJumps[i] = Math.min(minJumps[i], 1 + minJumps[i + j])

    return minJumps[0]
}

// Uses a pseudo-BFS approach to find the minimum number of jumps in a greedy
// manner
// O(n) time and O(1) space complexity
/**
 * @param {number[]} nums
 * @return {number}
 */
const jumpGreedyBFS = nums => {
    let jumps = 0
    let levelEnd = 0
    let farthestReachable = 0

    for (let i = 0; i < nums.length - 1; i++) {
        farthestReachable = Math.max(farthestReachable, i + nums[i])

        // End of the current "level"
        if (i === levelEnd) {
            jumps++
            levelEnd = farthestReachable
        }
    }

    return jumps
}


console.assert(jumpGreedyBFS([2,3,1,1,4]) === 2)
console.assert(jumpGreedyBFS([2,3,0,1,4]) === 2)
console.assert(jumpGreedyBFS([9,4,5,4,1,8,1,2,0,7,8,7,0,6,6,1,1,2,5,0,9,8,4,7,9,6,8,1,4,0,8,5,5,3,9,8,1,2,2,3,0,1,3,2,7,9,3,0,1]) === 8)
