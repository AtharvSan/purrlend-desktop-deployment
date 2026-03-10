export function mapMerklLeaderboard(raw: any): any[] {
  const list =
    raw?.users ||
    raw?.leaderboard ||
    raw?.data ||
    [];

  return list
    .map((u: any) => ({
      address: u.address || u.user || '',
      points: Number(u.points || u.score || 0),
      usd: Number(u.rewardsUsd || u.usd || 0),
    }))
    .filter((u: any) => u.address)
    .sort((a: any, b: any) => b.points - a.points);
}
