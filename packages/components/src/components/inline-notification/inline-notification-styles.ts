import type { Theme } from '../../types';
import type { InlineNotificationState } from './inline-notification-utils';
import { getMediaQueryMax, headingSmallStyle, textSmallStyle } from '@porsche-design-system/utilities-v2';
import { getCss } from '../../utils';
import {
  addImportantToEachRule,
  getThemedColors,
  hostHiddenStyles,
  prefersColorSchemeDarkMediaQuery,
} from '../../styles';
import {
  getNotificationContentJssStyle,
  getNotificationIconJssStyle,
  getNotificationRootJssStyle,
} from './inline-notification-styles-shared';

const mediaQueryMaxS = getMediaQueryMax('s');

export const getComponentCss = (
  state: InlineNotificationState,
  hasAction: boolean,
  hasClose: boolean,
  theme: Theme
): string => {
  return getCss({
    '@global': {
      ':host': addImportantToEachRule({
        ...getNotificationRootJssStyle(state, hasAction, hasClose, theme),
        ...hostHiddenStyles,
      }),
      h5: headingSmallStyle,
      p: textSmallStyle,
      'h5,p': {
        margin: 0,
        color: getThemedColors(theme).primaryColor,
        ...prefersColorSchemeDarkMediaQuery(theme, {
          color: getThemedColors('dark').primaryColor,
        }),
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
