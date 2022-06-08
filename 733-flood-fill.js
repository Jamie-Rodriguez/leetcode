/*
  733. Flood Fill
  Easy

  An image is represented by an m x n integer grid image where image[i][j] represents the pixel value of the image.

  You are also given three integers sr, sc, and newColor. You should perform a flood fill on the image starting from the pixel image[sr][sc].

  To perform a flood fill, consider the starting pixel, plus any pixels connected 4-directionally to the starting pixel of the same color as the starting pixel, plus any pixels connected 4-directionally to those pixels (also with the same color), and so on. Replace the color of all of the aforementioned pixels with newColor.

  Return the modified image after performing the flood fill.

  Example 1:
      +---+---+---+    +---+---+---+
      | 1 | 1 | 1 |    | 2 | 2 | 2 |
      +---+---+---+    +---+---+---+
      | 1 | 1 | 0 | => | 2 | 2 | 0 |
      +---+---+---+    +---+---+---+
      | 1 | 0 | 1 |    | 2 | 0 | 1 |
      +---+---+---+    +---+---+---+

      Input: image = [[1,1,1],[1,1,0],[1,0,1]], sr = 1, sc = 1, newColor = 2
      Output: [[2,2,2],[2,2,0],[2,0,1]]
      Explanation: From the center of the image with position (sr, sc) = (1, 1) (i.e., the red pixel), all pixels connected by a path of the same color as the starting pixel (i.e., the blue pixels) are colored with the new color.
      Note the bottom corner is not colored 2, because it is not 4-directionally connected to the starting pixel.

  Example 2:
      Input: image = [[0,0,0],[0,0,0]], sr = 0, sc = 0, newColor = 2
      Output: [[2,2,2],[2,2,2]]

  Constraints:
      m == image.length
      n == image[i].length
      1 <= m, n <= 50
      0 <= image[i][j], newColor < 2^16
      0 <= sr < m
      0 <= sc < n
*/


/*
  This can be achieved with either depth-first search (DFS) or breadth-first search (BFS).
  However you need to be careful if using recursive DFS, as the image could be huge and this would cause a stack overflow!

  From experimental results, both solutions are roughly the same speed.
*/

// Mutates 'image' in-place in an attempt to save memory
const recursiveDfs = (image, r, c, oldColor, newColor, visited=[]) => {
    // Base-case conditions handled here:
    //     - Out of bounds
    //     - Already visited
    //     - Not the original colour we want to change
    //     - Already the new colour
    if (r < 0 || c < 0 || r >= image.length || c >= image[r].length
        || visited.some(coord => coord.r === r && coord.c === c)
        || image[r][c] !== oldColor
        || image[r][c] === newColor) {
        return image
    }

    image[r][c] = newColor
    visited.push({r, c})

    recursiveDfs(image, r+1, c, oldColor, newColor, visited)
    recursiveDfs(image, r-1, c, oldColor, newColor, visited)
    recursiveDfs(image, r, c+1, oldColor, newColor, visited)
    recursiveDfs(image, r, c-1, oldColor, newColor, visited)

    return image
}

// Mutates 'image' in-place!
const bfs = (image, sr, sc, oldColor, newColor) => {
    const queue = [{r: sr, c: sc}]
    const visited = []

    while (queue.length > 0) {
        const { r, c } = queue.pop()

        // Base-case conditions handled here:
        //     - Out of bounds
        //     - Already visited
        //     - Not the original colour we want to change
        //     - Already the new colour
        if (r < 0 || c < 0 || r >= image.length || c >= image[r].length
            || visited.some(coord => coord.r === r && coord.c === c)
            || image[r][c] !== oldColor
            || image[r][c] === newColor) {
            continue
        }

        image[r][c] = newColor
        visited.push({r, c})

        queue.unshift({r: r-1, c})
        queue.unshift({r: r+1, c})
        queue.unshift({r, c: c-1})
        queue.unshift({r, c: c+1})
    }

    return image
}


const floodFill = (image, sr, sc, newColor) => {
    // return bfs(image, sr, sc, image[sr][sc], newColor)
    return recursiveDfs(image, sr, sc, image[sr][sc], newColor)
}


const deepComparison = (a, b) => JSON.stringify(a) === JSON.stringify(b)

console.assert(
    deepComparison(
        floodFill([[1,1,1],[1,1,0],[1,0,1]], 1, 1, 2),
        [[2,2,2],[2,2,0],[2,0,1]]))
console.assert(
    deepComparison(
        floodFill([[0,0,0],[0,0,0]], 0, 0, 2),
        [[2,2,2],[2,2,2]]))
console.assert(
    deepComparison(
        floodFill([[0,0,0],[0,1,0]], 1, 1, 1),
        [[0,0,0],[0,1,0]]))
