/*
	Note: I originally encountered this problem in a Microsoft interview on the HackerRank platform.

	This is identical to Leetcode's problem "829. Consecutive Numbers Sum".

	I've included both problem descriptions for reference.
*/

/*
	829. Consecutive Numbers Sum
	Hard

	Given an integer `n`, return _the number of ways you can write `n` as the sum of consecutive positive integers_.

	Example 1:
	    Input: n = 5
	    Output: 2
	    Explanation: 5 = 2 + 3

	Example 2:
	    Input: n = 9
	    Output: 3
	    Explanation: 9 = 4 + 5 = 2 + 3 + 4

	Example 3:
	    Input: n = 15
	    Output: 4
	    Explanation: 15 = 8 + 7 = 4 + 5 + 6 = 1 + 2 + 3 + 4 + 5

	Constraints:
	    - 1 <= n <= 10^9
*/

/*
	An array generator service takes in a single integer k and a sum s. It returns an array with a sum s where the ith element is (k + i - 1). Thus, for the parameters k = 6 and s = 30, the service returns [6, 7, 8, 9]. Note that it is not always possible to generate a valid array for some pair of k and s.

	Given an integer s, find the number of valid values of k for which it is possible to generate a valid array using the service.

	Example
	=======

	Suppose s = 10.

	    * For k = 1, [1, 2, 3, 4] sums to 10
	    * For k = 10, [10] sum to 10

	There are 2 values of k for s = 10.

	Function Description
	====================

	Complete the function `getKCount` in the editor below.

	`getKCount` has the following parameter(s):

	    long s: the value to sum to

	Returns
	=======

	    long: count of possible values of k

	Constraints
	===========

	    * 1 ≤ s ≤ 10^12

	Example Case 0
	==============

	Input: s = 125
	Output: 4

	Explanation
	-----------

	There are four possible values of k.
	    * k = 8 produces 8 + 9 + 10 + 11 + 12 + 13 + 14 + 15 + 16 + 17 = 125
	    * k = 23 produces 23 + 24 + 25 + 26 + 27 = 125
	    * k = 62 produces 62 + 63 = 125
	    * k = 125 produces 125 = 125
*/


// Microsoft/HackerRank interface
/**
 * @param {number} s - The target sum (1 ≤ s ≤ 10^12)
 * @returns {number} The count of valid values of k
 *
 * Time complexity: O(√(s))
 * Space complexity: O(1)
 */
export function getKCount(s) {
	/**
	 * We are looking for consecutive integer sequences starting at k with
	 * some length n that sum to s:
	 *
	 *     k + (k + 1) + (k + 2) + ... + (k + n - 1) = s
	 *
	 * But the key is to recognise that **there will only be one solution
	 * for each n**. And so we can iterate over n and check if the
	 * corresponding k is a positive integer.
	 *
	 * Notice there are *n* terms in the series, each containing a *k*, so
	 * the *k* part contributes nk. We can extract the *k* part:
	 *
	 *     nk + 0 + 1 + 2 + ... + (n - 1) = s
	 *
	 * We can use the Gauss summation formula:
	 *     Sum of 1 to n = 1 + 2 + 3 + ... + n
	 *                   = n * (n + 1) / 2
	 *
	 * In our case we are summing from 0 to n - 1, so this becomes
	 *     0 + 1 + 2 + ... + (n - 1) = n * (n - 1) / 2
	 *
	 * Now we can simplify our original series:
	 *     nk + 0 + 1 + 2 + ... + (n - 1) = s
	 *     <=> nk + n * (n - 1) / 2 = s
	 *
	 * Now we rearrange to find k:
	 *     nk + n * (n - 1) / 2 = s
	 *     2nk + n * (n - 1) = 2s
	 *     2nk = 2s - n * (n - 1)
	 *     k = (2s - n * (n - 1)) / (2n)
	 *
	 * This tells us "Given an array of length n, what starting value k
	 * would make it sum to s?"
	 *
	 * For a valid solution, k must be a positive integer, so two
	 * conditions must hold:
	 *     1. The numerator (2s - n * (n - 1)) must be evenly divisible by
	 *        2n, so k is an integer.
	 *     2. The result must be ≥ 1, so k is positive.
	 *
	 * Because we need k ≥ 1, this means:
	 *     (2s - n * (n - 1)) / (2n) ≥ 1
	 *     2s - n * (n - 1) ≥ 2n
	 *     2s ≥ n * (n - 1) + 2n
	 *     2s ≥ n * (n + 1)
	 *
	 * So the loop only needs to run while n * (n + 1) ≤ 2s
	 *
	 * Which means n and therefore the time complexity is at most around
	 *     O(√(2s)) = O(√s)
	 *
	 * For fun, we can calculate the exact maximum n
	 *     n * (n + 1) = 2s
	 *     n² + n = 2s
	 *     n² + n - 2s = 0
	 * Applying the quadratic formula:
	 *     n = (-1 + √(1 + 8s)) / 2
	 * (We discard the negative root since n must be positive.)
	 * So the exact upper bound on the number of iterations is:
	 *     n_max = floor((-1 + √(1 + 8s)) / 2)
	 * For large s, the +1 and -1 become negligible, so this simplifies to
	 * approximately √(8s) / 2 = √(2s), which is why we say the complexity
	 * is O(√s) - constant factors don't matter in big-O notation.
	 */
	let kCount = 0

	for (let n = 1; n * (n + 1) <= 2 * s; n++) {
		const k = (2 * s - n * (n - 1)) / (2 * n)

		if (Number.isInteger(k) && k >= 1)
			kCount++
	}

	return kCount
}


// Leetcode interface
/**
 * @param {number} n
 * @return {number}
 */
function consecutiveNumbersSum(n) {
	return getKCount(n)
}


console.assert(consecutiveNumbersSum(5) === 2)
console.assert(consecutiveNumbersSum(9) === 3)
console.assert(consecutiveNumbersSum(15) === 4)
