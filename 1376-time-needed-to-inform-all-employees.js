/*
  1376. Time Needed to Inform All Employees
  Medium

  A company has n employees with a unique ID for each employee from 0 to n - 1. The head of the company is the one with headID.

  Each employee has one direct manager given in the manager array where manager[i] is the direct manager of the i-th employee, manager[headID] = -1. Also, it is guaranteed that the subordination relationships have a tree structure.

  The head of the company wants to inform all the company employees of an urgent piece of news. He will inform his direct subordinates, and they will inform their subordinates, and so on until all employees know about the urgent news.

  The i-th employee needs informTime[i] minutes to inform all of his direct subordinates (i.e., After informTime[i] minutes, all his direct subordinates can start spreading the news).

  Return the number of minutes needed to inform all the employees about the urgent news.

  Example 1:
      Input: n = 1, headID = 0, manager = [-1], informTime = [0]
      Output: 0
      Explanation: The head of the company is the only employee in the company.

  Example 2:
      Input: n = 6, headID = 2, manager = [2,2,-1,2,2,2], informTime = [0,0,1,0,0,0]
      Output: 1
      Explanation: The head of the company with id = 2 is the direct manager of all the employees in the company and needs 1 minute to inform them all.
          The tree structure of the employees in the company is shown.

  Constraints:
      1 <= n <= 10^5
      0 <= headID < n
      manager.length == n
      0 <= manager[i] < n
      manager[headID] == -1
      informTime.length == n
      0 <= informTime[i] <= 1000
      informTime[i] == 0 if employee i has no subordinates.
      It is guaranteed that all the employees can be informed.
*/


// Time limit exceeded
const numOfMinutesDfsNaive = (n, headID, manager, informTime) => {
    const dfs = employee => {
        if (informTime[employee] === 0)
            return informTime[employee] // == 0

        let concurrentTimes = []

        for (let subordinate of manager.reduce(
            (ss, s, i) => s === employee ? [...ss, i] : ss, [])) {
            concurrentTimes.push(dfs(subordinate))
        }

        return informTime[employee] + Math.max(...concurrentTimes)
    }

    return dfs(headID)
}

// Use an adjacency list to store the subordinates of each manager.
// This way we don't have recalculate the subordinates every loop.
// This version passes
const numOfMinutesDfsAdjList = (n, headID, manager, informTime) => {
    // Adjacency list
    // manager -> [subordinates]
    const subordinates = new Map()
    for (let employee = 0; employee < manager.length; employee++)
        if (manager[employee] !== -1)
            subordinates.set(manager[employee],
                             subordinates.has(manager[employee])
                                ? [...subordinates.get(manager[employee]), employee]
                                : [employee])

    const dfs = employee => {
        if (informTime[employee] === 0)
            return informTime[employee] // == 0

        let maxTime = 0

        for (let subordinate of subordinates.get(employee))
            maxTime = Math.max(maxTime, dfs(subordinate))

        return informTime[employee] + maxTime
    }

    return dfs(headID)
}

const numOfMinutesBfs = (n, headID, manager, informTime) => {
    // Adjacency list
    // manager -> [subordinates]
    const subordinates = new Map()
    for (let employee = 0; employee < manager.length; employee++)
        if (manager[employee] !== -1)
            subordinates.set(manager[employee],
                             subordinates.has(manager[employee])
                                ? [...subordinates.get(manager[employee]), employee]
                                : [employee])

    const queue = [{ employee: headID, time: 0 }]

    let max = 0

    while (queue.length > 0) {
        const { employee, time: timeSoFar } = queue.pop()

        max = Math.max(max, timeSoFar + informTime[employee])

        for (const subordinate of subordinates.has(employee)
                                    ? subordinates.get(employee)
                                    : []) {
            // Don't add to queue if they don't have subordinates of their own
            if (subordinates.has(subordinate))
                queue.unshift({
                    employee: subordinate,
                    time: timeSoFar + informTime[employee]
                })
        }
    }

    return max
}


const numOfMinutes = (n, headID, manager, informTime) => {
    // return numOfMinutesBfs(n, headID, manager, informTime)
    return numOfMinutesDfsAdjList(n, headID, manager, informTime)
}


console.assert(numOfMinutes(1, 0, [-1], [0]) === 0)
console.assert(numOfMinutes(6, 2, [2,2,-1,2,2,2], [0,0,1,0,0,0]) === 1)
console.assert(numOfMinutes(15, 0, [-1,0,0,1,1,2,2,3,3,4,4,5,5,6,6], [1,1,1,1,1,1,1,0,0,0,0,0,0,0,0]) === 3)
