import { Drawer } from '@mui/material';
import { ReactNode } from 'react';

interface DrawerWrapperProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  headerHeight: number;
  children: ReactNode;
}

export const DrawerWrapper = ({ open, setOpen, children, headerHeight }: DrawerWrapperProps) => {
  return (
    <Drawer
      data-cy={`mobile-menu`}
      anchor="top"
      open={open}
      onClose={() => setOpen(false)}
      // hideBackdrop
      PaperProps={{
        sx: {
          width: '95%',
          borderBottomLeftRadius: '16px',
          borderBottomRightRadius: '16px',
          borderTopRightRadius: '0px',
          borderTopLeftRadius: '0px',
          mx: 'auto',
          // top: `${headerHeight}px`,
          top: '61.2px',
          pt: 6,
          pb: 4,
        },
      }}
    >
      {children}
    </Drawer>
  );
};
