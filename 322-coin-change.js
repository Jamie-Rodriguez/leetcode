/*
  322. Coin Change
  Medium

  You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.

  Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.

  You may assume that you have an infinite number of each kind of coin.

  Example 1:
      Input: coins = [1,2,5], amount = 11
      Output: 3
      Explanation: 11 = 5 + 5 + 1

  Example 2:
      Input: coins = [2], amount = 3
      Output: -1

  Example 3:
      Input: coins = [1], amount = 0
      Output: 0

  Constraints:
      1 <= coins.length <= 12
      1 <= coins[i] <= 2^31 - 1
      0 <= amount <= 10^4
*/


const coinChange = (coins, amount) => {
    // cache[amount] = min num coins to add up to amount
    const cache = Array(amount + 1).fill(Infinity)
    cache[0] = 0

    // We already know the answer for amount = 0
    for (let currentAmount = 1; currentAmount <= amount; currentAmount++)
        for (const coin of coins) {
            const newAmount = currentAmount - coin

            if (newAmount >= 0)
                cache[currentAmount] = Math.min(cache[currentAmount], cache[newAmount] + 1)
        }

    // Solution specifies to return -1 in the case that no solution is possible
    return cache[amount] !== Infinity ? cache[amount] : -1
}

const coinChangeTopDown = (coins, amount) => {
    const cache = new Map()

    const fewestCoins = amount => {
        if (amount === 0)
            return 0

        if (amount < 0)
            return -1

        if (cache.has(amount))
            return cache.get(amount)

        let min = Infinity

        for (const coin of coins) {
            const numCoins = fewestCoins(amount - coin)

            if (numCoins !== -1)
                min = Math.min(min, 1 + numCoins)
        }

        cache.set(amount, min)

        return (min !== Infinity) ? min : -1
    }

    return fewestCoins(amount)
}

const coinChangeBottomUp = (coins, amount) => {
    const subproblems = Array(amount + 1).fill(undefined)

    // Base cases
    subproblems[0] = 0

    for (let a = 1; a < subproblems.length; a++) {
        let min = Infinity

        for (const coin of coins) {
            const numCoins = 0 <= (a - coin) ? 1 + subproblems[a - coin]
                                             : Infinity

            if (numCoins !== Infinity)
                min = Math.min(min, numCoins)
        }

        subproblems[a] = min
    }

    return subproblems[amount] !== Infinity ? subproblems[amount] : -1
}

console.assert(coinChange([1,2,5], 11) === 3)
console.assert(coinChange([2], 3) === -1)
console.assert(coinChange([1], 0) === 0)
