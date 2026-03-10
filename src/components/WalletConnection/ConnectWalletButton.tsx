import { Trans } from '@lingui/macro';
import { Button } from '@mui/material';
import { useWalletModalContext } from 'src/hooks/useWalletModal';

import { WalletModal } from './WalletModal';

export const ConnectWalletButton = () => {
  const { setWalletModalOpen } = useWalletModalContext();

  return (
    <>
      <Button
        variant="purrButton"
        onClick={() => setWalletModalOpen(true)}
        sx={{
          fontSize: '18px',
          fontWeight: 600,
          fontStyle: 'semibold',
          letterSpacing: '-0.02em',
          borderRadius: '12px',
          border: 1,
          borderColor: 'rgba(255, 255, 255, 0.2)',
          width: '240px',
          height: '50px',
          padding: '16px',
          // gap: 10,
          boxShadow: '0px 4px 10px 0 rgba(255, 126, 9, 0.39)',
        }}
      >
        <Trans>Connect wallet</Trans>
      </Button>
      <WalletModal />
    </>
  );
};
