import fs from 'node:fs';
import path from 'node:path';
import { getStorefrontPages } from '@/utils/markdownPages';

/**
 * The Markdown `build:markdown` wrote into the export, which `test:unit` builds first: a file for every page flagged in
 * the sitemap, and `llms.txt`. Each file is snapshotted as is, so a change to a page or a Markdown implementation shows
 * in the diff as agents read it.
 */

const distDir = path.resolve(__dirname, '../../../dist');

const markdownFiles = fs
  .readdirSync(distDir, { recursive: true, encoding: 'utf8' })
  .filter((file) => file.endsWith('.md') || file === 'llms.txt')
  .map((file) => file.split(path.sep).join('/'))
  .sort();

describe('Storefront Markdown', () => {
  it('has a file for every page flagged in the sitemap', () => {
    const { markdownPages } = getStorefrontPages();

    expect(markdownPages.length).toBeGreaterThan(0);
    expect(markdownFiles).toEqual(expect.arrayContaining(markdownPages.map(({ route }) => `${route}.md`)));
  });

  // `.snap`, so no formatter rewrites the Markdown as written.
  it.each(markdownFiles)('writes %s', async (file) => {
    await expect(fs.readFileSync(path.join(distDir, file), 'utf8')).toMatchFileSnapshot(
      `__snapshots__/markdown/${file}.snap`
    );
  });
});
