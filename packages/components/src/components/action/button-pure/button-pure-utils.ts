import { getTagName, hasVisibleIcon } from '../../../utils';
import { LinkButtonPureIconName } from '../../../types';

export const warnIfIconIsNoneAndIsLoading = (
  host: HTMLElement,
  iconName: LinkButtonPureIconName,
  loading: boolean
): void => {
  if (!hasVisibleIcon(iconName) && loading) {
    console.warn(
      `The combination of properties "icon='${iconName}'" and loading='${loading} within ${getTagName(
        host
      )} is not allowed.`
    );
  }
};
