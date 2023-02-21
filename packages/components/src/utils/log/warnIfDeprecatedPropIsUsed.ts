import { getDeprecatedPropWarningMessage } from './helper';

export const warnIfDeprecatedPropIsUsed = (host: HTMLElement, prop: string): void => {
  const propValue = host[prop];
  if (propValue) {
    console.warn(getDeprecatedPropWarningMessage(prop, host));
  }
};
