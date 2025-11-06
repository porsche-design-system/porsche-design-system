import type { JssStyle } from 'jss';

export const getButtonLabelJssStyle = (cssVarScaling: string): JssStyle => ({
  display: 'flex',
  gap: `max(4px, ${cssVarScaling} * 12px)`,
  flexGrow: 1,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});
