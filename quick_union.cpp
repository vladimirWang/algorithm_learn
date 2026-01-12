#include <iostream>
#include <vector>
#include <algorithm>
#include <set>
#include <string>

// 合并块，查询慢
class UnionSet2 {
    public:
    int *boss, n;
    UnionSet(int n) : n(n) {
        boss = new int[n+1];
        for (int i = 0; i <= n; i++) {
            boss[i] = i;
        }
    }
    int find(int x) {
        if (boss[x] == x) {
            return x;
        }
        return find(boss[x]);
    }

    // 把所有与b颜色相同的方块，染成a的颜色
    void merge(int a, int b) {
        int fa = find(a), fb =find(b);
        if (fa == fb) {
            return;
        }
        boss[fa] = fb;
        return;
    }
};

int main() {

    return 0;
}