/*
  904. Fruit Into Baskets
  Medium

  You are visiting a farm that has a single row of fruit trees arranged from left to right. The trees are represented by an integer array fruits where fruits[i] is the type of fruit the ith tree produces.

  You want to collect as much fruit as possible. However, the owner has some strict rules that you must follow:

      You only have two baskets, and each basket can only hold a single type of fruit. There is no limit on the amount of fruit each basket can hold.
      Starting from any tree of your choice, you must pick exactly one fruit from every tree (including the start tree) while moving to the right. The picked fruits must fit in one of your baskets.
      Once you reach a tree with fruit that cannot fit in your baskets, you must stop.

  Given the integer array fruits, return the maximum number of fruits you can pick.

  Example 1:
      Input: fruits = [1,2,1]
      Output: 3
      Explanation: We can pick from all 3 trees.

  Example 2:
      Input: fruits = [0,1,2,2]
      Output: 3
      Explanation: We can pick from trees [1,2,2].
      If we had started at the first tree, we would only pick from trees [0,1].

  Example 3:
      Input: fruits = [1,2,3,2,2]
      Output: 4
      Explanation: We can pick from trees [2,3,2,2].
      If we had started at the first tree, we would only pick from trees [1,2].

  Constraints:
      1 <= fruits.length <= 10^5
      0 <= fruits[i] < fruits.length
*/


// This problem is just "Longest Substring with At Most K Distinct Characters",
// where K = 2
const lengthOfLongestSubstringKDistinct = (k, fruits) => {
    if (!fruits) {
        return 0
    }

    let first = 0
    let longest = 0
    const counts = new Map() // fruit -> # occurrences

    for (let i = 0; i < fruits.length; i++) {
        const currentFruit = fruits[i]

        // Increment the current fruit count
        counts.set(currentFruit, (counts.has(currentFruit) ? counts.get(currentFruit) : 0) + 1)

        while (counts.size > k) {
            const firstFruit = fruits[first]

            // Decrement the count of the first fruit
            counts.set(firstFruit, counts.get(firstFruit) - 1)

            // If the count of the first fruit is 0, remove it from the map
            if (counts.get(firstFruit) === 0) {
                counts.delete(firstFruit)
            }

            // Increment the first fruit pointer
            first++
        }

        longest = Math.max(longest, i - first + 1)
    }

    return longest
}

const totalFruit = fruits => {
    return lengthOfLongestSubstringKDistinct(2, fruits)
}


console.assert(totalFruit([1,2,1]) === 3)
console.assert(totalFruit([0,1,2,2]) === 3)
console.assert(totalFruit([1,2,3,2,2]) === 4)
console.assert(totalFruit([0,1,2]) === 2)
console.assert(totalFruit([3,3,3,1,2,1,1,2,3,3,4]) === 5)
console.assert(totalFruit([0,0,1,1]) === 4)
