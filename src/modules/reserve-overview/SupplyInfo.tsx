import { valueToBigNumber } from '@aave/math-utils';
import { Trans } from '@lingui/macro';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { AlertTitle, Box, Typography } from '@mui/material';
import { CapsCircularStatus } from 'src/components/caps/CapsCircularStatus';
import CapsSemiGauge from 'src/components/caps/CapsSemiGauge';
import { DebtCeilingStatus } from 'src/components/caps/DebtCeilingStatus';
import { IncentivesButton } from 'src/components/incentives/IncentivesButton';
import { LiquidationPenaltyTooltip } from 'src/components/infoTooltips/LiquidationPenaltyTooltip';
import { LiquidationThresholdTooltip } from 'src/components/infoTooltips/LiquidationThresholdTooltip';
import { MaxLTVTooltip } from 'src/components/infoTooltips/MaxLTVTooltip';
import { FormattedNumber } from 'src/components/primitives/FormattedNumber';
import { Link } from 'src/components/primitives/Link';
import { Warning } from 'src/components/primitives/Warning';
import { ReserveOverviewBox } from 'src/components/ReserveOverviewBox';
import { ReserveSubheader } from 'src/components/ReserveSubheader';
import { TextWithTooltip } from 'src/components/TextWithTooltip';
import { ComputedReserveData } from 'src/hooks/app-data-provider/useAppDataProvider';
import { AssetCapHookData } from 'src/hooks/useAssetCaps';
import { MarketDataType } from 'src/utils/marketsAndNetworksConfig';

import { ApyGraphContainer } from './graphs/ApyGraphContainer';
import { PanelItem } from './ReservePanels';
import { upperCase } from 'lodash';
import { uiConfig } from 'src/uiConfig';

interface SupplyInfoProps {
  reserve: ComputedReserveData;
  currentMarketData: MarketDataType;
  renderCharts: boolean;
  showSupplyCapStatus: boolean;
  supplyCap: AssetCapHookData;
  debtCeiling: AssetCapHookData;
}

export const SupplyInfo = ({
  reserve,
  currentMarketData,
  renderCharts,
  showSupplyCapStatus,
  supplyCap,
  debtCeiling,
}: SupplyInfoProps) => {
  return (
    <Box sx={{ 
      marginLeft: '16px',
      marginRight: '16px',
      }}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'space-between',
        marginRight: '120px',
        // backgroundColor: 'red',
        }}>
      <Box sx={{
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'start',
        flexWrap: 'wrap',
        mt: '42.5px',
        ml: '6.5px',
        gap: '48px',
        }}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'start',
          // gap: '10px',
          }}>
          <Typography sx={{
            fontWeight: 500,
            fontSize: '10px',
            lineHeight: '1em',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#828282',
            mb: '12.6px',
            }}> Total supplied </Typography>

          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '0.33em',
            mb: '6px',
            }}>
            <FormattedNumber visibleDecimals={2} value={reserve.totalLiquidity} sx={{ //reserve.totalLiquidity
              fontWeight: 500,
              fontSize: '20px',
              lineHeight: '1em', 
              letterSpacing: '-0.02em',
              color: '#061512',
              }}/>
            <Typography sx={{ 
              fontWeight: 500,
              fontSize: '20px',
              lineHeight: '1em', 
              letterSpacing: '-0.02em',
              color: '#828282',
              }}> of </Typography>
            <FormattedNumber visibleDecimals={0} value={reserve.supplyCap} sx={{ 
              fontWeight: 500,
              fontSize: '20px',
              lineHeight: '1em', 
              letterSpacing: '-0.02em',
              color: '#061512',
              }}/></Box>

          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'start',
            gap: '0.33em',
            }}>
            <FormattedNumber visibleDecimals={2} value={reserve.totalLiquidityUSD} symbol={'USD'} symbolsColor='#828282' size='16px' sx={{ 
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '1em', 
              letterSpacing: '-0.02em',
              color: '#828282',
              }}/>
            <Typography sx={{ 
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '1em', 
              letterSpacing: '-0.02em',
              color: '#828282',
              mt: '3px',
              }}> of </Typography>
            <FormattedNumber visibleDecimals={0} value={reserve.supplyCapUSD} symbol={'USD'} symbolsColor='#828282' size='16px' sx={{ 
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '1em', 
              letterSpacing: '-0.02em',
              color: '#828282',
              }}/></Box></Box>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'start',
          gap: '7.5px',
          }}>
          <Typography sx={{
            fontWeight: 500,
            fontSize: '10px',
            lineHeight: '1em',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#828282',
            }}> APY </Typography>
          <FormattedNumber value={reserve.supplyAPY} percent size='20px' sx={{ 
            fontWeight: 500,
            fontSize: '20px',
            lineHeight: '1em', 
            letterSpacing: '-0.02em',
            color: 'rgba(6, 21, 18, 1)',
            }}/></Box>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'start',
          // gap: '10px',
          }}>
          <Typography sx={{
            fontWeight: 500,
            fontSize: '10px',
            lineHeight: '1em',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#828282',
            mb: '12.6px',
            }}> supply cap </Typography>

          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '0.33em',
            mb: '6px',
            }}>
            <FormattedNumber visibleDecimals={0} value={reserve.supplyCap} sx={{ 
              fontWeight: 500,
              fontSize: '20px',
              lineHeight: '1em', 
              letterSpacing: '-0.02em',
              color: '#061512',
              }}/></Box>

          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'start',
            gap: '0.33em',
            }}>
            <FormattedNumber visibleDecimals={0} value={reserve.supplyCapUSD} symbol={'USD'} symbolsColor='#828282' size='16px' sx={{ 
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '1em', 
              letterSpacing: '-0.02em',
              color: '#828282',
              }}/></Box></Box></Box>
      <Box sx={{
        pt: '35px',
        }}>
        <CapsSemiGauge value={supplyCap.percentUsed} // supplyCap.percentUsed
          label="FILLED"
          size={300}
          thickness={31}
          arcColor="rgba(24,204,111,1)"
          trackColor="#E8E8E8"
          borderOpacity={0.08}
          shadowOpacity={0.18}
          gap={1.5}            // keeps the green separated from grey
          centerOffset={10}    // pushes texts down so % doesn't touch the rail
          valueFontSize={18}   // tune to taste
          labelFontSize={9}   // smaller “FILLED”
          /></Box></Box>
        {/* <CapsCircularStatus
          value={supplyCap.percentUsed}
          tooltipContent={
            <>
              <Trans>
                Maximum amount available to supply is{' '}
                <FormattedNumber
                  value={
                    valueToBigNumber(reserve.supplyCap).toNumber() -
                    valueToBigNumber(reserve.totalLiquidity).toNumber()
                  }
                  variant="secondary12"
                />{' '}
                {reserve.symbol} (
                <FormattedNumber
                  value={
                    valueToBigNumber(reserve.supplyCapUSD).toNumber() -
                    valueToBigNumber(reserve.totalLiquidityUSD).toNumber()
                  }
                  variant="secondary12"
                  symbol="USD"
                />
                ).
              </Trans>
            </>
          }
        /> */}

        {reserve.unbacked && reserve.unbacked !== '0' && (
          <PanelItem title={<Trans>Unbacked</Trans>}>
            <FormattedNumber value={reserve.unbacked} variant="main16" symbol={reserve.name} />
            <ReserveSubheader value={reserve.unbackedUSD} />
          </PanelItem>
        )}

      <div>
        {reserve.isIsolated ? (
          <Box sx={{ pt: '42px', pb: '12px' }}>
            <Typography variant="subheader1" color="text.main" paddingBottom={'12px'}>
              <Trans>Collateral usage</Trans>
            </Typography>
            <Warning severity="warning">
              <Typography variant="subheader1">
                <Trans>Asset can only be used as collateral in isolation mode only.</Trans>
              </Typography>
              <Typography variant="caption">
                In Isolation mode you cannot supply other assets as collateral for borrowing. Assets
                used as collateral in Isolation mode can only be borrowed to a specific debt
                ceiling.{' '}
                <Link 
                  href="https://docs.purrlend.com/faq/purrlend-features#isolation-mode"
                  sx={{
                    fontWeight: 600,
                    fontSize: '14px',
                    color: 'rgba(47, 117, 248, 1)',
                  }}>
                  Learn more
                </Link>
              </Typography>
            </Warning>
          </Box>
        ) : reserve.usageAsCollateralEnabled ? (
          <Box
            sx={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              mt: '30px', 
              mb: '12px', 
              ml: '7.4px',
              gap: '6px',
            }}
          >
            <Typography sx={{
              fontWeight: 600,
              fontSize: '16px',
              lineHeight: '1em',
              letterSpacing: '-0.02em',
              color: '#061512',
              }}>Collateral Usage</Typography>
            <Box
              sx={{
                border: '1px solid',
                borderRadius: '32px',
                borderColor: '#18CC6F80',
                backgroundColor: '#18CC6F1A',
                display: 'flex',
                alignItems: 'center',
                px: '5px',
                height: '22px',
                ml: '4px',
              }}>
              <img src={uiConfig.check} alt='check' />
              <Typography 
                variant="subheader1" 
                sx={{ 
                  fontWeight: 500,
                  fontSize: '10px',
                  lineHeight: '1em',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'rgba(24, 204, 111, 1)',
                  ml: '4px',
                  mr: '1.5px',
                }}>
                <Trans>Can be collateral</Trans>
              </Typography>
            </Box>
          </Box>
        ) : (
          <Box
            sx={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              mt: '30px', 
              mb: '12px', 
              ml: '7.4px',
              gap: '6px',
            }}
          >
            <Typography sx={{
              fontWeight: 600,
              fontSize: '16px',
              lineHeight: '1em',
              letterSpacing: '-0.02em',
              color: '#061512',
              }}>Collateral Usage</Typography>
            <Box
              sx={{
                border: '1px solid',
                borderRadius: '32px',
                borderColor: 'rgba(204, 87, 24, 0.5)',
                backgroundColor: 'rgba(204, 87, 24, 0.1)',
                display: 'flex',
                alignItems: 'center',
                px: '5px',
                height: '22px',
                ml: '4px',
              }}>
              {/* <img src={uiConfig.check} alt='check' /> */}
              <Typography 
                variant="subheader1" 
                sx={{ 
                  fontWeight: 500,
                  fontSize: '10px',
                  lineHeight: '1em',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'rgba(204, 87, 24, 1)',
                }}>
                Asset cannot be used as collateral
              </Typography>
            </Box>
          </Box>
        )}
      </div>

      {reserve.usageAsCollateralEnabled && (
        <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        border: '1px solid',
        borderRadius: '8px',
        borderColor: 'rgba(220, 220, 220, 1)',
        backgroundColor: 'rgba(242, 242, 242, 1)',
        marginTop: '3.7px',
        marginLeft: '7.2px',
        paddingTop: '11px',
        marginRight: '15px',
        paddingLeft: '15px',
        }}>
          <Box sx={{
            display:'flex',
            flexDirection: 'column',
            justifyContent: 'start',
            gap: '6px',
            marginRight: '141px',
            }}>
            <Typography sx={{
                fontSize: '10px',
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'rgba(130, 130, 130, 1)',
              }}> max ltv 
            </Typography>
            <FormattedNumber 
              value={reserve.formattedBaseLTVasCollateral} 
              percent 
              visibleDecimals={2} 
              size='24px'
              sx={{
                color: '#061512',
                fontSize: '24px',
                fontWeight: 500,
                lineHeight: '1em',
                letterSpacing: '-0.02em',
                marginBottom: '9px',
              }}/>
          </Box>
          
          <Box
            sx={{
              width: '1px',
              height: '54px',
              backgroundColor: 'rgba(220, 220, 220, 1)',
            }}>
          </Box>

          <Box sx={{
            display:'flex',
            flexDirection: 'column',
            justifyContent: 'start',
            gap: '3px',
            marginRight: '89px',
            marginLeft: '16px',
            }}>
            <Typography 
              sx={{
                fontSize: '10px',
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'rgba(130, 130, 130, 1)',
                marginTop: '1px',
              }}>
              <Trans>Liquidation threshold</Trans>
            </Typography>
            <FormattedNumber 
              value={reserve.formattedReserveLiquidationThreshold} 
              percent 
              visibleDecimals={2} 
              size='24px'
              sx={{
                color: '#061512',
                fontSize: '24px',
                fontWeight: 500,
                lineHeight: '1em',
                letterSpacing: '-0.02em',
                marginBottom: '9px',
              }}/>
          </Box>

          <Box sx={{
          width: '1px',
          height: '54px',
          backgroundColor: 'rgba(220, 220, 220, 1)',
          }}>
          </Box>

          <Box sx={{
            display:'flex',
            flexDirection: 'column',
            justifyContent: 'start',
            gap: '3px',
            marginLeft: '16px',
            }}>
            <Typography sx={{
            fontSize: '10px',
            fontWeight: 500,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'rgba(130, 130, 130, 1)',
            marginTop: '1px',
            }}>
              Liquidation penalty
            </Typography>
            <FormattedNumber value={reserve.formattedReserveLiquidationBonus} 
            percent 
            visibleDecimals={2} 
            size='24px'
            sx={{
              color: '#061512',
              fontSize: '24px',
              fontWeight: 500,
              lineHeight: '1em',
              letterSpacing: '-0.02em',
            }}/>
          </Box>

          {reserve.isIsolated && (
            <ReserveOverviewBox fullWidth>
              <DebtCeilingStatus
                debt={reserve.isolationModeTotalDebtUSD}
                ceiling={reserve.debtCeilingUSD}
                usageData={debtCeiling}
              />
            </ReserveOverviewBox>
          )}
        </Box>
      )}

      {/* later sort this out for stHYPE */}
      {reserve.symbol == 'stETH' && (
        <Box>
          <Warning severity="info">
            <AlertTitle>
              <Trans>Staking Rewards</Trans>
            </AlertTitle>
            <Trans>
              stETH supplied as collateral will continue to accrue staking rewards provided by daily
              rebases.
            </Trans>{' '}
            <Link
              href="https://blog.lido.fi/aave-integrates-lidos-steth-as-collateral/"
              underline="always"
            >
              <Trans>Learn more</Trans>
            </Link>
          </Warning>
        </Box>
      )}
    </Box>
  );
};
