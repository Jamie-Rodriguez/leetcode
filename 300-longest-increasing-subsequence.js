/*
  300. Longest Increasing Subsequence
  Medium

  Given an integer array nums, return the length of the longest strictly increasing subsequence.

  A subsequence is a sequence that can be derived from an array by deleting some or no elements without changing the order of the remaining elements. For example, [3,6,2,7] is a subsequence of the array [0,3,1,6,2,2,7].

  Example 1:
      Input: nums = [10,9,2,5,3,7,101,18]
      Output: 4
      Explanation: The longest increasing subsequence is [2,3,7,101], therefore the length is 4.

  Example 2:
      Input: nums = [0,1,0,3,2,3]
      Output: 4

  Example 3:
      Input: nums = [7,7,7,7,7,7,7]
      Output: 1

  Constraints:
      1 <= nums.length <= 2500
      -10^4 <= nums[i] <= 10^4

  Follow up: Can you come up with an algorithm that runs in O(n log(n)) time complexity?
*/


// Warning: Modifies 'arr'!
const binarySearchInsert = (arr, num, left=0, right=arr.length-1) => {
    if (left > right) {
        // Don't do anything if 'n' already exists in 'sequence'
        if (num === arr[right]) {
            return arr
        } else {
            return arr.splice(right + 1, 1, num)
        }
    }

    const middleIndex = left + Math.floor((right - left) / 2)

    if (num < arr[middleIndex]) {
        return binarySearchInsert(arr, num, left, middleIndex-1)
    } else {
        return binarySearchInsert(arr, num, middleIndex+1, right)
    }
}


const lengthOfLIS = nums => {
    // Warning: 'sequence' will NOT be the correct LIS,
    // but will be the correct length
    // I used the name 'sequence' as it is a
    // collection of strictly increasing, unique set of numbers
    let sequence = []

    for (n of nums) {
        if ((sequence.length === 0) || (n > sequence[sequence.length - 1])) {
            sequence.push(n)
        } else if (n < sequence[0]) {
            sequence[0] = n
        } else if (n < sequence[sequence.length - 1]) {
            binarySearchInsert(sequence, n)
        }
    }

    return sequence.length
}

// Dynamic programming solution
// O(n^2)
const lengthOfLIS2 = nums => {
    let lis = 1
    let lengthLisFromIndex = Array(nums.length).fill(1)

    // Go in reverse order and build up the LIS from each index until we get to
    // the start
    for (let i = nums.length - 1; i >= 0; i--)
        for (let j = i + 1; j < nums.length; j++)
            if (nums[i] < nums[j]) {
                lengthLisFromIndex[i] = Math.max(lengthLisFromIndex[i],
                                                 1 + lengthLisFromIndex[j])
                lis = Math.max(lis, lengthLisFromIndex[i])
            }

    return lis
}


console.assert(lengthOfLIS([10,9,2,5,3,7,101,18]) === 4)
console.assert(lengthOfLIS([0,1,0,3,2,3]) === 4)
console.assert(lengthOfLIS([7,7,7,7,7,7,7]) === 1)
console.assert(lengthOfLIS([4,10,4,3,8,9]) === 3)
console.assert(lengthOfLIS([1,7,8,4,5,6,-1,9]) === 5)
