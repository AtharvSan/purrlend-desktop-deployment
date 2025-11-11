import { Trans } from '@lingui/macro';
import { Box, Collapse, Paper, Typography, useMediaQuery, useTheme } from '@mui/material';
import { ReactNode, useState } from 'react';
import { TransitionGroup } from 'react-transition-group';

import { toggleLocalStorageClick } from '../../helpers/toggle-local-storage-click';

interface ListWrapperProps {
  titleComponent: ReactNode;
  localStorageName?: string;
  subTitleComponent?: ReactNode;
  subChildrenComponent?: ReactNode;
  topInfo?: ReactNode;
  children: ReactNode;
  withTopMargin?: boolean;
  noData?: boolean;
}

export const ListWrapper = ({
  children,
  localStorageName,
  titleComponent,
  subTitleComponent,
  subChildrenComponent,
  topInfo,
  withTopMargin,
  noData,
}: ListWrapperProps) => {
  const [isCollapse, setIsCollapse] = useState(
    localStorageName ? localStorage.getItem(localStorageName) === 'true' : false
  );

  const collapsed = isCollapse && !noData;
  const { breakpoints } = useTheme();
  const isDesktop = useMediaQuery(breakpoints.up('lg'));

  return (
    <Paper
      sx={(theme) => ({
        mt: withTopMargin ? 0 : 0,
        borderRadius: '16px',
        width: '96.5%',
        mx: 'auto',
        height: '100%',
        boxShadow: '0px 3px 5px 0px #0000000A',
      })}
    >
      <Box
        sx={{
          pl: '14px',
          pr: '15px',
          mt: '15px',
          mb: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            py: '3.6px',
          }}
        >
          <Box sx={{
            width: '2px',
            height: '23px',
            position: 'relative',
            left: '-14px',
            backgroundColor: '#FC9538',
            boxShadow: '2px 0px 12px 0px #FFFFFF80',
            }}>
          </Box>
          {titleComponent}
          {isDesktop && subTitleComponent}
        </Box>

        {!!localStorageName && !noData && (
          <Box
            sx={{
              pt: '5px',
              pb: '5px',
              pl: '10px',
              pr: '6px',
              border: '1px solid',
              borderColor: 'rgba(220, 220, 220, 1)',
              // backgroundColor: 'red',
              borderRadius: '32px',
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              span: {
                width: '10.5px',
                height: '1.6px',
                bgcolor: 'text.secondary',
                position: 'relative',
                borderRadius: '50px',
                ml: 0,
                '&:after': {
                  content: "''",
                  position: 'absolute',
                  width: '10.5px',
                  height: '1.7px',
                  borderRadius: '50px',
                  bgcolor: 'text.secondary',
                  transition: 'all 0.2s ease',
                  transform: collapsed ? 'rotate(90deg)' : 'rotate(0)',
                  opacity: collapsed ? 1 : 0,
                },
              },
            }}
            onClick={() =>
              !!localStorageName && !noData
                ? toggleLocalStorageClick(isCollapse, setIsCollapse, localStorageName)
                : undefined
            }
          >
            <Typography sx={{
              fontWeight: 500,
              fontSize: '14px',
              lineHeight: '1em',
              letterSpacing: '-0.02em',
              color: '#061512',
              }}>{collapsed ? <Trans>Show</Trans> : <Trans>Hide</Trans>}</Typography>
            <Box
              sx={{
                ml: 1,
                width: 28,
                height: 20,
                border: '1px solid',
                borderColor: 'rgba(220, 220, 220, 1)',
                borderRadius: '32px',      // 👈 makes it a circle (or use 4px for square)
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
              }}
            >
              <span/>
            </Box>
          </Box>
        )}
        
      </Box>
      {!isDesktop && subTitleComponent}
      {topInfo && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            overflowX: 'auto',
            border: '1px solid',
            borderRadius: '8px',
            height: '63px',
            margin: 'auto',
            mt: {xs: '18px', md: '25px'},
            mb: '18px',
            mx: '16px',
            pt: '8px',
            pb: '5px',
            pr: '4px',
            backgroundColor: 'rgba(242, 242, 242, 1)',
            borderColor: 'rgba(220, 220, 220, 1)',
          }}
        >
          {topInfo}
        </Box>
      )}
      {subChildrenComponent && !collapsed && (
        <Box sx={{ 
          marginBottom: { xs: 2, xsm: 0 },
          width: '97%',
          mx: 'auto',
        }}>{subChildrenComponent}</Box>
      )}
      {/* <Box sx={{ display: collapsed ? 'none' : 'block' }}>
        <Collapse
          in={!collapsed}
          timeout={600}
          easing={{ enter: 'ease-out', exit: 'ease-in' }}
        >
          {children}
        </Collapse>
      </Box> */}

        <Collapse
          in={!collapsed}
          timeout={370}
          easing={{ enter: 'ease-out', exit: 'ease-in' }}
          unmountOnExit
        >
          {children}
        </Collapse>
    </Paper>
  );
};
