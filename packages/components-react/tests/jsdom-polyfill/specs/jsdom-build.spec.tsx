import path from 'path';
import fs from 'fs';

it('should have no stylesheet injection warning', async () => {
  const componentsReactEntry = require.resolve('@porsche-design-system/components-react');
  const filePath = path.resolve(componentsReactEntry, '../jsdom-polyfill/index.js');
  const jsdomBuild = fs.readFileSync(filePath, 'utf8');

  expect(
    jsdomBuild.includes('The Porsche Design System had to inject our font-face.css file into your head.')
  ).toBeFalsy();
});
