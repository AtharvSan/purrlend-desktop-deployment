import '/public/emodeLeaf.svg';
import '/public/starWhite.svg';

import { CogIcon, LightningBoltIcon } from '@heroicons/react/solid';
import { Trans } from '@lingui/macro';
import { Box, Button, SvgIcon, Typography } from '@mui/material';
import Menu from '@mui/material/Menu';
import React, { useState } from 'react';
import { EmodeModalType } from 'src/components/transactions/Emode/EmodeModalContent';
import { useAppDataContext } from 'src/hooks/app-data-provider/useAppDataProvider';
import { useModalContext } from 'src/hooks/useModal';

import LightningBoltGradient from '/public/lightningBoltGradient.svg';
import { uiConfig } from '/src/uiConfig';

import { Link } from '../../components/primitives/Link';
import { Row } from '../../components/primitives/Row';
import { TypographyGradient } from '../../components/primitives/TypographyGradient';
import { getEmodeMessage } from '../../components/transactions/Emode/EmodeNaming';

interface DashboardEModeButtonProps {
  userEmodeCategoryId: number;
}

export const DashboardEModeButton = ({ userEmodeCategoryId }: DashboardEModeButtonProps) => {
  const { openEmode } = useModalContext();
  const { eModes: _eModes } = useAppDataContext();
  const iconButtonSize = 12;

  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const isEModeDisabled = userEmodeCategoryId === 0;

  const EModeLabelMessage = () => (
    <Trans>{getEmodeMessage(_eModes[userEmodeCategoryId].label)}</Trans>
  );

  const eModes = Object.keys(_eModes).length;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        mx: '14px',
        // backgroundColor: 'blue',
      }}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {isEModeDisabled ? (
        <Box
          sx={{
            display: 'flex',
            width: { xs: '100%', md: 'none' },
            justifyContent: 'space-between',
            alignItems: 'center',
            // backgroundColor: 'red',
            gap: '8px',
            // mt: '100px',
            py: '5px',
            paddingRight: '5px',
            paddingLeft: '8px',
            border: '1px solid',
            borderColor: 'rgba(220, 220, 220, 1)',
            borderRadius: '32px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: '1px',
              }}
            >
              <img src={uiConfig.emodeLeaf} alt="E-Mode" />
            </Box>
            <Typography
              mr={1}
              variant="description"
              color="text.secondary"
              sx={{
                fontWeight: 500,
                fontStyle: 'medium',
                fontSize: '14px',
                lineHeight: '100%',
                letterSpacing: '-2%',
                horizontalAlign: 'center',
                color: 'rgba(6, 21, 18, 1)',
              }}
            >
              <Trans>E-Mode</Trans>
            </Typography>
          </Box>

          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleClick(e);
            }}
            data-cy={`emode-open`}
            size="small"
            variant="outlined"
            sx={(theme) => ({
              border: '1px solid',
              borderColor: 'rgba(220, 220, 220, 1)',
              borderRadius: '32px',
              backgroundColor: 'rgba(255, 255, 255, 1)',
              fontWeight: 100,
              fontStyle: 'medium',
              fontSize: '10px',
              lineHeight: '100%',
              letterSpacing: '0.2em',
              paddingRight: '8px',
              paddingLeft: '8px',
              boxShadow: '0px 2px 6px 0px rgba(0, 0, 0, 0.1)',
            })}
          >
            <Box>
              {isEModeDisabled ? (
                // <Typography variant="buttonS" color="rgba(130, 130, 130, 1)">
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontSize: '10px',
                    lineHeight: '1em',
                    letterSpacing: '0.08em',
                    color: '#828282',
                    py: '6px',
                  }}
                >
                  <EModeLabelMessage />
                </Typography>
              ) : (
                <TypographyGradient variant="buttonS">
                  <EModeLabelMessage />
                  {/* <Typography>hi</Typography> */}
                </TypographyGradient>
              )}
            </Box>
          </Button>
        </Box>
      ) : (
        <Box
          sx={{
            display: 'inline-flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            gap: '8px',
            mt: { xs: '7px', md: '0px' },
            py: '5px',
            paddingRight: '5px',
            paddingLeft: '8px',
            border: '1px solid',
            borderColor: '#FF7E091A',
            borderRadius: '32px',
            backgroundColor: '#FFF2E6',
            // backgroundColor: 'red',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              gap: '8px',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: '1px',
              }}
            >
              <img src={uiConfig.emodeLeafOn} alt="E-Mode" />
            </Box>
            <Typography
              mr={1}
              variant="description"
              color="text.secondary"
              sx={{
                fontWeight: 500,
                fontStyle: 'medium',
                fontSize: '14px',
                lineHeight: '100%',
                letterSpacing: '-2%',
                horizontalAlign: 'center',
                color: 'rgba(6, 21, 18, 1)',
              }}
            >
              <Trans>E-Mode</Trans>
            </Typography>
          </Box>

          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleClick(e);
            }}
            data-cy={`emode-open`}
            size="small"
            variant="contained"
            sx={(theme) => ({
              // ml: 1,
              border: '1px solid',
              borderColor: '#FF7E091A',
              borderRadius: '32px',
              // backgroundColor: 'rgba(255, 255, 255, 1)',
              backgroundColor: '#FF7E09',
              color: '#FFFFFF',
              fontWeight: 500,
              fontStyle: 'medium',
              fontSize: '10px',
              lineHeight: '1em',
              letterSpacing: '0.08em',
              paddingRight: '8px',
              paddingLeft: '8px',
              boxShadow: '0px 2px 6px 0px rgba(0, 0, 0, 0.1)',
              '&:hover, &.Mui-focusVisible': {
                backgroundColor: '#FF7A00',
                boxShadow: '0px 4px 10px 0 rgba(255, 126, 9, 0.39)',
              },
            })}
          >
            <Typography variant="buttonS" color="#FFFFFF">
              <EModeLabelMessage />
            </Typography>
          </Button>
        </Box>
      )}
      {/* <Box
        sx={{ 
          display: 'inline-flex',
          justifyContent: 'space-between',
          alignItems: 'center', 
          gap: '8px',
          py: '5px',
          paddingRight:'5px',
          paddingLeft:'8px',
          border: '1px solid',
          borderColor: 'rgba(220, 220, 220, 1)',
          borderRadius: '32px',
          // backgroundColor: 'red'
        }}>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: '1px',
          // backgroundColor: 'red'
        }}>
            <img src={uiConfig.emodeLeaf} alt="E-Mode" />
        </Box>
        <Typography mr={1} variant="description" color="text.secondary" 
          sx={{
            fontWeight: 500,
            fontStyle: 'medium',
            fontSize: '14px',
            lineHeight: '100%',
            letterSpacing: '-2%',
            horizontalAlign: 'center',
            color: 'rgba(6, 21, 18, 1)',
          }}>
          <Trans>E-Mode</Trans>
        </Typography>

        <Button
          onClick={(e) => {
            e.stopPropagation();
            handleClick(e);
          }}
          data-cy={`emode-open`}
          size="small"
          variant="outlined"
          sx={(theme) => ({
            // ml: 1,
            border: '1px solid',
            borderColor: 'rgba(220, 220, 220, 1)',
            borderRadius: '32px',
            backgroundColor: 'rgba(255, 255, 255, 1)',
            fontWeight: 100,
            fontStyle: 'medium',
            fontSize: '10px',
            lineHeight: '100%',
            letterSpacing: '0.2em',
            paddingRight: '8px',
            paddingLeft: '8px',
            boxShadow: '0px 2px 6px 0px rgba(0, 0, 0, 0.1)',

            p: -0.5,
            '&:after': {
              content: "''",
              position: 'absolute',
              left: -1,
              right: -1,
              bottom: -1,
              top: -1,
              background: isEModeDisabled ? 'transparent' : theme.palette.gradients.aaveGradient,
              borderRadius: '4px',
            },
          })}
        >
          <Box
            sx={(theme) => ({
              display: 'inline-flex',
              alignItems: 'center',
              position: 'relative',
              zIndex: 1,
              bgcolor: isEModeDisabled
                ? open
                  ? theme.palette.background.disabled
                  : theme.palette.background.surface
                : theme.palette.background.paper,
              px: '4px',
              borderRadius: '4px',
            })}
          >
            <SvgIcon
              sx={{
                fontSize: iconButtonSize,
                mr: '4px',
                color: isEModeDisabled ? 'text.muted' : 'text.primary',
              }}
            >
              {isEModeDisabled ? <LightningBoltIcon /> : <LightningBoltGradient />}
            </SvgIcon>

            {isEModeDisabled ? (
              <Typography variant="buttonS" color="rgba(130, 130, 130, 1)">
                <EModeLabelMessage />
              </Typography>
            ) : (
              <TypographyGradient variant="buttonS">
                <EModeLabelMessage />
              </TypographyGradient>
            )}

            <SvgIcon
              sx={{
                fontSize: iconButtonSize,
                ml: '4px',
                color: 'primary.light',
              }}
            >
              <CogIcon />
            </SvgIcon>
          </Box>
        </Button>
      </Box> */}

      <Menu
        open={open}
        anchorEl={anchorEl}
        sx={{
          '.MuiMenu-paper': {
            maxWidth: '280px',
            borderRadius: '16px',
            border: '1px solid',
            borderColor: 'rgba(232, 232, 232, 1)',
            backgroundColor: 'rgba(255, 255, 255, 1)',
            boxShadow: '0px 14px 24px 0px rgba(0, 0, 0, 0.3)',
          },
        }}
        onClose={handleClose}
        keepMounted={true}
      >
        <Box
          sx={{
            px: 4,
            pt: 2,
            pb: 3,
          }}
        >
          <Typography
            variant="subheader1"
            mb={isEModeDisabled ? 1 : 3}
            sx={{
              // font-family: Geist;
              fontWeight: 600,
              fontStyle: 'SemiBold',
              fontSize: '18px',
              lineHeight: '100%',
              letterSpacing: '-2%',
              marginLeft: '1px',
              marginTop: '6px',
              marginBottom: '20px',
            }}
          >
            <Trans>Efficiency Mode</Trans>
          </Typography>

          {/* {!isEModeDisabled && (
            <Box>
              <Typography mb={1} variant="caption" color="text.secondary">
                <Trans>Asset category</Trans>
              </Typography>

              <Box
                sx={(theme) => ({
                  p: 2,
                  mb: 3,
                  borderRadius: '6px',
                  border: `1px solid ${theme.palette.divider}`,
                })}
              >
                <Row
                  caption={
                    <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
                      <SvgIcon
                        sx={{
                          fontSize: iconButtonSize,
                          mr: 1,
                        }}
                      >
                        <LightningBoltGradient />
                      </SvgIcon>
                      <Typography variant="subheader2" color="text.primary">
                        <EModeLabelMessage />
                      </Typography>
                    </Box>
                  }
                >
                  <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
                    <Box
                      sx={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        bgcolor: 'success.main',
                        boxShadow:
                          '0px 2px 1px rgba(0, 0, 0, 0.05), 0px 0px 1px rgba(0, 0, 0, 0.25)',
                        mr: '5px',
                      }}
                    />
                    <Typography variant="subheader2" color="success.main">
                      <Trans>Enabled</Trans>
                    </Typography>
                  </Box>
                </Row>
              </Box>
            </Box>
          )} */}

          <Typography
            variant="caption"
            color="text.secondary"
            mb={4}
            sx={{
              // fontFamily: Geist,
              fontWeight: 400,
              fontStyle: 'Regular',
              fontSize: '16px',
              lineHeight: '21px',
              color: 'rgba(67, 67, 67, 1)',
              marginLeft: '1px',
              marginBottom: '17px',
            }}
          >
            <Trans>
              E-mode increases your LTV for a selected category of assets.{' '}
              {/* <Link
                href="https://docs.aave.com/faq/aave-v3-features#high-efficiency-mode-e-mode"
                sx={{ textDecoration: 'underline' }}
                variant="caption"
                color="text.secondary"
              >
                Learn more
              </Link> */}
            </Trans>
          </Typography>

          {isEModeDisabled ? (
            <Button
              fullWidth
              variant={'purrButton'}
              onClick={() => {
                openEmode(EmodeModalType.ENABLE);
                handleClose();
              }}
              data-cy={'emode-enable'}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: '12px',
                height: '50px',
                borderRadius: '12px',
                paddingTop: '10px',
                paddingBottom: '10px',
                fontSize: '18px',
                fontWeight: 600,
                letterSpacing: '-0.02em',
                lineHeight: '1em',
              }}
            >
              <img src={uiConfig.starWhite} alt="E-Mode" />
              <Trans>Enable E-Mode</Trans>
            </Button>
          ) : (
            <>
              {/* {eModes > 2 && (
                <Button
                  fullWidth
                  sx={{ mb: '6px' }}
                  variant={'outlined'}
                  onClick={() => {
                    openEmode(EmodeModalType.SWITCH);
                    handleClose();
                  }}
                  data-cy={'emode-switch'}
                >
                  <Trans>Switch E-Mode category</Trans>
                </Button>
              )} */}
              <Button
                fullWidth
                variant={'purrButton'}
                onClick={() => {
                  openEmode(EmodeModalType.DISABLE);
                  handleClose();
                }}
                data-cy={'emode-disable'}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '12px',
                  height: '50px',
                  border: '1px solid',
                  borderRadius: '12px',
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                  fontSize: '18px',
                  fontWeight: 600,
                  letterSpacing: '-0.02em',
                  lineHeight: '1em',
                }}
              >
                <img src={uiConfig.starWhite} alt="E-Mode" />
                <Trans>Disable E-Mode</Trans>
              </Button>
            </>
          )}
        </Box>
      </Menu>
    </Box>
  );
};
