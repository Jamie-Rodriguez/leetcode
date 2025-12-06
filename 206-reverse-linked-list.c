/*
  206. Reverse Linked List
  ========================
  Easy

  Given the `head` of a singly linked list, reverse the list, and return _the reversed list_.

  Example 1:
  ----------
  Input: head = [1,2,3,4,5]
  Output: [5,4,3,2,1]

  Example 2:
  ----------
  Input: head = [1,2]
  Output: [2,1]

  Example 3:
  ----------
  Input: head = []
  Output: []

  Constraints:
  ------------
      - The number of nodes in the list is the range `[0, 5000]`.
      - `-5000 <= Node.val <= 5000`

  **Follow up:** A linked list can be reversed either iteratively or recursively. Could you implement both?
*/

/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     struct ListNode *next;
 * };
 */
struct ListNode* reverseList(struct ListNode* head) {
	struct ListNode* previous = NULL;
	struct ListNode* current = head;

	while (current) {
		struct ListNode* next = current->next;

		current->next = previous;

		previous = current;
		current = next;
	}

	return previous;
}

/*
  ┌────────┐   ┌────────┐   ┌────────┐
  │Node n-1│ ┌►│Node n  │ ┌►│Node n+1│
  │    next┼─┘ │    next┼─┘ │    next┼
  └────────┘   └────────┘   └────────┘
                   ┌──────────────────┐
  ┌────────┐   ┌───▼────┐   ┌────────┐│
  │Node n-1│ ┌►│Node n  │ ┌►│Node n+1││
  │    next┼─┘ │    next┼─┘ │    next┼┘
  └────────┘   └────────┘   └────────┘
                   ┌──────────────────┐
  ┌────────┐   ┌───▼────┐   ┌────────┐│
  │Node n-1│ ┌►│Node n  │   │Node n+1││
  │    next┼─┘ │    next┼─┐ │    next┼┘
  └────────┘   └────────┘ ▼ └────────┘
                         NULL
*/

/*
 ┌────────┐   ┌────────┐
 │Node n  │   │Node n+1│
 │    next┼──►│    next┼─►
 └────────┘   └────────┘
 ┌────────┐   ┌────────┐
 │Node n  │◄─┐│Node n+1│
 │    next┼┐ └┼────next│
 └────────┘└─►└────────┘
 ┌────────┐   ┌────────┐
 │Node n  │◄─┐│Node n+1│
 │    next┼┐ └┼────next│
 └────────┘▼  └────────┘
          NULL
*/

struct ListNode* reverseList(struct ListNode* current) {
	// Checking !current is only necessary because the first node passed
	// into reverseList() could just be a pointer to NULL i.e. and empty
	// list - in this case, the problem asks you to return NULL
	if (!current || !current->next) {
		return current;
	}

	const struct ListNode* head = reverseList(current->next);

	/*
	  At this point, everything after current has been reversed.
	  head points to the original tail (new head of reversed portion).

	    current      current->next ──────────────────► head
	  ┌────────┐     ┌────────┐    ┌────────┐     ┌────────┐
	  │ Node n │────►│Node n+1│◄───│Node n+2│◄─···│ Node m │
	  └────────┘     └────────┘    └────────┘     └────────┘
	*/
	current->next->next = current;
	/*
	    current      current->next
	   ┌────────┐    ┌────────┐    ┌────────┐     ┌────────┐
	   │ Node n │◄───│Node n+1│◄───│Node n+2│◄─···│ Node m │
	   └────────┘───►└────────┘    └────────┘     └────────┘
	*/
	current->next = NULL;
	/*

	    current      current->next
	   ┌────────┐    ┌────────┐    ┌────────┐     ┌────────┐
	   │ Node n │◄───│Node n+1│◄───│Node n+2│◄─···│ Node m │
	   └────────┘┐   └────────┘    └────────┘     └────────┘
	             ▼
 	            NULL
	*/

	return head; // Return node n+1 as new head of reversed list
}