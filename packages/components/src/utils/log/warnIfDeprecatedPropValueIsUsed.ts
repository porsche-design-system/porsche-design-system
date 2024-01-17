import type { Class, FunctionPropertyNames } from '../../types';
import { getDeprecatedPropOrSlotWarningMessage } from './helper';
import { consoleWarn } from './logger';

export const warnIfDeprecatedPropValueIsUsed = <C extends Class<any>, DeprecatedT extends string, T extends string>(
  instance: InstanceType<C>,
  prop: keyof Omit<InstanceType<C>, 'host' | FunctionPropertyNames<InstanceType<C>>>,
  deprecationMap: Record<DeprecatedT, Exclude<T, DeprecatedT>>
): void => {
  const value = instance[prop];
  if (deprecationMap[value]) {
    const deprecatedPropWarningMessage = getDeprecatedPropOrSlotWarningMessage(
      instance.host as HTMLElement,
      `${prop as string}='${value}'`
    );
    consoleWarn(deprecatedPropWarningMessage, `Please use ${prop as string}='${deprecationMap[value]}' instead.`);
  }
};
