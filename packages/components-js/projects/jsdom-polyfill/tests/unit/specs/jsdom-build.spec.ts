import * as path from 'path';
import * as fs from 'fs';

// TODO: irrelevant?
it('should have no stylesheet injection warning', async () => {
  const componentsJsEntry = require.resolve('@porsche-design-system/components-js');
  const filePath = path.resolve(componentsJsEntry, '../../jsdom-polyfill/index.cjs');
  const jsdomBuild = fs.readFileSync(filePath, 'utf8');

  expect(
    jsdomBuild.includes('The Porsche Design System had to inject our font-face.css file into your head.')
  ).toBeFalsy();
});
