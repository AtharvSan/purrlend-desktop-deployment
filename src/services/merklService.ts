import { MERKL_CONFIG, MERKL_POOL_ADDRESSES } from 'src/config/merkl';

const BASE = MERKL_CONFIG.API_BASE;

export async function getAllMerklOpportunities(_chainId: number) {
  try {
    const results = await Promise.allSettled(
      MERKL_POOL_ADDRESSES.map((poolAddress) =>
        fetchOpportunityForPool(poolAddress)
      )
    );

    const opps: any[] = [];
    for (let i = 0; i < results.length; i++) {
      const result = results[i];
      if (result.status === 'fulfilled' && result.value) {
        opps.push(result.value);
        if (MERKL_CONFIG.DEBUG) {
          const o = result.value;
          console.log('MERKL POOL OK', o.name, '| pool:', MERKL_POOL_ADDRESSES[i].slice(0,10));
        }
      } else if (result.status === 'rejected') {
        console.warn('MERKL pool fetch failed', MERKL_POOL_ADDRESSES[i], (result as any).reason);
      }
    }

    console.log(`MERKL: loaded ${opps.length}/${MERKL_POOL_ADDRESSES.length} pools`);
    return opps;
  } catch (e) {
    console.error('MERKL fetch error', e);
    return [];
  }
}

async function fetchOpportunityForPool(poolAddress: string): Promise<any | null> {
  const url = `${BASE}/opportunities?explorerAddress=${poolAddress}`;
  const res = await fetch(url);

  if (!res.ok) throw new Error(`${res.status} for pool ${poolAddress}`);

  const data = await res.json();
  const list: any[] = Array.isArray(data) ? data : data?.opportunities ?? [];
  if (!list.length) return null;

  // Take first result — explorerAddress is an exact pool lookup, no name filtering needed.
  // The _poolAddress we attach is what the mapper uses to key the entry, not the name.
  const opp = list[0];
  opp._poolAddress = poolAddress.toLowerCase();
  return opp;
}