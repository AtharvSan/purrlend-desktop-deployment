import { useWalletModalContext } from 'src/hooks/useWalletModal';

import { BasicModal } from '../primitives/BasicModal';
import { WalletSelector } from './WalletSelector';
import { AlignHorizontalCenter } from '@mui/icons-material';

export const WalletModal = () => {
  const { isWalletModalOpen, setWalletModalOpen } = useWalletModalContext();

  return (
    <BasicModal open={isWalletModalOpen} setOpen={setWalletModalOpen}>
      <WalletSelector />
    </BasicModal>
  );
};
