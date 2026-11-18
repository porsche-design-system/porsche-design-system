import { describe, expect, it } from 'vitest';
import { getModuleReferences } from './definitions-file';

describe('getModuleReferences()', () => {
  it('should return empty array for a standalone definitions file', () => {
    const content = `/// <reference lib="dom" />
type ComponentsManagerData = {
  [version: \`\${number}.\${number}.\${number}\${\`-rc.\${number}\` | ''}\`]: { prefixes: string[] };
};
declare global {
  interface Document {
    porscheDesignSystem: ComponentsManagerData;
  }
}
export type LoadOptions = { prefix?: string };
export declare const load: (opts?: LoadOptions) => void;
export {};`;

    expect(getModuleReferences(content)).toEqual([]);
  });

  it('should ignore import-like text in comments and string literals', () => {
    const content = `/**
 * @example
 * import { load } from '@porsche-design-system/components-js';
 */
// export * from './line-comment';
export type Message = "import('not-a-dependency')";
export type Template = \`from 'template-literal'\`;
export {};`;

    expect(getModuleReferences(content)).toEqual([]);
  });

  it('should return every referenced module', () => {
    const content = `/// <reference path="./globals.d.ts" />
/// <reference types="node" />
import { type ComponentsManagerData } from '@porsche-design-system/components-manager-core';
import './side-effect';
import fs = require('fs');
export * from "./re-export";
export type Lazy = import('./lazy').Lazy;
declare module 'augmented' {}`;

    expect(getModuleReferences(content)).toEqual([
      '@porsche-design-system/components-manager-core',
      './side-effect',
      'fs',
      './re-export',
      './lazy',
      'augmented',
      './globals.d.ts',
      'node',
    ]);
  });
});
