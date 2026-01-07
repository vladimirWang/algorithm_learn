const {getTreeNodeFullPath, lca, lcaOptimized} = require('./treeAlgo');
const {Node, printTreeStructure, printTreeGraph} = require('./Node');
const {generateRandomBinaryTree, getRandomTreeAndTwoNodes} = require('./treeLib');
const {fork} = require('child_process');

const lcaWorker = fork('./treeWorker');
const lcaOptimizedWorker = fork('./treeWorker');

const {root, node1, node2} = getRandomTreeAndTwoNodes(4)
// const tree2 = generateRandomBinaryTree(5)

lcaWorker.send({
    algorithm: 'lca',
    data: {
        root,
        node1,
        node2
    },
})

lcaWorker.on('message', (msg) => {
    console.log("测试数据: ", printTreeStructure(root), '; node1: ', node1.val, ', node2: ', node2.val);
    if (msg.success) {
        console.log("LCA结果: ", msg.result);
        console.log("LCA计算用时: ", msg.elapsed, "ms");
    } else {
        console.error("LCA计算出错: ", msg.error);
    }
})
console.log("-----------------------非worker验证, start---------------------------")
const lcaResult1 = lca(node1, node2, root);
console.log("------------------图形打印： --------------------")
printTreeGraph(root)
console.log("------------------层序打印： --------------------")
printTreeStructure(root)
console.log(`LCA(${node1.val}, ${node2.val}) = ${lcaResult1 ? lcaResult1.val : null}`);
console.log("-----------------------非worker验证, end---------------------------")
