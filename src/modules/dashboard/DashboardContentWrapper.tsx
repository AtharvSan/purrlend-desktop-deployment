import { Box, useMediaQuery, useTheme, Divider, Typography } from '@mui/material';

import { BorrowAssetsList } from './lists/BorrowAssetsList/BorrowAssetsList';
import { BorrowedPositionsList } from './lists/BorrowedPositionsList/BorrowedPositionsList';
import { SuppliedPositionsList } from './lists/SuppliedPositionsList/SuppliedPositionsList';
import { SupplyAssetsList } from './lists/SupplyAssetsList/SupplyAssetsList';

interface DashboardContentWrapperProps {
  isBorrow: boolean;
}

export const DashboardContentWrapper = ({ isBorrow }: DashboardContentWrapperProps) => {
  const { breakpoints } = useTheme();
  const isDesktop = useMediaQuery(breakpoints.up('lg'));
  const paperWidth = isDesktop ? 'calc(50% - 8px)' : '100%';

  return (
    // <Box //main container for all dashboards
    //   sx={{
    //     display: isDesktop ? 'flex' : 'block',
    //     justifyContent: 'space-between',
    //     alignItems: 'flex-start',
    //     width: '1190px',
    //   }}
    // >
    //   <Box sx={{ display: { xs: isBorrow ? 'none' : 'block', lg: 'block' }, width: paperWidth }}>
    //     <SuppliedPositionsList />
    //     <SupplyAssetsList />
    //   </Box>

    //   <Box sx={{ display: { xs: !isBorrow ? 'none' : 'block', lg: 'block' }, width: paperWidth }}>
    //     <BorrowedPositionsList />
    //     <BorrowAssetsList />
    //   </Box>
    // </Box>

    <Box sx={{
      display: isDesktop ? 'flex' : 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      // mx: '1.97%',
      mx: 'auto',
      width: '1199px',
      }}>

      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between', 
        alignItems: 'center',
        width: '100%',
        marginTop: '25px',
        marginBottom: '6px',
        }}>
        <Box sx={{
          width: '6px', 
          height: '6px', 
          backgroundColor: '#FF7E09', 
          boxShadow: '2px 0px 12px rgba(255, 126, 9, 0.5)',
        }}></Box>
        <Typography 
          sx={{ 
          fontWeight: 700,
          fontStyle: 'Bold',
          fontSize: '10px',
          leadingTrim: "NONE",
          lineHeight: '1em',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'rgba(255, 126, 9, 1)',
          }}>supplies</Typography>
        <Divider sx={{ 
          width: '93.7%',
          borderColor: 'rgba(210, 210, 210, 1)',
          opacity: 0.8,
          }}/></Box>
      
      <Box sx={{ 
        display: { xs: isBorrow ? 'none' : 'flex', lg: 'flex' }, 
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'flex-start',
        width: '100%',
        gap: '19px',
        }}>
        <SuppliedPositionsList /><SupplyAssetsList /></Box>

      <Box sx={{
        display: 'flex', 
        flexDirection: 'row',
        justifyContent: 'space-between', 
        alignItems: 'center',
        width: '100%',
        marginTop: '25px',
        marginBottom: '6px',
        }}>
        <Box sx={{
          width: '6px', 
          height: '6px', 
          backgroundColor: 'rgba(255, 126, 9, 1)', 
          boxShadow: '2px 0px 12px rgba(255, 126, 9, 0.5)',
          }}></Box>
        <Typography 
          variant="h4" 
          sx={{ 
          fontWeight: 700,
          fontStyle: 'Bold',
          fontSize: '10px',
          leadingTrim: "NONE",
          lineHeight: '1em',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'rgba(255, 126, 9, 1)',
          }}>borrow</Typography>
        <Divider sx={{ 
          width: '93.7%',
          borderColor: 'rgba(210, 210, 210, 1)',
          opacity: 0.8,
          }}/></Box>

      <Box sx={{ 
        display: { xs: isBorrow ? 'none' : 'flex', lg: 'flex' }, 
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'flex-start',
        width: '100%',
        gap: '19px',
        }}><BorrowedPositionsList /><BorrowAssetsList /></Box>
    
    
    </Box>
  );
};
