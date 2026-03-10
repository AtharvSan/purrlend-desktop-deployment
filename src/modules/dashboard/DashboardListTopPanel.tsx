import { Trans } from '@lingui/macro';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'; // thin rounded check
import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material';
import { FaucetButton } from 'src/components/FaucetButton';
import { ENABLE_TESTNET, STAGING_ENV } from 'src/utils/marketsAndNetworksConfig';

import { BridgeButton } from '../../components/BridgeButton';
import { toggleLocalStorageClick } from '../../helpers/toggle-local-storage-click';
import { NetworkConfig } from '../../ui-config/networksConfig';

interface DashboardListTopPanelProps extends Pick<NetworkConfig, 'bridge'> {
  value: boolean;
  onClick: (value: boolean) => void;
  localStorageName: string;
}

export const DashboardListTopPanel = ({
  value,
  onClick,
  localStorageName,
  bridge,
}: DashboardListTopPanelProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: { xs: 'flex-start', xsm: 'center' },
        justifyContent: 'space-between',
        flexDirection: { xs: 'column-reverse', xsm: 'row' },
        // backgroundColor: 'red',
        mt: '24px',
        // px: { xs: 4, xsm: 6 },
        py: 1,
        // pl: { xs: '18px', xsm: '27px' },
      }}
    >
      {/* <FormControlLabel
        sx={{ 
          mt: { xs: bridge ? 2 : 0, xsm: 0 },
          border: '1px solid rgba(220, 220, 220, 1)',
          backgroundColor: 'rgba(242, 242, 242, 1)',
          borderRadius: '8px',
          width: '94.6%', 
          margin: 'auto',
        }}
        control={
          <Checkbox
            sx={{
              '& .MuiSvgIcon-root': {
                fontSize: 22,
                borderRadius: '6px',
                border: '1px solid #828282',
              },
              '&.Mui-checked .MuiSvgIcon-root': {
                backgroundColor: '#000',
                color: '#fff',
                borderRadius: '6px',
              },
            }}
          />}
        checked={value}
        onChange={() => toggleLocalStorageClick(value, onClick, localStorageName)}
        label={
          <Typography sx={{
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '1em',
            letterSpacing: '-0.02em',
            }}>Show assets with 0 balance
          </Typography>
        }
      /> */}
      <FormControlLabel
        sx={{
          mt: { xs: bridge ? 2 : 0, xsm: 0 },
          border: '1px solid rgba(220, 220, 220, 1)',
          backgroundColor: 'rgba(242, 242, 242, 1)',
          borderRadius: '8px',
          // width: '94.6%',
          width: { xs: '95%', md: '97.2%' },
          margin: 'auto',
          display: 'flex',
          alignItems: 'center',
          pr: 2,
        }}
        control={
          <Checkbox
            disableRipple
            icon={
              <Box
                sx={{
                  width: 20,
                  height: 20,
                  borderRadius: '6px',
                  border: '1px solid #828282',
                  backgroundColor: '#F2F2F2',
                  boxSizing: 'border-box',
                }}
              />
            }
            checkedIcon={
              <Box
                sx={{
                  width: 20,
                  height: 20,
                  borderRadius: '6px',
                  backgroundColor: '#F2F2F2', // no dark fill
                  border: '1px solid #828282', // thicker, colored border to indicate checked
                  boxSizing: 'border-box',
                  pl: '1px',
                  pt: '0.5px',
                }}
              >
                <CheckRoundedIcon sx={{ width: 16, height: 16, color: '#0C2B1F' }} />
              </Box>
            }
            checked={value}
            onChange={() => toggleLocalStorageClick(value, onClick, localStorageName)}
          />
        }
        label={
          <Typography
            sx={{ fontWeight: 400, fontSize: '14px', lineHeight: '1em', letterSpacing: '-0.02em' }}
          >
            Show assets with 0 balance
          </Typography>
        }
      />

      {(STAGING_ENV || ENABLE_TESTNET) && <FaucetButton />}
      {!ENABLE_TESTNET && <BridgeButton bridge={bridge} />}
    </Box>
  );
};
