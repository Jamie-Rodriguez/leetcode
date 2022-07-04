/*
  1161. Maximum Level Sum of a Binary Tree
  Medium

  Given the root of a binary tree, the level of its root is 1, the level of its children is 2, and so on.

  Return the smallest level x such that the sum of all the values of nodes at level x is maximal.

  Example 1:
                1
             /     \
            7       0
           / \     / \
          7  -8 null null
      Input: root = [1,7,0,7,-8,null,null]
      Output: 2
      Explanation:
        Level 1 sum = 1.
        Level 2 sum = 7 + 0 = 7.
        Level 3 sum = 7 + -8 = -1.
        So we return the level with the maximum sum which is level 2.

  Example 2:
      Input: root = [989,null,10250,98693,-89388,null,null,null,-32127]
      Output: 2

  Constraints:
      The number of nodes in the tree is in the range [1, 10^4].
      -10^5 <= Node.val <= 10^5
*/


/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
const maxLevelSum = root => {
    if (root === null) return 0

    const queue = [root]
    const sums = []

    while (queue.length > 0) {
        const width = queue.length
        let sum = 0

        for (let i = 0; i < width; i++) {
            const current = queue.pop()
            sum += current.val

            if (current.left) {
                queue.unshift(current.left)
            }
            if (current.right) {
                queue.unshift(current.right)
            }
        }

        sums.push(sum)
    }

    return sums.reduce((maxIndex, sum, i) => sum > sums[maxIndex] ? i : maxIndex, 0) + 1
}


const arrayToBinaryTree = (arr, i=0) => {
    while (i < arr.length) {
        const node = { val: arr[i], left: null, right: null }

        node.left = arrayToBinaryTree(arr, 2 * i + 1)
        node.right = arrayToBinaryTree(arr, 2 * i + 2)

        return node
    }

    return null
}

console.assert(maxLevelSum(arrayToBinaryTree([1,7,0,7,-8,null,null])) === 2)
console.assert(maxLevelSum(arrayToBinaryTree([989,null,10250,98693,-89388,null,null,null,-32127])) === 2)
