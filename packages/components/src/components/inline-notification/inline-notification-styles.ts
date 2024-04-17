import type { Theme } from '../../types';
import type { InlineNotificationState } from './inline-notification-utils';
import { getMediaQueryMax, headingSmallStyle, textSmallStyle } from '@porsche-design-system/utilities-v2';
import { getCss, HEADING_TAGS } from '../../utils';
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
import { getTypographySlottedJssStyle } from '../../styles/typography-styles';

const mediaQueryMaxS = getMediaQueryMax('s');
const getTextJssStyle = (theme: Theme): JssStyle => ({
  margin: 0,
  color: getThemedColors(theme).primaryColor,
  ...prefersColorSchemeDarkMediaQuery(theme, {
    color: getThemedColors('dark').primaryColor,
  }),
});

const getHeadingStyles = (theme: Theme): JssStyle => ({
  ...headingSmallStyle,
  ...getTextStyles(theme),
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
      [`::slotted(:is(${HEADING_TAGS.join()}))`]: addImportantToEachRule(getTypographySlottedJssStyle()),
      'slot[name="heading"]': getHeadingStyles(theme),
    },
    heading: getHeadingStyles(theme),
    description: {
      ...textSmallStyle,
      ...getTextStyles(theme),
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
