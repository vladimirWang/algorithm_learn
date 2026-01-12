#include <iostream>
#include <vector>
#include <algorithm>
#include <set>
#include <string>

// 查询块，合并慢
class UnionSet {
    public:
    int *fa, n;
    UnionSet(int n) : n(n) {
        fa = new int[n+1];
        for (int i = 0; i <= n; i++) {
            fa[i] = i;
        }
    }
    int get(int x) {
        return fa[x] == (fa[x] == x ? x : get(fa[x]));
    }

    // 把所有与b颜色相同的方块，染成a的颜色
    void merge(int a, int b) {
        if (find(a) == find(b)) {
            return;
        }
        int cb = color[b];
        for (int i =0;i<=n;i++) {
            if (color[i] == cb) {
                color[i] = color[a];
            }
        }
        return;
    }
};

int main() {

    return 0;
}