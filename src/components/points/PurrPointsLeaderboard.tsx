// ─────────────────────────────────────────────────────────────────────────────
// Purr Points Leaderboard
// Drop-in replacement for MerklLeaderboard
// Fetches from /api/points/leaderboard instead of Merkl API
// ─────────────────────────────────────────────────────────────────────────────

import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { Box, Skeleton, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

type LeaderboardEntry = {
  rank: number;
  wallet: string;
  totalPoints: number;
  supplyPoints: number;
  borrowPoints: number;
};

type LeaderboardResponse = {
  season: number;
  seasonStart: string;
  seasonEnd: string;
  leaderboard: LeaderboardEntry[];
};

const MEDAL: Record<number, string> = { 1: '🥇', 2: '🥈', 3: '🥉' };

function formatPoints(n: number): string {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(2)}B`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(2)}K`;
  return n.toLocaleString(undefined, { maximumFractionDigits: 0 });
}

function shortAddr(addr: string): string {
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

function daysUntil(isoDate: string): number {
  const end = new Date(isoDate).getTime();
  const now = Date.now();
  return Math.max(0, Math.ceil((end - now) / (1000 * 60 * 60 * 24)));
}

export const PurrPointsLeaderboard = () => {
  const [data, setData] = useState<LeaderboardResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/points/leaderboard?limit=100')
      .then((r) => r.json())
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const rows = data?.leaderboard ?? [];
  const daysLeft = data ? daysUntil(data.seasonEnd) : 0;

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', py: 4 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <EmojiEventsIcon sx={{ color: '#22c55e', fontSize: 32 }} />
          <Box>
            <Typography fontSize={22} fontWeight={700} color="#061512" lineHeight={1}>
              Purr Points Leaderboard
            </Typography>
            <Typography fontSize={13} color="#828282" mt={0.5}>
              Season {data?.season ?? 1} • {daysLeft} days remaining
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Column headers */}
      {!loading && !error && rows.length > 0 && (
        <Box sx={{ display: 'flex', px: 2.5, pb: 1.5, borderBottom: '2px solid #EAEAEA' }}>
          <Typography
            fontSize={11}
            fontWeight={700}
            color="#828282"
            textTransform="uppercase"
            letterSpacing="0.08em"
            width={70}
          >
            Rank
          </Typography>
          <Typography
            fontSize={11}
            fontWeight={700}
            color="#828282"
            textTransform="uppercase"
            letterSpacing="0.08em"
            flex={1}
          >
            Wallet
          </Typography>
          <Typography
            fontSize={11}
            fontWeight={700}
            color="#828282"
            textTransform="uppercase"
            letterSpacing="0.08em"
            width={110}
            textAlign="right"
          >
            Supply
          </Typography>
          <Typography
            fontSize={11}
            fontWeight={700}
            color="#828282"
            textTransform="uppercase"
            letterSpacing="0.08em"
            width={110}
            textAlign="right"
          >
            Borrow
          </Typography>
          <Typography
            fontSize={11}
            fontWeight={700}
            color="#828282"
            textTransform="uppercase"
            letterSpacing="0.08em"
            width={130}
            textAlign="right"
          >
            Total
          </Typography>
        </Box>
      )}

      {/* Loading */}
      {loading && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mt: 2 }}>
          {Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} variant="rounded" height={60} sx={{ borderRadius: '14px' }} />
          ))}
        </Box>
      )}

      {/* Error */}
      {!loading && error && (
        <Box
          sx={{
            p: 4,
            textAlign: 'center',
            border: '1px solid #EAEAEA',
            borderRadius: '14px',
            mt: 2,
          }}
        >
          <Typography color="error" fontSize={14}>
            Failed to load leaderboard
          </Typography>
          <Typography fontSize={12} color="#828282" mt={0.5}>
            {error}
          </Typography>
        </Box>
      )}

      {/* Empty */}
      {!loading && !error && rows.length === 0 && (
        <Box
          sx={{
            p: 5,
            textAlign: 'center',
            border: '1px solid #EAEAEA',
            borderRadius: '14px',
            mt: 2,
          }}
        >
          <Typography fontSize={15} color="#828282" fontWeight={500}>
            No points earned yet
          </Typography>
          <Typography fontSize={13} color="#828282" mt={0.5}>
            First snapshot runs at the top of the next hour
          </Typography>
        </Box>
      )}

      {/* Rows */}
      {!loading &&
        !error &&
        rows.map((r) => (
          <Box
            key={r.wallet}
            sx={{
              display: 'flex',
              alignItems: 'center',
              px: 2.5,
              py: 2,
              my: '6px',
              border: '1px solid',
              borderColor: r.rank <= 3 ? '#22c55e44' : '#EAEAEA',
              borderRadius: '14px',
              bgcolor: r.rank <= 3 ? '#f0fdf4' : '#FFFFFF',
              transition: 'all 0.2s',
              '&:hover': {
                bgcolor: r.rank <= 3 ? '#e6f7ed' : '#f8f8f8',
                transform: 'translateX(4px)',
              },
            }}
          >
            {/* Rank */}
            <Box width={70}>
              {MEDAL[r.rank] ? (
                <Typography fontSize={20} lineHeight={1}>
                  {MEDAL[r.rank]}
                </Typography>
              ) : (
                <Typography fontSize={15} fontWeight={700} color="#828282">
                  #{r.rank}
                </Typography>
              )}
            </Box>

            {/* Wallet */}
            <Box flex={1}>
              <Typography
                fontSize={15}
                fontFamily="monospace"
                fontWeight={500}
                color="#061512"
                sx={{
                  cursor: 'pointer',
                  '&:hover': { textDecoration: 'underline', color: '#22c55e' },
                }}
                onClick={() => window.open(`https://hyperscan.xyz/address/${r.wallet}`, '_blank')}
              >
                {shortAddr(r.wallet)}
              </Typography>
            </Box>

            {/* Supply points */}
            <Box width={110} textAlign="right">
              <Typography fontSize={14} color="#828282">
                {formatPoints(r.supplyPoints)}
              </Typography>
            </Box>

            {/* Borrow points */}
            <Box width={110} textAlign="right">
              <Typography fontSize={14} color="#828282">
                {formatPoints(r.borrowPoints)}
              </Typography>
            </Box>

            {/* Total */}
            <Box width={130} textAlign="right">
              <Typography fontSize={16} fontWeight={700} color="#22c55e">
                {formatPoints(r.totalPoints)}
              </Typography>
            </Box>
          </Box>
        ))}

      {/* Footer note */}
      {!loading && !error && rows.length > 0 && (
        <Box
          sx={{
            mt: 4,
            p: 2.5,
            backgroundColor: '#f8f8f8',
            borderRadius: '12px',
            border: '1px solid #EAEAEA',
          }}
        >
          <Typography fontSize={12} color="#828282" lineHeight={1.6}>
            💡 Points are awarded every hour based on your supply and borrow positions. Season{' '}
            {data?.season} ends on{' '}
            {data?.seasonEnd ? new Date(data.seasonEnd).toLocaleDateString() : '...'} — claim your
            tokens after the season ends!
          </Typography>
        </Box>
      )}
    </Box>
  );
};
