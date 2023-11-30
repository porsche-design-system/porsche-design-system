import type { TagName } from '@porsche-design-system/shared';
import { INTERNAL_TAG_NAMES, TAG_NAMES } from '@porsche-design-system/shared';
import { componentsReady } from '@porsche-design-system/components-js';
import * as fs from 'fs';
import * as path from 'path';
import { globbySync } from 'globby';
import { tagNameMarkup, WHITELISTED_TAG_NAMES } from '../helper';

it('should have one unit test per component', () => {
  const whitelistedComponents: TagName[] = [...INTERNAL_TAG_NAMES, ...WHITELISTED_TAG_NAMES] as TagName[];

  const currentFileName = path.normalize(__filename);
  const srcDir = path.normalize(__dirname);
  const specFileNames = globbySync(`${srcDir}/**/*.spec.ts`).filter((fileName) => fileName !== currentFileName);

  const componentsTagNamesWithTests: [TagName, string][] = specFileNames
    .map<[TagName, string]>((filePath) => [
      ('p-' + path.basename(filePath).replace('.spec.ts', '')) as TagName,
      filePath,
    ])
    .filter(([tagName]) => TAG_NAMES.includes(tagName));

  const componentsWithTests = componentsTagNamesWithTests.map(([tagName, filePath]) => {
    const fileContent = fs.readFileSync(filePath, 'utf8');

    expect(fileContent).toContain(`getMarkup('${tagName}')`);
    // other getMarkup() calls aren't allowed
    expect(fileContent).not.toMatch(new RegExp(`getMarkup\\('(?!${tagName})`));
    return tagName;
  });

  const componentsWithMissingTests = TAG_NAMES.filter(
    (tagName) => !(whitelistedComponents.includes(tagName) || componentsWithTests.includes(tagName))
  );

  if (componentsWithMissingTests.length) {
    console.log('componentsWithMissingTests:', componentsWithMissingTests.join(', '));
  }

  expect(componentsWithMissingTests.length).toEqual(0);
});

it.each(Object.entries(tagNameMarkup))('should have no fetch call for %s', async (_, markup) => {
  const spy = jest.spyOn(global, 'fetch');

  document.body.innerHTML = markup;
  expect(await componentsReady()).toBeGreaterThan(0);

  // wait for potential requests
  await new Promise((resolve) => setTimeout(resolve, 5));

  if (spy.mock.calls.length > 0) {
    console.log(spy.mock.calls.flat());
  }

  expect(spy).not.toBeCalled();
});
