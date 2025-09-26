'use client';

import React from 'react';
import { Box, Tooltip, Typography, useTheme } from '@mui/material';

export type CapsSemiGaugeProps = {
  value: number;                 // 0–100
  label?: string;
  tooltipContent?: React.ReactNode;

  size?: number;
  thickness?: number;

  trackColor?: string;
  arcColor?: string;
  borderOpacity?: number;
  shadowOpacity?: number;
  gap?: number;                  // px gap between green & grey

  /** fine-tune vertical position (px). +ve = down, -ve = up */
  centerOffset?: number;

  /** font sizes (px or CSS size, e.g. '1.2rem') */
  valueFontSize?: number | string;
  labelFontSize?: number | string;
};

export default function CapsSemiGauge({
  value,
  label = 'FILLED',
  tooltipContent,
  size,
  thickness = 22,
  trackColor,
  arcColor,
  borderOpacity = 0.08,
  shadowOpacity = 0.18,
  gap = 1.5,
  centerOffset,                          // optional override
  valueFontSize,
  labelFontSize,
}: CapsSemiGaugeProps) {
  const theme = useTheme();
  const pct = Math.max(0, Math.min(100, value)) / 100;

  // colors
  const _track =
    trackColor ??
    (theme.palette.mode === 'dark'
      ? 'rgba(255,255,255,0.16)'
      : 'rgba(0,0,0,0.08)');
  const _arc = arcColor ?? theme.palette.success.main;

// geometry
const rTrack = (size - thickness) / 2;     // grey rail radius

// For equal inner & outer gaps of `gap`:
const rArc = rTrack;                        // SAME radius as track
const strokeWidthArc = Math.max(1, thickness - 2 * gap); // thinner by 2*gap

const cx = size / 2;
const cy = size / 2;

// dash math for track
const CTrack = 2 * Math.PI * rTrack;
const dashArrayTrack = `${CTrack / 2} ${CTrack}`;

// dash math for arc (uses rArc)
const CArc = 2 * Math.PI * rArc;
const halfArc = CArc / 2;
const dashArrayArc = `${halfArc} ${CArc}`;
const dashOffsetArc = halfArc * (1 - pct);


  const svg = (
    <svg
      width={size}
      height={size / 2}
      viewBox={`0 0 ${size} ${size}`}
      style={{ overflow: 'visible' }}
      aria-hidden
    >
      <defs>
        <filter id="trackShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="3" stdDeviation="3.5" floodOpacity={shadowOpacity} />
        </filter>
        <filter id="arcShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodOpacity={shadowOpacity} />
        </filter>
        <linearGradient id="arcFill" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={_arc} />
          <stop offset="100%" stopColor={_arc} />
        </linearGradient>
      </defs>

      {/* TRACK with subtle border */}
      <g filter="url(#trackShadow)">
        <circle
          cx={cx}
          cy={cy}
          r={rTrack}
          fill="none"
          stroke={`rgba(0,0,0,${borderOpacity})`}
          strokeWidth={thickness + 2}
          strokeLinecap="butt"
          strokeDasharray={dashArrayTrack}
          transform={`rotate(180 ${cx} ${cy})`}
        />
        <circle
          cx={cx}
          cy={cy}
          r={rTrack}
          fill="none"
          stroke={_track}
          strokeWidth={thickness}
          strokeLinecap="butt"
          strokeDasharray={dashArrayTrack}
          transform={`rotate(180 ${cx} ${cy})`}
        />
      </g>

      {/* ACTIVE ARC (flat ends), pulled slightly inward -> creates the gap */}
      <g filter="url(#arcShadow)">
        <circle
            cx={cx}
            cy={cy}
            r={rArc}
            fill="none"
            stroke="url(#arcFill)"
            strokeWidth={strokeWidthArc}
            strokeLinecap="butt"
            strokeDasharray={dashArrayArc}
            strokeDashoffset={dashOffsetArc}
            transform={`rotate(180 ${cx} ${cy})`}
            style={{ transition: 'stroke-dashoffset 600ms ease' }}
        />
      </g>
    </svg>
  );

  // Base position that keeps text nicely inside the gauge.
  // Positive centerOffset moves it further down if it's too close to the rail.
  const baseOffset = -(size / 2.55);
  const offset = (centerOffset ?? 10) + baseOffset; // default pushes it ~10px down from previous version

  // Sensible responsive defaults if sizes not specified
  const valueSize = valueFontSize ?? Math.max(18, Math.round(size * 0.19));
  const labelSize = labelFontSize ?? Math.max(10, Math.round(size * 0.09));

  return (
    <Box sx={{
      ml:'40px',
      height: 100, 
      width: 120,  
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center' 
      }}>
      {tooltipContent ? <Tooltip title={tooltipContent}>{svg}</Tooltip> : svg}

      {/* Text block positioned inside the arc */}
      <Box sx={{ position: 'relative', top: offset, textAlign: 'center', pointerEvents: 'none' }}>
        <Typography sx={{ lineHeight: 1, fontWeight: 500, letterSpacing: '-0.02em', fontSize: '18px', }}>
          {(pct * 100).toFixed(2)}%
        </Typography>
        <Typography sx={{ mt: 1, opacity: 0.6, letterSpacing: 1.2, fontSize: labelSize }}>
          {label}
        </Typography>
      </Box>
    </Box>
  );
}
