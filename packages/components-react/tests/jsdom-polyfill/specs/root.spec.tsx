import { INTERNAL_TAG_NAMES, TAG_NAMES, TagName } from '@porsche-design-system/shared';
import * as path from 'path';
import * as globby from 'globby';

it('should have one unit test per component', () => {
  const whitelistedComponents: TagName[] = [
    ...INTERNAL_TAG_NAMES,
    'p-flex-item',
    'p-grid-item',
    'p-stepper-horizontal-item',
    'p-tabs-item',
    'p-text-list-item',
    'p-table-head',
    'p-table-body',
    'p-table-head-row',
    'p-table-row',
    'p-table-head-cell',
    'p-table-cell',
  ];

  const currentFileName = path.normalize(__filename);
  const SRC_DIR = path.normalize(__dirname);
  const specFileNames = globby.sync(`${SRC_DIR}/**/*.spec.tsx`).filter((x) => x !== currentFileName);
  const componentsWithTests = specFileNames.map((x) => 'p-' + path.basename(x).replace('.spec.tsx', ''));
  const componentsWithMissingTests = TAG_NAMES.filter(
    (x) => !(whitelistedComponents.includes(x) || componentsWithTests.includes(x))
  );

  if (componentsWithMissingTests.length) {
    console.log(componentsWithMissingTests);
  }

  expect(componentsWithMissingTests.length).toEqual(0);
});
