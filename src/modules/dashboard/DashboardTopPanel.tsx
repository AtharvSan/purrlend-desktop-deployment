import { ChainId } from '@aave/contract-helpers';
import { normalize, UserIncentiveData, valueToBigNumber } from '@aave/math-utils';
import { Trans } from '@lingui/macro';
import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import { NetAPYTooltip } from 'src/components/infoTooltips/NetAPYTooltip';
import { MarketSwitcherDashboard } from 'src/components/MarketSwitcherDashboard';
import { useModalContext } from 'src/hooks/useModal';
import { useProtocolDataContext } from 'src/hooks/useProtocolDataContext';
import { useWeb3Context } from 'src/libs/hooks/useWeb3Context';
import { uiConfig } from 'src/uiConfig';

import ClaimGiftIcon from '../../../public/icons/markets/claim-gift-icon.svg';
import EmptyHeartIcon from '../../../public/icons/markets/empty-heart-icon.svg';
import NetAPYIcon from '../../../public/icons/markets/net-apy-icon.svg';
import WalletIcon from '../../../public/icons/markets/wallet-icon.svg';
// TODO: need change icon
// import HfEmpty from '/public/icons/healthFactor/hfEmpty.svg';
// import HfFull from '/public/icons/healthFactor/hfFull.svg';
// import HfLow from '/public/icons/healthFactor/hfLow.svg';
// import HfMiddle from '/public/icons/healthFactor/hfMiddle.svg';
import HALLink from '../../components/HALLink';
import { HealthFactorNumber } from '../../components/HealthFactorNumber';
import { FormattedNumber } from '../../components/primitives/FormattedNumber';
import { NoData } from '../../components/primitives/NoData';
import { TopInfoPanel } from '../../components/TopInfoPanel/TopInfoPanel';
import { TopInfoPanelItem } from '../../components/TopInfoPanel/TopInfoPanelItem';
import { useAppDataContext } from '../../hooks/app-data-provider/useAppDataProvider';
import { LiquidationRiskParametresInfoModal } from './LiquidationRiskParametresModal/LiquidationRiskParametresModal';

export const DashboardTopPanel = () => {
  const { currentNetworkConfig, currentMarketData } = useProtocolDataContext();
  const { user, reserves, loading } = useAppDataContext();
  const { currentAccount } = useWeb3Context();
  const [open, setOpen] = useState(false);
  const { openClaimRewards } = useModalContext();

  const theme = useTheme();
  const downToSM = useMediaQuery(theme.breakpoints.down('sm'));

  const { claimableRewardsUsd } = Object.keys(user.calculatedUserIncentives).reduce(
    (acc, rewardTokenAddress) => {
      const incentive: UserIncentiveData = user.calculatedUserIncentives[rewardTokenAddress];
      const rewardBalance = normalize(incentive.claimableRewards, incentive.rewardTokenDecimals);

      let tokenPrice = 0;
      // getting price from reserves for the native rewards for v2 markets
      if (!currentMarketData.v3 && Number(rewardBalance) > 0) {
        if (currentMarketData.chainId === ChainId.mainnet) {
          const aave = reserves.find((reserve) => reserve.symbol === 'AAVE');
          tokenPrice = aave ? Number(aave.priceInUSD) : 0;
        } else {
          reserves.forEach((reserve) => {
            if (reserve.symbol === currentNetworkConfig.wrappedBaseAssetSymbol) {
              tokenPrice = Number(reserve.priceInUSD);
            }
          });
        }
      } else {
        tokenPrice = Number(incentive.rewardPriceFeed);
      }

      const rewardBalanceUsd = Number(rewardBalance) * tokenPrice;

      if (rewardBalanceUsd > 0) {
        if (acc.assets.indexOf(incentive.rewardTokenSymbol) === -1) {
          acc.assets.push(incentive.rewardTokenSymbol);
        }

        acc.claimableRewardsUsd += Number(rewardBalanceUsd);
      }

      return acc;
    },
    { claimableRewardsUsd: 0, assets: [] } as { claimableRewardsUsd: number; assets: string[] }
  );

  const loanToValue =
    user?.totalCollateralMarketReferenceCurrency === '0'
      ? '0'
      : valueToBigNumber(user?.totalBorrowsMarketReferenceCurrency || '0')
          .dividedBy(user?.totalCollateralMarketReferenceCurrency || '1')
          .toFixed();

  const valueTypographyVariant = downToSM ? 'main16' : 'main21';
  const noDataTypographyVariant = downToSM ? 'secondary16' : 'secondary21';

  return (
    <Box
      sx={{
        backgroundImage: 'linear-gradient(90deg, #061512 0%, #00380D 100%)',
        color: '#F1F1F3',
        mx: 'auto',
        width: { xs: '95%', md: '1199px' },
        height: { xs: '128px', md: '77px' },
        marginTop: '25px',
        borderRadius: '16px',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'space-between',
        pt: '14px',
        pb: '12px',
        px: '20px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        {/* <img src={uiConfig.hype} height={38} /> */}
        <MarketSwitcherDashboard />
        <Typography
          sx={{
            color: '#FFFFFF',
            fontWeight: 600,
            fontSize: '32px',
            lineHeight: '1em',
            letterSpacing: '-0.02em',
          }}
        >
          {/* {currentNetworkConfig.name}  */}
          {/* {!downToSM && (' Market')} */}
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: { xs: 'auto', md: '50px' },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '9px',
          }}
        >
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: '10px',
              lineHeight: '1em',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#FFFFFF99',
            }}
          >
            {' '}
            net worth{' '}
          </Typography>
          {currentAccount ? (
            <FormattedNumber
              value={Number(user?.netWorthUSD || 0)}
              symbol="USD"
              variant={valueTypographyVariant}
              visibleDecimals={2}
              compact
              symbolsColor="#FFFFFF99"
              symbolsVariant={noDataTypographyVariant}
              size={'24px'}
              fontSize={'24px'}
              fontWeight={'500'}
              letterSpacing={'-0.02em'}
            />
          ) : (
            <NoData variant={noDataTypographyVariant} sx={{ opacity: '0.7' }} />
          )}
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '9px',
          }}
        >
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: '10px',
              lineHeight: '1em',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#FFFFFF99',
            }}
          >
            {' '}
            net apy{' '}
          </Typography>
          {currentAccount && Number(user?.netWorthUSD) > 0 ? (
            <FormattedNumber
              value={user.netAPY}
              variant={valueTypographyVariant}
              visibleDecimals={2}
              percent
              symbolsColor="#FFFFFF99"
              symbolsVariant={noDataTypographyVariant}
              size={'24px'}
              fontSize={'24px'}
              fontWeight={'500'}
              letterSpacing={'-0.02em'}
            />
          ) : (
            <NoData variant={noDataTypographyVariant} sx={{ opacity: '0.7' }} />
          )}
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '9px',
          }}
        >
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: '10px',
              lineHeight: '1em',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#FFFFFF99',
              // bgcolor: 'red',
            }}
          >
            {' '}
            health factor{' '}
          </Typography>
          <HealthFactorNumber
            fontSize={'24px'}
            fontWeight={500}
            letterSpacing={'-0.02em'}
            value={user?.healthFactor || '-1'}
            variant={valueTypographyVariant}
            onInfoClick={() => setOpen(true)}
            HALIntegrationComponent={
              currentMarketData.halIntegration && (
                <HALLink
                  healthFactor={user?.healthFactor || '-1'}
                  marketName={currentMarketData.halIntegration.marketName}
                  integrationURL={currentMarketData.halIntegration.URL}
                />
              )
            }
          />
        </Box>
      </Box>

      <LiquidationRiskParametresInfoModal
        open={open}
        setOpen={setOpen}
        healthFactor={user?.healthFactor || '-1'}
        loanToValue={loanToValue}
        currentLoanToValue={user?.currentLoanToValue || '0'}
        currentLiquidationThreshold={user?.currentLiquidationThreshold || '0'}
      />
    </Box>
  );
};
