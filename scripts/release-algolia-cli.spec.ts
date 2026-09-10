import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

describe('indexing a separate release checkout', () => {
  let directory: string;

  beforeEach(() => {
    directory = mkdtempSync(join(tmpdir(), 'pds-release-index-'));
    mkdirSync(join(directory, 'src'));
    writeFileSync(
      join(directory, 'tsconfig.json'),
      JSON.stringify({ compilerOptions: { paths: { '@/*': ['./src/*'] } } })
    );
    writeFileSync(join(directory, 'src/metadata.ts'), 'export const pageName = "Tagged release page";');
    writeFileSync(
      join(directory, 'src/sitemap.tsx'),
      `import { pageName } from '@/metadata';
export const sitemap = {
  components: { name: 'Components', subPaths: { page: { name: pageName, path: '/release-page' } } }
};`
    );
  });

  afterEach(() => rmSync(directory, { recursive: true, force: true }));

  const index = () =>
    execFileSync(
      resolve('node_modules/.bin/tsx'),
      [
        '--tsconfig',
        join(directory, 'tsconfig.json'),
        resolve('packages/storefront/scripts/updateAlgoliaIndex.tsx'),
        directory,
      ],
      {
        env: { ...process.env, ALGOLIA_APP_ID: '', ALGOLIA_API_KEY: '', P_CURRENT_BRANCH: 'v4' },
        timeout: 10000,
        stdio: 'pipe',
      }
    );

  it('uses the release sitemap, its path aliases and its built pages with current uploader code', () => {
    mkdirSync(join(directory, 'dist/release-page'), { recursive: true });
    writeFileSync(
      join(directory, 'dist/release-page/index.html'),
      '<main id="main-content"><p>Release docs</p></main>'
    );
    // Reaching credential validation proves record generation used the separate checkout.
    expect(index).toThrow('Algolia credentials are required');
  });

  it('fails before uploading when a release page is missing', () => {
    expect(index).toThrow(`Error reading file at ${join(directory, 'dist/release-page/index.html')}`);
  });
});
