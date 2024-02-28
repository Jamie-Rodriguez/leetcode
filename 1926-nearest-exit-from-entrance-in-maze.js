/*
  1926. Nearest Exit from Entrance in Maze
  Medium

  You are given an m x n matrix maze (0-indexed) with empty cells (represented as '.') and walls (represented as '+'). You are also given the entrance of the maze, where entrance = [entrancerow, entrancecol] denotes the row and column of the cell you are initially standing at.

  In one step, you can move one cell up, down, left, or right. You cannot step into a cell with a wall, and you cannot step outside the maze. Your goal is to find the nearest exit from the entrance. An exit is defined as an empty cell that is at the border of the maze. The entrance does not count as an exit.

  Return the number of steps in the shortest path from the entrance to the nearest exit, or -1 if no such path exists.

  Example 1:
      Input: maze = [["+","+",".","+"],[".",".",".","+"],["+","+","+","."]], entrance = [1,2]
      Output: 1
      Explanation: There are 3 exits in this maze at [1,0], [0,2], and [2,3].
      Initially, you are at the entrance cell [1,2].
      - You can reach [1,0] by moving 2 steps left.
      - You can reach [0,2] by moving 1 step up.
      It is impossible to reach [2,3] from the entrance.
      Thus, the nearest exit is [0,2], which is 1 step away.

  Example 2:
      Input: maze = [["+","+","+"],[".",".","."],["+","+","+"]], entrance = [1,0]
      Output: 2
      Explanation: There is 1 exit in this maze at [1,2].
      [1,0] does not count as an exit since it is the entrance cell.
      Initially, you are at the entrance cell [1,0].
      - You can reach [1,2] by moving 2 steps right.
      Thus, the nearest exit is [1,2], which is 2 steps away.

  Example 3:
      Input: maze = [[".","+"]], entrance = [0,0]
      Output: -1
      Explanation: There are no exits in this maze.

  Constraints:
      maze.length == m
      maze[i].length == n
      1 <= m, n <= 100
      maze[i][j] is either '.' or '+'.
      entrance.length == 2
      0 <= entrancerow < m
      0 <= entrancecol < n
      entrance will always be an empty cell.
*/

const nearestExit = function (maze, entrance) {
    // Cantor pairing function
    const hash = (a, b) => (a + b) * (a + b + 1) / 2 + b
    const numRows = maze.length
    const numCols = maze[0].length
    const neighbourDirections = [
        [0, -1],
        [1, 0],
        [0, 1],
        [-1, 0]
    ]

    // Breadth-first search (BFS)
    const queue = [{ row: entrance[0], col: entrance[1], steps: 0 }]
    const visited = new Set([hash(entrance[0], entrance[1])])

    while (queue.length > 0) {
        const { row, col, steps } = queue.pop()

        const neighbours = neighbourDirections.map(
            ([deltaRow, deltaCol]) => [row + deltaRow, col + deltaCol]
        ).filter( // Bounds-check
            ([r, c]) => 0 <= r && r < numRows && 0 <= c && c < numCols
        ).filter( // Not visited
            ([r, c]) => !visited.has(hash(r, c))
        ).filter( // Not a wall
            ([r, c]) => maze[r][c] === '.'
        )

        for (const [r, c] of neighbours) {
            if (0 === r || r === numRows - 1 || 0 === c || c === numCols - 1)
                return steps + 1

            visited.add(hash(r, c))
            queue.unshift({ row: r, col: c, steps: steps + 1 })
        }
    }

    return -1
}

console.assert(nearestExit([['+', '+', '.', '+'], ['.', '.', '.', '+'], ['+', '+', '+', '.']], [1, 2]) === 1)
console.assert(nearestExit([['+', '+', '+'], ['.', '.', '.'], ['+', '+', '+']], [1, 0]) === 2)
console.assert(nearestExit([['.', '+']], [0, 0]) === -1)
