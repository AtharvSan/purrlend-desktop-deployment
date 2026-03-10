import { Trans } from '@lingui/macro';
import { Box, Button, Typography } from '@mui/material';
import { useAssetCaps } from 'src/hooks/useAssetCaps';
import { useProtocolDataContext } from 'src/hooks/useProtocolDataContext';
import { DashboardReserve } from 'src/utils/dashboardSortUtils';

import { CapsHint } from '../../../../components/caps/CapsHint';
import { CapType } from '../../../../components/caps/helper';
import { IncentivesCard } from '../../../../components/incentives/IncentivesCard';
import { Link, ROUTES } from '../../../../components/primitives/Link';
import { Row } from '../../../../components/primitives/Row';
import { useModalContext } from '../../../../hooks/useModal';
import { ListItemCanBeCollateral } from '../ListItemCanBeCollateral';
import { ListMobileItemWrapper } from '../ListMobileItemWrapper';
import { ListValueRow } from '../ListValueRow';

export const SupplyAssetsListMobileItem = ({
  symbol,
  iconSymbol,
  name,
  walletBalance,
  walletBalanceUSD,
  supplyCap,
  totalLiquidity,
  supplyAPY,
  aIncentivesData,
  isIsolated,
  usageAsCollateralEnabledOnUser,
  isActive,
  isFreezed,
  underlyingAsset,
  detailsAddress,
}: DashboardReserve) => {
  const { currentMarket } = useProtocolDataContext();
  const { openSupply } = useModalContext();

  // Hide the asset to prevent it from being supplied if supply cap has been reached
  const { supplyCap: supplyCapUsage } = useAssetCaps();
  if (supplyCapUsage.isMaxed) return null;

  return (
    <ListMobileItemWrapper
      symbol={symbol}
      iconSymbol={iconSymbol}
      name={name}
      underlyingAsset={underlyingAsset}
      currentMarket={currentMarket}
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
            <Trans>Supply balance</Trans>
          </Typography>
        }
        value={Number(walletBalance)}
        subValue={walletBalanceUSD}
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
            <Trans>Supply APY</Trans>
          </Typography>
        }
        align="flex-start"
        captionVariant="description"
        mb={2}
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
            <Trans>Can be collateral</Trans>
          </Typography>
        }
        align="flex-start"
        captionVariant="description"
        mb={2}
        mt={3.5}
      >
        <ListItemCanBeCollateral
          isIsolated={isIsolated}
          usageAsCollateralEnabled={usageAsCollateralEnabledOnUser}
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
          disabled={!isActive || isFreezed || Number(walletBalance) <= 0}
          variant="contained"
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
          variant="outlined"
          component={Link}
          href={ROUTES.reserveOverview(detailsAddress, currentMarket)}
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
            <Trans>Details</Trans>
          </Typography>
        </Button>
      </Box>
    </ListMobileItemWrapper>
  );
};
