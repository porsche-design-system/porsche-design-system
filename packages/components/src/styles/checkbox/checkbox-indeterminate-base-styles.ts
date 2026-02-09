import type { JssStyle } from 'jss';
import { getInlineSVGBackgroundImage } from '../../utils/svg/getInlineSVGBackgroundImage';
import { colorPrimary } from '../css-variables';

const indeterminateIcon = getInlineSVGBackgroundImage(`<path d="m20,11v2H4v-2h16Z"/>`);

export const getCheckboxIndeterminateBaseStyles = (isLoading: boolean): JssStyle => {
  if (isLoading) {
    return {};
  }

  return {
    '&::before': {
      forcedColorAdjust: 'none',
      WebkitMask: `${indeterminateIcon} center/contain no-repeat`,
      mask: `${indeterminateIcon} center/contain no-repeat`,
      backgroundColor: colorPrimary,
    },
  };
};
