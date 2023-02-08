import { getDeprecatedPropWarningMessage } from './helper';

// TODO: add missing unit test
export const warnIfDeprecatedPropValueIsUsed = <T extends string>(
  host: HTMLElement,
  prop: string,
  deprecationMap: Partial<Record<T, T>>
): void => {
  const value = host[prop];
  if (deprecationMap[value]) {
    const deprecatedPropWarningMessage = getDeprecatedPropWarningMessage(`${prop}="${value}"`, host);
    console.warn(`${deprecatedPropWarningMessage} Please use "${deprecationMap[value]}" instead.`);
  }
};
