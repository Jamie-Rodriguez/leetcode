/*
  226. Invert Binary Tree
  Easy

  Given the root of a binary tree, invert the tree, and return its root.

  Example 1:
      Input: root = [4,2,7,1,3,6,9]
      Output: [4,7,2,9,6,3,1]

  Example 2:
      Input: root = [2,1,3]
      Output: [2,3,1]

  Example 3:
      Input: root = []
      Output: []

  Constraints:
      The number of nodes in the tree is in the range [0, 100].
      -100 <= Node.val <= 100
*/


const invertTree = node => {
    if (!node)
        return node

    const l = invertTree(node.left)
    const r = invertTree(node.right)

    return { ...node, left: r, right: l }
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

// Mutate 'arr' to save space in recursive calls
const binaryTreeToArray = (node, i=0, arr=[]) => {
    if (!node)
        return arr

    const { val, left, right } = node

    arr[i] = val

    binaryTreeToArray(left, 2 * i + 1, arr)
    binaryTreeToArray(right, 2 * i + 2, arr)

    return arr
}

const arraysEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b)


console.assert(arraysEqual(binaryTreeToArray(invertTree(arrayToBinaryTree([4,2,7,1,3,6,9]))), [4,7,2,9,6,3,1]))
console.assert(arraysEqual(binaryTreeToArray(invertTree(arrayToBinaryTree([2,1,3]))), [2,3,1]))
console.assert(arraysEqual(binaryTreeToArray(invertTree(arrayToBinaryTree([]))), []))
