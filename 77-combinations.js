/*
  77. Combinations
  Medium

  Given two integers n and k, return all possible combinations of k numbers chosen from the range [1, n].

  You may return the answer in any order.

  Example 1:
      Input: n = 4, k = 2
      Output: [[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]
      Explanation: There are 4 choose 2 = 6 total combinations.
      Note that combinations are unordered, i.e., [1,2] and [2,1] are considered to be the same combination.

  Example 2:
      Input: n = 1, k = 1
      Output: [[1]]
      Explanation: There is 1 choose 1 = 1 total combination.

  Constraints:
      1 <= n <= 20
      1 <= k <= n
*/

// Traditional backtracking approach
const backtrack = (n, k) => {
    const result = []

    const backtrackInternal = (n, k, start=1, currentCombination=[]) => {
        if (k === 0)
            return result.push([...currentCombination])

        for (let i = start; i <= n; i++) {
            currentCombination.push(i)
            backtrackInternal(n, k - 1, i + 1, currentCombination)
            currentCombination.pop()
        }

        return result
    }

    return backtrackInternal(n, k)
}

// More functional approach to the backtracking solution
const combine = (n, k) => {
    const combineInternal = (n, k, start=1, currentCombo=[]) => {
        if (k === 0)
            return [currentCombo]

        const result = []

        for (let i = start; i <= n; i++)
            result.push(...combineInternal(n, k - 1, i + 1, [...currentCombo, i]))

        return result
    }

    return combineInternal(n, k)
}


// TO-DO: Find a way to test
console.log('combine(4, 2) =', combine(4, 2)) // [[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]
console.log('combine(1, 1) =', combine(1, 1)) // [[1]]
