import fs from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { INTERNAL_TAG_NAMES, TAG_NAMES } from '@porsche-design-system/shared';
import { pascalCase } from 'change-case';
import { describe, expect, test } from 'vitest';

const nodeRequire = createRequire(import.meta.url);

const toPropsTypeName = (tagName: string): string => `${pascalCase(tagName)}Props`;

const componentsVueEntry = nodeRequire.resolve('@porsche-design-system/components-vue');
// Resolves to dist/vue-wrapper/cjs/public-api.cjs -> walk up to dist/vue-wrapper
const vueWrapperDir = path.resolve(componentsVueEntry, '../../');
const componentsDir = path.join(vueWrapperDir, 'esm/lib/components');

const tagNames = TAG_NAMES.filter((t) => !INTERNAL_TAG_NAMES.includes(t));

describe('prop typings', () => {
  test.each(tagNames)('should expose props type for %s in generated wrapper d.ts', (tagName) => {
    const propsTypeName = toPropsTypeName(tagName);
    const componentFileName = `${pascalCase(tagName.replace(/^p-/, ''))}Wrapper.vue.d.ts`;
    const componentDtsPath = path.join(componentsDir, componentFileName);

    expect(fs.existsSync(componentDtsPath), `Missing wrapper d.ts: ${componentDtsPath}`).toBe(true);

    const content = fs.readFileSync(componentDtsPath, 'utf8');
    expect(content, `Expected "export type ${propsTypeName}" in ${componentFileName}`).toMatch(
      new RegExp(`export\\s+type\\s+${propsTypeName}\\b`)
    );
  });
});
