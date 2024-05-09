/*
  206. Reverse Linked List
  Easy

  Given the head of a singly linked list, reverse the list, and return the reversed list.

  Example 1:
      Input: head = [1,2,3,4,5]
      Output: [5,4,3,2,1]

  Example 2:
      Input: head = [1,2]
      Output: [2,1]

  Example 3:
      Input: head = []
      Output: []

  Constraints:
      The number of nodes in the list is the range [0, 5000].
      -5000 <= Node.val <= 5000

  Follow up: A linked list can be reversed either iteratively or recursively. Could you implement both?
*/


const reverseListFirstTry = node => {
    if (!node?.next)
        return node

    // Got head
    const head = reverseList(node.next)
    // Set head's .next to current node
    node.next.next = node
    // Set current node's .next to null
    node.next = null

    return head
}

const reverseList = head => {
    const reverseListInternal = (old, reversed) => {
        if (!old)
            return reversed

        const { val, next } = old

        return reverseListInternal(next, { val, next: reversed })
    }

    return reverseListInternal(head, null)
}


const arrayToLinkedList = array => {
    if (!array?.length)
        return null

    const [head, ...rest] = array

    return { val: head, next: arrayToLinkedList(rest) }
}

const linkedListToArray = node => {
    if (!node)
        return []

    return [node.val, ...linkedListToArray(node.next)]
}

// It's easier and faster to compare arrays than linked lists
const arraysEqual = (a, b) => {
    if (a.length !== b.length)
        return false

    for (let i = 0; i < a.length; i++)
        if (a[i] !== b[i])
            return false

    return true
}


const testInputs = [
    [1,2,3,4,5],
    [1,2],
    []
]

testInputs.forEach(test => {
    const linkedList = arrayToLinkedList(test)
    const resultList = reverseList(linkedList)
    // It's easier and faster to compare arrays than linked lists
    const resultArray = linkedListToArray(resultList)

    console.assert(arraysEqual(
        resultArray,
        [...test].reverse()
    ))
})
