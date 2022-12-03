// Required for Node.js environment
const { performance } = require('perf_hooks')

// ------------------------------- Description --------------------------------
/*
  Imagine a river represented by a grid of size m * n.
  On the left and right sides are the riverbanks, with the current flowing from
  top to bottom.
  You need to cross the river by moving from a square in the leftmost column,
  to a square on the rightmost column.
  Unfortunately, the river is flowing too fast to safely swim across!
  A wizard sees your predicament and offers to help, he says that he can create
  a series of bridges across the river that will allow you to across.
  'Great!' you say as he waves his staff around and chants. *Poof!* a bridge
  appears on a random square in the middle of the river.
  The wizard looks confused. He scratches his head, muttering something about
  the wrong incantation or maybe his staff is broken - he doesn't seem sure.
  He tries casting the spell again - *poof!* another bridge appears on another
  random square in the river.
  The wizard is perplexed. After some more attempts you both come to the
  conclusion that the wizard's spell can only create a bridge on a random
  square in the river. But all is not lost! It's not completely useless, right?
  You can still use the wizard's random bridges to eventually form a path
  across the river.
  Given the random-bridge generating function, write an efficient algorithm to
  identify the earliest timestep that you are able to cross the river.
  You may only travel horizontally and vertically on the grid i.e. not
  diagonally.
*/


// Any time a coordinate is used, it is of the form: { row, column }, where
// both properties 'row' and 'column' are unsigned integers


// Returns a random, valid coordinate that has not been generated before
function* createBridgeIterator(rows, columns) {
    const totalNumElements = rows * columns
    const previouslyUsed = []

    while (previouslyUsed.length < totalNumElements) {
        const randomNum = Math.floor(Math.random() * totalNumElements)

        if (!previouslyUsed.includes(randomNum)) {
            previouslyUsed.push(randomNum)

            yield ({
                row: Math.floor(randomNum / columns),
                column: randomNum % columns
            })
        }
    }
}


// --------------------------- Problem starts here ----------------------------


// Gets neighbouring bridges that are <= timestep.
// O(1)
const neighbouringBridges = (river, timestep, { row, column }) => {
    const neighbours = []

    if (row > 0)
        neighbours.push({ row: row - 1, column })
    if (column > 0)
        neighbours.push({ row, column: column - 1 })
    if (row < (river.length - 1))
        neighbours.push({ row: row + 1, column })
    if (column < (river[row].length - 1))
        neighbours.push({ row, column: column + 1 })

    return neighbours.filter(({ row: r, column: c }) => river[r][c] <= timestep)
}

// This function is essentially behaving as a hash function to map a coordinate
// object to a string so that we can store it in a Set.
// Perhaps converting to a 1D coordinate (int) is a better hash function, i.e.
// coordinateToString({ row, column }, numColumns) -> 1D-coord (int)
const coordinateToString = ({ row, column }) => `${row},${column}`

// O(N)
const bfs = (river, timestep, start) => {
    const queue = []
    const visited = new Set()

    queue.unshift(start)
    visited.add(coordinateToString(start))

    while (queue.length > 0) {
        const current = queue.pop()
        // Goal: reached the right-hand side of the river
        if (current.column === (river[current.row].length - 1))
            return true

        for (const neighbour of neighbouringBridges(river, timestep, current))
            if (!visited.has(coordinateToString(neighbour))) {
                queue.unshift(neighbour)
                visited.add(coordinateToString(neighbour))
            }
    }

    return false
}

// O(N)
const dfs = (river, timestep, start) => {
    const stack = []
    const visited = new Set()

    stack.push(start)

    while (stack.length > 0) {
        const current = stack.pop()
        // Goal: reached the right-hand side of the river
        if (current.column === (river[current.row].length - 1))
            return true

        if (!visited.has(coordinateToString(current))) {
            visited.add(coordinateToString(current))

            for (const neighbour of neighbouringBridges(river, timestep, current))
                stack.push(neighbour)
        }
    }

    return false
}

const riverIsTraversible = (river, timestep, start) => dfs(river, timestep, start)

// Returns the coordinates for the left-hand side squares on the river that
// have a valid bridge placed on them.
const getStartingBridges = (river, timestep) => {
    const bridges = []

    for (let r = 0; r < river.length; r++)
        if (river[r][0] <= timestep)
            bridges.push({ row: r, column: 0 })

    return bridges
}


const main = (rows, columns) => {
    const randomlyCreatedBridges = createBridgeIterator(rows, columns)

    // Initialise an empty river
    const river = [...Array(rows)].map(row => new Array(columns))

    // Completely populate river with bridges.
    // The value for each item in the 2D-array is the timestep that the bridge
    // was created at.
    // O(N)
    let timestep = 0
    for (const coord of randomlyCreatedBridges) {
        const { row, column } = coord
        river[row][column] = timestep
        timestep++
    }

    // Use a binary search to find the earliest timestep that we can traverse
    // the river
    // O(log(N))
    let left = 0
    let right = rows * columns - 1
    while (left <= right) {
        const currentTimestep = left + Math.floor((right - left) / 2)

        const startingBridges = getStartingBridges(river, currentTimestep)

        // O(#rows)
        let isTraversible = false
        for (const bridge of startingBridges)
            // O(N)
            if (riverIsTraversible(river, currentTimestep, bridge)) {
                isTraversible = true
                break
            }

        if (isTraversible)
            // Go further back in time
            right = currentTimestep - 1
        else
            // Go forward in time
            left = currentTimestep + 1
    }

    return left
}


// ----------------------------- Measuring/Timing -----------------------------
const numLoops = 10000
const timings = new Array(numLoops)
const results = new Array(numLoops)

for (let i = 0; i < numLoops; i++) {
    const start = performance.now()
    const numTimeSteps = main(20, 10)
    const end = performance.now()

    timings[i] = end - start
    results[i] = numTimeSteps
}

const calcMean = nums => nums.reduce((sum, time) => sum + time, 0) / numLoops
const deviations = (nums, mean) => nums.map(n => (n - mean) * (n - mean))
const stdDev = nums => {
    const mean = calcMean(nums)
    const variance = calcMean(deviations(nums, mean))

    return Math.sqrt(variance)
}
const median = nums => {
    const mid = Math.floor(nums.length / 2)
    sorted = [...nums].sort((a, b) => a - b)

    return nums.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2
}

console.log(`Tested against ${numLoops} loops.`)
console.log('Number of timesteps to cross river:')
console.log('    average:', calcMean(results))
console.log('    standard deviation:', stdDev(results))
console.log('    median:', median(results))
console.log('Time taken (milliseconds):')
console.log('    average:', calcMean(timings))
console.log('    standard deviation:', stdDev(timings))
console.log('    median:', median(timings))

// Tested on 2017 MacBook Pro (3.1 GHz Dual-Core Intel Core i5)
// On a river of dimensions: rows = 20, columns = 10
//     Number of timesteps to cross river: average: 104.536, median: 105
// Using BFS to determine if river is traversable:
//     Time taken (milliseconds): average: 0.485, median: 0.397, std dev: 0.55
// Using DFS to determine if river is traversable:
//     Time taken (milliseconds): average: 0.394, median: 0.327, std dev: 0.298
