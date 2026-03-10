import { Trans } from '@lingui/macro';
import { Box, Button, Divider, Skeleton, Typography } from '@mui/material';
import { ReactNode } from 'react';
import { useAssetCaps } from 'src/hooks/useAssetCaps';
import { useModalContext } from 'src/hooks/useModal';
import { CustomMarket } from 'src/ui-config/marketsConfig';

import { Link, ROUTES } from '../primitives/Link';
import { TokenIcon } from '../primitives/TokenIcon';

interface ListMobileItemProps {
  warningComponent?: ReactNode;
  children: ReactNode;
  symbol?: string;
  iconSymbol?: string;
  name?: string;
  underlyingAsset?: string;
  loading?: boolean;
  currentMarket?: CustomMarket;
  showSupplyCapTooltips?: boolean;
  showBorrowCapTooltips?: boolean;
  showDebtCeilingTooltips?: boolean;

  showSupplyButton?: boolean;
  showBorder?: boolean;
  ptCustom?: string;
}

export const ListMobileItem = ({
  children,
  warningComponent,
  symbol,
  iconSymbol,
  name,
  underlyingAsset,
  loading,
  currentMarket,
  showSupplyCapTooltips = false,
  showBorrowCapTooltips = false,
  showDebtCeilingTooltips = false,
  showSupplyButton = false,
  showBorder,
  ptCustom = '12px',
}: ListMobileItemProps) => {
  const { supplyCap, borrowCap, debtCeiling } = useAssetCaps();
  const { openSupply } = useModalContext();

  return (
    <Box
      sx={{
        px: 4,
        pt: ptCustom,
        pb: 2,
        mb: 2,
        border: showBorder ? '1px solid #E8E8E8' : 'none',
        borderRadius: '16px',
        backgroundColor: '#FFFFFF',
      }}
    >
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {loading ? (
          <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
            <Skeleton variant="circular" width={40} height={40} />
            <Box sx={{ ml: 2 }}>
              <Skeleton width={100} height={24} />
            </Box>
          </Box>
        ) : (
          symbol &&
          underlyingAsset &&
          name &&
          currentMarket &&
          iconSymbol && (
            <>
              <Link
                href={ROUTES.reserveOverview(underlyingAsset, currentMarket)}
                sx={{ display: 'inline-flex', alignItems: 'center' }}
              >
                <TokenIcon symbol={iconSymbol} sx={{ fontSize: '40px' }} />
                <Box sx={{ ml: 4 }}>
                  <Typography
                    sx={{
                      fontWeight: 500,
                      fontSize: '18px',
                      lineHeight: '1em',
                      letterSpacing: '-0.02em',
                      color: '#061512',
                      mb: 2,
                    }}
                  >
                    {name}
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: 400,
                      fontSize: '14px',
                      lineHeight: '1em',
                      letterSpacing: '-0.02em',
                      color: '#828282',
                    }}
                  >
                    {symbol}
                  </Typography>
                </Box>
                {showSupplyCapTooltips && supplyCap.displayMaxedTooltip({ supplyCap })}
                {showBorrowCapTooltips && borrowCap.displayMaxedTooltip({ borrowCap })}
                {showDebtCeilingTooltips && debtCeiling.displayMaxedTooltip({ debtCeiling })}
              </Link>
              {showSupplyButton && (
                <Button
                  // disabled={!isActive || isFreezed || Number(walletBalance) <= 0}
                  variant="contained"
                  onClick={(e) => {
                    e.stopPropagation();
                    openSupply(underlyingAsset);
                  }}
                  sx={{
                    backgroundColor: '#2F2F2F',
                    color: '#FFFFFF',
                    border: '1px solid',
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '70px',
                    py: '7px',
                    px: '12px',
                    fontSize: '14px',
                    lineHeight: '1em',
                    letterSpacing: '-0.02em',
                  }}
                >
                  Supply
                </Button>
              )}
            </>
          )
        )}
        {warningComponent}
      </Box>
      {children}
    </Box>
  );
};
