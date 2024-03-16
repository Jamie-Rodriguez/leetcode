/*
  417. Pacific Atlantic Water Flow
  Medium

  There is an m x n rectangular island that borders both the Pacific Ocean and Atlantic Ocean. The Pacific Ocean touches the island's left and top edges, and the Atlantic Ocean touches the island's right and bottom edges.

  The island is partitioned into a grid of square cells. You are given an m x n integer matrix heights where heights[r][c] represents the height above sea level of the cell at coordinate (r, c).

  The island receives a lot of rain, and the rain water can flow to neighboring cells directly north, south, east, and west if the neighboring cell's height is less than or equal to the current cell's height. Water can flow from any cell adjacent to an ocean into the ocean.

  Return a 2D list of grid coordinates result where result[i] = [ri, ci] denotes that rain water can flow from cell (ri, ci) to both the Pacific and Atlantic oceans.

  Example 1:
      Input: heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]
      Output: [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]
      Explanation: The following cells can flow to the Pacific and Atlantic oceans, as shown below:
          [0,4]: [0,4] -> Pacific Ocean
                 [0,4] -> Atlantic Ocean
          [1,3]: [1,3] -> [0,3] -> Pacific Ocean
                 [1,3] -> [1,4] -> Atlantic Ocean
          [1,4]: [1,4] -> [1,3] -> [0,3] -> Pacific Ocean
                 [1,4] -> Atlantic Ocean
          [2,2]: [2,2] -> [1,2] -> [0,2] -> Pacific Ocean
                 [2,2] -> [2,3] -> [2,4] -> Atlantic Ocean
          [3,0]: [3,0] -> Pacific Ocean
                 [3,0] -> [4,0] -> Atlantic Ocean
          [3,1]: [3,1] -> [3,0] -> Pacific Ocean
                 [3,1] -> [4,1] -> Atlantic Ocean
          [4,0]: [4,0] -> Pacific Ocean
                 [4,0] -> Atlantic Ocean
          Note that there are other possible paths for these cells to flow to the Pacific and Atlantic oceans.

  Example 2:
      Input: heights = [[1]]
      Output: [[0,0]]
      Explanation: The water can flow from the only cell to the Pacific and Atlantic oceans.

  Constraints:
      m == heights.length
      n == heights[r].length
      1 <= m, n <= 200
      0 <= heights[r][c] <= 10^5
*/


const pacificAtlantic = heights => {
    // Cantor pairing function
    // Feel free to swap out with any other hash function you like e.g.
    // const hash = (a, b) => `${a}, ${b}`
    const hash = (a, b) => (a + b) * (a + b + 1) / 2 + b

    const dfs = (heights, reachable = new Map(), [row, col]) => {
        reachable.set(hash(row, col), [row, col])

        const deltas = [[-1, 0], [0, 1], [1, 0], [0, -1]]
        const newNeighbours = deltas.map(([dr, dc]) => [row + dr, col + dc])
            .filter(([r, c]) => 0 <= r && r <= heights.length - 1
                && 0 <= c && c <= heights[0].length - 1)
            .filter(([r, c]) => !reachable.has(hash(r, c)))
            .filter(([r, c]) => heights[row][col] <= heights[r][c])

        newNeighbours.forEach(n => reachable = dfs(heights, reachable, n))

        return reachable
    }


    const pacificEdge = heights[0].map((h, i) => [0, i])
    heights.forEach((h, i) => i !== 0 ? pacificEdge.push([i, 0]) : null)

    const atlanticEdge = heights.map((h, i) => [i, h.length - 1])
    heights[heights.length - 1].forEach(
        (h, i) => i !== heights[heights.length - 1].length - 1
            ? atlanticEdge.push([heights.length - 1, i])
            : null)

    // hash (int) -> coordinates ([int, int])
    let pacificReachable = new Map()
    let atlanticReachable = new Map()

    pacificEdge.forEach(
        p => pacificReachable = dfs(heights, pacificReachable, p))
    atlanticEdge.forEach(
        a => atlanticReachable = dfs(heights, atlanticReachable, a))


    const intersection = []

    for (const [h, [r, c]] of pacificReachable.length < atlanticReachable.length
        ? pacificReachable : atlanticReachable)
        if (pacificReachable.has(h) && atlanticReachable.has(h))
            intersection.push([r, c])

    return intersection
}


const checkCoordinates = (coords1, coords2) => {
    const hash = (a, b) => (a + b) * (a + b + 1) / 2 + b

    if (coords1.length !== coords2.length)
        return false

    const set1 = new Set(coords1.map(([r, c]) => hash(r, c)))
    const set2 = new Set(coords2.map(([r, c]) => hash(r, c)))

    for (const h of set1)
        if (!set2.has(h))
            return false

    return true
}

console.assert(checkCoordinates(pacificAtlantic([[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]),
                                                [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]))
console.assert(checkCoordinates(pacificAtlantic([[1]]), [[0,0]]))
