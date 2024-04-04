import type { Theme } from '../../types';
import type { InlineNotificationState } from './inline-notification-utils';
import { getMediaQueryMax, headingSmallStyle, textSmallStyle } from '@porsche-design-system/utilities-v2';
import { getCss } from '../../utils';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  getThemedColors,
  hostHiddenStyles,
  prefersColorSchemeDarkMediaQuery,
} from '../../styles';
import {
  getNotificationContentJssStyle,
  getNotificationIconJssStyle,
  getNotificationRootJssStyle,
} from './inline-notification-styles-shared';
import { JssStyle } from 'jss';

const mediaQueryMaxS = getMediaQueryMax('s');
const textStyles = (theme: Theme): JssStyle => ({
  margin: 0,
  color: getThemedColors(theme).primaryColor,
  ...prefersColorSchemeDarkMediaQuery(theme, {
    color: getThemedColors('dark').primaryColor,
  }),
});

export const getComponentCss = (
  state: InlineNotificationState,
  hasAction: boolean,
  hasClose: boolean,
  theme: Theme
): string => {
  return getCss({
    '@global': {
      ':host': {
        display: 'grid',
        ...addImportantToEachRule({
          ...getNotificationRootJssStyle(state, hasAction, hasClose, theme),
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
      },
    },
    heading: {
      ...headingSmallStyle,
      ...textStyles(theme),
    },
    description: {
      ...textSmallStyle,
      ...textStyles(theme),
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
