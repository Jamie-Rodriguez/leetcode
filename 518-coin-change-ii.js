/*
  518. Coin Change II
  Medium

  You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.

  Return the number of combinations that make up that amount. If that amount of money cannot be made up by any combination of the coins, return 0.

  You may assume that you have an infinite number of each kind of coin.

  The answer is guaranteed to fit into a signed 32-bit integer.

  Example 1:
      Input: amount = 5, coins = [1,2,5]
      Output: 4
      Explanation: there are four ways to make up the amount:
          5=5
          5=2+2+1
          5=2+1+1+1
          5=1+1+1+1+1

  Example 2:
      Input: amount = 3, coins = [2]
      Output: 0
      Explanation: the amount of 3 cannot be made up just with coins of 2.

  Example 3:
      Input: amount = 10, coins = [10]
      Output: 1

  Constraints:
      1 <= coins.length <= 300
      1 <= coins[i] <= 5000
      All the values of coins are unique.
      0 <= amount <= 5000
*/


// We know
//     0 <= amount <= 5000
// and
//     1 <= coins.length <= 300
// Store amount in the first 13 bits, and coinIndex in the second 9 bits
// This is fine on systems >= 32-bit...
const hash = (amount, coinIndex) => amount ^ (coinIndex << 14)

// We want the number of combinations i.e. distinct subsets possible
// We need to record a state of (amount remaining, remaining coins to use index)
const coinChange = (amount, coins) => {
    const cache = new Map()

    const dfs = (amount, coinIndex) => {
        const h = hash(amount, coinIndex)

        if (amount < 0 || coinIndex < 0)
            return 0
        if (amount === 0)
            return 1
        if (cache.has(h))
            return cache.get(h)

        // total combinations = including current coin vs excluding current coin
        const combinations = dfs(amount - coins[coinIndex], coinIndex) + dfs(amount, coinIndex - 1)

        cache.set(h, combinations)

        return combinations
    }

    return dfs(amount, coins.length - 1)
}


console.assert(coinChange(5, [1,2,5]) === 4)
console.assert(coinChange(3, [2]) === 0)
console.assert(coinChange(10, [10]) === 1)
