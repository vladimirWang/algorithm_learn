
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

// 辅助函数：收集每一层的节点（含空节点，用于计算树形结构）
function collectLevelsWithNull(root) {
  if (!root) return [];
  const levels = [];
  const queue = [root];
  let hasNonEmpty = true;

  while (queue.length > 0 && hasNonEmpty) {
    const levelSize = queue.length;
    const currentLevel = [];
    hasNonEmpty = false;

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      if (node) {
        currentLevel.push(node);
        queue.push(node.left || null);
        queue.push(node.right || null);
        if (node.left || node.right) hasNonEmpty = true;
      } else {
        currentLevel.push(null);
        queue.push(null);
        queue.push(null);
      }
    }
    levels.push(currentLevel);
  }
  return levels;
}

function printTreeGraph(root) {
  if (!root) {
    console.log("空树");
    return;
  }

  // 步骤1：收集每一层的节点（含空节点）
  const levels = collectLevelsWithNull(root);
  const maxDepth = levels.length - 1;

  // 步骤2：逐行打印树形
  for (let depth = 0; depth < levels.length; depth++) {
    const level = levels[depth];
    const isLastLevel = depth === maxDepth;

    // 计算当前层的缩进（根节点缩进最多，下层逐步减少）
    const indent = " ".repeat((2 ** (maxDepth - depth)) - 1);
    // 节点之间的间距
    const spacing = " ".repeat((2 ** (maxDepth - depth + 1)) - 1);

    // 打印当前层的节点值
    let nodeLine = indent;
    for (const node of level) {
      nodeLine += node ? node.val.toString().padStart(2, " ") : "  "; // 节点值占2位，空节点用"  "
      nodeLine += spacing;
    }
    console.log(nodeLine.trimEnd()); // 去除末尾多余空格

    // 打印分支符（除了最后一层）
    if (!isLastLevel) {
      let branchLine = " ".repeat(indent.length - 1); // 分支符的缩进
      for (const node of level) {
        if (node) {
          branchLine += node.left ? "/" : " ";
          branchLine += " ";
          branchLine += node.right ? "\\" : " ";
        } else {
          branchLine += "  "; // 空节点无分支
        }
        branchLine += spacing;
      }
      console.log(branchLine.trimEnd());
    }
  }
}
/**
 * 层序遍历打印（和原printTreeStructure结果完全一致）
 * @param {Node} root - 二叉树根节点
 */
function printTreeStructure(root) {
  if (!root) {
    console.log("空树");
    return;
  }
  const queue = [root]; // 初始化队列，存入根节点
  const result = [];    // 存储最终的层序结构（二维数组）
  
  while (queue.length > 0) {
    const levelSize = queue.length; // 当前层的节点数量
    const currentLevel = [];        // 存储当前层的节点值
    
    // 遍历当前层的所有节点
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();   // 取出队首节点
      currentLevel.push(node.val);  // 收集当前节点值
      
      // 左子节点非空则入队（仅处理非空节点）
      if (node.left) queue.push(node.left);
      // 右子节点非空则入队（仅处理非空节点）
      if (node.right) queue.push(node.right);
    }
    
    result.push(currentLevel); // 将当前层加入结果数组
  }
  
  // 打印结果（和原函数输出格式完全一致）
  console.log("树的层序结构：", result);
  // 可选：返回结果数组，方便调用方复用
  return result;
}
module.exports = {
  Node,
  printTreeGraph,
  printTreeStructure
};