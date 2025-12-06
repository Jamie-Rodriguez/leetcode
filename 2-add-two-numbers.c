/*
  2. Add Two Numbers
  ==================
  Medium

  You are given two **non-empty** linked lists representing two non-negative integers. The digits are stored in **reverse order**, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

  You may assume the two numbers do not contain any leading zero, except the number 0 itself.

  Example 1:
  ----------
      Input: l1 = [2,4,3], l2 = [5,6,4]
      Output: [7,0,8]
      Explanation: 342 + 465 = 807.

  Example 2:
  ----------
      Input: l1 = [0], l2 = [0]
      Output: [0]

  Example 3:
  ----------
      Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
      Output: [8,9,9,9,0,0,0,1]

  Constraints:
  ------------
      - The number of nodes in each linked list is in the range `[1, 100]`.
      - `0 <= Node.val <= 9`
      - It is guaranteed that the list represents a number that does not have leading zeros.
*/

/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     struct ListNode *next;
 * };
 */
struct ListNode* addTwoNumbers(struct ListNode* l1, struct ListNode* l2) {
	// Stack-allocate this temporary placeholder node
	struct ListNode placeholder = {0, NULL};

	const struct ListNode* head = &placeholder;

	struct ListNode* current = head;
	unsigned int carry = 0;

	while (l1 || l2 || carry) {
		unsigned int sum = (l1 ? l1->val : 0) + (l2 ? l2->val : 0);
		sum += carry;

		struct ListNode* node = malloc(sizeof(struct ListNode));
		*node = (struct ListNode) {
			.val = sum >= 10 ? sum - 10 : sum,
			.next = NULL
		};

		current->next = node;

		// Because 0 <= Node.val <= 9, carry can only be 0 or 1
		carry = sum >= 10 ? 1 : 0;
		current = current->next;
		l1 = l1 ? l1->next : NULL;
		l2 = l2 ? l2->next : NULL;
	}

	// We can either complicate the loop to handle the first iteration
	// differently, or correct the extra node at the start after the loop
	const struct ListNode* result = head->next;
	return result;
}

/**
 * Uses an arena allocation strategy to avoid multiple malloc calls
 */
struct ListNode* addTwoNumbers(struct ListNode* l1, struct ListNode* l2) {
	// Stack-allocate this temporary placeholder node
	struct ListNode placeholder = {0, NULL};
	/**
	 * In the Leetcode environment sizeof(struct ListNode) = 16 bytes
	 * The problem constraints state that
	 * >The number of nodes in each linked list is in the range `[1, 100]`.
	 * So therefore it's fine to allocate a fixed-size array of 101 nodes,
	 * + 1 to handle possible carry overflow.
	 * This amounts to 1616 bytes = 1.578125 KiB = 1.616 KB on the stack,
	 * which is perfectly acceptable.
	 * Note however, we are always heap-allocating this arena and the caller
	 * is responsible for freeing it after use.
	 * If the caller is only freeing the returned linked list via traversing
	 * the list and freeing nodes individually, this would cause a memory
	 * leak as not all of the arena memory would be freed.
	 */
	struct ListNode* arena = malloc(101 * sizeof(struct ListNode));
	size_t arenaIndex = 0;

	const struct ListNode* head = &placeholder;

	struct ListNode* current = head;
	unsigned int carry = 0;

	while (l1 || l2 || carry) {
		unsigned int sum = (l1 ? l1->val : 0) + (l2 ? l2->val : 0);
		sum += carry;

		struct ListNode* node = &arena[arenaIndex];
		*node = (struct ListNode) {
			.val = sum >= 10 ? sum - 10 : sum,
			.next = NULL
		};
		arenaIndex++;

		current->next = node;

		// Because 0 <= Node.val <= 9, carry can only be 0 or 1
		carry = sum >= 10 ? 1 : 0;
		current = current->next;
		l1 = l1 ? l1->next : NULL;
		l2 = l2 ? l2->next : NULL;
	}

	// We can either complicate the loop to handle the first iteration
	// differently, or correct the extra node at the start after the loop
	const struct ListNode* result = head->next;
	return result;
}