import { Trans } from '@lingui/macro';
import { Box, Button, Typography } from '@mui/material';
import { useAppDataContext } from 'src/hooks/app-data-provider/useAppDataProvider';
import { useAssetCaps } from 'src/hooks/useAssetCaps';
import { DashboardReserve } from 'src/utils/dashboardSortUtils';

import { IncentivesCard } from '../../../../components/incentives/IncentivesCard';
import { Row } from '../../../../components/primitives/Row';
import { useModalContext } from '../../../../hooks/useModal';
import { useProtocolDataContext } from '../../../../hooks/useProtocolDataContext';
import { isFeatureEnabled } from '../../../../utils/marketsAndNetworksConfig';
import { ListItemUsedAsCollateral } from '../ListItemUsedAsCollateral';
import { ListMobileItemWrapper } from '../ListMobileItemWrapper';
import { ListValueRow } from '../ListValueRow';

export const SuppliedPositionsListMobileItem = ({
  reserve,
  underlyingBalance,
  underlyingBalanceUSD,
  usageAsCollateralEnabledOnUser,
  underlyingAsset,
}: DashboardReserve) => {
  const { user } = useAppDataContext();
  const { currentMarketData, currentMarket } = useProtocolDataContext();
  const { openSupply, openSwap, openWithdraw, openCollateralChange } = useModalContext();
  const { debtCeiling } = useAssetCaps();
  const isSwapButton = isFeatureEnabled.liquiditySwap(currentMarketData);
  const { symbol, iconSymbol, name, supplyAPY, isIsolated, aIncentivesData, isFrozen, isActive } =
    reserve;

  const canBeEnabledAsCollateral =
    !debtCeiling.isMaxed &&
    reserve.usageAsCollateralEnabled &&
    ((!reserve.isIsolated && !user.isInIsolationMode) ||
      user.isolatedReserve?.underlyingAsset === reserve.underlyingAsset ||
      (reserve.isIsolated && user.totalCollateralMarketReferenceCurrency === '0'));

  return (
    <ListMobileItemWrapper
      symbol={symbol}
      iconSymbol={iconSymbol}
      name={name}
      underlyingAsset={underlyingAsset}
      currentMarket={currentMarket}
      frozen={reserve.isFrozen}
      showSupplyCapTooltips
      showDebtCeilingTooltips
    >
      <ListValueRow
        title={
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '1em',
              letterSpacing: '-0.02em',
              color: '#828282',
            }}
          >
            <Trans>balance</Trans>
          </Typography>
        }
        value={Number(underlyingBalance)}
        subValue={Number(underlyingBalanceUSD)}
        disabled={Number(underlyingBalance) === 0}
      />

      <Row
        caption={
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '1em',
              letterSpacing: '-0.02em',
              color: '#828282',
            }}
          >
            <Trans>APY</Trans>
          </Typography>
        }
        align="flex-start"
        captionVariant="description"
        mb={3}
      >
        <IncentivesCard
          value={Number(supplyAPY)}
          incentives={aIncentivesData}
          symbol={symbol}
          variant="secondary14"
        />
      </Row>

      <Row
        caption={
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '1em',
              letterSpacing: '-0.02em',
              color: '#828282',
            }}
          >
            <Trans>Used as collateral</Trans>
          </Typography>
        }
        align={isIsolated ? 'flex-start' : 'center'}
        captionVariant="description"
        mb={2}
      >
        <ListItemUsedAsCollateral
          isIsolated={isIsolated}
          usageAsCollateralEnabledOnUser={usageAsCollateralEnabledOnUser}
          canBeEnabledAsCollateral={canBeEnabledAsCollateral}
          onToggleSwitch={() => openCollateralChange(underlyingAsset)}
        />
      </Row>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '2%',
          mt: 5,
        }}
      >
        <Button
          disabled={!isActive || isFrozen}
          variant="outlined"
          onClick={() => openSupply(underlyingAsset)}
          fullWidth
          sx={{
            border: '1px solid #FFFFFF33',
            borderRadius: '70px',
            backgroundColor: '#061512',
            color: '#FFFFFF',
            height: '38px',
          }}
        >
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: '14px',
              lineHeight: '1em',
              letterSpacing: '-0.02em',
            }}
          >
            <Trans>Supply</Trans>
          </Typography>
        </Button>
        <Button
          disabled={!isActive}
          variant="contained"
          onClick={() => openWithdraw(underlyingAsset)}
          fullWidth
          sx={{
            border: '1px solid #DCDCDC',
            borderRadius: '70px',
            backgroundColor: '#FFFFFF',
            color: '#061512',
            height: '38px',
          }}
        >
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: '14px',
              lineHeight: '1em',
              letterSpacing: '-0.02em',
            }}
          >
            <Trans>Withdraw</Trans>
          </Typography>
        </Button>

        {/* {isSwapButton ? (
          <Button
            disabled={!isActive || isFrozen}
            variant="outlined"
            onClick={() => openSwap(underlyingAsset)}
            fullWidth
          >
            <Trans>Swap</Trans>
          </Button>
        ) : (
          <Button
            disabled={!isActive || isFrozen}
            variant="outlined"
            onClick={() => openSupply(underlyingAsset)}
            fullWidth
          >
            <Trans>Supply</Trans>
          </Button>
        )} */}
      </Box>
    </ListMobileItemWrapper>
  );
};
