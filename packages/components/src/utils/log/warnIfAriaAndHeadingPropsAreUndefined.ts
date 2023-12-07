import { SelectedAriaAttributes } from '../../types';
import { consoleWarn } from './logger';
import { getTagNameWithoutPrefix } from '../tag-name';

export const warnIfAriaAndHeadingPropsAreUndefined = (
  host: HTMLElement,
  hasHeading: boolean,
  aria: SelectedAriaAttributes<any>
): void => {
  if (!hasHeading && !aria) {
    consoleWarn(
      `heading or aria has to be set via property for component ${getTagNameWithoutPrefix(
        host
      )} in order to ensure accessibility.`
    );
  }
};
