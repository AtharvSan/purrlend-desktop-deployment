import { useEffect, useState } from 'react';
import { Trans } from '@lingui/macro';
import { Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/router';

import { getAllMerklOpportunities } from 'src/services/merklService';
import { buildMerklMarketMap } from 'src/helpers/merklMarketMapper';
import { MERKL_CONFIG } from 'src/config/merkl';
import { APYBreakdownTooltip } from 'src/components/merkl/APYBreakdownTooltip';

import { NoData } from 'src/components/primitives/NoData';
import { ReserveSubheader } from 'src/components/ReserveSubheader';
import { ListColumn } from 'src/components/lists/ListColumn';
import { FormattedNumber } from 'src/components/primitives/FormattedNumber';
import { TokenIcon } from 'src/components/primitives/TokenIcon';
import { ROUTES } from 'src/components/primitives/Link';
import { IncentivesCard } from 'src/components/incentives/IncentivesCard';

import { ComputedReserveData } from 'src/hooks/app-data-provider/useAppDataProvider';
import { useProtocolDataContext } from 'src/hooks/useProtocolDataContext';
import { useModalContext } from 'src/hooks/useModal';

import { uiConfig } from 'src/uiConfig';

export const MarketAssetsListItem = ({ ...reserve }: ComputedReserveData) => {
  const router = useRouter();
  const { currentMarket, currentChainId } = useProtocolDataContext();
  const { openSupply } = useModalContext();

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

  const key = reserve.underlyingAsset?.toLowerCase();
  const merkl = merklMap[key];
  const merklApr = Number(merkl?.apr ?? 0);
  const baseAPY = Number(reserve.supplyAPY || 0);
  const hasMerkl = merkl?.hasMerkl === true;
  const dailyRewardsWhole = Number(merkl?.dailyRewardsWhole ?? 0);
  const pointsPerDollarPerDay = Number(merkl?.pointsPerDollarPerDay ?? 0);
  const rewardTokenIcon = merkl?.rewardTokenIcon ?? "";

  return (
    <Box
      onClick={() => router.push(ROUTES.reserveOverview(reserve.underlyingAsset, currentMarket))}
      sx={{
        display: 'flex',
        alignItems: 'center',
        pt: '16px',
        pb: '13px',
        pl: '15px',
        border: '1px solid',
        borderRadius: '16px',
        backgroundColor: '#FFFFFF',
        borderColor: '#EAEAEA',
        boxShadow: '0px 3px 5px 0px #0000000A',
        cursor: 'pointer',
        '&:hover': { bgcolor: '#f8f8f8ff' },
      }}
    >
      {/* Asset */}
      <Box sx={{ width: '285px' }}>
        <ListColumn isRow maxWidth={280}>
          <TokenIcon symbol={reserve.iconSymbol} sx={{ height: 32, width: 32 }} />
          <Box sx={{ pl: '16px' }}>
            <Typography fontSize={16}>{reserve.name}</Typography>
            <Typography fontSize={14} color="#828282">{reserve.symbol}</Typography>
          </Box>
        </ListColumn>
      </Box>

      {/* Total Supplied */}
      <Box sx={{ width: '175px' }}>
        <ListColumn gapVal="5px">
          <FormattedNumber compact value={reserve.totalLiquidity} fontSize={16} />
          <FormattedNumber compact symbol="USD" value={reserve.totalLiquidityUSD} color="#828282" />
        </ListColumn>
      </Box>

      {/* Supply APY */}
      <Box sx={{ width: '165px' }}>
        <ListColumn>
          {(hasMerkl && currentChainId==999) ? (
            <APYBreakdownTooltip
              fontsize='16px'
              baseAPY={baseAPY}
              merklApr={merklApr}
              dailyRewardsWhole={dailyRewardsWhole}
              pointsPerDollarPerDay={pointsPerDollarPerDay}
              rewardTokenIcon={rewardTokenIcon}
              rewardToken={merkl?.rewardToken ?? "Purr points"}
              hasMerkl={hasMerkl}
              symbol={reserve.symbol}
              tvlUsd={merkl?.tvlUsd ?? 0}
              totalLiquidityUsd={Number(reserve.totalLiquidityUSD ?? 0)}
            />
          ) : (
            <IncentivesCard
              value={reserve.supplyAPY}
              incentives={reserve.aIncentivesData || []}
              symbol={reserve.symbol}
            />
          )}
        </ListColumn>
      </Box>

      {/* Total Borrowed */}
      <Box sx={{ width: '152px' }}>
        <ListColumn gapVal="5px">
          {reserve.borrowingEnabled || Number(reserve.totalDebt) > 0 ? (
            <>
              <FormattedNumber compact value={reserve.totalDebt} fontSize={16}/>
              <FormattedNumber compact symbol="USD" value={reserve.totalDebtUSD} color="#828282" />
            </>
          ) : (
            <NoData variant="secondary14" />
          )}
        </ListColumn>
      </Box>

      {/* Borrow APY */}
      <Box sx={{ width: '137px' }}>
        <ListColumn>
          <IncentivesCard
            value={Number(reserve.totalVariableDebtUSD) > 0 ? reserve.variableBorrowAPY : '-1'}
            incentives={reserve.vIncentivesData || []}
            symbol={reserve.symbol}
          />
          {!reserve.borrowingEnabled && Number(reserve.totalVariableDebt) > 0 && !reserve.isFrozen && (
            <ReserveSubheader value="Disabled" />
          )}
        </ListColumn>
      </Box>

      {/* Oracle */}
      <Box sx={{ width: '165px' }}>
        <ListColumn>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <img src={uiConfig.pyth} height={22} width={22} alt="pyth" />
            <Typography fontSize={16}>Pyth</Typography>
          </Box>
        </ListColumn>
      </Box>

      {/* Action */}
      <Box sx={{ zIndex: 1 }}>
        <ListColumn align="right">
          <Button
            variant="contained"
            onClick={(e) => { e.stopPropagation(); openSupply(reserve.underlyingAsset); }}
            sx={{
              backgroundColor: '#061512',
              color: '#FFFFFF',
              borderRadius: '70px',
              py: '7px',
              px: '12px',
              fontSize: '14px',
            }}
          >
            <Trans>Supply</Trans>
          </Button>
        </ListColumn>
      </Box>
    </Box>
  );
};