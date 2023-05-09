/*
  70. Climbing Stairs
  Easy

  You are climbing a staircase. It takes n steps to reach the top.

  Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

  Example 1:
      Input: n = 2
      Output: 2
      Explanation: There are two ways to climb to the top.
          1. 1 step + 1 step
          2. 2 steps

  Example 2:
      Input: n = 3
      Output: 3
      Explanation: There are three ways to climb to the top.
          1. 1 step + 1 step + 1 step
          2. 1 step + 2 steps
          3. 2 steps + 1 step

  Constraints:
      1 <= n <= 45
*/


const climbStairsTopDownMemoised = n => {
    const cache = Array(n + 1).fill(undefined)
    // We don't actually hit these base cases,
    // but I included them for completeness' sake...
    cache[0] = 1
    cache[1] = 1
    cache[2] = 2

    const numPaths = n => {
        // Base cases
        if (n === 1)
            return 1
        if (n === 2)
            return 2
        // Cache hit
        if (cache[n])
            return cache[n]

        // Not in cache - compute new result
        return cache[n] = numPaths(n - 1) + numPaths(n - 2)
    }

    return numPaths(n)
}

const climbStairsBottomUpTabular = n => {
    const subProblem = Array(n + 1).fill(undefined)
    // Base cases
    subProblem[0] = 1
    subProblem[1] = 1
    subProblem[2] = 2

    for (let i = 3; i <= n; i++)
        subProblem[i] = subProblem[i - 1] + subProblem[i - 2]

    return subProblem[n]
}


console.assert(climbStairs(2) === 2)
console.assert(climbStairs(3) === 3)
