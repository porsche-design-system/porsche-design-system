import type { ComponentMeta } from '@porsche-design-system/component-meta';
import { type RouteReferences, rewriteDocLinks } from '../support/links';
import type { SkillTree } from '../support/skillTree';
import {
  buildSubComponentMap,
  componentStatus,
  renderComponentApi,
  renderComponentStatusBanner,
  renderSubComponents,
} from './api';
import { type ComponentExamplesSource, writeComponentExamples } from './examples';
import { deriveIconNames, renderIconsReference } from './icons';
import { type ComponentProseSource, ROSTER_SUMMARY_OVERRIDES, renderComponentProse } from './prose';

/**
 * Assembles `references/components/<tag>/<tag>.md` for every documented component — prose
 * (`prose.ts`), API tables and sub-components (`api.ts`), examples (`examples.ts`) — plus the
 * shared `references/icons.md`, and returns the roster inlined into SKILL.md.
 */

/**
 * A component's full docs source: the prose-bearing and examples-bearing subsets of the storefront
 * `ComponentDocsMeta`. Declared structurally so the domain stays decoupled from the storefront
 * models and is testable with compiled-MDX fixtures; the real `componentDocsMeta` map satisfies it.
 */
export type ComponentDocsSource = ComponentProseSource & ComponentExamplesSource;

/** Map of `componentMeta` tag → its storefront docs source. */
export type ComponentDocsMetaMap = Record<string, ComponentDocsSource>;

/**
 * A single row of the inlined component roster: the component tag and a one-line summary. The
 * reference path is derived from the tag, so it stays correct by construction with the
 * `components/<tag>/<tag>.md` layout.
 */
export type ComponentRosterEntry = { tag: string; summary: string; status?: 'deprecated' | 'experimental' };

export type ComponentReferencesInput = {
  docsMeta: ComponentDocsMetaMap;
  /** Authoritative `componentMeta`; must cover every `docsMeta` tag (both derive from component-meta). */
  componentMeta: Record<string, ComponentMeta>;
  routeReferences: RouteReferences;
};

/** Outcome of writing the component reference tree. */
export type ComponentReferenceReport = {
  /** Tags written, in emitted (sorted) order. */
  tags: string[];
  /** One entry per component (tag + one-line summary), for the roster inlined into SKILL.md. */
  roster: ComponentRosterEntry[];
};

/**
 * Write every component reference (`<tag>/<tag>.md` + example files) and the shared icons
 * reference into the skill tree, keyed by `docsMeta` tag (the iteration source the completeness
 * gate validates). Returns the roster for SKILL.md's `## Components` section.
 */
export const writeComponentReferences = (
  tree: SkillTree,
  { docsMeta, componentMeta, routeReferences }: ComponentReferencesInput
): ComponentReferenceReport => {
  const tags = Object.keys(docsMeta).sort();
  const roster: ComponentRosterEntry[] = [];
  const subComponentsByParent = buildSubComponentMap(componentMeta);

  // The ~290-name icon union is shared by every icon-typed prop; emit it once as `references/icons.md`
  // and collapse each prop's type cell to a link, instead of inlining ~4.2 KB into ~9 component files.
  const iconNames = new Set(deriveIconNames(componentMeta));
  if (iconNames.size > 0) {
    tree.writeReference('icons.md', renderIconsReference([...iconNames]));
  }

  for (const tag of tags) {
    const apiMeta = componentMeta[tag];
    if (!apiMeta) {
      throw new Error(`No component-meta for documented tag ${tag} — docsMeta and componentMeta diverged.`);
    }
    const { markdown, summary } = renderComponentProse(
      tag,
      docsMeta[tag],
      renderComponentStatusBanner(apiMeta),
      tree.framework
    );
    const sections = [markdown, renderComponentApi(apiMeta, iconNames)];
    const subComponents = subComponentsByParent[tag];
    if (subComponents && subComponents.length > 0) {
      sections.push(renderSubComponents(subComponents, iconNames));
    }
    const examplesTable = writeComponentExamples(tree, tag, docsMeta[tag]);
    if (examplesTable) {
      sections.push(examplesTable);
    }
    // Resolve storefront-absolute links across the whole file — prose, notes and the examples-table
    // "when to use" descriptions alike — relative to this component's own file location.
    const relativePath = `components/${tag}/${tag}.md`;
    tree.writeReference(
      relativePath,
      rewriteDocLinks(sections.join('\n\n'), `references/${relativePath}`, routeReferences)
    );
    const status = componentStatus(apiMeta);
    roster.push({
      tag,
      summary: ROSTER_SUMMARY_OVERRIDES[tag] ?? summary,
      ...(status ? { status } : {}),
    });
  }

  return { tags, roster };
};
