import { Box, Typography } from '@mui/material';

interface GraphLegendProps {
  labels: { text: string; color: string }[];
}

export function GraphLegend({
  labels = [
    { text: 'test', color: '#000' },
    { text: 'bla', color: '#ff0' },
  ],
}: GraphLegendProps) {
  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'end',
      mt: '15px'
    }}>
      {labels.map((label) => (
        <Box key={label.text} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'end',alignItems: 'center', mr: 6 }}>
          <Box
            sx={{
              width: 10,
              height: 10,
              backgroundColor: label.color,
              mr: '11px',
              borderRadius: '50%',
            }}
          />
          <Typography sx={{
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '1em',
            letterSpacing: '0em',
            color: '#061512',
            }}>
            {label.text}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
