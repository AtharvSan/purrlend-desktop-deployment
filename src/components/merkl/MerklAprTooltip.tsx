import { Tooltip, Box, Typography } from '@mui/material';

export const MerklAprTooltip = ({ baseApr, merklApr }: {
  baseApr: number;
  merklApr: number;
}) => {
  const total = baseApr + merklApr;

  return (
    <Tooltip
      title={
        <Box>
          <Typography fontSize={13}>Supply APR Breakdown</Typography>
          <Typography fontSize={12}>Base APY: {baseApr.toFixed(2)}%</Typography>
          <Typography fontSize={12}>Merkl Rewards: +{merklApr.toFixed(2)}%</Typography>
          <Typography fontSize={12} fontWeight={600}>
            Total: {total.toFixed(2)}%
          </Typography>
        </Box>
      }
      arrow
      placement="top"
    >
      <span>ⓘ</span>
    </Tooltip>
  );
};
