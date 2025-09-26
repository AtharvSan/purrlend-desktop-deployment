import { Box, Container } from '@mui/material';
import { ReactNode } from 'react';

interface ContentContainerProps {
  children: ReactNode;
}

export const ContentContainer = ({ children }: ContentContainerProps) => {
  return (
    <Box
      sx={{
        // backgroundColor: 'red',
        // mx: '50px',
      //   display: 'flex',
      //   flexDirection: 'column',
      //   flex: 1,
      // marginRight: '0%',
      // marginLeft: '0%',
      // padding: 2,
      //   mt: { xs: '-32px', lg: '-46px', xl: '-44px', xxl: '-48px' },
      }}
    >
      <Container>{children}</Container>
    </Box>
  );
};
