import { Trans } from '@lingui/macro';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import StyledToggleButton from 'src/components/StyledToggleButton';
import StyledToggleButtonGroup from 'src/components/StyledToggleButtonGroup';
import {
  ComputedReserveData,
  useAppDataContext,
} from 'src/hooks/app-data-provider/useAppDataProvider';
import { AssetCapsProvider } from 'src/hooks/useAssetCaps';
import { MainLayout } from 'src/layouts/MainLayout';
import { ReserveActions } from 'src/modules/reserve-overview/ReserveActions';
import { ReserveConfiguration } from 'src/modules/reserve-overview/ReserveConfiguration';
import { ReserveTopDetails } from 'src/modules/reserve-overview/ReserveTopDetails';

import { ContentContainer } from '../src/components/ContentContainer';

export default function ReserveOverview() {
  const router = useRouter();
  const { reserves } = useAppDataContext();
  const underlyingAsset = router.query.underlyingAsset as string;
  const { breakpoints } = useTheme();
  const lg = useMediaQuery(breakpoints.up('lg'));

  const [mode, setMode] = useState<'overview' | 'actions' | ''>('');

  useEffect(() => {
    if (!mode) setMode('overview');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lg]);

  const reserve = reserves.find(
    (reserve) => reserve.underlyingAsset === underlyingAsset
  ) as ComputedReserveData;

  const isOverview = mode === 'overview';

  return (
    <AssetCapsProvider asset={reserve}>
      <ReserveTopDetails underlyingAsset={underlyingAsset} />

      <ContentContainer>
        <Box
          sx={{
            display: { xs: 'flex', lg: 'none' },
            justifyContent: { xs: 'center', xsm: 'flex-start' },
            mb: { xs: 2, xsm: 4 },
          }}
        >
          <StyledToggleButtonGroup
            color="primary"
            value={mode}
            exclusive
            onChange={(_, value) => setMode(value)}
            sx={{
              width: { xs: '96%', xsm: '359px' },
              height: '44px',
            }}
          >
            <StyledToggleButton value="overview" disabled={mode === 'overview'}>
              <Typography
                variant="subheader1"
                sx={{
                  fontWeight: 500,
                  fontSize: '14px',
                  lineHeight: '1em',
                  letterSpacing: '-0.02em',
                }}
              >
                <Trans>Supply Info</Trans>
              </Typography>
            </StyledToggleButton>
            <StyledToggleButton value="actions" disabled={mode === 'actions'}>
              <Typography
                variant="subheader1"
                sx={{
                  fontWeight: 500,
                  fontSize: '14px',
                  lineHeight: '1em',
                  letterSpacing: '-0.02em',
                }}
              >
                <Trans>Your Wallet</Trans>
              </Typography>
            </StyledToggleButton>
          </StyledToggleButtonGroup>
        </Box>

        {/* <Box 
          sx={{ 
            display: 'flex',
            flexDirection: 'row',
            justifyContent: {xs: 'center', md: 'space-between'},
            // backgroundColor: 'red',
            width: {xs: '100%', md: '1199px'},
            // mx: 'auto',
          }}>
          <Box
            sx={{
              display: { xs: !isOverview ? 'none' : 'block', lg: 'block' },
              width: { xs: '100%', lg: 'calc(100% - 355px)' },
              // mr: { xs: 0, lg: 4 },
              // mr: '25px',
            }}
          >
            {reserve && <ReserveConfiguration reserve={reserve} />}
          </Box>

          <Box
            sx={{
              display: { xs: isOverview ? 'none' : 'block', lg: 'block' },
              // backgroundColor: 'blue',
              width: '90%',
              // justifyContent: 'center',
            }}
          >
            <ReserveActions reserve={reserve} />
          </Box>
        </Box> */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', lg: 'row' },
            alignItems: 'flex-start',
            justifyContent: { xs: 'center', lg: 'space-between' },
            width: '100%',
            maxWidth: '1199px',
            mx: 'auto',
          }}
        >
          <Box
            sx={{
              display: { xs: !isOverview ? 'none' : 'block', lg: 'block' },
              flex: { lg: '1 1 70%' },
              width: '96%',
              // backgroundColor: 'red',
              mx: 'auto',
            }}
          >
            {reserve && <ReserveConfiguration reserve={reserve} />}
          </Box>

          <Box
            sx={{
              display: { xs: isOverview ? 'none' : 'block', lg: 'block' },
              flex: { lg: '1 1 30%' },
              width: '100%',
              mt: { xs: 3, lg: 0 },
            }}
          >
            <ReserveActions reserve={reserve} />
          </Box>
        </Box>
      </ContentContainer>
    </AssetCapsProvider>
  );
}

ReserveOverview.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
