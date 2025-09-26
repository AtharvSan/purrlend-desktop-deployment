import { Switch } from '@mui/material';
import React from 'react';

import { ListItemIsolationBadge } from './ListItemIsolationBadge';

interface ListItemUsedAsCollateralProps {
  isIsolated: boolean;
  usageAsCollateralEnabledOnUser: boolean;
  canBeEnabledAsCollateral: boolean;
  onToggleSwitch: () => void;
}

export const ListItemUsedAsCollateral = ({
  isIsolated,
  usageAsCollateralEnabledOnUser,
  canBeEnabledAsCollateral,
  onToggleSwitch,
}: ListItemUsedAsCollateralProps) => {
  const isEnabled = usageAsCollateralEnabledOnUser && canBeEnabledAsCollateral;
  return (
    <>
      {!isIsolated ? (
        <Switch
          onClick={onToggleSwitch}
          disableRipple
          checked={isEnabled}
          disabled={!canBeEnabledAsCollateral}
          data-enabled={isEnabled ? 'true' : 'false'}    // stable attribute for root-targeting
          sx={(theme) => ({
            // root 
            borderColor: isEnabled ? 'rgba(24, 204, 111, 0.5)' : 'rgba(160,160,160,0.85)',
            backgroundColor: isEnabled ? 'rgba(24, 204, 111, 0.18)' : 'rgba(160,160,160,0.18)',

            //thumb
            '& .MuiSwitch-thumb': {
              backgroundColor: isEnabled ? 'rgba(24,204,111,1)' : 'rgba(160,160,160,0.85)',
            },
          })}
        />

      ) : (
        <ListItemIsolationBadge>
          <Switch
            onClick={onToggleSwitch}
            disableRipple
            checked={isEnabled}
            disabled={!canBeEnabledAsCollateral}
          />
        </ListItemIsolationBadge>
      )}
    </>
  );
};
