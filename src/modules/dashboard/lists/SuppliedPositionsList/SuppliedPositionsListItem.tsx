import { Trans } from '@lingui/macro';
import { Box, Button, Typography } from '@mui/material';
import router from 'next/router';
import { FormattedNumber } from 'src/components/primitives/FormattedNumber';
import { ROUTES } from 'src/components/primitives/Link';
import { TokenIcon } from 'src/components/primitives/TokenIcon';
import { useAppDataContext } from 'src/hooks/app-data-provider/useAppDataProvider';
import { useAssetCaps } from 'src/hooks/useAssetCaps';
import { useModalContext } from 'src/hooks/useModal';
import { DashboardReserve } from 'src/utils/dashboardSortUtils';

import { ListColumn } from '../../../../components/lists/ListColumn';
import { useProtocolDataContext } from '../../../../hooks/useProtocolDataContext';
import { isFeatureEnabled } from '../../../../utils/marketsAndNetworksConfig';
import { ListAPRColumn } from '../ListAPRColumn';
import { ListButtonsColumn } from '../ListButtonsColumn';
import { ListItemUsedAsCollateral } from '../ListItemUsedAsCollateral';
import { ListItemWrapper } from '../ListItemWrapper';
import { ListValueColumn } from '../ListValueColumn';

export const SuppliedPositionsListItem = ({
  reserve,
  underlyingBalance,
  underlyingBalanceUSD,
  usageAsCollateralEnabledOnUser,
  underlyingAsset,
}: DashboardReserve) => {
  const { user } = useAppDataContext();
  const { isIsolated, aIncentivesData, isFrozen, isActive } = reserve;
  const { currentMarketData, currentMarket } = useProtocolDataContext();
  const { openSupply, openWithdraw, openCollateralChange, openSwap } = useModalContext();
  const { debtCeiling } = useAssetCaps();
  const isSwapButton = isFeatureEnabled.liquiditySwap(currentMarketData);

  const canBeEnabledAsCollateral =
    !debtCeiling.isMaxed &&
    reserve.usageAsCollateralEnabled &&
    ((!reserve.isIsolated && !user.isInIsolationMode) ||
      user.isolatedReserve?.underlyingAsset === reserve.underlyingAsset ||
      (reserve.isIsolated && user.totalCollateralMarketReferenceCurrency === '0'));

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'start',
        pl: '17px',
        my: '11px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
        }}
        onClick={() =>
          underlyingAsset !== '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
            ? router.push(ROUTES.reserveOverview(underlyingAsset, currentMarket))
            : router.push(
                ROUTES.reserveOverview('0x5555555555555555555555555555555555555555', currentMarket)
              )
        }
      >
        <TokenIcon
          symbol={reserve.iconSymbol}
          sx={{ height: '19px', width: '19px', mr: '6px', mt: '4px' }}
        />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: '85px',
            mt: '7px',
          }}
        >
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: '1em',
              letterSpacing: '-0.02em',
            }}
          >
            {reserve.symbol}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '97px',
          mt: '7px',
        }}
      >
        <ListValueColumn
          symbol={reserve.iconSymbol}
          value={Number(underlyingBalance)}
          subValue={Number(underlyingBalanceUSD)}
          disabled={Number(underlyingBalance) === 0}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '92px',
          mt: '5px',
        }}
      >
        <FormattedNumber
          value={Number(reserve.supplyAPY)}
          color={'#061512'}
          fontWeight={400}
          fontSize={'14px'}
          size={'14px'}
          lineHeight={'1em'}
          letterSpacing={'-0.02em'}
          percent
          symbolsColor="#828282"
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '82px',
          mt: '3px',
        }}
      >
        <ListColumn>
          <ListItemUsedAsCollateral
            isIsolated={isIsolated}
            usageAsCollateralEnabledOnUser={usageAsCollateralEnabledOnUser}
            canBeEnabledAsCollateral={canBeEnabledAsCollateral}
            onToggleSwitch={() => openCollateralChange(underlyingAsset)}
            data-cy={`collateralStatus`}
          />
        </ListColumn>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '180px',
        }}
      >
        <ListButtonsColumn>
          {isSwapButton ? (
            <Button
              disabled={!isActive || isFrozen}
              variant="outlined"
              onClick={() => openSwap(underlyingAsset)}
              data-cy={`swapButton`}
            >
              <Trans>Swap</Trans>
            </Button>
          ) : (
            <Button
              disabled={!isActive || isFrozen}
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
                mr: '5px',
              }}
            >
              <Trans>Supply</Trans>
            </Button>
          )}
          <Button
            disabled={!isActive}
            // variant="outlined"
            onClick={() => openWithdraw(underlyingAsset)}
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
            Withdraw
          </Button>
        </ListButtonsColumn>
      </Box>
    </Box>
  );
};
