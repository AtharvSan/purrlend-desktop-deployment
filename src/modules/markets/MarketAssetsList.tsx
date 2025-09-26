import { Trans } from '@lingui/macro';
import { Box, useMediaQuery } from '@mui/material';
import { useState } from 'react';
import { StableAPYTooltip } from 'src/components/infoTooltips/StableAPYTooltip';
import { VariableAPYTooltip } from 'src/components/infoTooltips/VariableAPYTooltip';
import { ListColumn } from 'src/components/lists/ListColumn';
import { ListHeaderTitle } from 'src/components/lists/ListHeaderTitle';
import { ListHeaderWrapper } from 'src/components/lists/ListHeaderWrapper';
import { ComputedReserveData } from 'src/hooks/app-data-provider/useAppDataProvider';

import { MarketAssetsListItem } from './MarketAssetsListItem';
import { MarketAssetsListItemLoader } from './MarketAssetsListItemLoader';
import { MarketAssetsListMobileItem } from './MarketAssetsListMobileItem';
import { MarketAssetsListMobileItemLoader } from './MarketAssetsListMobileItemLoader';

type MarketAssetsListProps = {
  reserves: ComputedReserveData[];
  loading: boolean;
};

const listHeaders = [
  {
    title: <Trans>Asset</Trans>,
    sortKey: 'symbol',
  },
  {
    title: <Trans>Total supplied</Trans>,
    sortKey: 'totalLiquidityUSD',
  },
  {
    title: <Trans>Supply APY</Trans>,
    sortKey: 'supplyAPY',
  },
  {
    title: <Trans>Total borrowed</Trans>,
    sortKey: 'totalDebtUSD',
  },
  {
    title: <Trans>Borrow APY</Trans>,
    sortKey: 'variableBorrowAPY',
  },
  {
    title: <Trans>Oracle</Trans>,
  },
  {
    title: <Trans>Action</Trans>,
  },
  // {
  //   title: (
  //     <StableAPYTooltip
  //       text={<Trans>Borrow APY, stable</Trans>}
  //       key="APY_list_stable_type"
  //       variant="subheader2"
  //     />
  //   ),
  //   sortKey: 'stableBorrowAPY',
  // },
];

export default function MarketAssetsList({ reserves, loading }: MarketAssetsListProps) {
  const isTableChangedToCards = useMediaQuery('(max-width:1125px)');
  const [sortName, setSortName] = useState('');
  const [sortDesc, setSortDesc] = useState(false);

  if (sortDesc) {
    if (sortName === 'symbol') {
      reserves.sort((a, b) => (a.symbol.toUpperCase() < b.symbol.toUpperCase() ? -1 : 1));
    } else {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      reserves.sort((a, b) => a[sortName] - b[sortName]);
    }
  } else {
    if (sortName === 'symbol') {
      reserves.sort((a, b) => (b.symbol.toUpperCase() < a.symbol.toUpperCase() ? -1 : 1));
    } else {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      reserves.sort((a, b) => b[sortName] - a[sortName]);
    }
  }

  // Show loading state when loading
  if (loading) {
    return isTableChangedToCards ? (
      <>
        <MarketAssetsListMobileItemLoader />
        <MarketAssetsListMobileItemLoader />
        <MarketAssetsListMobileItemLoader />
      </>
    ) : (
      <>
        <MarketAssetsListItemLoader />
        <MarketAssetsListItemLoader />
        <MarketAssetsListItemLoader />
        <MarketAssetsListItemLoader />
        <MarketAssetsListItemLoader />
      </>
    );
  }
  // Hide list when no results, via search term or if a market has all/no frozen/unfrozen assets
  if (reserves.length === 0) return null;

  return (
    <>
      {!isTableChangedToCards && (
        <Box sx={{
        display: 'flex',
        pl: '18px',
        pt: '10px',
        pb: '16px',
        }}>
          <Box sx={{
            width: '255px'
          }}>
            <ListHeaderTitle
            sortName={sortName}
            sortDesc={sortDesc}
            setSortName={setSortName}
            setSortDesc={setSortDesc}
            sortKey='symbol'
            ><Trans> Asset </Trans></ListHeaderTitle>
          </Box>
          <Box sx={{
            width: '190px'
          }}>
            <ListHeaderTitle
            sortName={sortName}
            sortDesc={sortDesc}
            setSortName={setSortName}
            setSortDesc={setSortDesc}
            sortKey='totalLiquidityUSD'
            ><Trans> total supplied </Trans></ListHeaderTitle>
          </Box>
          <Box sx={{
            width: '150px'
          }}>
            <ListHeaderTitle
            sortName={sortName}
            sortDesc={sortDesc}
            setSortName={setSortName}
            setSortDesc={setSortDesc}
            sortKey='supplyAPY'
            ><Trans> supply apy </Trans></ListHeaderTitle>
          </Box>
          <Box sx={{
            width: '170px'
          }}>
            <ListHeaderTitle
            sortName={sortName}
            sortDesc={sortDesc}
            setSortName={setSortName}
            setSortDesc={setSortDesc}
            sortKey='totalDebtUSD'
            ><Trans> Total borrowed </Trans></ListHeaderTitle>
          </Box>
          <Box
          sx={{
            width: '150px'
          }}>
            <ListHeaderTitle
            sortName={sortName}
            sortDesc={sortDesc}
            setSortName={setSortName}
            setSortDesc={setSortDesc}
            sortKey='variableBorrowAPY'
            ><Trans> Borrow APY </Trans></ListHeaderTitle>
          </Box>
          <Box sx={{
            width: '165px'
          }}>
            <ListHeaderTitle
            ><Trans> oracle </Trans></ListHeaderTitle>
          </Box>
          <Box>
            <ListHeaderTitle
            ><Trans> action </Trans></ListHeaderTitle>
          </Box>
        </Box>
      )}
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        }}>
        {reserves.map((reserve) =>
          isTableChangedToCards ? (
            <MarketAssetsListMobileItem {...reserve} key={reserve.id} />
          ) : (
            <MarketAssetsListItem {...reserve} key={reserve.id} />
          )
        )}
      </Box>
    </>
  );
}
