import fs from 'node:fs';
import { createRequire } from 'node:module';
import { describe, expect, test } from 'vitest';

const requireNode = createRequire(import.meta.url);

const groupsToCheck = [
  {
    name: '/tailwindcss',
    paths: [
      '@porsche-design-system/components-angular/tailwindcss',
      '@porsche-design-system/components-angular/tailwindcss/index.css',
      '@porsche-design-system/components-angular/tailwindcss/index',
      '@porsche-design-system/components-js/tailwindcss',
      '@porsche-design-system/components-js/tailwindcss/index.css',
      '@porsche-design-system/components-js/tailwindcss/index',
    ],
  },
];

describe('tailwind package content', () => {
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
});
