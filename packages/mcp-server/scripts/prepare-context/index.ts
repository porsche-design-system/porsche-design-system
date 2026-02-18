#!/usr/bin/env node

import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { execSync } from 'node:child_process';
import {
  sourceDir,
  outputDir,
  FRAMEWORKS,
  CHANGELOG_MAX_VERSIONS,
  MIN_PAGE_CONTENT_BYTES,
  SKIP_DIRECTORIES,
  componentDescriptions,
  rawExamplesContent,
  rawStoriesContent,
} from './config.js';
import { loadComponentMeta, processContent } from './transform.js';

// ──────────────────────────────────────────────────────────────────────────────
// Step 1 — Walk source and copy page.mdx files (skip configurator dirs)
// ──────────────────────────────────────────────────────────────────────────────

async function walkAndCopy(dir: string, relative: string = '') {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const newRelativePath = relative ? path.join(relative, entry.name) : entry.name;

    if (entry.isDirectory()) {
      if (SKIP_DIRECTORIES.includes(entry.name)) {
        console.log(`  skip: ${newRelativePath}/`);
        continue;
      }

      if (entry.name === 'configurator') {
        const pagePath = path.join(fullPath, 'page.mdx');
        try {
          const content = await fs.readFile(pagePath, 'utf-8');
          const componentName = path.basename(path.dirname(fullPath));
          componentDescriptions[componentName] = content;
          console.log(`  desc: ${componentName} (from configurator)`);
        } catch {
          // No page.mdx in configurator
        }
        continue;
      }

      await walkAndCopy(fullPath, newRelativePath);
    } else if (entry.isFile() && entry.name === 'page.mdx') {
      const targetDir = path.join(outputDir, relative);
      const targetFile = path.join(outputDir, newRelativePath);

      await fs.mkdir(targetDir, { recursive: true });
      await fs.copyFile(fullPath, targetFile);

      const fileContent = await fs.readFile(fullPath, 'utf-8');

      if (relative.endsWith('examples')) {
        rawExamplesContent[targetFile] = fileContent;
      }

      if (fileContent.includes('<ComponentStory')) {
        rawStoriesContent[targetFile] = fileContent;
      }

      console.log(`  copy: ${newRelativePath}`);
    }
  }
}

// ──────────────────────────────────────────────────────────────────────────────
// Step 2 — Process all copied MDX files (vanilla-js code examples)
// ──────────────────────────────────────────────────────────────────────────────

async function processAllFiles() {
  async function walk(dir: string) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await walk(fullPath);
      } else if (entry.isFile() && entry.name === 'page.mdx') {
        const rawContent = await fs.readFile(fullPath, 'utf-8');
        // Pass original MDX (from rawStoriesContent) so story imports can be parsed
        const originalMdx = rawStoriesContent[fullPath] ?? rawExamplesContent[fullPath];
        const processed = await processContent(rawContent, 'vanilla-js', originalMdx);
        await fs.writeFile(fullPath, processed, 'utf-8');
        console.log(`  parse: ${path.relative(outputDir, fullPath)}`);
      }
    }
  }

  await walk(outputDir);
}

// ──────────────────────────────────────────────────────────────────────────────
// Step 3 — Generate per-framework example pages
// ──────────────────────────────────────────────────────────────────────────────

async function generateFrameworkExamples() {
  for (const [filePath, rawContent] of Object.entries(rawExamplesContent)) {
    const examplesPageDir = path.dirname(filePath);
    const componentDir = path.dirname(examplesPageDir);

    for (const framework of FRAMEWORKS) {
      const fwDir = path.join(componentDir, `examples-${framework}`);
      const fwFile = path.join(fwDir, 'page.mdx');

      const processed = await processContent(rawContent, framework, rawContent);

      if (processed.replace(/^#.*$/gm, '').trim().length > MIN_PAGE_CONTENT_BYTES) {
        await fs.mkdir(fwDir, { recursive: true });
        await fs.writeFile(fwFile, processed, 'utf-8');
        console.log(`  gen: ${path.relative(outputDir, fwFile)}`);
      }
    }
  }
}

// ──────────────────────────────────────────────────────────────────────────────
// Step 4 — Generate per-framework interactive story pages
// ──────────────────────────────────────────────────────────────────────────────

async function generateFrameworkStories() {
  // Only process pages that have stories but are NOT already handled by examples
  // (pages in examples/ dirs are already covered by generateFrameworkExamples)
  for (const [filePath, rawContent] of Object.entries(rawStoriesContent)) {
    if (rawExamplesContent[filePath]) continue; // already handled by examples step

    const pageDir = path.dirname(filePath);
    const parentDir = path.dirname(pageDir);
    const dirName = path.basename(pageDir);

    for (const framework of FRAMEWORKS) {
      const fwDir = path.join(parentDir, `${dirName}-${framework}`);
      const fwFile = path.join(fwDir, 'page.mdx');

      const processed = await processContent(rawContent, framework, rawContent);

      if (processed.replace(/^#.*$/gm, '').trim().length > MIN_PAGE_CONTENT_BYTES) {
        await fs.mkdir(fwDir, { recursive: true });
        await fs.writeFile(fwFile, processed, 'utf-8');
        console.log(`  gen: ${path.relative(outputDir, fwFile)}`);
      }
    }
  }
}

// ──────────────────────────────────────────────────────────────────────────────
// Step 5 — Generate quick-reference pages for each component (was Step 4)
// ──────────────────────────────────────────────────────────────────────────────

async function generateQuickRefs() {
  const componentsDir = path.join(outputDir, 'components');
  let entries: Awaited<ReturnType<typeof fs.readdir>>;
  try {
    entries = await fs.readdir(componentsDir, { withFileTypes: true });
  } catch {
    return;
  }

  const componentMeta = await loadComponentMeta();

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;

    const componentName = entry.name;
    const componentDir = path.join(componentsDir, componentName);
    const tagName = `p-${componentName}`;
    const meta = componentMeta[tagName];

    let description = '';
    const rawConfigurator = componentDescriptions[componentName];
    if (rawConfigurator) {
      description = rawConfigurator
        .replace(/^import\s+.*$/gm, '')
        .replace(/export const metadata\s*=\s*{[\s\S]*?};?\s*/g, '')
        .replace(/<[A-Z][A-Za-z]*(?:\s+[^>]*)?\s*\/>/g, '')
        .replace(/<[A-Z][A-Za-z]*(?:\s+[^>]*)?>([\s\S]*?)<\/[A-Z][A-Za-z]*>/g, '')
        .replace(/^#\s+.*\n?/, '')
        .replace(/\n{3,}/g, '\n\n')
        .trim();
    }

    if (!description && !meta) continue;

    const lines: string[] = [];
    lines.push(`# ${componentName} — Quick Reference\n`);

    if (description) {
      lines.push(description);
      lines.push('');
    }

    if (meta?.propsMeta && Object.keys(meta.propsMeta).length > 0) {
      lines.push('## Key Properties\n');
      lines.push('| Property | Type | Default |');
      lines.push('|----------|------|---------|');

      for (const [propName, propMeta] of Object.entries(meta.propsMeta) as [string, any][]) {
        if (propMeta.isDeprecated) continue;
        const type = propMeta.type || 'unknown';
        const defaultValue = propMeta.defaultValue !== null ? `\`${JSON.stringify(propMeta.defaultValue)}\`` : '-';
        lines.push(`| \`${propName}\` | \`${type}\` | ${defaultValue} |`);
      }
      lines.push('');
    }

    if (meta?.eventsMeta && Object.keys(meta.eventsMeta).length > 0) {
      lines.push('## Events\n');
      lines.push('| Event | Type |');
      lines.push('|-------|------|');
      for (const [eventName, eventMeta] of Object.entries(meta.eventsMeta) as [string, any][]) {
        if ((eventMeta as any).isDeprecated) continue;
        const type = eventMeta.typeDetail || eventMeta.type || 'void';
        lines.push(`| \`${eventName}\` | \`${type}\` |`);
      }
      lines.push('');
    }

    const examplesFile = path.join(componentDir, 'examples', 'page.mdx');
    try {
      const examplesContent = await fs.readFile(examplesFile, 'utf-8');
      const firstCodeMatch = examplesContent.match(/```html\n([\s\S]*?)```/);
      if (firstCodeMatch) {
        lines.push('## Example\n');
        lines.push('```html');
        lines.push(firstCodeMatch[1].trim());
        lines.push('```');
        lines.push('');
      }
    } catch {
      // No examples file
    }

    const quickRefDir = path.join(componentDir, 'quick-ref');
    await fs.mkdir(quickRefDir, { recursive: true });
    await fs.writeFile(path.join(quickRefDir, 'page.mdx'), lines.join('\n'), 'utf-8');
    console.log(`  gen: components/${componentName}/quick-ref`);
  }
}

// ──────────────────────────────────────────────────────────────────────────────
// Step 6 — Truncate changelog to the last N versions
// ──────────────────────────────────────────────────────────────────────────────

async function truncateChangelog() {
  const changelogPath = path.join(outputDir, 'news', 'changelog', 'page.mdx');
  try {
    const content = await fs.readFile(changelogPath, 'utf-8');

    const versionRegex = /^## \[/gm;
    const indices: number[] = [];
    let match;
    while ((match = versionRegex.exec(content)) !== null) {
      indices.push(match.index);
    }

    if (indices.length > CHANGELOG_MAX_VERSIONS) {
      const cutoff = indices[CHANGELOG_MAX_VERSIONS];
      const truncated =
        content.slice(0, cutoff).trim() +
        `\n\n---\n\n> *Showing last ${CHANGELOG_MAX_VERSIONS} versions. See the full changelog in the repository.*\n`;
      await fs.writeFile(changelogPath, truncated, 'utf-8');
      console.log(`  changelog: kept ${CHANGELOG_MAX_VERSIONS} of ${indices.length} versions`);
    } else {
      console.log(`  changelog: ${indices.length} versions (no truncation needed)`);
    }
  } catch {
    console.log('  changelog: not found — skipping');
  }
}

// ──────────────────────────────────────────────────────────────────────────────
// Step 7 — Remove stub / near-empty pages
// ──────────────────────────────────────────────────────────────────────────────

async function removeStubPages() {
  let removed = 0;

  async function walk(dir: string) {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        await walk(fullPath);
        try {
          const remaining = await fs.readdir(fullPath);
          if (remaining.length === 0) {
            await fs.rmdir(fullPath);
          }
        } catch {
          // directory may already be gone
        }
      } else if (entry.isFile() && entry.name === 'page.mdx') {
        const content = await fs.readFile(fullPath, 'utf-8');

        const meaningful = content
          .replace(/^#.*$/gm, '')
          .replace(/[⚠️🧪🚫✅ℹ️]/gu, '')
          .replace(/Deprecated/g, '')
          .replace(/Experimental/g, '')
          .replace(/>\s*\*\*Interactive (?:Story|Configurator)\*\*.*$/gm, '')
          .trim();

        if (meaningful.length < MIN_PAGE_CONTENT_BYTES) {
          await fs.unlink(fullPath);
          removed++;
          console.log(`  drop: ${path.relative(outputDir, fullPath)} (${meaningful.length}b)`);
        }
      }
    }
  }

  await walk(outputDir);
  console.log(`  total removed: ${removed}`);
}

// ──────────────────────────────────────────────────────────────────────────────
// Step 8 — Generate snapshot metadata
// ──────────────────────────────────────────────────────────────────────────────

async function generateSnapshotMeta() {
  async function countFiles(dir: string): Promise<number> {
    let count = 0;
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        count += await countFiles(fullPath);
      } else if (entry.isFile() && entry.name === 'page.mdx') {
        count++;
      }
    }
    return count;
  }

  const documentCount = await countFiles(outputDir);

  const categoryEntries = await fs.readdir(outputDir, { withFileTypes: true });
  const categories = categoryEntries
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort();

  let sourceCommit = 'unknown';
  try {
    sourceCommit = execSync('git rev-parse --short HEAD', { encoding: 'utf-8' }).trim();
  } catch {
    // not in a git repo
  }

  const meta = {
    version: '1.0.0',
    generatedAt: new Date().toISOString(),
    sourceCommit,
    documentCount,
    categories,
  };

  await fs.writeFile(path.join(outputDir, 'snapshot-meta.json'), JSON.stringify(meta, null, 2), 'utf-8');
  console.log(`  snapshot: v${meta.version}, ${documentCount} docs, commit ${meta.sourceCommit}`);
}

// ──────────────────────────────────────────────────────────────────────────────
// Main — orchestrate all 8 steps
// ──────────────────────────────────────────────────────────────────────────────

async function prepareContextSnapshots() {
  console.log(`Preparing context snapshots from: ${sourceDir}\n`);

  try {
    await fs.rm(outputDir, { recursive: true, force: true });
  } catch {
    // May not exist yet
  }
  await fs.mkdir(outputDir, { recursive: true });

  console.log('Step 1/8: Copying source files...');
  await walkAndCopy(sourceDir, '');

  console.log('\nStep 2/8: Processing MDX → Markdown (vanilla-js)...');
  await processAllFiles();

  console.log('\nStep 3/8: Generating framework-specific examples...');
  await generateFrameworkExamples();

  console.log('\nStep 4/8: Generating framework-specific interactive stories...');
  await generateFrameworkStories();

  console.log('\nStep 5/8: Generating quick-reference pages...');
  await generateQuickRefs();

  console.log('\nStep 6/8: Truncating changelog...');
  await truncateChangelog();

  console.log('\nStep 7/8: Removing stub pages...');
  await removeStubPages();

  console.log('\nStep 8/8: Writing snapshot metadata...');
  await generateSnapshotMeta();

  console.log('\nDone! Context snapshots ready.');
}

prepareContextSnapshots();
