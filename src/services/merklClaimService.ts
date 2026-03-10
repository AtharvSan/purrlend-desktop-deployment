import { MERKL_CONFIG } from 'src/config/merkl';

const BASE = MERKL_CONFIG.API_BASE;

/**
 * BUG FIX: The Merkl v4 claim flow works differently from what was implemented.
 *
 * WRONG (previous): Fetched /v4/users/{wallet}/claims expecting
 *   [{ campaignId, amount, proof }] for manual contract calls.
 *
 * CORRECT: Merkl v4 returns ready-to-send transactions from
 *   GET /v4/users/{wallet}/claimData?chainId={chainId}
 *   Response: [{ to: string, calldata: string, value: string }]
 *
 * You simply send these transactions as-is — no manual ABI encoding needed.
 * The distributor address and encoding are handled by Merkl's API.
 */
export type MerklClaimTx = {
  to: string;
  calldata: string; // ← field is "calldata" in v4, not "data"
  value: string;
};

export async function getMerklClaimTxs(address: string, chainId: number): Promise<MerklClaimTx[]> {
  try {
    const url = `${BASE}/users/${address}/claimData?chainId=${chainId}`;

    if (MERKL_CONFIG.DEBUG) {
      console.log('MERKL claim data fetch', url);
    }

    const res = await fetch(url);

    if (!res.ok) {
      console.error('MERKL claimData API failed', res.status);
      return [];
    }

    const json = await res.json();

    if (!Array.isArray(json)) return [];

    return json.map((tx: any) => ({
      to: tx.to,
      calldata: tx.calldata ?? tx.data ?? '0x',
      value: tx.value ?? '0',
    }));
  } catch (e) {
    console.error('MERKL claim fetch error', e);
    return [];
  }
}

/** Check if a user has any unclaimed rewards (for showing the claim button) */
export async function hasMerklPendingRewards(address: string, chainId: number): Promise<boolean> {
  const txs = await getMerklClaimTxs(address, chainId);
  return txs.length > 0;
}
