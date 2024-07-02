import type { Theme } from '../../../types';
import type { ToastState } from '../toast/toast-utils';
import { getCss } from '../../../utils';
import {
  getNotificationContentJssStyle,
  getNotificationIconJssStyle,
  getNotificationRootJssStyle,
} from '../../inline-notification/inline-notification-styles-shared';
import { dropShadowHighStyle, textSmallStyle } from '@porsche-design-system/utilities-v2';
import { addImportantToEachRule, getThemedColors, prefersColorSchemeDarkMediaQuery } from '../../../styles';

export const getComponentCss = (state: ToastState, theme: Theme): string => {
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
        ...getNotificationRootJssStyle(state, false, true, theme),
        ...dropShadowHighStyle,
        '&::backdrop': {
          display: 'none',
        },
      },
      p: {
        ...textSmallStyle,
        margin: 0,
        color: getThemedColors(theme).primaryColor,
        ...prefersColorSchemeDarkMediaQuery(theme, {
          color: getThemedColors('dark').primaryColor,
        }),
        ...getNotificationContentJssStyle(),
      },
    },
    icon: getNotificationIconJssStyle(),
  });
};
