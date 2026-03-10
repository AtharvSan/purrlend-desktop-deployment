import { SearchIcon } from '@heroicons/react/solid';
import { Trans } from '@lingui/macro';
import SecurityIcon from '@mui/icons-material/Security';
import {
  Box,
  Button,
  IconButton,
  SvgIcon,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useState } from 'react';

import { MarketAssetSearchInput } from './MarketAssetSearchInput';

interface MarketAssetListTitleProps {
  marketTitle: string;
  onSearchTermChange: (value: string) => void;
}

export const MarketAssetListTitle = ({
  marketTitle,
  onSearchTermChange,
}: MarketAssetListTitleProps) => {
  const [showSearchBar, setShowSearchBar] = useState(false);

  const { breakpoints } = useTheme();
  const sm = useMediaQuery(breakpoints.down('sm'));

  const showSearchIcon = sm && !showSearchBar;
  const showMarketTitle = !sm || !showSearchBar;

  const handleCancelClick = () => {
    setShowSearchBar(false);
    onSearchTermChange('');
  };

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        my: 4,
      }}
    >
      {showMarketTitle && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <Box
            sx={{
              width: '3px',
              height: '23px',
              backgroundColor: '#FF7E09',
            }}
          />
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: '20px',
              lineHeight: '1em',
              letterSpacing: '-0.02em',
            }}
          >
            Assets
          </Typography>
        </Box>
      )}

      {/* Audited badge — right side */}
      <Box
        component="a"
        href="https://github.com/Purrlend/Purrlend-AUDIT"
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          px: '10px',
          py: '4px',
          backgroundColor: '#f0fdf4',
          border: '1px solid #22c55e44',
          borderRadius: '20px',
          textDecoration: 'none',
          cursor: 'pointer',
          transition: 'all 0.2s',
          '&:hover': {
            backgroundColor: '#dcfce7',
            border: '1px solid #22c55e88',
            transform: 'translateY(-1px)',
          },
        }}
      >
        <SecurityIcon sx={{ fontSize: 14, color: '#16a34a' }} />
        <Typography
          sx={{
            fontSize: '12px',
            fontWeight: 600,
            color: '#16a34a',
            lineHeight: 1,
          }}
        >
          Audited and KYC Verified
        </Typography>
      </Box>

      {/* Search bar — commented out, uncomment to restore */}
      {/* <Box
        sx={{
          height: '40px',
          width: showSearchBar && sm ? '100%' : 'unset',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {showSearchIcon && (
          <MarketAssetSearchInput onSearchTermChange={onSearchTermChange} />
        )}
        {(showSearchBar || !sm) && (
          <Box sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            backgroundColor: '#FFFFFF',
            border: '1px solid',
            borderRadius: '38px',
            borderColor: '#D7D7D7',
          }}>
            <MarketAssetSearchInput onSearchTermChange={onSearchTermChange} />
            {sm && (
              <Button sx={{ ml: 2 }} onClick={() => handleCancelClick()}>
                <Typography variant="buttonM">
                  <Trans>Cancel</Trans>
                </Typography>
              </Button>
            )}
          </Box>
        )}
      </Box> */}
    </Box>
  );
};
