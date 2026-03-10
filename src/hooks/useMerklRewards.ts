import { useEffect, useState, useCallback } from 'react';
import { getMerklUserRewards } from 'src/services/merklRewardsService';
import type { MerklTokenReward } from 'src/services/merklRewardsService';

type MerklRewardsState = {
  totalUsd: number;
  tokens: MerklTokenReward[];
};

export const useMerklRewards = (chainId?: number, address?: string) => {
  const [rewards, setRewards] = useState<MerklRewardsState | null>(null);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    if (!chainId || !address) {
      setRewards(null);
      return;
    }

    setLoading(true);

    try {
      const tokens = await getMerklUserRewards(chainId, address);

      // BUG FIX: previous version summed r.usdValue which doesn't exist in Merkl v4.
      // getMerklUserRewards now returns normalized MerklTokenReward[] with usdValue computed.
      const totalUsd = tokens.reduce((sum, t) => sum + t.usdValue, 0);

      setRewards({ totalUsd, tokens });

      if (process.env.NODE_ENV !== 'production') {
        console.log('MERKL rewards loaded', tokens.length, 'tokens, $', totalUsd.toFixed(2));
      }
    } catch (e) {
      console.error('MERKL rewards error', e);
      setRewards(null);
    } finally {
      setLoading(false);
    }
  }, [chainId, address]);

  useEffect(() => {
    load();
  }, [load]);

  return {
    rewards,
    loading,
    refresh: load,
  };
};