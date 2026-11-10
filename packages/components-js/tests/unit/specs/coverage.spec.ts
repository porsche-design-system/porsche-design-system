import { testCoverage } from '@porsche-design-system/testing';
import * as fs from 'fs';
import * as path from 'path';
import {
  a11yTreeSnapshotAllowlist,
  components,
  e2eSpecAllowlist,
  getPages,
  overviewAllowlist,
  vrtPageAllowlist,
} from '../../helpers/coverage';

const root = path.resolve(__dirname, '../../..');
const overviewComponentsPath = 'src/pages/overview-components.html';
const overviewVuePath = 'packages/components-vue/src/pages/OverviewComponentsPage.vue';
const overviewComponentsSource = fs.readFileSync(path.resolve(root, overviewComponentsPath), 'utf8');
const overviewVueSource = fs.readFileSync(
  path.resolve(root, '../components-vue/src/pages/OverviewComponentsPage.vue'),
  'utf8'
);

const toPascalCase = (name: string): string =>
  name
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');

const isOnOverview = (source: string, tag: string, component: string): boolean => {
  if (new RegExp(`<${tag}[\\s/>]`).test(source)) {
    return true;
  }
  // The longest component name wins, so `/tag-dismissible-basic` counts for tag-dismissible and not for tag.
  return Array.from(source.matchAll(/<iframe\b[^>]*\ssrc="\/([^"?#]+)/g)).some(([, iframePath]) => {
    const owner = components
      .filter((name) => iframePath === name || iframePath.startsWith(`${name}-`))
      .sort((a, b) => b.length - a.length)[0];
    return owner === component;
  });
};

describe('overview matching', () => {
  it('misses a component whose tag only starts a longer one', () => {
    expect(isOnOverview('<p-tag-dismissible>Some Tag</p-tag-dismissible>', 'p-tag', 'tag')).toBe(false);
    expect(isOnOverview('<PSelectOption value="a">Option A</PSelectOption>', 'PSelect', 'select')).toBe(false);
  });
  it('counts an iframe for the longest component name its path starts with', () => {
    const iframe = '<iframe src="/tag-dismissible-basic?iframe=true" loading="eager"></iframe>';
    expect(isOnOverview(iframe, 'p-tag-dismissible', 'tag-dismissible')).toBe(true);
    expect(isOnOverview(iframe, 'p-tag', 'tag')).toBe(false);
    expect(isOnOverview('<iframe src="/tagline-basic?iframe=true"></iframe>', 'p-tag', 'tag')).toBe(false);
  });
  it('ignores a prefixed tag', () => {
    expect(isOnOverview('<my-prefix-p-tag>Some Tag</my-prefix-p-tag>', 'p-tag', 'tag')).toBe(false);
  });
});

describe('own e2e spec', () => {
  testCoverage({
    test,
    expect,
    items: components,
    getMissing: (name) => {
      const file = `tests/e2e/specs/${name}.e2e.ts`;
      return fs.existsSync(path.resolve(root, file)) ? undefined : file;
    },
    allowlist: e2eSpecAllowlist,
  });
});

describe('VRT page', () => {
  testCoverage({
    test,
    expect,
    items: components,
    getMissing: (name) => (getPages(name).length ? undefined : `src/pages/${name}.html`),
    allowlist: vrtPageAllowlist,
  });
});

describe('a11y-tree snapshot', () => {
  testCoverage({
    test,
    expect,
    items: components.flatMap(getPages),
    getMissing: (page) => {
      const file = `tests/a11y/specs/a11ytree/__snapshots__/p-${page}-0.aria.yml`;
      return fs.existsSync(path.resolve(root, file)) ? undefined : file;
    },
    allowlist: a11yTreeSnapshotAllowlist,
  });
});

describe('overview of components-js', () => {
  testCoverage({
    test,
    expect,
    items: components,
    getMissing: (name) =>
      isOnOverview(overviewComponentsSource, `p-${name}`, name)
        ? undefined
        : `<p-${name}> in ${overviewComponentsPath}`,
    allowlist: overviewAllowlist,
  });
});

describe('overview of Vue', () => {
  testCoverage({
    test,
    expect,
    items: components,
    getMissing: (name) =>
      isOnOverview(overviewVueSource, `P${toPascalCase(name)}`, name)
        ? undefined
        : `<P${toPascalCase(name)}> in ${overviewVuePath}`,
    allowlist: overviewAllowlist,
  });
});
