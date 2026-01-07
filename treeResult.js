const {getTreeNodeFullPath, lca} = require('./treeAlgo');

class Node {
  /**
   * 二叉树节点构造函数
   * @param {*} val 节点值
   */
  constructor(val) {
    this.val = val; // 节点值，用于LCA匹配目标节点
    this.left = null; // 左子节点
    this.right = null; // 右子节点
    // this.children = []; // 子节点数组，存储[left, right]（仅包含非null的子节点）
  }

  /**
   * 设置左子节点，并同步更新children数组
   * @param {Node} node 左子节点
   */
  setLeft(node) {
    this.left = node;
    // this._updateChildren();
  }

  /**
   * 设置右子节点，并同步更新children数组
   * @param {Node} node 右子节点
   */
  setRight(node) {
    this.right = node;
    // this._updateChildren();
  }

  /**
   * 内部方法：更新children数组，确保与left/right一致
   */
//   _updateChildren() {
//     this.children = [];
//     if (this.left) this.children.push(this.left);
//     if (this.right) this.children.push(this.right);
//   }
}

// --------------- 测试示例 ---------------
// 构建一棵用于LCA计算的二叉树
//        3
//       / \
//      5   1
//     / \ / \
//    6  2 0  8
//      / \
//     7   4
const root = new Node(3);
const node5 = new Node(5);
const node1 = new Node(1);
const node6 = new Node(6);
const node2 = new Node(2);
const node0 = new Node(0);
const node8 = new Node(8);
const node7 = new Node(7);
const node4 = new Node(4);
const node20 = new Node(20);

// 构建树结构
root.setLeft(node5);
root.setRight(node1);
node5.setLeft(node6);
node5.setRight(node2);
node1.setLeft(node0);
node1.setRight(node8);
node2.setLeft(node7);
node2.setRight(node4);


const result = getTreeNodeFullPath(node20, root); // [3,5,2,4]
// console.log('路径结果：', result.map(n => n.val));

const lcaResult = lca(node7, node4, root); // 2
console.log('lca结果：', lcaResult ? lcaResult.val : null);

