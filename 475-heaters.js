/*
  475. Heaters
  Medium

  Winter is coming! During the contest, your first job is to design a standard heater with a fixed warm radius to warm all the houses.

  Every house can be warmed, as long as the house is within the heater's warm radius range.

  Given the positions of houses and heaters on a horizontal line, return the minimum radius standard of heaters so that those heaters could cover all houses.

  Notice that all the heaters follow your radius standard, and the warm radius will the same.

  Example 1:
      Input: houses = [1,2,3], heaters = [2]
      Output: 1
      Explanation: The only heater was placed in the position 2, and if we use the radius 1 standard, then all the houses can be warmed.

  Example 2:
      Input: houses = [1,2,3,4], heaters = [1,4]
      Output: 1
      Explanation: The two heater was placed in the position 1 and 4. We need to use radius 1 standard, then all the houses can be warmed.

  Example 3:
      Input: houses = [1,5], heaters = [2]
      Output: 3

  Constraints:
      1 <= houses.length, heaters.length <= 3 * 10^4
      1 <= houses[i], heaters[i] <= 10^9
*/


// This is just a binary search to fit the house between the nearest respective heaters and calculating the distance to the nearest heater.
// log(heaters)
const distanceToClosestHeater = (house, heaters) => {
    let left = 0
    let right = heaters.length - 1

    while (left <= right) {
        const middle = left + Math.floor((right - left) / 2)

        if (heaters[middle] <= house && house <= heaters[middle + 1]) {
            return Math.min(house - heaters[middle], heaters[middle + 1] - house)
        } else if (heaters[middle] <= house) {
            left = middle + 1
        } else {
            right = middle - 1
        }
    }

    if (left === 0) {
        return heaters[0] - house
    }
    if (right === heaters.length - 1) {
        return house - heaters[heaters.length - 1]
    }
}


// Time Complexity:
// sorting = heaters * log(heaters)
// calculation of minimum distances + max element =
//     houses + houses * log(heaters) = O(houses * log(heaters))
// total = O(max(heaters * log(heaters), houses * log(heaters)))
const findRadius = (houses, heaters) => {
    const sortedHeaters = heaters.sort((a, b) => a - b)
    return Math.max(...houses.map(house => distanceToClosestHeater(house, sortedHeaters)))
}


console.assert(findRadius([1,2,3], [2]) === 1)
console.assert(findRadius([1,2,3,4], [1,4]) === 1)
console.assert(findRadius([1,5], [2]) === 3)
console.assert(findRadius([282475249,622650073,984943658,144108930,470211272,101027544,457850878,458777923], [823564440,115438165,784484492,74243042,114807987,137522503,441282327,16531729,823378840,143542612]) === 161834419)

