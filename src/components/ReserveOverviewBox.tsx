import { Box, Typography } from '@mui/material';
import React, { ReactNode } from 'react';

type ReserveOverviewBoxProps = {
  children: ReactNode;
  title?: ReactNode;
  fullWidth?: boolean;
};

export function ReserveOverviewBox({
  title,
  children,
  fullWidth = false,
}: ReserveOverviewBoxProps) {
  return (
    <Box // these are the bordered containers
      sx={(theme) => ({
        flex: fullWidth ? '0 100%' : '0 32%',
        // backgroundColor: 'red',
        height: { md: '70px', lg: '60px' },
        maxWidth: fullWidth ? '100%' : '32%',
      })}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'space-around',
          px: '12px',
          gap: '10px',
        }}
      >
        {title && (
          <Typography variant="secondary14" color="text.secondary" component="span">
            {title}
          </Typography>
        )}
        {children}
      </Box>
    </Box>
  );
}
