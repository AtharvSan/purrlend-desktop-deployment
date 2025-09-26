// import { Box, BoxProps } from '@mui/material';
// import { ReactNode } from 'react';

// interface ListHeaderWrapperProps extends BoxProps {
//   px?: 4 | 6;
//   children: ReactNode;
// }

// export const ListHeaderWrapper = ({ px = 4, children, ...rest }: ListHeaderWrapperProps) => {
//   return (
//     <Box
//       {...rest}
//       sx={{
//         display: 'flex',
//         justifyContent: 'space-between',
//         // gap: '100px',
//         alignItems: 'flex-end',
//         pr: '36px',
//         pt: 4,
//         pb: 1,
//         position: 'sticky',
//         top: 0,
//         zIndex: 100,
//         ...rest.sx,
//       }}
//     >
//       {children}
//     </Box>
//   );
// };


import { Box, BoxProps } from '@mui/material';
import { ReactNode } from 'react';

interface ListHeaderWrapperProps extends BoxProps {
  px?: 4 | 6;
  children: ReactNode;
}

export const ListHeaderWrapper = ({ px = 6, children, ...rest }: ListHeaderWrapperProps) => {
  return (
    <Box
      {...rest}
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: 2,
        alignItems: 'flex-end',
        px,
        pr: '36px',
        py: 4,
        position: 'sticky',
        top: 0,
        zIndex: 120,
        backdropFilter: 'blur(4px)',
        bgcolor: (theme) => 'theme.palette.background.default',
        borderBottom: '1px solid',
        borderColor: (theme) => theme.palette.divider,
        ...rest.sx,
      }}
    >
      {children}
    </Box>
  );
};
