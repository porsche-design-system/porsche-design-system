import { fontFamily, fontLineHeight, fontSizeTextSmall } from '@porsche-design-system/emotion';
import type { JssStyle } from 'jss';
import { legacyRadiusSmall, radiusSm } from '../css-variables';

export const getButtonImageJssStyle: JssStyle = {
  font: `${fontSizeTextSmall} ${fontFamily}`, // needed for correct calculations based on ex-unit
  width: 'auto',
  height: fontLineHeight,
  borderRadius: `var(${legacyRadiusSmall}, ${radiusSm})`,
};
