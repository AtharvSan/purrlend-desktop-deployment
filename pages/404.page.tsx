// import { Trans } from '@lingui/macro';
import { Box, Typography, useTheme } from '@mui/material';
import { ContentContainer } from 'src/components/ContentContainer';
import { MainLayout } from 'src/layouts/MainLayout';
import { uiConfig } from 'src/uiConfig';

export default function Aave404Page() {

  return (
    <>
      {/* <TopInfoPanel /> */}
      <ContentContainer>
        {/* <Paper
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            p: 4,
            flex: 1,
            backgroundColor: theme.palette.mode === 'dark' ? 'transparent' : '',
          }}
        >
          <Box sx={{ maxWidth: 444, m: '0 auto' }}>
            <img width="100%" height="auto" src="/404/404.svg" alt="404 - Page not found" />
          </Box>
          <Typography variant="display1" sx={{ mt: 2 }}>
            <Trans>Page not found</Trans>
          </Typography>
          <Typography sx={{ mt: 3, mb: 5, maxWidth: 480 }}>
            <Trans>Sorry, we couldn&apos;t find the page you were looking for.</Trans>
            <br />
            <Trans>We suggest you go back to the Dashboard.</Trans>
          </Typography>
          <Link href="/" passHref>
            <Button variant="outlined" color="primary">
              <Trans>Back to Dashboard</Trans>
            </Button>
          </Link>
        </Paper> */}
        <Box sx={{
          mx: '8%',
          mt: '15%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          }}>
          <Box sx={{
            display: 'inline-flex', 
            justifyContent: 'center', 
            position: 'relative',
          }}>
            <img src={uiConfig.cs1} height={66}/>
          </Box>
          <Box sx={{
            display: 'inline-flex', 
            justifyContent: 'center', 
            position: 'relative',
            top: '-50px',
          }}>
            <img src={uiConfig.cs2} width={1000}/>
          </Box>

          <Box sx={{
            display: 'inline-flex', 
            justifyContent: 'center', 
            position: 'relative',
            top: '-165px'
            }}>
            <img src={uiConfig.stakeVault} width={382} /></Box>
          
          <Box sx={{
            display: 'inline-flex', 
            justifyContent: 'center', 
            position: 'relative',
            top: '-150px',
            }}>
            <Typography sx={{
              fontWeight: 400,
              fontSize: '20px',
              lineHeight: '1em',
              letterSpacing: '-0.02em',
              color: '#828282',
            }}>Stay tuned for our vault features.</Typography></Box>
        </Box>

      </ContentContainer>
    </>
  );
}

Aave404Page.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
