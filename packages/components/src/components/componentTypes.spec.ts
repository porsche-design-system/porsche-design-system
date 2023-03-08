import { TAG_NAMES } from '@porsche-design-system/shared';
import { getComponentMeta } from '@porsche-design-system/component-meta';
import type { TagName } from '@porsche-design-system/shared';
import * as fs from 'fs';
import * as path from 'path';
import * as globby from 'globby';
import { pascalCase } from 'change-case';

const componentsDir = path.resolve(__dirname);
const sourceFilePaths = globby.sync(`${componentsDir}/**/*.tsx`).sort();

const ignoredProps = ['theme'];

describe.each<TagName>(TAG_NAMES)('%s', (tagName) => {
  const componentName = tagName.replace(/^p-/, '');
  const sourceFilePath = sourceFilePaths.find((item) => item.endsWith(`${componentName}.tsx`));
  const sourceFileContent = fs.readFileSync(sourceFilePath, 'utf8');

  const { props = {}, eventNames = [] } = getComponentMeta(tagName);

  if (Object.keys(props).length) {
    describe('props', () => {
      it.each(Object.keys(props).filter((prop) => !ignoredProps.includes(prop)))(
        'should have correct type for prop: %s',
        (prop) => {
          const [, type] =
            sourceFileContent.match(
              new RegExp(
                `@Prop\\(.*?\\) public ${prop}\\??: (?:BreakpointCustomizable|SelectedAriaAttributes)?<?([a-zA-Z]+)>?`
              )
            ) || [];

          if (type === 'string' || type === 'boolean' || type === 'number') {
            expect(true).toBe(true);
          } else {
            expect(type).toMatch(
              new RegExp(`^${pascalCase(`${componentName}-${prop}${prop === 'aria' ? 'Attribute' : ''}`)}$`)
            );
          }
        }
      );
    });
  }

  if (eventNames.length) {
    describe('events', () => {
      it.each(eventNames)('should have correct type for event: %s', (eventName) => {
        const [, type] =
          sourceFileContent.match(new RegExp(`@Event\\(.*?\\) public ${eventName}\\??: EventEmitter<([a-zA-Z]+)>`)) ||
          [];

        if (type === 'void') {
          expect(true).toBe(true);
        } else {
          expect(type).toMatch(new RegExp(`^${pascalCase(`${componentName}ChangeEvent`)}$`));
        }
      });
    });
  }
});
