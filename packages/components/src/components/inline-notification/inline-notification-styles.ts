import { borderWidthBase, getMediaQueryMax, headingSmallStyle, textSmallStyle } from '@porsche-design-system/emotion';
import {
  addImportantToEachRule,
  dismissButtonJssStyle,
  hostHiddenStyles,
  preventFoucOfNestedElementsStyles,
} from '../../styles';
import { colorPrimary } from '../../styles/css-variables';
import { getTypographySlottedJssStyle } from '../../styles/typography-styles';
import { getCss, HEADING_TAGS } from '../../utils';
import {
  getNotificationContentJssStyle,
  getNotificationIconJssStyle,
  getNotificationRootJssStyle,
} from './inline-notification-styles-shared';
import type { InlineNotificationState } from './inline-notification-utils';

const mediaQueryMaxS = getMediaQueryMax('s');

const getTextJssStyle = {
  margin: 0,
  color: colorPrimary,
};

const getHeadingJssStyle = {
  ...headingSmallStyle,
  ...getTextJssStyle,
};

// CSS Variable defined in fontHyphenationStyle
/**
 * @css-variable {"name": "--p-hyphens", "description": "Sets the CSS `hyphens` property for text elements, controlling whether words can break and hyphenate automatically.", "defaultValue": "auto"}
 */

export const getComponentCss = (state: InlineNotificationState, hasAction: boolean, hasClose: boolean): string => {
  return getCss({
    '@global': {
      ':host': {
        display: 'grid',
        ...addImportantToEachRule({
          ...getNotificationRootJssStyle(state, hasAction, hasClose),
          ...hostHiddenStyles,
        }),
      },
      ...preventFoucOfNestedElementsStyles,
      [`::slotted(:is(${HEADING_TAGS.join()}))`]: addImportantToEachRule(getTypographySlottedJssStyle()),
      'slot[name="heading"]': getHeadingJssStyle,
    },
    heading: getHeadingJssStyle,
    description: {
      ...textSmallStyle,
      ...getTextJssStyle,
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
    close: dismissButtonJssStyle,
  });
};
