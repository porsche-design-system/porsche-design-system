import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import {
  componentMetaCache,
  componentMetaPath,
  examplesCache,
  examplesDir,
  type Framework,
  LARGE_ENUM_THRESHOLD,
  setComponentMetaCache,
  storefrontSrcDir,
  storiesCache,
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
// Story loading — resolve imports, execute generators, produce framework markup
// ──────────────────────────────────────────────────────────────────────────────

/** Cache for the createFrameworkMarkup function (loaded once from storefront) */
let createFrameworkMarkupFn: ((config: any[], state: any, theme: string) => Record<string, string>) | null = null;

async function getCreateFrameworkMarkup() {
  if (createFrameworkMarkupFn) return createFrameworkMarkupFn;
  try {
    const mod = await import(path.join(storefrontSrcDir, 'utils/generator/createFrameworkMarkup.ts'));
    createFrameworkMarkupFn = mod.default?.createFrameworkMarkup ?? mod.createFrameworkMarkup;
    return createFrameworkMarkupFn;
  } catch (error) {
    console.warn('Could not load createFrameworkMarkup:', error);
    return null;
  }
}

/**
 * Parse the raw MDX content to build a map of story variable names to their
 * module paths (resolved to absolute filesystem paths).
 *
 * E.g. `import { fooStory } from '@/app/components/foo/foo.stories';`
 *   → { fooStory: '/abs/path/storefront/src/app/components/foo/foo.stories.ts' }
 */
function parseStoryImports(rawMdx: string): Record<string, string> {
  const map: Record<string, string> = {};
  const importRegex = /^import\s+{([^}]+)}\s+from\s+['"]([^'"]+\.stor(?:ies|y))['"];?\s*$/gm;
  let match: RegExpExecArray | null;

  while ((match = importRegex.exec(rawMdx)) !== null) {
    const names = match[1]
      .split(',')
      .map((n) => n.trim())
      .filter(Boolean);
    const modulePath = match[2];

    // Resolve @/ alias to absolute storefront src path
    let absPath: string;
    if (modulePath.startsWith('@/')) {
      absPath = path.join(storefrontSrcDir, modulePath.slice(2));
    } else {
      absPath = modulePath;
    }
    // Ensure .ts extension
    if (!absPath.endsWith('.ts') && !absPath.endsWith('.tsx')) {
      absPath += '.ts';
    }

    for (const name of names) {
      map[name] = absPath;
    }
  }

  return map;
}

/**
 * Strip the HTML document wrapper that getVanillaJsCode adds,
 * keeping only the meaningful body content (markup + script).
 */
function stripVanillaJsWrapper(code: string): string {
  // Extract content between <body ...> and </body>
  const bodyMatch = code.match(/<body[^>]*>\n?([\s\S]*?)\n?<\/body>/);
  if (!bodyMatch) return code;

  let body = bodyMatch[1].trim();

  // Remove empty <script> blocks
  body = body.replace(/<script>\s*\n?\s*<\/script>/g, '').trim();

  return body;
}

/**
 * Load a story by variable name, execute its generator, and produce
 * framework-specific markup. Returns a Record<framework, code> or null.
 */
export async function loadStoryMarkup(
  storyVarName: string,
  storyImports: Record<string, string>
): Promise<Record<string, string> | null> {
  // Check cache first
  if (storiesCache[storyVarName]) return storiesCache[storyVarName];

  const modulePath = storyImports[storyVarName];
  if (!modulePath) return null;

  try {
    const storyModule = await import(modulePath);
    // Handle both direct exports and default-wrapped exports
    const exports = storyModule.default ?? storyModule;
    const story = exports[storyVarName];
    if (!story?.generator) return null;

    const config = story.generator(story.state);
    const createMarkup = await getCreateFrameworkMarkup();
    if (!createMarkup) return null;

    const markup = createMarkup(config, story.state, 'light');

    // Post-process: strip the HTML wrapper from vanilla-js
    const result: Record<string, string> = {
      'vanilla-js': stripVanillaJsWrapper(markup['vanilla-js'] ?? ''),
      react: markup.react ?? '',
      angular: markup.angular ?? '',
      vue: markup.vue ?? '',
    };

    storiesCache[storyVarName] = result;
    return result;
  } catch (error) {
    console.warn(`  warn: could not load story "${storyVarName}" from ${modulePath}:`, (error as Error).message);
    return null;
  }
}

// ──────────────────────────────────────────────────────────────────────────────
// Formatters
// ──────────────────────────────────────────────────────────────────────────────

/**
 * Known large-enum prop types that get their own shared reference page.
 * Maps the type name to the reference path and a human label.
 */
const SHARED_ENUM_REFS: Record<string, { path: string; label: string }> = {
  IconName: { path: '/components/_shared/icon-names', label: 'available icons' },
  ButtonIcon: { path: '/components/_shared/icon-names', label: 'available icons' },
  FlagName: { path: '/components/_shared/flag-names', label: 'available flags' },
};

/**
 * Format the allowed values for a prop into a token-efficient string.
 * Returns { type: string, descSuffix: string } where descSuffix is appended
 * to the description (used for large enum references).
 */
export function formatAllowedValues(propMeta: any): { type: string; descSuffix: string } {
  const { allowedValues, type } = propMeta;

  // No allowed values metadata — keep the raw type name
  if (allowedValues === undefined || allowedValues === null) {
    return { type: type || 'unknown', descSuffix: '' };
  }

  // Primitive types
  if (allowedValues === 'string' || allowedValues === 'boolean' || allowedValues === 'number') {
    return { type: allowedValues, descSuffix: '' };
  }

  // Array of allowed values
  if (Array.isArray(allowedValues)) {
    // Large enum — reference shared page
    if (allowedValues.length > LARGE_ENUM_THRESHOLD) {
      const ref = SHARED_ENUM_REFS[type];
      if (ref) {
        return {
          type: type || 'string',
          descSuffix: ` See [${ref.label}](${ref.path}) for all ${allowedValues.length} values.`,
        };
      }
      // Unknown large enum — just show count
      return {
        type: type || 'string',
        descSuffix: ` ${allowedValues.length} allowed values.`,
      };
    }
    // Small enum — inline values
    const formatted = allowedValues
      .map((v: any) => (v === null ? 'null' : typeof v === 'string' ? `"${v}"` : String(v)))
      .join(' \\| ');
    return { type: formatted, descSuffix: '' };
  }

  // Object shape (e.g. aria attributes)
  if (typeof allowedValues === 'object') {
    const entries = Object.entries(allowedValues as Record<string, string>);
    const shape = entries.map(([key, val]) => `${key}: ${val}`).join(', ');
    return { type: `{ ${shape} }`, descSuffix: '' };
  }

  return { type: type || 'unknown', descSuffix: '' };
}

function escapeMarkdownTableCell(text: string): string {
  return (text || '')
    .replace(/\\/g, '\\\\')
    .replace(/\n/g, ' ')
    .replace(/\|/g, '\\|');
}

export function formatComponentApi(tagName: string, meta: any): string {
  if (!meta) return '';

  function escapeMarkdownTableCell(text: string): string {
    return text
      .replace(/\\/g, '\\\\')
      .replace(/\|/g, '\\|')
      .replace(/\n/g, ' ');
  }

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
      const description = escapeMarkdownTableCell(propMeta.description || '');
    lines.push('|----------|------|---------|-------------|');

    for (const [propName, propMeta] of Object.entries(meta.propsMeta) as [string, any][]) {
      if (propMeta.isDeprecated) continue;
      const { type, descSuffix } = formatAllowedValues(propMeta);
      const defaultValue = propMeta.defaultValue !== null ? `\`${JSON.stringify(propMeta.defaultValue)}\`` : '-';
      const description = (propMeta.description || '')
        .replace(/\\/g, '\\\\')
        .replace(/\n/g, ' ')
        .replace(/\|/g, '\\|');
      const description = (eventMeta.description || '')
        .replace(/\n/g, ' ')
        .replace(/\\/g, '\\\\')
        .replace(/\|/g, '\\|');
      const breakpoint = propMeta.isBreakpointCustomizable ? ' *(breakpoint customizable)*' : '';
      lines.push(
        `| \`${propName}\` | \`${type}\` | ${defaultValue} | ${description}${required}${breakpoint}${descSuffix} |`
      );
    }
    lines.push('');
      const description = escapeMarkdownTableCell(eventMeta.description || '');

  if (meta.eventsMeta && Object.keys(meta.eventsMeta).length > 0) {
    lines.push('#### Events\n');
    lines.push('| Event | Type | Description |');
    lines.push('|-------|------|-------------|');

      const description = (slotMeta.description || '')
        .replace(/\n/g, ' ')
        .replace(/\\/g, '\\\\')
        .replace(/\|/g, '\\|');
      if (eventMeta.isDeprecated) continue;
      const type = eventMeta.typeDetail || eventMeta.type || 'void';
      const description = (eventMeta.description || '').replace(/\n/g, ' ').replace(/\|/g, '\\|');
      lines.push(`| \`${eventName}\` | \`${type}\` | ${description} |`);
    }
    lines.push('');
      const description = escapeMarkdownTableCell(slotMeta.description || '');

  if (meta.slotsMeta && Object.keys(meta.slotsMeta).length > 0) {
    lines.push('#### Slots\n');
    lines.push('| Slot | Description |');
    lines.push('|------|-------------|');

      const description = (varMeta.description || '')
        .replace(/\n/g, ' ')
        .replace(/\\/g, '\\\\')
        .replace(/\|/g, '\\|');
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
      const description = escapeMarkdownTableCell(varMeta.description || '');
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

export function formatStoryCode(
  storyName: string,
  frameworkMarkup: Record<string, string>,
  framework: Framework = 'vanilla-js'
): string {
  const lines: string[] = [];
  lines.push(`\n### Interactive Story: \`${storyName}\`\n`);

  if (framework === 'vanilla-js') {
    if (frameworkMarkup['vanilla-js']) {
      lines.push('```html');
      lines.push(frameworkMarkup['vanilla-js']);
      lines.push('```\n');
    } else {
      lines.push(`> No vanilla JS story available for \`${storyName}\`.\n`);
    }
  } else {
    const code = frameworkMarkup[framework];
    if (!code) {
      lines.push(`> No ${framework} story available for \`${storyName}\`.\n`);
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

export async function processContent(
  content: string,
  framework: Framework = 'vanilla-js',
  rawMdx?: string
): Promise<string> {
  const componentMeta = await loadComponentMeta();

  // Parse story imports from the original MDX source (before imports are stripped)
  const storyImports = parseStoryImports(rawMdx ?? content);

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

  // ComponentStory → inject framework-specific code
  const storyMatches = content.matchAll(/<ComponentStory\s+story={([^}]+)}\s*(?:backgroundColor={[^}]+})?\s*\/>/g);
  for (const match of Array.from(storyMatches)) {
    const [fullMatch, storyName] = match;
    const markup = await loadStoryMarkup(storyName, storyImports);
    if (markup) {
      const codeBlock = formatStoryCode(storyName, markup, framework);
      content = content.replace(fullMatch, codeBlock);
    } else {
      content = content.replace(
        fullMatch,
        `\n> **Interactive Story**: The \`${storyName}\` story provides an interactive demonstration. View the live documentation to explore this component dynamically.\n`
      );
    }
  }

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
