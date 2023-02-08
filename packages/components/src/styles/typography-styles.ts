import type { JssStyle } from 'jss';
import type { TextAlign, TextColor, Theme } from '../types';
import type { HeadingAlign, HeadingColor } from '../components/heading/heading-utils';
import type { DisplayAlign, DisplayColor } from '../components/display/display-utils';
import { getThemedTypographyColor } from './text-icon-styles';

export const getTypographyRootJssStyle = (
  baseTextStyle: JssStyle,
  align: TextAlign | HeadingAlign | DisplayAlign,
  color: TextColor | HeadingColor | DisplayColor,
  ellipsis: boolean,
  theme: Theme
): JssStyle => {
  return {
    margin: 0,
    padding: 0,
    ...baseTextStyle,
    color: getThemedTypographyColor(theme, color),
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
  };
};

export const getTypographySlottedJssStyle = (): JssStyle => {
  return {
    margin: 'inherit',
    padding: 'inherit',
    fontFamily: 'inherit',
    fontWeight: 'inherit',
    fontSize: 'inherit',
    lineHeight: 'inherit',
    fontStyle: 'inherit',
    fontVariant: 'inherit',
    color: 'inherit',
    textAlign: 'inherit',
    overflowWrap: 'inherit',
    wordWrap: 'inherit',
    hyphens: 'inherit',
    whiteSpace: 'inherit',
    letterSpacing: 'inherit',
  };
};

export const getEllipsisJssStyle = (): JssStyle => {
  return {
    maxWidth: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  };
};
