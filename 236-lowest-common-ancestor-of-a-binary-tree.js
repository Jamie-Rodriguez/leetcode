/*
  236. Lowest Common Ancestor of a Binary Tree
  Medium

  Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree.

  According to the definition of LCA on Wikipedia: “The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself).”

  Example 1:
           3
         /   \
        5     1
       / \   / \
      6  2  0  8
        / \
       7  4
      Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
      Output: 3
      Explanation: The LCA of nodes 5 and 1 is 3.

  Example 2:
      Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
      Output: 5
      Explanation: The LCA of nodes 5 and 4 is 5, since a node can be a descendant of itself according to the LCA definition.

  Example 3:
      Input: root = [1,2], p = 1, q = 2
      Output: 1

  Constraints:
      The number of nodes in the tree is in the range [2, 10^5].
      -10^9 <= Node.val <= 10^9
      All Node.val are unique.
      p != q
      p and q will exist in the tree.
*/


const lowestCommonAncestor = (root, p, q) => {
    let lca = undefined

    const search = node => {
        if (!node)
            return false

        const { val, left, right } = node

        // Note: On actual Leetcode environment we can just call:
        // const isCurrent = node === p || node === q
        // Because in the environment, p and q are (references to) nodes,
        // not values
        const isCurrent = node === p || node === q
        // const isCurrent = val === p || val === q
        const isInLeft = search(left)
        const isInRight = search(right)

        if (isCurrent + isInLeft + isInRight >= 2)
            lca = node

        return isCurrent || isInLeft || isInRight
    }

    search(root)

    return lca
}


const arrayToBinaryTree = arr => {
    if (!arr.length)
        return null

    const root = { val: arr[0], left: null, right: null }
    const queue = [root]

    for (let i = 1; i < arr.length; i += 2) {
        const parent = queue.shift()

        if (arr[i] !== null) {
            parent.left = { val: arr[i], left: null, right: null }
            queue.push(parent.left)
        }

        if (i + 1 < arr.length && arr[i + 1] !== null) {
            parent.right = { val: arr[i + 1], left: null, right: null }
            queue.push(parent.right)
        }
    }

    return root
}

// Since we are guaranteed:
//     > All Node.val are unique.
//     > p != q
//     > p and q will exist in the tree.
// Just need to search for the node
const get = (node, target) => {
    if (!node)
        return null

    const { val, left, right } = node

    if (target === val)
        return node

    for (const n of [left, right]) {
        const searchResult = get(n, target)

        if (searchResult)
            return searchResult
    }

    return null
}

let tree = arrayToBinaryTree([3,5,1,6,2,0,8,null,null,7,4])
let nodeA = get(tree, 5)
let nodeB = get(tree, 1)
console.assert(lowestCommonAncestor(tree, nodeA, nodeB).val === 3)

nodeB = get(tree, 4)
console.assert(lowestCommonAncestor(tree, nodeA, nodeB).val === 5)

tree = arrayToBinaryTree([1, 2])
nodeA = get(tree, 1)
nodeB = get(tree, 2)
console.assert(lowestCommonAncestor(tree, nodeA, nodeB).val === 1)
