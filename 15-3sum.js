/*
  15. 3Sum
  Medium

  Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.

  Notice that the solution set must not contain duplicate triplets.

  Example 1:
      Input: nums = [-1,0,1,2,-1,-4]
      Output: [[-1,-1,2],[-1,0,1]]
      Explanation:
      nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.
      nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.
      nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.
      The distinct triplets are [-1,0,1] and [-1,-1,2].
      Notice that the order of the output and the order of the triplets does not matter.

  Example 2:
      Input: nums = [0,1,1]
      Output: []
      Explanation: The only possible triplet does not sum up to 0.

  Example 3:
      Input: nums = [0,0,0]
      Output: [[0,0,0]]
      Explanation: The only possible triplet sums up to 0.

  Constraints:
      3 <= nums.length <= 3000
      -10^5 <= nums[i] <= 10^5
*/


const threeSum = nums => {
    const sortedNums = nums.sort((a, b) => a - b)
    let left = 1
    let right = sortedNums.length - 1
    const triplets = []

    for (let i = 0; i < sortedNums.length - 2; i++) {
        if (i > 0 && sortedNums[i] === sortedNums[i - 1])
            continue

        left = i + 1
        right = sortedNums.length - 1

        while (left < right) {
            if (sortedNums[i] + sortedNums[left] + sortedNums[right] === 0) {
                triplets.push([sortedNums[i], sortedNums[left], sortedNums[right]])
                left++
                right--

                while (sortedNums[left] === sortedNums[left - 1])
                    left++

                continue
            }

            if (sortedNums[i] + sortedNums[left] + sortedNums[right] > 0)
                right--
            else
                left++
        }
    }

    return triplets
}


const twoDArraysEqual = (a, b) => {
    if (a.length !== b.length)
        return false

    for (let row = 0; row < a.length; row++)
        for (let column = 0; column < a[row].length; column++)
            if (a[row][column] !== b[row][column])
                return false

    return true
}

// Note: order of results does not matter
console.assert(twoDArraysEqual(threeSum([-1,0,1,2,-1,-4]), [[-1,-1,2],[-1,0,1]]))
console.assert(twoDArraysEqual(threeSum([0,1,1]), []))
console.assert(twoDArraysEqual(threeSum([0,0,0]), [[0,0,0]]))
console.assert(twoDArraysEqual(threeSum([0,0,0,0]), [[0,0,0]]))
console.assert(twoDArraysEqual(threeSum([-2,0,0,2,2]), [[-2,0,2]]))
console.assert(twoDArraysEqual(threeSum([-1,0,1,2,-1,-4,-2,-3,3,0,4]), [[-4,0,4],[-4,1,3],[-3,-1,4],[-3,0,3],[-3,1,2],[-2,-1,3],[-2,0,2],[-1,-1,2],[-1,0,1]]))
