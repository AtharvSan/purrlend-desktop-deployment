import { ChainId } from '@aave/contract-helpers';
import { Trans } from '@lingui/macro';
import { Box, Button, Typography } from '@mui/material';
import router from 'next/router';
import { useEffect, useState } from 'react';
import { APYBreakdownTooltip } from 'src/components/merkl/APYBreakdownTooltip';
import { FormattedNumber } from 'src/components/primitives/FormattedNumber';
import { NoData } from 'src/components/primitives/NoData';
import { TokenIcon } from 'src/components/primitives/TokenIcon';
import { MERKL_CONFIG } from 'src/config/merkl';
import { buildMerklMarketMap } from 'src/helpers/merklMarketMapper';
import { useAssetCaps } from 'src/hooks/useAssetCaps';
import { useModalContext } from 'src/hooks/useModal';
import { useProtocolDataContext } from 'src/hooks/useProtocolDataContext';
import { getAllMerklOpportunities } from 'src/services/merklService';
import { uiConfig } from 'src/uiConfig';
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
  const { currentChainId } = useProtocolDataContext();
  const [merklMap, setMerklMap] = useState<Record<string, any>>({});

  useEffect(() => {
    if (!MERKL_CONFIG.ENABLED) return;

    getAllMerklOpportunities(currentChainId)
      .then((data) => {
        const map = buildMerklMarketMap(data || [], currentChainId);
        setMerklMap(map);
      })
      .catch(() => setMerklMap({}));
  }, [currentChainId]);

  const key = detailsAddress?.toLowerCase();
  const merkl = merklMap[key];
  const hasMerkl = merkl?.hasMerkl === true;

  const merklApr = Number(merkl?.apr ?? 0);
  const baseAPY = Number(supplyAPY || 0);
  const dailyRewardsWhole = Number(merkl?.dailyRewardsWhole ?? 0);
  const pointsPerDollarPerDay = Number(merkl?.pointsPerDollarPerDay ?? 0);
  const rewardTokenIcon = merkl?.rewardTokenIcon ?? '';

  // Hide the asset to prevent it from being supplied if supply cap has been reached
  const { supplyCap: supplyCapUsage, debtCeiling } = useAssetCaps();
  if (supplyCapUsage.isMaxed) return null;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        pl: '17px',
        my: '15px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
        }}
        onClick={() => router.push(ROUTES.reserveOverview(detailsAddress, currentMarket))}
      >
        <TokenIcon symbol={iconSymbol} sx={{ height: '19px', width: '19px', mr: '6px' }} />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'start',
            width: '80px',
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
            {symbol}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'start',
          // width: '87px',
          width: '80px',
          // backgroundColor: 'red'
        }}
      >
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

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'start',
          width: '98px',
          pl: '7px',
        }}
      >
        {hasMerkl && currentChainId == 999 ? (
          <APYBreakdownTooltip
            baseAPY={baseAPY}
            merklApr={merklApr}
            dailyRewardsWhole={dailyRewardsWhole}
            pointsPerDollarPerDay={pointsPerDollarPerDay}
            rewardTokenIcon={rewardTokenIcon}
            rewardToken={merkl?.rewardToken ?? 'Points'}
            hasMerkl={hasMerkl}
            symbol={symbol}
            tvlUsd={merkl?.tvlUsd ?? 0}
            totalLiquidityUsd={Number(totalLiquidity ?? 0)}
          />
        ) : (
          <FormattedNumber value={baseAPY} percent fontSize={'14px'} />
        )}
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'start',
          width: '113px',
        }}
      >
        <ListColumn basis={72} align="start" shrink={0} sx={{ ml: '18px' }}>
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
            mr: '5px',
          }}
        >
          Supply
        </Button>
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
