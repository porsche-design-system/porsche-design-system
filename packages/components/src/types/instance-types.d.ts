import type { EventEmitter } from '@stencil/core';

// utility type to return public properties of generic type that are not a function or EventEmitter
export type FunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function | EventEmitter ? K : never;
}[keyof T];

export type Class<T> = Function & {
  new (...args: any[]): T;
};
