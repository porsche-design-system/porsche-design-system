import type { JssStyle } from 'jss';
import type { Theme } from '../../types';
import type { InlineNotificationState } from './inline-notification-utils';
import {
  borderRadiusSmall,
  getMediaQueryMax,
  getMediaQueryMin,
  spacingStaticMedium,
  spacingStaticSmall,
  spacingStaticXSmall,
} from '@porsche-design-system/utilities-v2';
import { getThemedColors, prefersColorSchemeDarkMediaQuery } from '../../styles';
import { isHighContrastMode } from '../../utils';

const mediaQueryMinS = getMediaQueryMin('s');
const mediaQueryMaxS = getMediaQueryMax('s');

const getBackgroundColor = (state: InlineNotificationState, theme: Theme): string => {
  const { infoSoftColor, successSoftColor, errorSoftColor, warningSoftColor } = getThemedColors(theme);
  const colorMap: Record<InlineNotificationState, string> = {
    neutral: infoSoftColor, // deprecated
    info: infoSoftColor,
    warning: warningSoftColor,
    success: successSoftColor,
    error: errorSoftColor,
  };
  return colorMap[state];
};

export const getNotificationRootJssStyle = (
  state: InlineNotificationState,
  hasAction: boolean,
  hasClose: boolean,
  theme: Theme
): JssStyle => {
  return {
    // display: 'grid', // NOTE: display property is moved into component styled to not apply !important keyword
    // 2 columns for content and optional close button
    gridTemplateColumns: `minmax(auto, 1fr)${hasClose ? ' auto' : ''}`,
    gap: spacingStaticMedium,
    placeItems: 'start',
    padding: spacingStaticMedium,
    background: getBackgroundColor(state, theme),
    ...prefersColorSchemeDarkMediaQuery(theme, {
      background: getBackgroundColor(state, 'dark'),
    }),
    borderRadius: borderRadiusSmall,
    ...(isHighContrastMode && {
      outline: '1px solid transparent',
    }),
    [mediaQueryMinS]: {
      // 4 columns are for icon, content, optional action button and optional close button
      gridTemplateColumns: `auto minmax(auto, 1fr)${hasAction ? ' auto' : ''}${hasClose ? ' auto' : ''}`,
    },
  };
};

export const getNotificationIconJssStyle = (): JssStyle => ({
  [mediaQueryMaxS]: {
    display: 'none',
  },
});

export const getNotificationContentJssStyle = (): JssStyle => ({
  display: 'grid',
  gap: spacingStaticXSmall,
  maxWidth: '50rem',
  [mediaQueryMinS]: {
    marginLeft: `-${spacingStaticSmall}`,
  },
});
