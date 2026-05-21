import fs from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { INTERNAL_TAG_NAMES, TAG_NAMES } from '@porsche-design-system/shared';
import { pascalCase } from 'change-case';
import { describe, expect, test } from 'vitest';

const nodeRequire = createRequire(import.meta.url);

const toPropsTypeName = (tagName: string): string => `${pascalCase(tagName)}Props`;

const componentsAngularEntry = nodeRequire.resolve('@porsche-design-system/components-angular');
// Resolves to dist/angular-wrapper/fesm2022/porsche-design-system-components-angular.mjs -> walk up to dist/angular-wrapper
const angularWrapperDir = path.resolve(componentsAngularEntry, '../../');
const bundledTypesPath = path.join(angularWrapperDir, 'types/porsche-design-system-components-angular.d.ts');

const tagNames = TAG_NAMES.filter((t) => !INTERNAL_TAG_NAMES.includes(t));

describe('prop typings', () => {
  // Read once - all components share the single bundled .d.ts
  const bundledTypes = fs.readFileSync(bundledTypesPath, 'utf8');

  test.each(tagNames)('should declare and re-export props type for %s in bundled d.ts', (tagName) => {
    const propsTypeName = toPropsTypeName(tagName);

    // Type declaration (e.g. `type PButtonProps = { ... }`)
    expect(bundledTypes, `Expected declaration of ${propsTypeName} in bundled d.ts`).toMatch(
      new RegExp(`\\btype\\s+${propsTypeName}\\b`)
    );

    // Public re-export (e.g. `export type { ..., PButtonProps, ... }`)
    expect(bundledTypes, `Expected ${propsTypeName} to be re-exported from bundled d.ts`).toMatch(
      new RegExp(`export\\s+type\\s*\\{[\\s\\S]*\\b${propsTypeName}\\b[\\s\\S]*\\}`)
    );
  });
});
