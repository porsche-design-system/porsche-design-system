import type { Root } from 'mdast';
import { leadSentence, stripLeadingBlockquotes, stripLeadingH1 } from '../support/markdown';
import { renderMdxToMarkdown } from '../support/renderMdxToMarkdown';
import type { Framework } from '../support/skillTree';
import { renderA11yIntegrationExamples, type SkillAccessibilityMeta } from './accessibility';

/**
 * Renders a component's storefront MDX prose (introduction / usage / accessibility / notes) into
 * the markdown body of `references/components/<tag>/<tag>.md`, derives the one-line roster summary,
 * and prepares the optional linked accessibility-examples reference.
 */

/** The prose-bearing subset of a component's storefront `ComponentDocsMeta` this module reads. */
export type ComponentProseSource = {
  introduction: Root;
  usage: Root;
  accessibility: SkillAccessibilityMeta;
  notes?: Record<string, { name: string; description: Root }>;
};

const NO_SUMMARY = '_No description available._';

/**
 * Render one prose section (introduction / usage / accessibility overview) to markdown and append it
 * to `sections` unless it is empty. Returns the raw rendered markdown (before `transform` and
 * trimming) so the caller can derive the roster summary from the introduction; the empty string
 * when the source is absent.
 */
const renderSection = (
  tree: Root | undefined,
  sections: string[],
  label: string,
  framework: Framework,
  transform: (markdown: string) => string = (markdown) => markdown
): string => {
  if (!tree) {
    return '';
  }
  const markdown = renderMdxToMarkdown(tree, framework, label);
  const transformed = transform(markdown).trim();
  if (transformed) {
    sections.push(transformed);
  }
  return markdown;
};

/** The information-free opener every `usage` MDX repeats; dropped so the section starts at the real "Do/Don't". */
const USAGE_FILLER =
  /\n*The following section provides guidance for designers and developers on how to use this component in different situations\.\n*/;

/** An all-pass test matrix carries no information (stated once in SKILL.md); an exceptional mark
 * (a non-✅ mark, e.g. `p-icon`'s partial high-contrast support) is real per-component content. */
const HAS_EXCEPTIONAL_TEST_SUPPORT = /🟠|❌|⚠️|🚫|partial/i;

/**
 * Remove per-file boilerplate that repeats verbatim across the component references. The
 * "component-meta is authoritative" API preamble is dropped in the generator; here we drop only the
 * information-free usage opener. The per-component `## Limitations` ARIA table is left in place — its
 * rows differ by component, so it is not boilerplate.
 */
const stripBoilerplateProse = (markdown: string): string =>
  markdown
    .replace(USAGE_FILLER, '\n\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

/**
 * Render a single component's prose sections (introduction / usage / accessibility / notes) to the
 * markdown body of its reference file, plus the roster summary derived from the introduction.
 *
 * Accessibility renders in three parts: the overview prose, a link to integration examples
 * (anti-pattern/recommended pairs are returned separately), and test-support prose — the last kept
 * only when it flags an exception, since an all-pass matrix is stated once in SKILL.md.
 */
export const renderComponentProse = (
  tag: string,
  source: ComponentProseSource,
  statusBanner = '',
  framework: Framework = 'js'
): { markdown: string; summary: string; accessibilityMarkdown: string } => {
  // The status banner (deprecated/experimental) sits directly under the H1, before any prose, so it is
  // the first thing read; it is derived from `componentMeta`, which the prose sections never carry.
  const sections: string[] = statusBanner ? [`# ${tag}`, statusBanner] : [`# ${tag}`];

  // The introduction goes through the same renderer as usage/accessibility (no heading strip); its raw
  // markdown is returned so the roster summary is the lead sentence. Any leading notification admonition
  // (experimental components open with one) is skipped so the summary is the first real prose sentence.
  const introMarkdown = renderSection(source.introduction, sections, `${tag} › introduction`, framework);
  const summary = leadSentence(stripLeadingBlockquotes(introMarkdown)) || NO_SUMMARY;

  renderSection(source.usage, sections, `${tag} › usage`, framework, stripLeadingH1);
  renderSection(source.accessibility.overview, sections, `${tag} › accessibility`, framework, stripLeadingH1);

  const integrationExamples = renderA11yIntegrationExamples(tag, source.accessibility.examples, framework);
  if (integrationExamples) {
    sections.push(
      '## Integration examples\n\nSee [accessibility integration examples](./accessibility.md) for paired anti-pattern and recommended implementations.'
    );
  }

  if (source.accessibility.tests) {
    const testsMarkdown = renderMdxToMarkdown(source.accessibility.tests, framework, `${tag} › accessibility tests`);
    if (HAS_EXCEPTIONAL_TEST_SUPPORT.test(testsMarkdown)) {
      sections.push(testsMarkdown.trim());
    }
  }

  const noteEntries = Object.values(source.notes ?? {});
  if (noteEntries.length > 0) {
    const noteBlocks: string[] = ['## Notes'];
    for (const note of noteEntries) {
      const markdown = renderMdxToMarkdown(note.description, framework, `${tag} › notes:${note.name}`);
      noteBlocks.push(`### ${note.name}`, markdown.trim());
    }
    sections.push(noteBlocks.join('\n\n'));
  }

  const accessibilityMarkdown = integrationExamples
    ? `# ${tag} accessibility integration examples\n\n${integrationExamples}`
    : '';

  return { markdown: stripBoilerplateProse(sections.join('\n\n')), summary, accessibilityMarkdown };
};
