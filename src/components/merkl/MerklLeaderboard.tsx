import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { Box, CircularProgress, Skeleton, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { getMerklLeaderboard, LeaderboardEntry } from 'src/services/merklLeaderboardService';

const MEDAL: Record<number, string> = { 1: '🥇', 2: '🥈', 3: '🥉' };

function formatPoints(n: number): string {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(2)}B`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(2)}K`;
  return n.toLocaleString();
}

function shortAddr(addr: string): string {
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

export const MerklLeaderboard = () => {
  const [rows, setRows] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getMerklLeaderboard()
      .then((data) => setRows(data.slice(0, 100)))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box sx={{ maxWidth: 720, mx: 'auto', py: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
        <EmojiEventsIcon sx={{ color: '#22c55e', fontSize: 28 }} />
        <Box>
          <Typography fontSize={20} fontWeight={700} color="#061512" lineHeight={1}>
            Purr Points Leaderboard
          </Typography>
          <Typography fontSize={13} color="#828282" mt={0.5}>
            Top earners across all Purrlend pools
          </Typography>
        </Box>
      </Box>

      {/* Column headers */}
      {!loading && !error && rows.length > 0 && (
        <Box
          sx={{
            display: 'flex',
            px: 2,
            pb: 1,
            borderBottom: '1px solid #EAEAEA',
          }}
        >
          <Typography
            fontSize={11}
            fontWeight={600}
            color="#828282"
            textTransform="uppercase"
            letterSpacing="0.06em"
            width={60}
          >
            Rank
          </Typography>
          <Typography
            fontSize={11}
            fontWeight={600}
            color="#828282"
            textTransform="uppercase"
            letterSpacing="0.06em"
            flex={1}
          >
            Address
          </Typography>
          <Typography
            fontSize={11}
            fontWeight={600}
            color="#828282"
            textTransform="uppercase"
            letterSpacing="0.06em"
            width={150}
            textAlign="right"
          >
            Purr Points
          </Typography>
          <Typography
            fontSize={11}
            fontWeight={600}
            color="#828282"
            textTransform="uppercase"
            letterSpacing="0.06em"
            width={110}
            textAlign="right"
          >
            USD Value
          </Typography>
        </Box>
      )}

      {/* Loading skeletons */}
      {loading && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} variant="rounded" height={52} sx={{ borderRadius: '12px' }} />
          ))}
        </Box>
      )}

      {/* Error */}
      {!loading && error && (
        <Box
          sx={{
            p: 3,
            textAlign: 'center',
            border: '1px solid #EAEAEA',
            borderRadius: '12px',
            bgcolor: '#fff',
          }}
        >
          <Typography color="error" fontSize={14}>
            Failed to load leaderboard
          </Typography>
          <Typography fontSize={12} color="#828282" mt={0.5}>
            Merkl leaderboard API may not be available yet for this opportunity
          </Typography>
        </Box>
      )}

      {/* Empty */}
      {!loading && !error && rows.length === 0 && (
        <Box
          sx={{
            p: 4,
            textAlign: 'center',
            border: '1px solid #EAEAEA',
            borderRadius: '12px',
            bgcolor: '#fff',
          }}
        >
          <Typography fontSize={14} color="#828282">
            No leaderboard data yet
          </Typography>
          <Typography fontSize={12} color="#828282" mt={0.5}>
            Rewards are distributed every few hours — check back soon
          </Typography>
        </Box>
      )}

      {/* Rows */}
      {!loading &&
        !error &&
        rows.map((r) => (
          <Box
            key={r.address}
            sx={{
              display: 'flex',
              alignItems: 'center',
              px: 2,
              py: 1.5,
              my: '4px',
              border: '1px solid',
              borderColor: r.rank <= 3 ? '#22c55e33' : '#EAEAEA',
              borderRadius: '12px',
              bgcolor: r.rank <= 3 ? '#f0fdf4' : '#fff',
              transition: 'background 0.15s',
              '&:hover': { bgcolor: '#f8f8f8' },
            }}
          >
            {/* Rank */}
            <Box width={60}>
              {MEDAL[r.rank] ? (
                <Typography fontSize={18} lineHeight={1}>
                  {MEDAL[r.rank]}
                </Typography>
              ) : (
                <Typography fontSize={14} fontWeight={600} color="#828282">
                  #{r.rank}
                </Typography>
              )}
            </Box>

            {/* Address */}
            <Box flex={1}>
              <Typography
                fontSize={14}
                fontFamily="monospace"
                color="#061512"
                sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
                onClick={() =>
                  window.open(`https://hyperevmscan.io/address/${r.address}`, '_blank')
                }
              >
                {shortAddr(r.address)}
              </Typography>
            </Box>

            {/* Points */}
            <Box width={150} textAlign="right">
              <Typography fontSize={14} fontWeight={600} color="#061512">
                {formatPoints(r.points)}
              </Typography>
              <Typography fontSize={11} color="#828282">
                Purr points
              </Typography>
            </Box>

            {/* USD */}
            <Box width={110} textAlign="right">
              <Typography
                fontSize={14}
                color={r.usd > 0 ? '#22c55e' : '#828282'}
                fontWeight={r.usd > 0 ? 600 : 400}
              >
                {r.usd > 0 ? `$${r.usd.toFixed(2)}` : '—'}
              </Typography>
            </Box>
          </Box>
        ))}
    </Box>
  );
};
