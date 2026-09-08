import { addImportantToEachRule, hostHiddenStyles, preventFoucOfNestedElementsStyles } from '../../styles';
import { getCss, mergeDeep } from '../../utils';
import { getFunctionalComponentNotificationBaseStyles } from '../common/notification-base/notification-base-styles';
import type { InlineNotificationState } from './inline-notification-utils';

export const getComponentCss = (
  state: InlineNotificationState,
  hasAction: boolean,
  hasDismissButton: boolean,
  hasHeadingOrHeadingSlot: boolean
): string => {
  return getCss(
    mergeDeep(
      {
        '@global': {
          ':host': {
            display: 'block',
            ...addImportantToEachRule({
              ...hostHiddenStyles,
            }),
          },
          ...preventFoucOfNestedElementsStyles,
        },
      },
      getFunctionalComponentNotificationBaseStyles(state, hasAction, hasDismissButton, hasHeadingOrHeadingSlot)
    )
  );
};
