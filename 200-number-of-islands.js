/*
  200. Number of Islands
  Medium

  Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.

  An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

  Example 1:
      Input: grid = [["1","1","1","1","0"],
                     ["1","1","0","1","0"],
                     ["1","1","0","0","0"],
                     ["0","0","0","0","0"]]
      Output: 1

  Example 2:
      Input: grid = [["1","1","0","0","0"],
                     ["1","1","0","0","0"],
                     ["0","0","1","0","0"],
                     ["0","0","0","1","1"]]
      Output: 3

  Constraints:
      m == grid.length
      n == grid[i].length
      1 <= m, n <= 300
      grid[i][j] is '0' or '1'.
*/


/*
  Algorithm:
  1. Iterate through 'grid' cells until a 'land-cell' is found
      i.e. where grid[r][c] === '1'
  2. Flood-fill the surrounding contiguous land-cells as see i.e. grid[r][c] = '0'
      (Can actually fill it with any value.
      Just need to indicate the cell has been visited,
      I'm using the value for 'sea' for consistency)
  3. Once flood-fill operation is complete, increment 'number of islands' counter
  4. Go to step 1 until we have iterated through the entire array
  The flood-fill can be achieved with either depth-first search (DFS) or breadth-first search (BFS). Both solutions are the same speed.
*/


// WARNING: Mutates 'grid'!
const dfs = (grid, r, c, visited=[]) => {
    // Base-case conditions handled here:
    //     - Out of bounds
    //     - Already visited
    //     - Reached ocean
    if (r < 0 || c < 0 || r >= grid.length || c >= grid[r].length
           || visited.some(coord => coord.r === r && coord.c === c)
           || grid[r][c] !== '1')
        return

    // Type of 'grid' is actually char[][]
    grid[r][c] = '0'
    visited.push({r, c})

    dfs(grid, r+1, c, visited)
    dfs(grid, r-1, c, visited)
    dfs(grid, r, c+1, visited)
    dfs(grid, r, c-1, visited)

    return
}

// WARNING: Mutates 'grid'!
const bfs = (grid, startRow, startColumn) => {
    const queue = [{ r: startRow, c: startColumn }]
    const visited = []

    while (queue.length > 0) {
        const { r, c } = queue.pop()

        // Base-case conditions handled here:
        //     - Out of bounds
        //     - Already visited
        //     - Reached ocean
        if (r < 0 || c < 0 || r >= grid.length || c >= grid[r].length
               || visited.some(coord => coord.r === r && coord.c === c)
               || grid[r][c] !== '1') {
            continue
        }

        // Type of 'grid' is actually char[][]
        grid[r][c] = '0'
        visited.push({r, c})

        queue.unshift({r: r-1, c})
        queue.unshift({r: r+1, c})
        queue.unshift({r, c: c-1})
        queue.unshift({r, c: c+1})
    }

    return grid
}


const numIslands = grid => {
    let numIslands = 0

    for (let r = 0; r < grid.length; r++)
        for (let c = 0; c < grid[r].length; c++)
            // Found some land
            if (grid[r][c] === '1') {
                // Mutate 'grid': Flood-fill the land cells directly connected as 0
                // So we don't consider them when counting islands
                //bfs(grid, r, c)
                dfs(grid, r, c)
                numIslands++
            }

    return numIslands
}


console.assert(numIslands([["1","1","1","1","0"],
                           ["1","1","0","1","0"],
                           ["1","1","0","0","0"],
                           ["0","0","0","0","0"]]) === 1)
console.assert(numIslands([["1","1","0","0","0"],
                           ["1","1","0","0","0"],
                           ["0","0","1","0","0"],
                           ["0","0","0","1","1"]]) === 3)
