/*
  230. Kth Smallest Element in a BST
  Medium

  Given the root of a binary search tree, and an integer k, return the kth smallest value (1-indexed) of all the values of the nodes in the tree.

  Example 1:
      Input: root = [3,1,4,null,2], k = 1
      Output: 1

  Example 2:
      Input: root = [5,3,6,2,4,null,null,1], k = 3
      Output: 3

  Constraints:
      The number of nodes in the tree is n.
      1 <= k <= n <= 10^4
      0 <= Node.val <= 10^4

  Follow up: If the BST is modified often (i.e., we can do insert and delete operations) and you need to find the kth smallest frequently, how would you optimize?
*/


// Algorithm: Do an iterative inorder traversal 'k' times
const kthSmallest = (root, k) => {
    const stack = []
    let current = root

    while (current || stack.length) {
        // Go to the leftmost node
        while (current) {
            stack.push(current)
            current = current.left
        }

        // Process the current node
        current = stack.pop()

        k--

        if (!k)
            return current.val

        // Move to the right child
        current = current.right
    }
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

console.assert(kthSmallest(arrayToBinaryTree([3,1,4,null,2]), 1) === 1)
console.assert(kthSmallest(arrayToBinaryTree([5,3,6,2,4,null,null,1]), 3) === 3)
