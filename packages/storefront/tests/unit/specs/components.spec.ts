import fs from 'node:fs';
import path from 'node:path';
import { describe, it } from 'vitest';
import { COMPONENT_ROUTES } from '@/sitemap';

const componentsBasePath = path.resolve(__dirname, '../../../src/app/components');
const requiredSubpages = ['accessibility', 'api', 'configurator', 'examples', 'usage'];

// Exceptions: Following components don't have an example page
const exceptions: { component: string; subfolders: string[] }[] = [
  { component: 'canvas', subfolders: ['examples'] },
  { component: 'flag', subfolders: ['examples'] },
  { component: 'pagination', subfolders: ['examples'] },
  { component: 'popover', subfolders: ['examples'] },
  { component: 'sheet', subfolders: ['examples'] },
  { component: 'switch', subfolders: ['examples'] },
  { component: 'tag-dismissible', subfolders: ['examples'] },
  { component: 'text-list', subfolders: ['examples'] },
  { component: 'toast', subfolders: ['examples'] },
];

describe('Component folder structure', () => {
  it('should have accessibility, api, configurator, examples and usage page for each component', () => {
    const missing: string[] = [];

    COMPONENT_ROUTES.forEach(({ component }) => {
      const componentPath = path.join(componentsBasePath, component);

      if (!fs.existsSync(componentPath)) {
        missing.push(`Missing folder: ${componentPath}`);
        return;
      }

      requiredSubpages.forEach((subfolder) => {
        const isException = exceptions.some((e) => e.component === component && e.subfolders.includes(subfolder));
        if (isException) return;

        const mdxPath = path.join(componentPath, subfolder, 'page.mdx');
        if (!fs.existsSync(mdxPath)) {
          missing.push(`Missing file: ${mdxPath}`);
        }
      });
    });

    if (missing.length > 0) {
      throw new Error(`Component checks failed:\n${missing.join()}`);
    }
  });
});
