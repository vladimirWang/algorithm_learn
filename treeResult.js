const {getTreeNodeFullPath, lca, lcaOptimized} = require('./treeAlgo');
const {Node, printTreeStructure, printTreeGraph} = require('./Node');
const {generateRandomBinaryTree, getRandomTreeAndTwoNodes, deepCopyTree} = require('./treeLib');
const {serializeTree, findNodeByVal} = require('./treeSerializer');
const {fork} = require('child_process');

const lcaWorker = fork('./treeWorker');
const lcaOptimizedWorker = fork('./treeWorker');

const depth = 30;
const {root, node1, node2} = getRandomTreeAndTwoNodes(depth, 1, 200)

const root2 = deepCopyTree(root)
const node1_2 = findNodeByVal(root2, node1.val)
const node2_2 = findNodeByVal(root2, node2.val)
// const tree2 = generateRandomBinaryTree(5)

if (depth < 10) {
    console.log("------------------root图形打印： --------------------")
    printTreeGraph(root)
    console.log("------------------root层序打印： --------------------")
    printTreeStructure(root)
}
console.log('node1: ', node1.val, ', node2: ', node2.val)

// 序列化树结构，只传递节点值（避免循环引用问题）
lcaWorker.send({
    algorithm: 'lca',
    data: {
        treeArray: serializeTree(root),
        node1Val: node1.val,
        node2Val: node2.val
    },
})

lcaWorker.on('message', (msg) => {
    if (msg.success) {
        console.log("LCA结果: ", msg.result);
        console.log("LCA计算用时: ", msg.elapsed, "ms");
    } else {
        console.error("LCA计算出错: ", msg.error);
    }
})

lcaOptimizedWorker.send({
    algorithm: 'lcaOptimized',
    data: {
        treeArray: serializeTree(root),
        node1Val: node1.val,
        node2Val: node2.val
    },
})

lcaOptimizedWorker.on('message', (msg) => {
    if (msg.success) {
        console.log("lcaOptimized结果: ", msg.result);
        console.log("lcaOptimized计算用时: ", msg.elapsed, "ms");
    } else {
        console.error("lcaOptimized计算出错: ", msg.error);
    }
})
