import type { JssStyle } from 'jss';
import { getInlineSVGBackgroundImage } from '../../utils/svg/getInlineSVGBackgroundImage';
import { colorPrimary } from '../css-variables';
import { cssVarCheckboxIconColor } from './checkbox-css-vars';

const checkedIcon = getInlineSVGBackgroundImage(
  `<path d="m20.22,7.47l-1.47-1.42-9.26,9.02-4.24-4.15-1.47,1.42,5.71,5.6,10.73-10.47Z"/>`
);

export const getCheckboxCheckedBaseStyles = (isLoading: boolean): JssStyle => {
  if (isLoading) {
    return {};
  }

  return {
    '&::before': {
      WebkitMask: `${checkedIcon} center/contain no-repeat`, // necessary for Sogou browser support :-)
      mask: `${checkedIcon} center/contain no-repeat`,
      backgroundColor: `var(${cssVarCheckboxIconColor}, ${colorPrimary})`,
    },
  };
};
