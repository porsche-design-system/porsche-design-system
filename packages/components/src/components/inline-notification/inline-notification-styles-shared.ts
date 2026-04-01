import { getMediaQueryMax, getMediaQueryMin } from '@porsche-design-system/emotion';
import type { JssStyle } from 'jss';
import { forcedColorsMediaQuery } from '../../styles';
import {
  blurFrosted,
  colorErrorFrosted,
  colorInfoFrosted,
  colorSuccessFrosted,
  colorWarningFrosted,
  legacyRadiusMedium,
  radiusXl,
  spacingStaticMd,
  spacingStaticSm,
  spacingStaticXs,
} from '../../styles/css-variables';
import type { InlineNotificationState } from './inline-notification-utils';

const mediaQueryMinS = getMediaQueryMin('s');
const mediaQueryMaxS = getMediaQueryMax('s');

const getBackgroundColor = (state: InlineNotificationState): string => {
  const colorMap: Record<InlineNotificationState, string> = {
    info: colorInfoFrosted,
    warning: colorWarningFrosted,
    success: colorSuccessFrosted,
    error: colorErrorFrosted,
  };
  return colorMap[state];
};

export const getNotificationRootJssStyle = (
  state: InlineNotificationState,
  hasAction: boolean,
  hasClose: boolean
): JssStyle => {
  return {
    // display: 'grid', // NOTE: display property is moved into component styled to not apply !important keyword
    // 2 columns for content and optional close button
    gridTemplateColumns: `minmax(auto, 1fr)${hasClose ? ' auto' : ''}`,
    gap: spacingStaticMd,
    placeItems: 'start',
    padding: spacingStaticMd,
    WebkitBackdropFilter: blurFrosted,
    backdropFilter: blurFrosted,
    background: getBackgroundColor(state),
    borderRadius: `var(${legacyRadiusMedium}, ${radiusXl})`,
    [mediaQueryMinS]: {
      // 4 columns are for icon, content, optional action button and optional close button
      gridTemplateColumns: `auto minmax(auto, 1fr)${hasAction ? ' auto' : ''}${hasClose ? ' auto' : ''}`,
    },
    ...forcedColorsMediaQuery({
      outline: '2px solid CanvasText',
      outlineOffset: '-2px',
    }),
  };
};

export const getNotificationIconJssStyle = (): JssStyle => ({
  marginTop: '2px', // To be center aligned with close button
  [mediaQueryMaxS]: {
    display: 'none',
  },
});

export const getNotificationContentJssStyle = (): JssStyle => ({
  display: 'grid',
  gap: spacingStaticXs,
  marginTop: '2px', // To be center aligned with close button
  [mediaQueryMinS]: {
    marginLeft: `calc(-1 * ${spacingStaticSm})`,
  },
});
