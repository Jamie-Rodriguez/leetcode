/*
  78. Subsets
  Medium

  Given an integer array nums of unique elements, return all possible subsets (the power set).

  The solution set must not contain duplicate subsets. Return the solution in any order.

  Example 1:
      Input: nums = [1,2,3]
      Output: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]

  Example 2:
      Input: nums = [0]
      Output: [[],[0]]

  Constraints:
      1 <= nums.length <= 10
      -10 <= nums[i] <= 10
      All the numbers of nums are unique.
*/

const subsets = nums => {
    const recurse = (i, currentSubset) => {
        if (i >= nums.length)
            return [currentSubset]

        return [...recurse(i + 1, currentSubset),
                ...recurse(i + 1, [...currentSubset, nums[i]])]
    }

    return recurse(0, [])
}

// TO-DO: Find a way to test this
console.log(subsets([1, 2, 3]))
console.log(subsets([0]))
