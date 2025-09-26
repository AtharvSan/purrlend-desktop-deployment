import { ChainId } from '@aave/contract-helpers';
import { normalize, UserIncentiveData, valueToBigNumber } from '@aave/math-utils';
import { Trans } from '@lingui/macro';
import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import { NetAPYTooltip } from 'src/components/infoTooltips/NetAPYTooltip';
import { useModalContext } from 'src/hooks/useModal';
import { useProtocolDataContext } from 'src/hooks/useProtocolDataContext';
import { useWeb3Context } from 'src/libs/hooks/useWeb3Context';

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
import { uiConfig } from 'src/uiConfig';

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
    <Box sx={{
      backgroundImage: 'linear-gradient(90deg, #061512 0%, #00380D 100%)',
      color: '#F1F1F3',
      // mx: '8.32%',
      mx: 'auto',
      width: '1199px',
      marginTop: '25px',
      borderRadius: '16px',
      display: 'flex',
      justifyContent: 'space-between',
      pt: '14px',
      pb: '12px',
      px: '20px',
      }}>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '16px',
        }}>
        <img src={uiConfig.hype} height={38} />
        <Typography sx={{ 
          color: '#FFFFFF',
          fontWeight: 600,
          fontSize: '32px',
          lineHeight: '1em',
          letterSpacing: '-0.02em',
          }}> {currentNetworkConfig.name} Market</Typography></Box>

      <Box sx={{
        display: 'flex',
        gap: '50px',
        }}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '9px',
          }}>
          <Typography sx={{
            fontWeight: 600,
            fontSize: '10px',
            lineHeight: '1em',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#FFFFFF99',
            }}> net worth </Typography>
          {currentAccount ? (
            <FormattedNumber
              value={Number(user?.netWorthUSD || 0)}
              symbol="USD"
              variant={valueTypographyVariant}
              visibleDecimals={2}
              compact
              symbolsColor="#FFFFFF99"
              symbolsVariant={noDataTypographyVariant}
              fontSize={'24px'}
              fontWeight={'500'}
              letterSpacing={'-0.02em'}
            />
          ) : (
            <NoData variant={noDataTypographyVariant} sx={{ opacity: '0.7' }} />
          )}
        </Box>

        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '9px',
          }}>
          <Typography sx={{
            fontWeight: 600,
            fontSize: '10px',
            lineHeight: '1em',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#FFFFFF99',
            }}> net apy </Typography>
          {currentAccount && Number(user?.netWorthUSD) > 0 ? (
            <FormattedNumber
              value={user.netAPY}
              variant={valueTypographyVariant}
              visibleDecimals={2}
              percent
              symbolsColor="#FFFFFF99"
              symbolsVariant={noDataTypographyVariant}
              fontSize={'24px'}
              fontWeight={'500'}
              letterSpacing={'-0.02em'}
            />
          ) : (
            <NoData variant={noDataTypographyVariant} sx={{ opacity: '0.7' }} />
          )}
        </Box>

        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '9px',
          }}>
          <Typography sx={{
            fontWeight: 600,
            fontSize: '10px',
            lineHeight: '1em',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#FFFFFF99',
            }}> health factor </Typography>
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

        {/* {currentAccount && claimableRewardsUsd > 0 && (
          <TopInfoPanelItem
            title={<Trans>Available rewards</Trans>}
            icon={<ClaimGiftIcon />}
            loading={loading}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: { xs: 'flex-start', xsm: 'center' },
                flexDirection: { xs: 'column', xsm: 'row' },
              }}
            >
              <Box sx={{ display: 'inline-flex', alignItems: 'center' }} data-cy={'Claim_Box'}>
                <FormattedNumber
                  value={claimableRewardsUsd}
                  variant={valueTypographyVariant}
                  visibleDecimals={2}
                  compact
                  symbol="USD"
                  symbolsColor="#A5A8B6"
                  symbolsVariant={noDataTypographyVariant}
                  data-cy={'Claim_Value'}
                />
              </Box>

              <Button
                variant="gradient"
                size="small"
                onClick={() => openClaimRewards()}
                sx={{ minWidth: 'unset', ml: { xs: 0, xsm: 2 } }}
                data-cy={'Dashboard_Claim_Button'}
              >
                <Trans>Claim</Trans>
              </Button>
            </Box>
          </TopInfoPanelItem>
        )} */}
        </Box>

      {/* <TopInfoPanel
        pageTitle={<Trans>Dashboard</Trans>}
        withMarketSwitcher
        bridge={currentNetworkConfig.bridge}
      >
        <TopInfoPanelItem icon={<WalletIcon />} title={<Trans>Net worth</Trans>} loading={loading}>
          {currentAccount ? (
            <FormattedNumber
              value={Number(user?.netWorthUSD || 0)}
              symbol="USD"
              variant={valueTypographyVariant}
              visibleDecimals={2}
              compact
              symbolsColor="#A5A8B6"
              symbolsVariant={noDataTypographyVariant}
            />
          ) : (
            <NoData variant={noDataTypographyVariant} sx={{ opacity: '0.7' }} />
          )}
        </TopInfoPanelItem>

        <TopInfoPanelItem
          icon={<NetAPYIcon />}
          title={
            <div style={{ display: 'flex' }}>
              <Trans>Net APY</Trans>
              <NetAPYTooltip />
            </div>
          }
          loading={loading}
        >
          {currentAccount && Number(user?.netWorthUSD) > 0 ? (
            <FormattedNumber
              value={user.netAPY}
              variant={valueTypographyVariant}
              visibleDecimals={2}
              percent
              symbolsColor="#A5A8B6"
              symbolsVariant={noDataTypographyVariant}
            />
          ) : (
            <NoData variant={noDataTypographyVariant} sx={{ opacity: '0.7' }} />
          )}
        </TopInfoPanelItem>

        {currentAccount && user?.healthFactor !== '-1' && (
          <TopInfoPanelItem
            icon={<EmptyHeartIcon />}
            title={
              <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
                <Trans>Health factor</Trans>
              </Box>
            }
            // TODO: need change icon
            // icon={
            //   <SvgIcon sx={{ fontSize: '24px' }}>
            //     {+user.healthFactor >= 10 && <HfFull />}
            //     {+user.healthFactor < 10 && +user.healthFactor >= 3 && <HfMiddle />}
            //     {+user.healthFactor < 3 && +user.healthFactor >= 1 && <HfLow />}
            //     {+user.healthFactor < 1 && <HfEmpty />}
            //   </SvgIcon>
            // }
            loading={loading}
          >
            <HealthFactorNumber
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
          </TopInfoPanelItem>
        )}

        {currentAccount && claimableRewardsUsd > 0 && (
          <TopInfoPanelItem
            title={<Trans>Available rewards</Trans>}
            icon={<ClaimGiftIcon />}
            loading={loading}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: { xs: 'flex-start', xsm: 'center' },
                flexDirection: { xs: 'column', xsm: 'row' },
              }}
            >
              <Box sx={{ display: 'inline-flex', alignItems: 'center' }} data-cy={'Claim_Box'}>
                <FormattedNumber
                  value={claimableRewardsUsd}
                  variant={valueTypographyVariant}
                  visibleDecimals={2}
                  compact
                  symbol="USD"
                  symbolsColor="#A5A8B6"
                  symbolsVariant={noDataTypographyVariant}
                  data-cy={'Claim_Value'}
                />
              </Box>

              <Button
                variant="gradient"
                size="small"
                onClick={() => openClaimRewards()}
                sx={{ minWidth: 'unset', ml: { xs: 0, xsm: 2 } }}
                data-cy={'Dashboard_Claim_Button'}
              >
                <Trans>Claim</Trans>
              </Button>
            </Box>
          </TopInfoPanelItem>
        )}
      </TopInfoPanel> */}

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
