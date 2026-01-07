const { Node } = require('./Node');

// 原有：随机生成二叉树函数（不变）
function generateRandomBinaryTree(targetDepth, valMin = 1, valMax = 100, hasChildProb = 0.7) {
  if (targetDepth < 0) return null;

  const getRandomVal = () => Math.floor(Math.random() * (valMax - valMin + 1)) + valMin;

  function dfs(currentDepth) {
    const node = new Node(getRandomVal());
    if (currentDepth === targetDepth) {
      return node;
    }

    let hasLeft = false;
    let hasRight = false;

    if (Math.random() < hasChildProb) {
      hasLeft = true;
      node.setLeft(dfs(currentDepth + 1));
    }

    if (Math.random() < hasChildProb) {
      hasRight = true;
      node.setRight(dfs(currentDepth + 1));
    }

    if (!hasLeft && !hasRight) {
      if (Math.random() < 0.5) {
        node.setLeft(dfs(currentDepth + 1));
      } else {
        node.setRight(dfs(currentDepth + 1));
      }
    }

    return node;
  }

  return dfs(0);
}

// 原有：收集所有节点函数（不变）
function collectAllNodes(root) {
  if (!root) return [];
  const nodes = [];
  const visited = new Set();
  const queue = [root];
  visited.add(root);

  while (queue.length > 0) {
    const node = queue.shift();
    nodes.push(node);

    if (node.left && !visited.has(node.left)) {
      visited.add(node.left);
      queue.push(node.left);
    }
    if (node.right && !visited.has(node.right)) {
      visited.add(node.right);
      queue.push(node.right);
    }
  }

  return nodes;
}

// 原有：获取随机树+两个随机节点（不变）
function getRandomTreeAndTwoNodes(targetDepth, valMin = 1, valMax = 100, hasChildProb = 0.7) {
  const root = generateRandomBinaryTree(targetDepth, valMin, valMax, hasChildProb);
  const allNodes = collectAllNodes(root);

  let node1, node2;
  if (allNodes.length === 0) {
    node1 = null;
    node2 = null;
  } else if (allNodes.length === 1) {
    node1 = allNodes[0];
    node2 = allNodes[0];
  } else {
    const randomIdx1 = Math.floor(Math.random() * allNodes.length);
    node1 = allNodes[randomIdx1];

    let randomIdx2;
    do {
      randomIdx2 = Math.floor(Math.random() * allNodes.length);
    } while (randomIdx2 === randomIdx1);
    node2 = allNodes[randomIdx2];
  }

  return { root, node1, node2 };
}

// // ---------------- 测试验证 ----------------
// // 1. 生成随机二叉树（深度3）
// const { root, node1, node2 } = getRandomTreeAndTwoNodes(3);

// // 2. 调用对齐后的printTreeStructure，验证输出
// printTreeStructure(root);
// console.log("随机选取的节点1值：", node1 ? node1.val : null);
// console.log("随机选取的节点2值：", node2 ? node2.val : null);

module.exports = {
  generateRandomBinaryTree,
  collectAllNodes,
  getRandomTreeAndTwoNodes,
};