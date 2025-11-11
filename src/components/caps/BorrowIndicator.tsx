// BorrowPowerMUI.jsx
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';

export default function BorrowIndicator({
  percentage = 0,
  label = 'Borrow power used',
  width = '1.8cm',      // visual bar width
  height = 8,         // bar height in px
  gradient = 'linear-gradient(90deg,#ff8a00,#ff5f6d)', // default accent (change as needed)
}) {
  const pct = Math.max(0, Math.min(100, Number(percentage || 0)));
  const pctRounded = Math.round(pct * 100) / 100;

  return (
    <Box
      component="section"
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        userSelect: 'none',
      }}
    >
      {/* Visual bar inside a tooltip */}
      <Tooltip title={`${pctRounded}%`} placement="top">
        <Box
          role="progressbar"
          aria-valuenow={pctRounded}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${label}: ${pctRounded} percent`}
          sx={{
            width,
            height: `${height}px`,
            // border: '0.5px solid #888888',
            border: '0.5px solid #ff8a00cc',
            borderRadius: `${height / 2}px`,
            position: 'relative',
            backgroundColor: 'white',
            overflow: 'hidden',
            boxShadow: (theme) => `inset 0 1px 2px ${theme.palette.mode === 'light' ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.02)'}`,
          }}
        >
          {/* Fill */}
          <Box
            sx={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: `${pct}%`,
              // use gradient prop but fallback to theme primary if you want:
              background: gradient,
              transition: 'width 350ms cubic-bezier(.2,.8,.2,1)',
            }}
          />
          {/* subtle marker when almost full */}
          <Box
            sx={{
              position: 'absolute',
              right: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              height: `${Math.max(2, height - 4)}px`,
              width: 1,
              bgcolor: 'transparent',
              borderRadius: 1,
            }}
          />
        </Box>
      </Tooltip>
    </Box>
  );
}
