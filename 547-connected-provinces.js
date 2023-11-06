/*
  547. Number of Provinces
  Medium

  There are n cities. Some of them are connected, while some are not. If city a is connected directly with city b, and city b is connected directly with city c, then city a is connected indirectly with city c.

  A province is a group of directly or indirectly connected cities and no other cities outside of the group.

  You are given an n x n matrix isConnected where isConnected[i][j] = 1 if the ith city and the jth city are directly connected, and isConnected[i][j] = 0 otherwise.

  Return the total number of provinces.

  Example 1:
      Input: isConnected = [[1,1,0],[1,1,0],[0,0,1]]
      Output: 2

  Example 2:
      Input: isConnected = [[1,0,0],[0,1,0],[0,0,1]]
      Output: 3

  Constraints:
      1 <= n <= 200
      n == isConnected.length
      n == isConnected[i].length
      isConnected[i][j] is 1 or 0.
      isConnected[i][i] == 1
      isConnected[i][j] == isConnected[j][i]
*/


const findCircleNum = isConnected => {
    // Just because this is referenced a lot...
    const numNodes = isConnected.length

    const visited = Array(numNodes).fill(false)

    const dfs = node => {
        if (visited[node])
            return

        visited[node] = true

        for (let n = (node === 0) ? 1 : 0;
             n < numNodes;
             n += (n + 1 !== node) ? 1 : 2)
            if (isConnected[node][n] === 1 && !visited[n]) {
                dfs(n)
            }
    }


    let provinces = 0

    for (let n = 0; n < numNodes; n++)
        if (!visited[n]) {
            dfs(n)
            provinces++
        }

    return provinces
}


console.assert(findCircleNum([[1,1,0],
                              [1,1,0],
                              [0,0,1]]) === 2)
console.assert(findCircleNum([[1,0,0],
                              [0,1,0],
                              [0,0,1]]) === 3)
console.assert(findCircleNum([[1,0,0,1],
                              [0,1,1,0],
                              [0,1,1,1],
                              [1,0,1,1]]) === 1)
