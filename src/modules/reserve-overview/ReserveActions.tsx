import { API_ETH_MOCK_ADDRESS, InterestRate } from '@aave/contract-helpers';
import { USD_DECIMALS, valueToBigNumber } from '@aave/math-utils';
import { Trans } from '@lingui/macro';
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Paper,
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import React, { ReactNode, useState } from 'react';
import { WalletIcon } from 'src/components/icons/WalletIcon';
import { getMarketInfoById } from 'src/components/MarketSwitcher';
import { FormattedNumber } from 'src/components/primitives/FormattedNumber';
import { Warning } from 'src/components/primitives/Warning';
import StyledToggleButton from 'src/components/StyledToggleButton';
import StyledToggleButtonGroup from 'src/components/StyledToggleButtonGroup';
import { ConnectWalletButton } from 'src/components/WalletConnection/ConnectWalletButton';
import {
  ComputedReserveData,
  useAppDataContext,
} from 'src/hooks/app-data-provider/useAppDataProvider';
import { useWalletBalances } from 'src/hooks/app-data-provider/useWalletBalances';
import { useModalContext } from 'src/hooks/useModal';
import { usePermissions } from 'src/hooks/usePermissions';
import { useProtocolDataContext } from 'src/hooks/useProtocolDataContext';
import { useWeb3Context } from 'src/libs/hooks/useWeb3Context';
import { BuyWithFiat } from 'src/modules/staking/BuyWithFiat';
import { useRootStore } from 'src/store/root';
import { getMaxAmountAvailableToBorrow } from 'src/utils/getMaxAmountAvailableToBorrow';
import { getMaxAmountAvailableToSupply } from 'src/utils/getMaxAmountAvailableToSupply';

import { CapType } from '../../components/caps/helper';
import { AvailableTooltip } from '../../components/infoTooltips/AvailableTooltip';
import { Link, ROUTES } from '../../components/primitives/Link';
import { useReserveActionState } from '../../hooks/useReserveActionState';

import { uiConfig } from '/src/uiConfig';
import { TokenIcon } from 'src/components/primitives/TokenIcon';


const amountToUSD = (
  amount: string,
  formattedPriceInMarketReferenceCurrency: string,
  marketReferencePriceInUsd: string
) => {
  return valueToBigNumber(amount)
    .multipliedBy(formattedPriceInMarketReferenceCurrency)
    .multipliedBy(marketReferencePriceInUsd)
    .shiftedBy(-USD_DECIMALS)
    .toString();
};

interface ReserveActionsProps {
  reserve: ComputedReserveData;
}

export const ReserveActions = ({ reserve }: ReserveActionsProps) => {
  const [selectedAsset, setSelectedAsset] = useState<string>(reserve.symbol);

  const { currentAccount, loading: loadingWeb3Context } = useWeb3Context();
  const { isPermissionsLoading } = usePermissions();
  const { openBorrow, openSupply } = useModalContext();
  const { currentMarket, currentNetworkConfig } = useProtocolDataContext();
  const { user, loading: loadingReserves, marketReferencePriceInUsd } = useAppDataContext();
  const { walletBalances, loading: loadingWalletBalance } = useWalletBalances();
  const {
    poolComputed: { minRemainingBaseTokenBalance },
  } = useRootStore();

  const { baseAssetSymbol } = currentNetworkConfig;
  let balance = walletBalances[reserve.underlyingAsset];
  if (reserve.isWrappedBaseAsset && selectedAsset === baseAssetSymbol) {
    balance = walletBalances[API_ETH_MOCK_ADDRESS.toLowerCase()];
  }

  const maxAmountToBorrow = getMaxAmountAvailableToBorrow(
    reserve,
    user,
    InterestRate.Variable
  ).toString();

  const maxAmountToBorrowUSD = amountToUSD(
    maxAmountToBorrow,
    reserve.formattedPriceInMarketReferenceCurrency,
    marketReferencePriceInUsd
  );

  const maxAmountToSupply = getMaxAmountAvailableToSupply(
    balance?.amount || '0',
    reserve,
    reserve.underlyingAsset,
    minRemainingBaseTokenBalance
  ).toString();

  const maxAmountToSupplyUSD = amountToUSD(
    maxAmountToSupply,
    reserve.formattedPriceInMarketReferenceCurrency,
    marketReferencePriceInUsd
  );

  const { disableSupplyButton, disableBorrowButton, alerts } = useReserveActionState({
    balance: balance?.amount || '0',
    maxAmountToSupply,
    maxAmountToBorrow,
    reserve,
  });

  if (!currentAccount && !isPermissionsLoading) {
    return <ConnectWallet loading={loadingWeb3Context} />;
  }

  if (loadingReserves || loadingWalletBalance) {
    return <ActionsSkeleton />;
  }

  const onSupplyClicked = () => {
    if (reserve.isWrappedBaseAsset && selectedAsset === baseAssetSymbol) {
      openSupply(API_ETH_MOCK_ADDRESS.toLowerCase());
    } else {
      openSupply(reserve.underlyingAsset);
    }
  };

  const { market } = getMarketInfoById(currentMarket);

  return (
    <PaperWrapper>
      {reserve.isWrappedBaseAsset && (
        <Box>
          <WrappedBaseAssetSelector
            assetSymbol={reserve.symbol}
            baseAssetSymbol={baseAssetSymbol}
            selectedAsset={selectedAsset}
            setSelectedAsset={setSelectedAsset}
          />
        </Box>
      )}
      <WalletBalance
        balance={balance.amount}
        symbol={selectedAsset}
        marketTitle={market.marketTitle}
      />
      {reserve.isFrozen ? (
        <Box sx={{ mt: 3 }}>
          <FrozenWarning />
        </Box>
      ) : (
        <>
          {/* <Divider sx={{ my: 6 }} /> */}
          <Box 
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              // backgroundColor: 'red',
              gap: '15px',
              // mb: '15px',
            }}>
            <SupplyAction
              value={maxAmountToSupply}
              usdValue={maxAmountToSupplyUSD}
              symbol={selectedAsset}
              disable={disableSupplyButton}
              onActionClicked={onSupplyClicked}
            />
            <BorrowAction
              value={maxAmountToBorrow}
              usdValue={maxAmountToBorrowUSD}
              symbol={selectedAsset}
              disable={disableBorrowButton}
              onActionClicked={() => openBorrow(reserve.underlyingAsset)}
            />
          </Box>
          {disableBorrowButton && (
            <Box sx={{mt: '15px'}}>
              {alerts}
            </Box>
          )}
        </>
      )}
    </PaperWrapper>
  );
};

const FrozenWarning = () => {
  return (
    <Warning sx={{ mb: 0 }} severity="error" icon={true}>
      <Trans>
        Since this asset is frozen, the only available actions are withdraw and repay which can be
        accessed from the <Link href={ROUTES.dashboard}>Dashboard</Link>
      </Trans>
    </Warning>
  );
};

const ActionsSkeleton = () => {
  const RowSkeleton = (
    <Stack>
      <Skeleton width={150} height={14} />
      <Stack
        sx={{ height: '44px' }}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box>
          <Skeleton width={100} height={14} sx={{ mt: 1, mb: 2 }} />
          <Skeleton width={75} height={12} />
        </Box>
        <Skeleton height={36} width={96} />
      </Stack>
    </Stack>
  );

  return (
    <PaperWrapper>
      <Stack direction="row" gap={3}>
        <Skeleton width={42} height={42} sx={{ borderRadius: '12px' }} />
        <Box>
          <Skeleton width={100} height={12} sx={{ mt: 1, mb: 2 }} />
          <Skeleton width={100} height={14} />
        </Box>
      </Stack>
      <Divider sx={{ my: 6 }} />
      <Box>
        <Stack gap={3}>
          {RowSkeleton}
          {RowSkeleton}
        </Stack>
      </Box>
    </PaperWrapper>
  );
};

const PaperWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <Paper 
      sx={{ 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        // height: '434px',
        width: { xs: '100%', md: '384px' },
        maxWidth: { xs: '380px', md: '384px' },
        mx: { xs: 'auto', lg: 0 },
        pt: 4, 
        pb: { xs: 4, xsm: '15px' }, 
        // px: { xs: 4, xsm: '16px 14px' },
        paddingLeft: '15px',
        paddingRight: '15px', 
        marginTop: {xs: '4px', md: '37px'},
        // marginLeft: '1px',
        // mt: '36px',
        border: '1px solid',
        borderRadius: '16px',
        borderColor: 'rgba(234, 234, 234, 1)',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        // backgroundColor: 'red',
        boxShadow: '0px 3px 5px 0px rgba(0, 0, 0, 0.04)',
        
      }}>
      
      <Typography
        sx={{
          position: 'relative',
          fontWeight: 600,
          fontSize: '20px',
          fontStyle: 'semibold',
          lineHeight: '1em',
          letterSpacing: '-0.02em',
          color: 'rgba(6, 21, 18, 1)',
          '&:before': {
            content: '""',
            position: 'absolute',
            left: -16,                    // into the Paper’s left padding
            top: '50%',
            transform: 'translateY(-50%)',
            width: 2,
            height: '1.2em',
            bgcolor: 'rgba(255,126,9,1)',
          },
          mb: '27px',
          ml: '1px',
        }}
      >
        <Trans>Your Wallet</Trans>
      </Typography>

      {children}
    </Paper>
  );
};

const ConnectWallet = ({ loading }: { loading: boolean }) => {
  return (
    <Paper sx={{ pt: 4, pb: { xs: 4, xsm: 6 }, px: { xs: 4, xsm: 6 } }}>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Typography variant="h3" sx={{ mb: { xs: 6, xsm: 10 } }}>
            <Trans>Your info</Trans>
          </Typography>
          <Typography sx={{ mb: 6 }} color="text.secondary">
            <Trans>Please connect a wallet to view your personal information here.</Trans>
          </Typography>
          <ConnectWalletButton />
        </>
      )}
    </Paper>
  );
};

interface ActionProps {
  value: string;
  usdValue: string;
  symbol: string;
  disable: boolean;
  onActionClicked: () => void;
}

const SupplyAction = ({ value, usdValue, symbol, disable, onActionClicked }: ActionProps) => {
  return (
    <Stack>
      <Box
        sx={{
          mb:'10px',
        }}>
        <AvailableTooltip text={
            <Typography 
              sx={{
                fontSize: '10px',
                fontWeight: 500,
                letterSpacing: '0.08em',
                lineHeight: '1em',
                textTransform: 'uppercase',
                color: 'rgba(130, 130, 130, 1)',
                // backgroundColor: 'red',
                
              }}>
              <Trans>Available to supply</Trans>
            </Typography>
          }
          capType={CapType.supplyCap}
          
        />
      </Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        // alignItems="center"
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '6px',  
            mt: '2px',
          }}>
          <ValueWithSymbol value={value} symbol={symbol} />
          <FormattedNumber
            value={usdValue}
            visibleDecimals={2}
            // variant="subheader2"
            color="rgba(130, 130, 130, 1)"
            symbolsColor="rgba(130, 130, 130, 1)"
            symbol="USD"
            size={'16px'}
            sx={{
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '1em',
              letterSpacing: '-0.02em',
            }}
          />
        </Box>
        <Button
          sx={{ 
            height: '30px',
            width: '69px',
            border: '1px solid',
            borderRadius: '70px',
            borderColor: 'rgba(255, 255, 255, 0.2)',
            padding: '8px 12px 8px 12px',
            backgroundColor: 'rgba(6, 21, 18, 1)',
          }}
          onClick={onActionClicked}
          disabled={disable}
          fullWidth={false}
          variant="contained"
          data-cy="supplyButton"
        >
          <Typography sx={{
              fontWeight: 500,
              fontSize: '14px',
              lineHeight: '1em',
              letterSpacing: '-0.02em',
              color: '#FFFFFF',
            }}>
            <Trans>Supply</Trans>
          </Typography>
        </Button>
      </Stack>
    </Stack>
  );
};

const BorrowAction = ({ value, usdValue, symbol, disable, onActionClicked }: ActionProps) => {
  return !disable ? (
    <Stack>
      <Box
        sx={{
          mb: '9px',
        }}>
        <AvailableTooltip
          variant="description"
          text={
            <Typography
              sx={{
                fontSize: '10px',
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'rgba(130, 130, 130, 1)',
              }}>
              <Trans>Available to borrow</Trans>
            </Typography>
          }
          capType={CapType.borrowCap}
        />
      </Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        // alignItems="center"
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '6px',  
            mt: '2px',
          }}>
          <ValueWithSymbol value={value} symbol={symbol} />
          <FormattedNumber
            value={usdValue}
            visibleDecimals={2}
            // variant="subheader2"
            color="rgba(130, 130, 130, 1)"
            symbolsColor="rgba(130, 130, 130, 1)"
            symbol="USD"
            size={'16px'}
            sx={{
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '1em',
              letterSpacing: '-0.02em',
            }}
          />
        </Box>
        <Button
          sx={{ 
            height: '30px', 
            width: '70px',
            border: '1px solid',
            borderRadius: '70px',
            borderColor: 'rgba(255, 255, 255, 0.2)',
            padding: '8px 12px 8px 12px',
            backgroundColor: 'rgba(6, 21, 18, 1)',
          }}
          onClick={onActionClicked}
          disabled={disable}
          fullWidth={false}
          variant="contained"
          data-cy="borrowButton"
        >
          <Typography sx={{
              fontWeight: 500,
              fontSize: '14px',
              lineHeight: '1em',
              letterSpacing: '-0.02em',
              color: '#FFFFFF',
            }}>
            <Trans>Borrow</Trans>
          </Typography>
        </Button>
      </Stack>
    </Stack>
  ) : null;
};

const WrappedBaseAssetSelector = ({
  assetSymbol,
  baseAssetSymbol,
  selectedAsset,
  setSelectedAsset,
}: {
  assetSymbol: string;
  baseAssetSymbol: string;
  selectedAsset: string;
  setSelectedAsset: (value: string) => void;
}) => {
  return (
    <StyledToggleButtonGroup
      // color="primary"
      value={selectedAsset}
      exclusive
      onChange={(_, value) => setSelectedAsset(value)}
      sx={{ width: '100%', height: '46px', p: '4px', mb: '24px' }}
    >
      <StyledToggleButton value={assetSymbol}>
        <Typography sx={{ mr: 1, fontWeight: 500, fontSize: '14px', letterSpacing: '-0.02em' }}>
          {assetSymbol}
        </Typography>
      </StyledToggleButton>

      <StyledToggleButton value={baseAssetSymbol}>
        <Typography sx={{ mr: 1, fontWeight: 500, fontSize: '14px', letterSpacing: '-0.02em' }}>
          {baseAssetSymbol}
        </Typography>
      </StyledToggleButton>
    </StyledToggleButtonGroup>
  );
};

interface ValueWithSymbolProps {
  value: string;
  symbol: string;
  children?: ReactNode;
}

const ValueWithSymbol = ({ value, symbol, children }: ValueWithSymbolProps) => {
  return (
    <Stack direction="row" alignItems="center" gap={1.4}>
      <FormattedNumber value={value} visibleDecimals={2}
        sx={{
          fontWeight: 500,
          fontSize: '24px',
          letterSpacing: '-0.02em',
          lineHeight: '1em',
          color: 'rgba(6, 21, 18, 1)',
        }}/>
      <Typography
        sx={{
          fontWeight: 500,
          fontSize: '24px',
          letterSpacing: '-0.02em',
          lineHeight: '1em',
          color: 'rgba(130, 130, 130, 1)',
        }}>
        {symbol}
      </Typography>
      {children}
    </Stack>
  );
};

interface WalletBalanceProps {
  balance: string;
  symbol: string;
  marketTitle: string;
}
const WalletBalance = ({ balance, symbol, marketTitle }: WalletBalanceProps) => {
  const theme = useTheme();

  return (
    <Box 
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // alignItems: 'center',
        backgroundColor: 'rgba(242, 242, 242, 1)',
        // backgroundColor: 'red',
        border: '1px solid',
        borderColor: 'rgba(220, 220, 220, 1)',
        borderRadius: '8px',
        padding: '10px 6px 12px 14.5px',
        mb: '24px',
      }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          justifyContent: 'space-around',
          // justifyContent: 'space-between',
          // backgroundColor: 'red'
        }}>
        <Typography 
          sx={{
            fontWeight: 500,
            fontSize: '10px',
            lineHeight: '1em',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'rgba(130, 130, 130, 1)',
          }}>
          Wallet balance
        </Typography>
        <Box
          sx={{
            display:'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: '8px',
            // backgroundColor: 'red'
          }}>
          <TokenIcon symbol={symbol} fontSize="large" 
            sx={{
              height: '24px',
              width: '24px',
            }} />
          <ValueWithSymbol value={balance} symbol={symbol}>
            <Box sx={{ ml: 2 }}>
              <BuyWithFiat cryptoSymbol={symbol} networkMarketName={marketTitle} />
            </Box>
          </ValueWithSymbol>
        </Box>
      </Box>
      <img src={uiConfig.actionsWallet} alt="actionsWallet icon" height={56} />
    </Box>
  );
};
