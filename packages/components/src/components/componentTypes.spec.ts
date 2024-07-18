import { INTERNAL_TAG_NAMES, TAG_NAMES } from '@porsche-design-system/shared';
import { getComponentMeta } from '@porsche-design-system/component-meta';
import type { TagName } from '@porsche-design-system/shared';
import * as fs from 'fs';
import * as path from 'path';
import * as globby from 'globby-legacy';
import { pascalCase } from 'change-case';

const componentsDir = path.resolve(__dirname);
const sourceFilePaths = globby.sync(`${componentsDir}/**/*.tsx`).sort();

describe.each<TagName>(TAG_NAMES.filter((x) => !INTERNAL_TAG_NAMES.includes(x)))('%s', (tagName) => {
  const componentName = tagName.replace(/^p-/, '');
  const sourceFilePath = sourceFilePaths.find((item) => item.endsWith(`/${componentName}.tsx`));
  const sourceFileContent = fs.readFileSync(sourceFilePath, 'utf8');

  const { propsMeta = {}, eventsMeta = {} } = getComponentMeta(tagName);
  const relevantProps = Object.keys(propsMeta);
  const eventNames = Object.keys(eventsMeta);

  if (relevantProps.length) {
    describe('props', () => {
      it.each(relevantProps)('should have correct type for prop %s', (prop) => {
        const [, type] =
          sourceFileContent.match(
            new RegExp(
              `@Prop\\(.*?\\) public ${prop}\\??: (?:BreakpointCustomizable|SelectedAriaAttributes)?<?([a-zA-Z[\\]]+)>?`
            )
          ) || [];

        if (prop === 'theme') {
          expect(type).toBe('Theme');
        } else if (
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
              `^${pascalCase(`${componentName}-${prop === 'intl' ? 'Internationalization' : prop}${propSuffix}`)}$`
            )
          );
        }
      });
    });
  }

  if (eventNames.length) {
    describe('events', () => {
      it.each(eventNames)('should have correct type for event %s', (eventName) => {
        const [, type] =
          sourceFileContent.match(new RegExp(`@Event\\(.*?\\) public ${eventName}\\??: EventEmitter<([a-zA-Z]+)>`)) ||
          [];

        // TODO: Refactor test/event names to allow events with custom types to be called other than update
        if (type === 'void' || type === 'LinkTileProductLikeEventDetail') {
          expect(true).toBe(true);
        } else {
          expect(type).toMatch(new RegExp(`^${pascalCase(`${componentName}UpdateEventDetail`)}$`));
        }
      });
    });
  }
});
