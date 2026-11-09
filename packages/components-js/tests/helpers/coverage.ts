import { getComponentMeta } from '@porsche-design-system/component-meta';
import { TAG_NAMES, type TagName } from '@porsche-design-system/shared';
import * as fs from 'fs';
import * as path from 'path';

export const components: string[] = (TAG_NAMES as unknown as TagName[])
  .filter((tagName) => {
    const { isChunked, requiredParent, isDeprecated } = getComponentMeta(tagName);
    return isChunked && !requiredParent && !isDeprecated;
  })
  .map((tagName) => tagName.replace(/^p-/, ''));

const pageNames = fs
  .readdirSync(path.resolve(__dirname, '../../src/pages'))
  .filter((fileName) => fileName.endsWith('.html'))
  .map((fileName) => path.basename(fileName, '.html'));

export const getPages = (component: string): string[] => {
  const pattern = new RegExp(`^${component}(-\\d+)?$`);
  return pageNames.filter((pageName) => pattern.test(pageName));
};

// Entries are names without `p-`, each with a reason comment or `// TODO #<n>: <reason>`.
export const e2eSpecAllowlist: string[] = [];
export const vrtPageAllowlist: string[] = [];
export const overviewAllowlist: string[] = [];
export const a11yTreeSnapshotAllowlist: string[] = [];
// The axe suite skips these pages and nothing flags an entry once its page scans clean.
export const axeAllowlist: string[] = [
  'input-text', // axe flags the counter of a disabled input, which WCAG exempts as text of an inactive control
];
