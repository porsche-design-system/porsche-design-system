import { borderWidthBase, getMediaQueryMax, headingSmallStyle, textSmallStyle } from '@porsche-design-system/styles';
import type { JssStyle } from 'jss';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  dismissButtonJssStyle,
  getThemedColors,
  hostHiddenStyles,
  prefersColorSchemeDarkMediaQuery,
  preventFoucOfNestedElementsStyles,
} from '../../styles';
import { getTypographySlottedJssStyle } from '../../styles/typography-styles';
import type { Theme } from '../../types';
import { getCss, HEADING_TAGS, isThemeDark } from '../../utils';
import {
  getNotificationContentJssStyle,
  getNotificationIconJssStyle,
  getNotificationRootJssStyle,
} from './inline-notification-styles-shared';
import type { InlineNotificationState } from './inline-notification-utils';

const mediaQueryMaxS = getMediaQueryMax('s');
const getTextJssStyle = (theme: Theme): JssStyle => ({
  margin: 0,
  color: getThemedColors(theme).primaryColor,
  ...prefersColorSchemeDarkMediaQuery(theme, {
    color: getThemedColors('dark').primaryColor,
  }),
});

const getHeadingJssStyle = (theme: Theme): JssStyle => ({
  ...headingSmallStyle,
  ...getTextJssStyle(theme),
});

// CSS Variable defined in fontHyphenationStyle
/**
 * @css-variable {"name": "--p-hyphens", "description": "Sets the CSS `hyphens` property for text elements, controlling whether words can break and hyphenate automatically.", "defaultValue": "auto"}
 */
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
      ...preventFoucOfNestedElementsStyles,
      [`::slotted(:is(${HEADING_TAGS.join()}))`]: addImportantToEachRule(getTypographySlottedJssStyle()),
      'slot[name="heading"]': getHeadingJssStyle(theme),
    },
    heading: getHeadingJssStyle(theme),
    description: {
      ...textSmallStyle,
      ...getTextJssStyle(theme),
    },
    icon: getNotificationIconJssStyle(),
    content: getNotificationContentJssStyle(),
    ...(hasAction && {
      action: {
        marginTop: borderWidthBase, // To visually align with close button
        [mediaQueryMaxS]: {
          gridRowStart: 2,
        },
      },
    }),
    close: {
      ...dismissButtonJssStyle,
      mixBlendMode: isThemeDark(theme) ? 'plus-lighter' : 'multiply',
      ...prefersColorSchemeDarkMediaQuery(theme, {
        mixBlendMode: 'plus-lighter',
      }),
    },
  });
};
