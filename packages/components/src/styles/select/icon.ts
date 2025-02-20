import type { JssStyle } from 'jss';
import { isHighContrastMode } from '../../utils';
import { getTransition } from '../common-styles';

export const getIconJssStyle = (componentName: 'select' | 'multi-select', isOpen: boolean): JssStyle => {
  const cssVarIconFilter = `--p-${componentName}-icon-filter`;

  return {
    paddingBlock: '5px',
    marginInlineEnd: '-3px', // to temporarily align with multi-select and select-wrapper
    pointerEvents: 'none',
    transform: `rotate3d(0,0,1,${isOpen ? '180' : '0.0001'}deg)`, // needs to be a little more than 0 for correct direction in safari
    transition: getTransition('transform'),
    ...(!isHighContrastMode && {
      filter: `var(${cssVarIconFilter})`,
    }),
  };
};
