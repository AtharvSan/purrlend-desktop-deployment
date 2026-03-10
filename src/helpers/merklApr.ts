/**
 * BUG FIX: Previous version capped APR at 25% which silently hid the real
 * Merkl boost APRs (the UI shows 2,500% in the screenshot).
 * Since merklMarketMapper now reads apr directly from the API, this helper
 * is only needed for edge cases where you must compute APR manually.
 */
export function calcMerklAprPercent(
  rawDailyRewards: number,
  totalLiquidityUsd: number,
  rewardTokenPriceUsd = 1
): number {
  if (!rawDailyRewards || !totalLiquidityUsd) return 0;

  let rewardsPerDay = Number(rawDailyRewards);

  // Normalize common Merkl bigint formats
  if (rewardsPerDay > 1e18) rewardsPerDay = rewardsPerDay / 1e18;
  else if (rewardsPerDay > 1e12) rewardsPerDay = rewardsPerDay / 1e6;

  const yearlyUsd = rewardsPerDay * rewardTokenPriceUsd * 365;
  const apr = (yearlyUsd / totalLiquidityUsd) * 100;

  if (!Number.isFinite(apr) || apr < 0) return 0;

  // ✅ NO hard cap — Merkl campaigns routinely show 100%–10,000%+ APR.
  // Let the UI decide how to display large numbers (e.g. "2,500%").
  return apr;
}

/** Merge a base protocol APR with a Merkl boost APR */
export function mergeApr(base?: number, merkl?: number): number {
  return Number(base || 0) + Number(merkl || 0);
}

/** Format APR for display — handles the large Merkl values */
export function formatMerklApr(apr: number): string {
  if (apr === 0) return '—';
  if (apr >= 1000) return `${(apr / 1000).toFixed(2)}K%`;
  if (apr >= 100) return `${apr.toFixed(0)}%`;
  return `${apr.toFixed(2)}%`;
}