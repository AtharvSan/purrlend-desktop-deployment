import { Box } from '@mui/material';
import { ReactNode } from 'react';
import { ListColumn } from 'src/components/lists/ListColumn';
import { DASHBOARD_LIST_COLUMN_WIDTHS } from 'src/utils/dashboardSortUtils';

interface ListButtonsColumnProps {
  children?: ReactNode;
  isColumnHeader?: boolean;
}

export const ListButtonsColumn = ({ children, isColumnHeader = false }: ListButtonsColumnProps) => {
  return (
    <ListColumn isRow basis={10} shrink={10} overFlow="visible">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'start',
          alignItems: 'center',
          ml: '15px',
          maxWidth: DASHBOARD_LIST_COLUMN_WIDTHS.BUTTONS,
          // minWidth: DASHBOARD_LIST_COLUMN_WIDTHS.BUTTONS,
          flex: isColumnHeader ? 1 : 1,
          '.MuiButton-root': {
            // mr: '6px',
          },
        }}
      >
        {children}
      </Box>
    </ListColumn>
  );
};
