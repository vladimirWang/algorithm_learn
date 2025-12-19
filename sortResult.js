const { generateRandomArray, msToTime, generateSortedArray } = require("./lib")
const { fork } = require("child_process")
const path = require("path")

// const bubbleData = generateRandomArray(Math.pow(10, 5), Math.pow(10, 4), 1)
const bubbleData = generateSortedArray(Math.pow(10, 4))
const bubbleData2 = JSON.parse(JSON.stringify(bubbleData))
const bubbleData3 = JSON.parse(JSON.stringify(bubbleData))
const bubbleData4 = JSON.parse(JSON.stringify(bubbleData))
const bubbleData5 = JSON.parse(JSON.stringify(bubbleData))

// 创建三个子进程
const worker1 = fork(path.join(__dirname, 'worker.js'))
const worker2 = fork(path.join(__dirname, 'worker.js'))
const worker3 = fork(path.join(__dirname, 'worker.js'))
const worker4 = fork(path.join(__dirname, 'worker.js'))
const worker5 = fork(path.join(__dirname, 'worker.js'))

// 处理第一个进程（基础版冒泡）
worker1.on('message', (msg) => {
    if (msg.success) {
        console.log("基础版冒泡用时: ", msToTime(msg.elapsed))
    }
})

// 处理第二个进程（优化版冒泡）
worker2.on('message', (msg) => {
    if (msg.success) {
        console.log("bubbleOptimized用时: ",  msToTime(msg.elapsed))
    }
})

// 处理第三个进程（选择排序）
worker3.on('message', (msg) => {
    if (msg.success) {
        console.log("choose用时: ",  msToTime(msg.elapsed))
    }
})

// 快速排序
worker4.on('message', (msg) => {
    if (msg.success) {
        console.log("baseQuick用时: ",  msToTime(msg.elapsed))
    }
})

// 基础版快速排序
worker5.on('message', (msg) => {
    if (msg.success) {
        console.log("quickSort用时: ",  msToTime(msg.elapsed))
    }
})

// 向三个子进程发送数据
worker1.send({ algorithm: 'bubble', data: bubbleData })
worker2.send({ algorithm: 'bubbleOptimized', data: bubbleData2 })
worker3.send({ algorithm: 'choose', data: bubbleData3 })
worker4.send({ algorithm: 'baseQuick', data: bubbleData4 })
worker5.send({ algorithm: 'quickSort', data: bubbleData5 })