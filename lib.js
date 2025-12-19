const rnd = function (m, n, precision= 2) {
    const before = (Math.random()* (m-n)).toFixed(precision)
    // console.log('args m: ', m, '; n', n, '; precision: ', precision);
    // console.log('before: ', before);
    
    const res = parseFloat(before) +n
    // console.log('after: ', res);
    return res;
}

const generateRandomArray = function(n, end=50, start=5) {
    return Array.from({length: n}, (item, index) => {
        return rnd(end, start)
    })
}

const generateSortedArray = function(n) {
    return Array.from({length: n}, (item, index) => {
        return index
    })
}

const second = 1000
const minute = second * 60
const hour = minute * 60

const msToTime = function(ms) {
    if (ms < second) {
        return `${ms}ms`
    } else if (ms < minute) {
        return `${Math.floor(ms / second)}s ${Math.floor(ms % second)}ms`
    } else if (ms < hour) {
        return `${Math.floor(ms / minute)}m ${Math.floor(ms % minute)}s`
    } else {
        return `${Math.floor(ms / hour)}h ${Math.floor(ms % hour)}m`
    }
}

module.exports = {
    rnd,
    generateRandomArray,
    msToTime,
    generateSortedArray
}