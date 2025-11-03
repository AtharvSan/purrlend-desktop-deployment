import { useLingui } from '@lingui/react';
import { Button, List, ListItem, Typography, useMediaQuery, useTheme } from '@mui/material';
import * as React from 'react';

import { Link } from '../../components/primitives/Link';
import { useProtocolDataContext } from '../../hooks/useProtocolDataContext';
import { navigation } from '../../ui-config/menu-items';
import { MoreMenu } from '../MoreMenu';
import { blue, blueGrey, orange } from '@mui/material/colors';

interface NavItemsProps {
  setOpen?: (value: boolean) => void;
}

export const NavItems = ({ setOpen }: NavItemsProps) => {
  const { i18n } = useLingui();
  const { currentMarketData } = useProtocolDataContext();

  const { breakpoints } = useTheme();
  const md = useMediaQuery(breakpoints.down('md'));

  return (
    <List
      sx={{
        display: 'flex',

        alignItems: { xs: 'flex-start', md: 'center' },
        flexDirection: { xs: 'column', md: 'row' },
        gap: {xs: '10px', md: '33px'},
      }}
      disablePadding
    >
      {navigation
        .filter((item) => !item.isVisible || item.isVisible(currentMarketData))
        .map((item, index) => (
          <ListItem
            sx={{
              // backgroundColor: 'red',
              display: 'flex',
              justifyContent: 'start',
              border: {xs: '1px solid #D7D7D7', md: 'none'},
              borderRadius: '16px',
              width: { xs: '96%', md: 'unset' },
              mx: 'auto',
            }}
            // data-cy={item.dataCy}
            disablePadding
            key={index}
          >
            {md ? (
              <Typography
                component={Link}
                href={item.link}
                activePaths={item.activePaths}
                color="#061512"
                sx={{ 
                  width: '100%', 
                  py: '21px',
                  px: 4,
                  fontWeight: 500,
                  fontSize: '20px',
                  lineHeight: '1em',
                  letterSpacing: '-0.02em',
                  // backgroundColor: 'red',
                }}
                onClick={() => (setOpen ? setOpen(false) : undefined)}
              >
                {typeof item.title === 'string' ? i18n._(item.title) : item.title}
              </Typography>
            ) : (
              <Button
                component={Link}
                href={item.link}
                activePaths={item.activePaths}  
                sx={(theme) => ({
                  fontSize: '14px',
                  fontWeight: 500,
                  lineHeight: '1em',
                  letterSpacing: '-0.02em',
                  color: '#061512',
                  p: '6px 8px',
                  minWidth: 'unset',
                  position: 'relative',
                  '&.active:after, &:hover:after': {
                    transform: 'scaleX(1)',
                    transformOrigin: 'bottom left',
                  },
                  '&:hover, &.active': {
                    color: 'rgba(255, 126, 9, 1)',
                    textShadow: '0px 2px 2px rgba(255, 126, 9, 0.2)',
                  },
                  '&:after': {
                    color: '#FF7A00',
                    content: "''",
                    position: 'absolute',
                    width: '70px',
                    height: '4px',
                    transform: 'scaleX(0)',
                    borderTopLeftRadius: '12px',
                    borderTopRightRadius: '12px',
                    boxShadow: '0px 4px 10px 0px #FF7E0963',
                    bottom: '-14px',
                    background: theme.palette.purr.main,
                    transformOrigin: 'bottom right',
                    transition: 'transform 0.25s ease-out',
                  },
                })}
              >
                {typeof item.title === 'string' ? i18n._(item.title) : item.title}
              </Button>
            )}
          </ListItem>
        ))}
    </List>
  );
};

