const { Node } = require('./Node');

/**
 * 将二叉树序列化为可传递的格式（层序遍历数组）
 * @param {Node} root - 二叉树根节点
 * @returns {Array} 序列化后的数组，null 表示空节点
 */
function serializeTree(root) {
  if (!root) return [];
  
  const result = [];
  const queue = [root];
  
  while (queue.length > 0) {
    const node = queue.shift();
    if (node) {
      result.push(node.val);
      queue.push(node.left || null);
      queue.push(node.right || null);
    } else {
      result.push(null);
    }
  }
  
  // 移除末尾的 null
  while (result.length > 0 && result[result.length - 1] === null) {
    result.pop();
  }
  
  return result;
}

/**
 * 从序列化数组重建二叉树
 * @param {Array} arr - 序列化后的数组
 * @returns {Node} 重建后的二叉树根节点
 */
function deserializeTree(arr) {
  if (!arr || arr.length === 0) return null;
  
  const root = new Node(arr[0]);
  const queue = [root];
  let i = 1;
  
  while (queue.length > 0 && i < arr.length) {
    const node = queue.shift();
    
    // 左子节点
    if (i < arr.length && arr[i] !== null) {
      node.left = new Node(arr[i]);
      queue.push(node.left);
    }
    i++;
    
    // 右子节点
    if (i < arr.length && arr[i] !== null) {
      node.right = new Node(arr[i]);
      queue.push(node.right);
    }
    i++;
  }
  
  return root;
}

/**
 * 在树中根据值查找节点
 * @param {Node} root - 二叉树根节点
 * @param {*} val - 要查找的节点值
 * @returns {Node|null} 找到的节点或 null
 */
function findNodeByVal(root, val) {
  if (!root) return null;
  if (root.val === val) return root;
  
  const left = findNodeByVal(root.left, val);
  if (left) return left;
  
  return findNodeByVal(root.right, val);
}

module.exports = {
  serializeTree,
  deserializeTree,
  findNodeByVal
};

