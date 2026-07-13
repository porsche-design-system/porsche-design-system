import type { ComponentType } from 'react';
import { leadSentence, stripLeadingBlockquotes, stripLeadingH1 } from '../markdown';
import { renderMdxToMarkdown } from '../renderMdxToMarkdown';
import type { Framework } from '../skillTree';

/**
 * Renders a component's storefront MDX prose (introduction / usage / accessibility / notes) into
 * the markdown body of `references/components/<tag>/<tag>.md` and derives the one-line roster
 * summary. `reference.ts` appends the API tables and examples after this body.
 */

/** The prose-bearing subset of a component's storefront `ComponentDocsMeta` this module reads. */
export type ComponentProseSource = {
  introduction: ComponentType;
  usage: ComponentType;
  accessibility: ComponentType;
  notes?: Record<string, { name: string; description: ComponentType }>;
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
 * Render a single component's prose sections (introduction / usage / accessibility / notes) to the
 * markdown body of its reference file, plus the roster summary derived from the introduction.
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
