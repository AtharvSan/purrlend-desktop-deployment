import { InterestRate } from '@aave/contract-helpers';
import { Trans } from '@lingui/macro';
import { Box, Button, Typography } from '@mui/material';
import { useModalContext } from 'src/hooks/useModal';
import { useProtocolDataContext } from 'src/hooks/useProtocolDataContext';
import { DashboardReserve } from 'src/utils/dashboardSortUtils';

import { ListColumn } from '../../../../components/lists/ListColumn';
import { ListAPRColumn } from '../ListAPRColumn';
import { ListButtonsColumn } from '../ListButtonsColumn';
import { ListItemAPYButton } from '../ListItemAPYButton';
import { ListItemWrapper } from '../ListItemWrapper';
import { ListValueColumn } from '../ListValueColumn';
import { TokenIcon } from 'src/components/primitives/TokenIcon';
import { FormattedNumber } from 'src/components/primitives/FormattedNumber';
import router from 'next/router';
import { ROUTES } from 'src/components/primitives/Link';

export const BorrowedPositionsListItem = ({
  reserve,
  variableBorrows,
  variableBorrowsUSD,
  stableBorrows,
  stableBorrowsUSD,
  borrowRateMode,
  stableBorrowAPY,
}: DashboardReserve) => {
  const { openBorrow, openRepay, openRateSwitch } = useModalContext();
  const { currentMarket } = useProtocolDataContext();
  const {
    isActive,
    isFrozen,
    borrowingEnabled,
    stableBorrowRateEnabled,
    sIncentivesData,
    vIncentivesData,
    variableBorrowAPY,
  } = reserve;

  return (
    <>
    <Box sx={{
    display: 'flex',
    alignItems: 'start',
    pl: '17px',
    my: '12px',
    }}>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
      }}
      onClick={() => reserve.underlyingAsset!=='0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee' ? router.push(ROUTES.reserveOverview(reserve.underlyingAsset, currentMarket)):router.push(ROUTES.reserveOverview('0x5555555555555555555555555555555555555555', currentMarket))}
      >
        <TokenIcon symbol={reserve.iconSymbol} sx={{ height: '19px',width: '19px', mr: '6px', mt:'4px'}} />
        <Box sx={{
        display: 'flex',
        alignItems: 'center',
        width: '125px',  
        mt: '7px',
        }}>
          <Typography sx={{
          fontWeight: 400,
          fontSize: '14px',
          lineHeight: '1em',
          letterSpacing: '-0.02em',
          }}>
            {reserve.symbol}
          </Typography>
        </Box>
      </Box>
      <Box sx={{
        width: '133px',
        mt: '7px',
      }}>
        <ListValueColumn
        symbol={reserve.symbol}
        value={Number(borrowRateMode === InterestRate.Variable ? variableBorrows : stableBorrows)}
        subValue={Number(
          borrowRateMode === InterestRate.Variable ? variableBorrowsUSD : stableBorrowsUSD
        )}
        />
      </Box>
      <Box sx={{
        width: '111px',
        mt: '5px',
      }}>
        <FormattedNumber 
        value={Number(borrowRateMode === InterestRate.Variable ? variableBorrowAPY : stableBorrowAPY)} 
        color={'#061512'} 
        fontWeight={400} 
        fontSize={'14px'} 
        size={'14px'}
        lineHeight={'1em'} 
        letterSpacing={'-0.02em'} 
        percent 
        symbolsColor='#828282' 
        />
      </Box>
      <Box>
        <ListButtonsColumn>
          <Button
            disabled={!isActive}
            variant="contained"
            // onClick={() => openRepay(reserve.underlyingAsset, borrowRateMode, isFrozen)}
            onClick={() => openBorrow(reserve.underlyingAsset)}
            sx={{
              backgroundColor: 'rgba(6, 21, 18, 1)',
              color: '#FFFFFF',
              border: '1px solid',
              borderColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '70px',
              py: '7px',
              px: '12px',
              fontSize: '14px',
              lineHeight: '1em',
              letterSpacing: '-0.02em',
              mr: '8px',
            }}
          >
            {/* <Trans>Repay</Trans> */}
            <Trans>Borrow</Trans>
          </Button>
          <Button
            disabled={!isActive || !borrowingEnabled || isFrozen}
            // variant="outlined"
            // onClick={() => openBorrow(reserve.underlyingAsset)}
            onClick={() => openRepay(reserve.underlyingAsset, borrowRateMode, isFrozen)}
            sx={{
            py: '7px',
            px: '12px',
            fontSize: '14px',
            lineHeight: '1em',
            letterSpacing: '-0.02em',
            backgroundColor: 'rgba(255, 255, 255, 1)',
            border: '1px solid',
            borderColor: 'rgba(220, 220, 220, 1)',
            color: 'rgba(6, 21, 18, 1)',
            borderRadius: '70px',
            minWidth: 'unset',
            }}
          >
            {/* <Trans>Borrow</Trans> */}
            <Trans>Repay</Trans>
          </Button>
        </ListButtonsColumn>
      </Box>
    </Box>
    {/* <ListItemWrapper
      symbol={reserve.symbol}
      iconSymbol={reserve.iconSymbol}
      name={reserve.name}
      detailsAddress={reserve.underlyingAsset}
      currentMarket={currentMarket}
      frozen={reserve.isFrozen}
      borrowEnabled={reserve.borrowingEnabled}
      data-cy={`dashboardBorrowedListItem_${reserve.symbol.toUpperCase()}_${borrowRateMode}`}
      showBorrowCapTooltips
    >
      <ListValueColumn
        symbol={reserve.symbol}
        value={Number(borrowRateMode === InterestRate.Variable ? variableBorrows : stableBorrows)}
        subValue={Number(
          borrowRateMode === InterestRate.Variable ? variableBorrowsUSD : stableBorrowsUSD
        )}
      />

      <ListAPRColumn
        value={Number(
          borrowRateMode === InterestRate.Variable ? variableBorrowAPY : stableBorrowAPY
        )}
        incentives={borrowRateMode === InterestRate.Variable ? vIncentivesData : sIncentivesData}
        symbol={reserve.symbol}
      />

      <ListColumn>
        <ListItemAPYButton
          stableBorrowRateEnabled={stableBorrowRateEnabled}
          borrowRateMode={borrowRateMode}
          disabled={!stableBorrowRateEnabled || isFrozen || !isActive}
          onClick={() => openRateSwitch(reserve.underlyingAsset, borrowRateMode)}
          stableBorrowAPY={reserve.stableBorrowAPY}
          variableBorrowAPY={reserve.variableBorrowAPY}
          underlyingAsset={reserve.underlyingAsset}
          currentMarket={currentMarket}
        />
      </ListColumn>

      <ListButtonsColumn>
        <Button
          disabled={!isActive}
          variant="contained"
          onClick={() => openRepay(reserve.underlyingAsset, borrowRateMode, isFrozen)}
          sx={{
            backgroundColor: 'rgba(6, 21, 18, 1)',
            color: '#FFFFFF',
            border: '1px solid',
            borderColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '70px',
            py: '7px',
            px: '12px',
            fontSize: '14px',
            lineHeight: '1em',
            letterSpacing: '-0.02em',
          }}
        >
          <Trans>Repay</Trans>
        </Button>
        <Button
          disabled={!isActive || !borrowingEnabled || isFrozen}
          variant="outlined"
          onClick={() => openBorrow(reserve.underlyingAsset)}
          sx={{
          py: '7px',
          px: '12px',
          fontSize: '14px',
          lineHeight: '1em',
          letterSpacing: '-0.02em',
          backgroundColor: 'rgba(255, 255, 255, 1)',
          border: '1px solid',
          borderColor: 'rgba(220, 220, 220, 1)',
          color: 'rgba(6, 21, 18, 1)',
          borderRadius: '70px',
          minWidth: 'unset',
          }}
        >
          <Trans>Borrow</Trans>
        </Button>
      </ListButtonsColumn>
    </ListItemWrapper> */}
    </>
  );
};
