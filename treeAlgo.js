// 获取从根节点到指定节点的完整路径
function getTreeNodeFullPath(node, root) {
    let result = [];
    function dfs(target, currentNode) {
        if (!currentNode) return null;
        result.push(currentNode);
        if (target === currentNode) return currentNode;
        let res = dfs(target, currentNode.left);
        if (res) {
            return res;
        }
        res = dfs(target, currentNode.right);
        if (res) {
            return res;
        }
        result.pop();
        return null;
    }
    
    dfs(node, root);
    return result;
}

// 最近公共祖先
function lca(node1, node2, root) {
    const path1 = getTreeNodeFullPath(node1, root);
    const path2 = getTreeNodeFullPath(node2, root);
    if (path1.length === 0 || path2.length === 0) return null;

    let lcaNode = null;
    const minLen = Math.min(path1.length, path2.length);
    for (let i = 0;i<minLen;i++) {
        if (path1[i] === path2[i]) {
            lcaNode = path1[i];
        } else {
            break;
        }
    }
    return lcaNode;
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

module.exports = {
    getTreeNodeFullPath,
    lca,
    lcaOptimized
};