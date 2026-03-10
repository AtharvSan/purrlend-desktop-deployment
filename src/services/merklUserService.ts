export async function getMerklUserRewards(
  chainId: number,
  user: string
) {
  try {
    const res = await fetch(
      `https://api.merkl.xyz/users/${user}/rewards?chainId=${chainId}`
    );

    if (!res.ok) {
      console.warn('Merkl user rewards failed', res.status);
      return null;
    }

    return await res.json();
  } catch (e) {
    console.warn('Merkl user rewards error', e);
    return null;
  }
}
