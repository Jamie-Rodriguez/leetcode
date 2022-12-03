/*
  1007. Minimum Domino Rotations For Equal Row
  Medium

  In a row of dominoes, tops[i] and bottoms[i] represent the top and bottom halves of the ith domino. (A domino is a tile with two numbers from 1 to 6 - one on each half of the tile.)

  We may rotate the ith domino, so that tops[i] and bottoms[i] swap values.

  Return the minimum number of rotations so that all the values in tops are the same, or all the values in bottoms are the same.

  If it cannot be done, return -1.

  Example 1:
      Input: tops = [2,1,2,4,2,2], bottoms = [5,2,6,2,3,2]
      Output: 2
      Explanation:
          tops:    [2,1,2,4,2,2]   [2,2,2,2,2,2]
          bottoms: [5,2,6,2,3,2]   [5,1,6,4,3,2]
      The first figure represents the dominoes as given by tops and bottoms: before we do any rotations.
      If we rotate the second and fourth dominoes, we can make every value in the top row equal to 2, as indicated by the second figure.

  Example 2:
      Input: tops = [3,5,1,2,3], bottoms = [3,6,3,3,4]
      Output: -1
      Explanation:
      In this case, it is not possible to rotate the dominoes to make one row of values equal.

  Constraints:
      2 <= tops.length <= 2 * 10^4
      bottoms.length == tops.length
      1 <= tops[i], bottoms[i] <= 6
*/


const minDominoRotations = (tops, bottoms) => {
    // Constraints: 1 <= tops[i], bottoms[i] <= 6
    // Using size of 7 to address the domino values as 1-indexed.
    // Makes it easier to reference e.g. symmetricalDominoesFreqs[tops[i]]
    // First element (index 0) won't be used, but is acceptable wastage to
    // reference as 1-indexed
    topsFreqs = new Array(7).fill(0)
    bottomsFreqs = new Array(7).fill(0)
    symmetricalDominoesFreqs = new Array(7).fill(0)

    // Constraints: bottoms.length == tops.length
    for (let i = 0; i < tops.length; i++) {
        if (tops[i] === bottoms[i])
            symmetricalDominoesFreqs[tops[i]]++

        topsFreqs[tops[i]]++
        bottomsFreqs[bottoms[i]]++
    }

    // If there is more than one symmetrical domino-type present, there can't
    // possibly be a solution
    const symmetricalDominoes = symmetricalDominoesFreqs.reduce(
        (symmetricalDominoes, freq, i) => freq > 0 ? symmetricalDominoes + i : symmetricalDominoes, [])

    if (symmetricalDominoes.length === 1) {
        // If there is one and only one type of symmetrical domino present, the
        // solution can only be how many flips for this type of domino. Don't
        // bother searching the rest.
        const domino = symmetricalDominoes[0] // Because the next line would be a mess otherwise
        const numSwaps = Math.min(topsFreqs[domino], bottomsFreqs[domino]) - symmetricalDominoesFreqs[domino]

        return topsFreqs[domino] + bottomsFreqs[domino] - symmetricalDominoesFreqs[domino] === tops.length ? numSwaps : -1
    } else if (symmetricalDominoes.length === 0) {
        let numSwaps = tops.length + 1

        // No symmetrical dominoes present, have to loop & check through all domino-types
        for (let i = 1; i < topsFreqs.length; i++) {
            const min = Math.min(topsFreqs[i], bottomsFreqs[i])

            if ((topsFreqs[i] + bottomsFreqs[i] === tops.length))
                numSwaps = Math.min(numSwaps, min)
        }

        return numSwaps <= tops.length ? numSwaps : -1
    }

    // There is more than one type of symmetrical domino. No possible solution.
    return -1
}


console.assert(minDominoRotations([2,1,2,4,2,2], [5,2,6,2,3,2]) === 2)
console.assert(minDominoRotations([3,5,1,2,3], [3,6,3,3,4]) === -1)
console.assert(minDominoRotations([1,2,3,4,6], [6,6,6,6,5]) === 1)
