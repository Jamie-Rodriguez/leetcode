/*
  167. Two Sum II - Input Array Is Sorted
  Medium

  Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number. Let these two numbers be numbers[index_1] and numbers[index_2] where 1 <= index_1 < index_2 <= numbers.length.

  Return the indices of the two numbers, index_1 and index_2, added by one as an integer array [index_1, index_2] of length 2.

  The tests are generated such that there is exactly one solution. You may not use the same element twice.

  Your solution must use only constant extra space.

  Example 1:
      Input: numbers = [2,7,11,15], target = 9
      Output: [1,2]
      Explanation: The sum of 2 and 7 is 9. Therefore, index_1 = 1, index_2 = 2. We return [1, 2].

  Example 2:
      Input: numbers = [2,3,4], target = 6
      Output: [1,3]
      Explanation: The sum of 2 and 4 is 6. Therefore index_1 = 1, index_2 = 3. We return [1, 3].

  Example 3:
      Input: numbers = [-1,0], target = -1
      Output: [1,2]
      Explanation: The sum of -1 and 0 is -1. Therefore index_1 = 1, index_2 = 2. We return [1, 2].

  Constraints:
      2 <= numbers.length <= 3 * 10^4
      -1000 <= numbers[i] <= 1000
      numbers is sorted in non-decreasing order.
      -1000 <= target <= 1000
      The tests are generated such that there is exactly one solution.
*/


const twoSum = (numbers, target) => {
    let left = 0
    let right = numbers.length - 1

    // From the problem definition:
    // > The tests are generated such that there is exactly one solution.
    while ((numbers[left] + numbers[right]) !== target) {
        // > Given a 1-indexed array of integers numbers that is already *sorted in non-decreasing order*...
        if ((numbers[left] + numbers[right]) < target)
            left++
        else
            right--
    }

    // > Return the indices of the two numbers, index_1 and index_2, added by one as an integer array [index_1, index_2] of length 2.
    return [left + 1, right + 1]
}


const arraysEqual = (a, b) => {
    if (a.length !== b.length)
        return false

    for (let i = 0; i < a.length; i++)
        if (a[i] !== b[i])
            return false

    return true
}

console.assert(arraysEqual(twoSum([2,7,11,15], 9), [1,2]))
console.assert(arraysEqual(twoSum([2,3,4], 6), [1,3]))
console.assert(arraysEqual(twoSum([-1,0], -1), [1,2]))
