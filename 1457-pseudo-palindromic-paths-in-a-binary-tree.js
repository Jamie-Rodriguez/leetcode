/*
  1457. Pseudo-Palindromic Paths in a Binary Tree
  Medium

  Given a binary tree where node values are digits from 1 to 9. A path in the binary tree is said to be pseudo-palindromic if at least one permutation of the node values in the path is a palindrome.

  Return the number of pseudo-palindromic paths going from the root node to leaf nodes.

  Example 1:
      Input: root = [2,3,1,3,1,null,1]
      Output: 2
      Explanation: The figure above represents the given binary tree. There are three paths going from the root node to leaf nodes: the red path [2,3,3], the green path [2,1,1], and the path [2,3,1]. Among these paths only red path and green path are pseudo-palindromic paths since the red path [2,3,3] can be rearranged in [3,2,3] (palindrome) and the green path [2,1,1] can be rearranged in [1,2,1] (palindrome).

  Example 2:
      Input: root = [2,1,1,1,3,null,null,null,null,null,1]
      Output: 1
      Explanation: The figure above represents the given binary tree. There are three paths going from the root node to leaf nodes: the green path [2,1,1], the path [2,1,3,1], and the path [2,1]. Among these paths only the green path is pseudo-palindromic since [2,1,1] can be rearranged in [1,2,1] (palindrome).

  Example 3:
      Input: root = [9]
      Output: 1

  Constraints:
      The number of nodes in the tree is in the range [1, 10^5].
      1 <= Node.val <= 9
*/


const pseudoPalindromicPaths = (root, pathLength = 1, digitParityBitset = 0) => {
    // Leaf node reached
    if (root?.left === null && root?.right === null) {
        // Toggle bit corresponding to node.val
        digitParityBitset ^= 1 << root?.val
        // Remove rightmost bit
        digitParityBitset &= digitParityBitset - 1

        return (pathLength % 2 === 0
                ? (digitParityBitset === 0 ? 1 : 0)
                : (digitParityBitset <= 1  ? 1 : 0))
    }

    const l = root?.left
              ? pseudoPalindromicPaths(root?.left,
                                       pathLength + 1,
                                       digitParityBitset ^ (1 << root?.val))
              : 0
    const r = root?.right
              ? pseudoPalindromicPaths(root?.right,
                                       pathLength + 1,
                                       digitParityBitset ^ (1 << root?.val))
              : 0

    return l + r
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

console.assert(pseudoPalindromicPaths(arrayToBinaryTree([2,3,1,3,1,null,1])) === 2)
console.assert(pseudoPalindromicPaths(arrayToBinaryTree([2,1,1,1,3,null,null,null,null,null,1])) === 1)
console.assert(pseudoPalindromicPaths(arrayToBinaryTree([9])) === 1)
