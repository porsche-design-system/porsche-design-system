import * as fs from 'node:fs';
import * as path from 'node:path';
import * as globby from 'fast-glob';
import { expect, it } from 'vitest';

const componentsDir = path.resolve(__dirname);
const patchesDir = path.resolve(__dirname, '../../../../patches');

// The patched Stencil runtime never applies a script URL from `data-ssr-props` to a prop that ends up in the `href` of
// a link (see "SSR props patch" in docs/stencil-patch.md). It knows these props by name.
it('should have every prop that is rendered into an href in the SSR props patch of the Stencil runtime', () => {
  const hrefProps = new Set<string>();
  for (const sourceFilePath of globby.sync(`${componentsDir}/**/*.tsx`)) {
    for (const [, propName] of fs.readFileSync(sourceFilePath, 'utf8').matchAll(/\bhref(?:=\{|: )this\.(\w+)/g)) {
      hrefProps.add(propName);
    }
  }
  const [patchFilePath] = globby.sync(`${patchesDir}/@stencil+core+*.patch`);
  const patch = fs.readFileSync(patchFilePath, 'utf8');

  expect([...hrefProps].sort()).toEqual(['href', 'skipLinkTarget']);
  for (const propName of hrefProps) {
    expect(patch).toContain(`propName === "${propName}"`);
  }
});
