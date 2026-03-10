import { InterestRate } from '@aave/contract-helpers';
import { ExternalLinkIcon } from '@heroicons/react/outline';
import { CheckIcon } from '@heroicons/react/solid';
import { Trans } from '@lingui/macro';
import { Box, Button, Link, SvgIcon, Typography, useTheme } from '@mui/material';
import { ReactNode, useState } from 'react';
import { WalletIcon } from 'src/components/icons/WalletIcon';
import { FormattedNumber } from 'src/components/primitives/FormattedNumber';
import { Base64Token, TokenIcon } from 'src/components/primitives/TokenIcon';
import { useModalContext } from 'src/hooks/useModal';
import { useProtocolDataContext } from 'src/hooks/useProtocolDataContext';
import { useWeb3Context } from 'src/libs/hooks/useWeb3Context';
import { ERC20TokenType } from 'src/libs/web3-data-provider/Web3Provider';
import { uiConfig } from 'src/uiConfig';

export type SuccessTxViewProps = {
  action?: ReactNode;
  amount?: string;
  symbol?: string;
  collateral?: boolean;
  rate?: InterestRate;
  addToken?: ERC20TokenType;
};

const ExtLinkIcon = () => (
  <SvgIcon sx={{ ml: '2px', fontSize: '11px' }}>
    <ExternalLinkIcon />
  </SvgIcon>
);

export const TxSuccessView = ({
  action,
  amount,
  symbol,
  collateral,
  rate,
  addToken,
}: SuccessTxViewProps) => {
  const { close, mainTxState } = useModalContext();
  const { addERC20Token } = useWeb3Context();
  const { currentNetworkConfig } = useProtocolDataContext();
  const [base64, setBase64] = useState('');
  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          pt: '35px',
        }}
      >
        <img src={uiConfig.allDone} />

        <Typography
          sx={{
            fontWeight: 600,
            fontSize: '32px',
            lineHeight: '1em',
            letterSpacing: '-0.02em',
          }}
        >
          <Trans>All done!</Trans>
        </Typography>

        <Box
          sx={{
            mt: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          {action && amount && symbol && (
            <Typography>
              <Trans>
                You {action}{' '}
                <FormattedNumber value={Number(amount)} compact variant="secondary14" /> {symbol}
              </Trans>
            </Typography>
          )}

          {!action && !amount && symbol && (
            <Typography>
              Your {symbol} {!collateral ? 'now' : 'is not'} used as collateral
            </Typography>
          )}

          {/* {rate && (
            <Typography>
              <Trans>
                You switched to {rate === InterestRate.Variable ? 'variable' : 'stable'} rate
              </Trans>
            </Typography>
          )}

          {addToken && symbol && (
            <Box
              sx={(theme) => ({
                border:
                  theme.palette.mode === 'dark' ? `1px solid ${theme.palette.divider}` : 'none',
                background: theme.palette.mode === 'dark' ? 'none' : '#F7F7F9',
                borderRadius: '12px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                mt: '24px',
              })}
            >
              <TokenIcon
                symbol={symbol}
                aToken={addToken && addToken.aToken ? true : false}
                sx={{ fontSize: '32px', mt: '12px', mb: '8px' }}
              />
              <Typography variant="description" color="text.primary" sx={{ mx: '24px' }}>
                <Trans>
                  Add {addToken && addToken.aToken ? 'aToken ' : 'token '} to wallet to track your
                  balance.
                </Trans>
              </Typography>
              <Button
                onClick={() => {
                  addERC20Token({
                    address: addToken.address,
                    decimals: addToken.decimals,
                    symbol: addToken.aToken ? `a${addToken.symbol}` : addToken.symbol,
                    image: !/_/.test(addToken.symbol) ? base64 : undefined,
                  });
                }}
                variant={theme.palette.mode === 'dark' ? 'outlined' : 'contained'}
                size="medium"
                sx={{ mt: '8px', mb: '12px' }}
              >
                {addToken.symbol && !/_/.test(addToken.symbol) && (
                  <Base64Token
                    symbol={addToken.symbol}
                    onImageGenerated={setBase64}
                    aToken={addToken.aToken}
                  />
                )}
                <WalletIcon sx={{ width: '20px', height: '20px' }} />
                <Typography variant="buttonM" color="white" ml="4px">
                  <Trans>Add to wallet</Trans>
                </Typography>
              </Button>
            </Box>
          )} */}
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Button
          onClick={close}
          // variant="contained"
          size="large"
          sx={{ minHeight: '44px' }}
          data-cy="closeButton"
          style={{
            backgroundColor: '#FF7E09',
            borderRadius: '12px',
            border: '1px solid #FFFFFF33',
            marginTop: 35,
            boxShadow: '0px 4px 10px 0px #FF7E0963',
          }}
        >
          <Typography
            sx={{
              color: '#FFFFFF',
              fontWeight: 600,
              fontSize: '16px',
              lineHeight: '1em',
              letterSpacing: '-0.02em',
            }}
          >
            <Trans>Okay</Trans>
          </Typography>
        </Button>
        <Link
          variant="helperText"
          href={currentNetworkConfig.explorerLinkBuilder({ tx: mainTxState.txHash })}
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            mt: 4,
            mb: 3,
          }}
          underline="hover"
          target="_blank"
          rel="noreferrer noopener"
        >
          <Typography
            sx={{
              color: '#FF7E09',
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: '1em',
              letterSpacing: '-0.02em',
            }}
          >
            <Trans>Check transaction details</Trans>
          </Typography>
          <img src={uiConfig.txArrow} />
        </Link>
      </Box>
    </>
  );
};
