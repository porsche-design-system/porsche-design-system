import fs from 'node:fs';
import path from 'node:path';
import { getLoaderScript } from '@porsche-design-system/components-js/partials';
import type { StackblitzPayload } from '../plugins/payload.ts';
import { categories, payloadName } from '../plugins/projects.ts';
import { mediaPath } from '../src/_media.ts';
import { distDir, listFiles, listProjects, packageDir, siteDir, siteMediaDir } from './shared.ts';

/**
 * Asserts that `dist-site/` is what the storefront can serve and StackBlitz can open.
 *
 * Every page has to be one self-contained HTML file: its script and its stylesheet inline, nothing local referenced
 * but the media, and those only through `mediaPath`, which is the one prefix the storefront rewrites to its slug. A
 * relative URL or a root-absolute one outside `mediaPath` would resolve against the storefront and silently break
 * once deployed, which is what this check is for. Next to it, the StackBlitz payload has to carry the generated
 * project of the page exactly – the project the page was built from.
 *
 * Run by `npm run build`, after `scripts/buildSite.ts`, so a page that breaks one of these rules fails the build.
 */

/** What a page may reference besides its media: absolute https URLs (the PDS CDN, the payment logos), anchors. */
const allowedExternal = /^(https:\/\/|#|data:|mailto:|tel:)/;

/** Every URL in an attribute that loads or links something, quoted or not – the PDS partials emit unquoted ones. */
const getUrls = (html: string): string[] =>
  Array.from(
    html.matchAll(/\s(?:src|href|poster|srcset)=(?:"([^"]*)"|'([^']*)'|([^\s>"']+))/g),
    (match) => match[1] ?? match[2] ?? match[3]
  ).flatMap((value) =>
    value
      .split(/,\s+/)
      .map((candidate) => candidate.trim().split(/\s+/)[0])
      .filter(Boolean)
  );

const fail = (message: string): never => {
  throw new Error(`[examples] ${message}`);
};

const verify = (): void => {
  if (!fs.existsSync(siteDir)) {
    fail('"dist-site" is missing – run the build first');
  }

  const locations = listProjects();
  const usedMedia = new Set<string>();

  for (const location of locations) {
    const name = `${location.category}/${location.pageDir}`;
    const pageDir = path.join(siteDir, location.category, location.pageDir);
    const projectDir = path.join(distDir, location.category, location.pageDir);

    const siteFiles = fs.existsSync(pageDir) ? listFiles(pageDir) : [];
    if (siteFiles.join() !== ['index.html', payloadName].join()) {
      fail(`"${name}" has to build to index.html and ${payloadName} only, got: ${siteFiles.join(', ') || 'nothing'}`);
    }

    const html = fs.readFileSync(path.join(pageDir, 'index.html'), 'utf8');

    // What the generated config and the inline plugin are there for – without them the page stays invisible.
    for (const expected of ['data-pds-loader-script', '<style>']) {
      if (!html.includes(expected)) {
        fail(`"${name}" is missing ${expected}`);
      }
    }
    // Nothing on the way into the page – the build, the inline plugin – may touch the loader: it carries a CSP hash.
    if (!html.includes(getLoaderScript())) {
      fail(`"${name}" does not contain the loader partial byte for byte – its CSP hash would no longer match`);
    }
    if (/<script\b[^>]*\ssrc=/.test(html) || /<link\b[^>]*\srel="?stylesheet/.test(html)) {
      fail(`"${name}" still references a script or a stylesheet instead of inlining it`);
    }

    for (const url of getUrls(html)) {
      if (url.startsWith(mediaPath)) {
        const fileName = url.slice(mediaPath.length);
        if (!fs.existsSync(path.join(siteMediaDir, fileName))) {
          fail(`"${name}" references "${url}", which is not in public${mediaPath}`);
        }
        usedMedia.add(fileName);
      } else if (!allowedExternal.test(url)) {
        fail(
          `"${name}" references "${url}" – a page may only load its media through media(), or an absolute https URL`
        );
      }
    }

    const payload = JSON.parse(fs.readFileSync(path.join(pageDir, payloadName), 'utf8')) as StackblitzPayload;
    const projectFiles = listFiles(projectDir);
    if (Object.keys(payload.files).sort().join() !== projectFiles.join()) {
      fail(`the ${payloadName} of "${name}" does not carry the files of its project`);
    }
    for (const file of projectFiles) {
      if (payload.files[file] !== fs.readFileSync(path.join(projectDir, file), 'utf8')) {
        fail(`the ${payloadName} of "${name}" carries a different "${file}" than its project`);
      }
    }
  }

  // Nothing is emitted next to the pages but the media, and no media file is shipped that no page loads.
  const topLevel = fs.readdirSync(siteDir).sort();
  const expectedTopLevel = [...categories.map(({ category }) => category), path.basename(siteMediaDir)].sort();
  if (topLevel.join() !== expectedTopLevel.join()) {
    fail(`"dist-site" has to hold ${expectedTopLevel.join(', ')}, got: ${topLevel.join(', ')}`);
  }
  const unusedMedia = listFiles(siteMediaDir).filter((file) => !usedMedia.has(file));
  if (unusedMedia.length > 0) {
    fail(`no page loads ${unusedMedia.join(', ')} – remove it from public${mediaPath}`);
  }

  console.log(`✓ ${locations.length} page(s) verified → ${path.relative(packageDir, siteDir)}`);
};

verify();
