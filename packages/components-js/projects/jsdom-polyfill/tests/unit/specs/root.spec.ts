import { INTERNAL_TAG_NAMES, TAG_NAMES } from '@porsche-design-system/shared';
import type { TagName } from '@porsche-design-system/shared';
import * as fs from 'fs';
import * as path from 'path';
import * as globby from 'globby';
import { WHITELISTED_TAG_NAMES } from '../helper';

it('should have one unit test per component', () => {
  const whitelistedComponents: TagName[] = [...INTERNAL_TAG_NAMES, ...WHITELISTED_TAG_NAMES] as TagName[];

  const currentFileName = path.normalize(__filename);
  const srcDir = path.normalize(__dirname);
  const specFileNames = globby.sync(`${srcDir}/**/*.spec.ts`).filter((fileName) => fileName !== currentFileName);

  const componentsTagNamesWithTests: [TagName, string][] = specFileNames
    .map<[TagName, string]>((filePath) => [
      ('p-' + path.basename(filePath).replace('.spec.ts', '')) as TagName,
      filePath,
    ])
    .filter(([tagName]) => TAG_NAMES.includes(tagName));

  const componentsWithTests = componentsTagNamesWithTests.map(([tagName, filePath]) => {
    const fileContent = fs.readFileSync(filePath, 'utf8');

    expect(fileContent).toContain(`<${tagName}`);
    return tagName;
  });

  const componentsWithMissingTests = TAG_NAMES.filter(
    (tagName) => !(whitelistedComponents.includes(tagName) || componentsWithTests.includes(tagName))
  );

  if (componentsWithMissingTests.length) {
    console.log(componentsWithMissingTests);
  }

  expect(componentsWithMissingTests.length).toEqual(0);
});
