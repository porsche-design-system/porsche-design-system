import type { Theme } from '../../../types';
import type { ToastState } from '../toast/toast-utils';
import { getCss } from '../../../utils';
import {
  getCloseIconJssStyle,
  getNotificationContentJssStyle,
  getNotificationIconJssStyle,
  getNotificationRootJssStyle,
} from '../../inline-notification/inline-notification-styles';
import { getBoxShadow } from '../../banner/banner-styles';
import { textFluidSmall } from '@porsche-design-system/utilities-v2';
import { getThemedColors } from '../../../styles';

export const getComponentCss = (state: ToastState, theme: Theme): string => {
  const textColor = getThemedColors('light').primaryColor;
  return getCss({
    '@global': {
      ':host': {
        ...getNotificationRootJssStyle(state, theme),
        ...getBoxShadow(),
      },
      p: {
        ...textFluidSmall,
        margin: 0,
        color: textColor,
      },
    },
    icon: getNotificationIconJssStyle(state),
    content: getNotificationContentJssStyle(),
    close: getCloseIconJssStyle(),
  });
};
