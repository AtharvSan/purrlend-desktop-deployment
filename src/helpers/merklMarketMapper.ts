// Price to use for Purr points until they get an official market price.
// Update this value when the official price is known.
const PURR_POINT_PRICE_USD = 0.0069;

export const UNDERLYING_TO_POOL: Record<string, string> = {
  '0x9fdbda0a5e284c32744d2f17ee5c74b284993463': '0xff85d9ea6bd235152b6d7950f826de8b0fb7afab', // UBTC
  '0xbe6727b535545c67d5caa73dea54865b92cf7907': '0x0a1ad69bd2cf51089a5129f10b8a8b0a655458db', // UETH
  '0xb88339cb7199b77e23db6e890353e22632ba630f': '0x1a77d9f5e760586172f8dc2ce0e6c5ef7c5d4678', // USDC
  '0xfd739d4e423301ce9385c1fb8850539d657c296d': '0x91285dd34175f30a6ad4900877f9d2aa2bb7c558', // kHYPE
  '0xb8ce59fc3717ada4c02eadf9682a9e934f625ebb': '0x52c99cbb47d07f60e2b64ad201841302302dac07', // USD0
  '0x5555555555555555555555555555555555555555': '0x297c863b649c6819f8263bd27066a59af555f359', // HYPE → wHYPE pool (USDC ~192% campaign)
  '0x94e8396e0869c9f2200760af0621afd240e1cf38': '0x5f55eca48d7e40bfa26bc4d8c6cab74addd587ee', // wstHYPE → 1.5M Purr pts/day
};

export type MerklMarketEntry = {
  apr: number;
  dailyRewards: number;
  tvlUsd: number;
  opportunityId: string;
  name: string;
  rewardToken: string;
  hasMerkl: boolean;
};

function extractAprAndRewards(opp: any): { apr: number; dailyRewards: number } {
  // Use API apr if already computed (e.g. wstHYPE USDC campaign)
  const apiApr = Number(opp.apr ?? 0);
  if (apiApr > 0) {
    return { apr: apiApr, dailyRewards: Number(opp.dailyRewards ?? 0) };
  }

  const breakdowns: any[] = opp.rewardsRecord?.breakdowns ?? [];
  const tvlUsd = Number(opp.tvl ?? 0);
  let totalDailyRewards = 0;
  let computedApr = 0;

  for (const bd of breakdowns) {
    const dailyAmount = Number(bd.value ?? 0);
    totalDailyRewards += dailyAmount;

    // Use on-chain price if available, otherwise fall back to PURR_POINT_PRICE_USD
    const onChainPrice = Number(bd.token?.price ?? 0);
    const effectivePrice = onChainPrice > 0 ? onChainPrice : PURR_POINT_PRICE_USD;

    if (effectivePrice > 0 && tvlUsd > 0) {
      computedApr += ((dailyAmount * effectivePrice * 365) / tvlUsd) * 100;
    }
  }

  return { apr: computedApr, dailyRewards: totalDailyRewards };
}

export function buildMerklMarketMap(
  opps: any[],
  _chainId: number
): Record<string, MerklMarketEntry> {
  const poolToUnderlying: Record<string, string> = {};
  for (const [underlying, pool] of Object.entries(UNDERLYING_TO_POOL)) {
    poolToUnderlying[pool.toLowerCase()] = underlying.toLowerCase();
  }

  const map: Record<string, MerklMarketEntry> = {};

  for (const opp of opps) {
    const poolAddress = (
      opp._poolAddress ||
      opp.identifier ||
      opp.explorerAddress ||
      ''
    ).toLowerCase();
    if (!poolAddress) continue;

    const underlyingAsset = poolToUnderlying[poolAddress];
    if (!underlyingAsset) {
      console.warn('MERKL: no underlying mapping for pool', poolAddress);
      continue;
    }

    const { apr, dailyRewards } = extractAprAndRewards(opp);
    const hasMerkl = opp.status === 'LIVE' || Number(opp.liveCampaigns ?? 0) > 0;
    const tvlUsd = Number(opp.tvl ?? 0);
    const rewardToken =
      opp.rewardsRecord?.breakdowns?.[0]?.token?.displaySymbol ??
      opp.rewardsRecord?.breakdowns?.[0]?.token?.symbol ??
      'Purr points';

    map[underlyingAsset] = {
      apr,
      dailyRewards,
      tvlUsd,
      opportunityId: String(opp.id ?? ''),
      name: opp.name ?? '',
      rewardToken,
      hasMerkl,
    };

    console.log(
      'MERKL MAP OK',
      opp.name,
      '| underlying:',
      underlyingAsset.slice(0, 10),
      '| apr:',
      apr.toFixed(2),
      '| tvl:',
      tvlUsd.toFixed(2)
    );
  }

  return map;
}

export function getMerklAprForAsset(
  map: Record<string, MerklMarketEntry>,
  underlyingAsset: string
): number {
  return map[underlyingAsset.toLowerCase()]?.apr ?? 0;
}

export function hasMerklCampaign(
  map: Record<string, MerklMarketEntry>,
  underlyingAsset: string
): boolean {
  return map[underlyingAsset.toLowerCase()]?.hasMerkl ?? false;
}
