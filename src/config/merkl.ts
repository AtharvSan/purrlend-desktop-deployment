// ─────────────────────────────────────────────────────────────────────────────
// Merkl Campaign Configuration
// Update campaign IDs here when creating new campaigns on Merkl Studio
// ─────────────────────────────────────────────────────────────────────────────

export const MERKL_POINT_PRICE_USD = 0.0069;
export const MERKL_DEBUG = true;

export const MERKL_CONFIG = {
  ENABLED: true,
  POINT_PRICE_USD: 0.0069,
  SUPPORTED_CHAINS: [999],
  API_BASE: 'https://api.merkl.xyz/v4',
  DISTRIBUTOR: '0xYOUR_DISTRIBUTOR',
  UI: {
    SHOW_REWARDS_PANEL: true,
    SHOW_APR_BOOST: true,
    SHOW_TAGS: true,
  },
  DEBUG: true,
};

/**
 * Campaign IDs (bytes32) from Merkl dashboard.
 * To find missing IDs, run in browser console:
 *
 * fetch('https://api.merkl.xyz/v4/campaigns?mainParameter=0x297c863b649c6819f8263bd27066A59af555f359&chainId=999')
 *   .then(r=>r.json()).then(d=>d.map(c=>({id:c.campaignId, name:c.name})))
 *
 * Replace pool address with each pool from MERKL_POOL_ADDRESSES below.
 */
export const MERKL_CAMPAIGN_IDS: Record<string, string> = {
  // ── Latest USDC campaigns (renewed Feb 20, 2026) ───────────────────────────
  WHYPE_USDC_V3: '0xbc5377d3326d0aa6e2c6895338d1a16ee7c6a307a997a723ab504c37d30ea897',
  USDC_USDC_V3: '0xa6a39fe7c1a132dda2816706e1c58e3e569105770188caf127df69fb4ff8ed44',
  KHYPE_USDC_V3: '0xac6ee25a6c0e8ba505e8d2db5853880f2061a8fd31a6f79dbf410b2c77cecf07',

  // ── Previous USDC campaigns (Feb 15-20, 2026) ──────────────────────────────
  WHYPE_USDC_V2: '0x6f551f557323d04b49a6a74b3e6a7a737c64ecb2648a0b0d070dc602ecf58c08',
  USDC_USDC_V2: '0x3d936c12fd009febd91bc86d3495ae2add2b3b0769f91bf56525c7b138e32409',
  KHYPE_USDC_V2: '0x3cec09cd1e99b1e62438ed72ecb70ad21bc67f0a62d5e98b7679e94908b81916',

  // ── Original campaigns (kept for leaderboard history) ──────────────────────
  WHYPE_USDC_V1: '0x2a4723824f1d1e3beb35a3cb12b65855566486d5a6c5a221070e1f558502bb4f',
  UBTC_PURR: '0x3e4977cdd02777835f074610aa4ef050bb9e2dffe44235b0a19aaf00c2149953',
  UETH_PURR: '0xd7aab1e6ed510e070e96d93e7ce65bfa1abaafbc4a6c4a1d8faffa1556500fcd',
  USDC_PURR: '0x0ebc8cd0da45d9b9cc217e837d3a60b060742bb1d0268fd3ef20b47b7b0e13a3',
  KHYPE_PURR: '0x3981b7a2e4412f01e7fe46b109340e58196f3112bf3f811a36877beb3419601c',
  USD0_PURR: '0xfca5c78fc6d1a2d7089a943a1c54c790776219d335d938d0c194cb397771873e',
  WSTHYPE_PURR: '0xa412b100bc563686dce862c3fc6a0f6e118070b64c6032433d41c9478c74d9a9',
};

export const MERKL_POOL_ADDRESSES = [
  '0xFf85D9EA6bd235152B6D7950f826de8b0FB7AFaB', // UBTC
  '0x0A1AD69bd2Cf51089A5129f10B8a8b0a655458DB', // UETH
  '0x1A77d9f5E760586172F8dc2cE0e6c5ef7C5d4678', // USDC
  '0x5F55eca48d7e40bFA26Bc4D8c6CAB74ADdD587EE', // USD0
  '0x91285dd34175F30a6ad4900877F9D2aa2bB7C558', // kHYPE
  '0x52C99cbb47D07F60E2B64ad201841302302DAc07', // wstHYPE
  '0x297c863b649c6819f8263bd27066A59af555f359', // wHYPE (wrapped base asset)
] as const;

export const MERKL_POOL_ADDRESS_SET = new Set(MERKL_POOL_ADDRESSES.map((a) => a.toLowerCase()));

export const MERKL_ALL_CAMPAIGN_IDS = Object.values(MERKL_CAMPAIGN_IDS);
