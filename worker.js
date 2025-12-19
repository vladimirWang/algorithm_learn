const { bubble, bubbleOptimized, choose, baseQuick, quickSort } = require("./sortAlgo")

// 从父进程接收消息
process.on('message', (msg) => {
    const { algorithm, data } = msg;
    const startTime = Date.now();
    
    let result;
    switch(algorithm) {
        case 'bubble':
            bubble(data);
            break;
        case 'bubbleOptimized':
            bubbleOptimized(data);
            break;
        case 'choose':
            choose(data);
            break;
        case 'baseQuick':
            baseQuick(data);
            break;
        case 'quickSort':
            quickSort(data);
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
        success: true
    });
    
    // 退出进程
    process.exit(0);
});

