import { Box, Tooltip } from '@mui/material';
import { ReactNode } from 'react';

import { ListColumn } from '../../../components/lists/ListColumn';
import { FormattedNumber } from '../../../components/primitives/FormattedNumber';

interface ListValueColumnProps {
  symbol?: string;
  value: string | number;
  subValue?: string | number;
  withTooltip?: boolean;
  capsComponent?: ReactNode;
  disabled?: boolean;
}

const Content = ({
  value,
  withTooltip,
  subValue,
  disabled,
  capsComponent,
}: ListValueColumnProps) => {
  return (
    <Box sx={{ 
      display: 'flex',
      flexDirection: 'column', 
      alignItems: 'start', 
      justifyContent:'start',
      // pt: '20px',
      gap: '4px', 
      }}>
      <FormattedNumber
        value={value}
        variant="secondary14"
        visibleDecimals={2}
        sx={{ 
        fontWeight: 400,
        fontSize: '14px',
        lineHeight: '1em',
        letterSpacing: '-0.02em',
        color: '#061512',
        }}
        // color={disabled ? 'text.disabled' : 'text.main'}
        data-cy={`nativeAmount`}
      />
      {capsComponent}
      {!withTooltip && !!subValue && !disabled && (
        <FormattedNumber
          value={subValue}
          symbol="USD"
          // variant="secondary12"
          sx={{
            color: '#828282',
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '1em',
            letterSpacing: '-0.02em',
          }}
        />
      )}
    </Box>
  );
};

export const ListValueColumn = ({
  symbol,
  value,
  subValue,
  withTooltip,
  capsComponent,
  disabled,
}: ListValueColumnProps) => {
  return (
    <ListColumn basis={140} align="start" >
      <Content
          symbol={symbol}
          value={value}
          subValue={subValue}
          capsComponent={capsComponent}
          disabled={disabled}
          withTooltip={withTooltip}
        />
    </ListColumn>
  );
};
