import { useState } from 'react';
import { ethers } from 'ethers';
import { getMerklClaimTxs } from 'src/services/merklClaimService';

/**
 * BUG FIX: Previous implementation tried to manually call claimMultiple() on
 * the distributor contract with ABI-encoded proofs — but the correct approach
 * with Merkl v4 is to use the pre-built transactions from /claimData.
 * The API returns {to, calldata, value} — just sign and send them.
 *
 * This also means MERKL_DISTRIBUTOR_ABI and the contract instance are no
 * longer needed in this hook.
 */
export const useMerklClaim = (chainId?: number, wallet?: string) => {
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const claimAll = async () => {
    if (!chainId || !wallet) {
      console.warn('MERKL claim: missing chainId or wallet');
      return;
    }

    setLoading(true);
    setError(null);
    setTxHash(null);

    try {
      // Fetch pre-built claim transactions from Merkl API
      const claimTxs = await getMerklClaimTxs(wallet, chainId);

      if (!claimTxs.length) {
        console.log('MERKL: no pending rewards to claim');
        return;
      }

      const provider = new ethers.providers.Web3Provider(
        (window as any).ethereum
      );
      const signer = provider.getSigner();

      // Send each pre-built claim transaction
      // (Usually just one, but Merkl can batch-split across tokens)
      for (const claimTx of claimTxs) {
        console.log('MERKL: sending claim tx to', claimTx.to);

        const tx = await signer.sendTransaction({
          to: claimTx.to,
          data: claimTx.calldata,
          value: claimTx.value ?? '0',
        });

        console.log('MERKL claim tx sent', tx.hash);
        setTxHash(tx.hash);

        await tx.wait();
        console.log('MERKL claim confirmed', tx.hash);
      }
    } catch (e: any) {
      const msg = e?.message ?? 'Unknown error';
      console.error('MERKL claim failed', msg);
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return { claimAll, loading, txHash, error };
};