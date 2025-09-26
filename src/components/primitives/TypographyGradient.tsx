import { Typography, TypographyProps } from '@mui/material';

export const TypographyGradient = ({ ...rest }: TypographyProps) => {
  return (
    <Typography
      sx={(theme) => ({
        color: 'transparent',
        backgroundClip: 'text !important',
        webkitTextFillColor: 'transparent',
        background: 'rgba(255, 126, 9, 1)',
      })}
      {...rest}
    >
      {rest.children}
    </Typography>
  );
};
