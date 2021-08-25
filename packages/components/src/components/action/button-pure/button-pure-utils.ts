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
