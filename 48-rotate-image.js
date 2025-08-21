/*
  48. Rotate Image
  Medium

  You are given an `n x n` 2D `matrix` representing an image, rotate the image by **90** degrees (clockwise).

  You have to rotate the image in-place, which means you have to modify the input 2D matrix directly. **DO NOT** allocate another 2D matrix and do the rotation.

  Example 1:
      Input: matrix = [[1,2,3],
                       [4,5,6],
                       [7,8,9]]
      Output: [[7,4,1],
               [8,5,2],
               [9,6,3]]

  Example 2:
      Input: matrix = [[ 5, 1, 9,11],
                       [ 2, 4, 8,10],
                       [13, 3, 6, 7],
                       [15,14,12,16]]
      Output: [[15,13, 2, 5],
               [14, 3, 4, 1],
               [12, 6, 8, 9],
               [16, 7,10,11]]

  Constraints:
      - `n == matrix.length == matrix[i].length`
      - `1 <= n <= 20`
      - `-1000 <= matrix[i][j] <= 1000`
*/


/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
const rotate = matrix => {
    const rows =  matrix.length
    const cols = matrix[0].length

    // Transpose `matrix`
    // Time-complexity, T = T(binom(n, 2)) = O(n^2)
    // i.e. Binomial coefficient of n - 1
    // to get a triangular number
    for (let r = 0; r < rows; r++)
        for (let c = r + 1; c < cols; c++) {
            // In-place swap using XOR
            matrix[r][c] ^= matrix[c][r] // a = a ^ b
            matrix[c][r] ^= matrix[r][c] // b = b ^ (a ^ b) = a
            matrix[r][c] ^= matrix[c][r] // a = (a ^ b) ^ a
        }

    // Reflect `matrix` horizontally,
    // i.e. reflect along the Y-axis
    // T(n/2) = O(n^2)
    for (let r = 0; r < rows; r++)
        for (let c = 0; c < Math.floor(cols / 2); c++) {
            const reflectedCol = cols - 1 - c
            matrix[r][c]            ^= matrix[r][reflectedCol]
            matrix[r][reflectedCol] ^= matrix[r][c]
            matrix[r][c]            ^= matrix[r][reflectedCol]
        }

    // Even though the returned type-hint is `void`,
    // we will return the modified matrix for local testing purposes
    return matrix
}


const matrixEqual = (a, b) => {
    const rows =  a.length
    const cols = a[0].length

    if (rows !== b.length || cols !== b[0].length)
        return false

    for (let r = 0; r < rows; r++)
        for (let c = 0; c < cols; c++)
            if (a[r][c] !== b[r][c])
                return false

    return true
}

console.assert(matrixEqual(rotate([[1,2,3],
                                   [4,5,6],
                                   [7,8,9]]),
                                  [[7,4,1],
                                   [8,5,2],
                                   [9,6,3]]))
console.assert(matrixEqual(rotate([[5,  1, 9,11],
                                   [2,  4, 8,10],
                                   [13, 3, 6, 7],
                                   [15,14,12,16]]),
                                  [[15,13, 2, 5],
                                   [14, 3, 4, 1],
                                   [12, 6, 8, 9],
                                   [16, 7,10,11]]))
