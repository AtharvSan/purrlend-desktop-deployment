import { Trans } from '@lingui/macro';
import { CircularProgress, Paper, PaperProps, Typography } from '@mui/material';
import { ReactNode } from 'react';

import PurrWallet from '/public/purrWallet.svg';

import { ConnectWalletButton } from './WalletConnection/ConnectWalletButton';

interface ConnectWalletPaperProps extends PaperProps {
  loading?: boolean;
  description?: ReactNode;
}

export const ConnectWalletPaper = ({
  loading,
  description,
  sx,
  ...rest
}: ConnectWalletPaperProps) => {
  return (
    <Paper
      {...rest}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        // p: 4,
        // backgroundColor:'red',
        flex: 1,
        width: '579px',
        height: '494px',
        top: 203,
        paddingTop: 9,
        paddingBottom: 10,
        borderRadius: 3,
        borderWidth: 1,
        ...sx,
      }}
    >
      <PurrWallet style={{ marginBottom: '16px'}} /> 
      <>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <Typography variant="h2" sx={{ 
                mb: 2,
                fontSize: '24px',
                fontWeight: 500,
                letterSpacing: '-0.02em',
                fontStyle: 'medium',
              }}>
              <Trans>Connect wallet to get started!</Trans>
            </Typography>
            <Typography sx={{ 
              mb: 6,
              width: '427px',
              fontWeight: 400,
              fontSize: '16px',
              mb: '35px',
              lineHeight: '1.35em',
              letterSpacing: '-0.02em',
              color: '#828282',
             }}>
              {description || (
                <Trans>
                  Please connect your wallet to see your supplies, borrowings, and open positions.
                </Trans>
              )}
            </Typography>
            <ConnectWalletButton />
          </>
        )}
      </>
    </Paper>
  );
};
