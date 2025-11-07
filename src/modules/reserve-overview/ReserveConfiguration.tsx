import { ExternalLinkIcon } from '@heroicons/react/solid';
import { Trans } from '@lingui/macro';
import { Box, Button, Divider, Paper, SvgIcon, Typography, useMediaQuery, useTheme } from '@mui/material';
import { getFrozenProposalLink } from 'src/components/infoTooltips/FrozenTooltip';
import { LiquidationPenaltyTooltip } from 'src/components/infoTooltips/LiquidationPenaltyTooltip';
import { LiquidationThresholdTooltip } from 'src/components/infoTooltips/LiquidationThresholdTooltip';
import { MaxLTVTooltip } from 'src/components/infoTooltips/MaxLTVTooltip';
import { FormattedNumber } from 'src/components/primitives/FormattedNumber';
import { Link, ROUTES } from 'src/components/primitives/Link';
import { Warning } from 'src/components/primitives/Warning';
import { ReserveOverviewBox } from 'src/components/ReserveOverviewBox';
import { getEmodeMessage } from 'src/components/transactions/Emode/EmodeNaming';
import { AMPLWarning } from 'src/components/Warnings/AMPLWarning';
import { BorrowDisabledWarning } from 'src/components/Warnings/BorrowDisabledWarning';
import { ComputedReserveData, AppDataProvider, useAppDataContext } from 'src/hooks/app-data-provider/useAppDataProvider';
import { useAssetCaps } from 'src/hooks/useAssetCaps';
import { useProtocolDataContext } from 'src/hooks/useProtocolDataContext';
import { BROKEN_ASSETS } from 'src/hooks/useReservesHistory';

import LightningBoltGradient from '/public/lightningBoltGradient.svg';

import { BorrowInfo } from './BorrowInfo';
import { InterestRateModelGraphContainer } from './graphs/InterestRateModelGraphContainer';
import { PanelItem, PanelRow, PanelTitle } from './ReservePanels';
import { SupplyInfo } from './SupplyInfo';
import { uiConfig } from 'src/uiConfig';
import { DashboardEModeButton } from '../dashboard/DashboardEModeButton';

type ReserveConfigurationProps = {
  reserve: ComputedReserveData;
};

export const ReserveConfiguration: React.FC<ReserveConfigurationProps> = ({ reserve }) => {
  const { currentNetworkConfig, currentMarketData, currentMarket } = useProtocolDataContext();
  const { user, loading } = useAppDataContext();
  const reserveId =
    reserve.underlyingAsset + currentMarketData.addresses.LENDING_POOL_ADDRESS_PROVIDER;
  const renderCharts =
    !!currentNetworkConfig.ratesHistoryApiUrl && !BROKEN_ASSETS.includes(reserveId);
  const { supplyCap, borrowCap, debtCeiling } = useAssetCaps();
  const showSupplyCapStatus: boolean = reserve.supplyCap !== '0';
  const showBorrowCapStatus: boolean = reserve.borrowCap !== '0';
  const theme = useTheme();
  const downToSM = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Paper 
      sx={{ 
        py: '8px',
        borderRadius: '16px',
        marginTop: {xs: '17px', md: '37.5px'},
        mr: {xs: 'unset', md: '24px'},
        boxShadow: '0px 3px 5px 0px #0000000A',
        width: {xs: '100%', md: 'unset'},
      }}>
      <Box>
        {reserve.isFrozen ? (
          <Warning sx={{ mt: '16px', mb: '40px' }} severity="error">
            <Trans>
              This asset is frozen due to an Aave community decision.{' '}
              <Link
                href={getFrozenProposalLink(reserve.symbol, currentMarket)}
                sx={{ textDecoration: 'underline' }}
              >
                <Trans>More details</Trans>
              </Link>
            </Trans>
          </Warning>
        ) : (
          reserve.symbol == 'AMPL' && (
            <Warning sx={{ mt: '16px', mb: '40px' }} severity="warning">
              <AMPLWarning />
            </Warning>
          )
        )}
      </Box>

      {/* --- supply info --- */}
      <PanelRow>
        <PanelTitle>Supply Info</PanelTitle>
        <SupplyInfo
          reserve={reserve}
          currentMarketData={currentMarketData}
          renderCharts={renderCharts}
          showSupplyCapStatus={showSupplyCapStatus}
          supplyCap={supplyCap}
          debtCeiling={debtCeiling}
        />
      </PanelRow>

      {/* --- borrow info --- */}
      {(reserve.borrowingEnabled || Number(reserve.totalDebt) > 0) && (
        <>
          <Divider sx={{ mt: '36.5px', mb: {xs: '15px', md: '8.5px'}, width: '100%'}} />
          <PanelRow>
            <PanelTitle>Borrow Info</PanelTitle>
            <Box sx={{ flexGrow: 1, minWidth: 0, maxWidth: '100%', width: '100%' }}>
              {!reserve.borrowingEnabled && (
                <Warning sx={{ mb: '40px' }} severity="error">
                  <BorrowDisabledWarning symbol={reserve.symbol} currentMarket={currentMarket} />
                </Warning>
              )}
              <BorrowInfo
                reserve={reserve}
                currentMarketData={currentMarketData}
                currentNetworkConfig={currentNetworkConfig}
                renderCharts={renderCharts}
                showBorrowCapStatus={showBorrowCapStatus}
                borrowCap={borrowCap}
              />
            </Box>
          </PanelRow>
        </>
      )}

      {reserve.eModeCategoryId !== 0 && (
        <>
          <Divider sx={{ mt: '32px', mb: {xs: '14px', md: '12px'} }} />
          <PanelRow>
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              marginLeft: '16.2px',
              marginTop: '0.5px',
              // backgroundColor: 'red'
              }}>
              <Box sx={{
                backgroundColor: 'rgba(255, 126, 9, 1)',
                width: '2px',
                height: '24px',
                position: 'absolute',
                left: '-0px',
                }}></Box>
              <img src={uiConfig.emodeLeaf} alt="emode leaf" height={26} width={26} />
              <Typography sx={{
                minWidth: { xs: '170px' }, 
                ml: '6px',
                mt: '3px',
                mb: { xs: '2px', md: '2px' },
                fontWeight: 600,
                fontSize: '20px',
                lineHeight: '1em',
                letterSpacing: '-0.02em',
                color: '#061512',
                }}> Available in E-Mode </Typography> 
              {!downToSM && <DashboardEModeButton userEmodeCategoryId={user.userEmodeCategoryId}/> }
            </Box>
            {downToSM && <Box sx={{
                mt: {xs: '8px', md: 'unset'},
                mb: {xs: '25px', md: 'unset'},
              }}> <DashboardEModeButton userEmodeCategoryId={user.userEmodeCategoryId} /> </Box>}
            <Box sx={{ flexGrow: 1, minWidth: 0, maxWidth: '100%', width: '100%' }}>
              {/* <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
                <Typography variant="secondary14" color="text.secondary">
                  <Trans>E-Mode Category</Trans>
                </Typography>
                <SvgIcon sx={{ fontSize: '14px', mr: 0.5, ml: 2 }}>
                  <LightningBoltGradient />
                </SvgIcon>
                <Typography variant="subheader1">{getEmodeMessage(reserve.eModeLabel)}</Typography>
              </Box> */}
              <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'start',
                flexWrap: 'wrap',
                mt: {xs: '20px', md: '42.5px'},
                ml: '25px',
                gap: {xs: '25px', md: '80px'},
                }}>
                <Box sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'start',
                  }}>
                  <Typography sx={{
                    fontWeight: 500,
                    fontSize: '10px',
                    lineHeight: '1em',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: '#828282',
                    mb: '12.6px',
                    }}> max ltv </Typography>
                  <FormattedNumber value={reserve.formattedEModeLtv} percent size='20px' sx={{ 
                    fontWeight: 500,
                    fontSize: '20px',
                    lineHeight: '1em', 
                    letterSpacing: '-0.02em',
                    color: 'rgba(6, 21, 18, 1)',
                    }}/>
                </Box>
                <Box sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'start',
                  // gap: '7.5px',
                  }}>
                  <Typography sx={{
                    fontWeight: 500,
                    fontSize: '10px',
                    lineHeight: '1em',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: '#828282',
                    mb: '12.6px',
                    }}> liquidation threshold </Typography>
                  <FormattedNumber value={reserve.formattedEModeLiquidationThreshold} percent size='20px' sx={{ 
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
                  }}>
                  <Typography sx={{
                    fontWeight: 500,
                    fontSize: '10px',
                    lineHeight: '1em',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: '#828282',
                    mb: '12.6px',
                    }}> liquidation penalty </Typography>
                  <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '0.33em',
                    mb: '6px',
                    }}>
                    <FormattedNumber percent value={reserve.formattedEModeLiquidationBonus} sx={{ 
                      fontWeight: 500,
                      fontSize: '20px',
                      lineHeight: '1em', 
                      letterSpacing: '-0.02em',
                      color: '#061512',
                      }}/></Box></Box></Box>
              <Typography sx={{
                ml: '25px',
                mr: {xs: '25px', md: '110px'},
                mt: {xs: '15px', md: '25px'},
                mb: '20px',
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '1.5em',
                letterSpacing: '0em',
                color: '#061512',
                }}>
                E-Mode boosts your LTV for assets within the same category, giving you higher borrowing power. 
                Categories are set by governance. You can enable E-Mode in your{' '}
                <Link href={ROUTES.dashboard} sx={{ 
                  textDecoration: 'underline',
                  fontWeight: 700,
                  fontSize: '14px',
                  lineHeight: '1.5em',
                  letterSpacing: '0em',
                  textDecorationSkipInk: 'true',
                  textDecorationStyle: 'solid',
                  }}
                  >Dashboard</Link> or use the button above.
              </Typography>
            </Box>
          </PanelRow>
        </>
      )}

      {/* --- interest rate model --- */}
      {(reserve.borrowingEnabled || Number(reserve.totalDebt) > 0) && (
        <>
          <Divider sx={{ mt: '32px', mb: {xs:'15px', md: '10px'} }} />
          <PanelRow>
            <PanelTitle>Interest Rate Model</PanelTitle>
            <Box sx={{
              ml: '25px',
              mt: '14px',
              }}>
              <PanelItem title={<Trans>Utilization Rate</Trans>} className="borderless">
                <FormattedNumber value={reserve.borrowUsageRatio} percent size='24px' symbolsColor='#828282' sx={{
                  fontWeight: 500,
                  fontSize: '24px',
                  lineHeight: '1em',
                  letterSpacing: '-0.02em',
                  color:'#061512',
                  }}/></PanelItem></Box>
            <Box>
              <InterestRateModelGraphContainer reserve={reserve} />
            </Box>
          </PanelRow>
        </>
      )}

      <Box sx={{display: downToSM ? 'none': 'unset'}}>
        <Divider sx={{ mt: '15px', mb: '10px' }} />
        <PanelRow>
          <PanelTitle>Market Details</PanelTitle>
        </PanelRow>

        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mt: '40px',
          mb: '16px',
          ml: '25px',
          mr: '30px',
          }}>
          <Typography sx={{
            fontWeight: 400,
            fontSize: '16px',
            letterSpacing: '-0.02em',
            lineHeight: '1em',
            color: '#828282',
            }}>
            Token Contract
          </Typography>
          <Typography sx={{
            fontWeight: 400,
            fontSize: '16px',
            letterSpacing: '-0.02em',
            lineHeight: '1em',
            color: '#061512',
            }}>
            {reserve.underlyingAsset}
          </Typography>
        </Box>
        <Divider sx={{ml: '24px', mr: '27px'}}/>

        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mt: '16px',
          mb: '16px',
          ml: '25px',
          mr: '30px',
          }}>
          <Typography sx={{
            fontWeight: 400,
            fontSize: '16px',
            letterSpacing: '-0.02em',
            lineHeight: '1em',
            color: '#828282',
            }}>
            Oracle contract
          </Typography>
          <Typography sx={{
            fontWeight: 400,
            fontSize: '16px',
            letterSpacing: '-0.02em',
            lineHeight: '1em',
            color: '#061512',
            }}>
            {reserve.priceOracle}
          </Typography>
        </Box>
        <Divider sx={{ml: '24px', mr: '27px'}}/>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mt: '16px',
          mb: '16px',
          ml: '25px',
          mr: '30px',
          }}>
          <Typography sx={{
            fontWeight: 400,
            fontSize: '16px',
            letterSpacing: '-0.02em',
            lineHeight: '1em',
            color: '#828282',
            }}>
            Oracle provider
          </Typography>
          <Typography sx={{
            fontWeight: 400,
            fontSize: '16px',
            letterSpacing: '-0.02em',
            lineHeight: '1em',
            color: '#061512',
            }}>
            Pyth
          </Typography>
        </Box>
        
        {/* <Divider sx={{ml: '24px', mr: '27px'}}/>

        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mt: '16px',
          mb: '16px',
          ml: '25px',
          mr: '30px',
          }}>
          <Typography sx={{
            fontWeight: 400,
            fontSize: '16px',
            letterSpacing: '-0.02em',
            lineHeight: '1em',
            color: '#828282',
            }}>
            Last oracle update
          </Typography>
          <Typography sx={{
            fontWeight: 400,
            fontSize: '16px',
            letterSpacing: '-0.02em',
            lineHeight: '1em',
            color: '#061512',
            }}>
            about 1 hour ago
          </Typography>
        </Box> */}
      </Box>

    </Paper>
  );
};
