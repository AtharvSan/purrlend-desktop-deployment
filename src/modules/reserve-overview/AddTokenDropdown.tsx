import { Trans } from '@lingui/macro';
import { Box, Menu, MenuItem, Typography } from '@mui/material';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { CircleIcon } from 'src/components/CircleIcon';
import { WalletIcon } from 'src/components/icons/WalletIcon';
import { Base64Token, TokenIcon } from 'src/components/primitives/TokenIcon';
import { ComputedReserveData } from 'src/hooks/app-data-provider/useAppDataProvider';
import { ERC20TokenType } from 'src/libs/web3-data-provider/Web3Provider';
import { uiConfig } from 'src/uiConfig';

interface AddTokenDropdownProps {
  poolReserve: ComputedReserveData;
  downToSM: boolean;
  switchNetwork: (chainId: number) => Promise<void>;
  addERC20Token: (args: ERC20TokenType) => Promise<boolean>;
  currentChainId: number;
  connectedChainId: number;
}

export const AddTokenDropdown = ({
  poolReserve,
  downToSM,
  switchNetwork,
  addERC20Token,
  currentChainId,
  connectedChainId,
}: AddTokenDropdownProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [changingNetwork, setChangingNetwork] = useState(false);
  const [underlyingBase64, setUnderlyingBase64] = useState('');
  const [aTokenBase64, setATokenBase64] = useState('');
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // The switchNetwork function has no return type, so to detect if a user successfully switched networks before adding token to wallet, check the selected vs connected chain id
  useEffect(() => {
    if (changingNetwork && currentChainId === connectedChainId) {
      addERC20Token({
        address: poolReserve.underlyingAsset,
        decimals: poolReserve.decimals,
        symbol: poolReserve.symbol,
        image: !/_/.test(poolReserve.iconSymbol) ? underlyingBase64 : undefined,
      });
      setChangingNetwork(false);
    }
  }, [
    currentChainId,
    connectedChainId,
    changingNetwork,
    addERC20Token,
    poolReserve.underlyingAsset,
    poolReserve.decimals,
    poolReserve.symbol,
    poolReserve.iconSymbol,
    underlyingBase64,
  ]);

  return (
    <>
      {/* Load base64 token symbol for adding underlying and aTokens to wallet */}
      {poolReserve?.symbol && !/_/.test(poolReserve.symbol) && (
        <>
          <Base64Token
            symbol={poolReserve.iconSymbol}
            onImageGenerated={setUnderlyingBase64}
            aToken={false}
          />
          <Base64Token
            symbol={poolReserve.iconSymbol}
            onImageGenerated={setATokenBase64}
            aToken={true}
          />
        </>
      )}
      <Box onClick={handleClick}>
        <img src={uiConfig.addToken} alt="" />
        {/* <CircleIcon tooltipText="Add token to wallet" downToSM={downToSM}>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              '&:hover': {
                '.Wallet__icon': { opacity: '0 !important' },
                '.Wallet__iconHover': { opacity: '1 !important' },
              },
              cursor: 'pointer',
            }}
          >
            <WalletIcon sx={{ width: '14px', height: '14px', '&:hover': { stroke: '#F1F1F3' } }} />
          </Box>
        </CircleIcon> */}
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
        <Box sx={{ px: '16px',pb: '5px', width: '240px', display: 'flex' }}>
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
            <Trans>Select token to add</Trans>
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
          pt: '10px',
        }}>underlying token</Typography>
        <MenuItem
          key="underlying"
          value="underlying"
          onClick={() => {
            if (currentChainId !== connectedChainId) {
              switchNetwork(currentChainId).then(() => {
                setChangingNetwork(true);
              });
            } else {
              addERC20Token({
                address: poolReserve.underlyingAsset,
                decimals: poolReserve.decimals,
                symbol: poolReserve.symbol,
                image: !/_/.test(poolReserve.symbol) ? underlyingBase64 : undefined,
              });
            }
            handleClose();
          }}
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
          key="atoken"
          value="atoken"
          onClick={() => {
            if (currentChainId !== connectedChainId) {
              switchNetwork(currentChainId).then(() => {
                setChangingNetwork(true);
              });
            } else {
              addERC20Token({
                address: poolReserve.aTokenAddress,
                decimals: poolReserve.decimals,
                symbol: `a${poolReserve.symbol}`,
                image: !/_/.test(poolReserve.symbol) ? aTokenBase64 : undefined,
              });
            }
            handleClose();
          }}
        >
          <TokenIcon symbol={poolReserve.iconSymbol} sx={{ fontSize: '20px' }} aToken={true} />
          <Typography variant="subheader1" sx={{ ml: 3 }} noWrap data-cy={`assetName`}>
            {`p${poolReserve.symbol}`}
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
};
