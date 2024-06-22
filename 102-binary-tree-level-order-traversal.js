/*
  102. Binary Tree Level Order Traversal
  Medium

  Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).

  Example 1:
      Input: root = [3,9,20,null,null,15,7]
      Output: [[3],[9,20],[15,7]]

  Example 2:
      Input: root = [1]
      Output: [[1]]

  Example 3:
      Input: root = []
      Output: []

  Constraints:
      The number of nodes in the tree is in the range [0, 2000].
      -1000 <= Node.val <= 1000
*/


// Depth-first search
const levelOrderDFS = root => {
    const levels = []

    const recurse = (node, level) => {
        if (!node)
            return

        // Entered a new level
        if (levels.length === level)
            levels.push([])

        const { val, left, right } = node

        levels[level].push(val)

        if (left)
            recurse(left, level + 1)
        if (right)
            recurse(right, level + 1)
    }

    if (root)
        recurse(root, 0)

    return levels
}

// Breadth-first search
const levelOrderBFS = root => {
    const levels = []

    if (!root)
        return levels

    const queue = [root]
    let level = 0

    while (queue.length > 0) {
        levels.push([])

        const levelSize = queue.length

        // Process previous level's nodes
        for (let i = 0; i < levelSize; i++) {
            const { val, left, right } = queue.shift()

            levels[level].push(val)

            for (const child of [left, right])
                if (child)
                    queue.push(child)
        }

        level++
    }

    return levels
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

console.assert(JSON.stringify(levelOrderBFS(arrayToBinaryTree([3,9,20,null,null,15,7])))
               === JSON.stringify([[3],[9,20],[15,7]]))
console.assert(JSON.stringify(levelOrderBFS(arrayToBinaryTree([1])))
               === JSON.stringify([[1]]))
console.assert(JSON.stringify(levelOrderBFS(arrayToBinaryTree([])))
               === JSON.stringify([]))
