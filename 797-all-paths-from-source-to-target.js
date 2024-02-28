/*
  797. All Paths From Source to Target
  Medium

  Given a directed acyclic graph (DAG) of n nodes labeled from 0 to n - 1, find all possible paths from node 0 to node n - 1 and return them in any order.

  The graph is given as follows: graph[i] is a list of all nodes you can visit from node i (i.e., there is a directed edge from node i to node graph[i][j]).

  Example 1:
      Input: graph = [[1,2],[3],[3],[]]
      Output: [[0,1,3],[0,2,3]]
      Explanation: There are two paths: 0 -> 1 -> 3 and 0 -> 2 -> 3.

  Example 2:
      Input: graph = [[4,3,1],[3,2,4],[3],[4],[]]
      Output: [[0,4],[0,3,4],[0,1,3,4],[0,1,2,3,4],[0,1,4]]

  Constraints:
      n == graph.length
      2 <= n <= 15
      0 <= graph[i][j] < n
      graph[i][j] != i (i.e., there will be no self-loops).
      All the elements of graph[i] are unique.
      The input graph is guaranteed to be a DAG.
*/


// Not completely functional i.e. not using backtracking to solve
// Method:
//     1. Record current path
//     2. Find a path to 'target'
//     3. Append found path to global array
const allPathsSourceTargetFirstAttempt = graph => {
    const target = graph.length - 1
    let allPaths = []

    const dfs = (node, currentPath) => {
        if (node === target) {
            allPaths = [...allPaths, currentPath]
            return allPaths
        }

        for (const n of graph[node]) {
            dfs(n, [...currentPath, n])
        }

        return allPaths
    }

    return dfs(0, [0])
}

// Method: Builds the paths up when returning back up from DFS search
// May be able to cache the results of previously-visited nodes
const allPathsSourceTarget = graph => {
    const target = graph.length - 1

    const dfs = current => {
        if (current === target)
            return [[target]]

        const paths = []

        for (const n of graph[current]) {
            const pathsFromNeighbor = dfs(n).map(path => [current, ...path])
            paths.push(...pathsFromNeighbor)
        }

        return paths
    }

    return dfs(0)
}


// ----------------------------------- Tests -----------------------------------

const setEquality = (a, b) =>
    a.size === b.size && [...a].every(
        value => b.has(value)
    )

const arraysContainSame = (a, b) => {
    if (a.length !== b.length)
        return false

    const aSet = new Set(a.map(x => JSON.stringify(x)))
    const bSet = new Set(b.map(x => JSON.stringify(x)))

    return setEquality(aSet, bSet)
}


console.assert(arraysContainSame(allPathsSourceTarget([[1,2],[3],[3],[]]),
                                 [[0,1,3],[0,2,3]]))
console.assert(arraysContainSame(allPathsSourceTarget([[4,3,1],[3,2,4],[3],[4],[]]),
                                 [[0,4],[0,3,4],[0,1,3,4],[0,1,2,3,4],[0,1,4]]))
