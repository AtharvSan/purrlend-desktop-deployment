import { valueToBigNumber } from '@aave/math-utils';
import { Trans } from '@lingui/macro';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { TypographyProps } from '@mui/material/Typography';
import BigNumber from 'bignumber.js';

import { FormattedNumber } from './primitives/FormattedNumber';

interface HealthFactorNumberProps extends TypographyProps {
  value: string;
  onInfoClick?: () => void;
  HALIntegrationComponent?: React.ReactNode;
}

export const HealthFactorNumber = ({
  value,
  onInfoClick,
  HALIntegrationComponent,
  ...rest
}: HealthFactorNumberProps) => {
  const { palette } = useTheme();

  const formattedHealthFactor = Number(valueToBigNumber(value).toFixed(2, BigNumber.ROUND_DOWN));
  let healthFactorColor = '';
  if (formattedHealthFactor >= 3) {
    healthFactorColor = palette.success.main;
  } else if (formattedHealthFactor < 1.1) {
    healthFactorColor = palette.error.main;
  } else {
    healthFactorColor = palette.warning.main;
  }

  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: { xs: 'flex-start', xsm: 'center' },
        // flexDirection: { xs: 'column', xsm: 'row' },
        flexDirection: 'row',
        // gap: '4px'
      }}
      data-cy={'HealthFactorTopPannel'}
    >
      {value === '-1' ? (
        <Typography variant="secondary14" color={palette.success.main}>
          ∞
        </Typography>
      ) : (
        <FormattedNumber
          value={formattedHealthFactor}
          sx={{ color: healthFactorColor, ...rest.sx }}
          visibleDecimals={2}
          compact
          {...rest}
        />
      )}

      {onInfoClick && (
        <Button
          onClick={onInfoClick}
          variant="surfaceWhite"
          size="small"
          sx={{
            minWidth: 'unset',
            ml: { xs: 2, xsm: 2 },
            borderRadius: '32px',
            border: '1px solid #06151226',
            // borderColor: 'rgba(6, 21, 18, 0.15)',
            textTransform: 'none',
          }}
        >
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: '12px',
              lineHeight: '1em',
              letterSpacing: '-0.02em',
              color: '#061512',
              py: '6px',
              px: '4px',
            }}
          >
            <Trans>Risk details</Trans>
          </Typography>
        </Button>
      )}

      {HALIntegrationComponent && (
        <Box ml={{ xs: 0, xsm: 2 }} mt={{ xs: 1, xsm: 0 }}>
          {HALIntegrationComponent}
        </Box>
      )}
    </Box>
  );
};
