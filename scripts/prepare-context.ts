#!/usr/bin/env node

import * as fs from 'node:fs/promises';
import * as path from 'node:path';

const sourceDir = path.join(__dirname, '..', 'packages/storefront/src/app/');
const outputDir = path.join(__dirname, '..', 'packages/mcp-server/context-snapshots');
const examplesDir = path.join(__dirname, '..', 'packages/shared/src/examples');
const componentMetaPath = path.join(__dirname, '..', 'packages/component-meta/src/lib/componentMeta.ts');

const skipDirectories = ['templates', 'patterns', 'partials', '-', '[component]', 'developing'];
console.log(`Preparing context snapshots in: ${sourceDir}`);

// Cache for loaded examples
const examplesCache: Record<string, { frameworkMarkup: Record<string, string> }> = {};

// Cache for component meta
let componentMetaCache: Record<string, any> | null = null;

async function loadComponentMeta(): Promise<Record<string, any>> {
  if (componentMetaCache) return componentMetaCache;

  try {
    // Dynamically import the TypeScript module
    const module = await import(componentMetaPath);
    componentMetaCache = module.componentMeta || {};
    return componentMetaCache;
  } catch (error) {
    console.warn('Could not load component meta:', error);
  }
  return {};
}

async function loadExample(exampleName: string): Promise<{ frameworkMarkup: Record<string, string> } | null> {
  if (examplesCache[exampleName]) {
    return examplesCache[exampleName];
  }

  try {
    // Convert camelCase to PascalCase for the file name
    const fileName = exampleName.charAt(0).toUpperCase() + exampleName.slice(1);
    const filePath = path.join(examplesDir, `${fileName}.tsx`);

    const content = await fs.readFile(filePath, 'utf-8');

    // Extract the frameworkMarkup object from the export
    const match = content.match(/frameworkMarkup:\s*({[\s\S]*?})\s*\n}/);
    if (match) {
      try {
        // The frameworkMarkup is a JSON object with escaped strings
        const frameworkMarkup = JSON.parse(match[1]);
        examplesCache[exampleName] = { frameworkMarkup };
        return examplesCache[exampleName];
      } catch (e) {
        console.warn(`Could not parse frameworkMarkup for ${exampleName}`);
      }
    }
  } catch (error) {
    // File not found or other error
  }

  return null;
}

function formatComponentApi(tagName: string, meta: any): string {
  if (!meta) return '';

  const lines: string[] = [];
  lines.push(`\n### API Reference for \`${tagName}\`\n`);

  if (meta.isDeprecated) {
    lines.push(`> ⚠️ **Deprecated**: ${meta.deprecationMessage || 'This component is deprecated.'}\n`);
  }

  if (meta.isExperimental) {
    lines.push(`> 🧪 **Experimental**: This component is experimental and may change.\n`);
  }

  // Props
  if (meta.propsMeta && Object.keys(meta.propsMeta).length > 0) {
    lines.push('#### Properties\n');
    lines.push('| Property | Type | Default | Description |');
    lines.push('|----------|------|---------|-------------|');

    for (const [propName, propMeta] of Object.entries(meta.propsMeta) as [string, any][]) {
      if (propMeta.isDeprecated) continue; // Skip deprecated props

      const type = propMeta.type || 'unknown';
      const defaultValue = propMeta.defaultValue !== null ? `\`${JSON.stringify(propMeta.defaultValue)}\`` : '-';
      const description = (propMeta.description || '').replace(/\n/g, ' ').replace(/\|/g, '\\|');
      const required = propMeta.isRequired ? ' **(required)**' : '';
      const breakpoint = propMeta.isBreakpointCustomizable ? ' *(breakpoint customizable)*' : '';

      lines.push(`| \`${propName}\` | \`${type}\` | ${defaultValue} | ${description}${required}${breakpoint} |`);
    }
    lines.push('');
  }

  // Events
  if (meta.eventsMeta && Object.keys(meta.eventsMeta).length > 0) {
    lines.push('#### Events\n');
    lines.push('| Event | Type | Description |');
    lines.push('|-------|------|-------------|');

    for (const [eventName, eventMeta] of Object.entries(meta.eventsMeta) as [string, any][]) {
      if (eventMeta.isDeprecated) continue;

      const type = eventMeta.typeDetail || eventMeta.type || 'void';
      const description = (eventMeta.description || '').replace(/\n/g, ' ').replace(/\|/g, '\\|');

      lines.push(`| \`${eventName}\` | \`${type}\` | ${description} |`);
    }
    lines.push('');
  }

  // Slots
  if (meta.slotsMeta && Object.keys(meta.slotsMeta).length > 0) {
    lines.push('#### Slots\n');
    lines.push('| Slot | Description |');
    lines.push('|------|-------------|');

    for (const [slotName, slotMeta] of Object.entries(meta.slotsMeta) as [string, any][]) {
      if (slotMeta.isDeprecated) continue;

      const name = slotName === '' ? '(default)' : `\`${slotName}\``;
      const description = (slotMeta.description || '').replace(/\n/g, ' ').replace(/\|/g, '\\|');
      const required = slotMeta.isRequired ? ' **(required)**' : '';

      lines.push(`| ${name} | ${description}${required} |`);
    }
    lines.push('');
  }

  // CSS Variables
  if (meta.cssVariablesMeta && Object.keys(meta.cssVariablesMeta).length > 0) {
    lines.push('#### CSS Custom Properties\n');
    lines.push('| Variable | Default | Description |');
    lines.push('|----------|---------|-------------|');

    for (const [varName, varMeta] of Object.entries(meta.cssVariablesMeta) as [string, any][]) {
      const defaultValue = varMeta.defaultValue ? `\`${varMeta.defaultValue}\`` : '-';
      const description = (varMeta.description || '').replace(/\n/g, ' ').replace(/\|/g, '\\|');

      lines.push(`| \`${varName}\` | ${defaultValue} | ${description} |`);
    }
    lines.push('');
  }

  return lines.join('\n');
}

async function walkAndCopy(dir: string, relative: string = '') {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const newRelativePath = relative ? path.join(relative, entry.name) : entry.name;

    if (entry.isDirectory()) {
      // Skip directories in the skip list
      if (skipDirectories.includes(entry.name)) {
        console.log(`Skipping directory: ${newRelativePath}`);
        continue;
      }

      await walkAndCopy(fullPath, newRelativePath);
    } else if (entry.isFile() && entry.name === 'page.mdx') {
      // Found a page.mdx file - create directory structure and copy it
      const targetDir = path.join(outputDir, relative);
      const targetFile = path.join(outputDir, newRelativePath);

      // Create the directory structure
      await fs.mkdir(targetDir, { recursive: true });

      // Copy the file
      await fs.copyFile(fullPath, targetFile);
      console.log(`Copied: ${newRelativePath}`);
    }
  }
}

async function parseMdxFile(filePath: string) {
  let content = await fs.readFile(filePath, 'utf-8');
  const componentMeta = await loadComponentMeta();

  // Remove imports - they won't work in the snapshot files
  content = content.replace(/^import\s+.*?from\s+['"].*?['"];?\s*$/gm, '');
  content = content.replace(/^import\s+{[\s\S]*?}\s+from\s+['"].*?['"];?\s*$/gm, '');

  // Remove export const metadata = {...}
  content = content.replace(/export const metadata = {[\s\S]*?};?\s*/g, '');

  // Parse <ComponentStatus tagName="p-xxx" /> and replace with emoji or text
  content = content.replace(
    /<ComponentStatus\s+tagName=["']([^"']+)["']\s*(?:\/>|><\/ComponentStatus>)/g,
    (_match, tagName) => {
      const meta = componentMeta[tagName];
      if (meta?.isDeprecated) return '⚠️ Deprecated';
      if (meta?.isExperimental) return '🧪 Experimental';
      return '';
    }
  );

  // Parse <ComponentStory story={storyName} /> - replace with a note since executing stories requires runtime deps
  content = content.replace(
    /<ComponentStory\s+story={([^}]+)}\s*(?:backgroundColor={[^}]+})?\s*\/>/g,
    (_match, storyName) => {
      return `\n> **Interactive Story**: The \`${storyName}\` story provides an interactive demonstration. View the live documentation to explore this component dynamically.\n`;
    }
  );

  // Parse <ComponentExample codeSample={exampleName} /> - inject actual code
  const exampleMatches = content.matchAll(/<ComponentExample\s+codeSample={([^}]+)}\s*(?:[^/]*)?\/>/g);
  for (const match of Array.from(exampleMatches)) {
    const [fullMatch, exampleName] = match;
    const example = await loadExample(exampleName);

    if (example?.frameworkMarkup) {
      const codeBlock = formatCodeExample(exampleName, example.frameworkMarkup);
      content = content.replace(fullMatch, codeBlock);
    } else {
      content = content.replace(fullMatch, `\n> **Code Example**: \`${exampleName}\`\n`);
    }
  }

  // Parse <TableOfContents headings={[...]} /> - remove it
  content = content.replace(/<TableOfContents\s+headings={[\s\S]*?}\s*\/>/g, '');

  // Parse <ComponentApi tagName="p-xxx" /> - inject actual API documentation
  content = content.replace(
    /<ComponentApi\s+tagName=["']([^"']+)["']\s*(?:showTableOfContents={[^}]+})?\s*\/>/g,
    (_match, tagName) => {
      const meta = componentMeta[tagName];
      if (meta) {
        return formatComponentApi(tagName, meta);
      }
      return `\n> **API Documentation**: See the live documentation for \`${tagName}\` API reference.\n`;
    }
  );

  // Parse <Configurator tagName="p-xxx" story={...} /> - replace with a note about configurator
  content = content.replace(
    /<Configurator\s+tagName=["']([^"']+)["']\s+story={([^}]+)}[\s\S]*?\/>/g,
    (_match, tagName, storyName) => {
      return `\n> **Interactive Configurator**: Try the \`${tagName}\` configurator in the live documentation to customize all properties interactively.\n`;
    }
  );

  // Parse <Notification heading="..." state="...">content</Notification> - convert to markdown blockquote
  content = content.replace(
    /<Notification\s+heading=["']([^"']+)["'](?:\s+heading-tag=["'][^"']*["']|\s+headingTag=["'][^"']*["'])?\s+state=["']([^"']+)["']\s*>([\s\S]*?)<\/Notification>/g,
    (_match, heading, state, notificationContent) => {
      const emoji = state === 'error' ? '🚫' : state === 'warning' ? '⚠️' : state === 'success' ? '✅' : 'ℹ️';
      // Clean up the notification content - remove JSX expressions, <br />, <code>, etc.
      const cleanContent = notificationContent
        .replace(/{'\s*'}/g, '')
        .replace(/<br\s*\/?>/g, '\n')
        .replace(/<code>([^<]*)<\/code>/g, '`$1`')
        .replace(/<strong>([^<]*)<\/strong>/g, '**$1**')
        .replace(/<Link\s+href=["']([^"']+)["']>([^<]*)<\/Link>/g, '[$2]($1)')
        .trim();

      return `\n> ${emoji} **${heading}**\n>\n${cleanContent
        .split('\n')
        .map((line: string) => `> ${line.trim()}`)
        .join('\n')}\n`;
    }
  );

  // Parse <Notification heading="...">content</Notification> - convert to markdown blockquote (without state)
  content = content.replace(
    /<Notification\s+heading=["']([^"']+)["'](?:\s+heading-tag=["'][^"']*["']|\s+headingTag=["'][^"']*["'])?\s*>([\s\S]*?)<\/Notification>/g,
    (_match, heading, notificationContent) => {
      const cleanContent = notificationContent
        .replace(/{'\s*'}/g, '')
        .replace(/<br\s*\/?>/g, '\n')
        .replace(/<code>([^<]*)<\/code>/g, '`$1`')
        .replace(/<strong>([^<]*)<\/strong>/g, '**$1**')
        .replace(/<Link\s+href=["']([^"']+)["']>([^<]*)<\/Link>/g, '[$2]($1)')
        .trim();

      return `\n> ℹ️ **${heading}**\n>\n${cleanContent
        .split('\n')
        .map((line: string) => `> ${line.trim()}`)
        .join('\n')}\n`;
    }
  );

  // Remove any remaining JSX-style components that weren't handled
  content = content.replace(/<Link\s+href=["']([^"']+)["']>([^<]*)<\/Link>/g, '[$2]($1)');

  // Clean up multiple empty lines
  content = content.replace(/\n{3,}/g, '\n\n');

  // Trim leading/trailing whitespace
  content = content.trim();

  await fs.writeFile(filePath, content, 'utf-8');
}

function formatCodeExample(exampleName: string, frameworkMarkup: Record<string, string>): string {
  const lines: string[] = [];
  lines.push(`\n### Code Example: \`${exampleName}\`\n`);

  // Add React example (most common)
  if (frameworkMarkup.react) {
    lines.push('<details>');
    lines.push('<summary>React</summary>\n');
    lines.push('```tsx');
    lines.push(frameworkMarkup.react);
    lines.push('```');
    lines.push('</details>\n');
  }

  // Add Vanilla JS example
  if (frameworkMarkup['vanilla-js']) {
    lines.push('<details>');
    lines.push('<summary>Vanilla JS / HTML</summary>\n');
    lines.push('```html');
    lines.push(frameworkMarkup['vanilla-js']);
    lines.push('```');
    lines.push('</details>\n');
  }

  // Add Angular example
  if (frameworkMarkup.angular) {
    lines.push('<details>');
    lines.push('<summary>Angular</summary>\n');
    lines.push('```typescript');
    lines.push(frameworkMarkup.angular);
    lines.push('```');
    lines.push('</details>\n');
  }

  // Add Vue example
  if (frameworkMarkup.vue) {
    lines.push('<details>');
    lines.push('<summary>Vue</summary>\n');
    lines.push('```vue');
    lines.push(frameworkMarkup.vue);
    lines.push('```');
    lines.push('</details>\n');
  }

  return lines.join('\n');
}

async function parseMdxFiles() {
  console.log('Parsing MDX files for context snapshots...');

  async function walkAndParse(dir: string) {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        await walkAndParse(fullPath);
      } else if (entry.isFile() && entry.name === 'page.mdx') {
        await parseMdxFile(fullPath);
        console.log(`Parsed: ${path.relative(outputDir, fullPath)}`);
      }
    }
  }

  await walkAndParse(outputDir);
}

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

async function getCategories(): Promise<string[]> {
  const entries = await fs.readdir(outputDir, { withFileTypes: true });
  return entries.filter((e) => e.isDirectory()).map((e) => e.name).sort();
}

async function generateSnapshotMeta() {
  const documentCount = await countFiles(outputDir);
  const categories = await getCategories();

  const meta = {
    version: '1.0.0',
    generatedAt: new Date().toISOString(),
    documentCount,
    categories,
  };

  await fs.writeFile(path.join(outputDir, 'snapshot-meta.json'), JSON.stringify(meta, null, 2), 'utf-8');
  console.log(`Snapshot metadata: v${meta.version}, ${documentCount} docs`);
}

async function prepareContextSnapshots() {
  // Clean output directory first
  try {
    await fs.rm(outputDir, { recursive: true, force: true });
  } catch (e) {
    // Directory might not exist
  }

  await fs.mkdir(outputDir, { recursive: true });

  console.log('Walking through source directory...');
  await walkAndCopy(sourceDir, '');

  console.log('\nParsing MDX files...');
  await parseMdxFiles();

  console.log('\nGenerating snapshot metadata...');
  await generateSnapshotMeta();

  console.log('\nContext snapshots prepared successfully!');
}

prepareContextSnapshots();
