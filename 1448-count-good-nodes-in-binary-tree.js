/*
  1448. Count Good Nodes in Binary Tree
  Medium

  Given a binary tree root, a node X in the tree is named good if in the path from root to X there are no nodes with a value greater than X.

  Return the number of good nodes in the binary tree.

  Example 1:
             3
         /      \
        1        4
       / \      / \
      3  null  1   5
      Input: root = [3,1,4,3,null,1,5]
      Output: 4
      Explanation: Nodes in blue are good.
          Root Node (3) is always a good node.
          Node 4 -> (3,4) is the maximum value in the path starting from the root.
          Node 5 -> (3,4,5) is the maximum value in the path
          Node 3 -> (3,1,3) is the maximum value in the path.

  Example 2:
          3
         / \
        3  null
       / \
      4   2
      Input: root = [3,3,null,4,2]
      Output: 3
      Explanation: Node 2 -> (3, 3, 2) is not good, because "3" is higher than it.

  Example 3:
      Input: root = [1]
      Output: 1
      Explanation: Root is considered as good.

  Constraints:
      The number of nodes in the binary tree is in the range [1, 10^5].
      Each node's value is between [-10^4, 10^4].
*/


const isLargestInPath = (path, num) => path.reduce(
    (isLargest, n) => isLargest && num >= n, true)

const dfs = ({ val, left, right}, path=[]) => {
    if (left === null && right === null)
        return isLargestInPath(path, val) ? 1 : 0

    const l = left ? dfs(left, [...path, val]) : 0
    const r = right ? dfs(right, [...path, val]) : 0

    return (isLargestInPath(path, val) ? 1 : 0) + l + r
}

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
const goodNodes = root => {
    return dfs(root)
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

console.assert(goodNodes(arrayToBinaryTree([3,1,4,3,null,1,5])) === 4)
console.assert(goodNodes(arrayToBinaryTree([3,3,null,4,2])) === 3)
console.assert(goodNodes(arrayToBinaryTree([1])) === 1)
