const coins = [1, 2, 5];

function solution(target) {
  if (target < 0) {
    return -1;
  }
  if (target === 0) {
    return 0;
  }
  const dp = Array.from({ length: target + 1 }, (item) => {
    return Infinity;
  });
  dp[0] = 0;
  for (let i = 1; i < target + 1; i++) {
    for (const coin of coins) {
      if (coin <= i && dp[i - coin] !== Infinity) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }
  return dp[target] === Infinity ? -1 : dp[target];
}

const ret = solution(11);
