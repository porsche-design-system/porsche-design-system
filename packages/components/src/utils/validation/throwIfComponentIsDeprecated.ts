import { getTagName } from '../../utils';

export const throwIfComponentIsDeprecated = (host: HTMLElement, message: string): void => {
  console.warn(`${getTagName(host)}: ${message}`);
};
