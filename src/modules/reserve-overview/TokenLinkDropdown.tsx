import { ExternalLinkIcon } from '@heroicons/react/outline';
import { Trans } from '@lingui/macro';
import { Box, Menu, MenuItem, SvgIcon, Typography } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import { CircleIcon } from 'src/components/CircleIcon';
import { TokenIcon } from 'src/components/primitives/TokenIcon';
import { ComputedReserveData } from 'src/hooks/app-data-provider/useAppDataProvider';
import { useProtocolDataContext } from 'src/hooks/useProtocolDataContext';
import { uiConfig } from 'src/uiConfig';

interface TokenLinkDropdownProps {
  poolReserve: ComputedReserveData;
  downToSM: boolean;
}

export const TokenLinkDropdown = ({ poolReserve, downToSM }: TokenLinkDropdownProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { currentNetworkConfig } = useProtocolDataContext();
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box onClick={handleClick} sx={{mr: '4px'}} >
        <img src={uiConfig.tokenContracts} alt='icon here' />
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        keepMounted={true}
        data-cy="addToWaletSelector"
        PaperProps={{
          sx: {
            borderRadius: '16px',
            border: '1px solid #F2F2F2',
            boxShadow: '0px 14px 24px 0px #0000004D',
            pt: '16px',
            pb: '8px',
          }
        }}
      >
        <Box sx={{ px: '16px',pb: '16px', width: '240px', display: 'flex' }}>
          <Box sx={{
            height: '24px',
            width: '2px',
            backgroundColor: '#FF7E09',
            position: 'relative',
            left: '-16px',
            top: '-2px'
          }}/>
          <Typography sx={{
            fontWeight: 600,
            fontSize: '20px',
            lineHeight: '1em',
            letterSpacing: '-0.02em',
            color: '#061512',
          }}>
            <Trans>Token Contract</Trans>
          </Typography>
        </Box>

        <Typography sx={{
          fontWeight: 500,
          fontSize: '10px',
          lineHeight: '1em',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: '#828282',
          pl: '16px',
        }}>underlying token</Typography>
        <MenuItem
          component="a"
          href={currentNetworkConfig.explorerLinkBuilder({
            address: poolReserve?.underlyingAsset,
          })}
          target="_blank"
        >
          <TokenIcon symbol={poolReserve.iconSymbol} sx={{ fontSize: '20px' }} />
          <Typography variant="subheader1" sx={{ ml: 3 }} noWrap data-cy={`assetName`}>
            {poolReserve.symbol}
          </Typography>
        </MenuItem>

        <Typography sx={{
          fontWeight: 500,
          fontSize: '10px',
          lineHeight: '1em',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: '#828282',
          pl: '16px',
          pt: '8px',
        }}>LND Token</Typography>
        <MenuItem
          component="a"
          href={currentNetworkConfig.explorerLinkBuilder({
            address: poolReserve?.aTokenAddress,
          })}
          target="_blank"
        >
          <TokenIcon symbol={poolReserve.iconSymbol} aToken={true} sx={{ fontSize: '20px' }} />
          <Typography variant="subheader1" sx={{ ml: 3 }} noWrap data-cy={`assetName`}>
            {'a' + poolReserve.symbol}
          </Typography>
        </MenuItem>
        {poolReserve.borrowingEnabled && (
          <>
          <Typography sx={{
            fontWeight: 500,
            fontSize: '10px',
            lineHeight: '1em',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#828282',
            pl: '16px',
            pt: '8px',
          }}>LND debt Token</Typography>
          <MenuItem
            component="a"
            href={currentNetworkConfig.explorerLinkBuilder({
              address: poolReserve?.variableDebtTokenAddress,
            })}
            target="_blank"
          >
            <TokenIcon symbol="default" sx={{ fontSize: '20px' }} />
            <Typography variant="subheader1" sx={{ ml: 3 }} noWrap data-cy={`assetName`}>
              {'Variable debt ' + poolReserve.symbol}
            </Typography>
          </MenuItem>
          </>
        )}
        {poolReserve.stableBorrowRateEnabled && (
          <MenuItem
            component="a"
            href={currentNetworkConfig.explorerLinkBuilder({
              address: poolReserve?.stableDebtTokenAddress,
            })}
            target="_blank"
          >
            <TokenIcon symbol="default" sx={{ fontSize: '20px' }} />
            <Typography variant="subheader1" sx={{ ml: 3 }} noWrap data-cy={`assetName`}>
              {'Stable debt ' + poolReserve.symbol}
            </Typography>
          </MenuItem>
        )}
      </Menu>
    </>
  );
};
