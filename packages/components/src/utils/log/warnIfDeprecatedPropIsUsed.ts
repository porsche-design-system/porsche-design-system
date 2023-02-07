import { getDeprecatedPropWarningMessage } from './helper';

// TODO: add missing unit test
export const warnIfDeprecatedPropIsUsed = (host: HTMLElement, prop: string): void => {
  const propValue = host[prop];
  if (propValue) {
    console.warn(getDeprecatedPropWarningMessage(prop, host));
  }
};
