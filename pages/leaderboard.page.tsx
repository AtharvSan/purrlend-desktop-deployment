import { Box, Typography } from '@mui/material';
import Head from 'next/head';
import { ReactElement } from 'react';
import { ContentContainer } from 'src/components/ContentContainer';
import { MerklLeaderboard } from 'src/components/merkl/MerklLeaderboard';
import { MainLayout } from 'src/layouts/MainLayout';
import { MarketsTopPanel } from 'src/modules/markets/MarketsTopPanel';

export default function LeaderboardPage() {
  console.log('LeaderboardPage mounted');

  return (
    <>
      <Head>
        <title>Merkl Leaderboard — Purrlend</title>
      </Head>

      {/* Top green market banner (keeps visual consistency with Markets page) */}
      <MarketsTopPanel />

      <ContentContainer>
        <Box sx={{ mt: 4, mb: 6 }}>
          {/* Page header */}

          {/* Leaderboard table/card */}
          <MerklLeaderboard />
        </Box>
      </ContentContainer>
    </>
  );
}

LeaderboardPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
