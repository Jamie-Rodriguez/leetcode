/*
  1335. Minimum Difficulty of a Job Schedule
  Hard

  You want to schedule a list of jobs in d days. Jobs are dependent (i.e To work on the ith job, you have to finish all the jobs j where 0 <= j < i).

  You have to finish at least one task every day. The difficulty of a job schedule is the sum of difficulties of each day of the d days. The difficulty of a day is the maximum difficulty of a job done on that day.

  You are given an integer array jobDifficulty and an integer d. The difficulty of the ith job is jobDifficulty[i].

  Return the minimum difficulty of a job schedule. If you cannot find a schedule for the jobs return -1.

  Example 1:
      Input: jobDifficulty = [6,5,4,3,2,1], d = 2
      Output: 7
      Explanation: First day you can finish the first 5 jobs, total difficulty = 6.
          Second day you can finish the last job, total difficulty = 1.
          The difficulty of the schedule = 6 + 1 = 7

  Example 2:
      Input: jobDifficulty = [9,9,9], d = 4
      Output: -1
      Explanation: If you finish a job per day you will still have a free day. you cannot find a schedule for the given jobs.

  Example 3:
      Input: jobDifficulty = [1,1,1], d = 3
      Output: 3
      Explanation: The schedule is one job per day. total difficulty will be 3.

  Constraints:
      1 <= jobDifficulty.length <= 300
      0 <= jobDifficulty[i] <= 1000
      1 <= d <= 10
*/


const minDifficultyTopDown = (jobDifficulties, totalNumDays) => {
    if (jobDifficulties.length < totalNumDays)
        return -1

    const cache = new Map()
    // Cantor pairing function
    // Feel free to swap out with any other hash function you like e.g.
    // const hash = (a, b) => `${a}, ${b}`
    const hash = (a, b) => (a + b) * (a + b + 1) / 2 + b

    const getMinDifficulty = (startJobIndex, day) => {
        if (cache.has(hash(startJobIndex, day)))
            return cache.get(hash(startJobIndex, day))

        if (day === totalNumDays)
            return Math.max(...jobDifficulties.slice(startJobIndex, jobDifficulties.length))

        // Always keep at least one job per day remaining
        const maxJobIndex = (jobDifficulties.length - 1) - (totalNumDays - day)

        let minDifficultyForDay = Infinity
        let hardestJobDone = -Infinity

        // Search every possible combination of jobs that we could complete
        // for each day, then return the combination that gives the minimum
        // difficulty score
        for (let i = startJobIndex; i <= maxJobIndex; i++) {
            hardestJobDone = Math.max(hardestJobDone, jobDifficulties[i])
            minDifficultyForDay = Math.min(minDifficultyForDay,
                                           hardestJobDone + getMinDifficulty(i + 1, day + 1))
        }

        cache.set(hash(startJobIndex, day), minDifficultyForDay)

        return minDifficultyForDay
    }

    return getMinDifficulty(0, 1)
}

const minDifficultyBottomUp = (jobDifficulties, totalNumDays) => {
    // Just because this variable is used a lot and has a really long name...
    const numJobs = jobDifficulties.length

    if (numJobs < totalNumDays)
        return -1

    const subproblems = Array(numJobs).fill(undefined)
                                      .map(() => Array(totalNumDays).fill(undefined))

    // Base cases
    for (let j = 0; j < numJobs; j++)
        subproblems[j][totalNumDays - 1] = Math.max(...jobDifficulties.slice(j, numJobs))

    for (let day = totalNumDays - 2; 0 <= day; day--) {
        // Always keep at least one job per day remaining
        const maxJobIndex = (numJobs) - (totalNumDays - day)

        for (let currentJobIndex = maxJobIndex; day <= currentJobIndex; currentJobIndex--) {
            let minDifficultyForDay = Infinity
            let hardestJobDone = -Infinity

            /*
              Find the best set of jobs to do today by looking at the
              possible stats of the *next* day.

              Note: We could start from *maxJobIndex* and iterate backwards,
              but the order doesn't matter as we guarantee that *all*
              of day "d + 1" has been calculated before calculating day "d".

              Note: For day 0, we only need to calculate for subproblems[0][0]
              i.e. we don't need to do this calculation for
              subproblems[i > 0][0].
              Shouldn't cost a significant amount of time to calculate anyway,
              so why not...
            */
            for (let job = currentJobIndex; job <= maxJobIndex; job++) {
                hardestJobDone = Math.max(hardestJobDone, jobDifficulties[job])
                minDifficultyForDay = Math.min(minDifficultyForDay,
                                               hardestJobDone + subproblems[job + 1][day + 1])
            }

            subproblems[currentJobIndex][day] = minDifficultyForDay
        }
    }

    return subproblems[0][0]
}


const minDifficulty = (jobDifficulty, d) => minDifficultyBottomUp(jobDifficulty, d)


console.assert(minDifficulty([6,5,4,3,2,1], 2) === 7)
console.assert(minDifficulty([9,9,9], 4) === -1)
console.assert(minDifficulty([1,1,1], 3) === 3)
