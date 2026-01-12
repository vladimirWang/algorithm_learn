#include <iostream>
#include <vector>
#include <algorithm>
#include <set>
#include <string>

// 查询块，合并慢
class UnionSet3 {

    public:
    int *fa, *size, n;
    UnionSet(int n) : n(n) {
        fa = new int[n+1];
        size = new int[n+1];
        for (int i = 0; i <= n; i++) {
            fa[i] = i;
            size[i] = 1;
        }
    }
    int find(int x) {
        if (fa[x] == x) return x;
        return find(fa[x]);
    }

    // 把所有与b颜色相同的方块，染成a的颜色
    void merge(int a, int b) {
        int ra = find(a), rb =find(b);
        if (ra == rb) {
            return;
        }
        if (size[ra] <size[rb]) {
            fa[ra] = rb;
            size[rb] += size[ra];
        } else {
            fa[rb] = ra;
            size[ra] += size[rb];
        }
        return;
    }
};

int main() {

    return 0;
}