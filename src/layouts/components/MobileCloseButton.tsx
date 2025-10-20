import { XIcon } from '@heroicons/react/outline';
import { Box, IconButton, SvgIcon } from '@mui/material';
import React from 'react';
import { uiConfig } from 'src/uiConfig';

interface MobileCloseButtonProps {
  setOpen: (value: boolean) => void;
}

export const MobileCloseButton = ({ setOpen }: MobileCloseButtonProps) => {
  return (
    <IconButton onClick={() => setOpen(false)} sx={{ p: 0, mr: { xs: 0, xsm: 1 , backgroundColor: 'black'} }}>
      {/* <SvgIcon sx={{ 
        color: '#F1F1F3',
        backgroundColor: '#061512', 
        fontSize: '32px',
        borderRadius: '12px',
      }}>
        <XIcon />
      </SvgIcon> */}
      <Box sx={{
        backgroundColor: '#061512',
        width: '44px',
        height: '38px',
        borderRadius: '12px',
        pt: '2.5px',
        pl: '1px',
        
      }}>
        <img src={uiConfig.xicon} />

      </Box>
    </IconButton>
  );
};
