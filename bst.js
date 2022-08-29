function Node(value) {
  let node = {
    data: value,
    left: null,
    right: null,
  };
  return node;
}

function buildTree(array) {
  if (array.length < 1) {
    return null;
  }
  let mid = Math.floor((array.length - 1) * 0.5);
  let node = Node(array[mid]);
  node.left = buildTree(array.slice(0, mid));
  node.right = buildTree(array.slice(mid + 1));
  return node;
}

function Tree(array) {
  //sorting the array
  array.sort((a, b) => a - b);

  // removing the duplicates
  let noDuplicateSortedArray = [];
  array.forEach((element) => {
    if (!noDuplicateSortedArray.includes(element))
      noDuplicateSortedArray.push(element);
  });

  let root = buildTree(noDuplicateSortedArray);

  // insert an element in the tree
  function insert(value) {
    let currentNode = this.root;
    if (currentNode === null) {
      this.root = Node(value);
    }
    let previusNode;
    while (true) {
      if (value > currentNode.data) {
        if (currentNode.right === null) {
          currentNode.right = Node(value);
          break;
        }
        previusNode = currentNode;
        currentNode = previusNode.right;
      }
      if (value < currentNode.data) {
        if (currentNode.left === null) {
          currentNode.left = Node(value);
          break;
        }
        previusNode = currentNode;
        currentNode = previusNode.left;
      }
      if (value === currentNode.data) break;
    }
  }

  function remove(value, node = this.root, prevNode) {
    // check if tree is empty or we can't find the value
    if (node === null) {
      return;
    }

    //check for value being smaller or bigger than the node data
    if (value > node.data) {
      remove(value, node.right, node);
    } else if (value < node.data) {
      remove(value, node.left, node);
    }

    // we have found the value
    if (value === node.data) {
      // case for value being in the root of the tree
      if (node === this.root) {
        let n = childNumber(node);
        // one node in tree
        if (n === 0) {
          this.root = null;
        }
        if (n === 1) {
          if (this.root.right) {
            this.root = this.root.right;
          } else {
            this.root = this.root.left;
          }
        }
        if (n === 2) {
          try {
            node.data = node.right.left.data;
            remove(node.right.left.data, node.right.left, node.right);
          } catch (error) {
            node.data = node.right.data;
            remove(node.right.data, node.right, node);
          }
        }
      } else {
        // value is not the root
        let n = childNumber(node);
        // the value node is a leaf
        if (n === 0) {
          if (prevNode.data < value) {
            prevNode.right = null;
          }
          if (prevNode.data > value) {
            prevNode.left = null;
          }
        }

        // the value node hase one branch
        if (n === 1) {
          if (prevNode.data < value) {
            if (node.right) {
              prevNode.right = node.right;
            } else {
              prevNode.right = node.left;
            }
          }
          if (prevNode.data > value) {
            if (node.right) {
              prevNode.left = node.right;
            } else {
              prevNode.left = node.left;
            }
          }
        }

        // if value node hase two childs
        if (n === 2) {
          try {
            node.data = node.right.left.data;
            remove(node.right.left.data, node.right.left, node.right);
          } catch (error) {
            node.data = node.right.data;
            remove(node.right.data, node.right, node);
          }
        }
      }
    }
  }

  function childNumber(node) {
    let n = 0;
    if (node.right) {
      n++;
    }
    if (node.left) {
      n++;
    }
    return n;
  }
  // return the node with given value or null if it doesnt exist
  function find(value, node = this.root) {
    if (!node || value === node.data) {
      return node;
    }
    if (value > node) {
      find(value, node.right);
    }
    if (value < node) {
      find(value, node.left);
    }
  }
  // give ech nodes value as argument to the callback function in a breath-first algo and if
  // no function given it will return an array with all values
  function levelOrder(func) {
    let q = [this.root];

    if (func == undefined) {
      let returnArray = [];
      if (this.root === null) {
        return returnArray;
      }
      while (q.length > 0) {
        let node = q.shift();
        returnArray.push(node.data);
        if (node.left) {
          q.push(node.left);
        }
        if (node.right) {
          q.push(node.right);
        }
      }
      return returnArray;
    } else {
      if (this.root === null) {
        return;
      }
      while (q.length > 0) {
        let node = q.shift();
        func(node);
        if (node.left) {
          q.push(node.left);
        }
        if (node.right) {
          q.push(node.right);
        }
      }
    }
  }
  // give ech nodes value as argument to the callback function in a depth-first-inorder algo and if
  // no function given it will return an array with all values
  function inOrder(func, node = this.root, returnArray = []) {
    if (func === undefined) {
      if (node === null) {
        return returnArray;
      }
      inOrder(func, node.left, returnArray);
      returnArray.push(node.data);
      inOrder(func, node.right, returnArray);
      return returnArray;
    } else {
      if (node === null) {
        return null;
      }
      inOrder(func, node.left);
      func(node);
      inOrder(func, node.right);
    }
  }
  // give ech nodes value as argument to the callback function in a depth-first-preorder algo and if
  // no function given it will return an array with all values
  function preOrder(func, node = this.root, returnArray = []) {
    if (func === undefined) {
      if (node === null) {
        return returnArray;
      }
      returnArray.push(node.data);
      preOrder(func, node.left, returnArray);
      preOrder(func, node.right, returnArray);
      return returnArray;
    } else {
      if (node === null) {
        return null;
      }
      func(node);
      preOrder(func, node.left);
      preOrder(func, node.right);
    }
  }
  // give ech nodes value as argument to the callback function in a depth-first-postOrder algo and if
  // no function given it will return an array with all values
  function postOrder(func, node = this.root, returnArray = []) {
    if (func === undefined) {
      if (node === null) {
        return returnArray;
      }
      postOrder(func, node.left, returnArray);
      postOrder(func, node.right, returnArray);
      returnArray.push(node.data);
      return returnArray;
    } else {
      if (node === null) {
        return null;
      }
      postOrder(func, node.left);
      postOrder(func, node.right);
      func(node);
    }
  }

  // return height of a node :
  // Height is defined as the number of edges in longest path from a given node to a leaf node.
  function height(node) {
    if (node === null) {
      return -1;
    }
    let leftHeight = height(node.left) + 1;
    let rightHeight = height(node.right) + 1;
    return leftHeight > rightHeight ? leftHeight : rightHeight;
  }

  // return depth of a node :
  // Depth is defined as the number of edges in path from a given node to the tree’s root node.
  function depth(node, root = this.root) {
    if (root === null || node == null) {
      return NaN;
    }
    if (node.data === root.data) {
      return 0;
    }
    if (node.data > root.data) {
      return 1 + depth(node, root.right);
    }
    if (node.data < root.data) {
      return 1 + depth(node, root.left);
    }
  }

  // check if binary search tree is balanced
  function isBalanced() {
    let balanced = true;

    function changeBalanced() {
      if (balanced === true) {
        balanced = false;
      }
    }

    let leftHeight;
    let rightHeight;

    this.inOrder(function (node) {
      leftHeight = height(node.left);
      rightHeight = height(node.right);
      if (leftHeight - rightHeight >= -1 && leftHeight - rightHeight <= 1) {
        return;
      } else {
        changeBalanced();
      }
    });
    return balanced;
  }

  function reBalance() {
    let array = this.inOrder();
    this.root = buildTree(array);
  }

  return {
    root,
    insert,
    remove,
    find,
    levelOrder,
    inOrder,
    preOrder,
    postOrder,
    height,
    depth,
    isBalanced,
    reBalance,
  };
}

// for printing the tree in nice manner
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

function test() {
  let testArray = [];
  for (let i = 0; i < 20; i++) {
    testArray.push(Math.floor(Math.random() * 100));
  }
  let tree = Tree(testArray);
  prettyPrint(tree.root);
  console.log("is the tree above balanced?", tree.isBalanced());
  console.log("levelorder:", tree.levelOrder());
  console.log("preorder:", tree.preOrder());
  console.log("inorder:", tree.inOrder());
  console.log("postorder:", tree.postOrder());
  for (let i = 101; i <= 110; i++) {
    tree.insert(i);
  }
  prettyPrint(tree.root);
  console.log("is the tree above balanced?", tree.isBalanced());
  tree.reBalance();
  prettyPrint(tree.root);
  console.log(
    "is the tree above balanced(this is tree after reBalance method)?",
    tree.isBalanced()
  );
  console.log("levelorder:", tree.levelOrder());
  console.log("preorder:", tree.preOrder());
  console.log("inorder:", tree.inOrder());
  console.log("postorder:", tree.postOrder());
}
test();

// let a = Tree([1, 2, 3, 4, 5, 6, 17, 16, -12]);
// prettyPrint(a.root);
// console.log(a.isBalanced());
// a.insert(100);
// prettyPrint(a.root);
// console.log(a.isBalanced());
// a.insert(15);
// prettyPrint(a.root);
// console.log(a.isBalanced());
// a.insert(5.5);
// prettyPrint(a.root);
// console.log(a.isBalanced());
// a.insert(4.5);
// a.remove(3);
// prettyPrint(a.root);
// console.log(a.isBalanced());
// a.reBalance();
// prettyPrint(a.root);
// console.log(a.isBalanced());
// a.insert(100);
// a.insert(101);
// a.insert(10);
// a.insert(13);
// a.insert(3);
// a.insert(3.5);
// a.insert(11);
// a.remove(6);
// a.insert(-6);
// console.log(a.levelOrder());
// a.levelOrder(function (node) {
//   console.log(node.data);
// });
// console.log(a.inOrder());
// a.inOrder(function (node) {
//   console.log(node.data);
// });
// console.log(a.preOrder());
// a.preOrder(function (node) {
//   console.log(node.data);
// });
// console.log(a.postOrder());
// a.postOrder(function (node) {
//   console.log(node.data);
// });
// console.log(a.height(a.root.left));
// console.log(a.height(a.root.right));
// console.log(a.depth(a.root.right.right.right.right.right));
