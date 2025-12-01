import type { JssStyle } from 'jss';
import type { DisplayColor } from '../components/display/display-utils';
import type { HeadingColor } from '../components/heading/heading-utils';
import type { TypographyAlign, TypographyTextColor } from '../types';
import { getThemedTypographyColor } from './text-icon-styles';

export const getTypographyRootJssStyle = (
  baseTextStyle: JssStyle,
  responsiveStyle: JssStyle,
  align: TypographyAlign, // eslint-disable-line @typescript-eslint/no-duplicate-type-constituents
  color: TypographyTextColor | HeadingColor | DisplayColor, // eslint-disable-line @typescript-eslint/no-duplicate-type-constituents
  ellipsis: boolean
): JssStyle => {
  return {
    all: 'unset',
    display: 'block',
    ...baseTextStyle,
    color: getThemedTypographyColor(color),
    textAlign: align,
    letterSpacing: 'normal',
    listStyleType: 'none',
    whiteSpace: 'inherit',
    ...(ellipsis && {
      maxWidth: '100%',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    }),
    ...responsiveStyle,
  };
};

export const getTypographySlottedJssStyle = (): JssStyle => {
  return {
    all: 'unset',
  };
};
