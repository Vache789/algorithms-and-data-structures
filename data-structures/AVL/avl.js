class Node {
  constructor(value, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
    this.height = 1;
  }
}

class AVL {
  #root;
  #size;

  constructor() {
    this.#root = null;
    this.#size = 0;
  }

  /* === Basic State === */

  size() {
    return this.#size;
  }

  is_empty() {
    return this.#size === 0;
  }

  clear() {
    this.#size = 0;
    this.#root = null;
  }

  /* === Core AVL Operations === */

  insert(value) {
    this.#root = this.#insert(this.#root, value);
  }

  delete(value) {
    this.#root = this.#delete(this.#root, value); 
  }

  search(value) {
    if (this.is_empty()) {
        throw new Error("Tree is empty");
    }
    return this.#search(this.#root, value);
  }

  /* === Height / Min / Max === */

  get_height() {
    return this.#getHeight(this.#root);
  }

  get_min() {
    if (this.is_empty()) {
        throw new Error("Tree is empty");
    }
    return this.#getMin(this.#root);
  }

  get_max() {
    if (this.is_empty()) {
        throw new Error("Tree is empty")
    }
    return this.#getMax(this.#root);
  }

  /* === Traversals === */

  level_order() {
    if (this.is_empty()) {
        throw new Error("Tree is empty");
    }

    let res = [];
    let queue = [this.#root];

    while (queue.length) {
        const node = queue.shift();
        res.push(node.value);

        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
    }
    return res;
  }

  preorder_rec() {
    let res = [];
    this.#preorder_rec(this.#root, res);
    return res;
  }

  preorder_itr() {
    if (this.is_empty()) return [];

    let stack = [this.#root];
    let res = [];

    while (stack.length) {
        const node = stack.pop();
        res.push(node.value);

        if (node.right) stack.push(node.right);
        if (node.left) stack.push(node.left);
    }
    return res;
  }

  inorder_rec() {
    let res = [];
    this.#inorder_rec(this.#root, res);
    return res;
  } 

  inorder_itr() {
    if (this.is_empty()) return [];

    let stack = [];
    let res = [];
    let current = this.#root;

    while (current || stack.length) {
      while (current) {
        stack.push(current);
        current = current.left;
      }
      current = stack.pop();
      res.push(current.value);
      current = current.right;
    }

    return res;
  }

  postorder_rec() {
    let res = [];
    this.#postorder_rec(this.#root, res);
    return res;
  }

  postorder_itr() {
    if (this.is_empty()) return [];

    let stack1 = [this.#root];
    let stack2 = [];
    let res = [];

    while (stack1.length) {
      const node = stack1.pop();
      stack2.push(node);

      if (node.left) stack1.push(node.left);
      if (node.right) stack1.push(node.right);
    }

    while (stack2.length) {
      res.push(stack2.pop().value);
    }

    return res;
  }

  /* === AVL Balancing === */

  #insert(node, value) {
    if (!node) {
      ++this.#size;
      return new Node(value);
    }

    if (value === node.value) {
      return node;
    } else if (node.value > value) {
      node.left = this.#insert(node.left, value);
    } else {
      node.right = this.#insert(node.right, value);
    }

    return this.#reBalance(node);
  }

  #delete(node, value) {
   if (!node) return node;

    if (value < node.value) {
      node.left = this.#delete(node.left, value);
    } else if (value > node.value) {
      node.right = this.#delete(node.right, value);
    } else {
      --this.#size;
      if (!node.left || !node.right) {
        return node.left || node.right;
      }

      let successor = this.#getMin(node.right);
      node.value = successor.value;
      node.right = this.#delete(node.right, successor.value);
    }

    return this.#reBalance(node);
  }

  #reBalance(node) {
    if (!node) return null;

    this.#updateHeight(node);
    let bf = this.#balanceFactor(node);

    if (bf > 1 && this.#balanceFactor(node.left) >= 0) {
      return this.#rotateRight(node); // LL Case;
    }

    if (bf > 1 && this.#balanceFactor(node.left) < 0) {
      node.left = this.#rotateLeft(node.left); // LR Case;
      return this.#rotateRight(node);
    }

    if (bf < -1 && this.#balanceFactor(node.right) <= 0) {
      return this.#rotateLeft(node); // RR Case;
    }

    if (bf < -1 && this.#balanceFactor(node.right) > 0) {
      node.right = this.#rotateRight(node.right); // RL Case;
      return this.#rotateLeft(node);
    }

    return node;
  }

  #balanceFactor(node) {
    return node ? this.#getHeight(node.left) - this.#getHeight(node.right) : 0;
  }

  #rotateLeft(node) {
    let y = node.right;
    let T2 = y.left;

    y.left = node;
    node.right = T2;

    this.#updateHeight(node);
    this.#updateHeight(y);

    return y;
  }

  #rotateRight(node) {
    let x = node.left;
    let T2 = x.right;

    x.right = node;
    node.left = T2;
    
    this.#updateHeight(node);
    this.#updateHeight(x);

    return x;
  }

  #getHeight(node) {
    return node ? node.height : 0;
  }

  #updateHeight(node) {
    if (!node) return;
    node.height = 1 + Math.max(this.#getHeight(node.left), this.#getHeight(node.right));
  }

  /* === BST Helpers === */

  #getMin(node) {
    if (!node.left) return node;
    return this.#getMin(node.left);
  }

  #getMax(node) {
    if (!node.right) return node;
    return this.#getMax(node.right);
  }

  #search(node, value) {
    if (!node) return false

    if (node.value === value) return true;

    return this.#search(node.value < value ? node.right : node.left, value)
  }

  /* === DFS Helpers === */

  #preorder_rec(node, res) {
    if (!node) return;
    res.push(node.value);
    this.#preorder_rec(node.left, res);
    this.#preorder_rec(node.right, res);
  }

  #inorder_rec(node, res) {
    if (!node) return;
    this.#inorder_rec(node.left, res);
    res.push(node.value);
    this.#inorder_rec(node.right, res);
  }

  #postorder_rec(node, res) {
    if (!node) return;
    this.#postorder_rec(node.left, res);
    this.#postorder_rec(node.right, res);
    res.push(node.value);
  }

  /* === Advanced AVL Utilities === */

  isBalanced() {
    return this.#isBalanced(this.#root);
  }

  #isBalanced(node) {
    if (!node) return true;
    let bf = this.#balanceFactor(node);
    return Math.abs(bf) <= 1 && this.#isBalanced(node.left) && this.#isBalanced(node.right);
  }

  findSuccessor(value) {
    if (this.is_empty()) {
      throw new Error('Tree is empty');
    }

    let current = this.#root;
    while (current && current.value !== value) {
      current = current.value < value ? current.right : current.left;
    }

    if (!current) {
      throw new Error("Value dont't exist");
    }

    if (current.right) {
      return this.#getMin(current.right).value;
    }

    let ancestor = null;
    let temp = this.#root;

    while (temp.value !== value) {
      if (temp.value > value) {
        ancestor = temp;
        temp = temp.left;
      } else {
        temp = temp.right;
      }
    }
    return ancestor ? ancestor.value : null;
  } 

  findPredecessor(value) {
   if (this.is_empty()) {
      throw new Error('Tree is empty');
    }

    let current = this.#root;
    while (current && current.value !== value) {
      current = current.value < value ? current.right : current.left;
    }

    if (!current) {
      throw new Error("Value dont't exist");
    }

    if (current.left) {
      return this.#getMax(current.left).value;
    }

    let ancestor = null;
    let temp = this.#root;

    while (temp.value !== value) {
      if (value > temp.value) {
        ancestor = temp;
        temp = temp.right;
      } else {
        temp = temp.left;
      }
    }
    return ancestor ? ancestor.value : null;
  }

  toArray() {
     return this.inorder_rec();
  }

  /* === Iteration === */

  [Symbol.iterator]() {
    const inorder = this.inorder_rec();
    let i = 0;
    return {
      next: () => {
        if (i < inorder.length) {
          return {
            value: inorder[i++],
            done: false,
          };
        }
        return {
          value: undefined,
          done: true,
        };
      },
    };
  }

  *entries() {
    const inorder = this.inorder_rec();
    for (let i = 0; i < inorder.length; ++i) {
      yield [i, inorder[i]];
    }
  }
}





const tree = new AVL();

console.log("--- 1. Ավելացում և Բալանսավորում (Insert & Balance) ---");
// Ավելացնում ենք թվեր այնպիսի հերթականությամբ, որ ծառը ստիպված լինի պտտվել
tree.insert(30);
tree.insert(20);
tree.insert(10); // Այստեղ պետք է կատարվի Right Rotation (LL Case)

tree.insert(40);
tree.insert(50); // Այստեղ պետք է կատարվի Left Rotation (RR Case)

tree.insert(25); // Այստեղ բարդ բալանսավորում է (LR կամ RL)

console.log("Tree Size (պետք է լինի 6):", tree.size());
console.log("Inorder Traversal (պետք է լինի աճման կարգով):", tree.inorder_rec());
console.log("Is Balanced?:", tree.isBalanced()); 



console.log("\n--- 2. Որոնում (Search) ---");
console.log("Search 25 (պետք է լինի true):", tree.search(25));
console.log("Search 100 (պետք է լինի false):", tree.search(100));

console.log("\n--- 3. Նախորդող և Հաջորդող (Predecessor & Successor) ---");
// Ծառի մեջ 25-ից առաջ 20-ն է, հետո՝ 30-ը
console.log("Successor of 25 (պետք է լինի 30):", tree.findSuccessor(25));
console.log("Predecessor of 25 (պետք է լինի 20):", tree.findPredecessor(25));



console.log("\n--- 4. Ջնջում (Delete) ---");
tree.delete(20); // Ջնջում ենք հանգույց
console.log("Inorder after deleting 20:", tree.inorder_rec());
console.log("New Size:", tree.size());
console.log("Is Balanced after delete?:", tree.isBalanced());




console.log("\n--- 5. Իտերացիա (Iterator & Entries) ---");
console.log("Using for...of loop:");
for (let val of tree) {
  console.log("Value:", val);
}

console.log("Using entries():");
for (let [index, val] of tree.entries()) {
  console.log(`Index ${index}: Value ${val}`);
}