/*
  20. Valid Parentheses
  Easy

  Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

  An input string is valid if:
      Open brackets must be closed by the same type of brackets.
      Open brackets must be closed in the correct order.

  Example 1:
      Input: s = "()"
      Output: true

  Example 2:
      Input: s = "()[]{}"
      Output: true

  Example 3:
      Input: s = "(]"
      Output: false

  Constraints:
      1 <= s.length <= 10^4
      s consists of parentheses only '()[]{}'.
*/

const isValid = s => {
    const stack = []
    const closing = {
        ')': '(',
        ']': '[',
        '}': '{'
    }
    const opening = {
        '(': ')',
        '[': ']',
        '{': '}'
    }

    for (const char of s) {
        if (opening[char]) {
            stack.push(char)
        } else if (closing[char]) {
            const bracket = stack.pop()

            // Current character, which is a closing bracket;
            // doesn't match the last-pushed opening bracket
            if (bracket !== closing[char]) {
                return false
            }
        }
        // Could have an else-statement here
        // to deal with characters that aren't in the known brackets set
    }

    // If there are any remaining items on the stack,
    // then we were not able to match all the closing brackets with their
    // corresponding opening bracket
    return (stack.length === 0)
}

console.assert(isValid('()') === true)
console.assert(isValid('()[]{}') === true)
console.assert(isValid('(]') === false)
