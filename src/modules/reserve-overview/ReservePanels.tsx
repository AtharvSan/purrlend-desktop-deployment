import { Box, BoxProps, Typography, TypographyProps, useMediaQuery, useTheme } from '@mui/material';
import type { ReactNode } from 'react';

export const PanelRow: React.FC<BoxProps> = (props) => (
  <Box
    {...props}
    sx={{
      position: 'relative',
      display: { xs: 'block', md: 'flex' },
      flexDirection: 'column',
      margin: '0 auto',
      // backgroundColor: 'red',
      ...props.sx,
    }}
  />
);
export const PanelTitle: React.FC<TypographyProps> = (props) => (
  <Box sx={{mt: '10px',}}>
      <Box 
        sx={{
          backgroundColor: 'rgba(255, 126, 9, 1)',
          width: '2px',
          height: '24px',
          position: 'absolute',
          top: '-1px',
          mt: {xs: 'unset', md: '9.5px'},
        }}>
      </Box>
      <Typography
        {...props}
        sx={{ 
          minWidth: { xs: '170px' }, 
          mr: 4, 
          mb: { xs: 0, md: '2px' },
          ml: '16.2px',
          fontWeight: 600,
          fontSize: '20px',
          lineHeight: '1em',
          letterSpacing: '-0.02em',

          color: '#061512',
          ...props.sx 
        }}
      />
  </Box>
);

interface PanelItemProps {
  title: ReactNode;
  className?: string;
}

export const PanelItem: React.FC<PanelItemProps> = ({ title, children, className }) => {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Box
      sx={{
        // // mt: '25px',
        marginRight: '40px',
        // backgroundColor: 'red',
        position: 'relative',
        // '&:not(:last-child)': {
        //   pr: 4,
        //   // mr: 4,
        // },
        // ...(mdUp
        //   ? {
        //       '&:not(:last-child):not(.borderless)::after': {
        //         content: '""',
        //         height: '32px',
        //         position: 'absolute',
        //         right: 4,
        //         top: 'calc(50% - 17px)',
        //         // borderRight: (theme) => `1px solid ${theme.palette.divider}`,
        //       },
        //     }
        //   : {}),
      }}
      className={className}
    >
      <Typography color="text.secondary" component="span" 
        sx={{
          fontSize: '10px',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          fontStyle: 'medium',
          color: 'rgba(130, 130, 130, 1)',
          // md: '50px',
          // backgroundColor: 'red',
        }}>
        {title}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          // flex: 1,
          overflow: 'hidden',
          py: 1,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
