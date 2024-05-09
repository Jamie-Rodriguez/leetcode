/*
  42. Trapping Rain Water
  Hard

  Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.

  Example 1:
      Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
      Output: 6
      Explanation: The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped.

  Example 2:
      Input: height = [4,2,0,3,2,5]
      Output: 9

  Constraints:
      n == height.length
      1 <= n <= 2 * 10^4
      0 <= height[i] <= 10^5
*/


const trap = height => {
    let water = 0

    let leftMax = 0
    let rightMax = 0

    let left = 0
    let right = height.length - 1

    while (left < right) {
        // This ensures that the pointers move towards the maximum
        if (height[left] <= height[right]) {
            leftMax = Math.max(height[left], leftMax)
            water += leftMax - height[left]
            left++
        } else {
            rightMax = Math.max(height[right], rightMax)
            water += rightMax - height[right]
            right--
        }
    }

    return water
}

// An attempt to refactor to remove branching
// Slower and in my opinion less readable!
const trapNoBranching = height => {
    let water = 0

    const pointers = {
        left: {
            index: 0,
            max: 0
        },
        right: {
            index: height.length - 1,
            max: 0
        }
    }

    while (pointers.left.index < pointers.right.index) {
        const direction = height[pointers.left.index] <= height[pointers.right.index]
                          ? 'left' : 'right'

        const currentHeight = height[pointers[direction].index]

        pointers[direction].max = Math.max(currentHeight, pointers[direction].max)

        water += pointers[direction].max - currentHeight

        pointers[direction].index += direction === 'left' ? 1 : -1
    }

    return water
}


console.log(trap([0,1,0,2,1,0,1,3,2,1,2,1]) === 6)
console.log(trap([4,2,0,3,2,5]) === 9)
