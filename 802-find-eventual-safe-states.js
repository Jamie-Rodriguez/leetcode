/*
  802. Find Eventual Safe States
  Medium

  There is a directed graph of n nodes with each node labeled from 0 to n - 1. The graph is represented by a 0-indexed 2D integer array graph where graph[i] is an integer array of nodes adjacent to node i, meaning there is an edge from node i to each node in graph[i].

  A node is a terminal node if there are no outgoing edges. A node is a safe node if every possible path starting from that node leads to a terminal node (or another safe node).

  Return an array containing all the safe nodes of the graph. The answer should be sorted in ascending order.

  Example 1:
      *Illustration of graph*
      Input: graph = [[1,2],[2,3],[5],[0],[5],[],[]]
      Output: [2,4,5,6]
      Explanation: The given graph is shown above.
          Nodes 5 and 6 are terminal nodes as there are no outgoing edges from either of them.
          Every path starting at nodes 2, 4, 5, and 6 all lead to either node 5 or 6.

  Example 2:
      Input: graph = [[1,2,3,4],[1,2],[3,4],[0,4],[]]
      Output: [4]
      Explanation:
          Only node 4 is a terminal node, and every path starting at node 4 leads to node 4.

  Constraints:
      n == graph.length
      1 <= n <= 10^4
      0 <= graph[i].length <= n
      0 <= graph[i][j] <= n - 1
      graph[i] is sorted in a strictly increasing order.
      The graph may contain self-loops.
      The number of edges in the graph will be in the range [1, 4 * 10^4].
*/


const eventualSafeNodes = graph => {
    const safe = new Map()

    const dfs = (node, safe) => {
        // Visited before?
        // Note: This case will only happen when returning back up the
        // (recursive) call stack
        if (safe.has(node))
            return safe.get(node)

        safe.set(node, false)

        // A node is *only* safe if *all* of it's neighbours are also safe
        // Note: for a leaf node, it's neighbours will be the empty list,
        // which is considered safe
        for (const neighbour of graph[node])
            if (!dfs(neighbour, safe))
                return false

        safe.set(node, true)

        return true
    }

    return graph.reduce(
        (safeNodes, adjacentNodes, node) => dfs(node, safe)
                                            ? [...safeNodes, node] : safeNodes,
        [])
}


const arraysContainSame = (a, b) => {
    const setA = new Set(a)
    const setB = new Set(b)

    return setA.size === setB.size && [...setA].every(a => setB.has(a))
}

console.assert(arraysContainSame(
    eventualSafeNodes([[1,2],[2,3],[5],[0],[5],[],[]]),
    [2,4,5,6]))
console.assert(arraysContainSame(
    eventualSafeNodes([[1,2,3,4],[1,2],[3,4],[0,4],[]]),
    [4]))
console.assert(arraysContainSame(
    eventualSafeNodes([[1,2],[3],[],[]]),
    [0,1,2,3]))
console.assert(arraysContainSame(
    eventualSafeNodes([[0,1],[],[]]),
    [1,2]))
