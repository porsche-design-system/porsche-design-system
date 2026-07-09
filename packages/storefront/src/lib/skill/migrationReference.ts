import type { ComponentType } from 'react';
import { rewriteDocLinks } from './links';
import { renderMdxToMarkdown } from './renderMdxToMarkdown';
import type { SkillTree } from './skillTree';

/**
 * Migration guides are styling-domain prose with no meta object, so the storefront
 * migration MDX (`news/migration-guide/<slug>/page.mdx`) is the source. Each guide is
 * rendered to markdown via {@link renderMdxToMarkdown} into its own
 * `references/migration/<slug>.md`. Styling behaves identically across frameworks, so
 * every wrapper ships the same guide set (core PDS + all style domains). The module
 * takes its sources as input — the MDX modules only resolve under the storefront's
 * MDX/alias runtime, so the harness imports them and degrades when unavailable, keeping
 * this generator pure and testable with compiled-MDX fixtures.
 */

/** One migration guide's prose source: its domain slug and its compiled MDX page. */
export type MigrationSource = {
  /** Migration domain slug — both the source dir and the output filename stem, e.g. `scss`. */
  slug: string;
  /** The migration guide page's MDX, compiled to a React component. */
  page: ComponentType;
};

/** Outcome of writing the migration references — surfaces paths written and degraded prose. */
export type MigrationReferenceReport = {
  /** Tree-relative paths written, in source order. */
  written: string[];
  /** Slugs whose MDX rendered to nothing meaningful — omitted rather than emitted as empty prose. */
  degraded: string[];
};

/**
 * Write one `references/migration/<slug>.md` per guide, rendering each page's MDX
 * verbatim to markdown. Each guide is a standalone file, so its source H1 is kept as-is
 * (no demotion). Degraded prose is flagged and omitted rather than written empty.
 */
export const writeMigrationReferences = (tree: SkillTree, sources: MigrationSource[]): MigrationReferenceReport => {
  const written: string[] = [];
  const degraded: string[] = [];

  for (const { slug, page } of sources) {
    const { markdown, degraded: isDegraded } = renderMdxToMarkdown(page, tree.framework, `migration/${slug}`);
    if (isDegraded) {
      degraded.push(slug);
      continue;
    }
    // Resolve storefront-absolute links to their in-tree references, relative to this guide's file.
    const resolved = rewriteDocLinks(markdown, `references/migration/${slug}.md`);
    written.push(tree.writeReference(`migration/${slug}.md`, resolved));
  }

  return { written, degraded };
};
