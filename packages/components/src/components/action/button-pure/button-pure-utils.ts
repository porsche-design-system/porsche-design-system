import { getTagName, hasVisibleIcon } from '../../../utils';
import { LinkButtonPureIconName } from '../../../types';

export const warnIfIsLoadingAndIconIsNone = (
  host: HTMLElement,
  loading: boolean,
  iconName: LinkButtonPureIconName
): void => {
  if (loading && !hasVisibleIcon(iconName)) {
    console.warn(
      `The combination of properties "icon='${iconName}'" and loading='${loading} within ${getTagName(
        host
      )} is not supported.`
    );
  }
};

export const BUTTON_ARIA_ATTRIBUTES = ['aria-label', 'aria-expanded', 'aria-pressed', 'aria-haspopup'] as const;
export type ButtonAriaAttributes = typeof BUTTON_ARIA_ATTRIBUTES[number];
