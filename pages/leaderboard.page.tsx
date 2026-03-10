import { ReactElement } from 'react';
import Head from 'next/head';
import { Box, Typography } from '@mui/material';

import { MainLayout } from 'src/layouts/MainLayout';
import { ContentContainer } from 'src/components/ContentContainer';
import { MarketsTopPanel } from 'src/modules/markets/MarketsTopPanel';
import { MerklLeaderboard } from 'src/components/merkl/MerklLeaderboard';

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
