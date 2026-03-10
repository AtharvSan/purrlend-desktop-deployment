import { Trans } from '@lingui/macro';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import React from 'react';

import { FormattedNumber } from './primitives/FormattedNumber';

type ReserveSubheaderProps = {
  value: string;
  rightAlign?: boolean;
  fs: string;
};

export function ReserveSubheader({ value, rightAlign, fs }: ReserveSubheaderProps) {
  return (
    <Box
      sx={{
        p: rightAlign ? { xs: '0', xsm: '2px 0' } : { xs: '0', xsm: '3.625px 0px' },
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {value === 'Disabled' ? (
        <Typography component="span" sx={{ mr: 0.5 }} variant="secondary12" color="text.muted">
          (<Trans>Disabled</Trans>)
        </Typography>
      ) : (
        <FormattedNumber
          value={value}
          variant="secondary12"
          color="text.secondary"
          symbolsVariant="secondary14"
          symbolsColor="rgba(130, 130, 130, 1)"
          symbol="USD"
          sx={{
            fontSize: { xs: fs, md: '16px' },
            fontWeight: 400,
            fontStyle: 'regular',
            letterSpacing: '-2%',
            lineHeight: '100%',
            color: 'rgba(130, 130, 130, 1)',
          }}
        />
      )}
    </Box>
  );
}
