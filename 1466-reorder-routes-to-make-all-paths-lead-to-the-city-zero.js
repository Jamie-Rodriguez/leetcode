/*
  1466. Reorder Routes to Make All Paths Lead to the City Zero
  Medium

  There are n cities numbered from 0 to n - 1 and n - 1 roads such that there is only one way to travel between two different cities (this network form a tree). Last year, The ministry of transport decided to orient the roads in one direction because they are too narrow.

  Roads are represented by connections where connections[i] = [a_i, b_i] represents a road from city a_i to city b_i.

  This year, there will be a big event in the capital (city 0), and many people want to travel to this city.

  Your task consists of reorienting some roads such that each city can visit the city 0. Return the minimum number of edges changed.

  It's guaranteed that each city can reach city 0 after reorder.

  Example 1:
      Input: n = 6, connections = [[0,1],[1,3],[2,3],[4,0],[4,5]]
      Output: 3
      Explanation: Change the direction of edges show in red such that each node can reach the node 0 (capital).

  Example 2:
      Input: n = 5, connections = [[1,0],[1,2],[3,2],[3,4]]
      Output: 2
      Explanation: Change the direction of edges show in red such that each node can reach the node 0 (capital).

  Example 3:
      Input: n = 3, connections = [[1,0],[2,0]]
      Output: 0

  Constraints:
      2 <= n <= 5 * 10^4
      connections.length == n - 1
      connections[i].length == 2
      0 <= a_i, b_i <= n - 1
      a_i != b_i
*/

// First attempt - this works, but it a bit ugly with the Map of Maps
const minReorderFirstTry = (n, connections) => {
    const FORWARD = true
    const BACKWARD = false

    // This is like a pseudo-undirected graph
    const cities = new Map()
    connections.forEach(
        ([src, dest]) => {
            cities.set(src, cities.has(src)
                ? cities.get(src).set(dest, FORWARD)
                : new Map([[dest, FORWARD]]))

            cities.set(dest, cities.has(dest)
                ? cities.get(dest).set(src, BACKWARD)
                : new Map([[src, BACKWARD]]))
        }
    )

    const visited = new Set()

    const dfs = (city, visited, prev) => {
        // Encountered a leaf node
        if (cities.get(city).size === 1
            && [...cities.get(city).keys()][0] === prev)
            return 0

        visited.add(city)

        let swaps = 0

        for (const [nextCity, direction] of
            [
                ...cities.get(city)
                         .entries()
            ].filter(
                ([c, d]) => !visited.has(c)
            )
        ) {
            swaps += (direction === FORWARD ? 1 : 0)
                     + dfs(nextCity, visited, city)
        }

        return swaps
    }

    return dfs(0, visited)
}

// Since we are guaranteed that:
//     >There are n cities numbered from 0 to n - 1 and n - 1 roads such that
//     >there is only one way to travel between two different cities (this
//     >network form a tree).
// We can use arrays instead of maps for a performance and memory boost
const minReorder = (n, connections) => {
    const FORWARD = true
    const BACKWARD = false

    // This is like a pseudo-undirected graph
    const cities = new Array(n).fill(undefined).map(() => new Map())
    connections.forEach(
        ([src, dest]) => {
            cities[src].set(dest, FORWARD)
            cities[dest].set(src, BACKWARD)
        }
    )

    const dfs = (city, visited, prev) => {
        // Encountered a leaf node
        if (cities[city].size === 1 && [...cities[city].keys()][0] === prev)
            return 0

        visited[city] = true

        let swaps = 0

        for (const [nextCity, direction] of
            [...cities[city].entries()].filter(([c, d]) => !visited[c])) {
            swaps += (direction === FORWARD ? 1 : 0)
                     + dfs(nextCity, visited, city)
        }

        return swaps
    }

    const visited = new Array(n).fill(false)

    return dfs(0, visited)
}


console.assert(minReorder(6, [[0, 1], [1, 3], [2, 3], [4, 0], [4, 5]]) === 3)
console.assert(minReorder(5, [[1, 0], [1, 2], [3, 2], [3, 4]]) === 2)
console.assert(minReorder(3, [[1, 0], [2, 0]]) === 0)
