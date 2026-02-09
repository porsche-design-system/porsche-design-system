import * as fs from 'node:fs';
import * as path from 'node:path';
import { getComponentMeta } from '@porsche-design-system/component-meta';
import type { TagName } from '@porsche-design-system/shared';
import { INTERNAL_TAG_NAMES, TAG_NAMES } from '@porsche-design-system/shared';
import { pascalCase } from 'change-case-legacy';
import * as globby from 'globby-legacy';

const componentsDir = path.resolve(__dirname);
const sourceFilePaths = globby.sync(`${componentsDir}/**/*.tsx`).sort();

describe.each<TagName>(TAG_NAMES.filter((x) => !INTERNAL_TAG_NAMES.includes(x)))('%s', (tagName) => {
  const componentName = tagName.replace(/^p-/, '');
  const sourceFilePath = sourceFilePaths.find((item) => item.endsWith(`/${componentName}.tsx`));
  const sourceFileContent = fs.readFileSync(sourceFilePath, 'utf8');

  const { propsMeta = {}, eventsMeta = {} } = getComponentMeta(tagName);
  const relevantProps = Object.keys(propsMeta);
  const eventNames = Object.keys(eventsMeta);

  if (relevantProps.length > 0) {
    describe('props', () => {
      it.each(relevantProps)('should have correct type for prop %s', (prop) => {
        const [, type] =
          sourceFileContent.match(
            new RegExp(
              `@Prop\\(.*?\\) public ${prop}\\??: (?:BreakpointCustomizable|SelectedAriaAttributes|SelectedAriaRole)?<?([a-zA-Z[\\]]+)>?`
            )
          ) || [];

        if (
          type === 'string' ||
          type === 'string[]' ||
          type === 'boolean' ||
          type === 'boolean[]' ||
          type === 'number' ||
          type === 'number[]'
        ) {
          expect(true).toBe(true);
        } else {
          const propSuffix = prop === 'aria' ? 'Attribute' : '';
          expect(type).toMatch(
            new RegExp(
              `^${pascalCase(`${componentName}-${prop === 'intl' ? 'Internationalization' : prop}${propSuffix}`)}$|SelectedAriaRole`
            )
          );
        }
      });
    });
  } else {
    describe.skip('props', () => {
      it('has no props', () => {});
    });
  }

  if (eventNames.length > 0) {
    describe('events', () => {
      it.each(eventNames)('should have correct type for event %s', (eventName) => {
        const [, type] =
          sourceFileContent.match(new RegExp(`@Event\\(.*?\\) public ${eventName}\\??: EventEmitter<([a-zA-Z]+)>`)) ||
          [];

        // Skip @deprecated events since naming pattern doesn't apply there
        if (['sortingChange'].includes(eventName) || type === 'void' || type === 'LinkTileProductLikeEventDetail') {
          expect(true).toBe(true);
        } else {
          expect(type).toMatch(new RegExp(`^${pascalCase(componentName)}${pascalCase(eventName)}EventDetail$`));
        }
      });
    });
  }
});
