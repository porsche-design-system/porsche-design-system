import path from 'node:path';
import type { Framework } from './skillTree';

/**
 * Rewrites storefront site-absolute markdown links in generated prose so they resolve inside the
 * skill tree. The MDX sources link to storefront pages by absolute path (`](/components/button/)`,
 * `](/patterns/forms/)`); those paths do not exist inside the shipped skill, so left untouched they
 * are dead links. Each is remapped to the local reference that covers the same topic — a component's
 * own reference, a styling-solution / stylesheets / tokens reference — relative to the file the link
 * appears in. Anything with no local equivalent (patterns, must-know, developing guides) is pointed
 * at the canonical docs URL so it still resolves.
 */

/** Live docs origin, used as the fallback for storefront pages the skill does not ship a reference for. */
const STOREFRONT_ORIGIN = 'https://designsystem.porsche.com';

/** Storefront route first-segments that map to a single tree reference the skill ships. */
const ROUTE_REFERENCES: Record<string, string> = {
  scss: 'references/styles/scss.md',
  tailwindcss: 'references/styles/tailwindcss.md',
  'vanilla-extract': 'references/styles/vanilla-extract.md',
  emotion: 'references/styles/emotion.md',
  stylesheets: 'references/stylesheets.md',
  tokens: 'references/tokens.md',
};

/** File-relative link from `fromDir` to a tree-relative target, always prefixed (`./` or `../`). */
const relativeLink = (fromDir: string, target: string): string => {
  const relative = path.posix.relative(fromDir, target);
  return relative.startsWith('.') ? relative : `./${relative}`;
};

/** Map a single storefront-absolute href to its in-tree target, or `null` to fall back to the docs URL. */
const localTarget = (href: string): string | null => {
  const [first, second] = href
    .replace(/[?#].*$/, '')
    .split('/')
    .filter(Boolean);

  // A component page (`/components/<slug>[/...]`) maps to that component's own reference. Any sub-path
  // (examples, api, accessibility) collapses to the reference, which already covers all of it.
  if (first === 'components' && second) {
    const tag = `p-${second}`;
    return `references/components/${tag}/${tag}.md`;
  }
  return first ? (ROUTE_REFERENCES[first] ?? null) : null;
};

/**
 * The multi-framework package placeholder the storefront MDX and style serializers author, e.g.
 * `@porsche-design-system/components-{js|angular|react|vue}`. Correct in the framework-agnostic
 * storefront, but each skill tree ships for one framework — so the placeholder must resolve to the
 * concrete package name (the whole point of shipping four trees).
 */
const FRAMEWORK_PLACEHOLDER = '{js|angular|react|vue}';

/** A `Replace {js|angular|react|vue} with your framework …` instruction line — obsolete once resolved. */
const PLACEHOLDER_INSTRUCTION = /^.*Replace \{js\|angular\|react\|vue\} with your framework[^\n]*\n?/gm;

/**
 * Resolve the framework placeholder in generated content to this tree's concrete package name, and
 * drop the now-pointless "replace it with your framework" instruction. A no-op on content that does
 * not carry the placeholder, so it is safe to run over every produced file.
 */
export const resolveFrameworkPlaceholder = (markdown: string, framework: Framework): string =>
  markdown.replace(PLACEHOLDER_INSTRUCTION, '').replaceAll(FRAMEWORK_PLACEHOLDER, framework);

const LINK_PATTERN = /\]\((\/[^)\s]*)\)/g;

/**
 * Rewrite the storefront-absolute markdown links in `markdown`, resolving in-tree targets relative to
 * `fromRelPath` (the file's own tree-relative path, e.g. `references/components/p-button/p-button.md`).
 * Fence-aware: links inside fenced code blocks are left untouched.
 */
export const rewriteDocLinks = (markdown: string, fromRelPath: string): string => {
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
        const target = localTarget(href);
        return `](${target ? relativeLink(fromDir, target) : `${STOREFRONT_ORIGIN}${href}`})`;
      });
    })
    .join('\n');
};
