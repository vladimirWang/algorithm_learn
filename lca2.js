// 简化后的Node类：仅保留val、left、right核心属性
class Node {
  constructor(val) {
    this.val = val; // 节点值
    this.left = null; // 左子节点
    this.right = null; // 右子节点
  }

  // 简化setLeft：仅设置左子节点
  setLeft(node) {
    this.left = node;
  }

  // 简化setRight：仅设置右子节点
  setRight(node) {
    this.right = node;
  }
}

// 辅助函数1：判断节点是否在树中（带防环）
function isNodeInTree(node, root) {
  if (!root || !node) return false;
  const visited = new Set(); // 防环标记
  let found = false;

  function dfs(current) {
    if (!current || found || visited.has(current)) return;
    visited.add(current);
    if (current === node) {
      found = true;
      return;
    }
    dfs(current.left);
    dfs(current.right);
  }

  dfs(root);
  return found;
}

// 辅助函数2：构建完整的父节点映射（遍历整棵树，不提前终止）
function buildFullParentMap(root) {
  const parentMap = new Map();
  const visited = new Set(); // 防环

  function dfs(currentNode, parentNode) {
    if (!currentNode || visited.has(currentNode)) return;
    visited.add(currentNode);
    parentMap.set(currentNode, parentNode); // 记录所有节点的父节点
    // 完整遍历左右子树，不提前终止
    dfs(currentNode.left, currentNode);
    dfs(currentNode.right, currentNode);
  }

  dfs(root, null);
  return parentMap;
}

// 辅助函数3：获取节点深度（基于完整的parentMap）
function getNodeDepth(targetNode, root, parentMap) {
  if (!targetNode || !root) return -1;
  if (targetNode === root) return 0; // 根节点深度为0

  let depth = 0;
  let current = targetNode;
  // 从目标节点向上找根节点，统计步数（深度）
  while (current !== root && parentMap.has(current)) {
    current = parentMap.get(current);
    depth++;
    // 防环：避免无限循环
    if (depth > 1000) return -1;
  }

  // 若最终没找到根节点，说明节点不在树中
  return current === root ? depth : -1;
}

// 辅助函数4：让节点向上移动指定步数
function moveUp(node, steps, parentMap) {
  let current = node;
  for (let i = 0; i < steps && current; i++) {
    current = parentMap.get(current); // 向上找父节点
  }
  return current;
}

// 修复版LCA函数（不存储完整路径）
function lcaOptimized(node1, node2, root) {
  // 边界1：根节点为空
  if (!root) return null;
  // 边界2：其中一个节点不在树中
  if (!isNodeInTree(node1, root) || !isNodeInTree(node2, root)) return null;
  // 边界3：两个节点是同一个
  if (node1 === node2) return node1;

  // 步骤1：构建整棵树的完整父节点映射（仅需一次遍历）
  const parentMap = buildFullParentMap(root);

  // 步骤2：获取两个节点的深度（基于完整parentMap）
  const depth1 = getNodeDepth(node1, root, parentMap);
  const depth2 = getNodeDepth(node2, root, parentMap);
  // 双重校验：深度为-1说明节点不在树中
  if (depth1 === -1 || depth2 === -1) return null;

  // 步骤3：对齐两个节点的深度
  let nodeA = node1;
  let nodeB = node2;
  const depthDiff = Math.abs(depth1 - depth2);

  if (depth1 > depth2) {
    // node1更深，向上移动depthDiff步
    nodeA = moveUp(node1, depthDiff, parentMap);
  } else if (depth2 > depth1) {
    // node2更深，向上移动depthDiff步
    nodeB = moveUp(node2, depthDiff, parentMap);
  }

  // 步骤4：同步向上遍历，找首次相遇的节点
  while (nodeA && nodeB && nodeA !== nodeB) {
    nodeA = parentMap.get(nodeA);
    nodeB = parentMap.get(nodeB);
  }

  // 最终相遇的节点就是LCA
  return nodeA === nodeB ? nodeA : null;
}

// ---------------- 测试验证 ----------------
// 构建测试树：
//        3 (root)
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

// 设置子节点
root.setLeft(node5);
root.setRight(node1);
node5.setLeft(node6);
node5.setRight(node2);
node1.setLeft(node0);
node1.setRight(node8);
node2.setLeft(node7);
node2.setRight(node4);

// 测试场景1：root和node8的LCA → 预期root（val=3）
console.log("root & node8的LCA：", lcaOptimized(root, node8, root)?.val); // 3 ✔️ 正确

// 测试场景2：node4和node7的LCA → 预期node2（val=2）
console.log("node4 & node7的LCA：", lcaOptimized(node4, node7, root)?.val); // 2 ✔️ 正确

// 测试场景3：node5和node1的LCA → 预期root（val=3）
console.log("node5 & node1的LCA：", lcaOptimized(node5, node1, root)?.val); // 3 ✔️ 正确

// 测试场景4：node6和node4的LCA → 预期node5（val=5）
console.log("node6 & node4的LCA：", lcaOptimized(node6, node4, root)?.val); // 5 ✔️ 正确