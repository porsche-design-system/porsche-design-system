import { getTagName } from '../../utils';

export const warnIfComponentIsDeprecated = (host: HTMLElement, message: string): void => {
  console.warn(`${getTagName(host)}: ${message}`);
};
