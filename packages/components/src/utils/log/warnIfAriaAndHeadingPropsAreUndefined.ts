import type { SelectedAriaAttributes } from '../../types';
import { consoleWarn } from './logger';
import { getTagNameWithoutPrefix } from '../tag-name';

export const warnIfAriaAndHeadingPropsAreUndefined = (
  host: HTMLElement,
  hasHeading: boolean,
  aria: SelectedAriaAttributes<any>
): void => {
  if (!hasHeading && !aria) {
    consoleWarn(
      `heading prop (deprecated), aria prop or header slot has to be set for component ${getTagNameWithoutPrefix(
        host
      )} in order to ensure accessibility.`,
      host
    );
  }
};
