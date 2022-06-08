/*
  4. Median of Two Sorted Arrays
  Hard

  Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.

  The overall run time complexity should be O(log (m+n)).

  Example 1:
      Input: nums1 = [1,3], nums2 = [2]
      Output: 2.00000
      Explanation: merged array = [1,2,3] and median is 2.

  Example 2:
      Input: nums1 = [1,2], nums2 = [3,4]
      Output: 2.50000
      Explanation: merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.

  Constraints:
      nums1.length == m
      nums2.length == n
      0 <= m <= 1000
      0 <= n <= 1000
      1 <= m + n <= 2000
      -10^6 <= nums1[i], nums2[i] <= 10^6
*/


/*
  Let's start with an example

  Example:
  Input: m = [2, 3, 5, 7, 11], n = [5, 8, 13, 21, 34]

  We need to create partitions of both arrays such that all of the elements in the left partition of each array are less than all of the elements in the right partitions.

  The partitions will look like
      [2, 3, 5, 7 | 11]
      [5          | 8, 13, 21, 34]

  As you can see, all the numbers on the left side are less than the numbers on the right side.

  How can we define this end-state? When the following conditions have been met:
      max(mLeft) <= min(nRight)
      max(nLeft) <= min(mRight)
      For an even number of total elements:
          length(mLeft) + length(nLeft) == length(mRight) + length(nRight)
      For an odd number of total elements:
          length(mLeft) + length(nLeft) - 1 == length(mRight) + length(nRight)

  For the case of an odd number of total elements, because we chose to use <=, we will see one more element in the left group. (If we used <, we would see the extra element in the right group)

  From here we can calculate the median. Let's first make some convenient definitions:
      maxLeft = max(max(mLeft), max(nLeft))
      minRight = min(min(mRight), min(nRight))
  The median for the even number of elements case is then:
      median = avg(maxLeft, minRight)
  For an odd number of total elements, as previously mentioned we know that the extra element is in the left group. i.e.
      median = maxLeft

  This algorithm needs to run in logarithmic time which implies that the search for the partitions needs to be done via a binary search. So when we are moving along the array, we will move half the distance between the current partition and the end of the array.

  We actually already know how many elements should be in each partition, from the total length of the arrays.
      totalLength = length(m) + length(n)
      leftSize = ceiling(totalLength / 2)
      rightSize = totalLength - leftSize
  Using this information, we can establish a relationship between length(mLeft) and length(nLeft) (and similarly for the right partitions)
  To be explicit:
      leftSize = length(mLeft) + length(nLeft)
  (likewise for the right partitions)

  This proves that the position of both left splits depend on each other. Therefore, we actually only need to search through one of the arrays, and can then just calculate the position of the split in the other array!

  Lastly, this means that we no longer need to check the total length of the left and right partitions in the end-state any more, as we will always be moving the split-point of the other array, ensuring that the total size is correct.

  Knowing this, we can be a bit more optimal and deliberately choose to do the searching in the smaller array. This gives a more accurate time complexity of O(log(min(m, n))).

  How do we know which direction in the array to move?
      if max(mLeft) < min(nRight)
          move the split towards the left in m
      else
          move the split towards the right in m

  From there, we move the split point along the smaller array (and calculating the corresponding split point in the other array), using a binary search pattern, until the end-state conditions have been met. Finally we just need to calculate the median as per one of the formulas previously discussed.

  Edge-cases:
      When either array is empty
      When the arrays form a contiguous collection e.g. [1, 2, 3], [5, 6, 7]
*/

const findMedianSortedArrays = (nums1, nums2) => {
    // Make m the smaller array to simplify code a bit
    const m = nums1.length <= nums2.length ? nums1 : nums2
    const n = nums1.length <= nums2.length ? nums2 : nums1

    // Note: In the explanation above, I used these variables to mean the entire left/right partitions
    // of the respective arrays, which helped make the explanation a bit more explicit.
    // However here it's simpler to make them point to the single elements on either side of the split.
    let mLeft = Infinity
    let mRight = -Infinity
    let nLeft = Infinity
    let nRight = -Infinity

    const totalLength = m.length + n.length
    const leftSize = Math.ceil(totalLength / 2)
    const isOdd = totalLength % 2 !== 0

    // The bounds of the binary search
    let bSearchLeft = 0
    let bSearchRight = m.length

    while (bSearchLeft <= bSearchRight) {
        // Example behaviour of splitPoint:
        // splitPoint = 2
        // Corresponds to splitting like so:
        //     [0, 1, | 2, 3]
        // Where
        //     mLeft = 1, mRight = 2
        const splitPointM = Math.ceil((bSearchRight - bSearchLeft)/2) + bSearchLeft
        mLeft = splitPointM <= 0 ? -Infinity : m[splitPointM - 1]
        mRight = splitPointM >= m.length ? Infinity : m[splitPointM]

        const splitPointN = leftSize - splitPointM
        nLeft = splitPointN <= 0 ? -Infinity : n[splitPointN - 1]
        nRight = splitPointN >= n.length ? Infinity : n[splitPointN]

        // Found the correct split
        if ((mLeft <= nRight) && (nLeft <= mRight)) {
            const maxLeft = mLeft >= nLeft ? mLeft : nLeft
            const minRight = mRight <= nRight ? mRight : nRight

            return isOdd ? maxLeft : ((maxLeft + minRight) / 2)
        }

        // Need to offset the next search bound by 1 to prevent infinite looping
        // in the case that all element in m are less than all elements in n
        // i.e. m = [1, 2, 3, 4], n = [5, 6, 7, 8]
        if (mLeft > nRight) {
            bSearchRight = splitPointM - 1
        } else {
            bSearchLeft = splitPointM + 1
        }
    }
}


console.assert(findMedianSortedArrays([1, 3], [2]) === 2)
console.assert(findMedianSortedArrays([1, 2], [3, 4]) === 2.5)
console.assert(findMedianSortedArrays([1, 2, 3, 4], [5, 6, 7, 8]) === 4.5)
