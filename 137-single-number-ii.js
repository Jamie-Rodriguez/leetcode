/*
  137. Single Number II
  Medium

  Given an integer array `nums` where every element appears **three times** except for one, which appears **exactly once**. _Find the single element and return it._

  You must implement a solution with a linear runtime complexity and use only constant extra space.

  Example 1:
      Input: nums = [2,2,3,2]
      Output: 3

  Example 2:
      Input: nums = [0,1,0,1,0,1,99]
      Output: 99

  Constraints:
      - `1 <= nums.length <= 3 * 10^4`
      - `-2^31 <= nums[i] <= 2^31 - 1`
      - Each element in `nums` appears exactly **three times** except for one element which appears **once**.
*/


/**
 * @param {number[]} nums
 * @return {number}
 */
const singleNumber = nums => {
    let seenOnce = 0, seenTwice = 0

    for (const n of nums) {
        /*
          Looking at the following truth table where
              b  = the bit
              s₁ = bit has been recorded as seen once before
              s₂ = bit has been recorded as seen twice before
              X  = impossible state (AKA "don't care")

          (unchanged) placed for emphasis

          | b | s₁ | s₂ |      s₁′      |      s₂′      |
          |:-:|:--:|:--:|:-------------:|:-------------:|
          | F |  F |  F | F (unchanged) | F (unchanged) |
          | F |  F |  T | F (unchanged) | T (unchanged) |
          | F |  T |  F | T (unchanged) | F (unchanged) |
          | F |  T |  T | T (unchanged) | T (unchanged) |
          | T |  F |  F |       T       |       F       |
          | T |  F |  T |       F       |       F       |
          | T |  T |  F |       F       |       T       |
          | T |  T |  T |       X       |       X       |

          Approach 1: Karnaugh maps
          =========================

          Using Karnaugh maps to derive possible formulas to use:

              s₁′ = (¬b ∧ s₁) ∨ (b ∧ ¬s₁ ∧ ¬s₂)

              s₂′ = (¬b ∧ s₂) ∨ (b ∧ s₁ ∧ ¬s₂)
          or exploiting the "impossible" state:
              s₂′ = (¬b ∧ s₂) ∨ (b ∧ s₁)

          Another idea: could possibly make s₂′ a function of (b, s₁′, s₂)
          i.e. make s₂′ sequentially dependent on s₁′:
              s₂′ = (¬b ∧ s₂) ∨ (b ∧ ¬s₁′ ∧ ¬s₂)

          These formulas seem quite verbose though,
          and none take advantage of XOR property present in the problem.
          i.e. this should be made easier with XOR somehow...

          I took a guess of using (b ⊕ s₁) and (b ⊕ s₂) to derive some new
          equations:

              s₁′ = ((b ⊕ s₁) ∧ ¬s₂) ∨ ((b ⊕ s₁) ∧ s₁)
                  = (b ⊕ s₁) ∧ (s₁ ∨ ¬s₂)

              s₂′ = ((b ⊕ s₂) ∧ s₁) ∨ ((b ⊕ s₂) ∧ s₂)
                  = (b ⊕ s₂) ∧ (s₁ ∨ s₂)

          Though these equations just use a guess of incorporating (b ⊕ sₙ),
          and still seem a bit verbose.

          Let's go back to the table and see if we can reason through this.

          Approach 2: using logical reasoning and analysing the truth table
          =================================================================

          Notice that when b = 0, both outputs remain unchanged
          (i.e. s₁′ = s₁ and s₂′ = s₂).

          This suggests a "toggling" form like:

              s₁′ = s₁ ⊕ (b ∧ something)
              s₂′ = s₂ ⊕ (b ∧ something_else)

          Because when b = 0, the XOR with 0 leaves the value unchanged.

          For s₁′, let's see when it differs from s₁ when b = 1:

              (s₁, s₂) = (0, 0): s₁′ = 1 (flips from 0)
              (s₁, s₂) = (0, 1): s₁′ = 0 (stays 0)
              (s₁, s₂) = (1, 0): s₁′ = 0 (flips from 1)

          Notice the bit *flips* in the cases where s₂ = 0

          Therefore:

              s₁′ = s₁ ⊕ (b ∧ ¬s₂)

          For s₂′, when b = 1:

              (s₁, s₂) = (0, 0): s₂′ = 0 (stays 0)
              (s₁, s₂) = (0, 1): s₂′ = 0 (flips from 1)
              (s₁, s₂) = (1, 0): s₂′ = 1 (flips from 0)

          The bit flips when s₁ ≠ s₂, which is exactly s₁ ⊕ s₂. So:

              s₂′ = s₂ ⊕ (b ∧ (s₁ ⊕ s₂))

          These formulas only use 3 logical operations, which is much better
          than the previous!

          Note: For s₂′, if you want to use s₁′ instead of s₁
          (i.e. make s₂′ sequentially dependent on s₁′),
          you will have to alter the formula slightly:

              s₂′ = s₂ ⊕ (b ∧ ¬s₁′)

          Which is the same amount of operations in the end,
          but might read nicer
        */


        // Parallel form needs to store the old `seenOnce` value to use in both
        // calculations.
        // This form generates less instructions in the final bytecode and
        // testing also confirms it to be the *slightly* faster implementation
        // on the Leetcode platform, interestingly enough...
        // Probably because avoiding the sequential dependency allows for
        // better instruction-level parallelism optimizations by the JS engine
        // on modern CPUs.
        const seenOnceOld = seenOnce
        seenOnce = seenOnce ^ (n & ~seenTwice)
        seenTwice = seenTwice ^ (n & (seenOnceOld ^ seenTwice))

        // Sequential form
        // seenOnce = seenOnce ^ (n & ~seenTwice)
        // seenTwice = seenTwice ^ (n & ~seenOnce)
    }

    return seenOnce
}


console.assert(singleNumber([2,2,3,2]) === 3)
console.assert(singleNumber([0,1,0,1,0,1,99]) === 99)
