import { spacingStaticSmall } from '@porsche-design-system/styles';
import type { JssStyle } from 'jss';

// TODO: Use for select-wrapper & multi-select as well
export const getOptionListJssStyle = (
  cssVarScaling: string | 1 // "1" is needed for components not yet supporting compact mode
): JssStyle => {
  return {
    display: 'flex',
    flexDirection: 'column',
    gap: `max(2px, ${cssVarScaling} * ${spacingStaticSmall})`,
    overflow: 'hidden auto',
    scrollbarWidth: 'thin', // firefox
    scrollbarColor: 'auto', // firefox
  };
};
