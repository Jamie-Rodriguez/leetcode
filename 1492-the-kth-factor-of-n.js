/*
  1492. The kth Factor of n
  Medium

  You are given two positive integers n and k. A factor of an integer n is defined as an integer i where n % i == 0.

  Consider a list of all factors of n sorted in ascending order, return the kth factor in this list or return -1 if n has less than k factors.

  Example 1:
      Input: n = 12, k = 3
      Output: 3
      Explanation: Factors list is [1, 2, 3, 4, 6, 12], the 3rd factor is 3.

  Example 2:
      Input: n = 7, k = 2
      Output: 7
      Explanation: Factors list is [1, 7], the 2nd factor is 7.

  Example 3:
      Input: n = 4, k = 4
      Output: -1
      Explanation: Factors list is [1, 2, 4], there is only 3 factors. We should return -1.

  Constraints:
      1 <= k <= n <= 1000
*/


const kthFactor = (n, k) => {
    // Using the Sieve of Eratosthenes as the pivot point
    const sqrtN = Math.sqrt(n)

    // The lower half of factors < sqrt(n)
    const lower = [1]
    // Their corresponding duals (> sqrt(n))
    // Note: We will push onto the end of this,
    // So it will be in reverse-order (initially)!
    const upper = [n]

    // Note: using this we will calculate ALL factors of 'n'!
    // We actually only need to calculate the first 'k' factors!
    for (let i = 2; i < sqrtN; i++)
        if (n % i === 0) {
            lower.push(i)
            upper.push(n/i)
        }

    const isSquareNumber = Number.isInteger(sqrtN)

    if (isSquareNumber)
        lower.push(sqrtN)

    const factors = [...lower, ...upper.reverse()]

    // Note: 'k' is 1-indexed
    return factors[k - 1] ?? -1
}


console.assert(kthFactor(12, 3) === 3)
console.assert(kthFactor(7, 2) === 7)
console.assert(kthFactor(4, 4) === -1)
