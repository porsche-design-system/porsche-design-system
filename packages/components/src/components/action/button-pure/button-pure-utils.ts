import { getTagName, hasVisibleIcon } from '../../../utils';
import { LinkButtonPureIconName } from '../../../types';

export const throwIfIconIsNoneAndIsLoading = (
  host: HTMLElement,
  iconName: LinkButtonPureIconName,
  loading: boolean
): void => {
  if (!hasVisibleIcon(iconName) && loading) {
    throw new Error(
      `The combination of properties "icon='${iconName}'" and loading='${loading} within ${getTagName(
        host
      )} is not allowed.`
    );
  }
};
