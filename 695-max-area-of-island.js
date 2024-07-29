/*
  695. Max Area of Island
  Medium

  You are given an m x n binary matrix grid. An island is a group of 1's (representing land) connected 4-directionally (horizontal or vertical.) You may assume all four edges of the grid are surrounded by water.

  The area of an island is the number of cells with a value 1 in the island.

  Return the maximum area of an island in grid. If there is no island, return 0.

  Example 1:
      Input: grid = [[0,0,1,0,0,0,0,1,0,0,0,0,0],
                     [0,0,0,0,0,0,0,1,1,1,0,0,0],
                     [0,1,1,0,1,0,0,0,0,0,0,0,0],
                     [0,1,0,0,1,1,0,0,1,0,1,0,0],
                     [0,1,0,0,1,1,0,0,1,1,1,0,0],
                     [0,0,0,0,0,0,0,0,0,0,1,0,0],
                     [0,0,0,0,0,0,0,1,1,1,0,0,0],
                     [0,0,0,0,0,0,0,1,1,0,0,0,0]]
      Output: 6
      Explanation: The answer is not 11, because the island must be connected 4-directionally.

  Example 2:
      Input: grid = [[0,0,0,0,0,0,0,0]]
      Output: 0

  Constraints:
      m == grid.length
      n == grid[i].length
      1 <= m, n <= 50
      grid[i][j] is either 0 or 1.
*/


// WARNING: Mutates 'grid'
// Uses Breadth-First Search to count area of islands
const bfs = (grid, start) => {
    if (grid[start.row][start.column] === 0)
        return 0

    const visited = []
    const queue = [start]
    let area = 0

    while (queue.length) {
        const current = queue.pop()

        if (visited.some(({ row, column }) => current.row === row && current.column === column))
            continue

        visited.push(current)

        grid[current.row][current.column] = 0
        area++

        neighbours = [
            { row: current.row - 1, column: current.column     },
            { row: current.row,     column: current.column + 1 },
            { row: current.row + 1, column: current.column     },
            { row: current.row,     column: current.column - 1 }
        ].filter(coord => !visited.some(
            ({ row, column }) => coord.row === row && coord.column === column))
        .filter(
            ({ row, column }) => row >= 0 &&
                                 column >= 0 &&
                                 row < grid.length &&
                                 column < grid[row].length)
        .filter(({ row, column }) => grid[row][column] === 1)

        queue.unshift(...neighbours)
    }

    return area
}

// Warning: Mutates 'grid'!
const dfs = (grid, r, c, visited=[]) => {
    // Base-case conditions handled here:
    //     - Out of bounds
    //     - Already visited
    //     - Reached ocean
    if (r < 0 || c < 0 || r >= grid.length || c >= grid[r].length
            || visited.some(coord => coord.r === r && coord.c === c)
            || grid[r][c] === 0) {
        return 0
    }

    grid[r][c] = 0
    visited.push({ r, c })

    return 1 + dfs(grid, r-1, c, visited) + dfs(grid, r, c-1, visited) + dfs(grid, r+1, c, visited) + dfs(grid, r, c+1, visited)
}


const maxAreaOfIsland = grid => {
    let maxArea = 0

    for (let r = 0; r < grid.length; r++)
        for (let c = 0; c < grid[r].length; c++) {
            // Found some land
            if (grid[r][c] === 1) {
                // Mutate 'grid': Flood-fill the land cells directly connected as 0
                // So we don't consider them when counting islands
                const area = dfs(grid, r, c)

                maxArea = Math.max(area, maxArea)
            }
        }

    return maxArea
}


console.assert(maxAreaOfIsland([[0,0,0,0,0,0,0,0]]) === 0)
console.assert(maxAreaOfIsland([[0,0,1,0,0,0,0,1,0,0,0,0,0],
                                [0,0,0,0,0,0,0,1,1,1,0,0,0],
                                [0,1,1,0,1,0,0,0,0,0,0,0,0],
                                [0,1,0,0,1,1,0,0,1,0,1,0,0],
                                [0,1,0,0,1,1,0,0,1,1,1,0,0],
                                [0,0,0,0,0,0,0,0,0,0,1,0,0],
                                [0,0,0,0,0,0,0,1,1,1,0,0,0],
                                [0,0,0,0,0,0,0,1,1,0,0,0,0]]) === 6)
