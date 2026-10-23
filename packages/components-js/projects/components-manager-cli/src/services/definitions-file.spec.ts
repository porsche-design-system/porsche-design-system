import { describe, expect, it } from 'vitest';
import { getModuleReferences } from './definitions-file';

describe('getModuleReferences()', () => {
  it('should return empty array for a standalone definitions file', () => {
    const content = `declare global {
  interface Document {
    porscheDesignSystem: { cdn: { url: string } };
  }
}
export type LoadOptions = { prefix?: string };
export declare const load: (opts?: LoadOptions) => void;
export {};`;

    expect(getModuleReferences(content)).toEqual([]);
  });

  it('should return every referenced module', () => {
    const content = `import { type ComponentsManagerData } from '@porsche-design-system/components-manager-core';
import './side-effect';
export * from "./re-export";
export type Lazy = import('./lazy').Lazy;
/// <reference types="node" />
/// <reference path="./globals.d.ts" />`;

    expect(getModuleReferences(content)).toEqual([
      '@porsche-design-system/components-manager-core',
      './side-effect',
      './re-export',
      './lazy',
      'node',
      './globals.d.ts',
    ]);
  });
});
