import { normalizeBN, RAY, rayDiv, rayMul } from '@aave/math-utils';
import { Trans } from '@lingui/macro';
import { Box, Typography, useTheme } from '@mui/material';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { curveMonotoneX } from '@visx/curve';
import { localPoint } from '@visx/event';
import { Group } from '@visx/group';
import { scaleLinear } from '@visx/scale';
import { Bar, Line, LinePath } from '@visx/shape';
import { Text } from '@visx/text';
import { defaultStyles, TooltipWithBounds, withTooltip } from '@visx/tooltip';
import { WithTooltipProvidedProps } from '@visx/tooltip/lib/enhancers/withTooltip';
import { BigNumber } from 'bignumber.js';
import { bisector, max } from 'd3-array';
import React, { Fragment, useCallback, useMemo } from 'react';

import type { Fields } from './InterestRateModelGraphContainer';

type TooltipData = Rate;

type InterestRateModelType = {
  variableRateSlope1: string;
  variableRateSlope2: string;
  stableRateSlope1: string;
  stableRateSlope2: string;
  stableBorrowRateEnabled?: boolean;
  optimalUsageRatio: string;
  utilizationRate: string;
  baseVariableBorrowRate: string;
  baseStableBorrowRate: string;
};

type Rate = {
  stableRate: number;
  variableRate: number;
  utilization: number;
};

// accessors
const getDate = (d: Rate) => d.utilization;
const bisectDate = bisector<Rate, number>((d) => d.utilization).center;
const getVariableBorrowRate = (d: Rate) => d.variableRate * 100;
const getStableBorrowRate = (d: Rate) => d.stableRate * 100;
const tooltipValueAccessors = {
  stableBorrowRate: getStableBorrowRate,
  variableBorrowRate: getVariableBorrowRate,
  utilizationRate: () => 38,
};

const resolution = 200;
const step = 100 / resolution;

function getRates({
  variableRateSlope1,
  variableRateSlope2,
  stableRateSlope1,
  stableRateSlope2,
  optimalUsageRatio,
  baseVariableBorrowRate,
  baseStableBorrowRate,
}: InterestRateModelType): Rate[] {
  const rates: Rate[] = [];
  const formattedOptimalUtilizationRate = normalizeBN(optimalUsageRatio, 25).toNumber();

  for (let i = 0; i <= resolution; i++) {
    const utilization = i * step;
    // When zero
    if (utilization === 0) {
      rates.push({
        stableRate: 0,
        variableRate: 0,
        utilization,
      });
    }
    // When hovering below optimal utilization rate, actual data
    else if (utilization < formattedOptimalUtilizationRate) {
      const theoreticalStableAPY = normalizeBN(
        new BigNumber(baseStableBorrowRate).plus(
          rayDiv(rayMul(stableRateSlope1, normalizeBN(utilization, -25)), optimalUsageRatio)
        ),
        27
      ).toNumber();
      const theoreticalVariableAPY = normalizeBN(
        new BigNumber(baseVariableBorrowRate).plus(
          rayDiv(rayMul(variableRateSlope1, normalizeBN(utilization, -25)), optimalUsageRatio)
        ),
        27
      ).toNumber();
      rates.push({
        stableRate: theoreticalStableAPY,
        variableRate: theoreticalVariableAPY,
        utilization,
      });
    }
    // When hovering above optimal utilization rate, hypothetical predictions
    else {
      const excess = rayDiv(
        normalizeBN(utilization, -25).minus(optimalUsageRatio),
        RAY.minus(optimalUsageRatio)
      );
      const theoreticalStableAPY = normalizeBN(
        new BigNumber(baseStableBorrowRate)
          .plus(stableRateSlope1)
          .plus(rayMul(stableRateSlope2, excess)),
        27
      ).toNumber();
      const theoreticalVariableAPY = normalizeBN(
        new BigNumber(baseVariableBorrowRate)
          .plus(variableRateSlope1)
          .plus(rayMul(variableRateSlope2, excess)),
        27
      ).toNumber();
      rates.push({
        stableRate: theoreticalStableAPY,
        variableRate: theoreticalVariableAPY,
        utilization,
      });
    }
  }
  return rates;
}

export type AreaProps = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  fields: Fields;
  reserve: InterestRateModelType;
};
;
export const InterestRateModelGraph = withTooltip<AreaProps, TooltipData>(
  ({
    width,
    height,
    margin = { top: 20, right: 10, bottom: 20, left: 40 },
    showTooltip,
    hideTooltip,
    tooltipData,
    tooltipLeft = 0,
    fields,
    reserve,
  }: AreaProps & WithTooltipProvidedProps<TooltipData>) => {
    if (width < 10) return null;
    const theme = useTheme();

    // Formatting
    const formattedCurrentUtilizationRate = (parseFloat(reserve.utilizationRate) * 100).toFixed(2);
    const formattedOptimalUtilizationRate = normalizeBN(reserve.optimalUsageRatio, 25).toNumber();

    // Tooltip Styles
    const accentColorDark = theme.palette.mode === 'light' ? '#383D511F' : '#a5a8b647';
    const tooltipStyles = {
      ...defaultStyles,
      padding: '8px 12px',
      boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.2), 0px 2px 10px rgba(0, 0, 0, 0.1)',
      borderRadius: '4px',
      color: '#62677B',
      fontSize: '12px',
      lineHeight: '16px',
      letterSpacing: '0.15px',
    };
    const tooltipStylesDark = {
      ...tooltipStyles,
      background: theme.palette.background.default,
    };

    const data = useMemo(() => getRates(reserve), [JSON.stringify(reserve)]);

    // bounds
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // ===== new: compute y domain snapped to 100% increments and tickValues =====
    const { tickValues, yValueScale } = useMemo(() => {
      const maxYRaw = reserve.stableBorrowRateEnabled
        ? Math.max(
            (max(data, (d) => getStableBorrowRate(d)) as number) || 0,
            (max(data, (d) => getVariableBorrowRate(d)) as number) || 0
          )
        : ((max(data, (d) => getVariableBorrowRate(d)) as number) || 0);

      // round up to nearest 100 and ensure at least 300 to match visual intent
      const paddedMax = Math.max(Math.ceil((maxYRaw || 0) / 100) * 100, 300);

      const ticks = Array.from({ length: paddedMax / 100 + 1 }, (_, i) => i * 100);

      const yScale = scaleLinear({
        range: [innerHeight, 0],
        domain: [0, paddedMax],
        nice: false, // keep the domain exact so ticks align exactly
      });

      return { tickValues: ticks, yValueScale: yScale };
    }, [data, innerHeight, reserve.stableBorrowRateEnabled]);

    // scales (dateScale)
    const dateScale = useMemo(
      () =>
        scaleLinear({
          range: [0, innerWidth],
          domain: [0, 100],
          nice: true,
        }),
      [innerWidth]
    );

    // tooltip handler (uses dateScale)
    const handleTooltipWithDate = useCallback(
      (event: React.TouchEvent<SVGRectElement> | React.MouseEvent<SVGRectElement>) => {
        const { x: _x } = localPoint(event) || { x: 0 };
        const x = _x - margin.left;
        const x0 = dateScale.invert(x);
        const index = bisectDate(data, x0, 1);
        const d0 = data[index - 1];
        const d1 = data[index];
        let d = d0;
        if (d1 && getDate(d1)) {
          d = x0.valueOf() - getDate(d0).valueOf() > getDate(d1).valueOf() - x0.valueOf() ? d1 : d0;
        }
        showTooltip({
          tooltipData: d,
          tooltipLeft: x,
        });
      },
      [showTooltip, dateScale, data, margin]
    );

    const ticks = [
      {
        value: normalizeBN(reserve.optimalUsageRatio, 27).multipliedBy(100).toNumber(),
        label: 'optimal',
      },
      {
        value: new BigNumber(reserve.utilizationRate).multipliedBy(100).toNumber(),
        label: 'current',
      },
    ];

    // compute label x positions (used for the small blue squares)
    const xPosCurrent = dateScale(ticks[1].value);
    const xPosOptimal = dateScale(ticks[0].value);

    return (
      <>
        <svg width={width} height={height}>
          <Group left={margin.left} top={margin.top}>
            {/* Horizontal Background Lines at exact 100% increments */}
            {tickValues.map((tv) => (
              <line
                key={`grid-${tv}`}
                x1={0}
                x2={innerWidth}
                y1={yValueScale(tv)}
                y2={yValueScale(tv)}
                stroke="#EFEFEF"
                strokeWidth={1}
                pointerEvents="none"
              />
            ))}

            {/* Variable Borrow APR Line */}
            <LinePath
              stroke="#18CC6F"
              strokeWidth={1}
              data={data}
              x={(d) => dateScale(getDate(d)) ?? 0}
              y={(d) => yValueScale(getVariableBorrowRate(d)) ?? 0}
              curve={curveMonotoneX}
            />

            {/* Stable Borrow APR Line (optional) */}
            {/* {reserve.stableBorrowRateEnabled && (
              <LinePath
                stroke="#E7C6DF"
                strokeWidth={2}
                data={data}
                x={(d) => dateScale(getDate(d)) ?? 0}
                y={(d) => yValueScale(getStableBorrowRate(d)) ?? 0}
                curve={curveMonotoneX}
              />
            )} */}

            {/* X Axis */}
            <AxisBottom
              top={innerHeight}
              scale={dateScale}
              tickValues={[0, 25, 50, 75, 100]}
              strokeWidth={0}
              tickStroke={theme.palette.text.secondary}
              tickLabelProps={() => ({
                fill: '#828282',
                fontSize: 12,
                textAnchor: 'middle',
                fontWeight: 400,
              })}
              tickFormat={(n) => `${n}%`}
            />

            {/* Y Axis with the same tickValues */}
            <AxisLeft
              scale={yValueScale}
              strokeWidth={0}
              tickValues={tickValues}
              tickLabelProps={() => ({
                fill: '#828282',
                fontSize: 12,
                fontWeight: 400,
                dx: -margin.left + 10,
              })}
              tickFormat={(value) => `${value}%`}
            />

            {/* Background interactive layer */}
            <Bar
              width={innerWidth}
              height={innerHeight}
              fill="transparent"
              onTouchStart={handleTooltipWithDate}
              onTouchMove={handleTooltipWithDate}
              onMouseMove={handleTooltipWithDate}
              onMouseLeave={() => hideTooltip()}
            />

            {/* Current Utilization Line */}
            <Line
              from={{ x: xPosCurrent, y: margin.top + 8 }}
              to={{ x: xPosCurrent, y: innerHeight }}
              stroke="#2D88FF4D"
              strokeWidth={1}
              pointerEvents="none"
            />
            <Text
              x={xPosCurrent}
              y={margin.top }
              width={360}
              textAnchor="start"
              verticalAnchor="middle"
              fontSize="10px"
              fill="#62677B"
              fontWeight={500}
              lineHeight={'1em'}
              letterSpacing={'0.08em'}
            >
              {`CURRENT `}
            </Text>
            <Text
              x={xPosCurrent + 60}
              y={margin.top }
              width={360}
              textAnchor="start"
              verticalAnchor="middle"
              fontSize="10px"
              fill="#061512 "
              fontWeight={500}
              lineHeight={'1em'}
              letterSpacing={'0.08em'}
            >
              {`${formattedCurrentUtilizationRate}%`}
            </Text>


            {/* Optimal Utilization Line */}
            <Line
              from={{ x: xPosOptimal, y: margin.top + 8 }}
              to={{ x: xPosOptimal, y: innerHeight }}
              stroke="#2D88FF4D"
              strokeWidth={1}
              pointerEvents="none"
            />
            <Text
              x={xPosOptimal}
              y={margin.top}
              width={360}
              textAnchor="middle"
              verticalAnchor="middle"
              fontSize="10px"
              fill="#62677B"
              fontWeight={500}
              lineHeight={'1em'}
              letterSpacing={'0.08em'}
            >
              {`OPTIMAL `}
            </Text>
            <Text
              x={xPosOptimal + 45}
              y={margin.top}
              width={360}
              textAnchor="middle"
              verticalAnchor="middle"
              fontSize="10px"
              fill="#061512"
              fontWeight={500}
              lineHeight={'1em'}
              letterSpacing={'0.08em'}
            >
              {`${formattedOptimalUtilizationRate}%`}
            </Text>

            {/* Tooltip markers and vertical line */}
            {tooltipData && (
              <g>
                {/* Vertical dashed line */}
                <Line
                  from={{ x: tooltipLeft, y: margin.top }}
                  to={{ x: tooltipLeft, y: innerHeight }}
                  stroke={accentColorDark}
                  strokeWidth={1}
                  pointerEvents="none"
                  strokeDasharray="5,2"
                />
                {/* Variable borrow rate marker */}
                <circle
                  cx={tooltipLeft}
                  cy={yValueScale(getVariableBorrowRate(tooltipData))}
                  r={6}
                  fill="#000"
                  fillOpacity={0.06}
                  pointerEvents="none"
                />
                <circle
                  cx={tooltipLeft}
                  cy={yValueScale(getVariableBorrowRate(tooltipData))}
                  r={4}
                  fill="#18CC6F"
                  stroke="#fff"
                  strokeWidth={1.5}
                  pointerEvents="none"
                />
                {/* Stable borrow rate marker (optional) */}
                {reserve.stableBorrowRateEnabled && (
                  <Fragment key={'stable'}>
                    <circle
                      cx={tooltipLeft}
                      cy={yValueScale(getStableBorrowRate(tooltipData))}
                      r={6}
                      fill="#000"
                      fillOpacity={0.06}
                      pointerEvents="none"
                    />
                    <circle
                      cx={tooltipLeft}
                      cy={yValueScale(getStableBorrowRate(tooltipData))}
                      r={4}
                      fill={accentColorDark}
                      stroke="#fff"
                      strokeWidth={1.5}
                      pointerEvents="none"
                    />
                  </Fragment>
                )}
              </g>
            )}
          </Group>
        </svg>

        {/* Tooltip Info */}
        {tooltipData && (
          <div>
            <TooltipWithBounds
              top={20}
              left={tooltipLeft + 40}
              style={theme.palette.mode === 'light' ? tooltipStyles : tooltipStylesDark}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="main12" color="primary" sx={{ mr: 2 }}>
                  <Trans>Utilization Rate</Trans>
                </Typography>
                <Typography variant="main12" color="primary">
                  {tooltipData.utilization}%
                </Typography>
              </Box>
              {fields.map((field) => (
                <Box key={field.name} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="caption" color="text.secondary" sx={{ mr: 2 }}>
                    {field.text}
                  </Typography>
                  <Typography variant="main12" color="text.primary">
                    {tooltipValueAccessors[field.name](tooltipData).toFixed(2)}%
                  </Typography>
                </Box>
              ))}
            </TooltipWithBounds>
          </div>
        )}
      </>
    );
  }
);
