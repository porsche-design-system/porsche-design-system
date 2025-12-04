import {
  borderRadiusMedium,
  frostedGlassStyle,
  getMediaQueryMax,
  getMediaQueryMin,
  spacingStaticMedium,
  spacingStaticSmall,
  spacingStaticXSmall,
} from '@porsche-design-system/styles';
import type { JssStyle } from 'jss';
import { colors } from '../../styles';
import type { InlineNotificationState } from './inline-notification-utils';

const mediaQueryMinS = getMediaQueryMin('s');
const mediaQueryMaxS = getMediaQueryMax('s');

const { infoFrostedColor, successFrostedColor, errorFrostedColor, warningFrostedColor } = colors;

const getBackgroundColor = (state: InlineNotificationState): string => {
  const colorMap: Record<InlineNotificationState, string> = {
    info: infoFrostedColor,
    warning: warningFrostedColor,
    success: successFrostedColor,
    error: errorFrostedColor,
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
    gap: spacingStaticMedium,
    placeItems: 'start',
    padding: spacingStaticMedium,
    ...frostedGlassStyle,
    background: getBackgroundColor(state),
    borderRadius: borderRadiusMedium,
    [mediaQueryMinS]: {
      // 4 columns are for icon, content, optional action button and optional close button
      gridTemplateColumns: `auto minmax(auto, 1fr)${hasAction ? ' auto' : ''}${hasClose ? ' auto' : ''}`,
    },
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
  gap: spacingStaticXSmall,
  maxWidth: '50rem',
  marginTop: '2px', // To be center aligned with close button
  [mediaQueryMinS]: {
    marginLeft: `-${spacingStaticSmall}`,
  },
});
