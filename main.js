class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
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
    this.tail = null;
    this.length = 0;
  }

  static fromArray(arr) {
    const list = new LinkedList();
    for (let index = 0; index < arr.length; index++) {
      list.push(arr[index]);
    }

    return list;
  }

  push(val) {
    const newVal = new Node(val);
    if (!this.head) {
      this.head = newVal;
      this.tail = newVal;
    } else {
      this.tail.next = newVal;
      this.tail = newVal;
    }
    this.length++;
    return this;
  }

  pushToCircular(val) {
    const newVal = new Node(val);
    if (!this.head) {
      this.head = newVal;
      this.tail = newVal;
    } else {
      this.tail.next = newVal;
      this.tail = newVal;
      newVal.next = this.head;
    }

    this.length++;
    return this;
  }

  pop() {
    console.log(this.tail);
    if (!this.head) return undefined;
    let target = this.head;
    let removedNum = this.tail;

    while (target.next !== this.tail) {
      target = target.next;
    }
    this.tail = target;
    this.tail.next = null;
    this.length--;
    return removedNum;
  }

  shift() {
    if (!this.head) return undefined;
    let current = this.head;
    this.head = current.next;
    this.length--;
    return current;
  }

  unshift(val) {
    const newNode = new Node(val);
    if (!this.head) {
      this.head = newVal;
      this.tail = newVal;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length++;
    return this;
  }
  get(index) {
    if (index % 1 !== 0) throw Error("Index must be an integer");
    if (index < 0 || index >= this.length) throw Error(`Index must be between 0 to ${this.length}`);
    let countedNodes = 0;
    let nodeFound = this.head;
    while (countedNodes !== index) {
      nodeFound = nodeFound.next;
      countedNodes++;
    }
    return nodeFound;
  }
  set(index, newValue) {
    let nodeFounded = this.get(index);
    nodeFounded.val = newValue;
    return nodeFounded ? true : false;
  }

  insert(index, newValue) {
    // index = 2("shay")
    if (index < 0 || index > this.length) return false;
    if (index === this.length) return !!this.push(newValue);
    if (index === 0) return !!this.unshift(newValue);
    const newNode = new Node(newValue);
    const prevNode = this.get(index - 1); //idan
    const temp = prevNode.next; // shay
    prevNode.next = newNode; //idan.next = "hello"
    newNode.next = temp;
    this.length++;
    return true;
  }

  remove(index) {
    // index = 2("shay")
    if (index < 0 || index >= this.length) return undefined;
    if (index === this.length - 1) return this.pop();
    if (index === 0) return this.shift();
    const prevNode = this.get(index - 1); // idan
    const nodeToDelete = prevNode.next; // shay
    const newNext = nodeToDelete.next;
    prevNode.next = newNext;
    this.length--;
    return nodeToDelete;
  }

  reverse() {
    let node = this.head;
    this.head = this.tail;
    this.tail = node;
    let prev = null;
    let next;
    for (let i = 0; i < this.length; i++) {
      next = node.next;
      node.next = prev;
      prev = node;
      node = next;
    }
    return this;
  }

  print() {
    console.log(toString(str));
  }

  toString() {
    let str = "";
    let current = this.head;
    while (current) {
      str += `${current.val} -> `;
      current = current.next;
    }

    return str;
  }
}

const testMethodWithArray = (method, listElementsArray, expectedResult) => {
  const list = LinkedList.fromArray(listElementsArray);
  testMethod(method, list, expectedResult);
};

const testMethod = (method, list, expectedResult) => {
  const result = method(list);
  console.log("result", result.toString());
  console.log("test passed", result.toString() === expectedResult);
};

const testMethodWithArrayWithHead = (method, listElementsArray, expectedResult) => {
  const list = LinkedList.fromArray(listElementsArray);
  testMethodWithHead(method, list, expectedResult);
};

const testMethodWithHead = (method, list, expectedResult) => {
  const result = method(list.head);
  console.log("result", result.toString1());
  console.log("test passed", result.toString1() === expectedResult);
};

const list = new LinkedList();

list.push("1");
list.push("1");
list.push("2");
list.push("3");
list.push("1");
list.push("5");

const makingLoopList = (index) => {
  const loopList = new LinkedList();
  let element = 1;
  for (let i = 0; i < 10; i++) {
    loopList.push(element);
    element++;
  }
  let loopToIndex = loopList.get(index);
  loopList.tail.next = loopToIndex;

  return loopList;
};

const loopList = makingLoopList(2);
// console.log("loopList", loopList);

// First solution - j & i
// const isLoopList = (list) => {
//   let i = list.head;
//   let j = list.head;
//   if (list.tail.next === null) return false;

//   while (j.next !== null) {
//     if (i === j) {
//       return true;
//     }
//     i = list.head.next;
//     i = i.next;
//   }
// };

// const foundLoop = isLoopList(loopList);
// console.log("foundLoop", foundLoop);

// Second solution - array
// const isLoopList = (list) => {
//   let nodes = [];
//   let current = list.head;
//   if (list.tail.next === null) return false;
//   while (current.next !== null) {
//     if (nodes.find((node) => node === current)) {
//       return true;
//     } else {
//       nodes.push(current);
//     }
//     current = current.next;
//   }
// };

//Third solution - set
// const isLoopList = (list) => {
//   let nodes = new Set();
//   let current = list.head;
//   if (list.tail.next === null) return false;

//   while (current.next !== null) {
//     if (nodes.has(current)) {
//       return true;
//     }
//     nodes.add(current);
//     current = current.next;
//   }
// };

// const foundLoop = isLoopList(loopList);
// console.log("foundLoop", foundLoop);

// 1 -> 1 -> 1 -> 2 -> 2 -> 3 -> 4
const removeDuplicatesFromSorted = (list) => {
  if (!list.head) throw Error("list is empty");
  let current = list.head;

  while (current.next !== null) {
    if (current.val === current.next.val) {
      current.next = current.next.next;
    } else {
      current = current.next;
    }
  }
  return list;
};
// const removeDuplicatesFromSorted = (list) => {
//   let prev = list.head;

//   for (let i = 0; i < list.length; i++) {
//     if (!prev.next) return list;
//     if (prev.val === prev.next.val) {
//       list.remove(i);
//       i--;
//     }
//     prev = prev.next;
//   }
//   return list;
// };

var reverseList = function (head) {
  if (!head) throw Error("empty list");
  if (!head.next) return head;
  let prev = null;
  let current = head;
  let next = current.next;
  while (next !== null) {
    current.next = prev;
    prev = current;
    current = next;
    next = next.next;
  }
  current.next = prev;
  head = current;
  return head;
};

// testMethodWithArrayWithHead(reverseList, [1, 2, 3, 4, 5], "5 -> 4 -> 3 -> 2 -> 1 -> ");
// testMethod(removeDuplicatesFromSorted, [1, 1, 1, 2, 3, 3, 4], "1 -> 2 -> 3 -> 4 -> ");
// testMethod(removeDuplicatesFromSorted, [1, 1, 1, 2, 2, 2, 2, 3, 3, 4], "1 -> 2 -> 3 -> 4 -> ");
// testMethod(removeDuplicatesFromSorted, [1], "1 -> ");

var mergeTwoLists = function (list1, list2) {
  if (!list1) return list2;
  if (!list2) return list1;

  let current1 = list1;
  let current2 = list2;
  let newHead;

  if (current1.val < current2.val) {
    newHead = current1;
    current1 = current1.next;
  } else {
    newHead = current2;
    current2 = current2.next;
  }
  let newTemp = newHead;

  while (!!current1 && !!current2) {
    if (current1.val <= current2.val) {
      newTemp.next = current1;
      current1 = current1.next;
      newTemp = newTemp.next;
    } else {
      newTemp.next = current2;
      current2 = current2.next;
      newTemp = newTemp.next;
    }
  }

  if (!current1) {
    newTemp.next = current1;
  } else if (!current2) {
    newTemp.next = current2;
  }

  return newHead;
};

// var removeElements = function (head, val) {
//   //enpty list
//   if (!head) return head;

//   let current = head;
//   let next = current.next;

//   while (current.next !== null) {
//     //head === val
//     if (current.val === val) {
//       current = current.next;
//       head = current;
//       next = current.next;
//       //chack if current exist after we remove the first head []
//       //chack if the next item === val and its the only element in the list [1]
//       if (current === null || (current.val === val && current.next === null)) {
//         head = null;
//         return head;
//       }
//       //if there's only one element in the list !== val [2]
//       if (current.val !== val && current.next === null) {
//         head = current;
//         return head;
//       }
//     }
//     //if head === val make the head one more step
//     if (current.val === val) {
//       head = current.next;
//     }

//     if (next.val === val) {
//       next = next.next;
//       current.next = next;
//     } else {
//       current = current.next;
//       next = next.next;
//     }
//   }
//   //check if the last element === val
//   if (current.val === val && current.next === null) {
//     head = null;
//   }
//   return head;
// };

var hasCycle = function (head) {
  let current = head;
  let nodes = new Set();
  if (!head) return false;

  while (current.next !== null) {
    if (nodes.has(current)) {
      return true;
    } else {
      nodes.add(current);
      current = current.next;
    }
  }
  return false;
};

var hasCycle2 = function (head) {
  let current = head;
  let nodes = [];
  if (!head) return false;

  while (current.next !== null) {
    let exist = nodes.find((node) => node === current);
    if (exist === current) {
      return true;
    } else {
      nodes.push(current);
      current = current.next;
    }
  }
  return false;
};

// x = hasCycle2(loopList.head);
// console.log(list.toString());
// console.log("x ", x);
// l1 = LinkedList.fromArray([1, 1, 2, 8]);
// l2 = LinkedList.fromArray([1, 4, 5]);
// x = mergeTwoLists(l1.head, l2.head);
// console.log("x ", x.toString1());

const findLength = (head) => {
  let length = 0;
  let current = head;
  while (current.next !== null) {
    current = current.next;
    length++;
  }
  length++;

  return length;
};
// Finding middle element in a linked list//
const findMiddle = (list) => {
  if (list.length === 0) throw Error("No elements in the list");
  let index = Math.floor(list.length / 2);
  let counter = 0;
  let middleElement = list.head;
  while (counter !== index) {
    middleElement = middleElement.next;
    counter++;
  }
  return middleElement;
};
// const elementFounded = findMiddle(list);
// console.log("elementFounded", elementFounded);

// Write a function that counts the number of times a given int occurs in a Linked List//
const countKeys = (list, number) => {
  let current = list.head;
  let counter = 0;

  for (let i = 0; i < list.length; i++) {
    if (parseInt(current.val) === number) {
      counter++;
    }
    current = current.next;
  }

  return counter;
};

// const numberOfElements = countKeys(list, 1);
// console.log("numberOfElements", numberOfElements);

// Check if a linked list is Circular Linked List//
const isCircular = (list) => {
  if (list.length === 0) return null;
  let current = list.head;
  for (let i = 0; i < list.length; i++) {
    if (current.next === null) {
      return false;
    } else {
      current = current.next;
    }
  }
  return true;
};
// const checkCircular = isCircular(list);
// console.log("checkCircular", checkCircular);

// Count nodes in Circular linked list//
const countNodesInCircular = (list) => {
  if (list.length === 0) return null;
  let counter = 1;
  let current = list.head;
  while (current.next !== list.head) {
    counter++;
    current = current.next;
  }
  return counter;
};

// testMethod(countNodesInCircular, loopList, "10");
// const numbersOfNodes = countNodesInCircular(list);
// console.log("numbersOfNodes", numbersOfNodes);

// Convert singly linked list into circular linked list//
const convertListToCircular = (list) => {
  if (list.tail.next !== null) {
    console.log("already circule");
    return null;
  }
  list.tail.next = list.head;
  return list;
};
// const convertedList = convertListToCircular(list);
// console.log("convertedList", convertedList);
// console.log("convertedList", list);

// Exchange first and last nodes in Circular Linked List
const switchHeadAndTail = (list) => {
  return list;
};
// const listSwitched = switchHeadAndTail(list);
// console.log("listSwitched", listSwitched);

// shift:
// const shiftValue = list.shift();
// console.log("shiftValue", shiftValue);
// console.log("list", list);

// unshift:
// list.unshift("to");
// const newList = list.unshift("hello");
// console.log("newList", newList);

// get:
// const element = list.get(3);
// console.log("element", element);

// set:
// const elementUpdated = list.set(3, "dnadan");
// console.log("elementUpdated", elementUpdated);
// console.log("list", list);

// insert:
// const elementUpdated = list.insert(2, "hello");
// console.log("elementUpdated", elementUpdated);

// remove:
// const elemenRemoved = list.remove(2);
// console.log("elemenRemoved", elemenRemoved);

//reverse:
// list.print();
// const reverseList = list.reverse();
// console.log("reverseList", reverseList);
// list.print();

// Exchange first and last nodes in Circular Linked List
// const switchFirstAndLast = (list) => {
//   let headValue = list.head.val;
//   list.head.val = list.tail.val;
//   list.tail.val = headValue;
//   list.tail.next = list.head;
//   return list;
// };

// const newList = switchFirstAndLast(list);
// console.log("newList", newList);

module.exports = {
  LinkedList,
  Node,
};

// module.exports = LinkedList;
