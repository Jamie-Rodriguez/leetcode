/*
  64. Minimum Path Sum
  Medium

  Given a m x n grid filled with non-negative numbers, find a path from top left to bottom right, which minimizes the sum of all numbers along its path.

  Note: You can only move either down or right at any point in time.

  Example 1:
      Input: grid = [[1,3,1],[1,5,1],[4,2,1]]
      Output: 7
      Explanation: Because the path 1 → 3 → 1 → 1 → 1 minimizes the sum.

  Example 2:
      Input: grid = [[1,2,3],[4,5,6]]
      Output: 12

  Constraints:
      m == grid.length
      n == grid[i].length
      1 <= m, n <= 200
      0 <= grid[i][j] <= 200
*/


const minPathSumTopDown = grid => {
    const rows = grid.length
    const cols = grid[grid.length - 1].length

    // Cantor pairing function
    const hash = (r, c) => (r + c) * (r + c + 1) / 2 + c
    const cache = new Map()

    const getMinPathSum = (r, c) => {
        if (cache.has(hash(r, c)))
            return cache.get(hash(r, c))

        // Base case
        if ((r === rows - 1) && (c === cols - 1))
            return grid[r][c]

        // Handle out of bounds here
        // Return Infinity here, because we are searching for the
        // *minimum* path sum.
        if ((rows <= r) || (cols <= c))
            return Infinity

        const sum = grid[r][c] + Math.min(getMinPathSum(r + 1, c), getMinPathSum(r, c + 1))

        cache.set(hash(r, c), sum)

        return sum
    }

    return getMinPathSum(0, 0)
}

const minPathSumBottomUp = grid => {
    const subproblems = Array(grid.length).fill(undefined)
                                          .map((row, r) => Array(grid[r].length).fill(undefined))

    const rows = grid.length
    const cols = grid[grid.length - 1].length

    // Base case
    subproblems[rows - 1][cols - 1] = grid[rows - 1][cols - 1]

    for (let r = rows - 1; 0 <= r; r--)
        for (let c = grid[r].length - 1; 0 <= c; c--) {
            // Remember to skip base case!
            if ((r === rows - 1) && (c === cols - 1))
                continue

            subproblems[r][c] = grid[r][c] + Math.min(r + 1 < rows ? subproblems[r + 1][c] : Infinity,
                                                      c + 1 < cols ? subproblems[r][c + 1] : Infinity)
        }

    return subproblems[0][0]
}


const minPathSum = grid => minPathSumBottomUp(grid)


console.assert(minPathSum([[1,3,1],[1,5,1],[4,2,1]]) === 7)
console.assert(minPathSum([[1,2,3],[4,5,6]]) === 12)
