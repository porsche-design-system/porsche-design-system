import { getTagName } from '../../../utils';
import { ExtendedIconName } from '../../../types';

export const throwIfIconNoneAndLoading = (host: HTMLElement, iconName: ExtendedIconName, loading: boolean): void => {
  if (iconName === 'none' && loading) {
    throw new Error(
      `The combination of properties "icon='${iconName}'" and loading='${loading} within ${getTagName(
        host
      )} is not allowed.`
    );
  }
};
