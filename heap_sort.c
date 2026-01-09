#include <stdio.h>

void swap(int * a, int *b) {
    int tmp = *a;
    *a = *b;
    *b = tmp; 
}

/**
 * 维护堆的性质
 * @param arr 堆的数组
 * @param n 数组长度
 * @param i 待维护节点的下标
 */
void heapify(int arr[], int n, int i) {
    int large = i;
    int lson = i*2+1;
    int rson = i*2+2;
    if (lson<n&& arr[large] <arr[lson]) {
        large = lson;
    }
    if (rson < n && arr[large] <arr[rson]) {
        large = rson;
    }
    if (large != i) {
        swap(&arr[large], &arr[i]);
        heapify(arr, n, large);
    }
}

// 堆排序入口
void heap_sort(int arr[], int n) {
    int i;

    printf("i value is %d\n", n/2-1);
    // 建堆
    for (i = n/2-1;i>=0;i--) {
        heapify(arr, n, i);
    } 
    // 堆排序
    for (i = n-1;i>0;i--) {
        swap(&arr[i], &arr[0]);
        heapify(arr, i, 0);
    }
}

void print_arr(int arr[], int n) {
    for (int i=0;i<n;i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");
}

int main() {
    int arr[] = {3,1,9,10, 4,2, 20};
    int n = sizeof(arr)/sizeof(int);
    print_arr(arr, n);

    printf("-----------排序后---------------\n");
    heap_sort(arr, n);
    print_arr(arr, n);
    return 0;
}