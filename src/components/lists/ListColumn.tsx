// // components/lists/ListColumn.tsx
// import { Box, SxProps, Theme } from '@mui/material';
// import { ReactNode } from 'react';

// interface ListColumnProps {
//   children?: ReactNode;
//   maxWidth?: number | string;
//   minWidth?: number | string;
//   isRow?: boolean;
//   align?: 'left' | 'center' | 'right';
//   overFlow?: 'hidden' | 'visible';
//   /** NEW: fine-grained flex control */
//   grow?: number;      // defaults 0
//   shrink?: number;    // defaults 1
//   basis?: number | string; // e.g. 240 or '240px'
//   sx?: SxProps<Theme>;
// }

// export const ListColumn = ({
//   isRow,
//   children,
//   minWidth,
//   maxWidth,
//   align = 'center',
//   overFlow = 'visible',
//   grow = 0,
//   shrink = 1,
//   basis = 'auto',
//   sx,
// }: ListColumnProps) => {
//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         flexDirection: isRow ? 'row' : 'column',
//         alignItems: isRow
//           ? 'center'
//           : align === 'left'
//           ? 'flex-start'
//           : align === 'right'
//           ? 'flex-end'
//           : align,
//         justifyContent: isRow ? 'flex-start' : 'flex-end',
//         // KEY: stop default equal split; use provided flex props
//         flexGrow: grow,
//         flexShrink: shrink,
//         flexBasis: typeof basis === 'number' ? `${basis}px` : basis,
//         // minWidth: minWidth ?? 70,
//         maxWidth,
//         overflow: overFlow,
//         p: 1,
//         ...sx,
//       }}
//     >
//       {children}
//     </Box>
//   );
// };

import { Box, BoxProps } from '@mui/material';
import React from 'react';

type ListColumnProps = BoxProps & {
  isRow?: boolean;
  flex?: number | string;
  minWidth?: number | string;
  maxWidth?: number | string;
  gapVal?: number | string;
  align?: 'left' | 'center' | 'right';
};

export const ListColumn: React.FC<ListColumnProps> = ({
  children,
  isRow = false,
  flex = 1,
  minWidth,
  maxWidth,
  gapVal,
  align = 'left',
  sx,
  ...rest
}) => {
  return (
    <Box
      {...rest}
      sx={{
        display: 'flex',
        flexDirection: isRow ? 'row' : 'column',
        alignItems: isRow ? 'center' : align === 'center' ? 'center' : 'flex-start',
        justifyContent: 'flex-start',
        gap: gapVal,
        flex,
        minWidth,
        maxWidth,
        textAlign: align,
        overflow: 'hidden',
        ...sx,
        // backgroundColor: 'red',
      }}
    >
      {children}
    </Box>
  );
};
