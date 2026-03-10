import { useState, useRef } from 'react';
import { Box, Typography, Popover, Divider } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { FormattedNumber } from 'src/components/primitives/FormattedNumber';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { uiConfig } from 'src/uiConfig';
import { TokenIcon } from '../primitives/TokenIcon';


interface APYBreakdownTooltipProps {
  baseAPY: number;           // raw decimal e.g. 0.0004 for 0.04%
  merklApr: number;          // percent e.g. 211.42 — 0 if unpriced
  dailyRewards: number;      // e.g. 1500000 pts/day (whole units)
  rewardToken: string;       // e.g. "Purr points"
  hasMerkl: boolean;
  symbol: string;            // asset symbol e.g. "USDC"
  tvlUsd: number;            // merkl pool TVL in USD
  totalLiquidityUsd: number; // reserve TVL in USD (fallback)
  fontsize?: string;        // optional font size for the trigger text
}

export const APYBreakdownTooltip = ({
  baseAPY,
  merklApr,
  dailyRewards,
  rewardToken,
  hasMerkl,
  symbol,
  tvlUsd,
  totalLiquidityUsd,
  fontsize
}: APYBreakdownTooltipProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const open = Boolean(anchorEl);

  const merklAprDecimal = merklApr / 100;
  const totalAPY = baseAPY + merklAprDecimal;

  // Points per $1 supplied per day = dailyRewards / tvl
  // Use whichever TVL is available
  const effectiveTvl = tvlUsd > 0 ? tvlUsd : totalLiquidityUsd;
  const pointsPerDollarPerDay = dailyRewards > 0 && effectiveTvl > 0
    ? dailyRewards / effectiveTvl
    : 0;

  function formatPts(n: number): string {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(2)}K`;
    if (n >= 1) return n.toFixed(2);
    if (n >= 0.01) return n.toFixed(4);
    return n.toExponential(2);
  }

  function formatDailyRewards(n: number): string {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
    return n.toFixed(0);
  }

  // Compact APR formatter: 11,203,906% -> "11.2M%", 207% -> "207.10%"
  function formatApr(n: number): string {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M%`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K%`;
    return `${n.toFixed(2)}%`;
  }

  // Right-side label for the reward row
  const rewardLabel = merklApr >= 1
    ? formatApr(merklApr)
    : pointsPerDollarPerDay > 0
    ? `${formatPts(pointsPerDollarPerDay)} pts/$1/d`
    : dailyRewards > 0
    ? `${formatDailyRewards(dailyRewards)}/day`
    : '—';

  // Live APY label
  const totalAprPercent = totalAPY * 100;
  const liveApyLabel = totalAprPercent > 0 ? formatApr(totalAprPercent) : '—';

  return (
    <>
      {/* Trigger row: APY number + sparkle button */}
      <Box
        ref={ref}
        onClick={(e) => {
          e.stopPropagation();
          setAnchorEl(anchorEl ? null : ref.current);
        }}
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '5px',
          cursor: 'pointer',
          borderRadius: '8px',
          // px: '6px',
          py: '2px',
          transition: 'background 0.15s',
          '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' },
        }}
      >
        {/* Show total APY (base + merkl) when priced, otherwise just base */}
        {/* {merklApr >= 1 ? (
          <Typography fontSize={14} color="#061512" fontWeight={400} lineHeight="1em" letterSpacing={'-0.02em'} >
            {formatApr(totalAprPercent)}
          </Typography>
        ) : baseAPY > 0 ? (
          <FormattedNumber
            value={baseAPY}
            percent
            color="#061512"
            fontWeight={400}
            fontSize="14px"
            lineHeight="1em"
          />
        ) : (
          <Typography fontSize={14} color="text.secondary" lineHeight="1em">—</Typography>
        )} */}
        {totalAprPercent > 0 ? (
          <Typography
            fontSize={fontsize || '14px'}
            color="#061512"
            fontWeight={400}
            lineHeight="1em"
            letterSpacing="-0.02em"
          >
            {formatApr(totalAprPercent)}
          </Typography>
        ) : (
          <Typography fontSize={14} color="text.secondary" lineHeight="1em">
            —
          </Typography>
        )}

        {hasMerkl && (
          <Box sx={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: 20, height: 20, borderRadius: '50%',
            bgcolor: open ? '#ff7e09' : '#fdeee1',
            flexShrink: 0,
            transition: 'background 0.15s',
            '&:hover': { bgcolor: '#ff7e09', '& svg': { color: '#fff' } },
          }}>
            <AutoAwesomeIcon sx={{ fontSize: 11, color: open ? '#fff' : '#ff7e09' }} />
          </Box>
        )}
      </Box>

      {/* Breakdown popover */}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClick={(e) => e.stopPropagation()}
        PaperProps={{
          sx: {
            mt: 1,
            borderRadius: '16px',
            boxShadow: '0px 8px 24px rgba(0,0,0,0.12)',
            border: '1px solid #white',
            maxWidth: 300,
            overflow: 'hidden',
          },
        }}
      >
        {/* Header */}
        {hasMerkl && (
          <Box sx={{
            px: '24px',
            py: 1.5,
            bgcolor: '#white',
            borderTop: '1px solid #e8faf0',
          }}>
            <Box sx={{
              pt: '18px',
              pb: '8px',
            }}>
              <img src={uiConfig.merkl} width={120} />
            </Box>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
              <Typography fontSize={12} color="#black" lineHeight={1.75} sx={{ textTransform: 'uppercase' }}>
                campaign initiated by Purrlend and implemented by Merkl.<br/><br/>
                claim Merkl rewards through the{' '}
                <Typography
                  component="a"
                  href="https://app.merkl.xyz/protocols/purrlend?tokenType=all&sort=tvl-desc"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    fontSize: 11,
                    color: 'black',
                    fontWeight: 600,
                    textDecoration: 'underline',
                    '&:hover': { color: '#1cb554' },
                    
                  }}
                >
                  official Merkl app
                </Typography>
                .
              </Typography>
            </Box>
          </Box>
        )}

        {/* Header */}
        {/* <Box sx={{ px: 2, py: 1.5, bgcolor: '#f8f8f8', borderBottom: '1px solid #fdeee1' }}>
          <Typography fontSize={11} fontWeight={600} color="#828282" letterSpacing="0.08em" textTransform="uppercase">
            APY Breakdown
          </Typography>
        </Box> */}

        <Box sx={{ px: '24px', pb: '24px', pt: '16px', display: 'flex', flexDirection: 'column', gap: 3.5 }}>

          {/* Base Yield row */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <TokenIcon symbol={symbol} sx={{ fontSize: '22px' }} />
              <Typography fontSize={14} color="#444">Base APY</Typography>
            </Box>
            <Typography fontSize={14} fontWeight={600} color="#061512">
              {baseAPY > 0 ? `${(baseAPY * 100).toFixed(2)}%` : '—'}
            </Typography>
          </Box>

          {/* Merkl Reward row */}
          {hasMerkl && (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'flex-start'}}>
                  <TokenIcon symbol="USDC" aToken sx={{ fontSize: '22px' }} />
                  <Typography fontSize={14} color="#444">{rewardToken}</Typography>
                  {merklApr < 1 && dailyRewards > 0 && (
                    <Typography fontSize={14} color="#828282">
                      {formatDailyRewards(dailyRewards)} pts total/day
                    </Typography>
                  )}
                </Box>
              </Box>
              <Typography fontSize={13} fontWeight={600} color={merklApr >= 1 ? '#061512' : '#061512'}
                sx={{ textAlign: 'right', ml: 1 }}>
                {rewardLabel}
              </Typography>
            </Box>
          )}
        </Box>

        
      </Popover>
    </>
  );
};