#!/usr/bin/env node

import { execSync } from 'node:child_process';
import type { Dirent } from 'node:fs';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import {
  type BedrockMetadataAttribute,
  CHANGELOG_MAX_VERSIONS,
  componentDescriptions,
  FRAMEWORKS,
  MIN_PAGE_CONTENT_BYTES,
  outputDir,
  rawExamplesContent,
  rawStoriesContent,
  SKIP_DIRECTORIES,
  sourceDir,
} from './config.js';
import { loadComponentMeta, processContent } from './transform.js';

// ──────────────────────────────────────────────────────────────────────────────
// Step 1 — Walk source and copy page.mdx files
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
        const introRelativePath = relative ? path.join(relative, 'introduction') : 'introduction';
        await walkAndCopy(fullPath, introRelativePath);
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
// Step 6 — Generate shared reference pages (icon names, flag names)
// ──────────────────────────────────────────────────────────────────────────────

async function generateSharedReferences() {
  const componentMeta = await loadComponentMeta();
  const sharedDir = path.join(outputDir, 'components', '_shared');

  // Collect icon names from p-icon's `name` prop
  const iconMeta = componentMeta['p-icon'];
  if (iconMeta?.propsMeta?.name?.allowedValues && Array.isArray(iconMeta.propsMeta.name.allowedValues)) {
    const iconNames: string[] = iconMeta.propsMeta.name.allowedValues;
    const sorted = [...iconNames].sort();
    const iconDir = path.join(sharedDir, 'icon-names');
    await fs.mkdir(iconDir, { recursive: true });
    await fs.writeFile(
      path.join(iconDir, 'page.mdx'),
      `# Available Icon Names\n\n${sorted.length} icons available for any \`IconName\` prop (e.g. \`icon\` on p-button, \`name\` on p-icon).\n\n${sorted.join(', ')}\n`,
      'utf-8'
    );
    console.log(`  gen: components/_shared/icon-names (${sorted.length} icons)`);
  }

  // Collect flag names from p-flag's `name` prop
  const flagMeta = componentMeta['p-flag'];
  if (flagMeta?.propsMeta?.name?.allowedValues && Array.isArray(flagMeta.propsMeta.name.allowedValues)) {
    const flagNames: string[] = flagMeta.propsMeta.name.allowedValues;
    const sorted = [...flagNames].sort();
    const flagDir = path.join(sharedDir, 'flag-names');
    await fs.mkdir(flagDir, { recursive: true });
    await fs.writeFile(
      path.join(flagDir, 'page.mdx'),
      `# Available Flag Names\n\n${sorted.length} country flags available for the \`name\` prop on p-flag.\n\n${sorted.join(', ')}\n`,
      'utf-8'
    );
    console.log(`  gen: components/_shared/flag-names (${sorted.length} flags)`);
  }
}

// ──────────────────────────────────────────────────────────────────────────────
// Step 9 — Generate AWS Bedrock Knowledge Base metadata sidecar files
// ──────────────────────────────────────────────────────────────────────────────

function stringAttr(value: string, includeForEmbedding = true): BedrockMetadataAttribute {
  return { value: { type: 'STRING', stringValue: value }, includeForEmbedding };
}

function deriveMetadataAttributes(relativePath: string): Record<string, BedrockMetadataAttribute> {
  const segments = relativePath.replace(/\/page\.mdx$/, '').split('/');

  const category = segments[0] ?? 'unknown';
  const attrs: Record<string, BedrockMetadataAttribute> = {
    category: stringAttr(category),
    documentPath: stringAttr(relativePath),
    version: stringAttr('3.33.0'),
  };

  if (category === 'components' && segments.length >= 2 && !segments[1].startsWith('_')) {
    attrs.component = stringAttr(segments[1]);
  }

  // Detect section & optional framework from the last meaningful segment
  // e.g. "examples-react" → section="examples", framework="react"
  const lastSegment = segments[segments.length - 1];
  if (lastSegment) {
    const fwMatch = FRAMEWORKS.find((fw) => lastSegment.endsWith(`-${fw}`));
    if (fwMatch) {
      attrs.framework = stringAttr(fwMatch);
      attrs.section = stringAttr(lastSegment.slice(0, -(fwMatch.length + 1))); // strip "-react" etc.
    } else {
      attrs.section = stringAttr(lastSegment);
    }
  }

  return attrs;
}

async function generateBedrockMetadata() {
  let count = 0;

  async function walk(dir: string) {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        await walk(fullPath);
      } else if (entry.isFile() && entry.name === 'page.mdx') {
        const relativePath = path.relative(outputDir, fullPath);
        const attributes = deriveMetadataAttributes(relativePath);
        const metadataFile = `${fullPath}.metadata.json`;

        await fs.writeFile(metadataFile, JSON.stringify({ metadataAttributes: attributes }, null, 2) + '\n', 'utf-8');

        count++;
        console.log(`  meta: ${relativePath}`);
      }
    }
  }

  await walk(outputDir);
  console.log(`  total: ${count} metadata files created`);
}

// ──────────────────────────────────────────────────────────────────────────────
// Main — orchestrate all 10 steps
// ──────────────────────────────────────────────────────────────────────────────

async function prepareContextSnapshots() {
  console.log(`Preparing context snapshots from: ${sourceDir}\n`);

  try {
    await fs.rm(outputDir, { recursive: true, force: true });
  } catch {
    // May not exist yet
  }
  await fs.mkdir(outputDir, { recursive: true });

  console.log('Step 1/10: Copying source files...');
  await walkAndCopy(sourceDir, '');

  console.log('\nStep 2/10: Processing MDX → Markdown (vanilla-js)...');
  await processAllFiles();

  console.log('\nStep 3/10: Generating framework-specific examples...');
  await generateFrameworkExamples();

  console.log('\nStep 4/10: Generating framework-specific interactive stories...');
  await generateFrameworkStories();

  console.log('\nStep 6/10: Generating shared reference pages...');
  await generateSharedReferences();

  console.log('\nStep 9/10: Generating AWS Bedrock Knowledge Base metadata...');
  await generateBedrockMetadata();

  // console.log('\nStep 10/10: Preparing for BatchWriteItem');
  // await prepareDynamoEntries();

  console.log('\nDone! Context snapshots ready.');
}

prepareContextSnapshots().catch(console.warn);
