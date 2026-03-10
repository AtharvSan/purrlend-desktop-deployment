import { ReserveIncentiveResponse } from '@aave/math-utils/dist/esm/formatters/incentive/calculate-reserve-incentives';
import { Box } from '@mui/material';

import { FormattedNumber } from '../primitives/FormattedNumber';
import { NoData } from '../primitives/NoData';
import { IncentivesButton } from './IncentivesButton';

interface IncentivesCardProps {
  symbol: string;
  value: string | number;
  incentives?: ReserveIncentiveResponse[];
  variant?: 'main14' | 'main16' | 'secondary14';
  symbolsVariant?: 'secondary14' | 'secondary16';
  align?: 'center' | 'flex-end';
}

export const IncentivesCard = ({
  symbol,
  value,
  incentives,
  variant = 'secondary14',
  symbolsVariant,
  align,
}: IncentivesCardProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: align || { xs: 'flex-end', xsm: 'center' },
        justifyContent: 'center',
        textAlign: 'center',
        // backgroundColor: 'red'
      }}
    >
      {value.toString() !== '-1' ? (
        <FormattedNumber
          value={value}
          color={'#061512'}
          fontWeight={400}
          fontSize={'16px'}
          size={'16px'}
          lineHeight={'1em'}
          letterSpacing={'-0.02em'}
          percent
          variant={variant}
          symbolsColor="#828282"
          symbolsVariant={symbolsVariant}
        />
      ) : (
        <NoData variant={variant} color="text.secondary" />
      )}

      <IncentivesButton incentives={incentives} symbol={symbol} />
    </Box>
  );
};
