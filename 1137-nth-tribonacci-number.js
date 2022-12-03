/*
  1137. N-th Tribonacci Number
  Easy

  The Tribonacci sequence Tn is defined as follows:

  T_{0} = 0, T_{1} = 1, T_{2} = 1, and T_{n+3} = T_{n} + T_{n+1} + T_{n+2} for n >= 0.

  Given n, return the value of T_{n}.

  Example 1:
      Input: n = 4
      Output: 4
      Explanation:
          T_{3} = 0 + 1 + 1 = 2
          T_{4} = 1 + 1 + 2 = 4

  Example 2:
      Input: n = 25
      Output: 1389537

  Constraints:
      0 <= n <= 37
      The answer is guaranteed to fit within a 32-bit integer, ie. answer <= 2^31 - 1.
*/


const tribonacci = n => {
    const cache = new Map()

    const f = n => {
        if (n === 0)
            return 0
        if ((n === 1) || (n === 2))
            return 1
        if (cache.has(n))
            return cache.get(n)

        const result = f(n - 1) + f(n - 2) + f(n - 3)
        cache.set(n, result)

        return result
    }

    return f(n)
}


console.assert(tribonacci(4) === 4)
console.assert(tribonacci(25) === 1389537)
