// var mergeTwoLists = function(l1, l2) {
//     if (!l1 || !l2) return (l1 ? l1 : l2);
//     if (l1.val < l2.val) {
//         l1.next = mergeTwoLists(l1.next, l2);
//         return l1;
//     } else {
//         l2.next = mergeTwoLists(l1, l2.next);
//         return l2;
//     }
// };
// var mergeTwoLists = function(l1, l2) {
//     let l3 = new ListNode();
//     let curr = l3;
//     while(l1 != null && l2 != null) {
//       if(l1.val < l2.val) {
//         curr.next = l1
//         l1 = l1.next;
//       } else {
//         curr.next = l2
//         l2 = l2.next;
//       }
//       curr = curr.next;
//     }
//     curr.next = l1 || l2;
//     return l3.next
//   };

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function(l1, l2) {
    let resultList = new ListNode();
    result = resultList;
    if (l1 == null || l2 == null) return l1 ? l1 : l2;
    while (l1 != null && l2 != null) {
        if (l1.val < l2.val) {
            result.next = l1;
            l1 = l1.next;
        } else {
            result.next = l2;
            l2 = l2.next;
        }
        result = result.next;
    }
    result.next = l1 || l2;
    return resultList.next;
};