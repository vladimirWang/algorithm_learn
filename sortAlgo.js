// 基础冒泡排序
function bubble(arr) {
    for(let i=0;i<arr.length-1;i++) {
        let changeOccur = false;
        for (let j=0;j<arr.length-i-1;j++) {
            if (arr[j]> arr[j+1]) {
                changeOccur = true;
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
            }
        }
        if (!changeOccur) {
            break;
        }
    }
}

// 优化后的冒泡排序
function bubbleOptimized(arr) {
    let lastSwapPos = arr.length - 1; // 初始最后交换位置为数组末尾
    while (lastSwapPos > 0) {
        let currentSwapPos = 0; // 记录本轮最后交换位置
        // 仅遍历到上一轮最后交换的位置
        for (let j = 0; j < lastSwapPos; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                currentSwapPos = j; // 更新本轮最后交换位置
            }
        }
        lastSwapPos = currentSwapPos; // 缩小下一轮遍历范围
    }
}

// 选择排序
function choose(arr) {
    const len = arr.length;
    for (let i =0; i<len-1;i++) {
        let minIndex = i;
        for (let j=i+1;j<len;j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j
            }
        }
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
    }
}

// 基础版快速排序
function baseQuick(arr, start=0, end = arr.length-1) {
    function partition(data, start, end) {
        const pivot = data[start];
        while(start < end) {
            while(start < end && data[end] >= pivot) {
                end--;
            }
            data[start] = data[end]
            while(start < end && data[start] <= pivot) {
                start++;
            }
            data[end] = data[start]
            
        }
        data[start] = pivot
        return start
    }
    
    if (start < end) {
        const mid = partition(arr, start, end);
        baseQuick(arr, start, mid-1)
        baseQuick(arr, mid+1, end)
    }
}


// 优化版快速排序：三数取中法选基准 + 处理重复元素
function quickSort(arr, start = 0, end = arr.length - 1) {
    // 分区函数：修复重复元素死循环问题
    function partition(data, start, end) {
        const pivot = data[start];
        // 优化2：将严格比较改为 >=/<=，处理重复元素
        while (start < end) {
            // 从右往左找 <= pivot 的元素
            while (start < end && data[end] >= pivot) {
                end--;
            }
            data[start] = data[end];
            // 从左往右找 >= pivot 的元素
            while (start < end && data[start] <= pivot) {
                start++;
            }
            data[end] = data[start];
        }
        // 基准值归位
        data[start] = pivot;
        return start;
    }
    if (start < end) {
        // 优化1：三数取中法选择基准，避免有序数组退化
        const pivotIndex = medianOfThree(arr, start, end);
        // 把基准值交换到start位置，不改变原有partition逻辑
        [arr[start], arr[pivotIndex]] = [arr[pivotIndex], arr[start]];
        
        const mid = partition(arr, start, end);
        quickSort(arr, start, mid - 1);
        quickSort(arr, mid + 1, end);
    }
    // 补充：返回排序后的数组（原代码仅原地修改，无返回）
    return arr;
}



// 三数取中法：选start、mid、end中间值的索引，避免极端基准
function medianOfThree(arr, start, end) {
    const mid = Math.floor((start + end) / 2);
    // 排序三个数，返回中间值的索引
    if (arr[start] > arr[mid]) [arr[start], arr[mid]] = [arr[mid], arr[start]];
    if (arr[start] > arr[end]) [arr[start], arr[end]] = [arr[end], arr[start]];
    if (arr[mid] > arr[end]) [arr[mid], arr[end]] = [arr[end], arr[mid]];
    return mid; // 中间值作为基准
}

// 归并排序执行合并
function merge(arr, tempArr, left, mid, right) {
    let l_pos = left;
    let r_pos = mid+1;
    let pos = left;
    while(l_pos<=mid && r_pos<=right) {
        if (arr[l_pos] <arr[r_pos]) {
            tempArr[pos++] = arr[l_pos++];
        } else {
            tempArr[pos++] = arr[r_pos++];
        }
    }
    while(l_pos<=mid) {
        tempArr[pos++] = arr[l_pos++]
    }
    while(r_pos<=right) {
        tempArr[pos++] = arr[r_pos++]
    }
    for (let i = left; i <= right; i++) {
        arr[i] = tempArr[i];
    }
}
// 归并排序递归部分
function msort(arr, tempArr, left, right) {
    if (left < right) {
        let mid = Math.floor((left+right)/2)
        msort(arr, tempArr, left, mid)
        msort(arr, tempArr, mid+1, right)
        merge(arr, tempArr, left, mid, right)
    }
}

// 归并排序入口
function mergeSort(arr) {
    let tempArr = Array(arr.length)
    msort(arr, tempArr, 0, arr.length-1)
}


module.exports = {
    bubble,
    bubbleOptimized,
    choose,
    baseQuick,
    quickSort,
    mergeSort,
}
