import type { Class, FunctionPropertyNames } from '../../types';
import { getDeprecatedPropWarningMessage } from './helper';

export const warnIfDeprecatedPropIsUsed = <C extends Class<any>>(
  instance: InstanceType<C>,
  prop: keyof Omit<InstanceType<C>, 'host' | FunctionPropertyNames<InstanceType<C>>>,
  additionalText?: string
): void => {
  const propValue = instance[prop];
  if (propValue !== undefined && propValue !== null) {
    console.warn(getDeprecatedPropWarningMessage(instance.host as HTMLElement, prop as string), additionalText);
  }
};
