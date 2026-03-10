import { MERKL_CONFIG, MERKL_CAMPAIGN_IDS } from 'src/config/merkl';

const BASE = MERKL_CONFIG.API_BASE;
const CHAIN_ID = 999;

export type LeaderboardEntry = {
  address: string;
  points: number;   // raw token amount (Purr points, already divided by 1e18)
  usd: number;      // USD value (0 if unpriced)
  rank: number;
};

/**
 * Fetches all reward recipients for all known campaign IDs and merges by address.
 * Endpoint: GET /v4/rewards?chainId=999&campaignId={id}
 * Returns array of { amount, recipient, rewardTokenAddress, reason, claimed, pending }
 */
export async function getMerklLeaderboard(): Promise<LeaderboardEntry[]> {
  try {
    const campaignIds = Object.values(MERKL_CAMPAIGN_IDS);

    if (campaignIds.length === 0) {
      console.warn('No campaign IDs configured in MERKL_CAMPAIGN_IDS');
      return [];
    }

    const results = await Promise.allSettled(
      campaignIds.map((campaignId) =>
        fetch(`${BASE}/rewards?chainId=${CHAIN_ID}&campaignId=${campaignId}`)
          .then((r) => {
            if (!r.ok) throw new Error(`${r.status} for campaign ${campaignId}`);
            return r.json();
          })
      )
    );

    // Merge all campaigns — sum amounts per address
    const merged: Record<string, { points: number; usd: number }> = {};

    for (const result of results) {
      if (result.status === 'rejected') {
        console.warn('Leaderboard fetch failed:', result.reason);
        continue;
      }

      const list: any[] = Array.isArray(result.value) ? result.value : [];

      for (const entry of list) {
        const addr = (entry.recipient || entry.address || entry.user || '').toLowerCase();
        if (!addr) continue;

        // amount is a raw bigint string (e.g. "4162744711733908030036288")
        // divide by 1e18 to get human-readable points
        const rawAmount = BigInt(entry.amount || '0');
        const points = Number(rawAmount) / 1e18;

        // USD value: if reward token has a price, compute it
        // For now Purr points have no price so usd = 0
        const usd = 0;

        if (!merged[addr]) merged[addr] = { points: 0, usd: 0 };
        merged[addr].points += points;
        merged[addr].usd += usd;
      }
    }

    return Object.entries(merged)
      .map(([address, { points, usd }]) => ({ address, points, usd, rank: 0 }))
      .sort((a, b) => b.points - a.points)
      .map((entry, i) => ({ ...entry, rank: i + 1 }));

  } catch (e) {
    console.error('Leaderboard error', e);
    return [];
  }
}