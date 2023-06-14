import { getTagNameWithoutPrefix } from '../tag-name';
import { consoleWarn } from './logger';

export const warnIfDeprecatedComponentIsUsed = (host: HTMLElement, message: string): void => {
  consoleWarn(
    `component ${getTagNameWithoutPrefix(host)} is deprecated and will be removed with next major release.`,
    message
  );
};
