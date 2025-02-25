import { borderRadiusSmall, fontFamily, fontLineHeight, fontSizeTextSmall } from '@porsche-design-system/styles';
import type { JssStyle } from 'jss';

export const getButtonImageJssStyle: JssStyle = {
  font: `${fontSizeTextSmall} ${fontFamily}`, // needed for correct calculations based on ex-unit
  width: 'auto',
  height: fontLineHeight,
  borderRadius: borderRadiusSmall,
};
