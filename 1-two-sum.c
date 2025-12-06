/*
  1. Two Sum
  ==========

  Easy

  Given an array of integers `nums` and an integer `target`, return _indices of the two numbers such that they add up to `target`_.

  You may assume that each input would have **exactly one solution**, and you may not use the _same_ element twice.

  You can return the answer in any order.

  Example 1:
  ----------
      Input: nums = [2,7,11,15], target = 9
      Output: [0,1]
      Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

  Example 2:
  ----------
      Input: nums = [3,2,4], target = 6
      Output: [1,2]

  Example 3:
  ----------
      Input: nums = [3,3], target = 6
      Output: [0,1]

  Constraints:
  ------------
      - `2 <= nums.length <= 10^4`
      - `-10^9 <= nums[i] <= 10^9`
      - `-10^9 <= target <= 10^9`
      - **Only one valid answer exists.**

  **Follow-up**: Can you come up with an algorithm that is less than `O(n^2)` time complexity?
*/

#define RESULT_SIZE 2

/**
 * Note: The returned array must be malloced, assume caller calls free().
 */
int* twoSum(int* nums, int numsSize, int target, int* returnSize) {
	// Problem set guarantees that exactly one solution exists for an input
	// So don't have to do this, but for completeness...
	if (numsSize < RESULT_SIZE) {
		*returnSize = 0;
		return NULL;
	}

	int* result = malloc(RESULT_SIZE * sizeof(int));

	for (int offset = 0; offset < numsSize; offset++) {
		for (int i = offset + 1; i < numsSize; i++) {
			if (nums[offset] + nums[i] == target) {
				result[0] = offset;
				result[1] = i;

				*returnSize = RESULT_SIZE;
				return result;
			}
		}
	}

	// Problem set guarantees that exactly one solution exists for an input
	// So don't have to do this, but for completeness...
	*returnSize = 0;
	free(result);
	return NULL;
}


/**
 * O(n) time complexity solution using a hashtable
 */

#define RESULT_SIZE 2
#define HASHTABLE_SIZE 20011

/**
 * Note: The returned array must be malloced, assume caller calls free().
 */
int* twoSum(int* nums, int numsSize, int target, int* returnSize) {
	// Problem set guarantees that exactly one solution exists for an input
	// So don't have to do this, but for completeness...
	if (numsSize < RESULT_SIZE) {
		*returnSize = 0;
		return NULL;
	}

	// Hashtable inverts mapping of `nums`: index -> number
	// i.e. go from number to index in original `nums` array
	// Technically any of these mallocs could fail,
	// but ignoring that for brevity in test scenario
	int* keys = malloc(HASHTABLE_SIZE * sizeof(int)); // number = `nums[i]`
	int* vals = malloc(HASHTABLE_SIZE * sizeof(int)); // index of number in `nums`
	int* result = malloc(RESULT_SIZE * sizeof(int));

	// Sentinel value to detect if hash index is unoccupied
	for (int i = 0; i < HASHTABLE_SIZE; i++)
		vals[i] = -1;

	for (int i = 0; i < numsSize; i++) {
		/**
		 * Side-note:
		 * This expression `target - nums[i]` could possibly overflow
		 * in the *general* case.
		 * Given the constraints allow values in the range [-10⁹, 10⁹]
		 * for both `target` and `nums[i]`, the difference could reach
		 * ±2×10⁹, which fits in the 32-bit signed integer range
		 * (approximately ±2.1×10⁹).
		 * (I checked, and at time of writing, the Leetcode environment
		 * uses 32-bit `int`s)
		 */
		int complement = target - nums[i];
		unsigned int h = (unsigned int) complement % HASHTABLE_SIZE;

		// Search for complement
		while (vals[h] != -1) {
			if (keys[h] == complement) {
				result[0] = vals[h];
				result[1] = i;

				*returnSize = 2;
				free(keys);
				free(vals);
				return result;
			}

			h = (h + 1) % HASHTABLE_SIZE;
		}

		// Insert current number
		h = (unsigned int) nums[i] % HASHTABLE_SIZE;
		while (vals[h] != -1)
			h = (h + 1) % HASHTABLE_SIZE;
		keys[h] = nums[i];
		vals[h] = i;
	}

	// Problem set guarantees that exactly one solution exists for an input
	// So don't have to do this, but for completeness...
	free(keys);
	free(vals);
	free(result);
	*returnSize = 0;
	return NULL;
}