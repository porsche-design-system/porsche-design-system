import type { ComponentMeta } from '@porsche-design-system/component-meta';
import type { ComponentType } from 'react';
import { renderComponentApi } from './componentApi';
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

const renderSection = (
  component: ComponentType | undefined,
  sections: string[],
  degradedSections: string[],
  name: string,
  transform: (markdown: string) => string = (markdown) => markdown
): void => {
  if (!component) {
    return;
  }
  const { markdown, degraded } = renderMdxToMarkdown(component);
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

  const introResult = renderMdxToMarkdown(source.introduction);
  if (introResult.degraded) {
    degradedSections.push('introduction');
  } else if (introResult.markdown.trim()) {
    sections.push(introResult.markdown.trim());
  }
  const summary = introResult.degraded ? NO_SUMMARY : leadSentence(introResult.markdown) || NO_SUMMARY;

  renderSection(source.usage, sections, degradedSections, 'usage', stripLeadingH1);
  renderSection(source.accessibility, sections, degradedSections, 'accessibility', stripLeadingH1);

  const noteEntries = Object.values(source.notes ?? {});
  if (noteEntries.length > 0) {
    const noteBlocks: string[] = ['## Notes'];
    for (const note of noteEntries) {
      const { markdown, degraded } = renderMdxToMarkdown(note.description);
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

  for (const tag of tags) {
    const { markdown, summary, degradedSections } = renderComponentProse(tag, metaMap[tag]);
    const apiMeta = apiOptions?.componentMeta[tag];
    const sections = [markdown];
    if (apiMeta) {
      sections.push(renderComponentApi(apiMeta, apiOptions.framework));
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
    roster.push({ tag, summary });
    if (degradedSections.length > 0) {
      degraded.push({ tag, sections: degradedSections });
    }
  }

  return { tags, roster, degraded };
};
