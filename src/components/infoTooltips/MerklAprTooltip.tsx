import { Tooltip, Typography } from '@mui/material';

export const MerklAprTooltip = ({ children }: { children: React.ReactNode }) => {
  return (
    <Tooltip
      title={
        <Typography fontSize="12px">
          Extra APR from Merkl incentive campaign. Rewards are distributed separately from base
          protocol yield.
        </Typography>
      }
      arrow
    >
      <span>{children}</span>
    </Tooltip>
  );
};
