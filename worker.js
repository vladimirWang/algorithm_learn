const { bubble, bubbleOptimized, choose, baseQuick, quickSort, mergeSort } = require("./sortAlgo")

// 从父进程接收消息
process.on('message', (msg) => {
    const { algorithm, data } = msg;
    const startTime = Date.now();
    
    let result = data.map(item => item)
    switch(algorithm) {
        case 'bubble':
            bubble(result);
            break;
        case 'bubbleOptimized':
            bubbleOptimized(result);
            break;
        case 'choose':
            choose(result);
            break;
        case 'baseQuick':
            baseQuick(result);
            break;
        case 'quickSort':
            quickSort(result);
            break;
        case 'mergeSort':
            mergeSort(result);
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
        result
    });
    
    // 退出进程
    process.exit(0);
});

