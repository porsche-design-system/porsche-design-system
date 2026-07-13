import type { ComponentMeta } from '@porsche-design-system/component-meta';
import type { ComponentType } from 'react';
import {
  componentStatus,
  deriveIconNames,
  parseRequiredParents,
  renderComponentApi,
  renderComponentStatusBanner,
  renderIconsReference,
  renderSubComponents,
} from './componentApi';
import { type ComponentExamplesOptions, writeComponentExamples } from './componentExamples';
import { rewriteDocLinks, type RouteReferences } from './links';
import { leadSentence, stripLeadingBlockquotes, stripLeadingH1 } from './markdown';
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

/** Outcome of writing the component reference tree. */
export type ComponentReferenceReport = {
  /** Tags written, in emitted (sorted) order. */
  tags: string[];
  /** One entry per component (tag + one-line summary), for the roster inlined into SKILL.md. */
  roster: ComponentRosterEntry[];
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
  'p-popover':
    'Shows additional contextual content in an overlay on top of other content, typically opened from an info button.',
  'p-spinner': 'Indicates an ongoing process the user must wait for, such as loading or processing.',
};

/**
 * Render one prose section (introduction / usage / accessibility) to markdown and append it to
 * `sections` unless it is empty. Returns the raw rendered markdown (before `transform` and
 * trimming) so the caller can derive the roster summary from the introduction; the empty string
 * when the source is absent.
 */
const renderSection = (
  component: ComponentType | undefined,
  sections: string[],
  label: string,
  framework: Framework,
  transform: (markdown: string) => string = (markdown) => markdown
): string => {
  if (!component) {
    return '';
  }
  const markdown = renderMdxToMarkdown(component, framework, label);
  const transformed = transform(markdown).trim();
  if (transformed) {
    sections.push(transformed);
  }
  return markdown;
};

/** The information-free opener every `usage` MDX repeats; dropped so the section starts at the real "Do/Don't". */
const USAGE_FILLER =
  /\n*The following section provides guidance for designers and developers on how to use this component in different situations\.\n*/;

/**
 * Remove per-file boilerplate that repeats verbatim across the component references. The
 * "component-meta is authoritative" API preamble is dropped in the generator; here we drop the
 * information-free usage opener and the all-pass a11y `## Tests` matrix (stated once in SKILL.md). A
 * `## Tests` section is kept when it flags an exception (a non-✅ mark, e.g. `p-icon`'s partial
 * high-contrast support), since that is real per-component content. The per-component `## Limitations`
 * ARIA table is left in place — its rows differ by component, so it is not boilerplate.
 */
const stripBoilerplateProse = (markdown: string): string =>
  markdown
    .replace(USAGE_FILLER, '\n\n')
    .replace(/\n## Tests\n[\s\S]*?(?=\n## |$)/, (section) => (/🟠|❌|⚠️|🚫|partial/i.test(section) ? section : '\n'))
    .replace(/\n{3,}/g, '\n\n')
    .trim();

/**
 * Render a single component's prose sections (introduction / usage / accessibility
 * / notes) to the markdown body of `references/components/<tag>/<tag>.md`. TASK-04 (API
 * tables) and TASK-05 (examples) append their sections to this file.
 */
export const renderComponentProse = (
  tag: string,
  source: ComponentProseSource,
  statusBanner = '',
  framework: Framework = 'js'
): { markdown: string; summary: string } => {
  // The status banner (deprecated/experimental) sits directly under the H1, before any prose, so it is
  // the first thing read; it is derived from `componentMeta`, which the prose sections never carry.
  const sections: string[] = statusBanner ? [`# ${tag}`, statusBanner] : [`# ${tag}`];

  // The introduction goes through the same renderer as usage/accessibility (no heading strip); its raw
  // markdown is returned so the roster summary is the lead sentence. Any leading notification admonition
  // (experimental components open with one) is skipped so the summary is the first real prose sentence.
  const introMarkdown = renderSection(source.introduction, sections, `${tag} › introduction`, framework);
  const summary = leadSentence(stripLeadingBlockquotes(introMarkdown)) || NO_SUMMARY;

  renderSection(source.usage, sections, `${tag} › usage`, framework, stripLeadingH1);
  renderSection(source.accessibility, sections, `${tag} › accessibility`, framework, stripLeadingH1);

  const noteEntries = Object.values(source.notes ?? {});
  if (noteEntries.length > 0) {
    const noteBlocks: string[] = ['## Notes'];
    for (const note of noteEntries) {
      const markdown = renderMdxToMarkdown(note.description, framework, `${tag} › notes:${note.name}`);
      noteBlocks.push(`### ${note.name}`, markdown.trim());
    }
    sections.push(noteBlocks.join('\n\n'));
  }

  return { markdown: stripBoilerplateProse(sections.join('\n\n')), summary };
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
 * carrying the roster (inlined into SKILL.md by the harness).
 */
export const writeComponentReferences = (
  tree: SkillTree,
  metaMap: ComponentDocsMetaMap,
  apiOptions?: ComponentApiOptions,
  examplesOptions?: ComponentExamplesOptions,
  routeReferences: RouteReferences = {}
): ComponentReferenceReport => {
  const tags = Object.keys(metaMap).sort();
  const roster: ComponentRosterEntry[] = [];
  const subComponentsByParent = apiOptions ? buildSubComponentMap(apiOptions.componentMeta) : {};

  // The ~290-name icon union is shared by every icon-typed prop; emit it once as `references/icons.md`
  // and collapse each prop's type cell to a link, instead of inlining ~4.2 KB into ~9 component files.
  const iconNames = new Set(apiOptions ? deriveIconNames(apiOptions.componentMeta) : []);
  if (iconNames.size > 0) {
    tree.writeReference('icons.md', renderIconsReference([...iconNames]));
  }

  for (const tag of tags) {
    const apiMeta = apiOptions?.componentMeta[tag];
    const statusBanner = apiMeta ? renderComponentStatusBanner(apiMeta) : '';
    const { markdown, summary } = renderComponentProse(tag, metaMap[tag], statusBanner, tree.framework);
    const sections = [markdown];
    if (apiMeta) {
      sections.push(renderComponentApi(apiMeta, iconNames));
    }
    const subComponents = subComponentsByParent[tag];
    if (subComponents && subComponents.length > 0) {
      sections.push(renderSubComponents(subComponents, iconNames));
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
    tree.writeReference(
      relativePath,
      rewriteDocLinks(sections.join('\n\n'), `references/${relativePath}`, routeReferences)
    );
    roster.push({
      tag,
      summary: ROSTER_SUMMARY_OVERRIDES[tag] ?? summary,
      ...(apiMeta && componentStatus(apiMeta) ? { status: componentStatus(apiMeta) } : {}),
    });
  }

  return { tags, roster };
};
