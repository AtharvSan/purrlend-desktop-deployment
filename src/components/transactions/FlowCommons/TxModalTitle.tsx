import { Box, Typography } from '@mui/material';
import { ReactNode } from 'react';

export type TxModalTitleProps = {
  title: ReactNode;
  symbol?: string;
};

export const TxModalTitle = ({ title, symbol }: TxModalTitleProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        // backgroundColor: 'red'
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '3px',
          height: '31px',
          left: '-25px',
          top: '-3px',
          backgroundColor: '#FF7E09',
        }}
      />

      <Typography
        sx={{
          fontWeight: 600,
          fontSize: '24px',
          lineHeight: '1em',
          letterSpacing: '-0.02em',
          color: '#061512',
          pb: '25px',
          // pt:'10px',
        }}
      >
        {title} {symbol ?? ''}
      </Typography>
    </Box>
  );
};
