import { valueToBigNumber } from '@aave/math-utils';
import { Trans } from '@lingui/macro';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import * as React from 'react';

import PieIcon from '../../../public/icons/markets/pie-icon.svg';
import TotalBorrowIcon from '../../../public/icons/markets/total-borrow-indicator.svg';
import TotalSupplyIcon from '../../../public/icons/markets/total-supply-indicator.svg';
import { FormattedNumber } from '../../components/primitives/FormattedNumber';
import { TopInfoPanel } from '../../components/TopInfoPanel/TopInfoPanel';
import { TopInfoPanelItem } from '../../components/TopInfoPanel/TopInfoPanelItem';
import { useAppDataContext } from '../../hooks/app-data-provider/useAppDataProvider';
import { uiConfig } from 'src/uiConfig';

export const MarketsTopPanel = () => {
  const { reserves, loading } = useAppDataContext();

  const theme = useTheme();
  const downToSM = useMediaQuery(theme.breakpoints.down('sm'));

  const aggregatedStats = reserves.reduce(
    (acc, reserve) => {
      return {
        totalLiquidity: acc.totalLiquidity.plus(reserve.totalLiquidityUSD),
        totalDebt: acc.totalDebt.plus(reserve.totalDebtUSD),
      };
    },
    {
      totalLiquidity: valueToBigNumber(0),
      totalDebt: valueToBigNumber(0),
    }
  );

  const valueTypographyVariant = downToSM ? 'main16' : 'main21';
  const symbolsVariant = downToSM ? 'secondary16' : 'secondary21';

  return (
    <>
    <Box sx={{
      backgroundImage: 'linear-gradient(90deg, #061512 0%, #00380D 100%)',
      color: '#F1F1F3',
      // mx: '8.32%',
      mx: 'auto',
      width: '1199px',
      mt: '25px',
      borderRadius: '16px',
      display: 'flex',
      justifyContent: 'space-between',
      pt: '14px',
      pb: '12px',
      px: '20px',
      }}>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '16px',
        }}>
        <img src={uiConfig.hype} height={38} />
        <Typography sx={{ 
          color: '#FFFFFF',
          fontWeight: 600,
          fontSize: '32px',
          lineHeight: '1em',
          letterSpacing: '-0.02em',
          }}>HyperEVM Market</Typography></Box>

      <Box sx={{
        display: 'flex',
        gap: '50px',
        }}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '9px',
          }}>
          <Typography sx={{
            fontWeight: 600,
            fontSize: '10px',
            lineHeight: '1em',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#FFFFFF99',
            }}> total market size </Typography>
          <FormattedNumber
            value={aggregatedStats.totalLiquidity.toString()}
            symbol="USD"
            variant={valueTypographyVariant}
            visibleDecimals={2}
            compact
            symbolsColor="#FFFFFF99"
            symbolsVariant={symbolsVariant}
            size='24px'
            fontSize={'24px'}
            fontWeight={500}
            letterSpacing={'-0.02em'}
            />
        </Box>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          }}>
          <Typography sx={{
            fontWeight: 600,
            fontSize: '10px',
            lineHeight: '1em',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#FFFFFF99',
            }}> Total available </Typography>
          <FormattedNumber
            value={aggregatedStats.totalLiquidity.minus(aggregatedStats.totalDebt).toString()}
            symbol="USD"
            variant={valueTypographyVariant}
            visibleDecimals={2}
            compact
            symbolsColor="#FFFFFF99"
            symbolsVariant={symbolsVariant}
            size='24px'
            fontSize={'24px'}
            fontWeight={500}
            letterSpacing={'-0.02em'}
            />
        </Box>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          }}>
          <Typography sx={{
            fontWeight: 600,
            fontSize: '10px',
            lineHeight: '1em',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#FFFFFF99',
            }}> Total borrows </Typography>
          <FormattedNumber
            value={aggregatedStats.totalDebt.toString()}
            symbol="USD"
            variant={valueTypographyVariant}
            visibleDecimals={2}
            compact
            symbolsColor="#FFFFFF99"
            symbolsVariant={symbolsVariant}
            size='24px'
            fontSize={'24px'}
            fontWeight={500}
            letterSpacing={'-0.02em'}
            /></Box></Box>
    </Box>

    {/* <TopInfoPanel pageTitle={<Trans>Markets</Trans>} withMarketSwitcher>
      <TopInfoPanelItem
        icon={<PieIcon />}
        title={<Trans>Total market size</Trans>}
        loading={loading}
      >
        <FormattedNumber
          value={aggregatedStats.totalLiquidity.toString()}
          symbol="USD"
          variant={valueTypographyVariant}
          visibleDecimals={2}
          compact
          symbolsColor="#FFFFFF"
          symbolsVariant={symbolsVariant}
        />
      </TopInfoPanelItem>
      <TopInfoPanelItem
        icon={<TotalSupplyIcon />}
        title={<Trans>Total available</Trans>}
        loading={loading}
      >
        <FormattedNumber
          value={aggregatedStats.totalLiquidity.minus(aggregatedStats.totalDebt).toString()}
          symbol="USD"
          variant={valueTypographyVariant}
          visibleDecimals={2}
          compact
          symbolsColor="#FFFFFF"
          symbolsVariant={symbolsVariant}
        />
      </TopInfoPanelItem>
      <TopInfoPanelItem
        icon={<TotalBorrowIcon />}
        title={<Trans>Total borrows</Trans>}
        loading={loading}
      >
        <FormattedNumber
          value={aggregatedStats.totalDebt.toString()}
          symbol="USD"
          variant={valueTypographyVariant}
          visibleDecimals={2}
          compact
          symbolsColor="#FFFFFF"
          symbolsVariant={symbolsVariant}
        />
      </TopInfoPanelItem>
    </TopInfoPanel> */}
    </>
  );
};
