// import { BookOpenIcon, CreditCardIcon, QuestionMarkCircleIcon } from '@heroicons/react/outline';
// import { t } from '@lingui/macro';
// import { ReactNode } from 'react';
// import { ROUTES } from 'src/components/primitives/Link';
// import { ENABLE_TESTNET } from 'src/utils/marketsAndNetworksConfig';

// import DiscordIcon from '/public/icons/discord.svg';
// import GithubIcon from '/public/icons/github.svg';
// import OracleArrow from '/public/oracleArrow.svg';

// import { MarketDataType } from '../marketsConfig';
// import { uiConfig } from 'src/uiConfig';
// import Box from '@mui/material/Box';
// import { Typography } from '@mui/material';

// interface Navigation {
//   link: string;
//   title: string | ReactNode;
//   activePaths?: string[];
//   isVisible?: (data: MarketDataType) => boolean | undefined;
//   dataCy?: string;
// }

// export const navigation: Navigation[] = [
//   {
//     link: ROUTES.dashboard,
//     title: t`Dashboard`,
//     dataCy: 'menuDashboard',
//   },
//   {
//     link: ROUTES.markets,
//     title: t`Markets`,
//     dataCy: 'menuMarkets',
//     activePaths: [ROUTES.markets, ROUTES.reservesOverview]
//   },
//   {
//     link: ROUTES.staking,
//     title: t`Stake`,
//     dataCy: 'menuStake',
//     // isVisible: () =>
//     //   process.env.NEXT_PUBLIC_ENABLE_STAKING === 'true' &&
//     //   process.env.NEXT_PUBLIC_ENV === 'prod' &&
//     //   !ENABLE_TESTNET,
//   },
// {
//   link: ROUTES.info,
//   // title: t`Doc`,
//   title: (
//     <Box sx={{
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       // p: '10px',
//       gap: '4.5px',
//       }}>
//       {t`Info`}
//       <img src={uiConfig.docArrow} />
//     </Box>
//   ),
//   dataCy: 'menuDocs',
// },
//   {
//     link: ROUTES.governance,
//     title: t`Governance`,
//     dataCy: 'menuGovernance',
//     isVisible: () =>
//       process.env.NEXT_PUBLIC_ENABLE_GOVERNANCE === 'true' &&
//       process.env.NEXT_PUBLIC_ENV === 'prod' &&
//       !ENABLE_TESTNET,
//   },
//   {
//     link: ROUTES.faucet,
//     title: t`Faucet`,
//     isVisible: () => process.env.NEXT_PUBLIC_ENV === 'staging' || ENABLE_TESTNET,
//   },
// ];

// interface MoreMenuItem extends Navigation {
//   icon: ReactNode;
//   makeLink?: (walletAddress: string) => string;
// }

// const moreMenuItems: MoreMenuItem[] = [
//   {
//     link: 'https://docs.aave.com/faq/',
//     title: t`FAQ`,
//     icon: <QuestionMarkCircleIcon />,
//   },
//   {
//     link: 'https://docs.aave.com/portal/',
//     title: t`Developers`,
//     icon: <BookOpenIcon />,
//   },
//   {
//     link: 'https://discord.gg/7kHKnkDEUf',
//     title: t`Discord`,
//     icon: <DiscordIcon />,
//   },
//   {
//     link: 'https://github.com/aave/interface',
//     title: t`Github`,
//     icon: <GithubIcon />,
//   },
//   {
//     link: 'https://global.transak.com',
//     makeLink: (walletAddress) =>
//       `${process.env.NEXT_PUBLIC_TRANSAK_APP_URL}/?apiKey=${process.env.NEXT_PUBLIC_TRANSAK_API_KEY}&walletAddress=${walletAddress}&disableWalletAddressForm=true`,
//     title: t`Buy Crypto With Fiat`,
//     icon: <CreditCardIcon />,
//   },
// ];

// export const moreMenuExtraItems: MoreMenuItem[] = [];
// export const moreMenuMobileOnlyItems: MoreMenuItem[] = [];

// export const moreNavigation: MoreMenuItem[] = [...moreMenuItems, ...moreMenuExtraItems];

// export const mobileNavigation: Navigation[] = [
//   ...navigation,
//   ...moreMenuItems,
//   ...moreMenuMobileOnlyItems,
// ];

import { BookOpenIcon, CreditCardIcon, QuestionMarkCircleIcon } from '@heroicons/react/outline';
import { t } from '@lingui/macro';
import {
  Button,
  Link,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Box from '@mui/material/Box';
// /**
//  * Small wrapper component used only here to render responsive icon for the Info nav item.
//  * Placing it in this file keeps the navigation array static while letting us use MUI hooks.
//  */
// function InfoNavTitle() {
//   const theme = useTheme();
//   const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         gap: '4.5px',
//       }}
//     >
//       {t`Info`}
//       {/* prefer next/image for proper optimization, but a plain <img /> works too */}
//       {isMdUp ? (
//         <img src={uiConfig.docArrow} alt="docs arrow" width={14} height={14} />
//       ) : (
//         // use a mobile-specific icon from /public; create this file if it doesn't exist
//         <img src={uiConfig.view} alt="mobile docs arrow" width={20} height={20} />
//       )}
//     </Box>
//   );
// }
import NextLink from 'next/link';
import { MouseEvent, ReactNode, useState } from 'react';
import { ROUTES } from 'src/components/primitives/Link';
import { uiConfig } from 'src/uiConfig';
import { ENABLE_TESTNET } from 'src/utils/marketsAndNetworksConfig';

import DiscordIcon from '/public/icons/discord.svg';
import GithubIcon from '/public/icons/github.svg';

// OracleArrow removed (unused)
import { MarketDataType } from '../marketsConfig';

interface Navigation {
  link: string;
  title: string | ReactNode;
  activePaths?: string[];
  isVisible?: (data: MarketDataType) => boolean | undefined;
  dataCy?: string;
  // optional flag if item is external — useful for renderers
  external?: boolean;
}

export const navigation: Navigation[] = [
  {
    link: ROUTES.dashboard,
    title: t`Dashboard`,
    dataCy: 'menuDashboard',
  },
  {
    link: ROUTES.markets,
    title: t`Markets`,
    dataCy: 'menuMarkets',
    activePaths: [ROUTES.markets, ROUTES.reservesOverview],
  },
  {
    link: ROUTES.leaderboard,
    title: t`Leaderboard`,
    dataCy: 'menuLeaderboard',
    activePaths: [ROUTES.leaderboard],
  },
  {
    link: ROUTES.vaults,
    title: t`Vaults`,
    dataCy: 'menuStake',
    // isVisible: () =>
    //   process.env.NEXT_PUBLIC_ENABLE_STAKING === 'true' &&
    //   process.env.NEXT_PUBLIC_ENV === 'prod' &&
    //   !ENABLE_TESTNET,
  },
  // {
  //   link: ROUTES.info,
  //   title: <InfoNavTitle />,
  //   dataCy: 'menuDocs',
  // },
  {
    link: ROUTES.governance,
    title: t`Governance`,
    dataCy: 'menuGovernance',
    isVisible: () =>
      process.env.NEXT_PUBLIC_ENABLE_GOVERNANCE === 'true' &&
      process.env.NEXT_PUBLIC_ENV === 'prod' &&
      !ENABLE_TESTNET,
  },
  {
    link: ROUTES.faucet,
    title: t`Faucet`,
    isVisible: () => process.env.NEXT_PUBLIC_ENV === 'staging' || ENABLE_TESTNET,
  },
];

interface MoreMenuItem extends Navigation {
  icon: ReactNode;
  makeLink?: (walletAddress: string) => string;
}

const moreMenuItems: MoreMenuItem[] = [
  {
    link: 'https://docs.aave.com/faq/',
    title: t`FAQ`,
    icon: <QuestionMarkCircleIcon />,
    external: true,
  },
  {
    link: 'https://docs.aave.com/portal/',
    title: t`Developers`,
    icon: <BookOpenIcon />,
    external: true,
  },
  {
    link: 'https://discord.gg/7kHKnkDEUf',
    title: t`Discord`,
    icon: <DiscordIcon />,
    external: true,
  },
  {
    link: 'https://github.com/aave/interface',
    title: t`Github`,
    icon: <GithubIcon />,
    external: true,
  },
  {
    link: 'https://global.transak.com',
    makeLink: (walletAddress) =>
      `${process.env.NEXT_PUBLIC_TRANSAK_APP_URL}/?apiKey=${process.env.NEXT_PUBLIC_TRANSAK_API_KEY}&walletAddress=${walletAddress}&disableWalletAddressForm=true`,
    title: t`Buy Crypto With Fiat`,
    icon: <CreditCardIcon />,
    external: true,
  },
];

export const moreMenuExtraItems: MoreMenuItem[] = [];
export const moreMenuMobileOnlyItems: MoreMenuItem[] = [];

export const moreNavigation: MoreMenuItem[] = [...moreMenuItems, ...moreMenuExtraItems];

export const mobileNavigation: Navigation[] = [
  ...navigation,
  ...moreMenuItems,
  ...moreMenuMobileOnlyItems,
];
// import { Button, Menu, MenuItem, ListItemIcon, ListItemText, useTheme, useMediaQuery, Box } from '@mui/material';
// ...other imports (uiConfig, moreMenuItems, t, etc.)

function InfoNavTitle() {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (e: MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  // If you need a wallet address for makeLink, replace this with real value
  const walletAddress = ''; // or get it from props/context

  return (
    <>
      <Button
        id="info-button"
        onClick={handleOpen}
        aria-controls={open ? 'info-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        sx={{ textTransform: 'none', padding: 0, minWidth: 0 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '4.5px' }}>
          {t`Info`}
          {isMdUp ? (
            <img src={uiConfig.docArrow} alt="docs arrow" width={14} height={14} />
          ) : (
            <img src={uiConfig.view} alt="mobile docs arrow" width={20} height={20} />
          )}
        </Box>
      </Button>

      <Menu
        id="info-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ 'aria-labelledby': 'info-button' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {moreMenuItems.map((item) => {
          const href = item.makeLink ? item.makeLink(walletAddress) : item.link;
          // External link -> anchor tag that opens new tab
          if (item.external) {
            return (
              <MenuItem
                key={String(href)}
                component="a"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleClose}
                sx={{ gap: 1 }}
              >
                <ListItemIcon sx={{ minWidth: 36 }}>{item.icon}</ListItemIcon>
                <ListItemText>{item.title}</ListItemText>
              </MenuItem>
            );
          }

          // Internal -> use NextLink (or swap for your Link primitive)
          return (
            <MenuItem
              key={String(href)}
              component={NextLink as any}
              href={href as string}
              onClick={handleClose}
              sx={{ gap: 1 }}
            >
              <ListItemIcon sx={{ minWidth: 36 }}>{item.icon}</ListItemIcon>
              <ListItemText>{item.title}</ListItemText>
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
}
