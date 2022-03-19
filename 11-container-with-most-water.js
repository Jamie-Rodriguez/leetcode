/*
  11. Container With Most Water
  Medium

  You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).

  Find two lines that together with the x-axis form a container, such that the container contains the most water.

  Return the maximum amount of water a container can store.

  Notice that you may not slant the container.

  Example 1:
      Input: height = [1,8,6,2,5,4,8,3,7]
      Output: 49
  Explanation: The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.

  Example 2:
      Input: height = [1,1]
      Output: 1

  Constraints:
      n == height.length
      2 <= n <= 10^5
      0 <= height[i] <= 10^4
*/

/*
  Some initial observations:
  The area (water) able to be stored by two lines is defined by:
      area = distance between lines * height of smaller line
  We can formalise it a bit, given we have an array of heights, 'height', as:
      area = width * min(height[l], height[r])

  We use two pointers, initialised to each end of the array.

        |         |
        |         |   |
        | |       |   |
        | |   |   |   |    l: 0, r: 8, width: 8
        | |   | | |   |    area: 8 = 8 * min(1, 7)
        | |   | | | | |
        | | | | | | | |
      | | | | | | | | |
      l               r

  We do this because we are starting with the maximum value for width, which is a promising start point.
  Next we will try moving one of the pointers inwards, but which one?
  Since we know that width will be decreasing by 1, the *only* possible way the area can increase now is if the smaller line's height increases by more than the amount that the width decreases on the next iteration.
  This proof is the key to the problem!
  Therefore, we always move the pointer of the _smaller_ of the two lines inward, in the hopes of finding a line with more height next time.

        |         |
        |         |   |
        | |       |   |
        | |   |   |   |    l: 1, r: 8, width: 7
        | |   | | |   |    area: 49 = 7 * min(8, 7)
        | |   | | | | |
        | | | | | | | |
      | | | | | | | | |
        l             r

  We keep iterating through the array the same way, until l = r.

        |         |
        |         |   |
        | |       |   |
        | |   |   |   |    l: 1, r: 7, width: 6
        | |   | | |   |    area: 18 = 6 * min(8, 3)
        | |   | | | | |
        | | | | | | | |
      | | | | | | | | |
        l           r

        |         |
        |         |   |
        | |       |   |
        | |   |   |   |    l: 1, r: 6, width: 5
        | |   | | |   |    area: 35 = 5 * min(8, 8)
        | |   | | | | |
        | | | | | | | |
      | | | | | | | | |
        l         r

  What do we do if the heights of both lines are equal?
  Pick whichever side will have the larger of the two potential heights, since we want to maximise the area.

        |         |
        |         |   |
        | |       |   |
        | |   |   |   |    l: 2, r: 6, width: 4
        | |   | | |   |    area: 24 = 4 * min(6, 8)
        | |   | | | | |
        | | | | | | | |
      | | | | | | | | |
          l       r

        |         |
        |         |   |
        | |       |   |
        | |   |   |   |    l: 3, r: 6, width: 3
        | |   | | |   |    area: 6 = 3 * min(2, 8)
        | |   | | | | |
        | | | | | | | |
      | | | | | | | | |
            l     r

        |         |
        |         |   |
        | |       |   |
        | |   |   |   |    l: 4, r: 6, width: 2
        | |   | | |   |    area: 10 = 2 * min(5, 8)
        | |   | | | | |
        | | | | | | | |
      | | | | | | | | |
              l   r

        |         |
        |         |   |
        | |       |   |
        | |   |   |   |    l: 5, r: 6, width: 1
        | |   | | |   |    area: 4 = 1 * min(4, 8)
        | |   | | | | |
        | | | | | | | |
      | | | | | | | | |
                l r

  And we've now searched the array, the largest are we saw was with pointers l: 1, r: 8, giving an area of 49.
*/

const maxArea = height => {
    // Problem description says that 2 <= height.length <= 10^5
    // So don't have to worry about when height.length == 0 or 1
    let maxArea = 0
    let left = 0
    let right = height.length - 1

    while ((right - left) > 0) {
        const width = right - left
        const area =  width * Math.min(height[left], height[right])
        maxArea = Math.max(maxArea, area)

        if (height[left] === height[right]) {
            if (height[left+1] <= height[right-1]) {
                right--
            } else {
                left++
            }
        } else if (height[left] < height[right]) {
            left++
        } else {
            right--
        }
    }

    return maxArea
}

console.assert(maxArea([1,8,6,2,5,4,8,3,7]) === 49)
console.assert(maxArea([1,1]) === 1)
console.assert(maxArea([4,3,2,1,4]) === 16)
console.assert(maxArea([1,2,1]) === 2)
console.assert(maxArea([3,2,1,1,2,3]) === 15)
