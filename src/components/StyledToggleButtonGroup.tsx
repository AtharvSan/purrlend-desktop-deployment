import { styled, ToggleButtonGroup, ToggleButtonGroupProps } from '@mui/material';

const CustomToggleGroup = styled(ToggleButtonGroup)<ToggleButtonGroupProps>({
  backgroundColor: '#E8E8E8',
  border: '1px solid #D7D7D7',
  borderRadius: '58px',
  padding: '4px',
}) as typeof ToggleButtonGroup;

export default function StyledToggleGroup(props: ToggleButtonGroupProps) {
  return <CustomToggleGroup {...props} />;
}
