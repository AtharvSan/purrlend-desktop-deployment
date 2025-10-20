import { Box, Skeleton, Typography, useMediaQuery, useTheme } from '@mui/material';
import { ReactNode } from 'react';

interface TopInfoPanelItemProps {
  icon?: ReactNode;
  title: ReactNode;
  titleIcon?: ReactNode;
  children: ReactNode;
  hideIcon?: boolean;
  withoutIconWrapper?: boolean;
  variant?: 'light' | 'dark' | undefined; // default dark
  withLine?: boolean;
  loading?: boolean;
}

export const TopInfoPanelItem = ({
  icon,
  title,
  titleIcon,
  children,
  hideIcon,
  variant = 'dark',
  withLine,
  loading,
  withoutIconWrapper,
}: TopInfoPanelItemProps) => {
  const theme = useTheme();
  const upToSM = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: { xs: 'calc(50)', xsm: 'unset' },
        // backgroundColor: 'red',
        mt: '1px',
      }}
    >
      {withLine && (
        <Box
          sx={{
            mr: 8,
            my: 'auto',
            width: '1px',
            bgcolor: '#F2F3F729',
            height: '37px',
          }}
        />
      )}

      {/* {!hideIcon &&
        (withoutIconWrapper ? (
          icon && icon
        ) : (
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid #EBEBED1F',
              borderRadius: '12px',
              bgcolor: '#383D51',
              boxShadow: '0px 2px 1px rgba(0, 0, 0, 0.05), 0px 0px 1px rgba(0, 0, 0, 0.25)',
              width: 42,
              height: 42,
              mr: 3,
            }}
          >
            {icon && icon}
          </Box>
        ))} */}

      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '9px',
          // backgroundColor:'blue' 
        }}>
        <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
          <Typography
            sx={{ 
              color: '#828282',
              fontWeight: 500,
              fontSize: '10px',
              letterSpacing: '0.08em',
              lineHeight: 1,
              textTransform: 'uppercase',
              // backgroundColor:'red' 

            }}
            variant={upToSM ? 'description' : 'caption'}
            // component="div"
          >
            {title}
          </Typography>
          {titleIcon && titleIcon}
        </Box>

        {loading ? <Skeleton height={upToSM ? 28 : 24} sx={{ background: '#383D51' }} /> : children}
      </Box>
    </Box>
  );
};
