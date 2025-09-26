import { InformationCircleIcon } from '@heroicons/react/outline';
import { Trans } from '@lingui/macro';
import {
  Button,
  Slide,
  SvgIcon,
  Typography,
  useMediaQuery,
  useScrollTrigger,
  useTheme,
} from '@mui/material';
import Box from '@mui/material/Box';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { ContentWithTooltip } from 'src/components/ContentWithTooltip';
import { ENABLE_TESTNET } from 'src/utils/marketsAndNetworksConfig';

import { Link } from '../components/primitives/Link';
import { uiConfig } from '../uiConfig';
import { NavItems } from './components/NavItems';
import { MobileMenu } from './MobileMenu';
import { SettingsMenu } from './SettingsMenu';
import WalletWidget from './WalletWidget';

interface Props {
  children: React.ReactElement;
}

function HideOnScroll({ children }: Props) {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export function AppHeader() {
  const { breakpoints } = useTheme();
  const md = useMediaQuery(breakpoints.down('md'));
  const sm = useMediaQuery(breakpoints.down('sm'));

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [walletWidgetOpen, setWalletWidgetOpen] = useState(false);

  useEffect(() => {
    if (mobileMenuOpen && !md) {
      setMobileMenuOpen(false);
    }
    if (walletWidgetOpen) {
      setWalletWidgetOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [md]);

  const headerHeight = 48;

  const disableTestnet = () => {
    localStorage.setItem('testnetsEnabled', 'false');
    // Set window.location to trigger a page reload when navigating to the the dashboard
    window.location.href = '/';
  };

  const testnetTooltip = (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: 1 }}>
      <Typography variant="subheader1">
        <Trans>Testnet mode is ON</Trans>
      </Typography>
      <Typography variant="description">
        <Trans>The app is running in testnet mode. Learn how it works in</Trans>{' '}
        <Link
          href="https://docs.aave.com/faq/testing-aave"
          style={{ fontSize: '14px', fontWeight: 400, textDecoration: 'underline' }}
        >
          FAQ.
        </Link>
      </Typography>
      <Button variant="outlined" sx={{ mt: '12px' }} onClick={disableTestnet}>
        <Trans>Disable testnet</Trans>
      </Button>
    </Box>
  );

  return (
    <HideOnScroll>
      <Box
        component="header"
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        sx={(theme) => ({
          height: 54,
          position: 'sticky',
          top: 8,
          transition: theme.transitions.create('top'),
          zIndex: theme.zIndex.appBar,
          padding: {
            xs: mobileMenuOpen || walletWidgetOpen ? '8px 20px' : '8px 8px 8px 20px',
            xsm: '8px 20px',
            lg: '8px 0px 8px 0px'
          },
          // mx: '8.333%',
          width: '1199px',
          mx: 'auto',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',

        })}
      >
        <Box sx={{ 
        height: '54px',
        width: '54px',
        backgroundColor: '#FFFFFF',
        p: '12px',
        borderRadius: '16px',
        boxShadow: '0px 3px 5px 0px #0000000A',
        }}>
          <Box
          component={Link}
          href="/"
          aria-label="Go to homepage"
          onClick={() => setMobileMenuOpen(false)}
          sx={{
          '&:hover': { opacity: 0.7 },
          }}>
            <img src={uiConfig.appLogo} alt="An SVG of an eye" />
          </Box>
        </Box>

        {/* <Box sx={{ mr: sm ? 1 : 3 }}>
          {ENABLE_TESTNET && (
            <ContentWithTooltip tooltipContent={testnetTooltip} offset={[0, -4]} withoutHover>
              <Button
                variant="surface"
                size="small"
                color="primary"
                sx={{
                  backgroundColor: '#B6509E',
                  '&:hover, &.Mui-focusVisible': { backgroundColor: 'rgba(182, 80, 158, 0.7)' },
                }}
              >
                TESTNET
                <SvgIcon sx={{ marginLeft: '2px', fontSize: '16px' }}>
                  <InformationCircleIcon />
                </SvgIcon>
              </Button>
            </ContentWithTooltip>
          )}
        </Box> */}
        
        <Box sx={{ 
          height: '54px',
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          p: '8px 8px 8px 12px',
          boxShadow: '0px 3px 5px 0px #0000000A',
        }}>
          <Box sx={{ 
            display: { xs: 'none', md: 'block' },

            ml: '24.5px',
            }}>
            <NavItems />
          </Box>

          {!mobileMenuOpen && (
            <WalletWidget
              open={walletWidgetOpen}
              setOpen={setWalletWidgetOpen}
              headerHeight={headerHeight}
            />
          )}

          {/* <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <SettingsMenu />
          </Box> */}

          {!walletWidgetOpen && (
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <MobileMenu
                open={mobileMenuOpen}
                setOpen={setMobileMenuOpen}
                headerHeight={headerHeight}
              />
            </Box>
          )}
        </Box>
      </Box>
    </HideOnScroll>
  );
}
