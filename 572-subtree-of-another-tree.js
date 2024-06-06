/*
  572. Subtree of Another Tree
  Easy

  Given the roots of two binary trees root and subRoot, return true if there is a subtree of root with the same structure and node values of subRoot and false otherwise.

  A subtree of a binary tree tree is a tree that consists of a node in tree and all of this node's descendants. The tree tree could also be considered as a subtree of itself.

  Example 1:
      Input: root = [3,4,5,1,2], subRoot = [4,1,2]
      Output: true

  Example 2:
      Input: root = [3,4,5,1,2,null,null,null,null,0], subRoot = [4,1,2]
      Output: false

  Constraints:
      The number of nodes in the root tree is in the range [1, 2000].
      The number of nodes in the subRoot tree is in the range [1, 1000].
      -10^4 <= root.val <= 10^4
      -10^4 <= subRoot.val <= 10^4
*/


const isSubtree = (root, subRoot) => {
    const same = (nodeA, nodeB) => {
        if (!nodeA || !nodeB)
            return !nodeA && !nodeB

        return nodeA.val === nodeB.val && same(nodeA.left, nodeB.left) && same(nodeA.right, nodeB.right)
    }

    const dfs = node => {
        if (!node)
            return false

        const isSubtree = same(node, subRoot)

        const { left, right } = node

        return isSubtree || dfs(left) || dfs(right)
    }

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

console.assert(isSubtree(arrayToBinaryTree([3,4,5,1,2]), arrayToBinaryTree([4,1,2])) === true)
console.assert(isSubtree(arrayToBinaryTree([3,4,5,1,2,null,null,null,null,0]), arrayToBinaryTree([4,1,2])) === false)
