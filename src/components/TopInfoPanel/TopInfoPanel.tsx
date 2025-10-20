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
          display: 'flex', 
          flexDirection: 'column', 
          marginTop: '34px',
          width: {xs: '91%', md: '1199px'},
          mx: 'auto',
          mb: {xs: '36px', md: '0px'} ,
          // backgroundColor: 'red',
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
            flexDirection: {xs: 'column', md: 'row'},
            alignItems: 'flex-start',
            gap:{xs: '25px', md: '46px'},
            mt: {xs: '18px', md: '26.2px'},
            // backgroundColor: 'red',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};
