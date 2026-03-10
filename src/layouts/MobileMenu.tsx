import { MenuIcon } from '@heroicons/react/outline';
import { Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SvgIcon,
  Typography,
} from '@mui/material';
import React, { ReactNode, useEffect, useState } from 'react';
import { PROD_ENV } from 'src/utils/marketsAndNetworksConfig';

import { Link } from '../components/primitives/Link';
import { moreNavigation } from '../ui-config/menu-items';
import { DarkModeSwitcher } from './components/DarkModeSwitcher';
import { DrawerWrapper } from './components/DrawerWrapper';
import { LanguageListItem, LanguagesList } from './components/LanguageSwitcher';
import { MobileCloseButton } from './components/MobileCloseButton';
import { NavItems } from './components/NavItems';
import { TestNetModeSwitcher } from './components/TestNetModeSwitcher';
import WalletWidget from './WalletWidget';

interface MobileMenuProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  headerHeight: number;
}

const MenuItemsWrapper = ({ children, title }: { children: ReactNode; title: ReactNode }) => (
  <Box
    sx={{
      px: 2,
      mb: 6,
      '&:last-of-type': {
        mb: 0,
        '.MuiDivider-root': { display: 'none' },
      },
    }}
  >
    {children}
  </Box>
);

export const MobileMenu = ({ open, setOpen, headerHeight }: MobileMenuProps) => {
  const { i18n } = useLingui();
  const [isLanguagesListOpen, setIsLanguagesListOpen] = useState(false);

  const [walletWidgetOpen, setWalletWidgetOpen] = useState(false);
  useEffect(() => setIsLanguagesListOpen(false), [open]);

  return (
    <>
      {open ? (
        <Box
          sx={{
            display: 'flex',
            gap: '10px',
          }}
        >
          <WalletWidget
            open={walletWidgetOpen}
            setOpen={setWalletWidgetOpen}
            headerHeight={headerHeight}
          />
          {!walletWidgetOpen && <MobileCloseButton setOpen={setOpen} />}
        </Box>
      ) : (
        <Button
          id="settings-button-mobile"
          variant="surface"
          sx={{
            p: '7px 8px',
            minWidth: '44px',
            ml: '10px',
            // mr: '10px',
            border: '1px solid #FFFFFF33',
            borderRadius: '12px',
            // backgroundColor: 'red'
          }}
          onClick={() => setOpen(true)}
        >
          <SvgIcon sx={{ color: '#F1F1F3' }} fontSize="small">
            <MenuIcon />
          </SvgIcon>
        </Button>
      )}

      <DrawerWrapper open={open} setOpen={setOpen} headerHeight={headerHeight}>
        {!isLanguagesListOpen ? (
          <MenuItemsWrapper title={<Trans>Menu</Trans>}>
            <NavItems setOpen={setOpen} />
          </MenuItemsWrapper>
        ) : (
          <List sx={{ px: 2 }}>
            <LanguagesList onClick={() => setIsLanguagesListOpen(false)} />
          </List>
        )}
      </DrawerWrapper>
    </>
  );
};
