/*
  337. House Robber III
  Medium

  The thief has found himself a new place for his thievery again. There is only one entrance to this area, called root.

  Besides the root, each house has one and only one parent house. After a tour, the smart thief realized that all houses in this place form a binary tree. It will automatically contact the police if two directly-linked houses were broken into on the same night.

  Given the root of the binary tree, return the maximum amount of money the thief can rob without alerting the police.

  Example 1:
      Input: root = [3,2,3,null,3,null,1]
      Output: 7
      Explanation: Maximum amount of money the thief can rob = 3 + 3 + 1 = 7.

  Example 2:
      Input: root = [3,4,5,1,3,null,1]
      Output: 9
      Explanation: Maximum amount of money the thief can rob = 4 + 5 = 9.

  Constraints:
      The number of nodes in the tree is in the range [1, 10^4].
      0 <= Node.val <= 10^4
*/


const rob = root => {
    const dfs = node => {
        if (node === null)
            return { with: 0, without: 0 }

        const { val, left, right } = node

        const leftProfits = dfs(left)
        const rightProfits = dfs(right)

        const withCurrent = val + leftProfits.without + rightProfits.without
        const withoutCurrent = Math.max(...Object.values(leftProfits)) + Math.max(...Object.values(rightProfits))

        return { with: withCurrent, without: withoutCurrent }
    }

    return Math.max(...Object.values(dfs(root)))
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

console.assert(rob(arrayToBinaryTree([3,2,3,null,3,null,1])) === 7)
console.assert(rob(arrayToBinaryTree([3,4,5,1,3,null,1])) === 9)
console.assert(rob(arrayToBinaryTree([45,30,46,10,36,null,49,8,24,34,42,48,null,4,9,14,25,31,35,41,43,47,null,0,6,null,null,11,20,null,28,null,33,null,null,37,null,null,44,null,null,null,1,5,7,null,12,19,21,26,29,32,null,null,38,null,null,null,3,null,null,null,null,null,13,18,null,null,22,null,27,null,null,null,null,null,39,2,null,null,null,15,null,null,23,null,null,null,40,null,null,null,16,null,null,null,null,null,17])) === 679)
