import type { Class, FunctionPropertyNames } from '../../types';
import { getDeprecatedPropOrSlotWarningMessage } from './helper';
import { consoleWarn } from './logger';

export const warnIfDeprecatedPropIsUsed = <C extends Class<any>>(
  instance: InstanceType<C>,
  prop: keyof Omit<InstanceType<C>, 'host' | FunctionPropertyNames<InstanceType<C>>>,
  additionalText?: string
): void => {
  const propValue = instance[prop];
  if (propValue !== undefined && propValue !== null) {
    consoleWarn(
      getDeprecatedPropOrSlotWarningMessage(instance.host as HTMLElement, prop as string),
      additionalText || ''
    );
  }
};
