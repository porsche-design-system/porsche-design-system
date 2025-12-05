import fs from 'node:fs';
import { createRequire } from 'node:module';
import { describe, expect, test } from 'vitest';
import { CDN_BASE_URL_CN, CDN_BASE_URL_COM } from '../../../../../../cdn.config';

const requireNode = createRequire(import.meta.url);

// First path will be snapshot and compared against all other paths in the group
const groupsToCheck = [
  {
    name: '/',
    paths: [
      // TODO: How to test against '@porsche-design-system/components-js'?
      '@porsche-design-system/components-js/index.css',
      '@porsche-design-system/components-js/index',
    ],
  },
  {
    name: '/font-face',
    paths: ['@porsche-design-system/components-js/font-face.css', '@porsche-design-system/components-js/font-face'],
  },
  {
    name: '/normalize',
    paths: ['@porsche-design-system/components-js/normalize.css', '@porsche-design-system/components-js/normalize'],
  },
  {
    name: '/variables',
    paths: ['@porsche-design-system/components-js/variables.css', '@porsche-design-system/components-js/variables'],
  },
  {
    name: '/cn',
    paths: [
      '@porsche-design-system/components-js/cn',
      '@porsche-design-system/components-js/cn/index.css',
      '@porsche-design-system/components-js/cn/index',
    ],
  },
  {
    name: '/cn/font-face',
    paths: [
      '@porsche-design-system/components-js/cn/font-face.css',
      '@porsche-design-system/components-js/cn/font-face',
    ],
  },
];

describe('global styles package content', () => {
  for (const group of groupsToCheck) {
    test(`all paths in "${group.name}" should export the same content`, () => {
      const basePath = requireNode.resolve(group.paths[0]);
      const baseContent = fs.readFileSync(basePath, 'utf8');

      for (const path of group.paths.slice(1)) {
        const resolvedPath = requireNode.resolve(path);
        const content = fs.readFileSync(resolvedPath, 'utf8');
        expect(content).toBe(baseContent);
      }
    });

    test(`snapshot for "${group.name}"`, () => {
      const resolvedPath = requireNode.resolve(group.paths[0]);
      const content = fs.readFileSync(resolvedPath, 'utf8');
      expect(content).toMatchSnapshot();
    });
  }

  test('index files contain all individual parts', () => {
    const mainIndexPath = requireNode.resolve('@porsche-design-system/components-js/index.css');
    const mainIndexContent = fs.readFileSync(mainIndexPath, 'utf8');

    const cnIndexPath = requireNode.resolve('@porsche-design-system/components-js/cn/index.css');
    const cnIndexContent = fs.readFileSync(cnIndexPath, 'utf8');

    // Check / index
    [
      '@porsche-design-system/components-js/font-face.css',
      '@porsche-design-system/components-js/normalize.css',
      '@porsche-design-system/components-js/variables.css',
    ].forEach((path) => {
      const resolved = requireNode.resolve(path);
      const content = fs.readFileSync(resolved, 'utf8');
      expect(mainIndexContent).toContain(content);
      expect(mainIndexContent).toContain(CDN_BASE_URL_COM);
      expect(mainIndexContent).not.toContain(CDN_BASE_URL_CN);
    });

    // Check /cn index
    [
      '@porsche-design-system/components-js/cn/font-face.css',
      '@porsche-design-system/components-js/normalize.css',
      '@porsche-design-system/components-js/variables.css',
    ].forEach((path) => {
      const resolved = requireNode.resolve(path);
      const content = fs.readFileSync(resolved, 'utf8');
      expect(cnIndexContent).toContain(content);
      expect(cnIndexContent).toContain(CDN_BASE_URL_CN);
      expect(cnIndexContent).not.toContain(CDN_BASE_URL_COM);
    });
  });
});
