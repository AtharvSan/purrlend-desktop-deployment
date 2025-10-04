import { Box, Container, Divider } from '@mui/material';
import { ReactNode } from 'react';

import { PageTitle, PageTitleProps } from './PageTitle';

interface TopInfoPanelProps extends PageTitleProps {
  children?: ReactNode;
  titleComponent?: ReactNode;
}

export const TopInfoPanel = ({
  pageTitle,
  titleComponent,
  withMarketSwitcher,
  bridge,
  children,
}: TopInfoPanelProps) => {
  return (
    <Box>
      <Box 
        sx={{ 
          // px: { xs: 4, xsm: 0 }, 
          display: 'flex', 
          flexDirection: 'column', 
          // justifyContent: 'space-between',
          // alignItems: 'flex-start',
          marginTop: '34px',
          // backgroundColor: 'red',
          width: '1199px',
          mx: 'auto',
        }}>
        {!titleComponent && (
          <PageTitle
            pageTitle={pageTitle}
            withMarketSwitcher={withMarketSwitcher}
            bridge={bridge}
          />)
        }

        {titleComponent}
        <Divider 
          sx={{
            borderColor: '#D7D7D7',
          }}/>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            gap: '46px',
            mt: '26.2px',
            // backgroundColor: 'red',
            // flexWrap: 'wrap',
            // height: '10px',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};
