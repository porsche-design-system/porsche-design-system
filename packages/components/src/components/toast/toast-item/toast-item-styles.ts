import type { Theme } from '../../../types';
import type { ToastState } from '../toast/toast-utils';
import { getCss } from '../../../utils';
import {
  getNotificationContentJssStyle,
  getNotificationIconJssStyle,
  getNotificationRootJssStyle,
} from '../../inline-notification/inline-notification-styles';
import { getBoxShadow } from '../../banner/banner-shared-styles';
import { textSmallStyle } from '@porsche-design-system/utilities-v2';
import { getThemedColors } from '../../../styles';

export const getComponentCss = (state: ToastState, theme: Theme): string => {
  const textColor = getThemedColors(theme).primaryColor;
  return getCss({
    '@global': {
      ':host': {
        ...getNotificationRootJssStyle(state, false, false, theme),
        ...getBoxShadow(),
      },
      p: {
        ...textSmallStyle,
        margin: 0,
        color: textColor,
      },
    },
    icon: getNotificationIconJssStyle(),
    content: getNotificationContentJssStyle(),
  });
};
