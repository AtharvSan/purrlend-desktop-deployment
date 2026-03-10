import { MERKL_CONFIG } from 'src/config/merkl';

const BASE = MERKL_CONFIG.API_BASE;

/**
 * Fetch all pending rewards for a user across all Purrlend campaigns.
 *
 * BUG FIX (useMerklRewards): Previous hook summed r.usdValue but Merkl v4 API
 * returns rewards as:
 *   { token: { address, symbol, decimals, price }, amount: "1234567890000000000" }
 * There is no usdValue field — you must compute: (amount / 10^decimals) * token.price
 *
 * NOTE: merklUserService.ts is now DELETED — it was a duplicate that also used
 * the wrong URL (missing /v4/). Use this file for all user reward fetches.
 */
export type MerklTokenReward = {
  tokenAddress: string;
  symbol: string;
  decimals: number;
  priceUsd: number;
  rawAmount: string; // as returned by API (may be bigint string)
  amount: number; // normalized by decimals
  usdValue: number; // amount * priceUsd
};

export async function getMerklUserRewards(
  chainId: number,
  address: string
): Promise<MerklTokenReward[]> {
  if (!chainId || !address) return [];

  const url = `${BASE}/users/${address}/rewards?chainId=${chainId}`;

  if (MERKL_CONFIG.DEBUG) {
    console.log('MERKL rewards fetch', url);
  }

  try {
    const res = await fetch(url);

    if (!res.ok) {
      console.error('MERKL rewards API error', res.status);
      return [];
    }

    const json = await res.json();
    const raw: any[] = Array.isArray(json) ? json : json?.rewards ?? [];

    // BUG FIX: normalize using token.decimals and token.price, not r.usdValue
    return raw.map((r: any) => {
      const decimals = Number(r.token?.decimals ?? r.decimals ?? 18);
      const priceUsd = Number(r.token?.price ?? r.price ?? 0);
      const rawAmount = String(r.amount ?? '0');
      const amount = Number(rawAmount) / Math.pow(10, decimals);
      const usdValue = amount * priceUsd;

      return {
        tokenAddress: (r.token?.address ?? r.tokenAddress ?? '').toLowerCase(),
        symbol: r.token?.symbol ?? r.symbol ?? 'UNKNOWN',
        decimals,
        priceUsd,
        rawAmount,
        amount,
        usdValue,
      };
    });
  } catch (e) {
    console.error('MERKL rewards fetch error', e);
    return [];
  }
}
