/*
  62. Unique Paths
  Medium

  There is a robot on an m x n grid. The robot is initially located at the top-left corner (i.e., grid[0][0]). The robot tries to move to the bottom-right corner (i.e., grid[m - 1][n - 1]). The robot can only move either down or right at any point in time.

  Given the two integers m and n, return the number of possible unique paths that the robot can take to reach the bottom-right corner.

  The test cases are generated so that the answer will be less than or equal to 2 * 10^9.

  Example 1:
      Input: m = 3, n = 7
      Output: 28

  Example 2:
      Input: m = 3, n = 2
      Output: 3
      Explanation: From the top-left corner, there are a total of 3 ways to reach the bottom-right corner:
          1. Right -> Down -> Down
          2. Down -> Down -> Right
          3. Down -> Right -> Down

  Constraints:
      1 <= m, n <= 100
*/


const uniquePathsTopDown = (rows, cols) => {
    // Matthew Szudzik's hashing algorithm
    // From https://stackoverflow.com/a/13871379/21442606
    // where a, b >= 0
    // Cantor pairing function could be another option
    const hash = (a, b) => a >= b ? a * a + a + b : a + b * b
    const cache = new Map()

    // We could also think of this in reverse
    // State variable = position on grid
    const getNumUniquePathsToEnd = (row, col) => {
        if ((row === rows - 1) && (col === cols - 1))
            return 1

        if (cache.has(hash(row, col)))
            return cache.get(hash(row, col))

        const rightPaths = col < (cols - 1) ? getNumUniquePathsToEnd(row, col + 1) : 0
        const downPaths = row < (rows - 1) ? getNumUniquePathsToEnd(row + 1, col) : 0

        const numPaths = rightPaths + downPaths
        cache.set(hash(row, col), numPaths)

        return numPaths
    }

    return getNumUniquePathsToEnd(0, 0)
}

const uniquePathsBottomUp = (rows, cols) => {
    const subproblems = Array.from(Array(rows),
                                   () => new Array(cols).fill(undefined))

    subproblems[rows - 1][cols - 1] = 1

    // This iteration pattern guarentees that
    //     subproblems[r][c + 1]
    // AND
    //     subproblems[r + 1][c]
    // will be computed BEFORE
    //     subproblems[r][c]
    for (let r = rows - 1; 0 <= r; r--)
        for (let c = cols - 1; 0 <= c; c--) {
            // Don't update the base case, it's already been specified
            if ((r === rows - 1) && (c === cols - 1))
                continue

            const rightPaths = c + 1 < cols ? subproblems[r][c + 1] : 0
            const downPaths = r + 1 < rows ? subproblems[r + 1][c] : 0
            subproblems[r][c] = rightPaths + downPaths
        }

    return subproblems[0][0]
}


const uniquePaths = (m, n) => uniquePathsBottomUp(m, n)


console.assert(uniquePaths(3, 7) === 28)
console.assert(uniquePaths(3, 2) === 3)
