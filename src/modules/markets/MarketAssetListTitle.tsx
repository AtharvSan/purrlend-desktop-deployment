import { SearchIcon } from '@heroicons/react/solid';
import { Trans } from '@lingui/macro';
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
        mb: '1%',
      }}
    >
      {showMarketTitle && (
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '15px',
        }}>
          <Box sx={{
            width: '3px',
            height: '23px',
            position: 'relative',
            // left: '-10px',
            // top: '25px',
            backgroundColor: '#FF7E09',

          }}>
          </Box>
          <Typography sx={{
            fontWeight: 600,
            fontSize: '20px',
            lineHeight: '1em',
            letterSpacing: '-0.02em',
            
            }}>
              {/* {marketTitle}  */}
              
              Assets</Typography>
        </Box>
      )}
      <Box
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
          <IconButton onClick={() => setShowSearchBar(true)}>
            <SvgIcon>
              <SearchIcon />
            </SvgIcon>
          </IconButton>
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
      </Box>
    </Box>
  );
};
