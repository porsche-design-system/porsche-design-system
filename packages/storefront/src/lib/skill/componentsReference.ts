import type { ComponentMeta } from '@porsche-design-system/component-meta';
import type { ComponentType } from 'react';
import { renderComponentApi } from './componentApi';
import { renderMdxToMarkdown } from './renderMdxToMarkdown';
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
  degraded: DegradedProse[];
};

const NO_SUMMARY = '_No description available._';

/**
 * Drop a redundant leading top-level heading. The `usage` / `accessibility` MDX
 * pages each open with a `# <Component>` title (e.g. `# Button`) that duplicates
 * the per-file H1 we emit, so it is stripped before the section is nested.
 */
const stripLeadingH1 = (markdown: string): string => markdown.replace(/^#\s+[^\n]*\n+/, '');

const escapeCell = (text: string): string => text.replace(/\|/g, '\\|').replace(/\s+/g, ' ').trim();

/**
 * First sentence of the introduction prose, used as the one-line `overview.md`
 * summary. Falls back to the whole leading paragraph when no sentence boundary is
 * found.
 */
const firstSentence = (markdown: string): string => {
  const leadParagraph =
    markdown
      .split(/\n{2,}/)[0]
      ?.replace(/\s+/g, ' ')
      .trim() ?? '';
  return leadParagraph.match(/^(.+?[.!?])(\s|$)/)?.[1]?.trim() ?? leadParagraph;
};

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
 * / notes) to the markdown body of `references/components/<tag>.md`. TASK-04 (API
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
  const summary = introResult.degraded ? NO_SUMMARY : firstSentence(introResult.markdown) || NO_SUMMARY;

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

/** Build the `references/components/overview.md` table — one row per component. */
export const buildComponentsOverview = (entries: { tag: string; summary: string }[]): string => {
  const rows = entries.map(({ tag, summary }) => `| \`${tag}\` | ${escapeCell(summary)} | [${tag}.md](./${tag}.md) |`);
  return [
    '# Components overview',
    '',
    `The Porsche Design System ships ${entries.length} documented components. Open a component's reference for its prose, props, slots, events, CSS variables and examples.`,
    '',
    '| Component | Summary | Reference |',
    '| --- | --- | --- |',
    ...rows,
  ].join('\n');
};

/** Authoritative `componentMeta` (props/slots/events/CSS variables) keyed by tag, plus the target framework. */
export type ComponentApiOptions = {
  componentMeta: Record<string, ComponentMeta>;
  framework: Framework;
};

/**
 * Write the prose section of every component reference plus `overview.md` into the
 * skill tree, keyed by `componentMeta` tag (the iteration source guarantees
 * coverage). When {@link ComponentApiOptions} is supplied, the props/slots/events/
 * CSS-variable API tables (TASK-04) are appended to each `<tag>.md` after its prose.
 * Returns a report so the harness can surface degraded prose for review.
 */
export const writeComponentReferences = (
  tree: SkillTree,
  metaMap: ComponentDocsMetaMap,
  apiOptions?: ComponentApiOptions
): ComponentReferenceReport => {
  const tags = Object.keys(metaMap).sort();
  const overviewEntries: { tag: string; summary: string }[] = [];
  const degraded: DegradedProse[] = [];

  for (const tag of tags) {
    const { markdown, summary, degradedSections } = renderComponentProse(tag, metaMap[tag]);
    const apiMeta = apiOptions?.componentMeta[tag];
    const sections = apiMeta ? [markdown, renderComponentApi(apiMeta, apiOptions.framework)] : [markdown];
    tree.writeReference(`components/${tag}.md`, sections.join('\n\n'));
    overviewEntries.push({ tag, summary });
    if (degradedSections.length > 0) {
      degraded.push({ tag, sections: degradedSections });
    }
  }

  tree.writeReference('components/overview.md', buildComponentsOverview(overviewEntries));

  return { tags, degraded };
};
