import { API_ETH_MOCK_ADDRESS, InterestRate } from '@aave/contract-helpers';
import { valueToBigNumber } from '@aave/math-utils';
import { Trans } from '@lingui/macro';
import { Box, Divider, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Fragment, useState } from 'react';
import { ListColumn } from 'src/components/lists/ListColumn';
import { ListHeaderTitle } from 'src/components/lists/ListHeaderTitle';
import { ListHeaderWrapper } from 'src/components/lists/ListHeaderWrapper';
import { AssetCapsProvider } from 'src/hooks/useAssetCaps';
import { useProtocolDataContext } from 'src/hooks/useProtocolDataContext';
import { fetchIconSymbolAndName } from 'src/ui-config/reservePatches';

import { APYTypeTooltip } from '../../../../components/infoTooltips/APYTypeTooltip';
import { BorrowPowerTooltip } from '../../../../components/infoTooltips/BorrowPowerTooltip';
import { TotalBorrowAPYTooltip } from '../../../../components/infoTooltips/TotalBorrowAPYTooltip';
import { ListWrapper } from '../../../../components/lists/ListWrapper';
import {
  ComputedUserReserveData,
  useAppDataContext,
} from '../../../../hooks/app-data-provider/useAppDataProvider';
import {
  DASHBOARD_LIST_COLUMN_WIDTHS,
  DashboardReserve,
  handleSortDashboardReserves,
} from '../../../../utils/dashboardSortUtils';
import { DashboardContentNoData } from '../../DashboardContentNoData';
import { DashboardEModeButton } from '../../DashboardEModeButton';
import { ListButtonsColumn } from '../ListButtonsColumn';
import { ListLoader } from '../ListLoader';
import { ListTopInfoItem } from '../ListTopInfoItem';
import { BorrowedPositionsListItem } from './BorrowedPositionsListItem';
import { BorrowedPositionsListMobileItem } from './BorrowedPositionsListMobileItem';

const head = [
  {
    title: <Trans>Asset</Trans>,
    sortKey: 'symbol',
  },
  {
    title: <Trans key="Debt">Debt</Trans>,
    sortKey: 'variableBorrows',
  },
  {
    title: <Trans key="APY">APY</Trans>,
    sortKey: 'borrowAPY',
  },
  // {
  //   title: <APYTypeTooltip text={<Trans>APY type</Trans>} key="APY type" variant="subheader2" />,
  // },
];

export const BorrowedPositionsList = () => {
  const { user, loading } = useAppDataContext();
  const { currentMarketData, currentNetworkConfig } = useProtocolDataContext();
  const theme = useTheme();
  const downToXSM = useMediaQuery(theme.breakpoints.down('xsm'));
  const [sortName, setSortName] = useState('');
  const [sortDesc, setSortDesc] = useState(false);

  const borrowPositions =
    user?.userReservesData.reduce((acc, userReserve) => {
      if (userReserve.variableBorrows !== '0') {
        acc.push({
          ...userReserve,
          borrowRateMode: InterestRate.Variable,
          reserve: {
            ...userReserve.reserve,
            ...(userReserve.reserve.isWrappedBaseAsset
              ? fetchIconSymbolAndName({
                  symbol: currentNetworkConfig.baseAssetSymbol,
                  underlyingAsset: API_ETH_MOCK_ADDRESS.toLowerCase(),
                })
              : {}),
          },
        });
      }
      if (userReserve.stableBorrows !== '0') {
        acc.push({
          ...userReserve,
          borrowRateMode: InterestRate.Stable,
          reserve: {
            ...userReserve.reserve,
            ...(userReserve.reserve.isWrappedBaseAsset
              ? fetchIconSymbolAndName({
                  symbol: currentNetworkConfig.baseAssetSymbol,
                  underlyingAsset: API_ETH_MOCK_ADDRESS.toLowerCase(),
                })
              : {}),
          },
        });
      }
      return acc;
    }, [] as (ComputedUserReserveData & { borrowRateMode: InterestRate })[]) || [];
  const maxBorrowAmount = valueToBigNumber(user?.totalBorrowsMarketReferenceCurrency || '0').plus(
    user?.availableBorrowsMarketReferenceCurrency || '0'
  );
  const collateralUsagePercent = maxBorrowAmount.eq(0)
    ? '0'
    : valueToBigNumber(user?.totalBorrowsMarketReferenceCurrency || '0')
        .div(maxBorrowAmount)
        .toFixed();

  // Transform to the DashboardReserve schema so the sort utils can work with it
  const preSortedReserves = borrowPositions as DashboardReserve[];
  const sortedReserves = handleSortDashboardReserves(
    sortDesc,
    sortName,
    'position',
    preSortedReserves,
    true
  );

  const RenderHeader: React.FC = () => {
    return (
      <>
      <Box sx={{
      display: 'flex',
      justifyContent: 'space-between',
      pl: '18px',
      pr: '120px',
      pt: '12px',
      pb: '10px',
      }}>
        <Box>
          <ListHeaderTitle
          sortName={sortName}
          sortDesc={sortDesc}
          setSortName={setSortName}
          setSortDesc={setSortDesc}
          sortKey='symbol'
          ><Trans> Assets </Trans></ListHeaderTitle>
        </Box>
        <Box>
          <ListHeaderTitle
          sortName={sortName}
          sortDesc={sortDesc}
          setSortName={setSortName}
          setSortDesc={setSortDesc}
          sortKey='variableBorrows'
          ><Trans key="Debt">Debt</Trans></ListHeaderTitle>
        </Box>
        <Box>
          <ListHeaderTitle
          sortName={sortName}
          sortDesc={sortDesc}
          setSortName={setSortName}
          setSortDesc={setSortDesc}
          sortKey='borrowAPY'
          ><Trans key="APY">APY</Trans></ListHeaderTitle>
        </Box>
        <Box>
          <ListHeaderTitle
          ><Trans>action</Trans></ListHeaderTitle>
        </Box>

      </Box>
      <Divider sx={{borderColor: '#E8E8E8', mx: '18px', mb: '12px'}}/>
      </>
    );
  };

  if (loading)
    return <ListLoader title={<Trans>Your borrows</Trans>} head={head.map((c) => c.title)} />;

  return (
    <ListWrapper
      titleComponent={
        <Typography sx={{
          fontWeight: 600,
          fontSize: '20px',
          lineHeight: '1em',
          letterSpacing: '-0.02em',
          color: '#061512',
          }}>
          <Trans>Your borrows</Trans>
        </Typography>
      }
      localStorageName="borrowedAssetsDashboardTableCollapse"
      subTitleComponent={
        currentMarketData.v3 ? (
          <DashboardEModeButton userEmodeCategoryId={user.userEmodeCategoryId} />
        ) : undefined
      }
      noData={!sortedReserves.length}
      topInfo={
        <>
          {!!sortedReserves.length && (
            <>
              <ListTopInfoItem title={<Trans>Balance</Trans>} value={user?.totalBorrowsUSD || 0} />
              <Box sx={{
                width: '3px',
                height: '40px',
                position: 'relative',
                top: '-1px',
                backgroundColor: '#DCDCDC',
              }}></Box>
              <ListTopInfoItem
                title={<Trans>APY</Trans>}
                value={user?.debtAPY || 0}
                percent
                tooltip={<TotalBorrowAPYTooltip />}
              />
              <Box sx={{
                width: '3px',
                height: '40px',
                position: 'relative',
                top: '-1px',
                backgroundColor: '#DCDCDC',
              }}></Box>
              <ListTopInfoItem
                title={<Trans>Borrow power used</Trans>}
                value={collateralUsagePercent || 0}
                percent
                tooltip={<BorrowPowerTooltip />}
              />
            </>
          )}
        </>
      }
    >
      {sortedReserves.length ? (
        <>
          {!downToXSM && <RenderHeader />}
          {sortedReserves.map((item) => (
            <Fragment key={item.underlyingAsset + item.borrowRateMode}>
              <AssetCapsProvider asset={item.reserve}>
                {downToXSM ? (
                  <BorrowedPositionsListMobileItem {...item} />
                ) : (
                  <BorrowedPositionsListItem
                    {...item}
                    key={item.underlyingAsset + item.borrowRateMode}
                  />
                )}
              </AssetCapsProvider>
            </Fragment>
          ))}
        </>
      ) : (
        <DashboardContentNoData text={<Trans>Nothing borrowed yet</Trans>} />
      )}
    </ListWrapper>
  );
};
