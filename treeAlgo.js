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

module.exports = {
    getTreeNodeFullPath,
    lca
};