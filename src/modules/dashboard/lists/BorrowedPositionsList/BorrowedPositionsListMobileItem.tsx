import { InterestRate } from '@aave/contract-helpers';
import { Trans } from '@lingui/macro';
import { Box, Button, Typography } from '@mui/material';
import { useProtocolDataContext } from 'src/hooks/useProtocolDataContext';
import { DashboardReserve } from 'src/utils/dashboardSortUtils';

import { IncentivesCard } from '../../../../components/incentives/IncentivesCard';
import { APYTypeTooltip } from '../../../../components/infoTooltips/APYTypeTooltip';
import { Row } from '../../../../components/primitives/Row';
import { useModalContext } from '../../../../hooks/useModal';
import { ListItemAPYButton } from '../ListItemAPYButton';
import { ListMobileItemWrapper } from '../ListMobileItemWrapper';
import { ListValueRow } from '../ListValueRow';

export const BorrowedPositionsListMobileItem = ({
  reserve,
  totalBorrows,
  totalBorrowsUSD,
  borrowRateMode,
  stableBorrowAPY,
}: DashboardReserve) => {
  const { currentMarket } = useProtocolDataContext();
  const { openBorrow, openRepay, openRateSwitch } = useModalContext();
  const {
    symbol,
    iconSymbol,
    name,
    isActive,
    isFrozen,
    borrowingEnabled,
    stableBorrowRateEnabled,
    sIncentivesData,
    vIncentivesData,
    variableBorrowAPY,
    underlyingAsset,
  } = reserve;

  return (
    <ListMobileItemWrapper
      symbol={symbol}
      iconSymbol={iconSymbol}
      name={name}
      underlyingAsset={reserve.underlyingAsset}
      currentMarket={currentMarket}
      frozen={reserve.isFrozen}
      borrowEnabled={reserve.borrowingEnabled}
      showBorrowCapTooltips
    >
      <ListValueRow
        title={
          <Typography sx={{
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '1em',
            letterSpacing: '-0.02em',
            color: '#828282',
          }}>
            <Trans>Debt</Trans>
          </Typography>
        }
        value={Number(totalBorrows)}
        subValue={Number(totalBorrowsUSD)}
        disabled={Number(totalBorrows) === 0}
      />

      <Row caption={
      <Typography sx={{
        fontWeight: 400,
        fontSize: '16px',
        lineHeight: '1em',
        letterSpacing: '-0.02em',
        color: '#828282',
      }}>
        <Trans>APY</Trans>
      </Typography>
      } align="flex-start" captionVariant="description" mb={2}>
        <IncentivesCard
          value={Number(
            borrowRateMode === InterestRate.Variable ? variableBorrowAPY : stableBorrowAPY
          )}
          incentives={borrowRateMode === InterestRate.Variable ? vIncentivesData : sIncentivesData}
          symbol={symbol}
          variant="secondary14"
        />
      </Row>

      {/* <Row
        caption={
          <APYTypeTooltip text={<Trans>APY type</Trans>} key="APY type" variant="description" />
        }
        captionVariant="description"
        mb={2}
      >
        <ListItemAPYButton
          stableBorrowRateEnabled={stableBorrowRateEnabled}
          borrowRateMode={borrowRateMode}
          disabled={!stableBorrowRateEnabled || isFrozen || !isActive}
          onClick={() => openRateSwitch(underlyingAsset, borrowRateMode)}
          stableBorrowAPY={stableBorrowAPY}
          variableBorrowAPY={variableBorrowAPY}
          underlyingAsset={underlyingAsset}
          currentMarket={currentMarket}
        />
      </Row> */}

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '3%', mt: 5 }}>
        <Button
          disabled={!isActive}
          variant="contained"
          onClick={() => openRepay(underlyingAsset, borrowRateMode, isFrozen)}
          fullWidth
          sx={{
            border: '1px solid #FFFFFF33',
            borderRadius: '70px',
            backgroundColor: '#061512',
            color: '#FFFFFF',
            height: '38px',
          }}
        >
          <Typography sx={{
            fontWeight: 500,
            fontSize: '14px',
            lineHeight: '1em',
            letterSpacing: '-0.02em',
          }}>
            <Trans>Repay</Trans>
          </Typography>
        </Button>
        <Button
          disabled={!isActive || !borrowingEnabled || isFrozen}
          variant="outlined"
          onClick={() => openBorrow(underlyingAsset)}
          fullWidth
          sx={{ 
            border: '1px solid #DCDCDC',
            borderRadius: '70px',
            backgroundColor: '#FFFFFF',
            color: '#061512',
            height: '38px',
          }}
        >
          <Typography sx={{
            fontWeight: 500,
            fontSize: '14px',
            lineHeight: '1em',
            letterSpacing: '-0.02em',
          }}>
            <Trans>Borrow</Trans>
          </Typography>
        </Button>
      </Box>
    </ListMobileItemWrapper>
  );
};
