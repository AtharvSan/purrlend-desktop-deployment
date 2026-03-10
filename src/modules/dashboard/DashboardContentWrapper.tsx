import { Box, Divider, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { MerklRewardsPanel } from 'src/components/merkl/MerklRewardsPanel';
import { MERKL_CONFIG } from 'src/config/merkl';
import { buildMerklMarketMap } from 'src/helpers/merklMarketMapper';
import { getAllMerklOpportunities, getMerklOpportunities } from 'src/services/merklService';

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

  const [merklMap, setMerklMap] = useState<Record<string, any>>({});

  useEffect(() => {
    if (!MERKL_CONFIG.ENABLED) {
      console.log('MERKL disabled');
      return;
    }

    console.log('MERKL fetch start', 999);

    getAllMerklOpportunities(999)
      .then((data) => {
        console.log('MERKL RAW', data?.length || 0);
        const map = buildMerklMarketMap(data || [], 999);
        console.log('MERKL MAP', map);
        setMerklMap(map);
      })
      .catch((e) => {
        console.log('MERKL fetch failed', e.message);
        setMerklMap({});
      });
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mx: 'auto',
        width: { xs: '99%', md: '1199px' },
      }}
    >
      {/* <Box sx={{ width: '100%', mb: 3 }}> */}
      {/* <MerklRewardsPanel /> */}
      {/* </Box> */}

      {/* ---------- SUPPLY HEADER ---------- */}
      {isDesktop && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            marginTop: '25px',
            marginBottom: '15px',
          }}
        >
          <Box
            sx={{
              width: '6px',
              height: '6px',
              backgroundColor: '#FF7E09',
              boxShadow: '2px 0px 12px rgba(255, 126, 9, 0.5)',
            }}
          />
          <Typography
            sx={{
              fontWeight: 700,
              fontStyle: 'Bold',
              fontSize: '10px',
              leadingTrim: 'NONE',
              lineHeight: '1em',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'rgba(255, 126, 9, 1)',
            }}
          >
            supplies
          </Typography>
          <Divider
            sx={{
              width: '93.7%',
              borderColor: 'rgba(210, 210, 210, 1)',
              opacity: 0.8,
            }}
          />
        </Box>
      )}

      <Box
        sx={{
          display: { xs: isBorrow ? 'none' : 'flex', lg: 'flex' },
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignContent: 'flex-start',
          width: '100%',
          // backgroundColor: 'red',
          gap: { xs: '12px', md: '19px' },
        }}
      >
        <SuppliedPositionsList />
        <SupplyAssetsList merklMap={merklMap} />
      </Box>

      {isDesktop && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            marginTop: '25px',
            marginBottom: '15px',
          }}
        >
          <Box
            sx={{
              width: '6px',
              height: '6px',
              backgroundColor: 'rgba(255, 126, 9, 1)',
              boxShadow: '2px 0px 12px rgba(255, 126, 9, 0.5)',
            }}
          />
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              fontStyle: 'Bold',
              fontSize: '10px',
              leadingTrim: 'NONE',
              lineHeight: '1em',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#ff7e09',
            }}
          >
            borrow
          </Typography>
          <Divider
            sx={{
              width: '93.7%',
              borderColor: 'rgba(210, 210, 210, 1)',
              opacity: 0.8,
            }}
          />
        </Box>
      )}

      <Box
        sx={{
          display: { xs: !isBorrow ? 'none' : 'flex', lg: 'flex' },
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignContent: 'flex-start',
          width: '100%',
          gap: '19px',
        }}
      >
        <BorrowedPositionsList />
        <BorrowAssetsList />
      </Box>
    </Box>
  );
};
