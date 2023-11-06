/*
  1151. Minimum Swaps to Group All 1's Together
  Medium

  Given a binary array data, return the minimum number of swaps required to group all 1’s present in the array together in any place in the array.

  Example 1:
      Input: data = [1,0,1,0,1]
      Output: 1
      Explanation: There are 3 ways to group all 1's together:
      [1,1,1,0,0] using 1 swap.
      [0,1,1,1,0] using 2 swaps.
      [0,0,1,1,1] using 1 swap.
      The minimum is 1.

  Example 2:
      Input: data = [0,0,0,1,0]
      Output: 0
      Explanation: Since there is only one 1 in the array, no swaps are needed.

  Example 3:
      Input: data = [1,0,1,0,1,0,0,1,1,0,1]
      Output: 3
      Explanation: One possible solution that uses 3 swaps is [0,0,0,0,0,1,1,1,1,1,1].

  Constraints:
      1 <= data.length <= 10^5
      data[i] is either 0 or 1.
*/


// "Brute force" sliding window approach
// O(data^2)
// Results in "Time Limit Exceeded"
const bruteForceSlidingWindowMinSwaps = data => {
    // Sliding window size
    // O(data)
    const numOnes = data.reduce((ones, currentData) => ones + currentData, 0)

    // Number of swaps
    let minNumZeroes = data.length

    // O(data * numOnes)
    // numOnes <= data
    // Worst case: numOnes = data/2,
    //     => O(data) * O(data/2)
    //     = O(data^2)
    for (let start = 0; start <= data.length - numOnes; start++) {
        let numZeroes = 0

        for (let i = start; i < start + numOnes; i++)
            if (data[i] === 0)
                numZeroes++

        minNumZeroes = Math.min(minNumZeroes, numZeroes)
    }

    return minNumZeroes
}

// Begin main loop - two-pointer sliding window technique
// O(data)
const minSwaps = data => {
    // Sliding window size
    // O(data)
    const numOnes = data.reduce((ones, currentData) => ones + currentData, 0)

    // Base cases
    if ((numOnes === 0) || (numOnes === 1))
        return 0


    // Set pointers to initial window size + gather stats for initial window
    let left = 0
    let right = numOnes - 1
    let numZeroes = 0

    // Minimum number of swaps
    let minNumZeroes = data.length

    for (let i = left; i <= right; i++)
        if (data[i] === 0)
            numZeroes++

    minNumZeroes = Math.min(minNumZeroes, numZeroes)

    // Begin main loop - two-pointer sliding window technique
    // O(data)
    while (right < data.length - 1) {
        // Extend the window to the right
        right++
        if (data[right] === 0)
            numZeroes++

        // The left side of the window catches up
        // Remove old value first!
        if (data[left] === 0)
            numZeroes--
        left++

        minNumZeroes = Math.min(minNumZeroes, numZeroes)
    }

    return minNumZeroes
}


console.assert(minSwaps([1,0,1,0,1]) === 1)
console.assert(minSwaps([0,0,0,1,0]) === 0)
console.assert(minSwaps([1,0,1,0,1,0,0,1,1,0,1]) === 3)
