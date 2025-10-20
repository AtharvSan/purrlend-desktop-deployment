import { ExternalLinkIcon } from '@heroicons/react/outline';
import { Trans } from '@lingui/macro';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackOutlined';
import {
  Box,
  Button,
  Divider,
  Skeleton,
  SvgIcon,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useRouter } from 'next/router';
import { CircleIcon } from 'src/components/CircleIcon';
import { getMarketInfoById, MarketLogo } from 'src/components/MarketSwitcher';
import { FormattedNumber } from 'src/components/primitives/FormattedNumber';
import { Link } from 'src/components/primitives/Link';
import { useProtocolDataContext } from 'src/hooks/useProtocolDataContext';
import { useWeb3Context } from 'src/libs/hooks/useWeb3Context';

import { TopInfoPanel } from '../../components/TopInfoPanel/TopInfoPanel';
import { TopInfoPanelItem } from '../../components/TopInfoPanel/TopInfoPanelItem';
import {
  ComputedReserveData,
  useAppDataContext,
} from '../../hooks/app-data-provider/useAppDataProvider';
import { AddTokenDropdown } from './AddTokenDropdown';
import { TokenLinkDropdown } from './TokenLinkDropdown';

import { uiConfig } from '/src/uiConfig';
import { TokenIcon } from 'src/components/primitives/TokenIcon';

interface ReserveTopDetailsProps {
  underlyingAsset: string;
}

export const ReserveTopDetails = ({ underlyingAsset }: ReserveTopDetailsProps) => {
  const router = useRouter();
  const { reserves, loading } = useAppDataContext();
  const { currentMarket, currentNetworkConfig, currentChainId } = useProtocolDataContext();
  const { market, network } = getMarketInfoById(currentMarket);
  const { addERC20Token, switchNetwork, chainId: connectedChainId, connected } = useWeb3Context();

  const theme = useTheme();
  const downToSM = useMediaQuery(theme.breakpoints.down('sm'));

  const poolReserve = reserves.find(
    (reserve) => reserve.underlyingAsset === underlyingAsset
  ) as ComputedReserveData;

  const valueTypographyVariant = downToSM ? 'main16' : 'main21';
  const symbolsTypographyVariant = downToSM ? 'secondary16' : 'secondary21';

  const ReserveIcon = () => {
    return (
      <Box mr={3} sx={{ mr: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {loading ? (
          <Skeleton variant="circular" width={40} height={40} sx={{ background: '#383D51' }} />
        ) : (
          <img
            src={`/icons/tokens/${poolReserve.iconSymbol.toLowerCase()}.svg`}
            width="40px"
            height="40px"
            alt=""
          />
        )}
      </Box>
    );
  };

  const iconStyling = {
    display: 'inline-flex',
    alignItems: 'center',
    color: '#A5A8B6',
    '&:hover': { color: '#F1F1F3' },
    cursor: 'pointer',
  };

  const ReserveName = () => {
    return loading ? (
      <Skeleton width={60} height={28} sx={{ background: '#383D51' }} />
    ) : (
      <Typography 
        sx={{
          fontSize: '24px',
          fontWeight: 600,
          letterSpacing: '-0.02em',
          lineHeight: '1em',
          color: '#061512',
        }}>
        {poolReserve.name}
      </Typography>
    );
  };

  return (
    <TopInfoPanel
      titleComponent={
        <Box sx={{width: '80%'}}>
          <Box
            sx={{
              display: 'flex',
              alignItems: downToSM ? 'flex-start' : 'center',
              alignSelf: downToSM ? 'flex-start' : 'center',
              mb: {xs: '15px', md: '12.3px'},
              minHeight: '40px',
              flexDirection: downToSM ? 'column' : 'row',
              gap: '12px',
              // backgroundColor: 'red',
            }}
          >
            <Button
              size="medium"
              color="primary"
              onClick={() => {
                // https://github.com/vercel/next.js/discussions/34980
                if (history.state.idx !== 0) router.back();
                else router.push('/markets');
              }}
              sx={{ 
                // mb: downToSM ? '0px' : '0',
                backgroundColor: 'transparent',
                p: '6px 11px 6px 5px',
                border: '1px solid',
                borderRadius: '70px',
                borderColor: '#ABABAB',
                height: '28px',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '8px',
                }}>
                <img src={uiConfig.back} alt="actionsWallet icon" height={16} />
                <Typography 
                  sx={{
                    textTransform: 'uppercase',
                    fontSize: '10px',
                    fontWeight: 500,
                    lineHeight: '10px',
                    // pt: '1px',
                    letterSpacing: '0.08em',
                    color: '#061512',
                  }}>
                  <Trans>back to market</Trans>
                </Typography>
              </Box>
            </Button>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent:'space-between' ,gap: '8px' }}>
              <img src={uiConfig.hype} height={20} />
              <Typography 
                sx={{ 
                  color: '#061512',
                  fontWeight: 600,
                  fontSize: '20px',
                  letterSpacing: '-0.02em',
                }}>
                {market.marketTitle} <Trans>Market</Trans>
              </Typography>
            </Box>
          </Box>
        </Box>
      }
    >
      <Box // USDT0
        sx={{
          display: 'flex',
          // backgroundColor: 'red',
        }}> 
        <TokenIcon symbol={poolReserve.symbol} fontSize="large" 
          sx={{
            height: '40px',
            width: '40px',
            mr: '12px',
            mt: '5px',
            mb: '8px',
          }} />
        <Box sx={{display: 'flex', flexDirection: 'column',justifyContent: 'space-between'}}>
          <Typography sx={{
            fontWeight: 400,
            fontSize: '16px',
            letterSpacing: '-0.02em',
            lineHeight: '1em',
            color: '#828282',
            }}>
            <Trans>{poolReserve.symbol}</Trans>
          </Typography>
          <Box 
              sx={{ 
                display: 'inline-flex', 
                alignItems: 'center',
                // backgroundColor: 'red', 
                mt: '3px',
              }}>
              <ReserveName />
              {loading ? (
                <Skeleton width={16} height={16} sx={{ ml: 1, background: '#383D51' }} />
              ) : (
                <Box sx={{ 
                  // backgroundColor: 'red',
                  display: 'flex',
                  flexDirection: 'row', 
                  pt: '5px',
                  pl: '8px', }}>
                  <TokenLinkDropdown poolReserve={poolReserve} downToSM={downToSM} />
                  {connected && (
                    <AddTokenDropdown
                      poolReserve={poolReserve}
                      downToSM={downToSM}
                      switchNetwork={switchNetwork}
                      addERC20Token={addERC20Token}
                      currentChainId={currentChainId}
                      connectedChainId={connectedChainId}
                    />
                  )}
                </Box>
              )}
            </Box>
        </Box>
      </Box>
      
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: {xs: 'unset', md: '46px'},
        width: {xs: '100%', md: 'unset'},
      }}>
        <TopInfoPanelItem title={<Trans>Reserve Size</Trans>} loading={loading} hideIcon>
          <FormattedNumber
            value={poolReserve?.totalLiquidityUSD}
            symbol="USD"
            symbolsVariant={symbolsTypographyVariant}
            symbolsColor="#828282"
            size="24px"
            sx={{
              fontSize: '24px',
              fontWeight: 500,
              letterSpacing: '-0.02em',
              lineHeight: '1em',
              color: '#061512',
            }}
          />
        </TopInfoPanelItem>

        <TopInfoPanelItem title={<Trans>Available liquidity</Trans>} loading={loading} hideIcon>
          <FormattedNumber
            value={poolReserve?.availableLiquidityUSD}
            symbol="USD"
            variant={valueTypographyVariant}
            symbolsVariant={symbolsTypographyVariant}
            symbolsColor="#828282"
            size="24px"
            sx={{
              fontSize: '24px',
              fontWeight: 500,
              letterSpacing: '-0.02em',
              lineHeight: '1em',
              color: '#061512',
            }}
          />
        </TopInfoPanelItem>

        <TopInfoPanelItem title={<Trans>Utilization Rate</Trans>} loading={loading} hideIcon>
          <FormattedNumber
            value={poolReserve?.borrowUsageRatio}
            percent
            variant={valueTypographyVariant}
            symbolsVariant={symbolsTypographyVariant}
            symbolsColor="#828282"
            size="24px"
            sx={{
              fontSize: '24px',
              fontWeight: 500,
              letterSpacing: '-0.02em',
              lineHeight: '1em',
              color: '#061512',
            }}
          />
        </TopInfoPanelItem>
      </Box>
      
      <Box sx={{
        display: 'flex',
        gap: {xs: '26px', md: '46px'}
      }}>
        <TopInfoPanelItem title={<Trans>Oracle price</Trans>} loading={loading} hideIcon>
          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
            <FormattedNumber
              value={poolReserve?.priceInUSD}
              symbol="USD"
              variant={valueTypographyVariant}
              symbolsVariant={symbolsTypographyVariant}
              symbolsColor="#828282"
              size="24px"
              sx={{
              fontSize: '24px',
              fontWeight: 500,
              letterSpacing: '-0.02em',
              lineHeight: '1em',
              color: '#061512',
            }}
            />
            {loading ? (
              <Skeleton width={16} height={16} sx={{ ml: 1, background: '#383D51' }} />
            ) : (
              <CircleIcon tooltipText="View oracle contract" downToSM={downToSM}>
                <Link
                  href={currentNetworkConfig.explorerLinkBuilder({
                    address: poolReserve?.priceOracle,
                  })}
                  sx={iconStyling}
                >
                  <img src={uiConfig.oracleArrow}/>
                </Link>
              </CircleIcon>
            )}
          </Box>
        </TopInfoPanelItem>

        <TopInfoPanelItem title={<Trans>Oracle</Trans>} loading={loading} hideIcon>
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'start',
            gap: '5.5px',
            mt: '2px',
            // backgroundColor: 'red',
            }}>
            <img src={uiConfig.pyth} alt="pyth oracle" width={28} height={28} />
            <Typography sx={{
                fontWeight: 500,
                fontSize: '24px',
                lineHeight: '1em',
                letterSpacing: '-0.02em',
                color: '#061512',
                mt:'2px',
              }}>
              Pyth
            </Typography>
          </Box>
        </TopInfoPanelItem>
      </Box>
    </TopInfoPanel>
  );
};
