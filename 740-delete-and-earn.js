/*
  740. Delete and Earn
  Medium

  You are given an integer array nums. You want to maximize the number of points you get by performing the following operation any number of times:

      - Pick any nums[i] and delete it to earn nums[i] points. Afterwards, you must delete every element equal to nums[i] - 1 and every element equal to nums[i] + 1.

  Return the maximum number of points you can earn by applying the above operation some number of times.

  Example 1:
      Input: nums = [3,4,2]
      Output: 6
      Explanation: You can perform the following operations:
          - Delete 4 to earn 4 points. Consequently, 3 is also deleted. nums = [2].
          - Delete 2 to earn 2 points. nums = [].
      You earn a total of 6 points.

  Example 2:
      Input: nums = [2,2,3,3,3,4]
      Output: 9
      Explanation: You can perform the following operations:
          - Delete a 3 to earn 3 points. All 2's and 4's are also deleted. nums = [3,3].
          - Delete a 3 again to earn 3 points. nums = [3].
          - Delete a 3 once more to earn 3 points. nums = [].
      You earn a total of 9 points.

  Constraints:
      1 <= nums.length <= 2 * 10^4
      1 <= nums[i] <= 10^4
*/


/**
 * @param {number[]} nums
 * @return {number}
 */
const deleteAndEarnTopDown = nums => {
    const freqs = new Map()
    // O(nums)
    nums.forEach(num => freqs.set(num, freqs.has(num) ? freqs.get(num) + 1 : 1))

    let sortedUniqueNums = []
    // O(distinct elements in nums)
    freqs.forEach((freq, num) => {
        sortedUniqueNums = sortedUniqueNums.concat(num)
    })
    // O(distinct elements in nums * log(distinct elements in nums))
    sortedUniqueNums.sort((a, b) => a - b)

    const cache = new Map()

    /*
      Ideally we could provide the array of sortedUniqueNums
      and could recursively call with a new list with the processed nums removed
      - Used a lot in functional programming patterns
      However we can't memoise calls with arrays easily,
      So opted to use the index along 'sortedUniqueNums' array instead

      Note: most solutions use arbitrary integer 'n' the state variable
      i.e. "What is the max score we can get from current integer 'n'?"
      However this approach involves iterating all the way from n to 0;
      which can potentially be quite inefficient as most numbers won't be present in 'nums'.
      By using the index along 'sortedUniqueNums' array,
      we potentially avoid a lot of unnecessary iteration

      Using arbitrary integer 'n' makes the recurrence relation a bit easier though...
      We wouldn't need the 'if' statement, just:
          score = Math.max(getMaxPoints(n - 1),
                           getMaxPoints(n - 2) + num * freqs.get(num))
      every time...
      If 'n' is not in 'freqs'/'sortedUniqueNums', then we can "take" 0 points
      and continue iterating down.

      Also note that if we use arbitrary integer 'n' as the state variable,
      we no longer need 'sortedUniqueNums',
      and therefore we don't need to perform the expensive sorting operation!

      So if it can be assumed that "distinct elements in nums" << nums for all inputs,
      then it is better to use this solution.
      Otherwise it is better to use a state value of arbitrary integer 'n'
      - for simplicity's sake
    */
    const getMaxPoints = index => {
        if (index < 0)
            return 0

        if (cache.has(index))
            return cache.get(index)

        const num = sortedUniqueNums[index]

        let score = 0

        if (sortedUniqueNums[index - 1] === num - 1)
            score = Math.max(getMaxPoints(index - 1),
                             getMaxPoints(index - 2) + num * freqs.get(num))
        else
            score = num * freqs.get(num) + getMaxPoints(index - 1)

        cache.set(index, score)

        return cache.get(index)
    }

    return getMaxPoints(sortedUniqueNums.length - 1)
}

const deleteAndEarnBottomUp = nums => {
    const freqs = new Map()
    // O(nums)
    nums.forEach(num => freqs.set(num, freqs.has(num) ? freqs.get(num) + 1 : 1))

    let sortedUniqueNums = []
    // O(distinct elements in nums)
    freqs.forEach((freq, num) => {
        sortedUniqueNums = sortedUniqueNums.concat(num)
    })
    // O(distinct elements in nums * log(distinct elements in nums))
    sortedUniqueNums.sort((a, b) => a - b)

    const subproblems = new Array(sortedUniqueNums.length).fill(0)
    // Base case(s)
    subproblems[0] = sortedUniqueNums[0] * freqs.get(sortedUniqueNums[0])

    // O(distinct elements in nums)
    for (let i = 1; i < subproblems.length; i++) {
        let score = 0
        const num = sortedUniqueNums[i]

        // subproblems[i - 2] ?? 0 is only required here for i == 1
        if (sortedUniqueNums[i - 1] === num - 1)
            score = Math.max(subproblems[i - 1],
                             (subproblems[i - 2] ?? 0) + num * freqs.get(num))
        else
            score = num * freqs.get(num) + subproblems[i - 1]

        subproblems[i] = score
    }

    return subproblems[subproblems.length - 1]
}


const deleteAndEarn = nums => deleteAndEarnBottomUp(nums)


console.assert(deleteAndEarn([3,4,2]) === 6)
console.assert(deleteAndEarn([2,2,3,3,3,4]) === 9)
console.assert(deleteAndEarn([3,1]) === 4)
