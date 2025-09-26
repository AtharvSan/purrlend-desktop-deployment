import { Trans } from '@lingui/macro';
import { Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { RenFILToolTip } from 'src/components/infoTooltips/RenFILToolTip';
import { NoData } from 'src/components/primitives/NoData';
import { ReserveSubheader } from 'src/components/ReserveSubheader';
import { useProtocolDataContext } from 'src/hooks/useProtocolDataContext';

import { IncentivesCard } from '../../components/incentives/IncentivesCard';
import { AMPLToolTip } from '../../components/infoTooltips/AMPLToolTip';
import { ListColumn } from '../../components/lists/ListColumn';
import { ListItem } from '../../components/lists/ListItem';
import { FormattedNumber } from '../../components/primitives/FormattedNumber';
import { Link, ROUTES } from '../../components/primitives/Link';
import { TokenIcon } from '../../components/primitives/TokenIcon';
import { ComputedReserveData } from '../../hooks/app-data-provider/useAppDataProvider';
import { uiConfig } from 'src/uiConfig';
import { useModalContext } from 'src/hooks/useModal';

export const MarketAssetsListItem = ({ ...reserve }: ComputedReserveData) => {
  const router = useRouter();
  const { currentMarket } = useProtocolDataContext();
  const { openSupply } = useModalContext();

  return (
    <>
    <Box sx={{
    display: 'flex',
    alignItems: 'center',
    pt: '16px',
    pb: '13px',
    pl: '15px',
    border: '1px solid',
    borderRadius: '16px',
    backgroundColor: '#FFFFFF',
    borderColor: '#EAEAEA',
    boxShadow: '0px 3px 5px 0px #0000000A',
    }}>
      <Box sx={{
        width: '285px',
      }}>
        <ListColumn isRow maxWidth={280}>
          <TokenIcon symbol={reserve.iconSymbol} sx={{height: '32px', width: '32px' }} />
          <Box sx={{
          display: 'flex', 
          flexDirection: 'column',
          // backgroundColor: 'red',
          pl: '16px',
          gap: '7px',
          overflow: 'hidden'
          }}>
            <Typography sx={{
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '1em',
            letterSpacing: '-0.02em',
            color: '#061512',
            // pb: '5px'
            }}>
              {reserve.name}
            </Typography>
            <Typography sx={{
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '1em',
            letterSpacing: '-0.02em',
            color: '#828282',
            }}>
              {reserve.symbol}
            </Typography>
          </Box>
        </ListColumn>
      </Box>

      <Box sx={{
        width: '175px',
      }}>
        <ListColumn gapVal={'5px'}>
          <FormattedNumber compact color={'#061512'} visibleDecimals={2} fontWeight={400} fontSize={'16px'} letterSpacing={'-0.02em'} lineHeight={'1em'} value={reserve.totalLiquidity} />
          <FormattedNumber compact color={'#828282'} symbolsColor={'#828282'} fontWeight={400} fontSize={'14px'} letterSpacing={'-0.02em'} lineHeight={'1em'} symbol="USD" value={reserve.totalLiquidityUSD} />
        </ListColumn>
      </Box>

      <Box sx={{
        width: '165px',
        pb: '23px',
      }}>
        <ListColumn>
          <IncentivesCard
            value={reserve.supplyAPY}
            incentives={reserve.aIncentivesData || []}
            symbol={reserve.symbol}
          />
        </ListColumn>
      </Box>
      
      <Box sx={{
        width: '152px',
      }}>
        <ListColumn gapVal={'5px'}>
          {reserve.borrowingEnabled || Number(reserve.totalDebt) > 0 ? (
            <>
              <FormattedNumber compact color={'#061512'} visibleDecimals={2} fontWeight={400} fontSize={'16px'} letterSpacing={'-0.02em'} lineHeight={'1em'} value={reserve.totalDebt} />{' '}
              <FormattedNumber compact color={'#828282'} symbolsColor={'#828282'} fontWeight={400} fontSize={'14px'} letterSpacing={'-0.02em'} lineHeight={'1em'} symbol="USD" value={reserve.totalDebtUSD} />
            </>
          ) : (
            <NoData variant={'secondary14'} color="text.secondary" />
          )}
        </ListColumn>
      </Box>

      <Box sx={{
        width: '137px',
        pb: '23px',
      }}>
        <ListColumn>
          <IncentivesCard
            value={Number(reserve.totalVariableDebtUSD) > 0 ? reserve.variableBorrowAPY : '-1'}
            incentives={reserve.vIncentivesData || []}
            symbol={reserve.symbol}
            // variant="main16"
            // symbolsVariant="secondary16"
          />
          {!reserve.borrowingEnabled &&
            Number(reserve.totalVariableDebt) > 0 &&
            !reserve.isFrozen && <ReserveSubheader value={'Disabled'} />}
        </ListColumn>
      </Box>

      <Box sx={{
        width: '165px',
        pb: '15px',
      }}>
        <ListColumn>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            }}>
            <img src={uiConfig.pyth} height={22} width={22} alt="pyth" />
            <Typography sx={{
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '1em',
              letterSpacing: '-0.02em',
              color: '#061512',
              }}>Pyth</Typography>
          </Box>
        </ListColumn>
      </Box>
      
      <Box sx={{
        pb: '10px',
      }}>
        <ListColumn align="right">
          <Button
            // disabled={!isActive || isFreezed || Number(walletBalance) <= 0}
            variant="contained"
            onClick={() => openSupply(reserve.underlyingAsset)}
            sx={{
              backgroundColor: 'rgba(6, 21, 18, 1)',
              color: '#FFFFFF',
              border: '1px solid',
              borderColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '70px',
              py: '7px',
              px: '12px',
              fontSize: '14px',
              lineHeight: '1em',
              letterSpacing: '-0.02em',

            }}>Supply</Button>
        </ListColumn>
      </Box>
    </Box>
    </>
  );
};
