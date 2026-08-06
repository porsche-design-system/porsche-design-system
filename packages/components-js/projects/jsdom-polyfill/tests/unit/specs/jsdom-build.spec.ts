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
// The markers below are emitted by Rollup's CommonJS wrappers — if one of them cannot be found, the bundler
// most likely renamed it (e.g. `requirePopover$1`) and the marker has to be adjusted, it does not necessarily
// mean the ordering broke.
const indexOfMarker = (jsdomBuild: string, marker: string, fromEnd = false): number => {
  const index = fromEnd ? jsdomBuild.lastIndexOf(marker) : jsdomBuild.indexOf(marker);
  expect(
    index,
    `marker '${marker}' not found in the built jsdom-polyfill bundle, was it renamed by Rollup?`
  ).toBeGreaterThan(-1);
  return index;
};

it('should normalize the CSS namespace before applying dependent polyfills', () => {
  const jsdomBuild = readJsdomBuild();

  const normalizeIndex = indexOfMarker(jsdomBuild, 'normalizeCssNamespace();');
  const popoverIndex = indexOfMarker(jsdomBuild, 'requirePopover();');
  const defineCustomElementsIndex = indexOfMarker(jsdomBuild, 'defineCustomElements();', true);

  expect(normalizeIndex).toBeLessThan(popoverIndex);
  expect(normalizeIndex).toBeLessThan(defineCustomElementsIndex);
});

// `@oddbird/popover-polyfill` needs a `CSS` namespace, which jsdom only provides since v30. Consumers on an
// older jsdom must get our actionable error instead of a cryptic `TypeError` from within the polyfill.
it('should guard the required jsdom version before applying the popover polyfill', () => {
  const jsdomBuild = readJsdomBuild();

  const guardIndex = indexOfMarker(jsdomBuild, 'requires jsdom v30 or higher');
  const popoverIndex = indexOfMarker(jsdomBuild, 'requirePopover();');

  expect(guardIndex).toBeLessThan(popoverIndex);
});
