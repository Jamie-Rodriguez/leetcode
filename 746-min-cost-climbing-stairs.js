/*
  746. Min Cost Climbing Stairs
  Easy

  You are given an integer array cost where cost[i] is the cost of ith step on a staircase. Once you pay the cost, you can either climb one or two steps.

  You can either start from the step with index 0, or the step with index 1.

  Return the minimum cost to reach the top of the floor.

  Example 1:
      Input: cost = [10,15,20]
      Output: 15
      Explanation: You will start at index 1.
          - Pay 15 and climb two steps to reach the top.
          The total cost is 15.

  Example 2:
      Input: cost = [1,100,1,1,1,100,1,1,100,1]
      Output: 6
      Explanation: You will start at index 0.
          - Pay 1 and climb two steps to reach index 2.
          - Pay 1 and climb two steps to reach index 4.
          - Pay 1 and climb two steps to reach index 6.
          - Pay 1 and climb one step to reach index 7.
          - Pay 1 and climb two steps to reach index 9.
          - Pay 1 and climb one step to reach the top.
          The total cost is 6.

  Constraints:
      2 <= cost.length <= 1000
      0 <= cost[i] <= 999
*/


// NOTE: "Top of the staircase" is defined as index at cost.length!
// See example: minCostClimbingStairs([10, 15, 20]) = 15
// Start at index 1, pay 15 and climb two steps to reach the top at index 3!


// This solution begins from the destination step and explores possibilities in reverse
// Could also do this the other way (begin at step 0 and branch until finding the final step)
const minCostClimbingStairsTopDownMemoised = cost => {
    // Append the final stair required to land on. It's cost is zero.
    // We can then begin exploring combinations of steps from this location.
    cost.push(0)
    const cache = Array(cost.length).fill(undefined)

    const minimumCost = step => {
        if (step === 0)
            return cost[0]
        if (step === 1)
            return cost[1]
        // cache hit
        if (cache[step])
            return cache[step]

        return cache[step] = cost[step] + Math.min(minimumCost(step - 1), minimumCost(step - 2))
    }

    return minimumCost(cost.length - 1)
}

const minCostClimbingStairsBottomUpTabular = cost => {
    // Append the final stair required to land on. It's cost is zero.
    cost.push(0)
    // subProblems[n] = Minimal cost to get to stair n,
    // from either stair 0 or 1
    const subProblems = Array(cost.length).fill(undefined)

    // Base cases
    subProblems[0] = cost[0]
    subProblems[1] = cost[1]
    subProblems[subProblems.length - 1] = 0

    for (let i = 2; i < subProblems.length; i++)
        subProblems[i] = cost[i] + Math.min(subProblems[i - 1], subProblems[i - 2])

    return subProblems[subProblems.length - 1]
}


console.assert(minCostClimbingStairsTopDownMemoised([10,15,20]) === 15)
console.assert(minCostClimbingStairsTopDownMemoised([1,100,1,1,1,100,1,1,100,1]) === 6)
console.assert(minCostClimbingStairsBottomUpTabular([10,15,20]) === 15)
console.assert(minCostClimbingStairsBottomUpTabular([1,100,1,1,1,100,1,1,100,1]) === 6)
