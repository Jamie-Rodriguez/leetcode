/*
  98. Validate Binary Search Tree
  Medium

  Given the root of a binary tree, determine if it is a valid binary search tree (BST).

  A valid BST is defined as follows:
      - The left subtree of a node contains only nodes with keys less than the node's key.
      - The right subtree of a node contains only nodes with keys greater than the node's key.
      - Both the left and right subtrees must also be binary search trees.

  Example 1:
      Input: root = [2,1,3]
      Output: true

  Example 2:
      Input: root = [5,1,4,null,null,3,6]
      Output: false
      Explanation: The root node's value is 5 but its right child's value is 4.

  Constraints:
      The number of nodes in the tree is in the range [1, 10^4].
      -2^31 <= Node.val <= 2^31 - 1
*/


const isValidBST = (root, min=-Infinity, max=Infinity) => {
    const { val, left, right } = root

    const leftValid = left ? left.val < val : true
    const rightValid = right ? val < right.val : true
    const isValidSubtree = min < val && val < max

    return leftValid && rightValid && isValidSubtree && (left ? isValidBST(left, min, val) : true) && (right ? isValidBST(right, val, max) : true)
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

console.assert(isValidBST(arrayToBinaryTree([2,1,3])) === true)
console.assert(isValidBST(arrayToBinaryTree([5,1,4,null,null,3,6])) === false)
console.assert(isValidBST(arrayToBinaryTree([5,4,6,null,null,3,7])) === false)
console.assert(isValidBST(arrayToBinaryTree([3,1,5,0,2,4,6,null,null,null,3])) === false)
