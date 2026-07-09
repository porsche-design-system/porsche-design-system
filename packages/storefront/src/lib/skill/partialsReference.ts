import type { ComponentType } from 'react';
import { rewriteDocLinks } from './links';
import { stripLeadingH1 } from './markdown';
import { renderMdxToMarkdown } from './renderMdxToMarkdown';
import type { Framework, SkillTree } from './skillTree';

/**
 * Partials are framework-agnostic build-time functions — there is no partials meta
 * object, so the storefront partials MDX (`partials/<name>/page.mdx`) is the source. Each
 * page is rendered to markdown via {@link renderMdxToMarkdown}; framework usage is
 * represented through the partials' documented `format: 'html' | 'jsx' | 'js'` option
 * (already present in each page's "Supported options" table) rather than per-framework
 * rewrites. The module takes its sources as input — the MDX modules only resolve under
 * the storefront's MDX/alias runtime, so the harness imports them and degrades when
 * unavailable, keeping this generator pure and testable with compiled-MDX fixtures.
 */

/** One partial's prose source: its public function name and its compiled MDX page. */
export type PartialSource = {
  /** The partial's exported function, e.g. `getFontLinks`. Used as the section identifier. */
  functionName: string;
  /** The partial page's MDX, compiled to a React component. */
  page: ComponentType;
};

/** The partials introduction plus the per-partial pages, in documentation order. */
export type PartialsSource = {
  introduction: ComponentType;
  partials: PartialSource[];
};

/** Outcome of writing the partials reference — surfaces degraded prose for review. */
export type PartialsReferenceReport = {
  /** Function names (or `'introduction'`) whose MDX rendered to nothing meaningful. */
  degraded: string[];
};

/** Documents framework usage via the `format` option, in place of per-framework rewrites. */
const FORMAT_NOTE = `## Framework usage

Partials are framework-agnostic build-time functions, called at build time — **not** run time. Rather
than per-framework variants, each partial takes a \`format\` option that selects its output shape:

- \`format: 'html'\` (default) — returns an HTML string, for \`index.html\` or any server-rendered template.
- \`format: 'jsx'\` — returns JSX elements, for React/Next (requires \`react/jsx-runtime\` as a dependency).
- \`format: 'js'\` — returns a JavaScript object, for programmatic use (all partials except \`getLoaderScript\`).
- \`format: 'sha256'\` — \`getLoaderScript\` only; returns a SHA-256 hash for a Content Security Policy.

The per-partial "Supported options" tables below document each partial's exact \`format\` values.`;

/**
 * Demote every heading one level so a rendered partial page (which opens at H1) nests
 * cleanly under the file's single H1. Fence-aware so a `#` inside a code block is left
 * untouched; H6 stays H6 (markdown has no deeper level).
 */
const demoteHeadings = (markdown: string): string => {
  let inFence = false;
  return markdown
    .split('\n')
    .map((line) => {
      if (line.trim().startsWith('```')) {
        inFence = !inFence;
        return line;
      }
      return !inFence && /^#{1,6}\s/.test(line) ? line.replace(/^(#{1,6})/, (hashes) => (hashes.length < 6 ? `#${hashes}` : hashes)) : line;
    })
    .join('\n');
};

/**
 * Render the full partials reference to markdown: a `# Partials` overview from the
 * introduction MDX, the framework-usage `format` note, then one demoted section per
 * partial. Pure function over its {@link PartialsSource}; degraded sections are flagged
 * and omitted rather than emitted as empty prose.
 */
export const renderPartialsReference = (
  source: PartialsSource,
  framework: Framework = 'js'
): { markdown: string; degraded: string[] } => {
  const degraded: string[] = [];
  const sections: string[] = ['# Partials'];

  const intro = renderMdxToMarkdown(source.introduction, framework, 'partials › introduction');
  if (intro.degraded) {
    degraded.push('introduction');
  } else {
    const body = stripLeadingH1(intro.markdown).trim();
    if (body) {
      sections.push(body);
    }
  }

  sections.push(FORMAT_NOTE);

  for (const { functionName, page } of source.partials) {
    const { markdown, degraded: isDegraded } = renderMdxToMarkdown(page, framework, `partials › ${functionName}`);
    if (isDegraded) {
      degraded.push(functionName);
      continue;
    }
    sections.push(demoteHeadings(markdown).trim());
  }

  // The integration snippets are authored for vanilla JS and hardcode the js `partials` subpath (the
  // skill renders these examples frozen to vanilla-js). Every wrapper ships its OWN `./partials`, and
  // under pnpm the js package is not reachable from a react/angular/vue consumer app — so retarget the
  // import to each tree's own package via the framework placeholder, resolved per tree at write time
  // (`resolveFrameworkPlaceholder`). In the js tree it resolves back to `components-js/partials`, a no-op.
  const frameworkAdapted = sections
    .join('\n\n')
    .replaceAll('@porsche-design-system/components-js/partials', '@porsche-design-system/components-{js|angular|react|vue}/partials');

  // Resolve storefront-absolute links to their in-tree references, relative to `references/partials.md`.
  const markdown = rewriteDocLinks(frameworkAdapted, 'references/partials.md');
  return { markdown, degraded };
};

/** Write the partials reference (`references/partials.md`) into the skill tree. */
export const writePartialsReference = (tree: SkillTree, source: PartialsSource): PartialsReferenceReport => {
  const { markdown, degraded } = renderPartialsReference(source, tree.framework);
  tree.writeReference('partials.md', markdown);
  return { degraded };
};
