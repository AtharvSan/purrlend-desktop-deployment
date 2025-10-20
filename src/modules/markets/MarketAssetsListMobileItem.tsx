import { Trans } from '@lingui/macro';
import { Box, Button, Divider, Typography } from '@mui/material';
import { StableAPYTooltip } from 'src/components/infoTooltips/StableAPYTooltip';
import { VariableAPYTooltip } from 'src/components/infoTooltips/VariableAPYTooltip';
import { NoData } from 'src/components/primitives/NoData';
import { ReserveSubheader } from 'src/components/ReserveSubheader';
import { useProtocolDataContext } from 'src/hooks/useProtocolDataContext';

import { IncentivesCard } from '../../components/incentives/IncentivesCard';
import { FormattedNumber } from '../../components/primitives/FormattedNumber';
import { Link, ROUTES } from '../../components/primitives/Link';
import { Row } from '../../components/primitives/Row';
import { ComputedReserveData } from '../../hooks/app-data-provider/useAppDataProvider';
import { ListMobileItemWrapper } from '../dashboard/lists/ListMobileItemWrapper';
import { useModalContext } from 'src/hooks/useModal';
import { uiConfig } from 'src/uiConfig';

export const MarketAssetsListMobileItem = ({ ...reserve }: ComputedReserveData) => {
  const { currentMarket } = useProtocolDataContext();
  const { openSupply } = useModalContext();

  return (
    <ListMobileItemWrapper
      symbol={reserve.symbol}
      iconSymbol={reserve.iconSymbol}
      name={reserve.name}
      underlyingAsset={reserve.underlyingAsset}
      currentMarket={currentMarket}
      showSupply={true}
      showBorders={true}
      ptCustom={'16px'}
    >
      <Divider sx={{ mb: 3 }} />
      <Row caption={
        <Typography sx={{
          fontWeight: 400,
          fontSize: '16px',
          lineHeight: '1em',
          letterSpacing: '-0.02em',
          color: '#828282',
        }}>
          <Trans>Total supplied</Trans>
        </Typography>
        } captionVariant="description" mb={3}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: { xs: 'flex-end' },
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <FormattedNumber compact value={reserve.totalLiquidity} visibleDecimals={2} fontSize={16} fontWeight={400} lineHeight={'1em'} letterSpacing={'-0.02em'} color={'#252525'} />
          <ReserveSubheader fs={'14px'} value={reserve.totalLiquidityUSD} rightAlign={true} />
        </Box>
      </Row>
      <Row
        caption={
          <Typography sx={{
          fontWeight: 400,
          fontSize: '16px',
          lineHeight: '1em',
          letterSpacing: '-0.02em',
          color: '#828282',
          }}>
            <Trans>Supply APY</Trans>
          </Typography>
        }
        captionVariant="description"
        mb={3}
        align="flex-start"
      >
        <IncentivesCard
          align="flex-end"
          value={reserve.supplyAPY}
          incentives={reserve.aIncentivesData || []}
          symbol={reserve.symbol}
          variant="secondary14"
        />
      </Row>

      <Row 
        caption={
          <Typography sx={{
          fontWeight: 400,
          fontSize: '16px',
          lineHeight: '1em',
          letterSpacing: '-0.02em',
          color: '#828282',
          }}>
            <Trans>Total borrowed</Trans>
          </Typography>
        } captionVariant="description" mb={3}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: { xs: 'flex-end' },
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          {Number(reserve.totalDebt) > 0 ? (
            <>
              <FormattedNumber compact value={reserve.totalDebt} visibleDecimals={2} fontSize={16} fontWeight={400} lineHeight={'1em'} letterSpacing={'-0.02em'} color={'#252525'} />
              <ReserveSubheader fs={'14px'} value={reserve.totalDebtUSD} rightAlign={true} />
            </>
          ) : (
            <NoData variant={'secondary14'} color="text.secondary" />
          )}
        </Box>
      </Row>
      <Row
        caption={
          <Typography sx={{
          fontWeight: 400,
          fontSize: '16px',
          lineHeight: '1em',
          letterSpacing: '-0.02em',
          color: '#828282',
          }}>
            <Trans>Borrow APY</Trans>
          </Typography>
        }
        captionVariant="description"
        mb={3}
        align="flex-start"
      >
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <IncentivesCard
            align="flex-end"
            value={Number(reserve.totalVariableDebtUSD) > 0 ? reserve.variableBorrowAPY : '-1'}
            incentives={reserve.vIncentivesData || []}
            symbol={reserve.symbol}
            variant="secondary14"
          />
          {!reserve.borrowingEnabled &&
            Number(reserve.totalVariableDebt) > 0 &&
            !reserve.isFrozen && <ReserveSubheader value={'Disabled'} />}
        </Box>
      </Row>
      
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Typography sx={{
          fontWeight: 400,
          fontSize: '16px',
          lineHeight: '1em',
          letterSpacing: '-0.02em',
          color: '#828282',
        }}>
          Oracle
        </Typography>

        <Box sx={{display: 'flex', alignItems: 'center' }}>
          <img src={uiConfig.pyth} alt="oracle icon" width={20} />
          <Typography sx={{
            ml: 2,
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '1em',
            letterSpacing: '-0.02em',
            color: '#252525',
          }}>
            Pyth
          </Typography>
        </Box>
      </Box>

    </ListMobileItemWrapper>
  );
};
