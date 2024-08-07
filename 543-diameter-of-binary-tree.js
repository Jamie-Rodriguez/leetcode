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


const diameterOfBinaryTree = root => {
    let maxDistance = 0

    const dfs = node => {
        if (!node)
            return 0

        const { left, right } = node

        const leftDistance = dfs(left)
        const rightDistance = dfs(right)

        maxDistance = Math.max(leftDistance + rightDistance,  maxDistance)

        return 1 + Math.max(leftDistance, rightDistance)
    }

    dfs(root)

    return maxDistance
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

console.assert(diameterOfBinaryTree(arrayToBinaryTree([1,2,3,4,5])) === 3)
console.assert(diameterOfBinaryTree(arrayToBinaryTree([1,2])) === 1)
