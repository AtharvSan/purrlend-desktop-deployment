import { styled, ToggleButton, ToggleButtonProps } from '@mui/material';
import React from 'react';

const CustomToggleButton = styled(ToggleButton)<ToggleButtonProps>(({ theme }) => ({
  border: '0px',
  flex: 1,
  backgroundColor: '#E8E8E8',
  borderRadius: '70px',
  // margin: '10px',
  '&.Mui-selected, &.Mui-selected:hover': {
    backgroundColor: '#FFFFFF',
    borderRadius: '70px !important',
  },

  '&.Mui-selected, &.Mui-disabled': {
    zIndex: 100,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',

    '.MuiTypography-subheader1': {
      background: '#061512',
      backgroundClip: 'text',
      textFillColor: 'transparent',
    },
    '.MuiTypography-secondary14': {
      background: '#061512',
      backgroundClip: 'text',
      textFillColor: 'transparent',
    },
  },
})) as typeof ToggleButton;

export default function StyledToggleButton(props: ToggleButtonProps) {
  return <CustomToggleButton {...props} />;
}
