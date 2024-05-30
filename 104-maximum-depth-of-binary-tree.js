/*
  104. Maximum Depth of Binary Tree
  Easy

  Given the root of a binary tree, return its maximum depth.

  A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

  Example 1:
      Input: root = [3,9,20,null,null,15,7]
      Output: 3

  Example 2:
      Input: root = [1,null,2]
      Output: 2

  Constraints:
      The number of nodes in the tree is in the range [0, 10^4].
      -100 <= Node.val <= 100
*/


const maxDepth = root => {
    if (!root)
        return 0

    const queue = [[root, 1]]

    let maxDepth = 1

    while (queue.length > 0) {
        const [current, level] = queue.shift()
        const { left, right } = current

        if (left)
            queue.push([left, level + 1])
        if (right)
            queue.push([right, level + 1])

        maxDepth = Math.max(level, maxDepth)
    }

    return maxDepth
}


const arrayToBinaryTree = (arr, i=0) => {
    if (i >= arr.length)
        return null

    return {
        val: arr[i],
        left: arrayToBinaryTree(arr, 2 * i + 1),
        right: arrayToBinaryTree(arr, 2 * i + 2)
    }
}

console.assert(maxDepth(arrayToBinaryTree([3,9,20,null,null,15,7])) === 3)
console.assert(maxDepth(arrayToBinaryTree([1,null,2])) === 2)
console.assert(maxDepth(arrayToBinaryTree([])) === 0)
