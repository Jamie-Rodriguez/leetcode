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
const lengthOfLongestSubstringKDistinct = (k, items) => {
    if (!items) {
        return 0
    }

    let first = 0
    let longest = 0
    const window = new Map() // item -> number of occurrences seen

    for (let i = 0; i < items.length; i++) {
        const currentItem = items[i]

        // Increment the count of the current item
        window.set(currentItem, (window.has(currentItem)
                                ? window.get(currentItem)
                                : 0) + 1)

        /*
          If the new item hasn't been seen before, then the window of
          previously-seen items now has k + 1 distinct items...
          We loop: incrementing the 'first' pointer and decrementing the
          occurrences-counter of the item pointed to by 'first' - effectively
          shrinking the window to next time it is in a 'legal' state - i.e.
          where the window only contains 'k' distinct items.
          Example for k = 2 with the following array:
          [a a a b c b b c a a d]

          i = 0 -> 3
          [a a a b c b b c a a d], cache: { a => 3, b => 1 }
           ^     ^
           f     i

          i = 4
          [a a a b c b b c a a d], cache: { b => 1, c => 1 }
                 ^ ^
                 f i

          i = 5 -> 7
          [a a a b c b b c a a d], cache: { b => 3, c => 2 }
                 ^       ^
                 f       i

          i = 8
          [a a a b c b b c a a d], cache: { c => 1, a => 1 }
                         ^ ^
                         f i

          i = 9
          [a a a b c b b c a a d], cache: { c => 1, a => 2 }
                         ^   ^
                         f   i

          i = 10
          [a a a b c b b c a a d], cache: { a => 2, d => 1 }
                           ^   ^
                           f   i
        */
        while (window.size > k) {
            const firstItem = items[first]

            // Decrement the count of the item type pointed to by 'first'
            window.set(firstItem, window.get(firstItem) - 1)

            // If the count of the item type pointed to by 'first' is 0, remove
            // it from the map
            if (window.get(firstItem) === 0) {
                window.delete(firstItem)
            }

            // Increment the 'first' pointer i.e. shrink the window to the right
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

