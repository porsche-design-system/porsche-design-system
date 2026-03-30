import { borderWidthBase, getMediaQueryMax, headingSmallStyle, textSmallStyle } from '@porsche-design-system/emotion';
import {
  addImportantToEachRule,
  dismissButtonJssStyle,
  hostHiddenStyles,
  preventFoucOfNestedElementsStyles,
} from '../../styles';
import { colorPrimary } from '../../styles/css-variables';
import { getCss } from '../../utils';
import {
  getNotificationContentJssStyle,
  getNotificationIconJssStyle,
  getNotificationRootJssStyle,
} from './inline-notification-styles-shared';
import { INLINE_NOTIFICATION_HEADING_TAGS, type InlineNotificationState } from './inline-notification-utils';

const mediaQueryMaxS = getMediaQueryMax('s');

const getTextJssStyle = {
  margin: 0,
  color: colorPrimary,
};

const getHeadingJssStyle = {
  ...headingSmallStyle,
  ...getTextJssStyle,
};

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
      [`::slotted(:is(${INLINE_NOTIFICATION_HEADING_TAGS.join()}))`]: addImportantToEachRule({
        all: 'unset',
      }),
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
