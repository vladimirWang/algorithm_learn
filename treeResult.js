const {getTreeNodeFullPath, lca, lcaOptimized} = require('./treeAlgo');
const {Node, printTreeStructure, printTreeGraph} = require('./Node');
const {generateRandomBinaryTree, getRandomTreeAndTwoNodes} = require('./treeLib');
const {serializeTree} = require('./treeSerializer');
const {fork} = require('child_process');

const lcaWorker = fork('./treeWorker');
const lcaOptimizedWorker = fork('./treeWorker');

const depth = 4;
const {root, node1, node2} = getRandomTreeAndTwoNodes(depth)
// const tree2 = generateRandomBinaryTree(5)

console.log("------------------图形打印： --------------------")
printTreeGraph(root)
console.log("------------------层序打印： --------------------")
printTreeStructure(root)
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
        console.log("Worker LCA结果: ", msg.result);
        console.log("Worker LCA计算用时: ", msg.elapsed, "ms");
    } else {
        console.error("Worker LCA计算出错: ", msg.error);
    }
})

console.log("-----------------------主程序验证, start---------------------------")
const lcaResult1 = lca(node1, node2, root);
console.log(`主程序 LCA(${node1.val}, ${node2.val}) = ${lcaResult1 ? lcaResult1.val : null}`);
console.log("-----------------------主程序验证, end---------------------------")
