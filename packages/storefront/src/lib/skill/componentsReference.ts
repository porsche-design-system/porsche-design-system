import type { ComponentMeta } from '@porsche-design-system/component-meta';
import type { ComponentType } from 'react';
import { parseRequiredParents, renderComponentApi, renderSubComponents } from './componentApi';
import { type ComponentExamplesOptions, writeComponentExamples } from './componentExamples';
import { rewriteDocLinks } from './links';
import { leadSentence, stripLeadingH1 } from './markdown';
import { renderMdxToMarkdown } from './renderMdxToMarkdown';
import type { ComponentRosterEntry } from './skillMd';
import type { Framework, SkillTree } from './skillTree';

/**
 * The prose-bearing subset of a component's storefront `ComponentDocsMeta` this
 * generator reads. Declared structurally (not as the full `ComponentDocsMeta`) so
 * the module stays decoupled from the storefront models and is trivially testable
 * with compiled-MDX fixtures. The real `componentDocsMeta` map is assignable to it.
 */
export type ComponentProseSource = {
  introduction: ComponentType;
  usage: ComponentType;
  accessibility: ComponentType;
  notes?: Record<string, { name: string; description: ComponentType }>;
};

/** Map of `componentMeta` tag → its storefront prose source. */
export type ComponentDocsMetaMap = Record<string, ComponentProseSource>;

/** A component whose prose rendered to nothing meaningful in one or more sections. */
export type DegradedProse = { tag: string; sections: string[] };

/** Outcome of writing the component reference tree — used to surface degraded prose for review. */
export type ComponentReferenceReport = {
  /** Tags written, in emitted (sorted) order. */
  tags: string[];
  /** One entry per component (tag + one-line summary), for the roster inlined into SKILL.md. */
  roster: ComponentRosterEntry[];
  degraded: DegradedProse[];
};

const NO_SUMMARY = '_No description available._';

/**
 * Curated roster one-liners for components whose introduction's lead sentence is unsuitable as a
 * summary — marketing/context framing, a stat about the component rather than what it is, a
 * grammatically broken opener, or a sentence truncated by an interactive component embedded in the
 * MDX prose. The roster is the agent's primary lookup surface, so these get a concise "what it is"
 * line instead of `leadSentence(introduction)`. Every other component keeps the auto-extracted lead
 * sentence. Keys are asserted to be real documented tags by the completeness gate.
 */
export const ROSTER_SUMMARY_OVERRIDES: Record<string, string> = {
  'p-flag': 'Displays a country or region flag, styled to the Porsche design language.',
  'p-pagination': 'Splits a large set of content across pages and lets the user navigate between them.',
  'p-popover': 'Shows additional contextual content in an overlay on top of other content, typically opened from an info button.',
  'p-spinner': 'Indicates an ongoing process the user must wait for, such as loading or processing.',
};

const renderSection = (
  component: ComponentType | undefined,
  sections: string[],
  degradedSections: string[],
  name: string,
  label: string,
  transform: (markdown: string) => string = (markdown) => markdown
): void => {
  if (!component) {
    return;
  }
  const { markdown, degraded } = renderMdxToMarkdown(component, label);
  if (degraded) {
    degradedSections.push(name);
    return;
  }
  const transformed = transform(markdown).trim();
  if (transformed) {
    sections.push(transformed);
  }
};

/**
 * Render a single component's prose sections (introduction / usage / accessibility
 * / notes) to the markdown body of `references/components/<tag>/<tag>.md`. TASK-04 (API
 * tables) and TASK-05 (examples) append their sections to this file.
 */
export const renderComponentProse = (
  tag: string,
  source: ComponentProseSource
): { markdown: string; summary: string; degradedSections: string[] } => {
  const degradedSections: string[] = [];
  const sections: string[] = [`# ${tag}`];

  const introResult = renderMdxToMarkdown(source.introduction, `${tag} › introduction`);
  if (introResult.degraded) {
    degradedSections.push('introduction');
  } else if (introResult.markdown.trim()) {
    sections.push(introResult.markdown.trim());
  }
  const summary = introResult.degraded ? NO_SUMMARY : leadSentence(introResult.markdown) || NO_SUMMARY;

  renderSection(source.usage, sections, degradedSections, 'usage', `${tag} › usage`, stripLeadingH1);
  renderSection(source.accessibility, sections, degradedSections, 'accessibility', `${tag} › accessibility`, stripLeadingH1);

  const noteEntries = Object.values(source.notes ?? {});
  if (noteEntries.length > 0) {
    const noteBlocks: string[] = ['## Notes'];
    for (const note of noteEntries) {
      const { markdown, degraded } = renderMdxToMarkdown(note.description, `${tag} › notes:${note.name}`);
      if (degraded) {
        degradedSections.push(`notes:${note.name}`);
        continue;
      }
      noteBlocks.push(`### ${note.name}`, markdown.trim());
    }
    if (noteBlocks.length > 1) {
      sections.push(noteBlocks.join('\n\n'));
    }
  }

  return { markdown: sections.join('\n\n'), summary, degradedSections };
};

/** Authoritative `componentMeta` (props/slots/events/CSS variables) keyed by tag, plus the target framework. */
export type ComponentApiOptions = {
  componentMeta: Record<string, ComponentMeta>;
  framework: Framework;
};

/**
 * The top-level (standalone, documented) ancestors of a tag: follow `requiredParent`
 * up until a component with no parent is reached. A sub-component may resolve to more
 * than one top-level parent (e.g. `p-select-option` belongs to both `p-select` and
 * `p-multi-select`), so it is documented under each. Guards against cycles.
 */
const topLevelAncestors = (
  tag: string,
  componentMeta: Record<string, ComponentMeta>,
  seen: Set<string> = new Set()
): string[] => {
  if (seen.has(tag)) {
    return [];
  }
  seen.add(tag);
  const parents = parseRequiredParents(componentMeta[tag]?.requiredParent);
  if (parents.length === 0) {
    return [tag]; // no parent → this is a top-level component
  }
  const ancestors = new Set<string>();
  for (const parent of parents) {
    for (const ancestor of topLevelAncestors(parent, componentMeta, seen)) {
      ancestors.add(ancestor);
    }
  }
  return [...ancestors];
};

/**
 * Map each top-level component tag to the sub-components (tags with a `requiredParent`)
 * that resolve to it, sorted for a deterministic tree. Sub-components have no standalone
 * docs page, so their authoritative API is documented under their parent(s).
 */
export const buildSubComponentMap = (
  componentMeta: Record<string, ComponentMeta>
): Record<string, { tag: string; meta: ComponentMeta }[]> => {
  const map: Record<string, { tag: string; meta: ComponentMeta }[]> = {};
  for (const [tag, meta] of Object.entries(componentMeta)) {
    if (parseRequiredParents(meta.requiredParent).length === 0) {
      continue; // top-level component, not a sub-component
    }
    for (const ancestor of topLevelAncestors(tag, componentMeta)) {
      (map[ancestor] ??= []).push({ tag, meta });
    }
  }
  for (const entries of Object.values(map)) {
    entries.sort((a, b) => a.tag.localeCompare(b.tag));
  }
  return map;
};

/**
 * Write the prose section of every component reference into the skill tree, keyed by
 * `componentMeta` tag (the iteration source guarantees coverage). When
 * {@link ComponentApiOptions} is supplied, the props/slots/events/CSS-variable API
 * tables are appended to each `<tag>/<tag>.md` after its prose. Returns a report
 * carrying the roster (inlined into SKILL.md by the harness) and any degraded prose
 * to surface for review.
 */
export const writeComponentReferences = (
  tree: SkillTree,
  metaMap: ComponentDocsMetaMap,
  apiOptions?: ComponentApiOptions,
  examplesOptions?: ComponentExamplesOptions
): ComponentReferenceReport => {
  const tags = Object.keys(metaMap).sort();
  const roster: ComponentRosterEntry[] = [];
  const degraded: DegradedProse[] = [];
  const subComponentsByParent = apiOptions ? buildSubComponentMap(apiOptions.componentMeta) : {};

  for (const tag of tags) {
    const { markdown, summary, degradedSections } = renderComponentProse(tag, metaMap[tag]);
    const apiMeta = apiOptions?.componentMeta[tag];
    const sections = [markdown];
    if (apiMeta) {
      sections.push(renderComponentApi(apiMeta, apiOptions.framework));
    }
    const subComponents = subComponentsByParent[tag];
    if (subComponents && subComponents.length > 0) {
      sections.push(renderSubComponents(subComponents));
    }
    const examplesSource = examplesOptions?.metaMap[tag];
    if (examplesSource) {
      const table = writeComponentExamples(tree, tag, examplesSource, examplesOptions.framework, examplesOptions.theme);
      if (table) {
        sections.push(table);
      }
    }
    // Resolve storefront-absolute links across the whole file — prose, notes and the examples-table
    // "when to use" descriptions alike — relative to this component's own file location.
    const relativePath = `components/${tag}/${tag}.md`;
    tree.writeReference(relativePath, rewriteDocLinks(sections.join('\n\n'), `references/${relativePath}`));
    roster.push({ tag, summary: ROSTER_SUMMARY_OVERRIDES[tag] ?? summary });
    if (degradedSections.length > 0) {
      degraded.push({ tag, sections: degradedSections });
    }
  }

  return { tags, roster, degraded };
};
