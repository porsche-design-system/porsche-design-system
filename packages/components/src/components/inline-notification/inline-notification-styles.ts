import type { JssStyle } from 'jss';
import type { Theme } from '../../types';
import type { InlineNotificationState } from './inline-notification-utils';
import {
  borderRadiusSmall,
  getMediaQueryMax,
  getMediaQueryMin,
  headingSmallStyle,
  spacingStaticMedium,
  spacingStaticSmall,
  spacingStaticXSmall,
  textSmallStyle,
} from '@porsche-design-system/utilities-v2';
import { getCss } from '../../utils';
import { addImportantToEachRule, getThemedColors } from '../../styles';

const mediaQueryMinS = getMediaQueryMin('s');
const mediaQueryMaxS = getMediaQueryMax('s');

export const getComponentCss = (
  state: InlineNotificationState,
  hasAction: boolean,
  hasClose: boolean,
  theme: Theme
): string => {
  return getCss({
    '@global': {
      ':host': addImportantToEachRule(getNotificationRootJssStyle(state, theme, hasAction, hasClose)),
      h5: headingSmallStyle,
      p: textSmallStyle,
      'h5,p': {
        margin: 0,
        color: getThemedColors(theme).primaryColor,
      },
    },
    icon: getNotificationIconJssStyle(),
    content: getNotificationContentJssStyle(),
    ...(hasAction && {
      action: {
        [mediaQueryMaxS]: {
          gridRowStart: 2,
        },
      },
    }),
  });
};

export const getNotificationRootJssStyle = (
  state: InlineNotificationState,
  theme: Theme,
  hasAction: boolean,
  hasClose: boolean
): JssStyle => {
  const themedColors = getThemedColors(theme);
  return {
    display: 'grid',
    // 2 columns for content and optional close button
    gridTemplateColumns: `minmax(auto, 1fr)${hasClose ? ' auto' : ''}`,
    gap: spacingStaticMedium,
    placeItems: 'start',
    padding: spacingStaticMedium,
    background: themedColors[`${state}SoftColor`],
    borderRadius: borderRadiusSmall,
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
