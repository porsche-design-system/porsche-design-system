import type { JssStyle } from 'jss';
import { getTransition } from '../common-styles';

export const getIconJssStyle = (isOpen: boolean): JssStyle => {
  return {
    marginInlineEnd: '-3px', // to temporarily align with multi-select and select-wrapper
    pointerEvents: 'none',
    transform: `rotate3d(0,0,1,${isOpen ? '180' : '0.0001'}deg)`, // needs to be a little more than 0 for correct direction in safari
    transition: getTransition('transform'),
  };
};
