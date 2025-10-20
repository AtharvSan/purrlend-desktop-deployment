import { Trans } from '@lingui/macro';
import { AlertColor, Box, Typography } from '@mui/material';

import { HealthFactorNumber } from '../../../components/HealthFactorNumber';
import { BasicModal } from '../../../components/primitives/BasicModal';
import { FormattedNumber } from '../../../components/primitives/FormattedNumber';
import { Link } from '../../../components/primitives/Link';
import { HFContent } from './components/HFContent';
import { InfoWrapper } from './components/InfoWrapper';
import { LTVContent } from './components/LTVContent';
import { Warning } from 'src/components/primitives/Warning';

interface LiquidationRiskParametresInfoModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  healthFactor: string;
  loanToValue: string;
  currentLoanToValue: string;
  currentLiquidationThreshold: string;
}

export const LiquidationRiskParametresInfoModal = ({
  open,
  setOpen,
  healthFactor,
  loanToValue,
  currentLoanToValue,
  currentLiquidationThreshold,
}: LiquidationRiskParametresInfoModalProps) => {
  let healthFactorColor: AlertColor = 'success';
  const hf = Number(healthFactor);
  if (hf > 1.1 && hf <= 3) {
    healthFactorColor = 'warning';
  } else if (hf <= 1.1) {
    healthFactorColor = 'error';
  }

  let ltvColor: AlertColor = 'success';
  const ltvPercent = Number(loanToValue) * 100;
  const currentLtvPercent = Number(currentLoanToValue) * 100;
  const liquidationThresholdPercent = Number(currentLiquidationThreshold) * 100;
  if (ltvPercent >= Math.min(currentLtvPercent, liquidationThresholdPercent)) {
    ltvColor = 'error';
  } else if (ltvPercent > currentLtvPercent / 2 && ltvPercent < currentLtvPercent) {
    ltvColor = 'warning';
  }

  return (
    <BasicModal open={open} setOpen={setOpen}>
      <Box sx={{
        display: 'flex',
      }}>
        <Box sx={{
          height: '31px',
          width: '2px',
          position: 'relative',
          left: '-24px',
          top: '-3.5px',
          backgroundColor: '#FF7E09',
          boxShadow: '2px 0px 12px 0px #FFFFFF80',
        }}>

        </Box>
        <Typography sx={{
          fontWeight: 600,
          fontSize: '24px',
          lineHeight:'1em',
          letterSpacing: '-0.02em',
          color: '#061512',
          position: 'relative',
          left: '-2px',
        }}>
          <Trans>Liquidity risk</Trans>
        </Typography>
      </Box>
      <Typography mb={6} mt={4}>
        <Trans>
          Your health factor and loan to value determine the assurance of your collateral. To avoid
          liquidations you can supply more collateral or repay borrow positions.
        </Trans>{' '}
        {/* <Link
          href="https://docs.aave.com/faq/"
          sx={{ textDecoration: 'underline' }}
          color="text.primary"
          variant="description"
        >
          <Trans>Learn more</Trans>
        </Link> */}
      </Typography>

      <InfoWrapper
        topTitle={<Trans>Health factor</Trans>}
        topDescription={
          <Trans>
            Safety of your deposited collateral against the borrowed assets and its underlying
            value.
          </Trans>
        }
        topValue={
          <HealthFactorNumber
            value={healthFactor}
            // variant="main12"
            sx={{ color: '#FF7E09' }}
          />
        }
        bottomText={
          <Trans>
            If the health factor goes below 1, the liquidation of your collateral might be
            triggered.
          </Trans>
        }
        color={healthFactorColor}
      >
        <HFContent healthFactor={healthFactor} />
      </InfoWrapper>

      <InfoWrapper 
        topTitle={<Trans>Current LTV</Trans>}
        topDescription={
          <Trans>Your current loan to value based on your collateral supplied.</Trans>
        }
        topValue={
          <FormattedNumber
            value={loanToValue}
            percent
            variant="main12"
            color="#FF7E09"
            symbolsColor="#FF7E09"
          />
        }
        bottomText={
          <Trans>
            If your loan to value goes above the liquidation threshold your collateral supplied may
            be liquidated.
          </Trans>
        }
        color={ltvColor}
        
      >
        <LTVContent
          loanToValue={loanToValue}
          currentLoanToValue={currentLoanToValue}
          currentLiquidationThreshold={currentLiquidationThreshold}
          color={ltvColor}
        />
      </InfoWrapper>
    </BasicModal>
  );
};
