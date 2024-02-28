/*
  279. Perfect Squares
  Medium

  Given an integer n, return the least number of perfect square numbers that sum to n.

  A perfect square is an integer that is the square of an integer; in other words, it is the product of some integer with itself. For example, 1, 4, 9, and 16 are perfect squares while 3 and 11 are not.

  Example 1:
      Input: n = 12
      Output: 3
      Explanation: 12 = 4 + 4 + 4.

  Example 2:
      Input: n = 13
      Output: 2
      Explanation: 13 = 4 + 9.

  Constraints:
      1 <= n <= 10^4
*/


const numSquaresTopDown = n => {
    // + 1 is to avoid saving the number 0
    const squared = Array(Math.ceil(Math.sqrt(n))).fill(undefined)
                                                  .map((x, i) => (i + 1) * (i + 1))
    const cache = new Map()

    const getMinSquares = n => {
        if (n === 0)
            return 0
        if (cache.has(n))
            return cache.get(n)

        for (const square of squared.filter(s => s <= n))
            cache.set(n,
                      Math.min(cache.has(n) ? cache.get(n) : Infinity,
                               getMinSquares(n - square) + 1))

        return cache.get(n)
    }

    return getMinSquares(n)
}

const numSquaresBottomUp = n => {
    // + 1 is to avoid saving the number 0
    const squared = Array(Math.ceil(Math.sqrt(n))).fill(undefined)
                                                  .map((x, i) => (i + 1) * (i + 1))

    subproblems = Array(n + 1).fill(Infinity)
    subproblems[0] = 0

    for (let i = 1; i <= n; i++)
        for (const square of squared.filter(s => s <= i))
            subproblems[i] = Math.min(subproblems[i], subproblems[i - square] + 1)

    return subproblems[n]
}

const numSquaresBfs = n => {
    // + 1 is to avoid saving the number 0
    const squared = Array(Math.ceil(Math.sqrt(n))).fill(undefined)
                                                  .map((x, i) => (i + 1) * (i + 1))

    const queue = [{ num: n, depth: 0 }]
    const visited = new Set([n])

    while (queue.length > 0) {
        const { num, depth } = queue.pop()

        for (const square of squared.filter(s => s <= num)) {
            const diff = num - square

            if (diff === 0)
                return depth + 1
            else if (diff > 0 && !visited.has(diff)) {
                queue.unshift({ num: diff, depth: depth + 1 })
                visited.add(diff)
            }
        }
    }

    return 0
}


console.assert(numSquares(12) === 3)
console.assert(numSquares(13) === 2)
