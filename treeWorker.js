const {lca, lcaOptimized} = require('./treeAlgo');
const {deserializeTree, findNodeByVal} = require('./treeSerializer');

process.on('message', (msg) => {
    const { algorithm, data } = msg;
    const startTime = Date.now();

    try {
        // 反序列化树结构
        const root = deserializeTree(data.treeArray);
        const node1 = findNodeByVal(root, data.node1Val);
        const node2 = findNodeByVal(root, data.node2Val);

        if (!root || !node1 || !node2) {
            throw new Error('无法重建树结构或找不到指定节点');
        }

        let result = null;
        switch(algorithm) {
            case 'lca':
                result = lca(node1, node2, root);
                break;
            case 'lcaOptimized':
                result = lcaOptimized(node1, node2, root);
                break;
            default:
                process.send({ 
                    success: false,
                    error: 'Unknown algorithm' 
                });
                process.exit(1);
        }

        const elapsed = Date.now() - startTime;

        // 发送结果回父进程
        process.send({ 
            algorithm,
            elapsed,
            success: true,
            result: result ? result.val : null // 只返回节点值，避免循环引用问题
        });
    } catch (error) {
        process.send({ 
            success: false,
            error: error.message 
        });
    }

    // 退出进程
    process.exit(0);
})