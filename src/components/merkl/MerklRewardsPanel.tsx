import { Box, Button, Typography } from '@mui/material';
import { useAppDataContext } from 'src/hooks/app-data-provider/useAppDataProvider';
import { useMerklClaim } from 'src/hooks/useMerklClaim';
import { useMerklRewards } from 'src/hooks/useMerklRewards';
import { useProtocolDataContext } from 'src/hooks/useProtocolDataContext';

export const MerklRewardsPanel = () => {
  console.log('MerklRewardsPanel mounted');

  const { currentChainId } = useProtocolDataContext();
  const { user } = useAppDataContext();

  const rewards = useMerklRewards(currentChainId, user?.walletAddress);
  const { claimAll, loading } = useMerklClaim(currentChainId, user?.walletAddress);

  // ✅ loading guard
  if (!rewards) {
    return (
      <Box sx={{ p: 2, borderRadius: 3, border: '1px solid #E0E0E0', mb: 2 }}>
        <Typography fontWeight={600}>Merkl Rewards</Typography>
        <Typography fontSize={14} mt={1}>
          Loading…
        </Typography>
      </Box>
    );
  }

  // ✅ hard guard
  const totalUsd = Number(rewards.totalUsd || 0);

  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 3,
        border: '1px solid #E0E0E0',
        mb: 2,
        width: '100%',
      }}
    >
      <Typography fontWeight={600}>Merkl Rewards</Typography>

      <Typography fontSize={14} mt={1}>
        ${totalUsd.toFixed(2)} available
      </Typography>

      <Button
        variant="contained"
        disabled={totalUsd === 0 || loading}
        onClick={claimAll}
        sx={{ mt: 2 }}
      >
        Claim Rewards
      </Button>
    </Box>
  );
};
