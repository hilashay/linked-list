const { LinkedList } = require("./main");

var removeElements = function (head, val) {
  //enpty list
  if (!head) return head;

  while (head.val === val) {
    head = head.next;
    if (head === null) return head;
  }

  let current = head;
  let next = current.next;

  while (next !== null) {
    if (next.val === val) {
      //remove node(next)
      next = next.next;
      current.next = next;
    } else {
      //take step up current and next
      next = next.next;
      current = current.next;
    }
  }
  return head;
};

l3 = LinkedList.fromArray([1]);
x = removeElements(l3.head, 1);
console.log("x ", x?.toString1());
