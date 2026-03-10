import { Trans } from '@lingui/macro';
import { Box, Button, Typography } from '@mui/material';
import { StableAPYTooltip } from 'src/components/infoTooltips/StableAPYTooltip';
import { VariableAPYTooltip } from 'src/components/infoTooltips/VariableAPYTooltip';
import { useAssetCaps } from 'src/hooks/useAssetCaps';
import { useProtocolDataContext } from 'src/hooks/useProtocolDataContext';
import { DashboardReserve } from 'src/utils/dashboardSortUtils';

import { CapsHint } from '../../../../components/caps/CapsHint';
import { CapType } from '../../../../components/caps/helper';
import { IncentivesCard } from '../../../../components/incentives/IncentivesCard';
import { Link, ROUTES } from '../../../../components/primitives/Link';
import { Row } from '../../../../components/primitives/Row';
import { useModalContext } from '../../../../hooks/useModal';
import { ListMobileItemWrapper } from '../ListMobileItemWrapper';
import { ListValueRow } from '../ListValueRow';

export const BorrowAssetsListMobileItem = ({
  symbol,
  iconSymbol,
  name,
  availableBorrows,
  availableBorrowsInUSD,
  borrowCap,
  totalBorrows,
  variableBorrowRate,
  stableBorrowRate,
  sIncentivesData,
  vIncentivesData,
  underlyingAsset,
  isFreezed,
}: DashboardReserve) => {
  const { openBorrow } = useModalContext();
  const { currentMarket } = useProtocolDataContext();
  const borrowButtonDisable = isFreezed || Number(availableBorrows) <= 0;

  // Hide the asset to prevent it from being borrowed if borrow cap has been reached
  const { borrowCap: borrowCapUsage } = useAssetCaps();
  if (borrowCapUsage.isMaxed) return null;

  return (
    <ListMobileItemWrapper
      symbol={symbol}
      iconSymbol={iconSymbol}
      name={name}
      underlyingAsset={underlyingAsset}
      currentMarket={currentMarket}
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
            <Trans>Available to borrow</Trans>
          </Typography>
        }
        value={Number(availableBorrows)}
        subValue={Number(availableBorrowsInUSD)}
        disabled={Number(availableBorrows) === 0}
        capsComponent={
          <CapsHint
            capType={CapType.borrowCap}
            capAmount={borrowCap}
            totalAmount={totalBorrows}
            withoutText
          />
        }
      />

      <Row
        caption={
          <VariableAPYTooltip
            text={
              <Typography
                sx={{
                  fontWeight: 400,
                  fontSize: '16px',
                  lineHeight: '1em',
                  letterSpacing: '-0.02em',
                  color: '#828282',
                }}
              >
                <Trans>APY, variable</Trans>
              </Typography>
            }
            key="APY_dash_mob_variable_ type"
            variant="description"
          />
        }
        align="flex-start"
        captionVariant="description"
        mb={2}
      >
        <IncentivesCard
          value={Number(variableBorrowRate)}
          incentives={vIncentivesData}
          symbol={symbol}
          variant="secondary14"
        />
      </Row>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '3%',
          mt: 5,
        }}
      >
        <Button
          disabled={borrowButtonDisable}
          variant="contained"
          onClick={() => openBorrow(underlyingAsset)}
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
            <Trans>Borrow</Trans>
          </Typography>
        </Button>
        <Button
          variant="outlined"
          component={Link}
          href={ROUTES.reserveOverview(underlyingAsset, currentMarket)}
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
