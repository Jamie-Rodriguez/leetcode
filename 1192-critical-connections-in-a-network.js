/*
  1192. Critical Connections in a Network
  Hard

  There are n servers numbered from 0 to n - 1 connected by undirected server-to-server connections forming a network where connections[i] = [a_i, b_i] represents a connection between servers a_i and b_i. Any server can reach other servers directly or indirectly through the network.

  A critical connection is a connection that, if removed, will make some servers unable to reach some other server.

  Return all critical connections in the network in any order.

  Example 1:
      Input: n = 4, connections = [[0,1],[1,2],[2,0],[1,3]]
      Output: [[1,3]]
      Explanation: [[3,1]] is also accepted.

  Example 2:
      Input: n = 2, connections = [[0,1]]
      Output: [[0,1]]

  Constraints:
      2 <= n <= 10^5
      n - 1 <= connections.length <= 10^5
      0 <= a_i, b_i <= n - 1
      a_i != b_i
      There are no repeated connections.
*/


const criticalConnections = (n, connections) => {
    // Cantor pairing function
    // Feel free to swap out with any other hash function you like e.g.
    // const hash = (a, b) => `${a}, ${b}`
    const hash = (a, b) => (a + b) * (a + b + 1) / 2 + b

    // Space: O(V + E)
    const graph = new Array(n).fill(undefined).map(() => [])
    // Space: O(V)
    const rank = new Array(n).fill(undefined)
    // Space: O(E)
    const conns = new Map()

    connections.forEach(([from, to]) => {
        graph[from].push(to)
        graph[to].push(from)

        conns.set(hash(Math.min(from, to), Math.max(from, to)),
                  [from, to])
    })

    // Summary: Expand out, marking each node with an incremented rank in a DFS
    // pattern. If we encounter a rank smaller than the current node's rank,
    // we've found a cycle. We remove the edge from the connections list. We
    // then travel back up the call stack, removing all edges that are part of
    // the cycle i.e. nodes in teh stack with a rank >= the smaller rank
    // just encountered.
    const dfs = (node=0, discoveryRank=1) => {
        console.log(node, discoveryRank)
        // Already visited and marked rank
        if (rank[node])
            return rank[node]

        // Haven't visited this node - mark it's rank
        rank[node] = discoveryRank

        // Begin marking the neighbours' ranks
        let minRank = discoveryRank + 1

        for (const neighbour of graph[node]) {
            // If this is the parent node, skip
            if (rank[neighbour] && rank[neighbour] === discoveryRank - 1)
                continue

            // Get the minimum rank from the neighbour
            const neighbourRank = dfs(neighbour, discoveryRank + 1)

            // If the neighbour's minimum rank is less than the current node's rank,
            // then this edge is part of a cycle -
            // remove it from the connections list
            if (neighbourRank <= discoveryRank)
                conns.delete(hash(Math.min(node, neighbour), Math.max(node, neighbour)))

            // If we encountered a rank lower than the current node's rank,
            // this means we've found a cycle. We've removed this immediate edge
            // but we need to also return this rank information in order to
            // prune back the other edges that are part of the cycle i.e. where
            // rank >= minRank
            minRank = Math.min(minRank, neighbourRank)
        }

        return minRank
    }

    dfs()

    return [...conns.values()]
}


// ---------------------------------- Testing ----------------------------------

const arrayToSet = arr => {
    const s = new Set()

    for (const a of arr)
        s.add(a)

    return s
}

const setsEqual = (a, b) => {
    if (a.size !== b.size)
        return false

    for (const item of a)
        if (!b.has(item))
            return false

    return true
}

const setExistsInArray = (s, arr) => {
    for (const a of arr)
        if (setsEqual(s, a))
            return true

    return false
}

const connectionsEqual = (a, b) => {
    const aSets = a.map(c => arrayToSet(c))
    const bSets = b.map(c => arrayToSet(c))

    if (aSets.length !== bSets.length)
        return false

    for (const s of aSets)
        if (!setExistsInArray(s, bSets))
            return false

    return true
}

console.assert(connectionsEqual(criticalConnections(4, [[0,1],[1,2],[2,0],[1,3]]), [[1,3]]))
console.assert(connectionsEqual(criticalConnections(2, [[0,1]]), [[0,1]]))
console.assert(connectionsEqual(criticalConnections(5, [[1,0],[2,0],[3,2],[4,2],[4,3],[3,0],[4,0]]), [[0,1]]))
