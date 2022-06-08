/*
  310. Minimum Height Trees
  Medium

  A tree is an undirected graph in which any two vertices are connected by exactly one path. In other words, any connected graph without simple cycles is a tree.

  Given a tree of n nodes labelled from 0 to n - 1, and an array of n - 1 edges where edges[i] = [ai, bi] indicates that there is an undirected edge between the two nodes ai and bi in the tree, you can choose any node of the tree as the root. When you select a node x as the root, the result tree has height h. Among all possible rooted trees, those with minimum height (i.e. min(h))  are called minimum height trees (MHTs).

  Return a list of all MHTs' root labels. You can return the answer in any order.

  The height of a rooted tree is the number of edges on the longest downward path between the root and a leaf.

  Example 1:
      Input: n = 4, edges = [[1,0],[1,2],[1,3]]
            0                 2        3
            |                 |        |
            1        1        1        1
           / \      /|\      / \      / \
          2   3    0 2 3    0   3    0   2
      Output: [1]
      Explanation: As shown, the height of the tree is 1 when the root is the node with label 1 which is the only MHT.

  Example 2:
      Input: n = 6, edges = [[3,0],[3,1],[3,2],[3,4],[5,4]]
              3          4
            / /\ \      / \
           0 1  2 4    5   3
                  |      / | \
                  5     0  1  2
      Output: [3,4]

  Constraints:
      1 <= n <= 2 * 10^4
      edges.length == n - 1
      0 <= ai, bi < n
      ai != bi
      All the pairs (ai, bi) are distinct.
      The given input is guaranteed to be a tree and there will be no repeated edges.
*/


// The general idea of this algorithm is to start at the leaf nodes,
// and remove them, updating the graph, until there are <= 2 nodes remaining.
// Essentially we prune the leaves of the graph, starting from the outside
// and continuing inwards until <= 2 nodes remain.
const findMinHeightTrees = (n, edges) => {
    // This is a real test case - why??
    if (n === 1) {
        return [0]
    }

    // Note: fill() here creates references to the same initialised array!
    // So if you were to then use adjacencyList[start].push(dest) in the loop,
    // all the push() calls would be modifying the same array, which are
    // being referenced by adjacencyList.
    // This is okay though as we create new arrays
    // when using the spread operator in the loop.
    const adjacencyList = new Array(n).fill([])
    for (const [start, dest] of edges) {
        adjacencyList[start] = [ ...adjacencyList[start], dest ]
        adjacencyList[dest] = [ ...adjacencyList[dest], start ]
    }

    let leaves = []
    for (let node = 0; node < n; node++) {
        // By definition a leaf node will have degree = 1
        if (adjacencyList[node].length === 1) {
            leaves.push(node)
        }
    }

    let remainingNodes = n
    // There can't be more than two minimum height trees
    while (remainingNodes > 2) {
        remainingNodes -= leaves.length
        let newLeaves = []

        while (leaves.length > 0) {
            const leaf = leaves.pop()
            // Remove 'leaf' from the adjacency list
            const neighbour = adjacencyList[leaf].pop()

            // Remove references to 'leaf' in 'neighbour's adjacency list
            // (Have to find the index that 'leaf' is at in order to remove)
            adjacencyList[neighbour].splice(
                adjacencyList[neighbour].indexOf(leaf), 1)

            // If the removal above makes 'neighbour' into a leaf, add it
            if (adjacencyList[neighbour].length === 1) {
                newLeaves = [ ...newLeaves, neighbour ]
            }
        }

        leaves = newLeaves
    }

    return leaves
}


const compareArrays = (a, b) => {
    const bResult = a.reduce((acc, curr, i) => curr === b[i] && acc, true)
    // We know that at most there can be two answers,
    // try the case of swapping the order of the elements
    const bReversed = b.reverse()
    const bReversedResult = a.reduce((acc, curr, i) => curr === bReversed[i] && acc, true)

    return bResult || bReversedResult
}

// Note results can be in any order and be considered correct
// Note 2: From the theory, there can only be at most two results
console.assert(compareArrays(findMinHeightTrees(4, [[1,0],[1,2],[1,3]]), [1]))
console.assert(compareArrays(findMinHeightTrees(6, [[3,0],[3,1],[3,2],[3,4],[5,4]]), [3, 4]))
// This is a real test case - why??
console.assert(compareArrays(findMinHeightTrees(1, []), [0]))
