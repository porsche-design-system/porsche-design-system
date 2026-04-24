import { addImportantToEachRule, preventFoucOfNestedElementsStyles } from '../../../styles';
import { getCss, mergeDeep } from '../../../utils';
import { getFunctionalComponentNotificationBaseStyles } from '../../common/notification-base/notification-base-styles';
import type { ToastState } from '../toast/toast-utils';

export const getComponentCss = (state: ToastState): string => {
  return getCss(
    mergeDeep(
      {
        '@global': {
          ':host': {
            display: 'block',
            ...addImportantToEachRule({
              maxWidth: 'inherit',
              boxSizing: 'border-box',
              margin: 0, // ua popover reset
              padding: 0, // ua popover reset
              inset: 'inherit', // ua popover reset
              border: '0', // ua popover reset
              outline: '0', // ua popover reset
              overflow: 'visible', // ua popover reset
              width: 'auto', // ua popover reset
              height: 'auto', // ua popover reset
              background: 'transparent', // ua popover reset
            }),
            '&::backdrop': {
              display: 'none',
            },
          },
          ...preventFoucOfNestedElementsStyles,
        },
      },
      getFunctionalComponentNotificationBaseStyles(state, false, true, false, '2xl')
    )
  );
};
