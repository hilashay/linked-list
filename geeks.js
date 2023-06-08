class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
    this.prev = null;
  }

  toString1() {
    let str = "";
    let current = this;
    while (current) {
      str += `${current.val} -> `;
      current = current.next;
    }

    return str;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  print() {
    let str = "";
    let current = this.head;
    while (current) {
      str += `${current.val} -> `;
      current = current.next;
    }

    return str;
  }
}

const listFromArray = (array) => {
  const list = new LinkedList();
  if (array.length === 0) throw Error("empty array");

  list.head = new Node(array[0]);
  let current = list.head;

  if (array.length === 1) return list;

  for (let i = 1; i < array.length; i++) {
    let newNode = new Node(array[i]);
    current.next = newNode;
    newNode.prev = current;
    current = current.next;
  }
  return list;
};

// Insert value in sorted way in a sorted doubly linked list
const insertValue = (head, value) => {
  const newNode = new Node(value);
  let current = head;
  if (!head) return newNode;
  if (head.next === null) {
    head.next = newNode;
    newNode.prev = head;
    return head;
  }
  while (current.next !== null) {
    if (newNode.val < current.val) {
      current.prev = newNode;
      head = newNode;
      head.next = current;
      return head;
    }
    if (current.val <= value && current.next.val >= value) {
      current.next.prev = newNode;
      newNode.next = current.next;
      newNode.prev = current;
      current.next = newNode;
      return head;
    } else {
      current = current.next;
    }
  }
  if (current.next === null) {
    current.next = newNode;
  }
  return head;
};

let list = listFromArray([1, 2, 3, 4, 5]);
let updatedList = insertValue(list.head, 0);
list.head = updatedList;
console.log(list.print());
console.log(updatedList);

// let newList = listFromArray([1, 2, 3, 4, 5]);
// console.log(newList.print());
// console.log(newList);
