const {lca, lcaOptimized} = require('./treeAlgo');


process.on('message', (msg) => {
    const { algorithm, data } = msg;
    const startTime = Date.now();

    let result = null;
    switch(algorithm) {
        case 'lca':
            result = lca(data.node1, data.node2, data.root);
            break;
        case 'lcaOptimized':
            result = lcaOptimized(data.node1, data.node2, data.root);
            break;
        default:
            process.send({ error: 'Unknown algorithm' });
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

    // 退出进程
    process.exit(0);
})