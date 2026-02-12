import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import {
  type Framework,
  componentMetaCache,
  setComponentMetaCache,
  componentMetaPath,
  examplesCache,
  examplesDir,
} from './config.js';

// ──────────────────────────────────────────────────────────────────────────────
// Loaders
// ──────────────────────────────────────────────────────────────────────────────

export async function loadComponentMeta(): Promise<Record<string, any>> {
  if (componentMetaCache) return componentMetaCache;
  try {
    const module = await import(componentMetaPath);
    setComponentMetaCache(module.componentMeta || {});
    return componentMetaCache!;
  } catch (error) {
    console.warn('Could not load component meta:', error);
  }
  return {};
}

export async function loadExample(exampleName: string): Promise<{ frameworkMarkup: Record<string, string> } | null> {
  if (examplesCache[exampleName]) return examplesCache[exampleName];
  try {
    const fileName = exampleName.charAt(0).toUpperCase() + exampleName.slice(1);
    const filePath = path.join(examplesDir, `${fileName}.tsx`);
    const content = await fs.readFile(filePath, 'utf-8');
    const match = content.match(/frameworkMarkup:\s*({[\s\S]*?})\s*\n}/);
    if (match) {
      try {
        const frameworkMarkup = JSON.parse(match[1]);
        examplesCache[exampleName] = { frameworkMarkup };
        return examplesCache[exampleName];
      } catch {
        console.warn(`Could not parse frameworkMarkup for ${exampleName}`);
      }
    }
  } catch {
    // File not found — expected for some examples
  }
  return null;
}

// ──────────────────────────────────────────────────────────────────────────────
// Formatters
// ──────────────────────────────────────────────────────────────────────────────

export function formatComponentApi(tagName: string, meta: any): string {
  if (!meta) return '';

  const lines: string[] = [];
  lines.push(`\n### API Reference for \`${tagName}\`\n`);

  if (meta.isDeprecated) {
    lines.push(`> ⚠️ **Deprecated**: ${meta.deprecationMessage || 'This component is deprecated.'}\n`);
  }

  if (meta.isExperimental) {
    lines.push(`> 🧪 **Experimental**: This component is experimental and may change.\n`);
  }

  if (meta.propsMeta && Object.keys(meta.propsMeta).length > 0) {
    lines.push('#### Properties\n');
    lines.push('| Property | Type | Default | Description |');
    lines.push('|----------|------|---------|-------------|');

    for (const [propName, propMeta] of Object.entries(meta.propsMeta) as [string, any][]) {
      if (propMeta.isDeprecated) continue;
      const type = propMeta.type || 'unknown';
      const defaultValue = propMeta.defaultValue !== null ? `\`${JSON.stringify(propMeta.defaultValue)}\`` : '-';
      const description = (propMeta.description || '').replace(/\n/g, ' ').replace(/\|/g, '\\|');
      const required = propMeta.isRequired ? ' **(required)**' : '';
      const breakpoint = propMeta.isBreakpointCustomizable ? ' *(breakpoint customizable)*' : '';
      lines.push(`| \`${propName}\` | \`${type}\` | ${defaultValue} | ${description}${required}${breakpoint} |`);
    }
    lines.push('');
  }

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

export function formatCodeExample(
  exampleName: string,
  frameworkMarkup: Record<string, string>,
  framework: Framework = 'vanilla-js'
): string {
  const lines: string[] = [];
  lines.push(`\n### Code Example: \`${exampleName}\`\n`);

  if (framework === 'vanilla-js') {
    if (frameworkMarkup['vanilla-js']) {
      lines.push('```html');
      lines.push(frameworkMarkup['vanilla-js']);
      lines.push('```\n');
    } else {
      lines.push('> No vanilla JS example available.\n');
    }
  } else {
    const code = frameworkMarkup[framework];
    if (!code) {
      lines.push(`> No ${framework} example available for \`${exampleName}\`.\n`);
      return lines.join('\n');
    }
    const langMap: Record<string, string> = { react: 'tsx', angular: 'typescript', vue: 'vue' };
    lines.push(`\`\`\`${langMap[framework] || 'html'}`);
    lines.push(code);
    lines.push('```\n');
  }

  return lines.join('\n');
}

// ──────────────────────────────────────────────────────────────────────────────
// Content processing — framework-aware MDX → Markdown
// ──────────────────────────────────────────────────────────────────────────────

export async function processContent(content: string, framework: Framework = 'vanilla-js'): Promise<string> {
  const componentMeta = await loadComponentMeta();

  // Remove imports
  content = content.replace(/^import\s+.*?from\s+['"].*?['"];?\s*$/gm, '');
  content = content.replace(/^import\s+{[\s\S]*?}\s+from\s+['"].*?['"];?\s*$/gm, '');

  // Remove export const metadata
  content = content.replace(/export const metadata\s*=\s*{[\s\S]*?};?\s*/g, '');

  // ComponentStatus → emoji
  content = content.replace(
    /<ComponentStatus\s+tagName=["']([^"']+)["']\s*(?:\/>|><\/ComponentStatus>)/g,
    (_match, tagName) => {
      const meta = componentMeta[tagName];
      if (meta?.isDeprecated) return '⚠️ Deprecated';
      if (meta?.isExperimental) return '🧪 Experimental';
      return '';
    }
  );

  // ComponentStory → note
  content = content.replace(
    /<ComponentStory\s+story={([^}]+)}\s*(?:backgroundColor={[^}]+})?\s*\/>/g,
    (_match, storyName) => {
      return `\n> **Interactive Story**: The \`${storyName}\` story provides an interactive demonstration. View the live documentation to explore this component dynamically.\n`;
    }
  );

  // ComponentExample → inject code for the target framework only
  const exampleMatches = content.matchAll(/<ComponentExample\s+codeSample={([^}]+)}\s*(?:[^/]*)?\/>/g);
  for (const match of Array.from(exampleMatches)) {
    const [fullMatch, exampleName] = match;
    const example = await loadExample(exampleName);
    if (example?.frameworkMarkup) {
      const codeBlock = formatCodeExample(exampleName, example.frameworkMarkup, framework);
      content = content.replace(fullMatch, codeBlock);
    } else {
      content = content.replace(fullMatch, `\n> **Code Example**: \`${exampleName}\`\n`);
    }
  }

  // TableOfContents
  content = content.replace(/<TableOfContents\s+headings={[\s\S]*?}\s*\/>/g, '');

  // ComponentApi → inject API documentation
  content = content.replace(
    /<ComponentApi\s+tagName=["']([^"']+)["']\s*(?:showTableOfContents={[^}]+})?\s*\/>/g,
    (_match, tagName) => {
      const meta = componentMeta[tagName];
      if (meta) return formatComponentApi(tagName, meta);
      return `\n> **API Documentation**: See the live documentation for \`${tagName}\` API reference.\n`;
    }
  );

  // Configurator → note
  content = content.replace(
    /<Configurator\s+tagName=["']([^"']+)["']\s+story={([^}]+)}[\s\S]*?\/>/g,
    (_match, tagName) => {
      return `\n> **Interactive Configurator**: Try the \`${tagName}\` configurator in the live documentation to customize all properties interactively.\n`;
    }
  );

  // Notification (with state)
  content = content.replace(
    /<Notification\s+heading=["']([^"']+)["'](?:\s+heading-tag=["'][^"']*["']|\s+headingTag=["'][^"']*["'])?\s+state=["']([^"']+)["']\s*>([\s\S]*?)<\/Notification>/g,
    (_match, heading, state, notificationContent) => {
      const emoji = state === 'error' ? '🚫' : state === 'warning' ? '⚠️' : state === 'success' ? '✅' : 'ℹ️';
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

  // Notification (without state)
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

  // Convert remaining <Link> to markdown links
  content = content.replace(/<Link\s+href=["']([^"']+)["']>([^<]*)<\/Link>/g, '[$2]($1)');

  // Protect fenced code blocks from JSX cleanup (they may contain valid React/Angular/Vue JSX)
  const codeBlocks: string[] = [];
  content = content.replace(/```[\s\S]*?```/g, (match) => {
    const idx = codeBlocks.length;
    codeBlocks.push(match);
    return `__CODE_BLOCK_${idx}__`;
  });

  // Remove any remaining unresolved self-closing JSX components
  content = content.replace(/<[A-Z][A-Za-z]*(?:\s+[^>]*)?\s*\/>/g, '');
  // Remove remaining JSX components with children but keep the text content
  content = content.replace(/<[A-Z][A-Za-z]*(?:\s+[^>]*)?>([\s\S]*?)<\/[A-Z][A-Za-z]*>/g, '$1');

  // Restore code blocks
  content = content.replace(/__CODE_BLOCK_(\d+)__/g, (_, idx) => codeBlocks[Number(idx)]);

  // Clean up multiple empty lines
  content = content.replace(/\n{3,}/g, '\n\n');
  content = content.trim();

  return content;
}
