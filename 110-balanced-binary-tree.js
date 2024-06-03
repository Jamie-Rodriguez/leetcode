/*
  110. Balanced Binary Tree
  Easy

  Given a binary tree, determine if it is height-balanced.

  Example 1:
      Input: root = [3,9,20,null,null,15,7]
      Output: true

  Example 2:
      Input: root = [1,2,2,3,3,null,null,4,4]
      Output: false

  Example 3:
      Input: root = []
      Output: true

  Constraints:
      The number of nodes in the tree is in the range [0, 5000].
      -10^4 <= Node.val <= 10^4
*/


const height = node => {
    if (!node)
        return -1

    const { left, right } = node

    const leftHeight = height(left) + 1
    const rightHeight = height(right) + 1

    return Math.max(leftHeight, rightHeight)
}

const isBalanced = root => {
    if (!root)
        return true

    const { left, right } = root

    return (
        Math.abs(height(left) - height(right)) < 2
        && isBalanced(left)
        && isBalanced(right)
    )
}


const arrayToBinaryTree = (arr, i=0) => {
    if (i >= arr.length || arr[i] === null)
        return null

    return {
        val: arr[i],
        left: arrayToBinaryTree(arr, 2 * i + 1),
        right: arrayToBinaryTree(arr, 2 * i + 2)
    }
}

console.assert(isBalanced(arrayToBinaryTree([3,9,20,null,null,15,7])) === true)
console.assert(isBalanced(arrayToBinaryTree([1,2,2,3,3,null,null,4,4])) === false)
console.assert(isBalanced(arrayToBinaryTree([])) === true)
