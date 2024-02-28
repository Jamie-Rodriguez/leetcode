/*
  63. Unique Paths II
  Medium

  You are given an m x n integer array grid. There is a robot initially located at the top-left corner (i.e., grid[0][0]). The robot tries to move to the bottom-right corner (i.e., grid[m - 1][n - 1]). The robot can only move either down or right at any point in time.

  An obstacle and space are marked as 1 or 0 respectively in grid. A path that the robot takes cannot include any square that is an obstacle.

  Return the number of possible unique paths that the robot can take to reach the bottom-right corner.

  The testcases are generated so that the answer will be less than or equal to 2 * 10^9.

  Example 1:
      Input: obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]
      Output: 2
      Explanation: There is one obstacle in the middle of the 3x3 grid above.
          There are two ways to reach the bottom-right corner:
          1. Right -> Right -> Down -> Down
          2. Down -> Down -> Right -> Right

  Example 2:
      Input: obstacleGrid = [[0,1],[0,0]]
      Output: 1

  Constraints:
      m == obstacleGrid.length
      n == obstacleGrid[i].length
      1 <= m, n <= 100
      obstacleGrid[i][j] is 0 or 1.
*/


// Cantor pairing function
// Feel free to swap out with any other hash function you like e.g.
// const hash = (a, b) => `${a}, ${b}`
const hash = (a, b) => (a + b) * (a + b + 1) / 2 + b

const uniquePathsWithObstaclesTopDown = (grid, cache=new Map(), row=0, col=0) => {
    if (cache.has(hash(row, col)))
        return cache.get(hash(row, col))

    // If we hit an obstacle, return 0 paths immediately and prevent recursing
    // further down
    // Note: The end CAN be blocked by an obstacle!
    if (grid[row][col] === 1)
        return 0

    // Reached the end! Yay!
    if ((row === grid.length - 1)
       && (col === grid[grid.length - 1].length - 1))
           return 1

    const down = row + 1 < grid.length
                 ? uniquePathsWithObstaclesTopDown(grid, cache, row + 1, col) : 0
    const right = col + 1 < grid[row].length
                 ? uniquePathsWithObstaclesTopDown(grid, cache, row, col + 1) : 0

    cache.set(hash(row, col), down + right)

    return cache.get(hash(row, col))
}


const uniquePathsWithObstaclesBottomUp = grid => {
    const nRows = grid.length
    const nCols = grid[nRows - 1].length

    const subproblems = new Array(nRows).fill(undefined)
                                        .map((a, row) => new Array(grid[row].length)
                                                             .fill(undefined))

    for (let r = nRows - 1; 0 <= r; r--)
        for (let c = nCols - 1; 0 <= c; c--) {
            // Base cases
            if ((r === nRows - 1) && (c === nCols - 1)) {
                // The end square CAN be blocked by an obstacle
                subproblems[nRows - 1][nCols - 1] = grid[nRows - 1][nCols - 1] === 0 ? 1 : 0
                continue
            }

            // Current square is an obstacle
            if (grid[r][c] !== 0) {
                subproblems[r][c] = 0
                continue
            }

            const down = r + 1 < nRows ? subproblems[r + 1][c] : 0
            const right = c + 1 < nCols ? subproblems[r][c + 1] : 0

            subproblems[r][c] = down + right
        }

    return subproblems[0][0]
}


const uniquePathsWithObstacles = obstacleGrid => {
    // return uniquePathsWithObstaclesTopDown(obstacleGrid, new Map(), 0, 0)
    return uniquePathsWithObstaclesBottomUp(obstacleGrid)
}


console.assert(uniquePathsWithObstacles([[0,0,0],[0,1,0],[0,0,0]]) === 2)
console.assert(uniquePathsWithObstacles([[0,1],[0,0]]) === 1)
