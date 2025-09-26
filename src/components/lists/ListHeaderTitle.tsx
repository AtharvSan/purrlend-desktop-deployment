import { Box, Typography } from '@mui/material';
import { ReactNode } from 'react';
import { uiConfig } from 'src/uiConfig';

interface ListHeaderTitleProps {
  sortName?: string;
  sortDesc?: boolean;
  sortKey?: string;
  setSortName?: (value: string) => void;
  setSortDesc?: (value: boolean) => void;
  children: ReactNode;
}

export const ListHeaderTitle = ({
  sortName,
  sortDesc,
  sortKey,
  setSortName,
  setSortDesc,
  children,
}: ListHeaderTitleProps) => {
  const handleSorting = (name: string) => {
    setSortDesc && setSortDesc(false);
    setSortName && setSortName(name);
    if (sortName === name) {
      setSortDesc && setSortDesc(!sortDesc);
    }
  };

  return (
    <Typography
      component="div"
      noWrap
      onClick={() => !!sortKey && handleSorting(sortKey)}
      sx={{
        cursor: !!sortKey ? 'pointer' : 'default',
        display: 'inline-flex',
        alignItems: 'center',
        color: '#828282',
        fontWeight: 500,
        fontSize: '10px',
        letterSpacing: '0.08em',
        lineHeight: '1em',
        textTransform: 'uppercase',
      }}
    >
      {children}

      {!!sortKey && (
        <Box sx={{ display: 'flex', flexDirection: 'column',justifyContent: 'center',gap: '2px', ml: 1 }}>
            {(sortName === sortKey && !sortDesc) ? (
              <img src={uiConfig.upOrange} />
            ):(
              <img src={uiConfig.upDark} />
            )}
            {(sortName === sortKey && sortDesc) ? (
              <img src={uiConfig.downOrange} />
            ):(
              <img src={uiConfig.downDark} />
            )}
        </Box>
      )}
    </Typography>
  );
};
