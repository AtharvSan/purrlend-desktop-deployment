import { useEffect, useState } from 'react';
import { getMerklLeaderboard } from 'src/services/merklLeaderboardService';

/**
 * BUG FIX: Previous hook called getMerklLeaderboard() with no arguments,
 * but the service expects addresses: string[]. This caused a TypeScript error
 * and always returned an empty leaderboard.
 *
 * Pass in the list of wallet addresses to rank.
 * Typically you'd source these from your own protocol's depositor list.
 */
export function useMerklLeaderboard(addresses: string[] = []) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!addresses.length) {
      setData([]);
      return;
    }

    setLoading(true);

    getMerklLeaderboard(addresses)
      .then(setData)
      .catch((e) => {
        console.error('MERKL leaderboard error', e);
        setData([]);
      })
      .finally(() => setLoading(false));

    // Re-run if the address list changes (stable reference check)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addresses.join(',')]);

  return { data, loading };
}