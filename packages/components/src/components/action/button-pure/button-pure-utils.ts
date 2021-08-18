import type { ExtendedIconName } from '../../../types';
import { getTagName } from '../../../utils';

// todo: unit test
export const throwIfIconNoneAndLoading = (host: HTMLElement, iconName: ExtendedIconName, loading: boolean): void => {
  if (iconName === 'none' && loading) {
    throw new Error(
      `The combination of properties "icon='${iconName}'" and loading='${loading} at component ${getTagName(
        host
      )} is not allowed.`
    );
  }
};
