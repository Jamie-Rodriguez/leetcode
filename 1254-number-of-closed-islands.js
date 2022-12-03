/*
  1254. Number of Closed Islands
  Medium

  Given a 2D grid consists of 0s (land) and 1s (water).  An island is a maximal 4-directionally connected group of 0s and a closed island is an island totally (all left, top, right, bottom) surrounded by 1s.

  Return the number of closed islands.

  Example 1:
      Input: grid = [[1,1,1,1,1,1,1,0],
                     [1,0,0,0,0,1,1,0],
                     [1,0,1,0,1,1,1,0],
                     [1,0,0,0,0,1,0,1],
                     [1,1,1,1,1,1,1,0]]
      Output: 2
      Explanation:
      Islands in gray are closed because they are completely surrounded by water (group of 1s).

  Example 2:
      Input: grid = [[0,0,1,0,0],
                     [0,1,0,1,0],
                     [0,1,1,1,0]]
      Output: 1

  Example 3:
      Input: grid = [[1,1,1,1,1,1,1],
                     [1,0,0,0,0,0,1],
                     [1,0,1,1,1,0,1],
                     [1,0,1,0,1,0,1],
                     [1,0,1,1,1,0,1],
                     [1,0,0,0,0,0,1],
                     [1,1,1,1,1,1,1]]
      Output: 2

  Constraints:
      1 <= grid.length, grid[0].length <= 100
      0 <= grid[i][j] <=1
*/


/*
  Algorithm idea:
  1. Remove all islands that touch the edge of the grid,
      since they are not defined as a closed island.
  2. The problem is now identical to problem "200. Number of Islands".
      i.e. Count up the remaining islands.
*/

// Because I keep getting these mixed-up...
const LAND = 0
const WATER = 1

// Warning: Modifies 'grid'
const floodFill = (grid, r, c, visited=[]) => {
    // Hit the edge, return false
    if (r < 0 || r > grid.length - 1
            || c < 0 || c > grid[r].length - 1
            || visited.some(coord => r === coord.r && c === coord.c))
        return

    // Set the land-tiles we encounter to WATER
    // so that we don't consider them again
    grid[r][c] = WATER
    visited.push({r, c})

    const directions = [[1, 0], [0, 1], [-1, 0], [0, -1]]

    for (const [deltaR, deltaC] of directions) {
        const newR = r + deltaR
        const newC = c + deltaC
        // Only if the new tile is land, call floodFill()
        if (newR >= 0 && newR < grid.length
                && newC >= 0 && newC < grid[newR].length
                && grid[newR][newC] === LAND)
            floodFill(grid, newR, newC, visited)
    }

    return
}

const removeEdgeLands = grid => {
    // Top row
    for (let c = 0; c < grid[0].length; c++)
        if (grid[0][c] === LAND)
            floodFill(grid, 0, c, [])
    // Left and right columns
    for (let r = 1; r < grid.length - 1; r++)
        for (let c = 0; c < grid[r].length; c += grid[r].length - 1)
            if (grid[r][c] === LAND)
                floodFill(grid, r, c, [])
    // Bottom row
    const finalRow = grid.length - 1
    for (let c = 0; c < grid[finalRow].length; c++)
        if (grid[finalRow][c] === LAND)
            floodFill(grid, finalRow, c, [])
}


const closedIsland = grid => {
    let numEnclaves = 0

    removeEdgeLands(grid)

    // Don't even need to look at top and bottom rows, or left and right edges
    for (let r = 1; r < grid.length - 1; r++)
        for (let c = 1; c < grid[r].length - 1; c++)
            if (grid[r][c] === LAND) {
                floodFill(grid, r, c, [])
                numEnclaves++
            }

    return numEnclaves
}


console.assert(closedIsland([[1,1,1,1,1,1,1,0],
                             [1,0,0,0,0,1,1,0],
                             [1,0,1,0,1,1,1,0],
                             [1,0,0,0,0,1,0,1],
                             [1,1,1,1,1,1,1,0]]) === 2)
console.assert(closedIsland([[0,0,1,0,0],
                             [0,1,0,1,0],
                             [0,1,1,1,0]]) === 1)
console.assert(closedIsland([[1,1,1,1,1,1,1],
                             [1,0,0,0,0,0,1],
                             [1,0,1,1,1,0,1],
                             [1,0,1,0,1,0,1],
                             [1,0,1,1,1,0,1],
                             [1,0,0,0,0,0,1],
                             [1,1,1,1,1,1,1]]) === 2)
console.assert(closedIsland([[0,0,1,1,0,1,0,0,1,0],
                             [1,1,0,1,1,0,1,1,1,0],
                             [1,0,1,1,1,0,0,1,1,0],
                             [0,1,1,0,0,0,0,1,0,1],
                             [0,0,0,0,0,0,1,1,1,0],
                             [0,1,0,1,0,1,0,1,1,1],
                             [1,0,1,0,1,1,0,0,0,1],
                             [1,1,1,1,1,1,0,0,0,0],
                             [1,1,1,0,0,1,0,1,0,1],
                             [1,1,1,0,1,1,0,1,1,0]]) === 5)
