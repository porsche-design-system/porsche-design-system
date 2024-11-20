import type { EventEmitter } from '@stencil/core';

// utility type to return public properties of generic type that are not a function or EventEmitter
export type FunctionPropertyNames<T> = {
  // biome-ignore lint/complexity/noBannedTypes: to be refactored
  [K in keyof T]: T[K] extends Function | EventEmitter ? K : never;
}[keyof T];

// biome-ignore lint/complexity/noBannedTypes: to be refactored
export type Class<T> = Function & {
  new (...args: any[]): T; // eslint-disable-line @typescript-eslint/prefer-function-type
};
