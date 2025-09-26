import { Paper, Typography, Box } from '@mui/material';
import { ReactNode } from 'react';

import { FormattedNumber } from '../../../components/primitives/FormattedNumber';

interface ListTopInfoItemProps {
  title: ReactNode;
  value: number | string;
  percent?: boolean;
  tooltip?: ReactNode;
}

export const ListTopInfoItem = ({ title, value, percent, tooltip }: ListTopInfoItemProps) => {
  return (
    <Paper
      // variant="outlined"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'start',
        boxShadow: 'none',
        bgcolor: 'transparent',
        height: '85%',
        width: '100%',
        pt: '2px',
        pl: '15px',
        // borderRight: '1px solid',
        // borderRadius: '0px',
        // borderColor: '#DCDCDC',
        // backgroundColor: 'red',
        // gap: '5px',
      }}
    >
      <Typography color="text.secondary" noWrap sx={{ 
        mr: 1,
        weight: 500,
        fontSize: '10px',
        lineHeight: '1em',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
      }}>
        {title}
      </Typography>
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // gap: '9px',
      }}>
        <FormattedNumber value={value} percent={percent} symbolsColor='#828282' fontWeight={600} size='18px' symbol="USD" sx={{
          fontWeight: 600,
          fontSize: '18px',
          lineHeight: '1em',
          letterSpacing: '-0.02em',
          color: 'rgba(6, 21, 18, 1)',
        }}/>

        {/* {tooltip} */}
      </Box>
    </Paper>
  );
};
