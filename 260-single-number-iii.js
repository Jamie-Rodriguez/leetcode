/*
  260. Single Number III
  Medium

  Given an integer array `nums`, in which exactly two elements appear only once and all the other elements appear exactly twice. Find the two elements that appear only once. You can return the answer in **any order**.

  You must write an algorithm that runs in linear runtime complexity and uses only constant extra space.

  Example 1:
      Input: nums = [1,2,1,3,2,5]
      Output: [3,5]
      Explanation:  [5, 3] is also a valid answer.

  Example 2:
      Input: nums = [-1,0]
      Output: [-1,0]

  Example 3:
      Input: nums = [0,1]
      Output: [1,0]

  Constraints:
      - `2 <= nums.length <= 3 * 10^4`
      - `-2^31 <= nums[i] <= 2^31 - 1`
      - Each integer in `nums` will appear twice, only two integers will appear once.
*/


/**
 * @param {number[]} nums
 * @return {number[]}
 */
const  singleNumber = nums => {
    let cumulativeXor = 0

    for (const n of nums)
       cumulativeXor ^= n

    const diffRightmostSetBit = cumulativeXor & -cumulativeXor

    let a = 0, b = 0
    for (const n of nums)
        if (n & diffRightmostSetBit)
            a ^= n
        else
            b ^= n

    return [a, b]
}


const compareArrays = (a, b) => {
    if (a.length !== b.length)
        return false

    const aSet = new Set(a)
    const bSet = new Set(b)

    if (aSet.size !== bSet.size)
        return false

    for (const v of aSet)
        if (!bSet.has(v))
            return false

    return true
}

console.assert(compareArrays(singleNumber([1,2,1,3,2,5]), [3,5]))
console.assert(compareArrays(singleNumber([-1,0]), [-1,0]))
console.assert(compareArrays(singleNumber([0,1]), [1,0]))
