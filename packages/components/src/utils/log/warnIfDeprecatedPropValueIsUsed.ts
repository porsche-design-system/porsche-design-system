import type { EventEmitter } from '@stencil/core';
import { getDeprecatedPropWarningMessage } from './helper';

// NOTE: the following utility types are duplicated in validateProps
// utility type to return public properties of generic type that are not a function or EventEmitter
type FunctionPropertyNames<T> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [K in keyof T]: T[K] extends Function | EventEmitter ? K : never;
}[keyof T];

// eslint-disable-next-line @typescript-eslint/ban-types
type Class<T> = Function & {
  new (...args: any[]): T; // eslint-disable-line @typescript-eslint/prefer-function-type
};

// TODO: add missing unit test
export const warnIfDeprecatedPropValueIsUsed = <C extends Class<any>, DeprecatedT extends string, T extends string>(
  instance: InstanceType<C>,
  prop: keyof Omit<InstanceType<C>, 'host' | FunctionPropertyNames<InstanceType<C>>>,
  deprecationMap: Record<DeprecatedT, Exclude<T, DeprecatedT>>
): void => {
  const value = instance[prop];
  if (deprecationMap[value]) {
    const deprecatedPropWarningMessage = getDeprecatedPropWarningMessage(`${prop as string}="${value}"`, host);
    console.warn(`${deprecatedPropWarningMessage} Please use "${deprecationMap[value]}" instead.`);
  }
};
