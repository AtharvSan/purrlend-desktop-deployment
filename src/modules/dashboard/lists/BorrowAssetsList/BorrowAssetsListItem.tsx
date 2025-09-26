import { Trans } from '@lingui/macro';
import { Box, Button, Typography } from '@mui/material';
import { useAssetCaps } from 'src/hooks/useAssetCaps';
import { useModalContext } from 'src/hooks/useModal';
import { useProtocolDataContext } from 'src/hooks/useProtocolDataContext';
import { DashboardReserve } from 'src/utils/dashboardSortUtils';

import { CapsHint } from '../../../../components/caps/CapsHint';
import { CapType } from '../../../../components/caps/helper';
import { Link, ROUTES } from '../../../../components/primitives/Link';
import { ListAPRColumn } from '../ListAPRColumn';
import { ListButtonsColumn } from '../ListButtonsColumn';
import { ListItemWrapper } from '../ListItemWrapper';
import { ListValueColumn } from '../ListValueColumn';
import { TokenIcon } from 'src/components/primitives/TokenIcon';
import { FormattedNumber } from 'src/components/primitives/FormattedNumber';

export const BorrowAssetsListItem = ({
  symbol,
  iconSymbol,
  name,
  availableBorrows,
  availableBorrowsInUSD,
  borrowCap,
  totalBorrows,
  variableBorrowRate,
  stableBorrowRate,
  sIncentivesData,
  vIncentivesData,
  underlyingAsset,
  isFreezed,
}: DashboardReserve) => {
  const { openBorrow } = useModalContext();
  const { currentMarket } = useProtocolDataContext();
  const borrowButtonDisable = isFreezed || Number(availableBorrows) <= 0;

  // Hide the asset to prevent it from being borrowed if borrow cap has been reached
  const { borrowCap: borrowCapUsage, debtCeiling } = useAssetCaps();
  if (borrowCapUsage.isMaxed || debtCeiling.isMaxed) return null;

  return (
    <>
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      pl: '17px',
      my: '16px',
    }}>
      <TokenIcon symbol={iconSymbol} sx={{ height: '19px',width: '19px', mr: '6px'}} />
      <Box sx={{
      display: 'flex',
      alignItems: 'center',
      width: '115px',  
      }}>
        <Typography sx={{
        fontWeight: 400,
        fontSize: '14px',
        lineHeight: '1em',
        letterSpacing: '-0.02em',
        }}>{symbol}</Typography>
      </Box>

      <Box sx={{
      display: 'flex',
      alignItems: 'center',
      width: '154px', 
      
      }}>
        <ListValueColumn
          symbol={symbol}
          value={Number(availableBorrows)}
          subValue={Number(availableBorrowsInUSD)}
          disabled={Number(availableBorrows) === 0}
          withTooltip
          capsComponent={
            <CapsHint
              capType={CapType.borrowCap}
              capAmount={borrowCap}
              totalAmount={totalBorrows}
              withoutText
            />
          }
        />
      </Box>

      <Box sx={{
      display: 'flex',
      alignItems: 'center',
      width: '115px', 
      }}>
        <FormattedNumber 
        value={Number(variableBorrowRate)} 
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

      <Box sx={{
      display: 'flex',
      gap: '5px',
      }}>
        <Button
          disabled={borrowButtonDisable}
          variant="contained"
          onClick={() => openBorrow(underlyingAsset)}
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
          <Trans>Borrow</Trans>
        </Button>
        <Button
          // variant="outlined"
          component={Link}
          href={ROUTES.reserveOverview(underlyingAsset, currentMarket)}
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
          <Trans>Details</Trans>
        </Button>
      </Box>
      {/* <ListButtonsColumn>
        <Button
          disabled={borrowButtonDisable}
          variant="contained"
          onClick={() => openBorrow(underlyingAsset)}
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
          <Trans>Borrow</Trans>
        </Button>
        <Button
          variant="outlined"
          component={Link}
          href={ROUTES.reserveOverview(underlyingAsset, currentMarket)}
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
          <Trans>Details</Trans>
        </Button>
      </ListButtonsColumn> */}
    </Box>
    {/* <ListItemWrapper
      symbol={symbol}
      iconSymbol={iconSymbol}
      name={name}
      detailsAddress={underlyingAsset}
      data-cy={`dashboardBorrowListItem_${symbol.toUpperCase()}`}
      currentMarket={currentMarket}
    >
      <ListValueColumn
        symbol={symbol}
        value={Number(availableBorrows)}
        subValue={Number(availableBorrowsInUSD)}
        disabled={Number(availableBorrows) === 0}
        withTooltip
        capsComponent={
          <CapsHint
            capType={CapType.borrowCap}
            capAmount={borrowCap}
            totalAmount={totalBorrows}
            withoutText
          />
        }
      />

      <ListAPRColumn
        value={Number(variableBorrowRate)}
        incentives={vIncentivesData}
        symbol={symbol}
      />
      <ListAPRColumn
        value={Number(stableBorrowRate)}
        incentives={sIncentivesData}
        symbol={symbol}
      />

      <ListButtonsColumn>
        <Button
          disabled={borrowButtonDisable}
          variant="contained"
          onClick={() => openBorrow(underlyingAsset)}
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
          <Trans>Borrow</Trans>
        </Button>
        <Button
          variant="outlined"
          component={Link}
          href={ROUTES.reserveOverview(underlyingAsset, currentMarket)}
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
          <Trans>Details</Trans>
        </Button>
      </ListButtonsColumn>
    </ListItemWrapper> */}
    </>
  );
};
