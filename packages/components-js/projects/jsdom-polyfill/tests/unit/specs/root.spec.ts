import { INTERNAL_TAG_NAMES, TAG_NAMES } from '@porsche-design-system/shared';
import type { TagName } from '@porsche-design-system/shared';
import * as fs from 'fs';
import * as path from 'path';
import * as globby from 'globby';

it('should have one unit test per component', () => {
  const whitelistedComponents: TagName[] = [
    ...INTERNAL_TAG_NAMES,
    'p-flex-item',
    'p-grid-item',
    'p-stepper-horizontal-item',
    'p-tabs-item',
    'p-segmented-control-item',
    'p-text-list-item',
    'p-table-head',
    'p-table-body',
    'p-table-head-row',
    'p-table-row',
    'p-table-head-cell',
    'p-table-cell',
  ];

  const currentFileName = path.normalize(__filename);
  const srcDir = path.normalize(__dirname);
  const specFileNames = globby.sync(`${srcDir}/**/*.spec.ts`).filter((x) => x !== currentFileName);

  const componentsWithTests = specFileNames
    .map<[TagName, string]>((filePath) => [
      ('p-' + path.basename(filePath).replace('.spec.ts', '')) as TagName,
      filePath,
    ])
    .filter(([tagName]) => TAG_NAMES.includes(tagName))
    .map(([tagName, filePath]) => {
      console.log(tagName);
      const fileContent = fs.readFileSync(filePath, 'utf8');

      expect(fileContent).toContain(`<${tagName}`);
      return tagName;
    });

  const componentsWithMissingTests = TAG_NAMES.filter(
    (x) => !(whitelistedComponents.includes(x) || componentsWithTests.includes(x))
  );

  if (componentsWithMissingTests.length) {
    console.log(componentsWithMissingTests);
  }

  expect(componentsWithMissingTests.length).toEqual(0);
});
