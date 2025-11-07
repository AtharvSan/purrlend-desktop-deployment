import { Trans } from '@lingui/macro';
import { Box, Button, Typography } from '@mui/material';
import { NoData } from 'src/components/primitives/NoData';
import { useAssetCaps } from 'src/hooks/useAssetCaps';
import { useModalContext } from 'src/hooks/useModal';
import { useProtocolDataContext } from 'src/hooks/useProtocolDataContext';
import { DashboardReserve } from 'src/utils/dashboardSortUtils';

import { CapsHint } from '../../../../components/caps/CapsHint';
import { CapType } from '../../../../components/caps/helper';
import { ListColumn } from '../../../../components/lists/ListColumn';
import { Link, ROUTES } from '../../../../components/primitives/Link';
import { ListAPRColumn } from '../ListAPRColumn';
import { ListButtonsColumn } from '../ListButtonsColumn';
import { ListItemCanBeCollateral } from '../ListItemCanBeCollateral';
import { ListItemWrapper } from '../ListItemWrapper';
import { ListValueColumn } from '../ListValueColumn';
import { uiConfig } from 'src/uiConfig';
import { TokenIcon } from 'src/components/primitives/TokenIcon';
import { FormattedNumber } from 'src/components/primitives/FormattedNumber';
import router from 'next/router';

export const SupplyAssetsListItem = ({
  symbol,
  iconSymbol,
  name,
  walletBalance,
  walletBalanceUSD,
  supplyCap,
  totalLiquidity,
  supplyAPY,
  aIncentivesData,
  underlyingAsset,
  isActive,
  isFreezed,
  isIsolated,
  usageAsCollateralEnabledOnUser,
  detailsAddress,
}: DashboardReserve) => {
  const { currentMarket } = useProtocolDataContext();
  const { openSupply } = useModalContext();

  // Hide the asset to prevent it from being supplied if supply cap has been reached
  const { supplyCap: supplyCapUsage, debtCeiling } = useAssetCaps();
  if (supplyCapUsage.isMaxed) return null;

  return (
    <Box sx={{
    display: 'flex',
    alignItems: 'center',
    pl: '17px',
    my: '15px',
    }}>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
      }}
      onClick={() => router.push(ROUTES.reserveOverview(detailsAddress, currentMarket))}
      >
        <TokenIcon symbol={iconSymbol} sx={{ height: '19px',width: '19px', mr: '6px'}} />
        <Box sx={{
          display: 'flex',
          justifyContent: 'start',
          width: '80px',
          }}>
            <Typography sx={{
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '1em',
            letterSpacing: '-0.02em',
            }}>
              {symbol}
            </Typography>
        </Box>
      </Box>
      <Box sx={{
        display: 'flex',
        justifyContent: 'start',
        width: '87px',
        // backgroundColor: 'red'
        }}>
          <ListValueColumn
            symbol={symbol}
            value={Number(walletBalance)}
            subValue={walletBalanceUSD}
            withTooltip
            disabled={Number(walletBalance) === 0}
            capsComponent={
              <CapsHint
                capType={CapType.supplyCap}
                capAmount={supplyCap}
                totalAmount={totalLiquidity}
                withoutText
              />
            }
          />
      </Box>
      
      <Box sx={{
      display: 'flex',
      justifyContent: 'start',
      width: '93px',
      }}>
        <FormattedNumber 
        value={Number(supplyAPY)} 
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
      justifyContent: 'start',
      width: '111px',
      }}>
        <ListColumn basis={72} align="start" shrink={0} sx={{ml: '18px'}} >
          {debtCeiling.isMaxed ? (
            <NoData variant="main14" color="text.secondary" />
          ) : (
            <ListItemCanBeCollateral
              isIsolated={isIsolated}
              usageAsCollateralEnabled={usageAsCollateralEnabledOnUser}
            />
          )}
        </ListColumn>
      </Box>
      
      <ListButtonsColumn>
        <Button
          disabled={!isActive || isFreezed || Number(walletBalance) <= 0}
          variant="contained"
          onClick={() => openSupply(underlyingAsset)}
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
            mr:'5px',
          }}>Supply</Button>
        {/* <Button
          component={Link}
          href={ROUTES.reserveOverview(detailsAddress, currentMarket)}
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 1)',
            border: '1px solid',
            borderColor: 'rgba(220, 220, 220, 1)',
            color: 'rgba(6, 21, 18, 1)',
            borderRadius: '70px',
            px: '12px',
            py: '7px',
            minWidth: 'unset',
          }}
        >
          <img src={uiConfig.more} alt="more" />
          <Typography>Details</Typography>
        </Button> */}
        <Button
          // variant="outlined"
          component={Link}
          href={ROUTES.reserveOverview(detailsAddress, currentMarket)}
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
    </Box>
  );
};
