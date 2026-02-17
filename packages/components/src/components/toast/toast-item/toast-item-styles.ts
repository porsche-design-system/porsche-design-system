import { dropShadowHighStyle, textSmallStyle } from '@porsche-design-system/emotion';
import { addImportantToEachRule, dismissButtonJssStyle, preventFoucOfNestedElementsStyles } from '../../../styles';
import { colorPrimary } from '../../../styles/css-variables';
import { getCss } from '../../../utils';
import {
  getNotificationContentJssStyle,
  getNotificationIconJssStyle,
  getNotificationRootJssStyle,
} from '../../inline-notification/inline-notification-styles-shared';
import type { ToastState } from '../toast/toast-utils';

export const getComponentCss = (state: ToastState): string => {
  return getCss({
    '@global': {
      ':host': {
        display: 'grid',
        opacity: 0, // needed to prevent flickering on initial render
        ...addImportantToEachRule({
          maxWidth: 'inherit',
          boxSizing: 'border-box',
          margin: 0, // ua popover reset
          inset: 'inherit', // ua popover reset
          border: '0', // ua popover reset
          outline: '0', // ua popover reset
          overflow: 'visible', // ua popover reset
          width: 'auto', // ua popover reset
          height: 'auto', // ua popover reset
        }),
        ...getNotificationRootJssStyle(state, false, true),
        ...dropShadowHighStyle,
        '&::backdrop': {
          display: 'none',
        },
      },
      ...preventFoucOfNestedElementsStyles,
      p: {
        ...textSmallStyle,
        margin: 0,
        color: colorPrimary,
        ...getNotificationContentJssStyle(),
      },
    },
    icon: getNotificationIconJssStyle(),
    close: dismissButtonJssStyle,
  });
};
