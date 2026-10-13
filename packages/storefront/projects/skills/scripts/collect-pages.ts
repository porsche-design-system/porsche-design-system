import fs from 'node:fs';
import path from 'node:path';
import { collectPages } from '@porsche-design-system/docs-components/markdown';
import { getStorefrontPages } from '../../../src/utils/markdownPages';
import { type CollectedPages, PAGES_FILE } from './pages-file';

/**
 * Renders the Storefront pages migrated to `@porsche-design-system/docs-components` and writes them, with every route of
 * the Storefront, to `PAGES_FILE` for `build-skills.ts`. It runs in a process of its own, set up for the renderer
 * (`--conditions=markdown --import …/register`), so that the component docs, which `build-skills.ts` still loads with
 * `skill-mdx-loader.cjs`, never meet the renderer's MDX hook.
 */

const main = async (): Promise<void> => {
  const { routes, markdownPages } = getStorefrontPages();
  const collected: CollectedPages = { routes, pages: await collectPages(markdownPages) };
  fs.mkdirSync(path.dirname(PAGES_FILE), { recursive: true });
  fs.writeFileSync(PAGES_FILE, JSON.stringify(collected));
  console.log(`Rendered ${collected.pages.length} page(s) → ${path.relative(process.cwd(), PAGES_FILE)}`);
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
