export const MERKL_DISTRIBUTOR: Record<number, { address: string }> = {
  999: {
    // ─────────────────────────────────────────────────────────────────────────
    // TODO: Replace with the real Merkl distributor address on HyperEVM.
    // Get it from: https://app.merkl.xyz or ask the Merkl team directly.
    // Do NOT guess this — a wrong address will silently eat user funds.
    // ─────────────────────────────────────────────────────────────────────────
    address: '0xYourDistributorAddressHere',
  },
};

// BUG FIX: Previous ABI used claimMultiple(address, tuple[]) which is wrong.
// The actual Merkl distributor contract uses:
//   claim(address[] users, address[] tokens, uint256[] amounts, bytes32[][] proofs)
// Source: https://github.com/AngleProtocol/merkl-contracts
export const MERKL_DISTRIBUTOR_ABI = [
  'function claim(address[] calldata users, address[] calldata tokens, uint256[] calldata amounts, bytes32[][] calldata proofs) external',
  'function claimed(address user, address token) external view returns (uint256)',
] as const;
