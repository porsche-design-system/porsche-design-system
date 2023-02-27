import { getDeprecatedPropWarningMessage } from './helper';
import type { Class, FunctionPropertyNames } from '../../types/index';

// TODO: add missing unit test
export const warnIfDeprecatedPropValueIsUsed = <C extends Class<any>, DeprecatedT extends string, T extends string>(
  instance: InstanceType<C>,
  prop: keyof Omit<InstanceType<C>, 'host' | FunctionPropertyNames<InstanceType<C>>>,
  deprecationMap: Record<DeprecatedT, Exclude<T, DeprecatedT>>
): void => {
  const value = instance[prop];
  if (deprecationMap[value]) {
    const deprecatedPropWarningMessage = getDeprecatedPropWarningMessage(
      instance.host as HTMLElement,
      `${prop as string}="${value}"`
    );
    console.warn(`${deprecatedPropWarningMessage} Please use "${deprecationMap[value]}" instead.`);
  }
};
