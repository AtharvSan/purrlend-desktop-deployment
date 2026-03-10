import { valueToBigNumber } from '@aave/math-utils';
import { Trans } from '@lingui/macro';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { CapsCircularStatus } from 'src/components/caps/CapsCircularStatus';
import CapsSemiGauge from 'src/components/caps/CapsSemiGauge';
import { IncentivesButton } from 'src/components/incentives/IncentivesButton';
import { StableAPYTooltip } from 'src/components/infoTooltips/StableAPYTooltip';
import { VariableAPYTooltip } from 'src/components/infoTooltips/VariableAPYTooltip';
import { FormattedNumber } from 'src/components/primitives/FormattedNumber';
import { Link } from 'src/components/primitives/Link';
import { ReserveSubheader } from 'src/components/ReserveSubheader';
import { TextWithTooltip } from 'src/components/TextWithTooltip';
import { ComputedReserveData } from 'src/hooks/app-data-provider/useAppDataProvider';
import { AssetCapHookData } from 'src/hooks/useAssetCaps';
import { MarketDataType, NetworkConfig } from 'src/utils/marketsAndNetworksConfig';

import { ApyGraphContainer } from './graphs/ApyGraphContainer';
import { ReserveFactorOverview } from './ReserveFactorOverview';
import { PanelItem } from './ReservePanels';

interface BorrowInfoProps {
  reserve: ComputedReserveData;
  currentMarketData: MarketDataType;
  currentNetworkConfig: NetworkConfig;
  renderCharts: boolean;
  showBorrowCapStatus: boolean;
  borrowCap: AssetCapHookData;
}

export const BorrowInfo = ({
  reserve,
  currentMarketData,
  currentNetworkConfig,
  renderCharts,
  showBorrowCapStatus,
  borrowCap,
}: BorrowInfoProps) => {
  const theme = useTheme();
  const downToSM = useMediaQuery(theme.breakpoints.down('sm'));
  const _size = downToSM ? 250 : 300;
  const _thickness = downToSM ? 26 : 31;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        mr: { xs: '35px', md: '134px' },
        marginLeft: '16px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'start',
          flexWrap: 'wrap',
          mt: { xs: '35px', md: '42.5px' },
          ml: '6.5px',
          gap: { xs: '22px', md: '48px' },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'start',
          }}
        >
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: '10px',
              lineHeight: '1em',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#828282',
              mb: '12.6px',
            }}
          >
            {' '}
            Total borrowed{' '}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: '0.33em',
              mb: '6px',
            }}
          >
            <FormattedNumber
              visibleDecimals={2}
              value={reserve.totalDebt}
              sx={{
                fontWeight: 500,
                fontSize: '20px',
                lineHeight: '1em',
                letterSpacing: '-0.02em',
                color: '#061512',
              }}
            />
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: '20px',
                lineHeight: '1em',
                letterSpacing: '-0.02em',
                color: '#828282',
              }}
            >
              {' '}
              of{' '}
            </Typography>
            <FormattedNumber
              visibleDecimals={0}
              value={reserve.borrowCap}
              sx={{
                fontWeight: 500,
                fontSize: '20px',
                lineHeight: '1em',
                letterSpacing: '-0.02em',
                color: '#061512',
              }}
            />
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'start',
              gap: '0.33em',
            }}
          >
            <FormattedNumber
              visibleDecimals={2}
              value={reserve.totalDebtUSD}
              symbol={'USD'}
              symbolsColor="#828282"
              size="16px"
              sx={{
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '1em',
                letterSpacing: '-0.02em',
                color: '#828282',
              }}
            />
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '1em',
                letterSpacing: '-0.02em',
                color: '#828282',
                mt: '3px',
              }}
            >
              {' '}
              of{' '}
            </Typography>
            <FormattedNumber
              visibleDecimals={0}
              value={reserve.borrowCapUSD}
              symbol={'USD'}
              symbolsColor="#828282"
              size="16px"
              sx={{
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '1em',
                letterSpacing: '-0.02em',
                color: '#828282',
              }}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'start',
            gap: '7.5px',
          }}
        >
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: '10px',
              lineHeight: '1em',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#828282',
            }}
          >
            {' '}
            APY{' '}
          </Typography>
          <FormattedNumber
            visibleDecimals={2}
            value={reserve.variableBorrowAPY}
            percent
            size="20px"
            sx={{
              fontWeight: 500,
              fontSize: '20px',
              lineHeight: '1em',
              letterSpacing: '-0.02em',
              color: 'rgba(6, 21, 18, 1)',
            }}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'start',
          }}
        >
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: '10px',
              lineHeight: '1em',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#828282',
              mb: '12.6px',
            }}
          >
            {' '}
            borrow cap{' '}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: '0.33em',
              mb: '6px',
            }}
          >
            <FormattedNumber
              visibleDecimals={0}
              value={reserve.borrowCap}
              sx={{
                fontWeight: 500,
                fontSize: '20px',
                lineHeight: '1em',
                letterSpacing: '-0.02em',
                color: '#061512',
              }}
            />
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'start',
              gap: '0.33em',
            }}
          >
            <FormattedNumber
              visibleDecimals={0}
              value={reserve.borrowCapUSD}
              symbol={'USD'}
              symbolsColor="#828282"
              size="16px"
              sx={{
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '1em',
                letterSpacing: '-0.02em',
                color: '#828282',
              }}
            />
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          pt: '35px',
        }}
      >
        <CapsSemiGauge
          value={borrowCap.percentUsed} // borrowCap.percentUsed
          label="FILLED"
          size={_size}
          thickness={_thickness}
          arcColor="rgba(24,204,111,1)"
          trackColor="#E8E8E8"
          borderOpacity={0.08}
          shadowOpacity={0.18}
          gap={1.5} // keeps the green separated from grey
          centerOffset={10} // pushes texts down so % doesn't touch the rail
          valueFontSize={18} // tune to taste
          labelFontSize={9} // smaller “FILLED”
        />
      </Box>
    </Box>
  );
};

{
  /* <Box sx={{ 
      marginLeft: '16px',
      }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          mt: '35px',
          // backgroundColor: 'red',
        }}
      >
        {showBorrowCapStatus ? (
          // With a borrow cap
          <>
            <PanelItem
              title={
                <Box display="flex" alignItems="center">
                  <Trans>Total borrowed</Trans>
                  <TextWithTooltip>
                    <>
                      <Trans>
                        Borrowing of this asset is limited to a certain amount to minimize liquidity
                        pool insolvency.
                      </Trans>{' '}
                      <Link
                        href="https://docs.aave.com/developers/whats-new/supply-borrow-caps"
                        underline="always"
                      >
                        <Trans>Learn more</Trans>
                      </Link>
                    </>
                  </TextWithTooltip>
                </Box>
              }
            >
              <Box>
                <FormattedNumber value={reserve.totalDebt} variant="main16" />
                <Typography
                  component="span"
                  color="text.primary"
                  variant="secondary16"
                  sx={{ display: 'inline-block', mx: 1 }}
                >
                  <Trans>of</Trans>
                </Typography>
                <FormattedNumber value={reserve.borrowCap} variant="main16" />
              </Box>
              <Box>
                <ReserveSubheader value={reserve.totalDebtUSD} />
                <Typography
                  component="span"
                  color="text.primary"
                  variant="secondary16"
                  sx={{ display: 'inline-block', mx: 1 }}
                >
                  <Trans>of</Trans>
                </Typography>
                <ReserveSubheader value={reserve.borrowCapUSD} />
              </Box>
            </PanelItem>
          </>
        ) : (
          // Without a borrow cap
          <PanelItem
            title={
              <Box display="flex" alignItems="center">
                <Trans>Total borrowed</Trans>
              </Box>
            }
          >
            <FormattedNumber value={reserve.totalDebt} variant="main16" />
            <ReserveSubheader value={reserve.totalDebtUSD} />
          </PanelItem>
        )}
        <PanelItem
          title={
            <VariableAPYTooltip
              text={<Trans>APY, variable</Trans>}
              key="APY_res_variable_type"
              variant="description"
            />
          }
        >
          <FormattedNumber value={reserve.variableBorrowAPY} percent variant="main16" />
          <IncentivesButton
            symbol={reserve.symbol}
            incentives={reserve.vIncentivesData}
            displayBlank={true}
          />
        </PanelItem>
        {reserve.stableBorrowRateEnabled && (
          <PanelItem
            title={
              <StableAPYTooltip
                text={<Trans>APY, stable</Trans>}
                key="APY_res_stable_type"
                variant="description"
              />
            }
          >
            <FormattedNumber value={reserve.stableBorrowAPY} percent variant="main16" />
            <IncentivesButton
              symbol={reserve.symbol}
              incentives={reserve.sIncentivesData}
              displayBlank={true}
            />
          </PanelItem>
        )}
        {reserve.borrowCapUSD && reserve.borrowCapUSD !== '0' && (
          <PanelItem title={<Trans>Borrow cap</Trans>}>
            <FormattedNumber value={reserve.borrowCap} variant="main16" />
            <ReserveSubheader value={reserve.borrowCapUSD} />
          </PanelItem>
        )}
        <CapsSemiGauge value={10.51} // borrowCap.percentUsed
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
          />
        <CapsCircularStatus
          value={borrowCap.percentUsed}
          tooltipContent={
            <>
              <Trans>
                Maximum amount available to supply is{' '}
                <FormattedNumber
                  value={
                    valueToBigNumber(reserve.borrowCap).toNumber() -
                    valueToBigNumber(reserve.totalDebt).toNumber()
                  }
                  variant="secondary12"
                />{' '}
                {reserve.symbol} (
                <FormattedNumber
                  value={
                    valueToBigNumber(reserve.borrowCapUSD).toNumber() -
                    valueToBigNumber(reserve.totalDebtUSD).toNumber()
                  }
                  variant="secondary12"
                  symbol="USD"
                />
                ).
              </Trans>
            </>
          }
        />
      </Box>
      {renderCharts && (
        <ApyGraphContainer
          graphKey="borrow"
          reserve={reserve}
          currentMarketData={currentMarketData}
        />
      )}
      <Box
        sx={{ display: 'inline-flex', alignItems: 'center', pt: '42px', pb: '12px' }}
        paddingTop={'42px'}
      >
        <Typography variant="subheader1" color="text.main">
          <Trans>Collector Info</Trans>
        </Typography>
      </Box>
      {currentMarketData.addresses.COLLECTOR && (
        <ReserveFactorOverview
          collectorContract={currentMarketData.addresses.COLLECTOR}
          explorerLinkBuilder={currentNetworkConfig.explorerLinkBuilder}
          reserveFactor={reserve.reserveFactor}
        />
      )}
    </Box> */
}
