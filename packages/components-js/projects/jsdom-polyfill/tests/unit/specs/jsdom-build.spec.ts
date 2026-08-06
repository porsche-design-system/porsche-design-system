import * as fs from 'fs';
import * as path from 'path';

const readJsdomBuild = (): string => {
  const componentsJsEntry = require.resolve('@porsche-design-system/components-js');
  const filePath = path.resolve(componentsJsEntry, '../../jsdom-polyfill/index.cjs');
  return fs.readFileSync(filePath, 'utf8');
};

// TODO: irrelevant?
it('should have no stylesheet injection warning', async () => {
  const jsdomBuild = readJsdomBuild();

  expect(
    jsdomBuild.includes('The Porsche Design System had to inject our font-face.css file into your head.')
  ).toBeFalsy();
});

// The `CSS` namespace has to be normalized before `@oddbird/popover-polyfill` applies its styles (it calls
// `CSS.escape`) and before the Stencil loader pulls in jss (which caches `CSS.escape` unbound). Rollup could
// in principle reorder these, so the guarantee is asserted against the built bundle rather than the source.
it('should normalize the CSS namespace before applying dependent polyfills', () => {
  const jsdomBuild = readJsdomBuild();

  const normalizeIndex = jsdomBuild.indexOf('normalizeCssNamespace();');
  const popoverIndex = jsdomBuild.indexOf('requirePopover();');
  const defineCustomElementsIndex = jsdomBuild.lastIndexOf('defineCustomElements();');

  expect(normalizeIndex).toBeGreaterThan(-1);
  expect(popoverIndex).toBeGreaterThan(-1);
  expect(defineCustomElementsIndex).toBeGreaterThan(-1);

  expect(normalizeIndex).toBeLessThan(popoverIndex);
  expect(normalizeIndex).toBeLessThan(defineCustomElementsIndex);
});
