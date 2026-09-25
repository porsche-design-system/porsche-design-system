import * as fs from 'node:fs';
import * as path from 'node:path';
import { examplesMediaPath, insertBasePath, rewriteCdnUrlsForDev } from '../src/utils/examples';
import { getBasePath } from '../src/utils/getBasePath';

/**
 * Copies the built examples into `public/examples/`, where `WebsiteViewer` frames them.
 *
 * The source is `packages/examples/dist-site/`: one self-contained `index.html` per example, its `stackblitz.json`
 * next to it, and the media once in `media/`. `public/examples/` is git-ignored and replaced as a whole on every run,
 * so a removed example does not linger.
 *
 * Two rewrites happen on the way:
 * - the storefront slug is inserted into every media path, for the pages and the StackBlitz payloads alike;
 * - in development, the CDN URLs of the pages are pointed at `serve-cdn`. Which one this is cannot be read from
 *   `NODE_ENV` here, because `prebuild` runs before Next.js sets it – so development builds say so through
 *   `NEXT_PUBLIC_PDS_ENV=development`, as the test builds already do and `npm run dev` does for its `prebuild`.
 */

const sourceDir = path.resolve(__dirname, '../../examples/dist-site');
const targetDir = path.resolve(__dirname, '../public/examples');

const listFiles = (dir: string): string[] =>
  fs
    .readdirSync(dir, { withFileTypes: true, recursive: true })
    .filter((entry) => entry.isFile())
    .map((entry) => path.join(entry.parentPath, entry.name));

const copyExamples = (): void => {
  if (!fs.existsSync(sourceDir)) {
    throw new Error(
      `[storefront] "${path.relative(process.cwd(), sourceDir)}" is missing – run \`npm run build:examples\` first, the storefront frames the examples from there`
    );
  }

  const basePath = getBasePath();
  const isDev = process.env.NEXT_PUBLIC_PDS_ENV === 'development';

  fs.rmSync(targetDir, { recursive: true, force: true });
  fs.cpSync(sourceDir, targetDir, { recursive: true });

  const textFiles = listFiles(targetDir).filter((file) => file.endsWith('.html') || file.endsWith('.json'));
  let mediaReferences = 0;

  for (const file of textFiles) {
    const content = fs.readFileSync(file, 'utf8');
    mediaReferences += content.split(examplesMediaPath).length - 1;

    const withBasePath = insertBasePath(content, basePath);
    fs.writeFileSync(file, isDev && file.endsWith('.html') ? rewriteCdnUrlsForDev(withBasePath) : withBasePath);
  }

  // The examples own the media path; a page that no longer uses it would keep its media unprefixed and broken.
  if (mediaReferences === 0) {
    throw new Error(
      `[storefront] no copied example references "${examplesMediaPath}" – has the media path of packages/examples changed?`
    );
  }

  console.log(
    `Copied ${textFiles.filter((file) => file.endsWith('.html')).length} example(s) to public/examples` +
      `${basePath ? ` for /${basePath}/` : ''}${isDev ? ', CDN rewritten to http://localhost:3001' : ''}`
  );
};

copyExamples();
