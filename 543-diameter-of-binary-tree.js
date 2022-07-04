/*
  543. Diameter of Binary Tree
  Easy

  Given the root of a binary tree, return the length of the diameter of the tree.

  The diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root.

  The length of a path between two nodes is represented by the number of edges between them.

  Example 1:

          1
         / \
        2   3
       / \
      4   5

      Input: root = [1,2,3,4,5]
      Output: 3
      Explanation: 3 is the length of the path [4,2,1,3] or [5,2,1,3].

  Example 2:
      Input: root = [1,2]
      Output: 1

  Constraints:
      The number of nodes in the tree is in the range [1, 10^4].
      -100 <= Node.val <= 100
*/


/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
 const diameterOfBinaryTree = root => {
    let diameter = 0

    const dfs = (node) => {
        if (!node) {
            return 0
        }

        const left = dfs(node.left)
        const right = dfs(node.right)

        diameter = Math.max(diameter, left + right)

        return 1 + Math.max(left, right)
    }

    dfs(root)
    return diameter
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

console.assert(diameterOfBinaryTree(arrayToBinaryTree([1,2,3,4,5])) === 3)
console.assert(diameterOfBinaryTree(arrayToBinaryTree([1,2])) === 1)
