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


const climbStairs = n => {
    // number of 'n' stairs -> how many distinct ways to climb 'n' stairs
    const howManyWays = Array(n + 1).fill(-Infinity)
    // Base cases
    howManyWays[0] = 1
    howManyWays[1] = 1
    // Start at n = 2 because we already know the base cases
    for (let numStairs = 2; numStairs < n + 1; numStairs++)
        // We can either take one step or two steps,
        // We can simply add the number of ways for n - 1 and n - 2 steps
        howManyWays[numStairs] = howManyWays[numStairs - 1] + howManyWays[numStairs - 2]

    return howManyWays[n]
}


console.assert(climbStairs(2) === 2)
console.assert(climbStairs(3) === 3)
