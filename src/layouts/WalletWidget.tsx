import { DuplicateIcon } from '@heroicons/react/outline';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  ExclamationIcon,
  ExternalLinkIcon,
} from '@heroicons/react/solid';
import { Trans } from '@lingui/macro';
import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Skeleton,
  SvgIcon,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import makeBlockie from 'ethereum-blockies-base64';
import React, { useEffect, useState } from 'react';
import { Warning } from 'src/components/primitives/Warning';
import { WalletModal } from 'src/components/WalletConnection/WalletModal';
import { useWalletModalContext } from 'src/hooks/useWalletModal';
import useGetEns from 'src/libs/hooks/use-get-ens';
import { useWeb3Context } from 'src/libs/hooks/useWeb3Context';

import { Link } from '../components/primitives/Link';
import { textCenterEllipsis } from '../helpers/text-center-ellipsis';
import { ENABLE_TESTNET, getNetworkConfig, STAGING_ENV } from '../utils/marketsAndNetworksConfig';
import { DrawerWrapper } from './components/DrawerWrapper';
import { MobileCloseButton } from './components/MobileCloseButton';
import { BorderRight } from '@mui/icons-material';
import { uiConfig } from 'src/uiConfig';

interface WalletWidgetProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  headerHeight: number;
}

export default function WalletWidget({ open, setOpen, headerHeight }: WalletWidgetProps) {
  const { disconnectWallet, currentAccount, connected, chainId, loading, readOnlyModeAddress } =
    useWeb3Context();

  const { setWalletModalOpen } = useWalletModalContext();

  const { breakpoints, palette } = useTheme();
  const xsm = useMediaQuery(breakpoints.down('xsm'));
  const md = useMediaQuery(breakpoints.down('md'));

  const { name: ensName, avatar: ensAvatar } = useGetEns(currentAccount);
  const ensNameAbbreviated = ensName
    ? ensName.length > 18
      ? textCenterEllipsis(ensName, 12, 3)
      : ensName
    : undefined;

  const [useBlockie, setUseBlockie] = useState(false);
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  useEffect(() => {
    if (ensAvatar) {
      setUseBlockie(false);
    }
  }, [ensAvatar]);

  const networkConfig = getNetworkConfig(chainId);
  let networkColor = '';
  if (networkConfig?.isFork) {
    networkColor = '#ff4a8d';
  } else if (networkConfig?.isTestnet) {
    networkColor = '#7157ff';
  } else {
    networkColor = '#65c970';
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (!connected && !readOnlyModeAddress) {
      setWalletModalOpen(true);
    } else {
      setOpen(true);
      setAnchorEl(event.currentTarget);
    }
  };

  const handleDisconnect = () => {
    if (connected) {
      disconnectWallet();
      handleClose();
    }
  };

  const handleCopy = async () => {
    navigator.clipboard.writeText(currentAccount);
    handleClose();
  };

  const handleSwitchWallet = (): void => {
    setWalletModalOpen(true);
    handleClose();
  };

  const hideWalletAccountText = xsm && (ENABLE_TESTNET || STAGING_ENV || readOnlyModeAddress);

  const accountAvatar = (
    <Box
      sx={{
        width: 28,
        height: 28,
        img: { width: 28, height: 28, borderRadius: '50%' },
      }}
    >
      <img
        src={
          useBlockie ? makeBlockie(currentAccount !== '' ? currentAccount : 'default') : ensAvatar
        }
        height={28}
        width={28}
        alt=""
        onError={() => setUseBlockie(true)}
      />
      {readOnlyModeAddress && (
        <SvgIcon
          color="warning"
          sx={{
            width: 15,
            height: 15,
            position: 'absolute',
            top: '20px',
            left: '20px',
            borderRadius: '50%',
            background: '#383D51',
          }}
        >
          <ExclamationIcon />
        </SvgIcon>
      )}
    </Box>
  );

  let buttonContent = <></>;
  if (currentAccount) {
    if (hideWalletAccountText) {
      buttonContent = <Box sx={{ margin: '1px 0' }}>{accountAvatar}</Box>;
    } else {
      buttonContent = <>{ensNameAbbreviated ?? textCenterEllipsis(currentAccount, 4, 4)}</>;
    }
  } else {
    buttonContent = <Trans>Connect wallet</Trans>;
  }

  const Content = ({ component = ListItem }: { component?: typeof MenuItem | typeof ListItem }) => (
    <>
      <Typography
        variant="subheader2"
        sx={{
          display: { xs: 'block', md: 'none' },
          color: '#A5A8B6',
          px: 4,
          py: 2,
        }}
      >
        <Trans>Account</Trans>
      </Typography>

      <Box sx={{
      mx: '17px',
      mt: '12px',
      }}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}> 
          <Box sx={{ img: {borderRadius: '50%' }}}>
              <img src={
                  useBlockie
                    ? makeBlockie(currentAccount !== '' ? currentAccount : 'default')
                    : ensAvatar
                } alt="" onError={() => setUseBlockie(true)} height={40} width={40}/>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '26px' }}>
            {ensNameAbbreviated && (
              <Typography variant="h4" color={{ xs: '#F1F1F3', md: 'text.primary' }}>
                {ensNameAbbreviated}
              </Typography>
            )}

            <Typography
              sx={{
                fontWeight: 600,
                letterSpacing: '-0.02em',
                lineHeight: '1em',
                fontSize: '18px',
              }}
            >
              {textCenterEllipsis(currentAccount, ensNameAbbreviated ? 12 : 4, 4)}
            </Typography>
              <img src={uiConfig.copy} alt="copy icon" onClick={handleCopy} style={{cursor: 'pointer'}} /> 
          </Box>
        </Box>
      </Box>
      
      <Box component={component} disabled>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'row', 
          width: '100%',
          justifyContent: 'space-between',
          backgroundColor: 'rgba(242, 242, 242, 1)',
          py: '10px',
          px: '12px',
          border: '1px solid',
          borderColor: 'rgba(232, 232, 232, 1)',
          borderRadius: '8px',
          gap: '38px'
          }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography sx={{
              fontWeight: 500,
              fontSize: '10px',
              lineHeight: '1em',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#828282',
            }}>
              <Trans>Network</Trans>
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{
            bgcolor: networkColor,
            width: 8,
            height: 8,
            mr: 2,
            borderRadius: '50%',
            }}/>
            <Typography sx={{
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '1em',
              letterSpacing: '-0.02em',
              color: '#252525',
            }}>
              {networkConfig.name}
            </Typography>
          </Box>
        </Box>
      </Box>
      
      {networkConfig?.explorerLinkBuilder && (
        <Link href={networkConfig.explorerLinkBuilder({ address: currentAccount })}>
          <Box
            component={component}
            sx={{ color: { xs: '#F1F1F3', md: 'text.primary' } }}
            onClick={handleClose}
          >
            <img src={uiConfig.view} alt="view icon" height={20} width={20} />
            <Typography sx={{
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '1em',
            letterSpacing: '-0.02em',
            color: '#434343',
            pl: '10px',
            }}><Trans>View on Explorer</Trans></Typography>
          </Box>
        </Link>
      )}

      <Box component={component} onClick={handleSwitchWallet} sx={{my: '10px'}}>
        <img src={uiConfig.switch} alt="switch" height={20} width={20}/>
        <Typography sx={{
          fontWeight: 400,
          fontSize: '16px',
          lineHeight: '1em',
          letterSpacing: '-0.02em',
          color: '#434343',
          pl: '10px',
        }}>Switch wallet</Typography>
      </Box>
      
      <Divider sx={{mx: '1em', borderColor: { xs: '#FFFFFF1F', md: '#E8E8E8' } }} />
      {/* <Divider/> */}
      <Box component={component} onClick={handleDisconnect} sx={{display: 'flex', alignItems: 'center', height: '65px'}}>
        <Box sx={{
        display: 'flex',
        alignItems: 'center',
        pb: '3.5px'
        }}>
          <img src={uiConfig.logout} alt="logout icon"/>
          <Typography sx={{
          fontWeight: 400,
          fontSize: '16px',
          lineHeight: '1em',
          letterSpacing: '-0.02em',
          color: '#F24747',
          pl: '10px',
          // pb: '100px',
          }}>Disconnect</Typography>
        </Box>
      </Box>

      {md && (
        <>
          <Divider sx={{ my: { xs: 7, md: 0 }, borderColor: { xs: '#FFFFFF1F', md: 'divider' } }} />
          <Box sx={{ padding: '16px 16px 10px' }}>
            <Button
              sx={{
                marginBottom: '16px',
                background: '#383D51',
                color: '#F1F1F3',
              }}
              fullWidth
              size="large"
              variant={palette.mode === 'dark' ? 'outlined' : 'text'}
              onClick={handleSwitchWallet}
            >
              Switch wallet
            </Button>
            <Button
              sx={{
                background: '#383D51',
                color: '#F1F1F3',
              }}
              fullWidth
              size="large"
              variant={palette.mode === 'dark' ? 'outlined' : 'text'}
              onClick={handleDisconnect}
            >
              Disconnect
            </Button>
          </Box>
        </>
      )}
    </>
  );

  return (
    <>
      {md && (connected || readOnlyModeAddress) && open ? (
        <MobileCloseButton setOpen={setOpen} />
      ) : loading ? (
        <Skeleton height={36} width={126} sx={{ background: '#383D51' }} />
      ) : (
        <Button
          variant={connected || readOnlyModeAddress ? 'surface' : 'purrButtonNav'}
          aria-label="wallet"
          id="wallet-button"
          aria-controls={open ? 'wallet-button' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleClick}
          sx={{
            p: connected || readOnlyModeAddress ? '5px 8px' : undefined,
            minWidth: hideWalletAccountText ? 'unset' : undefined,
            height: 38,
            width: 150,
            borderRadius: '12px',
            padding: '12px 16px 12px 16px',
            fontSize: '14px',
            fontWeight: 600,
            color: '#FFFFFF',
            lineHeight: '1em',
            letterSpacing: '-0.02em',
            border: '1px solid',
            borderColor: 'rgba(255, 255, 255, 0.2)',
            // backgroundColor: 'red',
          }}
          startIcon={(connected || readOnlyModeAddress) && !hideWalletAccountText && accountAvatar}
          endIcon={
            (connected || readOnlyModeAddress) &&
            !hideWalletAccountText &&
            !md && (
              <SvgIcon
                sx={{
                  display: { xs: 'none', md: 'block' },
                }}
              >
                {open ? <ChevronUpIcon /> : <ChevronDownIcon />}
              </SvgIcon>
            )
          } 
        >
          {buttonContent}
        </Button>
      )}

      {md ? (
        <DrawerWrapper open={open} setOpen={setOpen} headerHeight={headerHeight}>
          <List sx={{ px: 2, '.MuiListItem-root.Mui-disabled': { opacity: 1 } }}>
            <Content />
          </List>
        </DrawerWrapper>
      ) : (
        <Menu
          id="wallet-menu"
          MenuListProps={{
            'aria-labelledby': 'wallet-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          keepMounted={true}
          PaperProps={{
            sx: {
              borderRadius: '16px',   
              overflow: 'hidden',     
              boxShadow: '0px 14px 24px 0px #0000004D',
              mr: '2000px',
            },
          }}
        >
          <MenuList disablePadding sx={{ '.MuiMenuItem-root.Mui-disabled': { opacity: 1 } }}>
            <Content component={MenuItem} />
          </MenuList>
        </Menu>
      )}

      <WalletModal />
    </>
  );
}
