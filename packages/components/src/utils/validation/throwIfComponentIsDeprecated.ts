import { getTagName } from '../../utils';

export const throwIfComponentIsDeprecated = (host: HTMLElement): void => {
  console.warn(
    `Component ${getTagName(
      host
    )} is deprecated and will be removed with next major release. Use "link" component with corresponding social icon instead.`
  );
};
