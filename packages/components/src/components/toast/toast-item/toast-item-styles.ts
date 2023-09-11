import type { Theme } from '../../../types';
import type { ToastState } from '../toast/toast-utils';
import { getCss } from '../../../utils';
import {
  getNotificationContentJssStyle,
  getNotificationIconJssStyle,
  getNotificationRootJssStyle,
} from '../../inline-notification/inline-notification-styles-shared';
import { dropShadowHighStyle, textSmallStyle } from '@porsche-design-system/utilities-v2';
import { getThemedColors, prefersColorSchemeDarkMediaQuery } from '../../../styles';

export const getComponentCss = (state: ToastState, theme: Theme): string => {
  return getCss({
    '@global': {
      ':host': {
        ...getNotificationRootJssStyle(state, false, true, theme),
        ...dropShadowHighStyle,
      },
      p: {
        ...textSmallStyle,
        margin: 0,
        color: getThemedColors(theme).primaryColor,
        ...prefersColorSchemeDarkMediaQuery(theme, {
          color: getThemedColors('dark').primaryColor,
        }),
      },
    },
    icon: getNotificationIconJssStyle(),
    content: getNotificationContentJssStyle(),
  });
};
