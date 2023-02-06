import { getDeprecatedPropWarningMessage } from './helper';

// TODO: add missing unit test
export const warnIfDeprecatedPropIsUsed = <T extends string>(host: HTMLElement, prop: string, propValue: T): void => {
  if (propValue) {
    console.warn(getDeprecatedPropWarningMessage(prop, host));
  }
};
