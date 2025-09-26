import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { ReactNode } from 'react';

import { NetworkConfig } from '../../ui-config/networksConfig';
// import { BridgeButton } from '../BridgeButton';
import { getMarketHelpData, MarketLogo, MarketSwitcher } from '../MarketSwitcher';
import React from 'react';

export interface PageTitleProps extends Pick<NetworkConfig, 'bridge'> {
  pageTitle?: ReactNode;
  withMarketSwitcher?: boolean;
}

export const PageTitle = ({ pageTitle, withMarketSwitcher }: PageTitleProps) => {
  const theme = useTheme();
  const upToLG = useMediaQuery(theme.breakpoints.up('lg'));
  // const upToMD = useMediaQuery(theme.breakpoints.up('md'));
  const downToXSM = useMediaQuery(theme.breakpoints.down('xsm'));

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: { xs: 'flex-start', xsm: 'center' },
        mb: pageTitle ? 4 : 0,
        flexDirection: { xs: 'column', xsm: 'row' },
        marginTop: '5px',
      }}
    >
      {pageTitle && (downToXSM || !withMarketSwitcher) && (
        <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
          <Typography
            variant={downToXSM ? 'h2' : upToLG ? 'display1' : 'h1'}
            sx={{
              color: withMarketSwitcher ? 'text.muted' : 'text.white',
              mr: { xs: 5, xsm: 3 },
              mb: { xs: 1, xsm: 0 },
            }}
          >
            {pageTitle}
          </Typography>
        </Box>
      )}

      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          mb: !pageTitle ? 4 : 0,
        }}
      >
        {/* {withMarketSwitcher && <MarketSwitcher />} */}
        <Typography sx={{
          color: 'rgba(255, 255, 255, 1)',
          fontSize: '32px',
          fontWeight: 600,
          fontStyle: 'semiBold',
          lineHeight: '100%',
          letterSpacing: '-0.02em',
          paddingTop: '4px',
        }}>HyperEVM</Typography>
        {/* <BridgeButton bridge={bridge} variant="surface" withoutIcon={!upToMD} /> */}
        {/* NOTE:// Removing for now  */}
      </Box>
    </Box>
  );
};
