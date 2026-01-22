import {
  fontLineHeight,
  spacingStaticMedium,
  spacingStaticSmall,
  spacingStaticXSmall,
  textSmallStyle,
} from '@porsche-design-system/emotion';
import type { JssStyle } from 'jss';
import { colors } from './';

const { contrastMediumColor } = colors;

export const formElementLayeredGap = '9px'; // to have same distance vertically and horizontally for e.g. button/icon within form element
// TODO: basic button/icon padding can already be set within style function instead of on component style level
export const formButtonOrIconPadding = spacingStaticXSmall;
// TODO: if we'd use 12px instead, it wouldn't be necessary for textarea to have a custom vertical padding,
//  unfortunately line-height alignment breaks for a select element for some reasons then
// TODO: basic form element padding can already be set within style function instead of on component style level
export const formElementPaddingVertical = spacingStaticSmall;
// TODO: basic form element padding can already be set within style function instead of on component style level
export const formElementPaddingHorizontal = spacingStaticMedium;
export const getCalculatedFormElementPaddingHorizontal = (buttonOrIconAmount: 1 | 2): string => {
  // when applied, font-family and font-size needs to be set too for correct calculation of ex-unit ($fontLineHeight)
  return `calc(${formElementLayeredGap} + ${formElementPaddingHorizontal} / 2 + (${fontLineHeight} + ${formButtonOrIconPadding} * 2) * ${buttonOrIconAmount})`;
};

export const getUnitCounterJssStyle = (): JssStyle => {
  return {
    pointerEvents: 'none',
    maxWidth: '100%',
    boxSizing: 'border-box',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    font: textSmallStyle.font,
    color: contrastMediumColor,
  };
};
