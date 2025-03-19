import * as fs from 'fs';
import path from 'path';
import { PropMeta, getComponentMeta } from '@porsche-design-system/component-meta';
import type { TagName } from '@porsche-design-system/shared';
import { kebabCase } from 'change-case';
import { globbySync } from 'globby';
import { afterAll, describe, expect, test } from 'vitest';

const getBreakpointCustomizableBooleanProps = (propsMeta: { [propName: string]: PropMeta }): string[] =>
  Object.keys(propsMeta).filter(
    (key) => propsMeta[key].type === 'boolean' && propsMeta[key].isBreakpointCustomizable === true
  );

const EXPECTED_COMPONENT_COUNT = 20; // Expected number of components that should define at least one BreakpointCustomizable<boolean> prop.
const EXPECTED_PROPERTY_COUNT = 26; // Expected number of BreakpointCustomizable<boolean> props across all components

describe('Boolean Shorthand Properties', () => {
  const componentsDir = path.resolve(__dirname, '../../../src/lib/components');
  const componentFilePaths = globbySync(`${componentsDir}/*Wrapper.vue`);

  let componentCount = 0;
  let propCount = 0;

  componentFilePaths.forEach((filePath) => {
    const tagName = ('p-' + kebabCase(path.basename(filePath).replace(/Wrapper\.vue$/, ''))) as TagName;
    const { propsMeta } = getComponentMeta(tagName);

    if (propsMeta) {
      const breakpointCustomizableBooleanProps = getBreakpointCustomizableBooleanProps(propsMeta);

      if (breakpointCustomizableBooleanProps.length) {
        test(`should enable shorthand usage for ${tagName} BreakpointCustomizable<boolean> props: [${breakpointCustomizableBooleanProps.join(', ')}]`, () => {
          const fileContent = fs.readFileSync(filePath, 'utf8');

          breakpointCustomizableBooleanProps.forEach((propName) => {
            const propertyRegex = new RegExp(`${propName}\\??: BreakpointCustomizable<boolean> \\| boolean;`);
            expect(fileContent).toMatch(propertyRegex);
          });
        });

        componentCount++;
        propCount += breakpointCustomizableBooleanProps.length;
      }
    }
  });

  afterAll(() => {
    expect(componentCount).toBe(EXPECTED_COMPONENT_COUNT);
    expect(propCount).toBe(EXPECTED_PROPERTY_COUNT);
  });
});
