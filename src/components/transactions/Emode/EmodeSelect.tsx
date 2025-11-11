import { Trans } from '@lingui/macro';
import { FormLabel, Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import * as React from 'react';
import { EmodeCategory } from 'src/helpers/types';

import { getEmodeMessage } from './EmodeNaming';

export type EmodeSelectProps = {
  emodeCategories: Record<number, EmodeCategory>;
  selectedEmode: number | undefined;
  setSelectedEmode: React.Dispatch<React.SetStateAction<EmodeCategory | undefined>>;
  userEmode: number;
};

export const EmodeSelect = ({
  emodeCategories,
  selectedEmode,
  setSelectedEmode,
  userEmode,
}: EmodeSelectProps) => {
  return (
    <FormControl sx={{ mb: 1, width: '100%' }}>
      <FormLabel 
        sx={{ 
          mb: 1, 
          // font-family: 'Geist',
          fontWeight: 400,
          fontStyle: 'Regular',
          fontSize: '14px',
          lineHeight: '120%',
          letterSpacing: '0%',
          color: 'rgba(67, 67, 67, 1)',
          marginBottom: '8px',
          mt: '24px',
        }}>
        <Trans>Asset category</Trans>
      </FormLabel>

      <Select
        defaultValue={0}
        value={selectedEmode}
        onChange={(e) => {
          setSelectedEmode(emodeCategories[Number(e.target.value)]);
        }}
        className="EmodeSelect"
        data-cy="EmodeSelect"
        sx={{
          width: '100%',
          height: '53px',
          borderRadius: '6px',
          borderColor: 'divider',
          outline: 'none !important',
          color: 'text.primary',
          '.MuiOutlinedInput-input': {
            backgroundColor: 'transparent !important',
          },
          // '.MuiOutlinedInput-input': {
          //   backgroundColor: 'rgba(255, 122, 0, 0.1) !important',
          // },
          // '.MuiOutlinedInput-root': {
          //   backgroundColor: 'transparent !important',
          // },
          '.MuiOutlinedInput-notchedOutline, .MuiOutlinedInput-notchedOutline': {
            borderColor: 'divider',
            outline: 'none !important',
            borderWidth: '1px',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'divider',
            borderWidth: '1px',
          },
          '.MuiSelect-icon': { color: 'rgba(30, 30, 30, 1)' },
        }}
        native={false}
        renderValue={(emode) => {
          if (emode !== 0) {
            return (
              <Typography 
                sx={{
                  // font: 'Geist',
                  fontWeight: 500,
                  fontStyle: 'medium',
                  fontSize: '16px',
                  lineHeight: '100%',
                  letterSpacing: '-2%',
                  color: 'rgba(6, 21, 18, 1)',
                }}>
                {getEmodeMessage(emodeCategories[emode].label)}
              </Typography>
            );
          } else {
            return (
              <Typography color="text.muted">
                <Trans>Select</Trans>
              </Typography>
            );
          }
        }}
      >
        {Object.keys(emodeCategories).map((categoryKey) => {
          if (userEmode !== Number(categoryKey) && Number(categoryKey) !== 0) {
            return (
              <MenuItem
                key={`emode-${emodeCategories[Number(categoryKey)].id}`}
                value={emodeCategories[Number(categoryKey)].id}
              >
                {
                  <Typography color="text.primary">
                    {getEmodeMessage(emodeCategories[Number(categoryKey)].label)}
                  </Typography>
                }
              </MenuItem>
            );
          }
        })}
      </Select>
    </FormControl>
  );
};
