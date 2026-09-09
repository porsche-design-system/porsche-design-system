import path from 'node:path';
import type { Framework } from './skillTree';

/**
 * Rewrites storefront-absolute links to local skill references, falling back to the live docs when
 * no local equivalent exists.
 */

const STOREFRONT_ORIGIN = 'https://designsystem.porsche.com';

export type RouteReferences = Readonly<Record<string, string>>;

const relativeLink = (fromDir: string, target: string): string => {
  const relative = path.posix.relative(fromDir, target);
  return relative.startsWith('.') ? relative : `./${relative}`;
};

const localTarget = (href: string, routeReferences: RouteReferences): string | null => {
  const [first, second] = href
    .replace(/[?#].*$/, '')
    .split('/')
    .filter(Boolean);

  // One generated component reference covers every storefront tab.
  if (first === 'components' && second) {
    const tag = `p-${second}`;
    return `references/components/${tag}/${tag}.md`;
  }
  return first ? (routeReferences[first] ?? null) : null;
};

/**
 * Framework-agnostic source uses this placeholder; each generated skill resolves it to one wrapper.
 */
const FRAMEWORK_PLACEHOLDER = '{js|angular|react|vue}';

const PLACEHOLDER_INSTRUCTION = /^.*Replace \{js\|angular\|react\|vue\} with your framework[^\n]*\n?/gm;

export const resolveFrameworkPlaceholder = (markdown: string, framework: Framework): string =>
  markdown.replace(PLACEHOLDER_INSTRUCTION, '').replaceAll(FRAMEWORK_PLACEHOLDER, framework);

const LINK_PATTERN = /\]\((\/[^)\s]*)\)/g;

/**
 * Rewrite the storefront-absolute markdown links in `markdown`, resolving in-tree targets relative to
 * `fromRelPath` (the file's own tree-relative path, e.g. `references/components/p-button/p-button.md`).
 * Fence-aware: links inside fenced code blocks are left untouched.
 */
export const rewriteDocLinks = (
  markdown: string,
  fromRelPath: string,
  routeReferences: RouteReferences = {}
): string => {
  const fromDir = path.posix.dirname(fromRelPath);
  let inFence = false;

  return markdown
    .split('\n')
    .map((line) => {
      if (line.trim().startsWith('```')) {
        inFence = !inFence;
        return line;
      }
      if (inFence) {
        return line;
      }
      return line.replace(LINK_PATTERN, (_whole, href: string) => {
        const target = localTarget(href, routeReferences);
        return `](${target ? relativeLink(fromDir, target) : `${STOREFRONT_ORIGIN}${href}`})`;
      });
    })
    .join('\n');
};
